"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { LenisContext } from "./LenisContext";

function findHashTarget(hash) {
  if (!hash || hash === "#") return null;
  const id = decodeURIComponent(hash.slice(1));
  return document.getElementById(id);
}

export default function SmoothScrolling({ children }) {
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash) {
      const target = findHashTarget(hash);
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: -64, immediate: true });
        } else {
          target.scrollIntoView({ behavior: "auto" });
        }
        return;
      }
      // Retry shortly after navigation if target section finishes mounting after transition
      const t = setTimeout(() => {
        const delayed = findHashTarget(window.location.hash);
        if (!delayed) return;
        if (lenisRef.current) lenisRef.current.scrollTo(delayed, { offset: -64 });
        else delayed.scrollIntoView({ behavior: "smooth" });
      }, 120);
      return () => clearTimeout(t);
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  useEffect(() => {
    const hasHash = typeof window !== "undefined" && Boolean(window.location.hash);

    // Disable browser scroll restoration so normal loads start at top, but never wipe #hash landings
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (!hasHash) {
      // Synchronous scroll reset — runs before paint
      window.scrollTo(0, 0);
      // Microtask reset — catches Next.js App Router's post-hydration scroll restore
      Promise.resolve().then(() => {
        if (!window.location.hash) window.scrollTo(0, 0);
      });
      // Second tick reset — catches any layout-shift-induced scroll restore
      setTimeout(() => {
        if (!window.location.hash) window.scrollTo(0, 0);
      }, 0);
    }

    // BFCache (back/forward cache) restore: browser replays scroll position
    const onPageShow = (e) => {
      if (e.persisted && !window.location.hash) window.scrollTo(0, 0);
    };
    window.addEventListener("pageshow", onPageShow);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const l = new Lenis({
      lerp: prefersReduced ? 1 : 0.088, /* responsive air-suspension damping: zero mud, soft feathered settle */
      wheelMultiplier: 1.05,            /* crisp pickup without heavy wheel drag */
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !prefersReduced,
      syncTouch: false,
      touchMultiplier: 1.3,
      infinite: false,
    });

    lenisRef.current = l;
    setLenis(l);

    if (hasHash) {
      requestAnimationFrame(() => {
        const el = findHashTarget(window.location.hash);
        if (el) l.scrollTo(el, { offset: -64, immediate: true });
      });
    }

    const onHashChange = () => {
      const el = findHashTarget(window.location.hash);
      if (el) l.scrollTo(el, { offset: -64 });
    };
    window.addEventListener("hashchange", onHashChange);

    // Smooth-scroll same-page hash links (#contact, /#contact) even when hash is already active
    const onHashClick = (e) => {
      if (e.defaultPrevented) return;
      const anchor = e.target.closest("a");
      if (!anchor || anchor.target === "_blank") return;
      const href = anchor.getAttribute("href");
      if (!href || (!href.startsWith("#") && !href.startsWith("/#"))) return;
      let url;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
        return;
      }
      const el = findHashTarget(url.hash);
      if (!el) return;
      e.preventDefault();
      if (window.location.hash !== url.hash) {
        history.pushState(null, "", url.hash);
      }
      l.scrollTo(el, { offset: -64 });
    };
    document.addEventListener("click", onHashClick);

    let rafId;
    function raf(time) {
      l.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      l.destroy();
      lenisRef.current = null;
      setLenis(null);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onHashClick);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {/* position:relative required by Framer Motion useScroll + Lenis offset calc */}
      <div style={{ position: "relative" }}>
        {children}
      </div>
    </LenisContext.Provider>
  );
}
