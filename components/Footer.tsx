import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageSquare, Phone } from "lucide-react";
import { business, services } from "@/lib/business";
import { photos } from "@/lib/images";

export default function Footer() {
  return (
    <footer className="grain topo border-t border-line bg-bg pb-28 pt-16 md:pb-10 lg:pt-24">
      <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-4" aria-label={`${business.brand} home`}>
            <Image src={photos.logo.src} alt={photos.logo.alt} width={96} height={81} className="h-20 w-auto" />
          </Link>
          <p className="font-display mt-6 text-3xl font-extrabold leading-none">{business.tagline}.</p>
          <p className="mt-3 max-w-xs text-muted">{business.lines.bigEnough}</p>

          <a
            href={business.tel}
            className="font-display mt-8 block text-[44px] font-black leading-none text-accent hover:text-accent-hover sm:text-[56px]"
          >
            {business.phoneDisplay}
          </a>
          <p className="mt-2 text-sm text-muted">Call or text. Adam answers.</p>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Services</h2>
          <ul className="grid gap-2.5 text-[15px] text-text/85">
            {services.map((s) => (
              <li key={s.id}>
                <Link href="/#services" className="hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Get in touch</h2>
          <ul className="grid gap-1 text-[15px]">
            <li>
              <a href={business.tel} className="flex min-h-11 items-center gap-3 hover:text-accent">
                <Phone aria-hidden className="size-4 text-accent" /> Call {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={business.sms} className="flex min-h-11 items-center gap-3 hover:text-accent">
                <MessageSquare aria-hidden className="size-4 text-accent" /> Text {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex min-h-11 items-center gap-3 break-all hover:text-accent">
                <Mail aria-hidden className="size-4 shrink-0 text-accent" /> {business.email}
              </a>
            </li>
            <li>
              <a
                href={business.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 hover:text-accent"
              >
                <ArrowUpRight aria-hidden className="size-4 text-accent" /> Facebook
              </a>
            </li>
            <li>
              <Link href="/contact" className="flex min-h-11 items-center gap-3 hover:text-accent">
                <ArrowUpRight aria-hidden className="size-4 text-accent" /> Contact
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-[15px] text-muted">
            {business.city}, {business.stateLong} <span aria-hidden>·</span> Serving {business.region}
          </p>
        </div>
      </div>

      <div className="container-x mt-16 border-t border-line pt-6 text-sm text-muted">
        <p>© 2026 {business.name}</p>
        <p className="mt-1 text-xs text-muted/80">Concept preview by Lee Enterprises Unlimited.</p>
      </div>
    </footer>
  );
}
