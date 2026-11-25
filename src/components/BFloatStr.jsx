"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Renders text with a per-character vertical float animation.
 * Automatically pauses CSS animations while off-screen so GPU isn't animating hidden chars.
 * @param {{ text: string, delay?: number, useGradient?: boolean }} props
 */
export default function BFloatStr({ text, delay = 0, useGradient = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.05 });

  return (
    <span ref={ref} className={inView ? undefined : "bfloat-paused"} style={{ display: "inline-block" }}>
      {text.split("").map((c, i) => {
        const gradStyles = useGradient ? {
          background: "linear-gradient(135deg, var(--ink) 0%, var(--olive-light) 30%, var(--acid) 65%, var(--moss) 100%)",
          backgroundSize: `${text.length * 100}% 100%`,
          backgroundPosition: `${(i / (text.length - 1)) * 100}% 0`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        } : {};

        return (
          <span
            key={`${c}-${i}`}
            className="bfloat"
            style={{
              animationDelay: `${delay + i * 0.08}s`,
              animationDuration: `${3.6 + (i % 3) * 0.3}s`,
              whiteSpace: "pre",
              ...gradStyles
            }}
          >
            {c}
          </span>
        );
      })}
    </span>
  );
}
