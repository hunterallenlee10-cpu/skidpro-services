import Image from "next/image";
import { business } from "@/lib/business";
import { photos } from "@/lib/images";
import PhotoPlaceholder from "../PhotoPlaceholder";
import SectionHeading from "../SectionHeading";

// DRAFT: confirm with Adam which attachments run on which machine. Listed on both for now.
const machines = [
  { name: "Deere 333G", type: "Compact track loader", photo: null },
  // Photo 08 is used here because its file name confirms a 329E. Photo 09's model is not confirmed.
  { name: "Deere 329E", type: "Compact track loader", photo: photos.treeRingwood },
] as const;

export default function Fleet() {
  return (
    <section id="fleet" aria-labelledby="fleet-title" className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeading id="fleet-title" eyebrow="The fleet" title={<>The machines <br className="hidden sm:block" />that show up.</>}>
          Tracked machines mean less rutting on your property.
        </SectionHeading>

        <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:max-w-[1044px] md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {machines.map((m) => (
            <li key={m.name} className="card w-[86%] shrink-0 snap-start overflow-hidden md:w-auto">
              {m.photo ? (
                <Image
                  src={m.photo.src}
                  alt={m.photo.alt}
                  width={m.photo.width}
                  height={m.photo.height}
                  sizes="(min-width: 768px) 510px, 86vw"
                  className="aspect-[510/370] w-full object-cover"
                />
              ) : (
                <PhotoPlaceholder label={`Photo: Adam's ${m.name}, from Adam`} className="aspect-[510/370] w-full" />
              )}
              <div className="border-t border-line p-6 lg:p-8">
                <p className="eyebrow">{m.type}</p>
                <h3 className="font-display mt-2 text-[44px] font-black leading-none lg:text-[56px]">{m.name}</h3>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Attachments</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {business.attachments.map((a) => (
                    <li key={a} className="rounded-sm border border-line bg-bg px-3 py-1.5 text-sm font-medium text-text/85">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
