"use client";

import { useEffect, useState, useRef } from "react";

const GLYPHS = ["✧", "✦", "⟡", "◈", "⏣", "⎔", "⌑", "⍟", "⎈", "⎊", "⌖", "⍚", "🜁", "🜄", "🜂", "🜃", "🜔", "🜍"];

export default function Loader() {
  const [phase, setPhase] = useState(0); // 0=particles, 1=scan, 2=done
  const canvasRef = useRef(null);
  const [scan, setScan] = useState(0);
  const scanRef = useRef(null);
  const scanStart = useRef(null);
  const SCAN_DUR = 900;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // ── KEY FIX: wait for fonts before measuring text pixels ──────────────
    const run = async () => {
      try {
        const fontSize = Math.min(W * 0.18, 180);
        // Wait specifically for Cormorant Garamond to be ready
        await document.fonts.load(`700 ${fontSize}px 'Cormorant Garamond'`);
        await document.fonts.ready;
      } catch (e) {
        // Continue even if font load fails — fallback serif is fine
      }

      // Offscreen canvas to extract pixel coords of "EXZLR"
      const off   = document.createElement("canvas");
      off.width   = W;
      off.height  = H;
      const oCtx  = off.getContext("2d", { willReadFrequently: true });

      oCtx.fillStyle = "black";
      oCtx.fillRect(0, 0, W, H);
      oCtx.fillStyle = "white";

      const fontSize = Math.min(W * 0.18, 180);
      oCtx.font          = `700 ${fontSize}px 'Cormorant Garamond', serif`;
      oCtx.textAlign     = "center";
      oCtx.textBaseline  = "middle";
      oCtx.letterSpacing = "-0.04em";
      oCtx.fillText("EXZLR", W / 2, H / 2);

      const imgData   = oCtx.getImageData(0, 0, W, H).data;
      const particles = [];

      // Fixed step — gives ~2000-4000 particles on most screens
      const isMobile = W < 768;
      const step     = isMobile ? 6 : 4;

      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const i = (y * W + x) * 4;
          if (imgData[i] > 100) {
            particles.push({
              tx: x,
              ty: y,
              angle:     Math.random() * Math.PI * 2,
              radius:    Math.max(W, H) * (0.8 + Math.random() * 0.5),
              spinSpeed: 0.02  + Math.random() * 0.03,
              speed:     0.014 + Math.random() * 0.014,
              progress:  0,
              delay:     Math.random() * 40,
              glyph:     GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
              isZ:       x > W * 0.42 && x < W * 0.58,
            });
          }
        }
      }

      let frame = 0;
      let raf;

      const draw = () => {
        ctx.fillStyle = "rgba(11, 10, 9, 0.4)";
        ctx.fillRect(0, 0, W, H);

        ctx.font          = "9px 'Cormorant Garamond', monospace";
        ctx.textAlign     = "center";
        ctx.textBaseline  = "middle";

        for (const p of particles) {
          if (frame > p.delay) {
            p.progress += p.speed;
            if (p.progress > 1) p.progress = 1;
          }
          const ease          = 1 - Math.pow(1 - p.progress, 3);
          p.angle            += p.spinSpeed * (1 - ease * 0.8);
          const currentRadius = p.radius * (1 - ease);
          const swirlX        = W / 2 + Math.cos(p.angle) * currentRadius;
          const swirlY        = H / 2 + Math.sin(p.angle) * currentRadius;
          const currentX      = swirlX * (1 - ease) + p.tx * ease;
          const currentY      = swirlY * (1 - ease) + p.ty * ease;

          if (ease === 1) {
            ctx.fillStyle = p.isZ
              ? "rgba(95, 138, 107, 0.85)" /* Glossy Sage/Olive */
              : "rgba(240, 237, 230, 0.9)";
            ctx.fillText(p.glyph, currentX + Math.sin(frame * 0.05 + p.tx) * 0.5, currentY + Math.cos(frame * 0.05 + p.ty) * 0.5);
          } else {
            ctx.fillStyle = "rgba(96, 117, 84, 0.45)"; /* Velvety Olive Moss */
            ctx.fillText(p.glyph, currentX, currentY);
          }
        }
        frame++;
        raf = requestAnimationFrame(draw);
      };

      draw();

      const t0 = setTimeout(() => {
        cancelAnimationFrame(raf);
        setPhase(1);
        scanStart.current = performance.now();

        function animScan(now) {
          const p = Math.min((now - scanStart.current) / SCAN_DUR, 1);
          setScan(p);
          if (p < 1) {
            scanRef.current = requestAnimationFrame(animScan);
          } else {
            setPhase(2);
          }
        }
        scanRef.current = requestAnimationFrame(animScan);
      }, 2800);

      return () => {
        clearTimeout(t0);
        cancelAnimationFrame(raf);
        if (scanRef.current) cancelAnimationFrame(scanRef.current);
      };
    };

    let cleanup;
    run().then((fn) => { cleanup = fn; });
    return () => { if (cleanup) cleanup(); };
  }, []);

  if (phase === 2) return null;

  const scanLine = `${scan * 100}%`;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999998, pointerEvents: phase === 1 ? "none" : "auto" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "var(--bg)",
        clipPath: phase === 1 ? `inset(${scanLine} 0 0 0)` : "inset(0 0 0 0)",
        transition: "none",
        zIndex: 1,
      }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      </div>

      {phase === 1 && (
        <div style={{
          position: "absolute", left: 0, right: 0, top: scanLine, height: "2px",
          background: "linear-gradient(to right, transparent 0%, var(--vine) 15%, var(--ink) 50%, var(--vine) 85%, transparent 100%)",
          boxShadow: "0 0 24px 4px rgba(95, 138, 107, .55), 0 0 60px 8px rgba(95, 138, 107, .18)",
          zIndex: 10, transform: "translateY(-1px)",
        }} />
      )}
    </div>
  );
}
