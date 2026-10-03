import Loader from "@/components/Loader";
import ConsultingNav from "@/components/ConsultingNav";
import ConsultingHero from "@/components/ConsultingHero";
import ConsultingTools from "@/components/ConsultingTools";
import ConsultingCapabilities from "@/components/ConsultingCapabilities";
import ConsultingProjects from "@/components/ConsultingProjects";
import ConsultingBackground from "@/components/ConsultingBackground";
import ConsultingClosing from "@/components/ConsultingClosing";
import Footer from "@/components/Footer";
import styles from "@/components/Consulting.module.css";

import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Brochure",
  description: "Workflow automation, custom software, and AI systems. Built by Ojas — one person, full-stack, production-grade.",
  alternates: { canonical: 'https://exzlr.com/brochure' },
  openGraph: {
    title: 'EXZLR Brochure — What I Build & How I Work',
    description: 'Workflow automation, custom software, and AI systems. Built by Ojas — one person, full-stack, production-grade.',
    url: 'https://exzlr.com/brochure',
  },
};

export default function Work() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <Loader />
      <Cursor />
      <ConsultingNav />
      <main className={styles.wrapper}>
        <ConsultingHero />
        <ConsultingTools />
        <ConsultingCapabilities />
      </main>
      
      <ConsultingProjects />
      
      <main className={styles.wrapper}>
        <ConsultingBackground />
        <ConsultingClosing />
      </main>
      <Footer />
    </div>
  );
}
