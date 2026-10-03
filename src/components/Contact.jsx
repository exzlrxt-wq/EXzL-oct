"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import RevealClip from "./RevealClip";
import styles from "./Contact.module.css";

const DASHBOARD_URL = "/coming-soon";
const CAL_URL      = process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/exzlr.corp/30min";

// ─── Constants ────────────────────────────────────────────────────────────────
const TYPING_DELAY_MID  = 1100; // ms before advancing to next question
const TYPING_DELAY_FINAL = 1300; // ms before showing confirmation

/** @type {{ id: string, from: string, placeholder: string, type: string }[]} */
const STEPS = [
  { id: "name",      from: "What\u2019s your name?",                                          placeholder: "Your name…",                                  type: "text"  },
  { id: "email",     from: "Nice to meet you. What\u2019s your email?",                       placeholder: "your@email.com",                               type: "email" },
  { id: "phone",     from: "Got it. What's your phone number?",                               placeholder: "Your phone number…",                           type: "tel"   },
  { id: "project",   from: "What\u2019s the operation you need to automate or scale?",        placeholder: "Describe the workflow, bottleneck, or system…", type: "text"  },
];

export default function Contact() {
  const [step,    setStep]    = useState(0);
  const [replies, setReplies] = useState({});
  const [input,   setInput]   = useState("");
  const [sent,    setSent]    = useState(false);
  const [typing,  setTyping]  = useState(false);
  const chatRef  = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [step, replies, typing, sent]);

  // Focus input on step change, but prevent it from forcing the browser to scroll down to the bottom
  useEffect(() => { inputRef.current?.focus({ preventScroll: true }); }, [step, sent]);

  const submit = () => {
    if (typing || sent || step >= STEPS.length) return;
    const val = input.trim();
    if (!val) return;

    const current = STEPS[step];
    if (!current) return;

    const updatedReplies = { ...replies, [current.id]: val };
    setReplies(updatedReplies);
    setInput("");

    if (step < STEPS.length - 1) {
      setTyping(true);
      setTimeout(() => { setTyping(false); setStep((s) => s + 1); }, TYPING_DELAY_MID);
    } else {
      setTyping(true);
      setTimeout(() => { setTyping(false); setSent(true); }, TYPING_DELAY_FINAL);

      // Fire contact API in background — UX is unaffected by network
      const apiUrl = (typeof window !== "undefined" && window.location.hostname === "exzlr.com")
        ? "https://www.exzlr.com/api/contact"
        : "/api/contact";

      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReplies),
      }).catch((err) => console.error('[contact form]', err));
    }
  };


  return (
    <section id="contact" className={styles.section} style={{ position: "relative" }}>
      {/* Botanical layer moved from Process */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/palm_nobg.png" alt="" aria-hidden="true" className={styles.botPalm} />

      <motion.div
        className={styles.header}
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-label">Get In Touch</span>
        <RevealClip>
          <h2 className={styles.title}>Start a <em>conversation.</em></h2>
        </RevealClip>
      </motion.div>

      {/* Chat window */}
      <motion.div
        className={styles.chatOuter}
        initial={{ y: 60, opacity: 0, rotateX: -5 }}
        whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.chatBar}>
          <div className={styles.chatBarDot} />
          <span>EXZLR</span>
          <div className={styles.chatBarStatus} />
        </div>

        <div ref={chatRef} className={styles.chatFeed}>
          <div className={`${styles.bubble} ${styles.from}`}>
            Let&apos;s figure out what you need built — and whether I&apos;m the right person to build it.
          </div>

          {STEPS.slice(0, step).map((s) => (
            <div key={s.id}>
              <div className={`${styles.bubble} ${styles.from}`}>{s.from}</div>
              <div className={`${styles.bubble} ${styles.to}`}>{replies[s.id]}</div>
            </div>
          ))}

          {!sent && step < STEPS.length && (
            <div className={`${styles.bubble} ${styles.from}`}>{STEPS[step].from}</div>
          )}

          {typing && (
            <div className={`${styles.bubble} ${styles.from} ${styles.typing}`}>
              <span /><span /><span />
            </div>
          )}

          {sent && (
            <div className={`${styles.bubble} ${styles.from} ${styles.confirm}`} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <p style={{ margin: 0, marginBottom: 12 }}>
                Got it. I&apos;ll be in touch within one business day. ✦
              </p>

              <p style={{ margin: 0, fontSize: "11px", opacity: 0.7, lineHeight: 1.4 }}>
                Or skip the wait and grab a time on my calendar right now:
              </p>

              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "14px",
                  padding: "12px 24px",
                  background: "#6cd186",
                  color: "#0e0d0b",
                  textDecoration: "none",
                  fontFamily: "var(--mono)",
                  fontSize: "9px",
                  textTransform: "uppercase",
                  letterSpacing: ".15em",
                  fontWeight: "700",
                  transition: "background .3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#8db57a"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#6cd186"}
              >
                Book a 30-min Call &rarr;
              </a>
            </div>
          )}
        </div>

        {!sent && (
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              className={styles.chatInput}
              type={step < STEPS.length ? STEPS[step].type : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder={step < STEPS.length ? STEPS[step].placeholder : ""}
              autoComplete="off"
              disabled={typing}
            />
            <button className={styles.sendBtn} onClick={submit} aria-label="Send message" disabled={typing}>↑</button>
          </div>
        )}
      </motion.div>

      {/* Static fallback + info */}
      <motion.div
        className={styles.aside}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="mailto:admin@exzlr.com" className={styles.email}>admin@exzlr.com</a>
        <div className={styles.availability}>admin@exzlr.com</div>
        {/* Fallback if JS fails */}
        <noscript>
          <a href="mailto:admin@exzlr.com" className={styles.email} style={{ marginTop: 16 }}>
            Email directly: admin@exzlr.com
          </a>
        </noscript>
      </motion.div>
    </section>
  );
}
