"use client";

import { useEffect, useRef } from "react";
import styles from "./Marquee.module.css";

const items = ["Design", "Development", "Identity", "Art Direction", "Brands", "Strategy", "Motion", "UX", "Branding", "Typography"];

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const html = [...items, ...items]
      .map((i) => `<span class="${styles.item}">${i}</span><span class="${styles.item} ${styles.accent}">✦</span>`)
      .join("");
    trackRef.current.innerHTML = html + html;
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.track} ref={trackRef} />
    </div>
  );
}
