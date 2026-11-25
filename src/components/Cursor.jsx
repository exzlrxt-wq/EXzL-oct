"use client";

import { useEffect, useRef, useCallback } from "react";

const DOT_SIZE = 5;
const RING_SIZE = 36;
const RING_SCALE_LARGE = 80 / 36;

export default function Cursor() {
  const dotRef = useRef(null);
  const ringPosRef = useRef(null);
  const ringVisualRef = useRef(null);
  const txtRef = useRef(null);
  const mx = useRef(-100);
  const my = useRef(-100);
  const rx = useRef(-100);
  const ry = useRef(-100);
  const txtVisible = useRef(false);
  const rafRef = useRef(null);

  const loop = useCallback(() => {
    const dx = mx.current - rx.current;
    const dy = my.current - ry.current;
    const settled = Math.abs(dx) < 0.08 && Math.abs(dy) < 0.08;

    if (settled) {
      rx.current = mx.current;
      ry.current = my.current;
    } else {
      rx.current += dx * 0.14;
      ry.current += dy * 0.14;
    }

    if (ringPosRef.current) {
      ringPosRef.current.style.transform = `translate3d(${rx.current}px, ${ry.current}px, 0)`;
    }

    if (settled) {
      rafRef.current = null;
      return;
    }
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const wake = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const handleMove = (e) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      // Dot + label track pointer immediately on compositor without reading layout
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx.current - DOT_SIZE / 2}px, ${my.current - DOT_SIZE / 2}px, 0)`;
      }
      if (txtRef.current && txtVisible.current) {
        txtRef.current.style.transform = `translate3d(${mx.current}px, ${my.current}px, 0) translate(-50%, 30px) scale(1)`;
      }
      wake();
    };
    window.addEventListener("mousemove", handleMove, { passive: true });

    const expand = () => {
      if (!ringVisualRef.current) return;
      ringVisualRef.current.style.transform = `translate(-50%, -50%) scale(${RING_SCALE_LARGE})`;
      ringVisualRef.current.style.background = "var(--acid-dim)";
      ringVisualRef.current.style.borderColor = "var(--acid)";
    };
    const contract = () => {
      if (!ringVisualRef.current) return;
      ringVisualRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      ringVisualRef.current.style.background = "transparent";
      ringVisualRef.current.style.borderColor = "var(--border)";
      ringVisualRef.current.style.borderRadius = "50%";
    };

    const onEnter = (e) => {
      if (e.target.closest("a, button")) expand();
      if (e.target.closest(".sk, .stat") && ringVisualRef.current) {
        ringVisualRef.current.style.borderRadius = "4px";
      }
      if (e.target.closest(".w-row") && txtRef.current) {
        txtVisible.current = true;
        txtRef.current.textContent = "Expand →";
        txtRef.current.style.transform = `translate3d(${mx.current}px, ${my.current}px, 0) translate(-50%, 30px) scale(1)`;
      }
    };
    const onLeave = (e) => {
      if (e.target.closest("a, button")) contract();
      if (e.target.closest(".sk, .stat")) contract();
      if (e.target.closest(".w-row") && txtRef.current) {
        txtVisible.current = false;
        txtRef.current.style.transform = `translate3d(${mx.current}px, ${my.current}px, 0) translate(-50%, -50%) scale(0)`;
      }
    };
    document.body.addEventListener("mouseenter", onEnter, true);
    document.body.addEventListener("mouseleave", onLeave, true);

    const handleMouseLeaveWindow = () => {
      document.body.style.cursor = "auto";
      contract();
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringPosRef.current) ringPosRef.current.style.opacity = "0";
      if (txtRef.current) txtRef.current.style.opacity = "0";
    };
    const handleMouseEnterWindow = () => {
      document.body.style.cursor = "none";
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringPosRef.current) ringPosRef.current.style.opacity = "1";
      if (txtRef.current) txtRef.current.style.opacity = "1";
    };
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    const TRANSITION_ON = "transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    const TRANSITION_OFF = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";

    const onMagMove = (e) => {
      const btn = e.target.closest(".mag-btn, .h-cta, .btn-a, .av-mag, .nav-trigger, .sp-cta");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      btn.style.transition = TRANSITION_ON;
      btn.style.transform = `translate3d(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px, 0)`;
    };
    const onMagLeave = (e) => {
      const btn = e.target.closest(".mag-btn, .h-cta, .btn-a, .av-mag, .nav-trigger, .sp-cta");
      if (btn) {
        btn.style.transition = TRANSITION_OFF;
        btn.style.transform = "";
      }
    };
    document.body.addEventListener("mousemove", onMagMove, { passive: true });
    document.body.addEventListener("mouseleave", onMagLeave, true);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.removeEventListener("mouseenter", onEnter, true);
      document.body.removeEventListener("mouseleave", onLeave, true);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.body.removeEventListener("mousemove", onMagMove);
      document.body.removeEventListener("mouseleave", onMagLeave, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [wake]);

  return (
    <>
      <div
        ref={dotRef}
        id="cdot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${DOT_SIZE}px`,
          height: `${DOT_SIZE}px`,
          background: "var(--acid)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />
      <div
        ref={ringPosRef}
        id="cring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
        }}
      >
        <div
          ref={ringVisualRef}
          style={{
            width: `${RING_SIZE}px`,
            height: `${RING_SIZE}px`,
            border: "1px solid var(--border)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%) scale(1)",
            transition:
              "transform .45s cubic-bezier(.16,1,.3,1), background .4s, border-color .3s, border-radius .4s",
            willChange: "transform",
          }}
        />
      </div>
      <div
        ref={txtRef}
        id="ctxt"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99997,
          fontFamily: "var(--mono)",
          fontSize: "8px",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--bg)",
          background: "var(--acid)",
          padding: "4px 9px",
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(0)",
          transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      />
    </>
  );
}
