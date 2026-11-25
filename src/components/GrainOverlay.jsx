"use client";

import { useEffect, useRef } from "react";

// Pre-bake a tiny 128x128 film-grain tile once on mount instead of running
// a full-viewport SVG feTurbulence filter over every composited frame.
export default function GrainOverlay() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = ctx.createImageData(size, size);
    const data = img.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    el.style.backgroundImage = `url("${canvas.toDataURL("image/png")}")`;
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999999,
        pointerEvents: "none",
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        opacity: 0.028,
      }}
    />
  );
}
