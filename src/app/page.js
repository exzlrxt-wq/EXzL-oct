import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Testimonials from "@/components/Testimonials";
import StatementSection from "@/components/StatementSection";
import Workspace3 from "@/components/Workspace3";
import ProcessTimeline from "@/components/ProcessTimeline";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import BackgroundShift from "@/components/BackgroundShift";

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <Nav />
      <ProgressBar />
      {/* Scroll-tied background colour shift — purely behavioural, no DOM output */}
      <BackgroundShift />
      <main>
        <Hero />
        <Works />
        <Testimonials />
        <StatementSection />
        <ProcessTimeline />
        <Workspace3 />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
