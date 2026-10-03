"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLenis } from "./LenisContext";
import styles from "./Nav.module.css";

const DASHBOARD_URL = "/coming-soon";

function ScrambleNum({ num, active }) {
  const [display, setDisplay] = useState(num);
  const timerRef = useRef(null);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (!active) { setDisplay(num); return; }
    let frame = 0;
    timerRef.current = setInterval(() => {
      frame++;
      if (frame >= 6) { setDisplay(num); clearInterval(timerRef.current); }
      else setDisplay(String(Math.floor(Math.random() * 100)).padStart(2, "0"));
    }, 55);
    return () => clearInterval(timerRef.current);
  }, [active, num]);

  return <span className={styles.fmNum}>{display}</span>;
}

const menuItems = [
  { label: "Work",       href: "#work",    num: "01" },
  { label: "Brochure",   href: "/brochure",num: "02" },
  { label: "Contact",    href: "#contact", num: "03" },
  { label: "About",      href: "#about",   num: "04" },
];

export default function Nav() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [time,       setTime]       = useState("");
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const lenis = useLenis();
  const router = useRouter();

  const [hasPlayed, setHasPlayed] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasPlayed(sessionStorage.getItem("exzlr_loader_played") === "true");
    }
  }, []);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime([n.getHours(), n.getMinutes(), n.getSeconds()].map((v) => String(v).padStart(2, "0")).join(":") + " IST");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
    lenis?.stop();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setHoveredIdx(-1);
    lenis?.start();
  };

  // Only Escape key — NO mousedown outside listener (causes toggle race condition)
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start(); // Ensure scroll is unlocked if unmounted while open
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  const handleNav = (e, href) => {
    e.preventDefault();
    if (!href.startsWith("#")) {
      closeMenu();
      // Use router.push so GlobalTransition's click interceptor fires the overlay
      setTimeout(() => router.push(href), 50);
      return;
    }
    closeMenu();
    const el = document.querySelector(href);
    if (!el) return;
    setTimeout(() => {
      if (lenis) lenis.scrollTo(el, { offset: -64 });
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
    }, 400); // wait for menu close animation
  };

  // Prevent hydration mismatch and skip animations if already played
  if (hasPlayed === null) return null;

  return (
    <>
      {/* ── Backdrop — clicking it closes menu (no race condition) ── */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: "fixed", inset: 0,
            zIndex: 8400,       // behind the menu (8500) but above content
            cursor: "none",
          }}
        />
      )}

      {/* ── Fullscreen Menu ── */}
      <div className={`${styles.fsmenu} ${menuOpen ? styles.fsmenuOpen : ""}`}>


        <div className={styles.fmLeft}>
          {menuItems.map((item, i) => {
            const isInternal = item.href.startsWith("/") && !item.href.startsWith("/#");
            const Tag = isInternal ? Link : "a";
            
            return (
              <Tag
                key={item.num}
                href={item.href}
                prefetch={isInternal ? true : undefined}
                className={`${styles.fmItem} fm-item`}
                onClick={(e) => handleNav(e, item.href)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(-1)}
              >
                <div className={styles.fmItemInner}>
                  <ScrambleNum num={item.num} active={hoveredIdx === i} />
                  <span className={styles.fmTitle}>{item.label}</span>
                  <span className={styles.fmArrow}>↗</span>
                </div>
              </Tag>
            );
          })}
        </div>

        <div className={styles.fmFoot}>
          <div style={{ display: "flex", gap: "24px" }}>
            <a href={"#contact"} className={styles.fmEmail}>Contact Us</a>
            <a href={"#contact"} className={styles.fmEmail}>Book a Call</a>
          </div>
          <a href="mailto:admin@exzlr.com" className={styles.fmEmail}>admin@exzlr.com</a>
          <div className={styles.fmStatus}>Global</div>
          <div className={styles.fmSocials}>
            <a href="https://instagram.com/exzlr.corp" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            <a href="https://x.com"         target="_blank" rel="noopener noreferrer" aria-label="X">X</a>
          </div>
        </div>
      </div>

      {/* ── Nav Bar ── */}
      <motion.nav
        className={styles.nav}
        key={hasPlayed === null ? "nav-pending" : (hasPlayed ? "nav-played" : "nav-intro")}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: hasPlayed ? 0 : 3 }}
        style={{ zIndex: 9001 }} // always above backdrop + menu
      >
        <div className={styles.nRight}>
          <a href={"#contact"} className={styles.navLink}>Contact Us</a>
          <a href={"#contact"} className={styles.navLink}>Book a Call</a>
          <span className={styles.clock}>{time}</span>
          <button
            className={`${styles.trigger} ${menuOpen ? styles.triggerOpen : ""} nav-trigger`}
            onClick={() => menuOpen ? closeMenu() : openMenu()}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span /><span />
          </button>
        </div>
      </motion.nav>

    </>
  );
}
