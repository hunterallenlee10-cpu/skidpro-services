import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import BeforeAfter from "@/components/sections/BeforeAfter";
import CinematicStrip from "@/components/sections/CinematicStrip";
import RecentWork from "@/components/sections/RecentWork";
import Fleet from "@/components/sections/Fleet";
import ContractWork from "@/components/sections/ContractWork";
import Snow from "@/components/sections/Snow";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Services />
        <BeforeAfter />
        <CinematicStrip />
        <RecentWork />
        <Fleet />
        <ContractWork />
        <Snow />
      </main>
      <Footer />
    </>
  );
}
