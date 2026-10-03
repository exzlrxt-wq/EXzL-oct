"use client";

import styles from "./Consulting.module.css";

const experiences = [
  { role: "AI Systems Architect / Founder", company: "EXZLR", date: "2023 — Present", desc: "Building the world's first autonomous multi-agent business OS." },
  { role: "Product & Systems Lead", company: "Stealth Agency", date: "2021 — 2023", desc: "Designed workflow automations and infrastructure for scaling B2B agencies." },
  { role: "Operations Automation Consultant", company: "Freelance", date: "2020 — Present", desc: "Delivered custom automation pipelines for 15+ international clients." },
];

export default function ConsultingBackground() {
  return (
    <section className={styles.section} id="background">
      <div className={styles.row}>
        <div className={styles.rowLabel}>Background</div>
        <div>
          <div style={{ marginBottom: "64px" }}>
            {experiences.map((exp, i) => (
              <div key={i} className={styles.expItem}>
                <div>
                  <h3 className={styles.expRole}>{exp.role}</h3>
                  <p className={styles.expLine}>@ {exp.company}</p>
                  <p className={styles.expLine} style={{ marginTop: "8px" }}>{exp.desc}</p>
                </div>
                <div className={styles.expDate}>{exp.date}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: "32px", border: "1px solid var(--border)", borderRadius: "4px", background: "var(--surface)" }}>
            <h3 className={styles.expRole} style={{ marginBottom: "16px", color: "var(--accent)" }}>Music & Sound Engineering</h3>
            <div className={styles.buildList} style={{ marginTop: 0, marginBottom: "24px" }}>
              <span className={styles.buildTag}>Performed at SecSat Fest, Pondicherry (The Hindu)</span>
              <span className={styles.buildTag}>Judge at Mood Indigo IIT Bombay & NIT Trichy</span>
              <span className={styles.buildTag}>100+ live shows across India</span>
              <span className={styles.buildTag}>250k+ views on label releases</span>
            </div>
            <div className={styles.buildList} style={{ marginTop: 0 }}>
              <a href="#" className={styles.buildTag} style={{ color: "var(--text)", textDecoration: "none" }}>Spotify ↗</a>
              <a href="#" className={styles.buildTag} style={{ color: "var(--text)", textDecoration: "none" }}>SoundCloud ↗</a>
              <a href="#" className={styles.buildTag} style={{ color: "var(--text)", textDecoration: "none" }}>YouTube ↗</a>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.divider} style={{ marginTop: "100px" }} />
    </section>
  );
}
