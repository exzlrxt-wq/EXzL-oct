"use client";

// Fixed full-screen background layer — must match var(--bg) = #0b0a09 exactly.
// Any difference between this and section backgrounds creates visible strips when
// sections have transparent/semi-transparent areas.
export default function BackgroundShift() {
  return (
    <div
      aria-hidden="true"
      style={{
        backgroundColor: "#0b0a09",
        position: "fixed",
        inset: 0,
        zIndex: -100,
        pointerEvents: "none",
      }}
    />
  );
}
