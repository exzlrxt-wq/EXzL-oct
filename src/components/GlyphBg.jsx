"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = ["✧", "✦", "⟡", "◈", "⏣", "⎔", "⌑", "⍟", "⎈", "⎊", "⌖", "⍚", "🜁", "🜄", "🜂", "🜃", "🜔", "🜍"];

const symbols = Array.from({ length: 22 }, () => ({
  glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
  x: Math.random() * 100,
  y: Math.random() * 100,
  vx: (Math.random() - 0.5) * 0.007,
  vy: (Math.random() - 0.5) * 0.007,
  size: Math.random() * 28 + 14,
  opacity: Math.random() * 0.04 + 0.01,
  rot: Math.random() * Math.PI * 2,
  rotV: (Math.random() - 0.5) * 0.0008,
}));

export default function GlyphBg() {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);
  // Keep RAF ref so we can stop/start it based on visibility
  const rafRef = useRef(null);
  const runningRef = useRef(false);

  // Single merged effect — handles both visibility tracking AND canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!runningRef.current) return; // ✅ Stop RAF when not visible
      ctx.clearRect(0, 0, W, H);
      
      // Set common properties once to avoid state thrashing
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      symbols.forEach((s) => {
        s.x += s.vx; s.y += s.vy; s.rot += s.rotV;
        if (s.x < -5)  s.x = 105;
        if (s.x > 105) s.x = -5;
        if (s.y < -5)  s.y = 105;
        if (s.y > 105) s.y = -5;
        
        // Use setTransform instead of save/restore for better performance
        ctx.setTransform(1, 0, 0, 1, (s.x / 100) * W, (s.y / 100) * H);
        ctx.rotate(s.rot);
        
        ctx.font = `700 ${s.size}px 'Cormorant Garamond', serif`;
        ctx.fillStyle = `rgba(141, 181, 122, ${s.opacity})`;
        
        ctx.fillText(s.glyph, 0, 0);
      });
      
      // Reset transform to identity for clearRect in the next frame
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      
      rafRef.current = requestAnimationFrame(draw);
    }

    function startLoop() {
      if (runningRef.current) return;
      runningRef.current = true;
      draw();
    }
    function stopLoop() {
      runningRef.current = false;
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    }

    // Scroll visibility check — watch manifesto + about sections
    const WATCHED = ["manifesto", "about"];
    function onScroll() {
      const h = window.innerHeight;
      const isVis = WATCHED.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < h * 0.6 && r.bottom > 0;
      });
      setVisible(isVis);
      if (isVis) startLoop(); else stopLoop();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Initial check

    return () => {
      stopLoop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 1,
        opacity: visible ? 1 : 0,
        transition: "opacity 1.2s ease",
      }}
    />
  );
}
