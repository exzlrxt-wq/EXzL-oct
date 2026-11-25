"use client";

import { motion } from "framer-motion";
import styles from "./ConsultingNav.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLenis } from "./LenisContext";

function IstClock({ className }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime([n.getHours(), n.getMinutes(), n.getSeconds()].map((v) => String(v).padStart(2, "0")).join(":") + " IST");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className={className}>{time}</span>;
}

export default function ConsultingNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  const closeMenu = () => {
    setMenuOpen(false);
    lenis?.start();
  };

  const toggleMenu = () => {
    if (menuOpen) closeMenu();
    else {
      setMenuOpen(true);
      lenis?.stop();
    }
  };

  // Close drawer on route change or Escape key
  useEffect(() => {
    closeMenu();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  return (
    <>
      {menuOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div
        id="consulting-mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileLinks}>
          <Link href="/" prefetch={true} onClick={closeMenu} className={styles.mobileLink}>
            <span>01</span>
            <span>Home</span>
          </Link>
          {pathname !== "/brochure" && (
            <Link href="/brochure" prefetch={true} onClick={closeMenu} className={styles.mobileLink}>
              <span>02</span>
              <span>Brochure</span>
            </Link>
          )}
          {pathname !== "/services" && (
            <Link href="/services" prefetch={true} onClick={closeMenu} className={styles.mobileLink}>
              <span>02</span>
              <span>Services</span>
            </Link>
          )}
          <a href="/#contact" onClick={closeMenu} className={`${styles.mobileLink} ${styles.mobileLinkAccent}`}>
            <span>03</span>
            <span>Get in touch →</span>
          </a>
        </div>
      </div>

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
          <IstClock className={styles.clock} />
          {pathname !== "/brochure" && <Link href="/brochure" prefetch={true} className={styles.navLink}>Brochure</Link>}
          {pathname !== "/services" && <Link href="/services" prefetch={true} className={styles.navLink}>Services</Link>}
          <a href="/#contact" className={styles.navLink}>Get in touch</a>
          <button
            type="button"
            className={`${styles.trigger} ${menuOpen ? styles.triggerOpen : ""}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="consulting-mobile-menu"
          >
            <span /><span />
          </button>
        </div>
      </motion.nav>
    </>
  );
}
