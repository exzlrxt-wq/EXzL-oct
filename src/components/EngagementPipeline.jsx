"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./ProcessTimeline.module.css";

const STEPS = [
  { num: "01", label: "Diagnostic",         desc: "Paid audit of your current operations. We map the gaps, quantify the cost of each one, and deliver a written report. This is Charge 1 — it has standalone value." },
  { num: "02", label: "Proposal",           desc: "Based on the diagnostic, we scope exactly what needs building. Materials and Implementation costs are quoted separately and clearly — no bundles, no surprises." },
  { num: "03", label: "Materials",          desc: "Infrastructure and tooling procured and configured — VPS, APIs, integrations. Billed at cost plus setup. This is Charge 2." },
  { num: "04", label: "Implementation",     desc: "The actual build — automation, software, or system — deployed to production. Scoped to one of our package tiers. This is Charge 3." },
  { num: "05", label: "Handoff / Retainer", desc: "You own everything we build. Stay on a monthly retainer for ongoing monitoring and expansion, or take it fully in-house — your call." },
];

function Step({ step, index, total, scrollYProgress }) {
  const start   = 0.1 + (index / total) * 0.7;
  const end     = start + 0.12;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y       = useTransform(scrollYProgress, [start, end], [40, 0]);
  const lineScX = useTransform(scrollYProgress, [start, end], [0, 1]);

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

export default function EngagementPipeline() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.3"],
  });

  return (
    <section ref={ref} id="engagement-pipeline" className={styles.section} style={{ position: "relative" }}>
      <div className={`stencil ${styles.stencil}`}>PIPELINE</div>

      <motion.div
        className={styles.header}
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <span className="section-label">Engagement Pipeline</span>
          <h2 className={styles.title}>How it <em>actually</em> runs.</h2>
        </div>
      </motion.div>

      <div className={styles.grid}>
        {STEPS.map((s, i) => (
          <Step key={s.num} step={s} index={i} total={STEPS.length} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
