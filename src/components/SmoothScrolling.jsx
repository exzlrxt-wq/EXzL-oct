"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { LenisContext } from "./LenisContext";

export default function SmoothScrolling({ children }) {
  const [lenis, setLenis] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  useEffect(() => {
    // Disable browser scroll restoration so page always starts at top
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Synchronous scroll reset — runs before paint
    window.scrollTo(0, 0);
    // Microtask reset — catches Next.js App Router's post-hydration scroll restore
    Promise.resolve().then(() => window.scrollTo(0, 0));
    // Second tick reset — catches any layout-shift-induced scroll restore
    setTimeout(() => window.scrollTo(0, 0), 0);

    // BFCache (back/forward cache) restore: browser replays scroll position
    const onPageShow = (e) => {
      if (e.persisted) window.scrollTo(0, 0);
    };
    window.addEventListener("pageshow", onPageShow);

    const l = new Lenis({
      lerp: 0.055,             /* lower = more damping — fast flicks decelerate gradually */
      wheelMultiplier: 0.7,    /* each tick contributes less — resists fast scrolling */
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.2,
      infinite: false,
    });

    setLenis(l);

    let rafId;
    function raf(time) {
      l.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      l.destroy();
      setLenis(null);
      window.removeEventListener("pageshow", onPageShow);
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
