import ConsultingNav from "@/components/ConsultingNav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import styles from "@/components/Consulting.module.css";
import nfStyles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <Loader />
      <Cursor />
      <ConsultingNav />
      <main className={styles.wrapper} style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div className={nfStyles.container}>
          <div className={nfStyles.code}>404</div>
          <h1 className={nfStyles.heading}>
            This page doesn&apos;t <em>exist.</em>
          </h1>
          <p className={nfStyles.sub}>
            The link you followed may be broken, or the page may have moved. Either way — you&apos;re not lost for long.
          </p>
          <div className={nfStyles.actions}>
            <a href="/" className={nfStyles.primary}>Back to home →</a>
            <a href="/brochure" className={nfStyles.ghost}>Read the brochure</a>
            <a href="/#contact" className={nfStyles.ghost}>Get in touch</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
