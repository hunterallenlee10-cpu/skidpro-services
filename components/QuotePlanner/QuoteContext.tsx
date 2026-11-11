"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { ServiceId } from "@/lib/business";

const QuoteModal = dynamic(() => import("./QuoteModal"), { ssr: false });

type QuoteContextValue = {
  openQuote: (service?: ServiceId) => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<ServiceId | undefined>();
  // Bumped on each open so the form starts fresh with the right preset.
  const [session, setSession] = useState(0);

  const openQuote = useCallback((service?: ServiceId) => {
    setPreset(service);
    setSession((s) => s + 1);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <QuoteContext.Provider value={{ openQuote }}>
      {children}
      {session > 0 && (
        <QuoteModal key={session} open={open} preset={preset} onClose={close} />
      )}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside QuoteProvider");
  return ctx;
}
