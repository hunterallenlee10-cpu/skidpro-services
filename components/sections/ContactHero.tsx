import { Mail, MessageSquare, Phone } from "lucide-react";
import { business } from "@/lib/business";

const tiles = [
  { icon: Phone, label: "Call", value: business.phoneDisplay, href: business.tel, note: "Adam picks up." },
  { icon: MessageSquare, label: "Text", value: business.phoneDisplay, href: business.sms, note: "Send a photo of the job." },
  { icon: Mail, label: "Email", value: business.email, href: `mailto:${business.email}`, note: "For plans and paperwork." },
];

export default function ContactHero() {
  return (
    <section aria-labelledby="contact-title" className="grain topo border-b border-line pb-16 pt-[132px] lg:pb-24 lg:pt-[168px]">
      <div className="container-x">
        <p className="eyebrow mb-4">
          {business.city}, {business.state} <span aria-hidden>·</span> {business.region}
        </p>
        <h1 id="contact-title" className="font-display text-[clamp(64px,10vw,140px)] font-black leading-[0.85]">
          Talk to <span className="text-accent">Adam.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-text/80">
          Call, text or send a quote request below. Every job starts with a free estimate.
        </p>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {tiles.map((t) => (
            <li key={t.label}>
              <a
                href={t.href}
                className="card group flex h-full flex-col p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/50 lg:p-8"
              >
                <t.icon aria-hidden className="size-7 text-accent" strokeWidth={1.75} />
                <span className="font-display mt-6 text-[40px] font-black leading-none">{t.label}</span>
                <span className="mt-2 break-all font-semibold group-hover:text-accent">{t.value}</span>
                <span className="mt-1 text-sm text-muted">{t.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
