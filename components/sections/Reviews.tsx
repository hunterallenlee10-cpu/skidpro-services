"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { business } from "@/lib/business";
import SectionHeading from "../SectionHeading";

// Sample: replace with real Google reviews. There are no public reviews yet.
const samples = [
  {
    name: "Mike R.",
    job: "Land clearing",
    text: "Called on a Monday, he was out to look at it that week. Pasture looks like a pasture again.",
  },
  {
    name: "Sarah T.",
    job: "Gravel driveway",
    text: "Our drive was ruts and mud. Now it's gravel and it held up through the rain. Fair and easy to work with.",
  },
  {
    name: "Dale W.",
    job: "Building pad",
    text: "Needed a pad for a metal shop. Level, packed and ready when the builder showed up.",
  },
];

export default function Reviews() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="reviews-title" aria-roledescription="carousel" className="section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="reviews-title" eyebrow="Reviews" title={<>What folks <span className="text-accent">are saying.</span></>} />
          <div className="flex gap-2 lg:hidden">
            <button type="button" aria-label="Previous review" onClick={() => scroll(-1)} className="grid size-12 place-items-center rounded-sm border border-line hover:border-accent">
              <ArrowLeft aria-hidden className="size-5" />
            </button>
            <button type="button" aria-label="Next review" onClick={() => scroll(1)} className="grid size-12 place-items-center rounded-sm border border-line hover:border-accent">
              <ArrowRight aria-hidden className="size-5" />
            </button>
          </div>
        </div>

        <ul
          ref={track}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0"
        >
          {samples.map((r, i) => (
            <li
              key={r.name}
              aria-roledescription="slide"
              aria-label={`Sample review ${i + 1} of ${samples.length}`}
              className="card flex w-[86%] shrink-0 snap-start flex-col p-6 sm:w-[60%] lg:w-auto lg:p-8"
            >
              <p className="self-start rounded-sm border border-dashed border-accent/60 px-2.5 py-1 text-[12px] font-semibold text-accent">
                Sample review: replace with real Google reviews
              </p>
              <div className="mt-6 flex gap-1 text-accent" aria-hidden>
                {Array.from({ length: 5 }).map((_, n) => (
                  <Star key={n} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-text/90">“{r.text}”</blockquote>
              <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                <span aria-hidden className="font-display grid size-11 place-items-center rounded-full bg-text/10 text-xl font-black">
                  {r.name[0]}
                </span>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-muted">{r.job}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* TODO: link to Adam's Google Business Profile once it exists */}
        <a
          href={business.googleReviewUrl}
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-text/85 underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
        >
          Leave us a review on Google <ArrowUpRight aria-hidden className="size-4" />
        </a>
      </div>
    </section>
  );
}
