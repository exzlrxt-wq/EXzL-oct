// Thank You page
import ConsultingNav from "@/components/ConsultingNav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import styles from "@/components/Consulting.module.css";
import thankStyles from "./thank-you.module.css";

export const metadata = {
  title: "EXZLR — Message Received",
  description: "Your message has been received. An EXZLR systems architect will be in touch within one business day.",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <Loader />
      <Cursor />
      <ConsultingNav />
      <main className={styles.wrapper} style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div className={thankStyles.container}>
          <div className={thankStyles.badge}>Message received ✦</div>
          <h1 className={thankStyles.heading}>
            You&apos;re in the <em>queue.</em>
          </h1>
          <p className={thankStyles.sub}>
            An EXZLR architect will review your submission and be in touch within one business day. In the meantime — take a look at what I&apos;ve shipped.
          </p>
          <div className={thankStyles.actions}>
            <a href="/brochure" className={thankStyles.primary}>Read the brochure →</a>
            <a href="/services" className={thankStyles.ghost}>See services</a>
          </div>
          <div className={thankStyles.direct}>
            Or reach out directly: <a href="mailto:admin@exzlr.com">admin@exzlr.com</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
