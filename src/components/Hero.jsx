"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate, useInView } from "framer-motion";
import BFloatStr from "./BFloatStr";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef(null);
  const inView = useInView(heroRef, { amount: 0.05 });
  const { scrollY } = useScroll();
  const stencilY  = useTransform(scrollY, [0, 1000], [0, 350]);
  const transform = useMotionTemplate`translate(-50%, calc(-52% + ${stencilY}px))`;

  const [hasPlayed, setHasPlayed] = useState(null);

  useEffect(() => {
    setHasPlayed(sessionStorage.getItem("exzlr_loader_played") === "true");
  }, []);

  // Botanical parallax — independent rates for depth layering
  const palmY = useTransform(scrollY, [0, 800], [0, -120]);
  const vineY = useTransform(scrollY, [0, 800], [0, -350]);

  const introMode = hasPlayed === false;

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${inView ? "" : styles.heroPaused}`}
      id="home"
    >
      {/* ── Botanical layers — parallax float, screen blend ── */}
      <motion.div className={styles.botPalm} style={{ y: palmY, rotate: -20, scaleX: -1 }} aria-hidden="true">
        <Image src="/palm_nobg.webp" alt="" width={1024} height={1024} sizes="(max-width: 768px) 260px, 36vw" preload style={{ width: "100%", height: "auto", display: "block" }} />
      </motion.div>
      <motion.div className={styles.botVine} style={{ y: vineY }} aria-hidden="true">
        <Image src="/vine_nobg.webp" alt="" width={1024} height={1024} sizes="(max-width: 768px) 280px, 42vw" preload style={{ width: "100%", height: "auto", display: "block" }} />
      </motion.div>

      {/* Background Stencil */}
      <motion.div style={{ transform }} className={`stencil ${styles.stencilDesign}`}>
        CONTINUUM
      </motion.div>

      <div key={introMode ? "intro" : "ready"} style={{ visibility: hasPlayed === null ? "hidden" : "visible" }}>
        <h1 className={styles.title}>
          <span className={`${styles.line} ${styles.blurredLine}`}>
            <motion.em
              className={styles.lineInner}
              initial={introMode ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: introMode ? 3.9 : 0, ease: "linear" }}
            >
              <BFloatStr text="EXZLR" delay={introMode ? 4.2 : 0} useGradient={true} />
            </motion.em>
          </span>
          <span className={styles.line}>
            <motion.span
              className={`${styles.lineInner} ${styles.ghost}`}
              initial={introMode ? { y: "110%" } : false}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: introMode ? 4.5 : 0, ease: [0.16, 1, 0.3, 1] }}
            >
              <BFloatStr text="Beyond." delay={introMode ? 4.5 : 0} />
            </motion.span>
          </span>
        </h1>

        <motion.div
          className={styles.subGrid}
          initial={introMode ? { opacity: 0, y: 28 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: introMode ? 4.5 : 0, ease: [0.16, 1, 0.3, 1] }}
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
          initial={introMode ? { opacity: 0, y: 28 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: introMode ? 4.7 : 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#contact" className={`${styles.cta} h-cta`}>Book a Call →</a>
        </motion.div>
      </div>
    </section>
  );
}
