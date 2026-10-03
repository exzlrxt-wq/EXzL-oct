"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Wraps children in a left-to-right clip-path wipe reveal on scroll.
 * @param {{ children: React.ReactNode, delay?: number, className?: string, style?: object }} props
 */
export default function RevealClip({ children, delay = 0, className, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
      animate={inView || reduced ? { clipPath: "inset(0 0% 0 0)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
