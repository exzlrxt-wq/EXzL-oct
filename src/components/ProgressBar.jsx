"use client";

import { useEffect } from "react";
import { useLenis } from "./LenisContext";

export default function ProgressBar() {
  const lenis = useLenis();

  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    if (!bar || !lenis) return;

    // Lenis fires this in its own RAF loop — perfectly in sync with virtual scroll.
    // `progress` is 0→1, no division needed.
    function onScroll({ progress }) {
      bar.style.width = progress * 100 + "%";
    }

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  return null;
}
