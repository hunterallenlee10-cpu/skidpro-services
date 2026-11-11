import Image from "next/image";
import { photos } from "@/lib/images";

/** Wide banner photo between sections. Never wider than its native 1237px. */
export default function CinematicStrip() {
  const p = photos.padWide;
  return (
    <section aria-label="Building pad prep" className="relative overflow-hidden border-b border-line bg-bg">
      <div className="relative mx-auto" style={{ maxWidth: p.width }}>
        <Image
          src={p.src}
          alt={p.alt}
          width={p.width}
          height={p.height}
          sizes={`(max-width: ${p.width}px) 100vw, ${p.width}px`}
          className="h-[240px] w-full object-cover object-[30%_50%] sm:h-auto [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <p className="font-display max-w-[19ch] px-6 text-[clamp(30px,4vw,56px)] font-black leading-[0.95] sm:px-12">
            From raw ground to a pad you can <span className="text-accent">build on.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
