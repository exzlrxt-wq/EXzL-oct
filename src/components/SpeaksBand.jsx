"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import styles from "./SpeaksBand.module.css";

export default function SpeaksBand() {
  const bandRef = useRef(null);
  const inView = useInView(bandRef, { amount: 0.1 });

  return (
    <>
      <div ref={bandRef} id="speaks" className={styles.speaks}>
        {/* Scanlines overlay exactly like v3 */}
        <div className={styles.scanlines} />

        {/* Upside down forest background */}
        {/* next/image: wrapper carries all positioning & scaleY(-1); Image fills it */}
        <div
          className={styles.forestBg}
          style={{ position: "absolute", padding: 0 }}
          aria-hidden="true"
        >
          <Image
            src="/forest-top.webp"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            loading="lazy"
          />
        </div>

        <div className={styles.row}>
          {/* The new text — pulse effect isolated to 'Signal.' */}
          <div className={styles.txt}>
            Signal.{" "}
            <motion.em 
              className={styles.pulseWord}
              style={{ position: "relative", display: "inline-block" }}
            >
              {/* Hidden 'N' placeholder so the spacing stays correct for 'No' */}
              <span style={{ opacity: 0 }}>N</span>o{" "}
              
              {/* The traveling 'N' starting in 'Noise' */}
              <motion.span
                style={{ 
                  display: "inline-block", originX: 0.5, originY: 1, 
                  // Force a dedicated composite layer to prevent Webkit text-stroke rendering trails
                  willChange: "transform",
                  // Inherits transparent color and text-stroke from the parent .txt em
                }}
                animate={inView ? {
                  // Slide backwards to -1.25em, then jump forwards to 0em
                  x: ["0em", "0em", "-1.25em", "-1.25em", "-1.25em", "-0.6em", "0em", "0em"],
                  y: ["0em", "0em", "0em", "0em", "0em", "-1.4em", "0.05em", "0em"],
                  rotate: [0, 0, 0, 0, 0, 180, 360, 360],
                  scaleY: [1, 1, 1, 1, 0.8, 1.1, 0.7, 1]
                } : { x: "0em", y: "0em", rotate: 0, scaleY: 1 }}
                transition={inView ? {
                  duration: 4,
                  times: [0, 0.1, 0.3, 0.55, 0.65, 0.75, 0.85, 1],
                  // Explicit physics: linear rest -> easeInOut slide -> linear rest -> easeOut squash -> easeOut up -> easeIn down -> easeOut recover
                  ease: ["linear", "easeInOut", "linear", "easeOut", "easeOut", "easeIn", "easeOut"],
                  repeat: Infinity
                } : { duration: 0 }}
              >
                N
              </motion.span>
              
              {/* Only the 'oise.' part breathes, using compositor scaleX instead of layout-thrashing letterSpacing */}
              <motion.span
                style={{ display: "inline-block", transformOrigin: "left center", willChange: "transform" }}
                animate={inView ? { scaleX: [1, 1.06, 1] } : { scaleX: 1 }}
                transition={inView ? { duration: 4, ease: "easeInOut", repeat: Infinity } : { duration: 0.3 }}
              >
                oise.
              </motion.span>
            </motion.em>
          </div>

          <div className={styles.actions}>
            <div className={styles.sub}>
              <span>5 years</span>
              <span>47 projects</span>
              <span>Global</span>
            </div>
            <a href="#contact" className={`${styles.cta} sp-cta`}>Start a Project →</a>
          </div>
        </div>
      </div>
    </>
  );
}
