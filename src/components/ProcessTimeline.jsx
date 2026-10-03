"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import RevealClip from "./RevealClip";
import styles from "./ProcessTimeline.module.css";

/** @type {{ num: string, label: string, desc: string }[]} */
const STEPS = [
  { num: "01", label: "Audit",        desc: "Map every gap between your current operations and what they need to become. We diagnose before we prescribe." },
  { num: "02", label: "Architecture", desc: "Design the operational blueprint — roles, workflow logic, data flows, and integration touchpoints." },
  { num: "03", label: "Configure",    desc: "Build your workforce and automation layer — calibrated to your pipeline, not a generic template." },
  { num: "04", label: "Deploy",       desc: "Production-grade rollout with live monitoring, CRM sync, billing hooks, and zero tolerance for downtime." },
  { num: "05", label: "Compound",     desc: "Your OS learns, adapts, and compounds returns over time. We don\u2019t hand off — we stay in the loop." },
];

function Step({ step, index, total, scrollYProgress }) {
  const reduced = useReducedMotion();
  const start = 0.1 + (index / total) * 0.7;
  const end   = start + 0.12;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y       = useTransform(scrollYProgress, [start, end], [50, 0]);
  const lineScX = useTransform(scrollYProgress, [start, end], [0, 1]);

  if (reduced) {
    return (
      <div className={styles.step}>
        <div className={styles.stepHead}>
          <span className={styles.stepNum}>{step.num}</span>
          <h3 className={styles.stepLabel}>{step.label}</h3>
        </div>
        <div className={styles.lineTrack}><div className={styles.lineFill} style={{ width: "100%" }} /></div>
        <p className={styles.stepDesc}>{step.desc}</p>
      </div>
    );
  }

  return (
    <motion.div className={styles.step} style={{ opacity, y }}>
      <div className={styles.stepHead}>
        <span className={styles.stepNum}>{step.num}</span>
        <h3 className={styles.stepLabel}>{step.label}</h3>
      </div>
      <div className={styles.lineTrack}>
        <motion.div className={styles.lineFill} style={{ scaleX: lineScX, transformOrigin: "left" }} />
      </div>
      <p className={styles.stepDesc}>{step.desc}</p>
    </motion.div>
  );
}

export default function ProcessTimeline() {
  const ref     = useRef(null);
  const reduced = useReducedMotion();

  // Outer scroll — drives step reveals
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.3"],
  });

  // Entrance scroll — section slides in from the right as it enters viewport
  const { scrollYProgress: entranceP } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  // Raw X: +120px → 0 over the entrance window, spring-smoothed
  const rawEntranceX = useTransform(entranceP, [0, 1], [120, 0]);
  const entranceX    = useSpring(rawEntranceX, { stiffness: 100, damping: 22, mass: 0.7 });

  return (
    <section ref={ref} id="process" className={styles.section} style={{ position: "relative" }}>
      
      <div className={`stencil ${styles.stencil}`}>PIPELINE</div>

      {/* Entire inner content block sweeps in from the right */}
      <motion.div style={reduced ? {} : { x: entranceX }}>
        <motion.div
          className={styles.header}
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="section-label">Deployment Pipeline</span>
            <RevealClip>
              <h2 className={styles.title}>The <em>Pipeline.</em></h2>
            </RevealClip>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {STEPS.map((s, i) => (
            <Step key={s.num} step={s} index={i} total={STEPS.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </motion.div>

      {/* Book-match PNG — normal orientation, solid at top (seam), fades into Process */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/forest top_nobg.png" alt="" className={styles.forestTopMask} aria-hidden="true" />
    </section>
  );
}
