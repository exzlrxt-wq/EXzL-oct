"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import styles from "./Works.module.css";

const TRAVEL  = 218;
const TRACK_W = 320;

const works = [
  { num:"01", title:"Command Centre",    year:"2024", cat:"SaaS · Dashboard",  video:"/videos/video1.mov", tag:"SaaS", pos:{ left:"110vw", top:"30vh", width:"36vw"  }, dir: 1  },
  { num:"02", title:"Interface Systems", year:"2024", cat:"UI · Components",   video:"/videos/video2.mov", tag:"UI",   pos:{ left:"152vw", top:"8vh",  width:"23vw"  }, dir:-1  },
  { num:"03", title:"Orbit Platform",    year:"2024", cat:"SaaS · Product",    video:"/videos/video3.mov", tag:"SaaS", pos:{ left:"186vw", top:"46vh", width:"32vw"  }, dir: 1  },
  { num:"04", title:"Pocket UI",         year:"2023", cat:"Mobile · App",      video:"/videos/video4.mov", tag:"UI",   pos:{ left:"222vw", top:"10vh", width:"20vw"  }, dir:-1  },
  { num:"05", title:"Signal Web",        year:"2023", cat:"Web · Landing",     video:"/videos/video6.mov", tag:"Web",  pos:{ left:"250vw", top:"44vh", width:"33vw"  }, dir: 1  },
  { num:"06", title:"Atlas App",         year:"2022", cat:"SaaS · Web App",    video:"/videos/video7.mov", tag:"SaaS", pos:{ left:"282vw", top:"12vh", width:"27vw"  }, dir:-1  },
];

/* Per-card parallax drift — enters from diagonal, floats while visible */
function ProjectCard({ work, scrollYProgress }) {
  // Safely bound the ranges to prevent Framer Motion duplication errors
  const centers = [0.29, 0.38, 0.46, 0.54, 0.60, 0.67];
  const enter = centers[works.indexOf(work)] || 0.5;
  const startP = Math.max(0, enter - 0.20);
  const endP = Math.min(1, enter + 0.20);

  const rawY = useTransform(scrollYProgress,
    [startP, enter, endP],
    [work.dir * 55, 0, work.dir * -28],
  );
  const cardY = useSpring(rawY, { stiffness:80, damping:22, mass:0.8 });
  const rotate = useTransform(scrollYProgress,
    [startP, enter],
    [work.dir * 2.5, 0],
  );

  return (
    <motion.div
      className={styles.floatCard}
      style={{ left:work.pos.left, top:work.pos.top, width:work.pos.width, y:cardY, rotate }}
    >
      <div className={styles.vidWrap}>
        <video src={work.video} className={styles.vid} autoPlay muted loop playsInline preload="metadata" />
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

export default function Works() {
  const ref     = useRef(null);
  const reduced = useReducedMotion();

  // 'start end' → 'end start' tracks full section journey through viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const SP = { stiffness: 70, damping: 22, mass: 1.4 };

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

  return (
    <section ref={ref} id="work" className={styles.scrollSection}>
      <motion.div className={styles.stickyContainer} style={reduced ? {} : { y: containerY }}>

        {/* forest background — now parallaxes out left at the end */}
        <motion.img 
          src="/forest 3_nobg.png 11-36-35-396.png" 
          alt="" 
          aria-hidden="true" 
          className={styles.forestBg} 
          style={reduced ? {} : { x: bgX }} 
        />

        {/* WORK stencil — now parallaxes out left at the end */}
        <motion.div 
          className={styles.introStencil} 
          aria-hidden="true"
          style={reduced ? {} : { x: stencilX }}
        >
          DEPLOY
        </motion.div>

        {/* archive label — slides in from left, parallaxes out. No more fading! */}
        <motion.div
          className={styles.ambientLabel}
          style={reduced ? {} : { x: labelX }}
        >
          <span className="section-label" style={{ marginBottom:16 }}>Live Deployments · 2020—Present</span>
          <div className={styles.introTitle}>The<br /><em>Stack.</em></div>
          <p className={styles.introHint}>Scroll to explore →</p>
        </motion.div>

        {/* panning track with per-card parallax + ending illustrations */}
        <motion.div className={styles.track} style={{ x: reduced ? 0 : x, width:`400vw` }}>
          {works.map(w => (
            <ProjectCard key={w.num} work={w} scrollYProgress={scrollYProgress} />
          ))}

          {/* Floating vine illustration at the end of the horizontal track, low opacity */}
          <motion.img 
            src="/vine_nobg.png" 
            alt="" aria-hidden="true" 
            style={{ position: "absolute", left: "330vw", top: "35vh", width: "40vw", opacity: 0.12, y: useTransform(scrollYProgress, [0.75, 1], [50, -150]) }} 
          />
        </motion.div>

      </motion.div>
    </section>
  );
}
