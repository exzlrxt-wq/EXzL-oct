"use client";

import Image from "next/image";
import styles from "./Consulting.module.css";

export default function ConsultingHero() {
  return (
    <section className={styles.hero}>
      <Image src="/palm_nobg.webp" alt="" width={1024} height={1024} sizes="400px" style={{ opacity: 0.1, maxWidth: '400px', height: 'auto', position: 'absolute', top: 0, right: '-10vw', pointerEvents: 'none' }} className={styles.botPalm} loading="lazy" />
      <Image src="/vine_nobg.webp" alt="" width={1024} height={1024} sizes="600px" style={{ opacity: 0.08, maxWidth: '600px', height: 'auto', position: 'absolute', top: '40%', left: '-20vw', pointerEvents: 'none' }} className={styles.botVine} loading="lazy" />

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
        <a href="/#contact" className={styles.btnGhost}>Reach out directly</a>
      </div>
    </section>
  );
}
