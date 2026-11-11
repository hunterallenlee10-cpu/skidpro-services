import Image from "next/image";
import { CalendarCheck, Check, PhoneCall, Snowflake } from "lucide-react";
import { photos } from "@/lib/images";
import QuoteButton from "../QuoteButton";

const spots = ["Parking lots", "Driveways", "Roadways", "Business properties"];

const options = [
  { icon: PhoneCall, title: "On-call", line: "Call or text when it snows. We come out." },
  { icon: CalendarCheck, title: "Seasonal contract", line: "Your property is covered all season." },
];

/** Seasonal spotlight. Cool overlay on the surface color, still inside the palette. */
export default function Snow() {
  const p = photos.trailerSnow;
  return (
    <section
      id="snow"
      aria-labelledby="snow-title"
      className="grain section-y relative overflow-hidden bg-surface"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(140,170,210,0.16),transparent_60%),linear-gradient(180deg,rgba(120,150,190,0.08),rgba(120,150,190,0.02))]"
      />
      <div className="container-x grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-[400px] lg:order-none">
          <Image
            src={p.src}
            alt={p.alt}
            width={p.width}
            height={p.height}
            sizes="(min-width: 1024px) 400px, 90vw"
            className="aspect-[486/700] w-full rounded-md border border-line object-cover object-[50%_60%]"
          />
          <span className="absolute -bottom-4 left-4 inline-flex items-center gap-2 rounded-sm bg-accent px-3 py-2 text-sm font-semibold text-bg shadow-lg">
            <Snowflake aria-hidden className="size-4" /> Now accepting snow contracts
          </span>
        </div>

        <div>
          <p className="eyebrow mb-4">Snow plowing</p>
          <h2 id="snow-title" className="font-display text-[clamp(44px,5.6vw,80px)] font-black leading-[0.9]">
            Snow season is coming. <span className="text-accent">Lock in your spot.</span>
          </h2>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
            {spots.map((s) => (
              <li key={s} className="flex items-center gap-3 text-lg font-medium">
                <Check aria-hidden className="size-5 shrink-0 text-accent" strokeWidth={2.5} /> {s}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {options.map((o) => (
              <div key={o.title} className="rounded-md border border-text/10 bg-bg/50 p-6">
                <o.icon aria-hidden className="size-6 text-accent" strokeWidth={1.75} />
                <h3 className="font-display mt-4 text-[30px] font-black leading-none">{o.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{o.line}</p>
              </div>
            ))}
          </div>

          <QuoteButton service="snow-plowing" className="mt-10">
            Get a snow quote
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
