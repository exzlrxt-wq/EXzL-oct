"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./About.module.css";

/** @type {string[]} */
const skills = ["Workflow Automation", "CRM Systems", "Billing & Revenue", "Web Applications", "Sales Automation", "System Integration", "Content Pipelines", "Reporting & Analytics", "Internal Tooling"];

export default function About() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [80, -140]);

  return (
    <section ref={containerRef} id="about" className={styles.section} style={{ position: "relative" }}>

      {/* Botanical layers */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hibiscus.svg" alt="" aria-hidden="true" className={styles.botHibiscus} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/leaf_scatter.svg" alt="" aria-hidden="true" className={styles.botScatter} />

      <div className={styles.grid}>
        <motion.div
          className={styles.imgWrap}
          initial={{ x: -32, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div style={{ y: imgY }} className={styles.frame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/exzlr-logo-main.png"
              alt="EXZLR Logo"
              loading="lazy"
              style={{ objectFit: 'contain', padding: '2rem', backgroundColor: '#0e0d0b' }}
            />
            <div className={styles.deco} />
          </motion.div>
        </motion.div>

        <div className={styles.text}>
          <motion.div
            className="section-label"
            style={{ marginBottom: 20 }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Platform
          </motion.div>

          <motion.p
            className={styles.body}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            A business operating system built around the gap between what companies plan and what actually runs. Every workflow load-bearing. Every result traceable.
          </motion.p>

          <motion.p
            className={styles.body}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            EXZLR is the technology and AI brand of Kaltech Wayducation Pvt. Ltd., focused on building software, automation platforms, and digital solutions for modern businesses. Working with founders and teams globally.
          </motion.p>

          <motion.div
            className={styles.skills}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {skills.map((sk) => (
              <span key={sk} className={`${styles.sk} sk`}>{sk}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
