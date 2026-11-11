"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { ServiceId } from "@/lib/business";
import QuotePlanner from "./QuotePlanner";

type Props = { open: boolean; preset?: ServiceId; onClose: () => void };

const FOCUSABLE =
  'a[href], button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

/** Quote Planner dialog: Esc to close, focus trap, body scroll lock, focus return. */
export default function QuoteModal({ open, preset, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement as HTMLElement;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;

    // Focus the first control.
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("input, button")?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !panel.current.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      document.body.style.paddingRight = "";
      returnTo.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div aria-hidden className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="grain relative flex max-h-[100dvh] w-full flex-col overflow-hidden border-line bg-surface shadow-2xl sm:max-h-[92dvh] sm:max-w-[680px] sm:rounded-md sm:border"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <h2 id="quote-title" className="font-display text-2xl font-black">
            Free quote <span className="text-accent">planner</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote planner"
            className="grid size-11 place-items-center rounded-sm border border-line hover:border-accent hover:text-accent"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
          <QuotePlanner preset={preset} headingId="quote-planner" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
