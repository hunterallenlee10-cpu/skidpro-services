import { Plus } from "lucide-react";
import { business } from "@/lib/business";
import SectionHeading from "../SectionHeading";

const faqs = [
  { q: "Do you give free estimates?", a: "Yes. Every job starts with a free estimate." },
  { q: "What areas do you serve?", a: `${business.city} and ${business.region}. Not sure about your place? Text Adam at ${business.phoneDisplay}.` },
  { q: "Can you clear cedar trees?", a: "Yes. Cedar and other invasive trees come out roots and all." },
  { q: "Do you haul off the debris?", a: "Ask Adam about haul-off for your job." },
  { q: "Can I hire you by the day for my crew?", a: "Yes. Book SkidPro by the job or by the day. You get the machine and the operator." },
  { q: "Do you do seasonal snow contracts?", a: "Yes. Seasonal contracts or on-call. Call or text to lock in your spot." },
];

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y border-t border-line">
      <div className="container-x grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <SectionHeading id="faq-title" eyebrow="FAQ" title={<>Straight <span className="text-accent">answers.</span></>}>
          Don&apos;t see your question? Call or text {business.phoneDisplay}.
        </SectionHeading>

        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-semibold sm:text-xl">{f.q}</span>
                <Plus aria-hidden className="size-6 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="max-w-xl pb-6 text-[17px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
