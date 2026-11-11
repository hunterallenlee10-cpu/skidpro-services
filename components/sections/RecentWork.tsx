import Image from "next/image";
import { MapPin } from "lucide-react";
import { photos, type Photo } from "@/lib/images";
import SectionHeading from "../SectionHeading";

type Job = { title: string; place?: string; photo: Photo; position: string; problem: string; done: string };

// Facts only from the photos and file names. No acreage, dates or quotes.
const jobs: Job[] = [
  {
    title: "Invasive tree removal",
    place: "Ringwood, OK",
    photo: photos.treeRingwood,
    position: "object-[40%_50%]",
    problem: "Invasive trees taking over open ground.",
    done: "Pulled out roots and all with the 329E grapple.",
  },
  {
    title: "Pasture brush clearing",
    photo: photos.brushAfter,
    position: "object-[50%_70%]",
    problem: "Pasture lost to tall clumps of brush.",
    done: "Cut back flat with the brush cutter.",
  },
  {
    title: "Ranch driveway rebuilt with gravel and a cattle guard",
    photo: photos.drivewayAfter,
    position: "object-[50%_45%]",
    problem: "Rutted dirt drive into the ranch.",
    done: "Rebuilt in white gravel with a new cattle guard.",
  },
];

export default function RecentWork() {
  return (
    <section aria-labelledby="work-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="work-title" eyebrow="Recent work" title={<>Real jobs. <span className="text-accent">Real dirt.</span></>} />

        <ul className="mx-auto mt-12 grid max-w-[1100px] gap-6 md:grid-cols-3 lg:gap-8">
          {jobs.map((j) => (
            <li key={j.title} className="card group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={j.photo.src}
                  alt={j.photo.alt}
                  width={j.photo.width}
                  height={j.photo.height}
                  sizes="(min-width: 768px) 345px, 100vw"
                  className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${j.position}`}
                />
                {j.place && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-bg/85 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
                    <MapPin aria-hidden className="size-3.5 text-accent" /> {j.place}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-[26px] font-extrabold leading-none">{j.title}</h3>
                <dl className="mt-4 grid gap-2 text-[15px] leading-snug">
                  <div className="flex gap-3">
                    <dt className="w-[52px] shrink-0 pt-[3px] text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Before</dt>
                    <dd className="text-text/85">{j.problem}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-[52px] shrink-0 pt-[3px] text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Done</dt>
                    <dd className="text-text/85">{j.done}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
