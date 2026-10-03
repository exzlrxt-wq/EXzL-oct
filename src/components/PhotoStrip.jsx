"use client";

import { useEffect, useRef } from "react";
import styles from "./PhotoStrip.module.css";

const photos = [
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=85", label: "Studio · 2023", num: "01/05" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85", label: "Portrait · 2024", num: "02/05" },
  { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=700&q=85", label: "On Site · 2024", num: "03/05" },
  { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=85", label: "Process · 2024", num: "04/05" },
  { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=85", label: "Dev · 2025", num: "05/05" },
];

export default function PhotoStrip() {
  const stripRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stripRef.current) return;
      const r = stripRef.current.getBoundingClientRect();
      const pct = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      const off = (pct - 0.5) * 100;
      stripRef.current.querySelectorAll("." + styles.phImg).forEach((img, i) => {
        img.style.transform = `translateY(${i % 2 === 0 ? off : -off}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="strip" ref={stripRef} className={styles.strip}>
      <div className={styles.wrap}>
        {photos.map((p, i) => (
          <div key={i} className={styles.ph}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.phImg} src={p.src} alt="" />
            <span className={styles.lbl}>{p.label}</span>
            <span className={styles.num}>{p.num}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
