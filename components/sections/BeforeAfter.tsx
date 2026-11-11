"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { photos } from "@/lib/images";
import type { ServiceId } from "@/lib/business";
import BeforeAfterSlider from "../BeforeAfterSlider";
import QuoteButton from "../QuoteButton";

const pairs = [
  {
    id: "brush",
    tab: "Brush Clearing",
    service: "land-clearing" as ServiceId,
    before: photos.brushBefore,
    after: photos.brushAfter,
    caption: "Pasture overrun with brush clumps, cut back flat with the brush cutter.",
  },
  {
    id: "driveway",
    tab: "Gravel Driveway",
    service: "gravel-driveways" as ServiceId,
    before: photos.drivewayBefore,
    after: photos.drivewayAfter,
    caption: "Rutted ranch drive, rebuilt in white gravel with a new cattle guard.",
  },
];

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const pair = pairs[active];

  const onTabKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + pairs.length) % pairs.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="our-work" aria-labelledby="ba-title" className="topo section-y border-y border-line bg-surface/40">
      <div className="container-x grid gap-8 lg:grid-cols-[5fr_7fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0">
        <div className="lg:self-end">
          <p className="eyebrow mb-4">Before &amp; after</p>
          <h2 id="ba-title" className="font-display text-[clamp(48px,6.5vw,92px)] font-black leading-[0.88]">
            See the <span className="text-accent">difference.</span>
          </h2>

          <div role="tablist" aria-label="Before and after projects" className="mt-8 inline-flex rounded-md border border-line bg-bg p-1">
            {pairs.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${p.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onTabKey}
                className={`min-h-11 rounded-sm px-4 text-[15px] font-semibold transition-colors ${
                  active === i ? "bg-accent text-bg" : "text-text/75 hover:text-text"
                }`}
              >
                {p.tab}
              </button>
            ))}
          </div>

        </div>

        <div
          id={`panel-${pair.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${pair.id}`}
          className="flex items-center justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-[560px]"
        >
          <BeforeAfterSlider key={pair.id} before={pair.before} after={pair.after} label={pair.tab} />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <p className="max-w-md text-lg leading-relaxed text-muted lg:mt-6">{pair.caption}</p>
          {/* DRAFT: confirm "One day" with Adam */}
          <p className="font-display mt-8 text-[32px] font-extrabold leading-none">
            Same property. One day of SkidPro.
          </p>
          <QuoteButton service={pair.service} className="mt-8" />
        </div>
      </div>
    </section>
  );
}
