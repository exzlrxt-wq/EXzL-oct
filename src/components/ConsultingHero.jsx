"use client";

import styles from "./Consulting.module.css";

export default function ConsultingHero() {
  return (
    <section className={styles.hero}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/palm_nobg.png" alt="" width={400} height={600} style={{ opacity: 0.1, maxWidth: '400px', position: 'absolute', top: 0, right: '-10vw', pointerEvents: 'none' }} className={styles.botPalm} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/vine_nobg.png" alt="" width={600} height={800} style={{ opacity: 0.08, maxWidth: '600px', position: 'absolute', top: '40%', left: '-20vw', pointerEvents: 'none' }} className={styles.botVine} />

      <div className={styles.heroEyebrow}>Ojas / EXZLR</div>
      <h1 className={styles.heroClaim}>
        I build systems that make businesses run <em>without you.</em>
      </h1>
      <p className={styles.heroSub}>
        Workflow automation. Custom software. Content pipelines.<br />
        <strong>One person who thinks like a founder</strong> &mdash; and has shipped real products to prove it.
      </p>
      
      <p className={styles.heroMusic}>
        Also: Experimental composer &amp; sound designer.<br />
        Building algorithmic art under Cymatrix / Artiso.
      </p>

      <div className={styles.ctaRow}>
        <a href="/#contact" className={styles.btnPrimary}>Start with a free audit &rarr;</a>
        <a href="#contact" className={styles.btnGhost}>Reach out directly</a>
      </div>
    </section>
  );
}
