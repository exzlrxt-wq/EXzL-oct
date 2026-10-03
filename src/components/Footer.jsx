"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <div className={styles.logo}>EX<b>Z</b>LR</div>
          <p className={styles.tag}>
            EXZLR is the technology and AI brand of Kaltech Wayducation Pvt. Ltd., focused on building software, automation platforms, and digital solutions for modern businesses.
          </p>
          <span className={styles.av}>admin@exzlr.com</span>
        </div>
        <div className={styles.col}>
          <h4>Pages</h4>
          <a href="/#work">Work</a>
          <a href="/brochure">Brochure</a>
          <a href="/#contact">Contact</a>
          <a href="/#contact">Book a Call</a>
        </div>
        <div className={styles.col}>
          <h4>Services</h4>
          <a href="/services">Overview</a>
          <a href="/services#automation">Automation</a>
          <a href="/services#web-apps">Web Apps</a>
        </div>
        <div className={styles.col}>
          <h4>Follow</h4>
          <a href="https://instagram.com/exzlr.corp" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className={styles.bot}>
        <span className={styles.copy}>© {new Date().getFullYear()} EXZLR. A brand of KALTECH WAYDUCATION Pvt. Ltd. All rights reserved.</span>
        <div className={styles.soc}>
          <a href="https://instagram.com/exzlr.corp" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.simpleicons.org/instagram/e8e3d8" alt="Instagram" width={14} height={14} />
          </a>
        </div>
        <a href="/privacy" className={styles.r} style={{ textDecoration: "none", opacity: 0.5, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.5}>Privacy</a>
        <span className={styles.r}>Built with intent. Designed to last.</span>
      </div>
    </footer>
  );
}
