"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import BFloatStr from "./BFloatStr";
import styles from "./Hero.module.css";

const DASHBOARD_URL = "/coming-soon";

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const stencilY  = useTransform(scrollY, [0, 1000], [0, 350]);
  const transform = useMotionTemplate`translate(-50%, calc(-52% + ${stencilY}px))`;

  const [hasPlayed, setHasPlayed] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHasPlayed(sessionStorage.getItem("exzlr_loader_played") === "true");
  }, []);

  // Botanical parallax — independent rates for depth layering
  const palmY   = useTransform(scrollY, [0, 800], [0,  -120]);
  const vineY   = useTransform(scrollY, [0, 800], [0,  -350]);
  const branchY = useTransform(scrollY, [0, 800], [0,  -200]);

  // Prevent hydration mismatch and skip animations if already played
  if (hasPlayed === null) {
    return (
      <section className={styles.hero} id="home">
        <div style={{ opacity: 0 }} className={styles.subtext}>Loading</div>
      </section>
    );
  }

  return (
    <section className={styles.hero} id="home">
      {/* ── Botanical layers — parallax float, screen blend ── */}
      <motion.img src="/palm_nobg.png" alt="" aria-hidden="true"
        className={styles.botPalm} style={{ y: palmY, rotate: -20, scaleX: -1 }} />
      <motion.img src="/vine_nobg.png" alt="" aria-hidden="true"
        className={styles.botVine} style={{ y: vineY }} />

      {/* Background Stencil */}
      <motion.div style={{ transform }} className={`stencil ${styles.stencilDesign}`}>
        CONTINUUM
      </motion.div>

      <h1 className={styles.title}>
        <span className={`${styles.line} ${styles.blurredLine}`}>
          <motion.em
            className={styles.lineInner}
            initial={hasPlayed ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: hasPlayed ? 0 : 3.9, ease: "linear" }}
          >
            <BFloatStr text="EXZLR" delay={hasPlayed ? 0 : 4.2} useGradient={true} />
          </motion.em>
        </span>
        <span className={styles.line}>
          <motion.span
            className={`${styles.lineInner} ${styles.ghost}`}
            initial={hasPlayed ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: hasPlayed ? 0 : 4.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <BFloatStr text="Beyond." delay={hasPlayed ? 0 : 4.5} />
          </motion.span>
        </span>
      </h1>

      <motion.div
        className={styles.subGrid}
        initial={hasPlayed ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: hasPlayed ? 0 : 4.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div />
        <div className={styles.subItem}>
          <p>
            <span className={styles.symbolInline}>∴</span>
            {" "}Your next timeline is already live — and it&apos;s been waiting.
          </p>
        </div>
        <div />
      </motion.div>

      <motion.div
        className={styles.bottom}
        initial={hasPlayed ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: hasPlayed ? 0 : 4.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#contact" className={`${styles.cta} h-cta`}>Book a Call →</a>
      </motion.div>
    </section>
  );
}
