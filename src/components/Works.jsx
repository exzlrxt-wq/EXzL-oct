"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useReducedMotion } from "framer-motion";
import SmartVideo from "./SmartVideo";
import styles from "./Works.module.css";

const works = [
  { num:"01", title:"Command Centre",    year:"2024", cat:"SaaS · Dashboard",  video:"/videos/video1.mp4", tag:"SaaS", pos:{ left:"110vw", top:"30vh", width:"36vw"  }, dir: 1  },
  { num:"02", title:"Interface Systems", year:"2024", cat:"UI · Components",   video:"/videos/video2.mp4", tag:"UI",   pos:{ left:"152vw", top:"8vh",  width:"23vw"  }, dir:-1  },
  { num:"03", title:"Orbit Platform",    year:"2024", cat:"SaaS · Product",    video:"/videos/video3.mp4", tag:"SaaS", pos:{ left:"186vw", top:"46vh", width:"32vw"  }, dir: 1  },
  { num:"04", title:"Pocket UI",         year:"2023", cat:"Mobile · App",      video:"/videos/video4.mp4", tag:"UI",   pos:{ left:"222vw", top:"10vh", width:"20vw"  }, dir:-1  },
  { num:"05", title:"Kala Tutorium",     year:"2023", cat:"EdTech · Platform", video:"/videos/video6.mp4", tag:"EdTech", pos:{ left:"250vw", top:"44vh", width:"33vw"  }, dir: 1  },
  { num:"06", title:"Atlas App",         year:"2022", cat:"SaaS · Web App",    video:"/videos/video7.mp4", tag:"SaaS", pos:{ left:"282vw", top:"12vh", width:"27vw"  }, dir:-1  },
];

/* Per-card parallax drift — enters from diagonal, floats while visible */
function ProjectCard({ work, index, scrollYProgress, videoActive, reduced }) {
  const centers = [0.29, 0.38, 0.46, 0.54, 0.60, 0.67];
  const enter = centers[index] || 0.5;
  const startP = Math.max(0, enter - 0.20);
  const endP = Math.min(1, enter + 0.20);

  const rawY = useTransform(scrollYProgress,
    [startP, enter, endP],
    [work.dir * 55, 0, work.dir * -28],
  );
  const cardY = useSpring(rawY, { stiffness: 170, damping: 26, mass: 0.45 });
  const rotate = useTransform(scrollYProgress,
    [startP, enter],
    [work.dir * 2.5, 0],
  );

  return (
    <motion.div
      className={styles.floatCard}
      style={{ left: work.pos.left, top: work.pos.top, width: work.pos.width, y: cardY, rotate }}
    >
      <div className={styles.vidWrap}>
        <SmartVideo src={work.video} className={styles.vid} active={videoActive} />
      </div>
      <div className={styles.floatLabel}>
        <div className={styles.labelTop}>
          <span className={styles.lNum}>{work.num}</span>
          <span className={styles.lTag}>{work.tag}</span>
        </div>
        <h3 className={styles.lTitle}>{work.title}</h3>
        <p className={styles.lMeta}>{work.cat} · {work.year}</p>
      </div>
    </motion.div>
  );
}

const CARD_BOUNDS = works.map((w) => ({
  left: parseFloat(w.pos.left),
  width: parseFloat(w.pos.width),
}));

export default function Works() {
  const ref     = useRef(null);
  const reduced = useReducedMotion();

  // 'start end' → 'end start' tracks full section journey through viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Light air-suspension spring: Lenis already smooths scroll, so keep mass light for responsive glide
  const SP = { stiffness: 165, damping: 26, mass: 0.45 };

  /* horizontal pan — fills most of the scroll window */
  const rawX = useTransform(scrollYProgress, [0, 0.28, 0.82], [0, 0, -380]);
  const panX = useSpring(rawX, SP);
  const x    = useTransform(panX, v => `${v}vw`);

  /* label enters, settles, then parallaxes out */
  const rawLabelX = useTransform(scrollYProgress, [0, 0.28, 0.82], ["-10vw", "10vw", "-150vw"]);
  const labelX = useSpring(rawLabelX, SP);

  /* forestBg enters from left, stays, then scrolls out to the left as vine approaches */
  const rawBgX = useTransform(scrollYProgress, [0, 0.28, 0.55, 0.82], ["-15vw", "0vw", "0vw", "-100vw"]);
  const bgX = useSpring(rawBgX, SP);

  /* WORK stencil enters from deeper left, stays, then scrolls out with the vine */
  const rawStencilX = useTransform(scrollYProgress, [0, 0.28, 0.55, 0.82], ["-30vw", "0vw", "0vw", "-120vw"]);
  const stencilX = useSpring(rawStencilX, SP);

  /* Diagonal exit — vertical slide starts at 0.82 while still sticky */
  const rawContainerY = useTransform(scrollYProgress, [0.82, 1.0], ["0vh", "-110vh"]);
  const containerY = useSpring(rawContainerY, SP);

  const vineY = useTransform(scrollYProgress, [0.75, 1], [50, -150]);

  // Single coordinator computes which desktop cards are near viewport instead of 12 per-card listeners
  const [activeMask, setActiveMask] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const prevMaskRef = useRef(0);

  const evaluateVisibleCards = () => {
    if (typeof window === "undefined" || window.innerWidth <= 900 || reduced) {
      setIsDesktop(false);
      return;
    }
    setIsDesktop(true);
    const p = scrollYProgress.get();
    const trackX = panX.get();
    let mask = 0;
    if (p >= 0.08 && p <= 0.92) {
      for (let i = 0; i < CARD_BOUNDS.length; i++) {
        const screenLeft = CARD_BOUNDS[i].left + trackX;
        const screenRight = screenLeft + CARD_BOUNDS[i].width;
        if (screenRight > -35 && screenLeft < 145) {
          mask |= 1 << i;
        }
      }
    }
    if (mask !== prevMaskRef.current) {
      prevMaskRef.current = mask;
      setActiveMask(mask);
    }
  };

  useEffect(() => {
    evaluateVisibleCards();
    window.addEventListener("resize", evaluateVisibleCards, { passive: true });
    return () => window.removeEventListener("resize", evaluateVisibleCards);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useMotionValueEvent(scrollYProgress, "change", evaluateVisibleCards);
  useMotionValueEvent(panX, "change", evaluateVisibleCards);

  return (
    <section ref={ref} id="work" className={styles.scrollSection}>
      <motion.div className={styles.stickyContainer} style={reduced ? {} : { y: containerY }}>

        {/* forest background */}
        <motion.div
          className={styles.forestBg}
          style={reduced ? { position: "absolute" } : { position: "absolute", x: bgX }}
          aria-hidden="true"
        >
          <Image
            src="/forest-3.webp"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "left top" }}
            loading="lazy"
          />
        </motion.div>

        {/* WORK stencil */}
        <motion.div 
          className={styles.introStencil} 
          aria-hidden="true"
          style={reduced ? {} : { x: stencilX }}
        >
          DEPLOY
        </motion.div>

        {/* archive label */}
        <motion.div
          className={styles.ambientLabel}
          style={reduced ? {} : { x: labelX }}
        >
          <span className="section-label" style={{ marginBottom:16 }}>Live Deployments · 2020—Present</span>
          <div className={styles.introTitle}>The<br /><em>Stack.</em></div>
          <p className={styles.introHint}>Scroll to explore →</p>
        </motion.div>

        {/* panning track on desktop */}
        <motion.div className={styles.track} style={{ x: reduced ? 0 : x }}>
          {works.map((w, idx) => (
            <ProjectCard
              key={w.num}
              work={w}
              index={idx}
              scrollYProgress={scrollYProgress}
              videoActive={isDesktop ? Boolean(activeMask & (1 << idx)) : undefined}
              reduced={reduced}
            />
          ))}

          <motion.div
            className={styles.desktopVine}
            style={{ position: "absolute", left: "330vw", top: "35vh", width: "40vw", opacity: 0.12, y: vineY }}
            aria-hidden="true"
          >
            <Image
              src="/vine_nobg.webp"
              alt=""
              aria-hidden="true"
              width={1024}
              height={1024}
              sizes="40vw"
              style={{ width: "100%", height: "auto", display: "block" }}
              loading="lazy"
            />
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
