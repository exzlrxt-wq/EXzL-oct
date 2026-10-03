"use client";

import { useEffect, useRef } from "react";

// Only keep elements in the hero / works zone (top 0–70% of page).
// These all move diagonally with scroll — they are NOT stationary.
// Removed all lower-page elements (120%+) that appeared cluttered below process.
const ELEMENTS = [
  { top: "8%",  left: "4%",  speed: -0.06, blur: "12px", size: "110px", glyph: "◈", rot: 15  },
  { top: "38%", left: "84%", speed: -0.09, blur: "8px",  size: "170px", glyph: "⎈", rot: -30 },
  { top: "62%", left: "11%", speed: -0.05, blur: "15px", size: "130px", glyph: "🜔", rot: 45  },
];

export default function ForegroundParallax() {
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children);

    let scrollY = 0;
    let lastScrollY = -1;

    function onScroll() {
      scrollY = window.scrollY;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    function tick() {
      if (scrollY !== lastScrollY) {
        lastScrollY = scrollY;
        children.forEach((el, i) => {
          const y = scrollY * ELEMENTS[i].speed;
          el.style.transform = `translateY(${y}px)`;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: "none",
        zIndex: 999,
        overflow: "hidden",
      }}
    >
      {ELEMENTS.map((el, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: el.top,
            left: el.left,
            fontSize: el.size,
            fontFamily: "var(--serif)",
            color: "var(--acid)",
            opacity: 0.04,
            filter: `blur(${el.blur})`,
            rotate: `${el.rot}deg`,
            willChange: "transform",
          }}
        >
          {el.glyph}
        </div>
      ))}
    </div>
  );
}
