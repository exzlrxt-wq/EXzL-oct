"use client";

import { motion } from "framer-motion";
import styles from "./ConsultingNav.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ConsultingNav() {
  const [time, setTime] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime([n.getHours(), n.getMinutes(), n.getSeconds()].map((v) => String(v).padStart(2, "0")).join(":") + " IST");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ zIndex: 9001 }}
    >
      <div className={styles.nLeft}>
        <Link href="/" prefetch={true} className={styles.logo}>
          EXZLR
        </Link>
      </div>
      <div className={styles.nRight}>
        <span className={styles.clock}>{time}</span>
        {pathname !== "/brochure" && <Link href="/brochure" prefetch={true} className={styles.navLink}>Brochure</Link>}
        {pathname !== "/services" && <Link href="/services" prefetch={true} className={styles.navLink}>Services</Link>}
        <a href="/#contact" className={styles.navLink}>Get in touch</a>
      </div>
    </motion.nav>
  );
}
