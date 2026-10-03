"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealClip from "./RevealClip";
import BFloatStr from "./BFloatStr";
import styles from "./Workspace3.module.css";

const ROLES = [
  {
    tag: "[SLS.01]",
    title: "Head of Sales",
    desc: "Qualifies leads, runs outreach sequences, updates CRM, flags closes.",
    icon: (
      <svg className={styles.cardIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    )
  },
  {
    tag: "[OPS.02]",
    title: "Operations Lead",
    desc: "Routes tasks, monitors workflows, flags blockers before they cost you.",
    icon: (
      <svg className={styles.cardIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="3" width="6" height="6" rx="1" />
        <rect x="9" y="15" width="6" height="6" rx="1" />
        <path d="M9 6h6M12 6v9" />
      </svg>
    )
  },
  {
    tag: "[CNT.03]",
    title: "Content Lead",
    desc: "Drafts, schedules, and publishes across channels on your cadence.",
    icon: (
      <svg className={styles.cardIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <path d="M7 8h10M7 12h10M7 16h6" />
      </svg>
    )
  },
  {
    tag: "[FIN.04]",
    title: "Finance Officer",
    desc: "Tracks billing, flags overdue accounts, generates revenue reports.",
    icon: (
      <svg className={styles.cardIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    )
  },
  {
    tag: "[ENG.05]",
    title: "Engineer",
    desc: "Maintains integrations, monitors system health, deploys updates.",
    icon: (
      <svg className={styles.cardIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    )
  },
  {
    tag: "[HR.06]",
    title: "HR Lead",
    desc: "Onboards new hires, manages documentation, tracks performance cycles.",
    icon: (
      <svg className={styles.cardIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="6" r="3" />
        <path d="M6 18a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4" />
        <line x1="6" y1="18" x2="18" y2="18" />
      </svg>
    )
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.08 * i,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const DASHBOARD_URL = "/coming-soon";

export default function Workspace3() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Subtle parallax nudge on the stencil */
  const stencilY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="workspace3" className={styles.section}>

      {/* Background stencil */}
      <motion.div className={`stencil ${styles.stencil}`} style={{ y: stencilY }} aria-hidden="true">
        WORKFORCE
      </motion.div>

      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <RevealClip>
          <h2 className={styles.heading}>
            <BFloatStr text="You're the CEO." /><br />
            <em><BFloatStr text="Your workforce is already hired." /></em>
          </h2>
        </RevealClip>
        <p className={styles.body}>
          Step into the seat. EXZLR gives you a fully staffed organization — a Head of Sales who
          never misses follow-up, an Engineer who ships on deadline, a Content Lead who publishes
          while you sleep. You set the strategy. Your team executes it. Around the clock, without
          the overhead.
        </p>
      </motion.div>

      {/* Role Grid */}
      <div className={styles.grid}>
        {ROLES.map((role, i) => (
          <motion.div
            key={role.title}
            className={styles.card}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardTag}>{role.tag}</span>
              {role.icon}
            </div>
            <h3 className={styles.cardTitle}>{role.title}</h3>
            <p className={styles.cardDesc}>{role.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <a href={"/#contact"} className={`${styles.ctaBtn} mag-btn`}>Get In Touch ✦</a>
        <span className={styles.footnote}>Headcount without the hiring freeze.</span>
      </div>
    </section>
  );
}
