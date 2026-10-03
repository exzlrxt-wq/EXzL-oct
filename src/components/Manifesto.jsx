"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import styles from "./Manifesto.module.css";

const WORDS = [
  { text: "Most",       hi: false },
  { text: "businesses", hi: false },
  { text: "don't",      hi: false },
  { text: "fail",       hi: true  },
  { text: "from",       hi: false },
  { text: "lack",       hi: false },
  { text: "of",         hi: false },
  { text: "ambition.",  hi: false },
  { text: "They",       hi: false },
  { text: "fail",       hi: true  },
  { text: "from",       hi: false },
  { text: "the",        hi: false },
  { text: "distance",   hi: true  },
  { text: "between",    hi: false },
  { text: "decision",   hi: true  },
  { text: "and",        hi: false },
  { text: "execution.", hi: true  },
];

/**
 * @param {{ word: object, progress: import('framer-motion').MotionValue, index: number, total: number }} props
 */
function Word({ word, progress, index, total }) {
  const reduced = useReducedMotion();
  const start = 0.1 + (index / total) * 0.7;
  const end   = start + 0.07;

  const opacity  = useTransform(progress, [start, end], [0.06, 1]);
  const y        = useTransform(progress, [start, end], [32, 0]);
  // ✅ Fixed: clipPath as a proper motion value — not .get() in render
  const clipPath = useTransform(progress, [start, end], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  // Per-word pulse: slight overshoot in scale as the word "lands"
  const scale    = useTransform(progress, [start, start + 0.035, end, end + 0.02], [0.95, 1.04, 1.01, 1.0]);

  if (reduced) {
    return (
      <span className={styles.wordWrap}>
        <span className={`${styles.word} ${word.hi ? styles.wordHi : ""}`}>{word.text}</span>
      </span>
    );
  }

  return (
    <span className={styles.wordWrap}>
      <motion.span
        className={`${styles.word} ${word.hi ? styles.wordHi : ""}`}
        style={{ opacity, y, clipPath, scale }}
      >
        {word.text}
      </motion.span>
    </span>
  );
}

export default function Manifesto() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.5"],
  });

  const sigOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className={styles.section}
      style={{ position: "relative" }}
    >
      {/* Botanical layers */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/bamboo.svg" alt="" aria-hidden="true" className={styles.botBamboo} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/banana_leaf.svg" alt="" aria-hidden="true" className={styles.botBanana} />

      <div className={`stencil ${styles.stencil}`}>DOCTRINE</div>



      <p className={styles.quote}>
        {WORDS.map((word, i) => (
          <Word key={word.text + i} word={word} progress={scrollYProgress} index={i} total={WORDS.length} />
        ))}
      </p>


    </section>
  );
}
