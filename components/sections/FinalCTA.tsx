"use client";

import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { useQuote } from "../QuotePlanner/QuoteContext";

export default function FinalCTA() {
  const { openQuote } = useQuote();
  return (
    <section aria-labelledby="cta-title" className="pb-16 pt-4 lg:pb-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-md bg-accent px-6 py-14 text-bg sm:px-12 lg:px-16 lg:py-20">
          {/* Contour lines, tinted dark */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/textures/topo.svg')] bg-cover bg-center opacity-[0.12] invert" />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="cta-title" className="font-display max-w-[14ch] text-[clamp(48px,7vw,104px)] font-black leading-[0.88]">
              Got ground that needs work? Let&apos;s look at it.
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button
                type="button"
                onClick={() => openQuote()}
                aria-haspopup="dialog"
                className="btn !min-h-14 bg-bg px-7 text-[17px] text-text hover:bg-surface"
              >
                Get a Free Quote <ArrowRight aria-hidden className="size-[18px]" />
              </button>
              <a href={business.tel} className="btn !min-h-14 border-2 border-bg px-7 text-[17px] hover:bg-bg/10">
                <Phone aria-hidden className="size-[18px]" /> Call {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
