"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import styles from "./StatementSection.module.css";

const SLAT_COUNT = 10;

// ── Animated N — triggers only after text settles ──
function AnimatedN({ active }) {
  return (
    <motion.span
      style={{ display: "inline-block", originX: 0.5, originY: 1, willChange: "transform", position: "relative" }}
      animate={active ? {
        x: ["0em","0em","-1.25em","-1.25em","-1.25em","-0.6em","0em","0em"],
        y: ["0em","0em","0em","0em","0em","-1.4em","0.05em","0em"],
        rotate: [0,0,0,0,0,180,360,360],
        scaleY: [1,1,1,1,0.8,1.1,0.7,1],
      } : { x: "0em", y: "0em", rotate: 0, scaleY: 1 }}
      transition={active ? {
        duration: 4,
        times: [0,0.1,0.3,0.55,0.65,0.75,0.85,1],
        ease: ["linear","easeInOut","linear","easeOut","easeOut","easeIn","easeOut"],
        repeat: Infinity, repeatDelay: 2,
      } : { duration: 0 }}
    >N</motion.span>
  );
}

/**
 * IRIS BLIND REVEAL — B + C combined.
 *
 * Uses scaleY 1→0 (NOT rotateX) so perspective context inside
 * sticky/overflow:hidden is irrelevant. Each slat shrinks upward.
 *
 * Center slats (idx 4-5) open first  →  iris / radial feel (C)
 * All slats scale away               →  venetian blind feel (B)
 *
 * All slats clear by scrollYProgress ≈ 0.16, then text flies in.
 */
function Slat({ index, total, scrollYProgress }) {
  const dist   = Math.abs(index - (total - 1) / 2) / ((total - 1) / 2);
  const startP = 0.01 + dist * 0.06;
  const endP   = startP + 0.09;
  const scaleY = useTransform(scrollYProgress, [startP, endP], [1, 0]);
  // Once fully collapsed, set visibility:hidden so sub-pixel rounding
  // doesn't leave 1px horizontal strip artifacts
  const visibility = useTransform(scaleY, (v) => (v <= 0.01 ? "hidden" : "visible"));

  return (
    <motion.div
      className={styles.slat}
      style={{ scaleY, originY: 0, visibility }}
    />
  );
}

const DASHBOARD_URL = "/coming-soon";

export default function StatementSection() {
  const ref     = useRef(null);
  const reduced = useReducedMotion();
  const [nActive, setNActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end start"],  /* start tracking while section still entering — iris opens sooner */
  });

  // N animation triggers after text has settled
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p >= 0.38 && !nActive) setNActive(true);
    if (p <  0.32 && nActive)  setNActive(false);
  });

  // ── "Signal." from LEFT ──
  const rawSigX = useTransform(scrollYProgress, [0.06, 0.22], [-1100, 0]);
  const rawSigR = useTransform(scrollYProgress, [0.06, 0.22], [-5, 0]);
  const sigXspg = useSpring(rawSigX, { stiffness: 40, damping: 18, mass: 1.4 });
  // rotation uses raw transform (spring on X already covers smoothing)

  // ── "No Noise." from RIGHT ──
  const rawNnX = useTransform(scrollYProgress, [0.06, 0.22], [1100, 0]);
  const rawNnR = useTransform(scrollYProgress, [0.06, 0.22], [5, 0]);
  const nnXspg = useSpring(rawNnX, { stiffness: 36, damping: 18, mass: 1.6 });
  // rotation uses raw transform

  // ── Parallax drift once settled ──
  const sigParY = useTransform(scrollYProgress, [0.24, 0.65], [0, -24]);
  const nnParY  = useTransform(scrollYProgress, [0.24, 0.65], [0,  24]);

  // ── Scan line ──
  const lineScaleX = useTransform(scrollYProgress, [0.20, 0.32], [0, 1]);

  // ── Tagline ──
  const tagOp = useTransform(scrollYProgress, [0.26, 0.36], [0, 1]);
  const tagY  = useTransform(scrollYProgress, [0.26, 0.36], [30, 0]);

  // ── Stats + CTA ──
  const statOp = useTransform(scrollYProgress, [0.34, 0.46], [0, 1]);
  const statY  = useTransform(scrollYProgress, [0.34, 0.46], [22, 0]);

  // ── Botanical parallax ──
  const monParY  = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const fernParY = useTransform(scrollYProgress, [0, 1], [-40, 100]);
  const markR    = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const markOp   = useTransform(scrollYProgress, [0.10, 0.24], [0, 0.042]);

  // ── Content lift + spring handoff to next section ──
  const rawContentY = useTransform(scrollYProgress, [0.72, 1.0], [0, -120]);
  const contentY = useSpring(rawContentY, { stiffness: 80, damping: 25, mass: 1.2 });

  // ── Forest PNG — direct transform, no spring (Lenis smooths it already) ──
  const forestBottomOp = useTransform(scrollYProgress, [0.35, 0.55], [0, 0.14]);


  return (
    <section ref={ref} id="statement" className={styles.section}>
      <div className={styles.stickyWrap}>
        <div className={styles.sticky}>

          {/* ── Ambient signal mark ── */}
          <motion.img src="/signal_mark_nobg.png" alt="" aria-hidden="true"
            className={styles.mark}
            style={reduced ? {} : { opacity: markOp, rotate: markR }} />

          {/* ── Monstera: bottom-left ── */}
          <motion.img src="/monstera_nobg.png" alt="" aria-hidden="true"
            className={styles.monstera}
            style={reduced ? {} : { y: monParY }} />

          {/* ── Fern: top-right ── */}
          <motion.img src="/fern_nobg.png" alt="" aria-hidden="true"
            className={styles.fern}
            style={reduced ? {} : { y: fernParY }} />

          {/* Main content — scroll-driven y lift only, no conflicting whileInView */}
          <motion.div className={styles.inner} style={reduced ? {} : { y: contentY }}>

            <div className={styles.collision}>
              <motion.span className={styles.signal}
                style={reduced ? {} : { x: sigXspg, rotate: rawSigR, y: sigParY }}>
                Signal.
              </motion.span>
              <motion.span className={styles.noNoise}
                style={reduced ? {} : { x: nnXspg, rotate: rawNnR, y: nnParY }}>
                <span style={{ opacity: 0 }}>N</span>o{" "}
                <AnimatedN active={nActive} />
                <motion.span style={{ display: "inline-block" }}
                  animate={nActive ? { letterSpacing: ["-0.03em","0.06em","-0.03em"] } : { letterSpacing: "-0.03em" }}
                  transition={nActive ? { duration: 4, ease: "easeInOut", repeat: Infinity } : { duration: 0.3 }}>
                  oise.
                </motion.span>
              </motion.span>
            </div>

            {/* Scan line */}
            <div className={styles.lineWrap}>
              <motion.div className={styles.scanLine}
                style={reduced ? { scaleX: 1 } : { scaleX: lineScaleX }} />
            </div>

            <motion.p className={styles.tagline}
              style={reduced ? {} : { opacity: tagOp, y: tagY }}>
              Infrastructure built to scale without limits.
            </motion.p>

            <motion.div className={styles.statsRow}
              style={reduced ? {} : { opacity: statOp, y: statY }}>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statN}>10</span>
                  <span className={styles.statL}>Modules</span>
                </div>
                <div className={styles.statDiv} />
                <div className={styles.stat}>
                  <span className={styles.statN}>3</span>
                  <span className={styles.statL}>Workspaces</span>
                </div>
                <div className={styles.statDiv} />
                <div className={styles.stat}>
                  <span className={styles.statN}>0.01%</span>
                  <span className={styles.statL}>Error Rate</span>
                </div>
              </div>
              <a href={"#contact"} className={`${styles.cta} sp-cta`}>
                Get In Touch →
              </a>
            </motion.div>
          </motion.div>


          {/* Book-match PNG — inside sticky, spring-faded opacity so it never pops */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/forest top_nobg.png"
            alt=""
            aria-hidden="true"
            className={styles.forestBottom}
            style={reduced ? {} : { opacity: forestBottomOp }}
          />

        </div>
      </div>
    </section>
  );
}
