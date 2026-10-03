"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalTransition() {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Reset transition when route finishes changing (internal Next.js routing)
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  // Reset transition if page is restored from browser cache (back button from external link)
  useEffect(() => {
    const handlePageShow = (e) => {
      if (e.persisted) {
        setIsNavigating(false);
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      // Find closest anchor tag
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore hash links, mailto, tel, and blank targets
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank"
      ) {
        return;
      }

      // Check if it's pointing to the exact same page we're already on
      try {
        const url = new URL(target.href);
        if (url.pathname === pathname && url.hash === "") {
          return; // It's just a link to the current page
        }
      } catch (err) {
        console.warn("[GlobalTransition] Could not parse URL:", err);
      }

      e.preventDefault();
      setIsNavigating(true);

      // Distinguish internal vs external navigation
      setTimeout(() => {
        try {
          const url = new URL(target.href);
          if (url.origin === window.location.origin) {
            router.push(href);
          } else {
            window.location.href = href;
          }
        } catch (err) {
          window.location.href = href;
        }
      }, 500);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, router]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "var(--bg, #0b0a09)",
            zIndex: 999999,
            pointerEvents: "all",
          }}
        />
      )}
    </AnimatePresence>
  );
}
