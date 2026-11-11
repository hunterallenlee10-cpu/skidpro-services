import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import BeforeAfter from "@/components/sections/BeforeAfter";
import CinematicStrip from "@/components/sections/CinematicStrip";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Services />
        <BeforeAfter />
        <CinematicStrip />
      </main>
      <Footer />
    </>
  );
}
