"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { serviceById, type ServiceId } from "@/lib/business";
import { photos, type Photo } from "@/lib/images";
import { serviceIcons } from "@/lib/serviceIcons";
import { useQuote } from "../QuotePlanner/QuoteContext";
import SectionHeading from "../SectionHeading";

const compact: ServiceId[] = [
  "tree-removal",
  "gravel-driveways",
  "grading",
  "debris-cleanup",
  "snow-plowing",
  "contract-work",
];

function Underline() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
    />
  );
}

function PhotoTile({ id, photo, className, imgClass }: { id: ServiceId; photo: Photo; className: string; imgClass: string }) {
  const { openQuote } = useQuote();
  const s = serviceById(id);
  return (
    <button
      type="button"
      onClick={() => openQuote(id)}
      className={`card group relative isolate flex flex-col justify-end overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={`${photo.width}px`}
        className={`absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${imgClass}`}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      <div className="relative p-6 lg:p-7">
        <h3 className="font-display text-[34px] font-black leading-[0.95] lg:text-[40px]">{s.title}</h3>
        <p className="mt-2 max-w-sm text-text/85">{s.line}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Free quote <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <Underline />
    </button>
  );
}

function CompactTile({ id }: { id: ServiceId }) {
  const { openQuote } = useQuote();
  const s = serviceById(id);
  const Icon = serviceIcons[id];
  return (
    <button
      type="button"
      onClick={() => openQuote(id)}
      className="card group relative flex flex-col overflow-hidden p-6 text-left transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40"
    >
      <Icon aria-hidden className="size-7 text-accent" strokeWidth={1.75} />
      <h3 className="font-display mt-5 text-[26px] font-extrabold leading-none">{s.title}</h3>
      <p className="mt-2 text-[15px] leading-snug text-muted">{s.line}</p>
      <span className="sr-only">Get a free quote</span>
      <Underline />
    </button>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="services-title" eyebrow="What we do" title={<>Eight jobs.<br /><span className="text-accent">One call.</span></>} />
          <p className="max-w-xs text-muted md:text-right">Tap any service for a free quote on that job.</p>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PhotoTile
            id="land-clearing"
            photo={photos.brushAfter}
            className="min-h-[420px] lg:col-span-2 lg:row-span-2"
            imgClass="object-[50%_60%]"
          />
          <PhotoTile
            id="building-pads"
            photo={photos.padPortrait}
            className="min-h-[420px] lg:row-span-2"
            imgClass="object-[40%_50%]"
          />
          {compact.map((id) => (
            <CompactTile key={id} id={id} />
          ))}
        </div>
      </div>
    </section>
  );
}
