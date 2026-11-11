"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { ServiceId } from "@/lib/business";
import { useQuote } from "./QuotePlanner/QuoteContext";

type Props = {
  service?: ServiceId;
  className?: string;
  children?: ReactNode;
  arrow?: boolean;
};

/** The one CTA on the site. Opens the Quote Planner, optionally with a service picked. */
export default function QuoteButton({ service, className = "", children, arrow = true }: Props) {
  const { openQuote } = useQuote();
  return (
    <button
      type="button"
      onClick={() => openQuote(service)}
      className={`btn btn-primary ${className}`}
      aria-haspopup="dialog"
    >
      {children ?? "Get a Free Quote"}
      {arrow && <ArrowRight aria-hidden className="size-[18px]" strokeWidth={2.25} />}
    </button>
  );
}
