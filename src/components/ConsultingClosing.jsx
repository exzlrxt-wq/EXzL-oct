"use client";

import styles from "./Consulting.module.css";

const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/exzlr.corp/30min";

export default function ConsultingClosing() {
  return (
    <section className={styles.closing}>
      <h2 className={styles.closingLine}>
        The best companies don&apos;t need more people.<br />
        <span style={{ color: "var(--accent)", fontStyle: "italic" }}>They need better systems.</span>
      </h2>
      <p className={styles.closingSub}>
        I find what&apos;s broken, build the fix, and make sure it keeps running.
      </p>
      <div className={styles.ctaRow} style={{ justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
        <a href="/#contact" className={styles.btnPrimary}>Start with a free audit &rarr;</a>
        <a href="/#contact" className={styles.btnGhost}>Book a Call &rarr;</a>
        <a href="/services" className={styles.btnGhost}>Explore services &rarr;</a>
      </div>
    </section>
  );
}

