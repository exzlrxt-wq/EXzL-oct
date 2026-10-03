import Loader from "@/components/Loader";
import ConsultingNav from "@/components/ConsultingNav";
import ConsultingServices from "@/components/ConsultingServices";
import ConsultingCapabilities from "@/components/ConsultingCapabilities";
import ConsultingTools from "@/components/ConsultingTools";
import EngagementPipeline from "@/components/EngagementPipeline";
import ConsultingClosing from "@/components/ConsultingClosing";
import Footer from "@/components/Footer";
import styles from "@/components/Consulting.module.css";
import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Services",
  description: "Workflow automation, custom software, and AI systems for businesses. Packages starting from ₹40k. Free audit included.",
  alternates: { canonical: 'https://exzlr.com/services' },
  openGraph: {
    title: 'EXZLR Services — Automation, Web Apps & AI Systems',
    description: 'Workflow automation, custom software, and AI systems for businesses. Packages starting from ₹40k. Free audit included.',
    url: 'https://exzlr.com/services',
  },
};

export default function Services() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <Loader />
      <Cursor />
      <ConsultingNav />
      <main className={styles.wrapper}>
        <ConsultingServices />
        <ConsultingCapabilities />
      </main>
      
      <EngagementPipeline />
      
      <main className={styles.wrapper}>
        <hr style={{ border: "none", borderTop: "1px solid #1E1E1E", margin: "0 0 100px" }} />
        <ConsultingTools />
        <ConsultingClosing />
      </main>
      <Footer />
    </div>
  );
}
