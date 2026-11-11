import { MessageSquare, Footprints, CircleCheck } from "lucide-react";
import SectionHeading from "../SectionHeading";

const steps = [
  { icon: MessageSquare, title: "Reach out", line: "Call, text or send a quote request." },
  { icon: Footprints, title: "Free estimate", line: "Adam walks your property and gives you a free estimate." },
  { icon: CircleCheck, title: "Job done", line: "The job gets done right, and cleaned up after." },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="section-y bg-surface/50 border-y border-line">
      <div className="container-x">
        <SectionHeading id="how-title" eyebrow="How it works" title={<>Three steps. <span className="whitespace-nowrap text-accent">No runaround.</span></>} />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative bg-bg p-8 lg:p-10">
              <span aria-hidden className="font-display block text-[88px] font-black leading-[0.8] text-accent lg:text-[112px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <s.icon aria-hidden className="absolute right-8 top-8 size-7 text-muted lg:right-10 lg:top-10" strokeWidth={1.5} />
              <h3 className="font-display mt-8 text-[34px] font-black leading-none">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-3 text-[17px] leading-relaxed text-muted">{s.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
