"use client";

import { useState, type FormEvent } from "react";
import { MapPin, MessageSquare } from "lucide-react";
import { business } from "@/lib/business";
import SectionHeading from "../SectionHeading";

// Simplified Oklahoma outline. x = (lon + 103) * 82, y = (37 - lat) * 100.
const OK_PATH =
  "M0 0 L687 0 L703 160 L699 336 L631 312 L549 325 L476 315 L418 305 L361 285 L312 275 L271 262 L246 244 L246 50 L0 50 Z";
const ENID = { x: 420, y: 60 };

function OklahomaMap() {
  return (
    <svg viewBox="-10 -56 725 404" role="img" aria-labelledby="ok-map-title" className="h-auto w-full">
      <title id="ok-map-title">Map of Oklahoma with the northwest region highlighted and a pin on Enid</title>
      <defs>
        <clipPath id="ok-clip">
          <path d={OK_PATH} />
        </clipPath>
      </defs>
      <path d={OK_PATH} fill="#1A1612" stroke="#3a322a" strokeWidth="2" strokeLinejoin="round" />
      {/* Northwest Oklahoma */}
      <g clipPath="url(#ok-clip)">
        <rect x="-10" y="-10" width="496" height="186" fill="#F47B20" fillOpacity="0.22" />
        <path d="M486 -10 V176 H-10" fill="none" stroke="#F47B20" strokeWidth="2" strokeDasharray="6 6" />
      </g>
      <path d={OK_PATH} fill="none" stroke="#F4EEE6" strokeOpacity="0.35" strokeWidth="1.5" strokeLinejoin="round" />
      <text x="262" y="150" fill="#F47B20" fontSize="22" fontWeight="700" letterSpacing="3" fontFamily="var(--font-archivo)">
        NORTHWEST OK
      </text>
      {/* Enid pin */}
      <g transform={`translate(${ENID.x} ${ENID.y})`}>
        <circle r="22" fill="#F47B20" fillOpacity="0.18" />
        <circle r="7" fill="#F47B20" stroke="#0E0C0A" strokeWidth="3" />
        <path d="M0 -12 C-10 -12 -16 -20 -16 -28 C-16 -38 -8 -44 0 -44 C8 -44 16 -38 16 -28 C16 -20 10 -12 0 -12 Z" fill="#F47B20" transform="translate(0 0)" />
        <circle cy="-29" r="5.5" fill="#0E0C0A" />
        <text x="24" y="-18" fill="#F4EEE6" fontSize="24" fontWeight="800" letterSpacing="2" fontFamily="var(--font-big-shoulders)" style={{ fontVariationSettings: '"opsz" 72' }}>
          ENID
        </text>
      </g>
    </svg>
  );
}

export default function ServiceArea({ compact = false }: { compact?: boolean }) {
  const [town, setTown] = useState("");
  const [checked, setChecked] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setChecked(town.trim());
  };
  const show = (checked || town).trim().length > 0;

  return (
    <section id="service-area" aria-labelledby="area-title" className="section-y border-t border-line">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="area-title" eyebrow="Service area" title={<>Based in Enid. <span className="text-accent">Working all over NW Oklahoma.</span></>}>
              Proven jobs from Enid out to {business.provenJobTown}.
            </SectionHeading>

            <form onSubmit={onSubmit} className="mt-10 max-w-md">
              <label htmlFor="town" className="font-display text-2xl font-extrabold">
                Is my property in range?
              </label>
              <div className="mt-3 flex gap-2">
                <input
                  id="town"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Your town"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="min-h-12 flex-1 rounded-sm border border-line bg-surface px-4 text-base placeholder:text-muted/70 focus:border-accent focus:outline-none"
                />
                <button type="submit" className="btn btn-ghost !min-h-12">
                  Check
                </button>
              </div>
              <div aria-live="polite" className="min-h-[88px]">
                {show && (
                  <div className="mt-4 flex items-start gap-3 rounded-sm border border-accent/40 bg-accent/10 p-4 text-[15px] leading-snug">
                    <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
                    <p>
                      Most of Northwest Oklahoma is in range. Text Adam to confirm:{" "}
                      <a href={business.sms} className="inline-flex items-center gap-1 font-semibold text-accent underline underline-offset-2">
                        <MessageSquare aria-hidden className="size-4" />
                        {business.phoneDisplay}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="card topo p-6 sm:p-10">
            <OklahomaMap />
          </div>
        </div>

        <div className={`mt-12 overflow-hidden rounded-md border border-line ${compact ? "h-[320px]" : "h-[360px] lg:h-[420px]"}`}>
          <iframe
            title="Google map of Enid, Oklahoma"
            src="https://maps.google.com/maps?q=Enid,%20OK&z=9&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)_contrast(0.9)]"
          />
        </div>
      </div>
    </section>
  );
}
