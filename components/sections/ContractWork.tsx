import { Check } from "lucide-react";
import QuoteButton from "../QuoteButton";

const bullets = [
  "Machine plus experienced operator",
  "Shows up on time, works your schedule",
  "No rental, no hauling, no headaches",
];

const plate = [
  { k: "Book by", v: "The job or the day" },
  { k: "Built for", v: "Builders · GCs · Farmers · Property managers" },
  { k: "You get", v: "Tracked loader + operator" },
];

/** B2B band. The one red-dirt tinted section. */
export default function ContractWork() {
  return (
    <section aria-labelledby="contract-title" className="grain relative bg-dirt">
      <div aria-hidden className="hazard" />
      <div className="container-x section-y grid items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-4">Contract work</p>
          <h2 id="contract-title" className="font-display text-[clamp(44px,5.6vw,80px)] font-black leading-[0.9]">
            Need a skid steer and an operator <span className="text-accent">on your job?</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text/80">
            Builders, GCs, farmers and property managers can book SkidPro by the job or by the day.
          </p>
          <ul className="mt-8 grid gap-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-lg font-medium">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-sm bg-accent text-bg">
                  <Check aria-hidden className="size-4" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <QuoteButton service="contract-work" className="mt-10">
            Book SkidPro for your job
          </QuoteButton>
        </div>

        {/* Equipment data plate */}
        <div className="rounded-md border border-text/15 bg-bg/60 p-2 shadow-2xl">
          <div className="rounded-sm border border-line p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <p className="font-display text-2xl font-black tracking-wider">SkidPro Services</p>
              <p className="font-display text-lg font-extrabold text-accent">For hire</p>
            </div>
            <dl className="divide-y divide-line">
              {plate.map((r) => (
                <div key={r.k} className="grid gap-1 py-5 sm:grid-cols-[110px_1fr] sm:gap-4">
                  <dt className="pt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">{r.k}</dt>
                  <dd className="font-display text-[26px] font-extrabold leading-[1.05]">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
