import { business } from "@/lib/business";
import PhotoPlaceholder from "../PhotoPlaceholder";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y border-t border-line">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <PhotoPlaceholder label="Photo: Adam with his machine" className="aspect-[4/5] w-full max-w-[440px] rounded-md" />

        <div>
          <p className="eyebrow mb-4">We show up</p>
          <h2 id="about-title" className="font-display text-[clamp(44px,5.6vw,80px)] font-black leading-[0.9]">
            Meet the guy <span className="text-accent">in the cab.</span>
          </h2>

          {/* DRAFT: confirm wording with Adam */}
          <div className="mt-8 max-w-xl space-y-4 text-xl leading-relaxed text-text/90">
            <p>
              I started SkidPro in 2025 because folks around Enid needed someone who shows up, does the job
              right and answers the phone.
            </p>
            <p>I run the machines myself. When you call, you get me.</p>
          </div>
          <p className="font-display mt-8 text-3xl font-extrabold">{business.owner}</p>
          <p className="text-sm text-muted">Owner and operator, {business.brand}</p>

          <blockquote className="mt-10 border-l-[3px] border-accent pl-5">
            <p className="font-display text-[clamp(28px,3vw,40px)] font-black leading-[1]">
              {business.lines.bigEnough}
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
