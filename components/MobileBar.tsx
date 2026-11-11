"use client";

import { FileText, MessageSquare, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { useQuote } from "./QuotePlanner/QuoteContext";

/** Mobile only: always-visible Call / Text / Free Quote bar. */
export default function MobileBar() {
  const { openQuote } = useQuote();
  const item = "flex min-h-[60px] flex-1 flex-col items-center justify-center gap-1 text-[13px] font-semibold";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <a href={business.tel} className={item}>
        <Phone aria-hidden className="size-5 text-accent" /> Call
      </a>
      <a href={business.sms} className={`${item} border-x border-line`}>
        <MessageSquare aria-hidden className="size-5 text-accent" /> Text
      </a>
      <button type="button" onClick={() => openQuote()} className={`${item} bg-accent text-bg`} aria-haspopup="dialog">
        <FileText aria-hidden className="size-5" /> Free Quote
      </button>
    </nav>
  );
}
