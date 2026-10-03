"use client";

import styles from "./AvailBand.module.css";

const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/exzlr.corp/30min";

export default function AvailBand() {
  return (
    <div className={styles.avail}>
      <div className={styles.inner}>
        <div className={styles.txt}>
          Open to <em>new<br />projects.</em>
        </div>
        <div className={styles.right}>
          <div className={styles.dot}>Global work</div>
          <div className={styles.btns}>
            <a href="#contact" className={`${styles.magBtn} mag-btn av-mag`}>
              Book a Call →
            </a>
            <a href="mailto:admin@exzlr.com" className={`${styles.magBtnGhost} mag-btn`}>
              admin@exzlr.com →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
