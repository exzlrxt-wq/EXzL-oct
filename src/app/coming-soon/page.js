"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ── animation helpers ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.09 } } };
const fadeIn  = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6 } },
};

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── data ──────────────────────────────────────────────────── */
const workspaces = [
  {
    num: "01",
    name: "Content System",
    tag: "Workspace 1",
    desc: "Your AI content engine. Calendar, scheduling, social media, email campaigns — drafted, queued, and shipped with AI as your assistant.",
    detail: "AI is assistive only — generates ideas and copy, never posts autonomously. You stay in control.",
  },
  {
    num: "02",
    name: "Business System",
    tag: "Workspace 2",
    desc: "CRM, pipelines, billing, invoicing, client onboarding, project management — your entire operation wired together in one graph.",
    detail: "AI handles decision support — summarises, drafts, suggests. Every action is yours to approve.",
  },
  {
    num: "03",
    name: "Company System",
    tag: "Workspace 3",
    desc: "Deploy AI agents as actual employees. Each department gets agents: HR, Sales, Marketing, Finance, Operations — running 24/7 within bounded permissions.",
    detail: "Every agent has a permission table, a cost cap, an escalation threshold, and a full audit trail. Autonomous, but accountable.",
  },
];

const modules = [
  { id: "01", name: "CRM",       desc: "Lead management, contact database, deal pipelines, AI lead scoring 0–100.",  ws: "W2" },
  { id: "02", name: "Marketing", desc: "Content calendar, social scheduling, email campaigns, AI-drafted weekly plans.", ws: "W1" },
  { id: "03", name: "Commerce",  desc: "Product catalog, orders, checkout, abandoned cart recovery — fully automated.", ws: "W2" },
  { id: "04", name: "Billing",   desc: "Invoices, subscriptions, payment collection, dunning sequences.",               ws: "W2" },
  { id: "05", name: "Academy",   desc: "Course creation, student progress, certificates, completion-triggered upsells.", ws: "W1/W2" },
  { id: "06", name: "Support",   desc: "Ticket system, auto-triage by severity, knowledge base, SLA tracking.",         ws: "W2" },
  { id: "07", name: "Projects",  desc: "Task boards, milestones, time tracking, AI-written client status updates.",     ws: "W2" },
  { id: "08", name: "HR",        desc: "Employee onboarding, document vault, department setup, agent bootstrapping.",   ws: "W2/W3" },
  { id: "09", name: "Analytics", desc: "Cross-module dashboards, AI-generated 'what changed and why' weekly reports.",  ws: "W1/W2/W3" },
  { id: "10", name: "Cortex",    desc: "The invisible kernel — event bus, permission tables, system health, ops brain.", ws: "Core" },
];

const agentTiers = [
  { tier: "Reactive",      desc: "Responds to a single trigger. Fires once, acts, logs.",       eg: "Lead scorer, invoice reminder, ticket classifier" },
  { tier: "Proactive",     desc: "Runs on a schedule. Takes initiative without being asked.",    eg: "Content calendar builder, pipeline health checker" },
  { tier: "Orchestrator",  desc: "Manages other agents. Assigns work, monitors, escalates.",    eg: "HR agent bootstraps your entire company structure" },
];

const layers = [
  { n: "1", name: "UI Shell",            note: "Graph canvas, workspace switcher, node editor" },
  { n: "2", name: "API Gateway + Auth",  note: "Identity, RBAC, rate limiting" },
  { n: "3", name: "AI Orchestration",    note: "Intent routing, agent dispatch, context memory" },
  { n: "4", name: "Event Bus",           note: "Node-to-node communication, real-time state" },
  { n: "5", name: "Workflow Engine",     note: "DAG executor, cron scheduler, trigger registry" },
  { n: "6", name: "Data Layer",          note: "Postgres + Redis + pgvector + Blob storage" },
  { n: "7", name: "Integration Layer",   note: "OAuth connectors, webhooks, third-party APIs" },
];

/* ── page ──────────────────────────────────────────────────── */
export default function ComingSoon() {
  // Restore normal system cursor on this page — disable the custom cursor
  useEffect(() => {
    const dot  = document.getElementById("cdot");
    const ring = document.getElementById("cring");
    document.body.style.cursor = "default";
    if (dot)  dot.style.display  = "none";
    if (ring) ring.style.display = "none";
    return () => {
      document.body.style.cursor = "none";
      if (dot)  dot.style.display  = "";
      if (ring) ring.style.display = "";
    };
  }, []);

  return (
    <>
      {/* ── 1. HERO — video fullscreen ── */}
      <section className="cs-hero">
        <video
          className="cs-video"
          src="/node-graph-preview.mp4"
          autoPlay loop muted playsInline
        />
        <div className="cs-vignette" />

        <div className="cs-hero-content">
          <motion.span
            className="cs-tag"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            EXZLR OS — Early Access
          </motion.span>

          <motion.h1
            className="cs-h1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Your company,<br />as a graph.
          </motion.h1>

          <motion.p
            className="cs-hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            A modular AI-driven operating system for your business.<br />
            Not just tools — a full company on a canvas.
          </motion.p>

          <motion.div
            className="cs-hero-ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <a href="/#contact" className="cs-btn-primary">Request Early Access →</a>
            <a href="#workspaces" className="cs-btn-ghost">See how it works ↓</a>
          </motion.div>
        </div>

        <motion.div
          className="cs-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          scroll
        </motion.div>
      </section>

      {/* ── 2. WHAT IS IT ── */}
      <section className="cs-section cs-what">
        <Reveal>
          <span className="cs-section-tag">What is EXZLR OS?</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="cs-h2">
            One canvas.<br />Your entire operation.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="cs-body-lg">
            Most businesses run on 12 disconnected SaaS tools that don't talk to each other.
            EXZLR OS replaces them with a single visual node-graph where every department,
            workflow, and AI agent is connected — and you can see it all in one place.
          </p>
        </Reveal>

        <motion.div
          className="cs-stat-row"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {[
            { n: "10", l: "Modules" },
            { n: "3",  l: "Workspaces" },
            { n: "7",  l: "System Layers" },
            { n: "∞",  l: "Agent capacity" },
          ].map(s => (
            <motion.div key={s.l} className="cs-stat" variants={fadeUp}>
              <span className="cs-stat-n">{s.n}</span>
              <span className="cs-stat-l">{s.l}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 3. THREE WORKSPACES ── */}
      <section className="cs-section" id="workspaces">
        <Reveal><span className="cs-section-tag">The Three Workspaces</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="cs-h2">Built to grow with you.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="cs-body">
            Start with content. Add operations. Deploy AI agents when you're ready.<br />
            Each workspace unlocks the next level of autonomy.
          </p>
        </Reveal>

        <div className="cs-ws-grid">
          {workspaces.map((w, i) => (
            <Reveal key={w.num} delay={i * 0.12}>
              <div className="cs-ws-card">
                <div className="cs-ws-header">
                  <span className="cs-ws-num">{w.num}</span>
                  <span className="cs-ws-tag">{w.tag}</span>
                </div>
                <h3 className="cs-ws-name">{w.name}</h3>
                <p className="cs-ws-desc">{w.desc}</p>
                <p className="cs-ws-detail">{w.detail}</p>
                <div className="cs-ws-bar" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 4. 10 MODULES ── */}
      <section className="cs-section cs-modules-section" id="modules">
        <Reveal><span className="cs-section-tag">The 10 Modules</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="cs-h2">Every node is a business system.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="cs-body">
            Each module lives as a node on the canvas. Connect them. Automate between them. Let agents run them.
          </p>
        </Reveal>

        <motion.div
          className="cs-module-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {modules.map((m) => (
            <motion.div key={m.id} className="cs-module-card" variants={fadeUp}>
              <div className="cs-module-top">
                <span className="cs-module-id">{m.id}</span>
                <span className="cs-module-ws">{m.ws}</span>
              </div>
              <h4 className="cs-module-name">{m.name}</h4>
              <p className="cs-module-desc">{m.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 5. AI AGENTS ── */}
      <section className="cs-section cs-agents-section" id="agents">
        <Reveal><span className="cs-section-tag">The Agent Model</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="cs-h2">
            Not chatbots.<br />AI employees.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="cs-body">
            Every agent has a role, a permission table, a cost cap per day, and an escalation threshold.
            They log every action. They can't go rogue. They can't exceed their budget. They exist to work — not to surprise you.
          </p>
        </Reveal>

        <div className="cs-agent-anatomy">
          <Reveal delay={0.1}>
            <h3 className="cs-sub-h">How an agent thinks</h3>
          </Reveal>
          <motion.div
            className="cs-agent-steps"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { n: "①", l: "Trigger",      d: "Webhook, cron job, or event bus message" },
              { n: "②", l: "Memory Read",  d: "Pulls context from Postgres + vector DB" },
              { n: "③", l: "LLM Call",     d: "Routes to the right AI provider for the task" },
              { n: "④", l: "Tool Exec",    d: "Writes to DB, sends email, calls an API" },
              { n: "⑤", l: "Memory Write", d: "Logs the action for audit trail + learning" },
            ].map((s) => (
              <motion.div key={s.n} className="cs-agent-step" variants={fadeUp}>
                <span className="cs-step-n">{s.n}</span>
                <div>
                  <span className="cs-step-l">{s.l}</span>
                  <span className="cs-step-d">{s.d}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="cs-agent-tiers">
          <Reveal delay={0.1}>
            <h3 className="cs-sub-h">Three tiers of autonomy</h3>
          </Reveal>
          <motion.div
            className="cs-tier-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {agentTiers.map((t, i) => (
              <motion.div key={t.tier} className="cs-tier-card" variants={fadeUp}>
                <span className="cs-tier-n">Tier {i + 1}</span>
                <h4 className="cs-tier-name">{t.tier}</h4>
                <p className="cs-tier-desc">{t.desc}</p>
                <p className="cs-tier-eg">{t.eg}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. ARCHITECTURE ── */}
      <section className="cs-section cs-arch-section" id="architecture">
        <Reveal><span className="cs-section-tag">Architecture</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="cs-h2">7 layers. One system.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="cs-body">Built on Postgres + pgvector + Redis + BullMQ. Fastify API, Next.js frontend, Turborepo monorepo. Production-grade from day one.</p>
        </Reveal>

        <motion.div
          className="cs-layers"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {layers.map((l) => (
            <motion.div key={l.n} className="cs-layer" variants={fadeIn}>
              <span className="cs-layer-n">L{l.n}</span>
              <span className="cs-layer-name">{l.name}</span>
              <span className="cs-layer-note">{l.note}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 7. PRICING ── */}
      <section className="cs-section" id="pricing">
        <Reveal><span className="cs-section-tag">Pricing</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="cs-h2">Start simple. Scale deep.</h2>
        </Reveal>

        <motion.div
          className="cs-pricing-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {[
            { name: "Starter",    ws: "Workspace 1", for: "Freelancers & solopreneurs", items: ["Content System", "Social scheduling", "AI content assistant", "1 workspace"], cta: "Request access" },
            { name: "Growth",     ws: "Workspace 1 + 2", for: "Small teams & agencies", items: ["Everything in Starter", "CRM & pipelines", "Billing & invoicing", "Project management"], cta: "Request access", featured: true },
            { name: "Enterprise", ws: "All 3 Workspaces", for: "Companies running on AI", items: ["Everything in Growth", "AI agent deployment", "Autonomous departments", "Full audit trail"], cta: "Talk to us" },
          ].map((p) => (
            <motion.div
              key={p.name}
              className={`cs-pricing-card ${p.featured ? "cs-pricing-featured" : ""}`}
              variants={fadeUp}
            >
              {p.featured && <span className="cs-pricing-badge">Most Popular</span>}
              <span className="cs-pricing-tier">{p.name}</span>
              <span className="cs-pricing-ws">{p.ws}</span>
              <p className="cs-pricing-for">{p.for}</p>
              <ul className="cs-pricing-list">
                {p.items.map(it => <li key={it}>{it}</li>)}
              </ul>
              <a href="/#contact" className={p.featured ? "cs-btn-primary" : "cs-btn-ghost"}>{p.cta} →</a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 8. FINAL CTA ── */}
      <section className="cs-section cs-cta-section">
        <Reveal>
          <h2 className="cs-h2-lg">
            Something is running.<br />
            <em style={{ color: "#6cd186" }}>It just isn't you.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="cs-body">
            EXZLR OS is in private early access. Join the list and get first access when we open.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="cs-cta-actions">
            <a href="/#contact" className="cs-btn-primary cs-btn-lg">Get Early Access →</a>
            <Link href="/" className="cs-btn-ghost">← Back to exzlr.com</Link>
          </div>
        </Reveal>
      </section>

      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=JetBrains+Mono:wght@400;500&display=swap');

        .cs-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 640px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0b0a09;
        }
        .cs-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.58;
          z-index: 0;
          pointer-events: none;
          cursor: none;
        }
        .cs-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(ellipse 80% 70% at 50% 50%, rgba(11,10,9,0.35) 0%, rgba(11,10,9,0.82) 100%),
            linear-gradient(to bottom, rgba(11,10,9,0.7) 0%, rgba(11,10,9,0) 25%, rgba(11,10,9,0) 70%, rgba(11,10,9,0.9) 100%);
        }
        .cs-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
          padding: 0 24px;
          max-width: 760px;
        }
        .cs-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6cd186;
          border: 1px solid rgba(108,209,134,0.3);
          padding: 5px 14px;
          border-radius: 2px;
        }
        .cs-h1 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(52px, 9vw, 100px);
          font-weight: 600;
          font-style: italic;
          line-height: 1.0;
          color: #e8e3d8;
          letter-spacing: -0.025em;
        }
        .cs-hero-sub {
          font-size: clamp(14px, 1.8vw, 17px);
          color: rgba(232,227,216,0.55);
          line-height: 1.7;
          max-width: 500px;
        }
        .cs-hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }
        .cs-btn-primary {
          display: inline-block;
          padding: 14px 32px;
          background: #6cd186;
          color: #0b0a09;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          border: 1px solid #6cd186;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .cs-btn-primary:hover { background: #86e09e; transform: translateY(-2px); }
        .cs-btn-ghost {
          display: inline-block;
          padding: 14px 32px;
          background: transparent;
          color: rgba(232,227,216,0.6);
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          border: 1px solid rgba(232,227,216,0.15);
          transition: color 0.2s, border-color 0.2s, transform 0.2s;
        }
        .cs-btn-ghost:hover { color: #e8e3d8; border-color: rgba(232,227,216,0.35); transform: translateY(-2px); }
        .cs-btn-lg { padding: 17px 40px; font-size: 13px; }
        .cs-scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(232,227,216,0.25);
          animation: cs-bounce 2s ease-in-out infinite;
        }
        @keyframes cs-bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(6px); }
        }

        /* ── SECTIONS ── */
        .cs-section {
          background: #0b0a09;
          padding: clamp(80px, 10vw, 140px) clamp(24px, 8vw, 120px);
          border-top: 1px solid rgba(232,227,216,0.06);
        }
        .cs-what {
          background: #0d0c0b;
        }
        .cs-section-tag {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6cd186;
          margin-bottom: 20px;
        }
        .cs-h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(38px, 5.5vw, 72px);
          font-weight: 600;
          font-style: italic;
          line-height: 1.08;
          color: #e8e3d8;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          max-width: 700px;
        }
        .cs-h2-lg {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(44px, 7vw, 88px);
          font-weight: 600;
          font-style: italic;
          line-height: 1.05;
          color: #e8e3d8;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .cs-sub-h {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(232,227,216,0.4);
          margin-bottom: 24px;
          margin-top: 56px;
        }
        .cs-body-lg {
          font-size: clamp(16px, 2vw, 19px);
          color: rgba(232,227,216,0.55);
          line-height: 1.75;
          max-width: 620px;
          margin-bottom: 56px;
        }
        .cs-body {
          font-size: clamp(14px, 1.6vw, 16px);
          color: rgba(232,227,216,0.5);
          line-height: 1.75;
          max-width: 560px;
          margin-bottom: 48px;
        }

        /* STATS */
        .cs-stat-row {
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        .cs-stat { display: flex; flex-direction: column; gap: 4px; }
        .cs-stat-n {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 600;
          color: #6cd186;
          line-height: 1;
        }
        .cs-stat-l {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(232,227,216,0.35);
        }

        /* WORKSPACES */
        .cs-ws-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2px;
          margin-top: 40px;
        }
        .cs-ws-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(232,227,216,0.07);
          padding: 36px 32px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, background 0.3s;
        }
        .cs-ws-card:hover {
          border-color: rgba(108,209,134,0.2);
          background: rgba(108,209,134,0.03);
        }
        .cs-ws-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .cs-ws-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #6cd186;
          letter-spacing: 0.1em;
        }
        .cs-ws-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(232,227,216,0.25);
          border: 1px solid rgba(232,227,216,0.1);
          padding: 3px 8px;
          border-radius: 1px;
        }
        .cs-ws-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 600;
          font-style: italic;
          color: #e8e3d8;
          margin-bottom: 14px;
        }
        .cs-ws-desc {
          font-size: 14px;
          color: rgba(232,227,216,0.55);
          line-height: 1.7;
          margin-bottom: 14px;
        }
        .cs-ws-detail {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(108,209,134,0.6);
          line-height: 1.6;
        }
        .cs-ws-bar {
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: #6cd186;
          transition: width 0.4s ease;
        }
        .cs-ws-card:hover .cs-ws-bar { width: 100%; }

        /* MODULES */
        .cs-modules-section { background: #0d0c0b; }
        .cs-module-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1px;
          margin-top: 40px;
          border: 1px solid rgba(232,227,216,0.06);
        }
        .cs-module-card {
          background: #0b0a09;
          padding: 28px 24px;
          border-right: 1px solid rgba(232,227,216,0.06);
          border-bottom: 1px solid rgba(232,227,216,0.06);
          transition: background 0.2s;
        }
        .cs-module-card:hover { background: rgba(108,209,134,0.03); }
        .cs-module-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .cs-module-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #6cd186;
          letter-spacing: 0.1em;
        }
        .cs-module-ws {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: rgba(232,227,216,0.2);
          letter-spacing: 0.08em;
        }
        .cs-module-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 600;
          font-style: italic;
          color: #e8e3d8;
          margin-bottom: 10px;
        }
        .cs-module-desc {
          font-size: 12px;
          color: rgba(232,227,216,0.42);
          line-height: 1.65;
        }

        /* AGENTS */
        .cs-agents-section { background: #0b0a09; }
        .cs-agent-anatomy { margin-top: 48px; }
        .cs-agent-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 640px;
        }
        .cs-agent-step {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(232,227,216,0.07);
        }
        .cs-step-n {
          font-family: 'JetBrains Mono', monospace;
          font-size: 16px;
          color: #6cd186;
          min-width: 28px;
          margin-top: 1px;
        }
        .cs-step-l {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #e8e3d8;
          margin-bottom: 4px;
        }
        .cs-step-d {
          display: block;
          font-size: 13px;
          color: rgba(232,227,216,0.45);
          line-height: 1.5;
        }
        .cs-agent-tiers { margin-top: 56px; }
        .cs-tier-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2px;
          margin-top: 24px;
        }
        .cs-tier-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(232,227,216,0.07);
          padding: 28px 24px;
          transition: border-color 0.3s;
        }
        .cs-tier-card:hover { border-color: rgba(108,209,134,0.2); }
        .cs-tier-n {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6cd186;
          display: block;
          margin-bottom: 10px;
        }
        .cs-tier-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          font-style: italic;
          color: #e8e3d8;
          margin-bottom: 10px;
        }
        .cs-tier-desc {
          font-size: 13px;
          color: rgba(232,227,216,0.5);
          line-height: 1.65;
          margin-bottom: 12px;
        }
        .cs-tier-eg {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(108,209,134,0.55);
          line-height: 1.5;
        }

        /* ARCHITECTURE */
        .cs-arch-section { background: #0d0c0b; }
        .cs-layers {
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 40px;
          max-width: 800px;
        }
        .cs-layer {
          display: grid;
          grid-template-columns: 40px 200px 1fr;
          align-items: center;
          gap: 24px;
          padding: 18px 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(232,227,216,0.06);
          transition: background 0.2s, border-color 0.2s;
        }
        .cs-layer:hover {
          background: rgba(108,209,134,0.03);
          border-color: rgba(108,209,134,0.15);
        }
        .cs-layer-n {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #6cd186;
          letter-spacing: 0.08em;
        }
        .cs-layer-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #e8e3d8;
          letter-spacing: 0.04em;
        }
        .cs-layer-note {
          font-size: 13px;
          color: rgba(232,227,216,0.35);
        }

        /* PRICING */
        .cs-pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2px;
          margin-top: 40px;
        }
        .cs-pricing-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(232,227,216,0.07);
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          transition: border-color 0.3s;
        }
        .cs-pricing-card:hover { border-color: rgba(232,227,216,0.15); }
        .cs-pricing-featured {
          border-color: rgba(108,209,134,0.3) !important;
          background: rgba(108,209,134,0.04);
        }
        .cs-pricing-badge {
          position: absolute;
          top: -1px; right: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          background: #6cd186;
          color: #0b0a09;
          padding: 4px 10px;
          border-radius: 0 0 3px 3px;
        }
        .cs-pricing-tier {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 600;
          font-style: italic;
          color: #e8e3d8;
        }
        .cs-pricing-ws {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: #6cd186;
          text-transform: uppercase;
        }
        .cs-pricing-for {
          font-size: 12px;
          color: rgba(232,227,216,0.38);
        }
        .cs-pricing-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin: 8px 0;
          flex: 1;
        }
        .cs-pricing-list li {
          font-size: 13px;
          color: rgba(232,227,216,0.55);
          padding-left: 16px;
          position: relative;
        }
        .cs-pricing-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #6cd186;
          font-size: 10px;
        }

        /* FINAL CTA */
        .cs-cta-section {
          text-align: center;
          background: #0d0c0b;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cs-cta-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }

        @media (max-width: 600px) {
          .cs-layer { grid-template-columns: 32px 1fr; }
          .cs-layer-note { display: none; }
          .cs-stat-row { gap: 28px; }
        }
      `}</style>
    </>
  );
}
