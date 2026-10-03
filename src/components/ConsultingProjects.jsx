"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./ConsultingProjects.module.css";

// Parallax wrapper for vertical scroll
function ParallaxCard({ children, speed = 50, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // As user scrolls, the card drifts slightly
  const rawY = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const driftY = useSpring(rawY, { stiffness: 50, damping: 20 });

  return (
    <motion.div ref={ref} style={{ y: driftY }} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function ConsultingProjects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.rowLabel}>
            Proof of<br />
            <em>Work.</em>
          </div>

          <div className={styles.content}>
            {/* FLAGSHIP */}
            <ParallaxCard speed={50}>
              <div className={styles.flagship}>
                <div className={styles.flagshipTop} />
                <div className={styles.flagshipBody}>
                  <div className={styles.flagshipName}>EXZLR</div>
                  <div className={styles.flagshipSub}>Autonomous Business OS — hire AI agents as employees</div>
                  <div className={styles.flagshipDesc}>
                    A multi-tenant SaaS platform where businesses deploy 7 autonomous AI agents (Content, Sales, Finance, HR, Support, Operations, Intelligence) inside a 3D interactive office environment. Built solo from zero to production.
                  </div>
                  <div className={styles.flagshipTech}>
                    React Three Fiber · Fastify · Supabase multi-tenancy · Qdrant · BullMQ · n8n · Provider-agnostic AI layer · Turborepo
                  </div>
                  <div className={styles.flagshipInsight}>
                    Every agent board is powered by a JSON-to-UI rendering engine built from scratch — zero repeated UI logic across 7 completely different agent types. This is the kind of architectural decision that separates builders from developers.
                  </div>
                  <div className={styles.mediaWrap}>
                    <video src="/videos/video1.mov" className={styles.vid} autoPlay muted loop playsInline preload="metadata" />
                  </div>
                </div>
              </div>
            </ParallaxCard>

            {/* VIDEO PROJECTS — full cards */}
            <div className={styles.proofPair}>
              <ParallaxCard speed={80}>
                <div className={styles.proofCard}>
                  <div className={styles.proofCardCat}>Music Technology</div>
                  <div className={styles.proofCardName}>Artiso</div>
                  <div className={styles.proofCardDesc}>
                    AI co-composer generating musical DNA — seeds, theory-driven blueprints, MIDI-first output. Respects Indian classical music while embracing Western fusion. For composers, not casual users.
                  </div>
                  <div className={styles.mediaWrap}>
                    <video src="/videos/video2.mov" className={styles.vid} autoPlay muted loop playsInline preload="metadata" />
                  </div>
                </div>
              </ParallaxCard>
              <ParallaxCard speed={120}>
                <div className={styles.proofCard}>
                  <div className={styles.proofCardCat}>Wellness / Spiritual</div>
                  <div className={styles.proofCardName}>MindGarden</div>
                  <div className={styles.proofCardDesc}>
                    4D world interface for meditation, lunar cycle tracking, and spiritual practice. Rich feature set, immersive UI.
                  </div>
                  <div className={styles.mediaWrap}>
                    <video src="/videos/video3.mov" className={styles.vid} autoPlay muted loop playsInline preload="metadata" />
                  </div>
                </div>
              </ParallaxCard>
            </div>

            <div className={styles.proofPair}>
              <ParallaxCard speed={80}>
                <div className={styles.proofCard}>
                  <div className={styles.proofCardCat}>Lead Automation</div>
                  <div className={styles.proofCardName}>LeadFlow</div>
                  <div className={styles.proofCardDesc}>
                    End-to-end lead capture, scoring, routing, and multi-touch follow-up — configurable per business, multi-channel.
                  </div>
                  <div className={styles.mediaWrap}>
                    <video src="/videos/video4.mov" className={styles.vid} autoPlay muted loop playsInline preload="metadata" />
                  </div>
                </div>
              </ParallaxCard>
              <ParallaxCard speed={120}>
                <div className={styles.proofCard}>
                  <div className={styles.proofCardCat}>Regulatory Automation</div>
                  <div className={styles.proofCardName}>ComplianceFlow</div>
                  <div className={styles.proofCardDesc}>
                    All compliance deadlines automated — filing reminders, status tracking, team alerts. One system for all regulatory requirements.
                  </div>
                  <div className={styles.mediaWrap}>
                    <video src="/videos/video6.mov" className={styles.vid} autoPlay muted loop playsInline preload="metadata" />
                  </div>
                </div>
              </ParallaxCard>
            </div>

            <div className={styles.proofPair}>
              <ParallaxCard speed={80}>
                <div className={styles.proofCard}>
                  <div className={styles.proofCardCat}>Sustainability Tech</div>
                  <div className={styles.proofCardName}>Carbon Green</div>
                  <div className={styles.proofCardDesc}>
                    Carbon footprint CRM with marketplace offset integration — built for corporate sustainability reporting and offset purchasing.
                  </div>
                  <div className={styles.mediaWrap}>
                    <video src="/videos/video7.mov" className={styles.vid} autoPlay muted loop playsInline preload="metadata" />
                  </div>
                </div>
              </ParallaxCard>
            </div>

            {/* RECTANGULAR APPS GRID */}
            <ParallaxCard speed={40}>
              <div className={styles.nameTileGrid}>
                {[
                  { cat: 'Freelancer SaaS',    name: 'ClientShelf',  desc: 'Proposals, contracts, invoices with AI scope guard and Stripe billing.' },
                  { cat: 'Team Operations',    name: 'CollabSphere',  desc: 'Real-time project boards, AI meeting summaries, client portals.' },
                  { cat: 'Client Onboarding',  name: 'Onboardly',     desc: 'Automated onboarding sequences with progress tracking.' },
                  { cat: 'No-Code Automation', name: 'Streamlines',   desc: 'Pick a workflow template, fill config — goes live instantly.' },
                  { cat: 'Sound Viz',          name: 'Cymatrix',      desc: 'Real-time cymatics audio-to-geometry visualization.' },
                ].map((p) => (
                  <div key={p.name} className={styles.nameTile}>
                    <div className={styles.nameTileCat}>{p.cat}</div>
                    <div className={styles.nameTileName}>{p.name}</div>
                    <div className={styles.nameTileDesc}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </ParallaxCard>

            {/* OTHER BUILDS */}
            <ParallaxCard speed={50}>
              <div className={styles.otherBuildsTitle}>Other Builds</div>
              <div className={styles.buildList}>
                <span className={styles.buildTag}>Academy / Kalatutorium</span>
                <span className={styles.buildTag}>Custom Websites</span>
                <span className={styles.buildTag}>Admin Dashboards</span>
                <span className={styles.buildTag}>VPS & DNS Setup</span>
                <span className={styles.buildTag}>n8n Infrastructure</span>
              </div>
              <div className={styles.buildNote}>
                + ongoing custom software for client deployments.
              </div>
            </ParallaxCard>

          </div>
        </div>
      </div>
    </section>
  );
}
