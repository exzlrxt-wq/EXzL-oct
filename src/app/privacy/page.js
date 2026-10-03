import ConsultingNav from "@/components/ConsultingNav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import styles from "@/components/Consulting.module.css";
import privStyles from "./privacy.module.css";

export const metadata = {
  title: "EXZLR — Privacy Policy",
  description: "Privacy Policy for EXZLR. How we handle your data when you contact us or use our services.",
};

const LAST_UPDATED = "June 24, 2026";

export default function Privacy() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <Loader />
      <Cursor />
      <ConsultingNav />
      <main className={styles.wrapper}>
        <div className={privStyles.header}>
          <div className={privStyles.eyebrow}>Legal</div>
          <h1 className={privStyles.title}>Privacy Policy</h1>
          <p className={privStyles.meta}>Last updated: {LAST_UPDATED}</p>
        </div>

        <div className={privStyles.body}>

          <section className={privStyles.section}>
            <h2>1. Who we are</h2>
            <p>
              EXZLR is the technology and AI brand of Kaltech Wayducation Pvt. Ltd., focused on building software, automation platforms, and digital solutions for modern businesses. Our website is <strong>exzlr.com</strong>. For privacy-related queries, contact: <a href="mailto:admin@exzlr.com">admin@exzlr.com</a>
            </p>
          </section>

          <section className={privStyles.section}>
            <h2>2. What information we collect</h2>
            <p>We only collect information you voluntarily provide:</p>
            <ul>
              <li><strong>Contact form submissions</strong> — your name, email address, project description, and budget range when you fill out the contact form on this site.</li>
              <li><strong>Email correspondence</strong> — any information you share when emailing us directly at admin@exzlr.com.</li>
              <li><strong>Usage data</strong> — if analytics are enabled, we may collect anonymised page view data (no personally identifiable information).</li>
            </ul>
            <p>We do not collect payment information, passwords, or sensitive personal data through this website.</p>
          </section>

          <section className={privStyles.section}>
            <h2>3. How we use your information</h2>
            <p>Information you submit is used solely to:</p>
            <ul>
              <li>Respond to your enquiry or project request</li>
              <li>Provide a quote or proposal for services</li>
              <li>Send occasional follow-up related to your stated project need</li>
            </ul>
            <p>We do not use your information for unsolicited marketing, sell it to third parties, or share it with advertising networks.</p>
          </section>

          <section className={privStyles.section}>
            <h2>4. Data storage and security</h2>
            <p>
              Contact form submissions are sent directly to our business email. We use industry-standard encrypted email and store client communication securely. We do not maintain a marketing database.
            </p>
            <p>
              If you use the EXZLR dashboard product (app.exzlr.com), that platform is powered by Supabase and has its own data handling — covered under separate terms provided at account creation.
            </p>
          </section>

          <section className={privStyles.section}>
            <h2>5. Cookies</h2>
            <p>
              This website (exzlr.com) does not use tracking cookies or advertising cookies. If analytics are enabled, we use privacy-first analytics (no cookies, no fingerprinting). Essential session cookies may be set by the browser for normal site operation.
            </p>
          </section>

          <section className={privStyles.section}>
            <h2>6. Third-party services</h2>
            <p>This website uses Google Fonts for typography. Google may log font requests. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</p>
          </section>

          <section className={privStyles.section}>
            <h2>7. Your rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to any personal data we hold about you</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
            <p>To exercise any of these rights, email: <a href="mailto:admin@exzlr.com">admin@exzlr.com</a></p>
          </section>

          <section className={privStyles.section}>
            <h2>8. Children&apos;s privacy</h2>
            <p>
              Our services are directed at businesses and professionals. We do not knowingly collect information from anyone under the age of 18.
            </p>
          </section>

          <section className={privStyles.section}>
            <h2>9. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy occasionally. Changes will be reflected by updating the &quot;Last updated&quot; date at the top of this page. Continued use of the site after changes constitutes acceptance.
            </p>
          </section>

          <section className={privStyles.section}>
            <h2>10. Contact</h2>
            <p>
              For any privacy-related questions:<br />
              <strong>Email:</strong> <a href="mailto:admin@exzlr.com">admin@exzlr.com</a><br />
              <strong>Website:</strong> exzlr.com
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
