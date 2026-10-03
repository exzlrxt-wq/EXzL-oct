"use client";

import styles from "./Consulting.module.css";

const STEPS = [
  { label: "Automate operations", desc: "I map your workflow from lead to payment, find where time and money leaks, and build automated systems that fix it permanently. Not a template — built for how your business actually runs.", proof: "Example: Replaced a 3-person data entry team with an n8n webhook pipeline." },
  { label: "Custom software", desc: "Internal dashboards, client portals, CRMs, booking systems — built to your exact requirements. Not a generic SaaS you half-fit into and pay for forever. I've shipped 12+ production apps solo.", proof: "Example: Built EXZLR from scratch — infrastructure, frontend, and backend." },
  { label: "Digital infrastructure", desc: "Domain, DNS, VPS, n8n self-hosted workflow engine, SSL, email, databases — the full stack. You own your tools. No per-seat SaaS fees. No dependency on platforms that can change pricing on you.", proof: "Example: Setup Hetzner VPS with Dockerized Supabase & n8n." },
  { label: "Content on autopilot", desc: "One piece of content in, a week of posts out. AI-assisted pipelines that repurpose, schedule, and publish consistently — without daily effort from your team.", proof: "Example: Connected YouTube RSS to OpenAI to auto-draft LinkedIn threads." },
  { label: "Business diagnostics & audits", desc: "A structured operational audit — not a sales pitch. We map your entire process from lead to delivery, quantify what each bottleneck costs you monthly, and hand you a written report whether or not you engage us further.", proof: "Standalone deliverable — the diagnostic itself has value independent of implementation." },
  { label: "Sales & outreach systems", desc: "Lead scoring, CRM pipelines, automated follow-up sequences, and referral/commission tracking — the infrastructure behind consistent client acquisition, not just a one-off campaign.", proof: "Example: Built a full lead-to-close pipeline with automated scoring and multi-touch follow-up." },
  { label: "Compliance & operations automation", desc: "GST deadline tracking, HR leave/attendance systems, inventory alerts, Tally integration — the unglamorous operational plumbing that prevents costly mistakes.", proof: "Example: Automated GST filing reminders and Tally voucher entry on payment receipt." },
];

export default function ConsultingCapabilities() {
  return (
    <section className={styles.section} id="capabilities">
      <div className={styles.row}>
        <div className={styles.rowLeftFixed}>
          <div className={styles.rowLabel}>What I do for you</div>
          <div className={styles.pillsContainer}>
            <span className={styles.pill}>Founder Associate</span>
            <span className={styles.pill}>Workflow Automation</span>
            <span className={styles.pill}>Custom Software</span>
            <span className={styles.pill}>AI Systems</span>
            <span className={styles.pill}>n8n · Supabase · React</span>
            <span className={styles.pill}>Content Strategy</span>
            <span className={styles.pill}>Sound Engineering</span>
            <span className={styles.pill}>Operations Lead</span>
            <span className={styles.pill}>Business Diagnostics</span>
            <span className={styles.pill}>Systems Consulting</span>
            <span className={styles.pill}>Sales Process Design</span>
            <span className={styles.pill}>Client Onboarding Systems</span>
            <span className={styles.pill}>Compliance Automation</span>
          </div>
        </div>
        <div>
          {STEPS.map((s, i) => (
            <div key={i} className={styles.capItem}>
              <h3 className={styles.capTitle}>{s.label}</h3>
              <p className={styles.capBody}>{s.desc}</p>
              <p className={styles.capProof}>{s.proof}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
