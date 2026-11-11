"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X, MessageSquare } from "lucide-react";
import { business } from "@/lib/business";
import { photos } from "@/lib/images";
import QuoteButton from "./QuoteButton";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#our-work", label: "Our Work" },
  { href: "/#fleet", label: "Fleet" },
  { href: "/#snow", label: "Snow" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll and close on Esc while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-x flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${business.brand} home`}>
          <Image src={photos.logo.src} alt="" width={52} height={44} className="h-11 w-auto" preload />
          <span className="font-display text-[22px] font-extrabold leading-none tracking-wide">
            SkidPro<span className="sr-only"> Services</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex min-h-11 items-center text-[15px] font-medium text-text/80 transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={business.tel}
            className="hidden min-h-11 items-center gap-2 text-[15px] font-semibold md:flex hover:text-accent"
          >
            <Phone aria-hidden className="size-4 text-accent" />
            {business.phoneDisplay}
          </a>
          <QuoteButton className="hidden !min-h-11 !px-4 text-[15px] sm:inline-flex" arrow={false} />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-sm border border-line lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

    </header>
      {/* Outside the header: its backdrop blur would trap a fixed child. */}
      {open && (
        <div
          id="mobile-menu"
          className="grain fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto bg-bg lg:hidden"
        >
          <div className="container-x flex min-h-full flex-col py-6">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href} className="border-b border-line">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display flex min-h-16 items-center text-4xl font-extrabold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="border-b border-line">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="font-display flex min-h-16 items-center text-4xl font-extrabold"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-auto grid gap-3 pt-8" onClick={() => setOpen(false)}>
              <QuoteButton className="w-full !min-h-14 text-lg" />
              <div className="grid grid-cols-2 gap-3">
                <a href={business.tel} className="btn btn-ghost !min-h-14">
                  <Phone aria-hidden className="size-5" /> Call
                </a>
                <a href={business.sms} className="btn btn-ghost !min-h-14">
                  <MessageSquare aria-hidden className="size-5" /> Text
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
