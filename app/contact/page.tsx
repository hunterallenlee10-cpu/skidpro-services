import type { Metadata } from "next";
import ContactHero from "@/components/sections/ContactHero";
import ServiceArea from "@/components/sections/ServiceArea";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";
import QuotePlanner from "@/components/QuotePlanner/QuotePlanner";

export const metadata: Metadata = {
  title: "Contact | SkidPro Services, Enid OK",
  description: "Call or text Adam at (580) 747-6677, or send a free quote request for skid steer work in Northwest Oklahoma.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <main id="main">
        <ContactHero />
        <section aria-labelledby="planner-heading" className="section-y">
          <div className="container-x grid gap-12 lg:grid-cols-[4fr_7fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-4">Free quote planner</p>
              <h2 id="planner-heading" className="font-display text-[clamp(44px,5vw,72px)] font-black leading-[0.9]">
                Five quick steps. <span className="text-accent">Free estimate.</span>
              </h2>
              <p className="mt-5 max-w-sm text-lg text-muted">Tell Adam what you need. He&apos;ll get back to you to set up a time to look at it.</p>
            </div>
            <div className="card p-5 sm:p-8 lg:p-10">
              <QuotePlanner inline headingId="contact-planner" />
            </div>
          </div>
        </section>
        <ServiceArea compact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
