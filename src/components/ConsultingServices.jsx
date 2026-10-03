"use client";

import styles from "./Consulting.module.css";

const services = [
  { name: "Single Workflow Fix", time: "1–2 weeks", desc: "One painful problem, automated permanently. Follow-ups, booking reminders, payment nudges, invoice alerts, lead capture — whatever's costing you the most time right now." },
  { name: "Multi-Workflow System", time: "3–5 weeks", desc: "3–4 workflows connected together. Lead comes in, gets followed up, books, gets onboarded, gets invoiced — all automatic. You focus on delivery, not admin." },
  { name: "Custom Software Build", time: "4–8 weeks", desc: "A real internal tool or client-facing product — dashboard, CRM, portal, staff app. All automations built-in. Connected to your VPS, your domain, your data. You own it." },
  { name: "Monthly Retainer", time: "Ongoing", desc: "Ongoing monitoring, fixes, and expansion. I stay accountable to your systems running — not just building them and leaving." },
];

const automations = [
  {
    tier: "Entry",
    items: [
      "Lead capture → CRM auto-organize",
      "WhatsApp order/booking instant auto-confirmation",
      "Payment follow-up reminders",
      "Appointment reminders 24hr + 1hr before",
      "Post-service review collection",
      "Birthday / anniversary personalized client outreach"
    ]
  },
  {
    tier: "System",
    items: [
      "Lead scoring and intelligent routing to team",
      "Multi-touch cold/warm follow-up sequences",
      "Real-time inventory stockout alerts",
      "Multi-channel support routing",
      "Social media auto-posting",
      "GST / invoice compliance deadline automation",
      "HR leave and attendance automation",
      "CRM sync across tools in real time"
    ]
  },
  {
    tier: "Advanced AI",
    items: [
      "AI support ticket triage",
      "UPI / payment auto-reconciliation against invoices",
      "Tally accounting integration",
      "Multi-language customer response",
      "AI content repurposing — 1 video in → 15 clips out",
      "Self-healing workflow monitoring"
    ]
  }
];

export default function ConsultingServices() {
  return (
    <section className={styles.section} id="services" style={{ paddingTop: "80px" }}>
      {/* Background Leaves */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/palm_nobg.png" alt="" className={styles.botPalm} style={{ opacity: 0.05 }} />

      <div className={styles.row}>
        <div className={styles.rowLabel}>Services</div>
        <div>
          <div className={styles.auditHook}>
            <div className={styles.auditText}>
              <strong>How every engagement works.</strong><br/>
              Every project starts with a diagnostic — we map what's broken and what fixing it takes. Then we build.
            </div>
          </div>

          <div className={styles.tierStack} style={{ marginTop: "40px" }}>
            <div className={styles.tier}>
              <div>
                <h3 className={styles.tierName}>Consultancy</h3>
                <p className={styles.tierDesc}>We audit your operations, map every bottleneck, and hand you a written diagnostic — what's broken, what it's costing you, and what fixing it would take. Standalone value. You can walk away with just this.</p>
              </div>
              <div>
                <div className={styles.tierTime}>1–3 days</div>
              </div>
            </div>
            <div className={styles.tier}>
              <div>
                <h3 className={styles.tierName}>Materials</h3>
                <p className={styles.tierDesc}>VPS, APIs, licenses, and integrations required to run your solution. Billed transparently at cost plus setup. No hidden markup buried in a package price.</p>
              </div>
              <div>
                <div className={styles.tierTime}>Quoted per build</div>
              </div>
            </div>
            <div className={styles.tier}>
              <div>
                <h3 className={styles.tierName}>Implementation</h3>
                <p className={styles.tierDesc}>The actual build — automations, software, or systems — deployed to production. Scoped from the diagnostic. See packages below.</p>
              </div>
            </div>
          </div>

          <hr className={styles.divider} style={{ marginTop: "48px", marginBottom: "32px" }} />
          <div className={styles.rowLabel} style={{ marginBottom: "24px", fontSize: "11px" }}>Implementation Packages</div>
          <div className={styles.tierStack}>
            {services.map((s, i) => (
              <div key={i} className={styles.tier}>
                <div>
                  <h3 className={styles.tierName}>{s.name}</h3>
                  <p className={styles.tierDesc}>{s.desc}</p>
                </div>
                <div>
                  <div className={styles.tierTime}>{s.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className={styles.divider} style={{ marginTop: "100px" }} />

      <div className={styles.row}>
        <div className={styles.rowLabel}>Automation Menu</div>
        <div>
          <p style={{ color: "var(--text-2)", marginBottom: "40px", fontSize: "15px" }}>
            Every item below is a live, deployable workflow — not a concept. Pick what you need.
          </p>
          <div className={styles.autoMenu} style={{ marginTop: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px" }}>
              {automations.map((a, i) => (
                <div key={i} className={styles.autoTier}>
                  <div className={styles.autoLabel}>{a.tier}</div>
                  <div className={styles.autoList}>
                    {a.items.map((item, j) => (
                      <div key={j} className={styles.autoItem}>{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "80px" }}>
            <a href="/#contact" className={styles.btnPrimary}>Book a Call</a>
          </div>
        </div>
      </div>
    </section>
  );
}
