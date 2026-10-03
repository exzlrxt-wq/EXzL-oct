"use client";

import { motion } from "framer-motion";
import styles from "./Testimonials.module.css";

// ── Replace these with real quotes. Keep name/role/company ──────────────────
const testimonials = [
  {
    quote: "Two weeks. That's all it took. We'd been going back and forth on a spec for six months and he just built the thing. The automation alone freed up 30+ hours a week for my team.",
    name: "— Nirmal",
    role: "Founder",
    company: "Kalatutorium",
  },
  {
    quote: "No jargon, no black box. Every decision was explained before it was made — I knew exactly what was being built and why. Genuinely rare to work with someone who communicates like that.",
    name: "— Owner",
    role: "Café",
    company: "Yellow Marigold",
  },
  {
    quote: "The CRM isn't something we bought off a shelf. It fits exactly how we work. Three tools before this one collected dust. This one the team actually opens every morning.",
    name: "— Team",
    role: "Agency",
    company: "Ghost Productions Pvt. Ltd.",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <motion.div
        className={styles.header}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-label">What clients say</span>
      </motion.div>

      <div className={styles.grid}>
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={i}
            className={styles.card}
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.mark}>&ldquo;</span>
            <p className={styles.quote}>{t.quote}</p>
            <footer className={styles.who}>
              <span className={styles.name}>{t.name}</span>
              <span className={styles.role}>{t.role} · {t.company}</span>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
