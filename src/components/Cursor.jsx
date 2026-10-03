"use client";

import { useEffect, useRef, useCallback } from "react";

const DOT_SIZE   = 5;
const RING_SIZE  = 36;
const RING_LARGE = 80;

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const txtRef  = useRef(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const rafRef = useRef(null);

  const loop = useCallback(() => {
    rx.current += (mx.current - rx.current) * 0.1;
    ry.current += (my.current - ry.current) * 0.1;
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${mx.current - DOT_SIZE / 2}px, ${my.current - DOT_SIZE / 2}px)`;
    }
    if (ringRef.current) {
      const half = ringRef.current.offsetWidth / 2;
      ringRef.current.style.transform = `translate(${rx.current - half}px, ${ry.current - half}px)`;
    }
    if (txtRef.current) {
      txtRef.current.style.left = mx.current + "px";
      txtRef.current.style.top  = my.current + "px";
    }
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const handleMove = (e) => { mx.current = e.clientX; my.current = e.clientY; };
    window.addEventListener("mousemove", handleMove, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    const expand = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width = `${RING_LARGE}px`;
      ringRef.current.style.height = `${RING_LARGE}px`;
      ringRef.current.style.background = "var(--acid-dim)";
      ringRef.current.style.borderColor = "var(--acid)";
    };
    const contract = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width = `${RING_SIZE}px`;
      ringRef.current.style.height = `${RING_SIZE}px`;
      ringRef.current.style.background = "transparent";
      ringRef.current.style.borderColor = "var(--border)";
      ringRef.current.style.borderRadius = "50%";
    };

    const onEnter = (e) => {
      if (e.target.closest("a, button")) expand();
      if (e.target.closest(".sk, .stat") && ringRef.current) ringRef.current.style.borderRadius = "4px";
      if (e.target.closest(".w-row") && txtRef.current) {
        txtRef.current.textContent = "Expand →";
        txtRef.current.style.transform = "translate(-50%, 30px) scale(1)";
      }
    };
    const onLeave = (e) => {
      if (e.target.closest("a, button")) contract();
      if (e.target.closest(".sk, .stat")) contract();
      if (e.target.closest(".w-row") && txtRef.current) {
        txtRef.current.style.transform = "translate(-50%, -50%) scale(0)";
      }
    };
    document.body.addEventListener("mouseenter", onEnter, true);
    document.body.addEventListener("mouseleave", onLeave, true);

    const handleMouseLeaveWindow = () => {
      document.body.style.cursor = "auto";
      contract();
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (txtRef.current) txtRef.current.style.opacity = "0";
    };
    const handleMouseEnterWindow = () => {
      document.body.style.cursor = "none";
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (txtRef.current) txtRef.current.style.opacity = "1";
    };
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    const TRANSITION_ON  = "transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    const TRANSITION_OFF = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";

    const onMagMove = (e) => {
      const btn = e.target.closest(".mag-btn, .h-cta, .btn-a, .av-mag, .nav-trigger, .sp-cta");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      btn.style.transition = TRANSITION_ON;
      btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    };
    const onMagLeave = (e) => {
      const btn = e.target.closest(".mag-btn, .h-cta, .btn-a, .av-mag, .nav-trigger, .sp-cta");
      if (btn) {
        btn.style.transition = TRANSITION_OFF;
        btn.style.transform = "";
      }
    };
    document.body.addEventListener("mousemove", onMagMove);
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
  }, [loop]);

  return (
    <>
      <div ref={dotRef} id="cdot" style={{ position:"fixed", top:0, left:0, width:`${DOT_SIZE}px`, height:`${DOT_SIZE}px`, background:"var(--acid)", borderRadius:"50%", pointerEvents:"none", zIndex:99999, willChange:"transform" }} />
      <div ref={ringRef} id="cring" style={{ position:"fixed", top:0, left:0, width:`${RING_SIZE}px`, height:`${RING_SIZE}px`, border:"1px solid var(--border)", borderRadius:"50%", pointerEvents:"none", zIndex:99998, transition:"width .45s cubic-bezier(.16,1,.3,1), height .45s cubic-bezier(.16,1,.3,1), background .4s, border-color .3s, border-radius .4s", willChange:"transform" }} />
      <div ref={txtRef} id="ctxt" style={{ position:"fixed", pointerEvents:"none", zIndex:99997, fontFamily:"var(--mono)", fontSize:"8px", letterSpacing:".14em", textTransform:"uppercase", color:"var(--bg)", background:"var(--acid)", padding:"4px 9px", transform:"translate(-50%,-50%) scale(0)", transition:"transform .3s cubic-bezier(.34,1.56,.64,1)", whiteSpace:"nowrap" }} />
    </>
  );
}
