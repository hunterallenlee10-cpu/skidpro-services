"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CircleCheck, MessageSquare, Phone } from "lucide-react";
import { business, serviceById, type ServiceId } from "@/lib/business";
import {
  SIZES,
  StepInfo,
  StepProperty,
  StepServices,
  StepSize,
  StepTiming,
  phoneDigits,
  type QuoteData,
} from "./steps";

const TOTAL = 5;

type Props = {
  preset?: ServiceId;
  /** Inline on /contact instead of in the modal. */
  inline?: boolean;
  /** Id of the element that labels the surrounding dialog. */
  headingId?: string;
};

function summary(d: QuoteData) {
  const lines = [
    `Quote request from ${d.name.trim()}`,
    `Services: ${d.services.map((s) => serviceById(s).title).join(", ")}`,
    `Property: ${d.property}`,
    `Size: ${SIZES[d.size]}${d.driveway ? `, driveway about ${d.driveway}` : ""}`,
    `When: ${d.timing}${d.town ? `, in ${d.town}` : ""}`,
    d.notes ? `Notes: ${d.notes}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

export default function QuotePlanner({ preset, inline = false, headingId = "quote-title" }: Props) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<QuoteData>({
    services: preset ? [preset] : [],
    property: preset === "contract-work" ? "Contractor job" : "",
    size: 0,
    driveway: "",
    timing: "",
    town: "",
    name: "",
    phone: "",
    notes: "",
  });
  const bodyRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const set = (patch: Partial<QuoteData>) => {
    setData((d) => ({ ...d, ...patch }));
    setErrors({});
  };

  // Move focus to the new step's heading so screen readers hear it.
  useEffect(() => {
    if (!moved.current) return;
    bodyRef.current?.querySelector<HTMLElement>("h3[tabindex='-1']")?.focus({ preventScroll: true });
  }, [step, done]);

  const validate = (): Record<string, string> => {
    if (step === 0 && data.services.length === 0) return { services: "Pick at least one service so Adam knows what to look at." };
    if (step === 1 && !data.property) return { property: "Pick the one that fits best." };
    if (step === 3 && !data.timing) return { timing: "Pick a rough timeline. \"Just planning\" is fine." };
    if (step === 4) {
      const e: Record<string, string> = {};
      if (!data.name.trim()) e.name = "Add your name so Adam knows who he's calling.";
      const digits = phoneDigits(data.phone);
      if (!digits) e.phone = "Add a phone number so Adam can call or text you back.";
      else if (digits.length !== 10) e.phone = "That number looks short. Use all 10 digits, like (580) 555-0123.";
      return e;
    }
    return {};
  };

  const go = (delta: 1 | -1) => {
    moved.current = true;
    setDir(delta);
    setErrors({});
    setStep((s) => Math.min(TOTAL - 1, Math.max(0, s + delta)));
    if (inline) bodyRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      const first = Object.keys(found)[0];
      const field = first === "name" ? "q-name" : first === "phone" ? "q-phone" : null;
      if (field) document.getElementById(field)?.focus();
      return;
    }
    if (step < TOTAL - 1) return go(1);
    // Front-end only for the concept. TODO: send to Adam by email or SMS (form service or API route).
    moved.current = true;
    setDone(true);
  };

  if (done) {
    const first = data.name.trim().split(/\s+/)[0];
    const smsHref = `${business.sms}?&body=${encodeURIComponent(summary(data))}`;
    return (
      <div ref={bodyRef} className="animate-step-in py-6 text-center" role="status">
        <CircleCheck aria-hidden className="mx-auto size-16 text-accent" strokeWidth={1.5} />
        {/* DRAFT: confirm response time with Adam */}
        <h3 id={headingId} tabIndex={-1} className="font-display mx-auto mt-6 max-w-[18ch] text-[40px] font-black leading-[0.95] outline-none">
          Thanks {first}. Adam will reach out within one business day.
        </h3>
        <p className="mx-auto mt-4 max-w-sm text-muted">Want it sooner? Call or text him now.</p>
        <div className="mx-auto mt-8 grid max-w-md gap-3 sm:grid-cols-2">
          <a href={business.tel} className="btn btn-primary !min-h-14 text-[17px]">
            <Phone aria-hidden className="size-5" /> Call now
          </a>
          <a href={smsHref} className="btn btn-ghost !min-h-14 text-[17px]">
            <MessageSquare aria-hidden className="size-5" /> Text now
          </a>
        </div>
        <p className="mt-4 text-xs text-muted">&ldquo;Text now&rdquo; opens your messages with your request filled in.</p>
      </div>
    );
  }

  const titleId = `${headingId}-step`;
  const stepProps = { data, set, titleId };

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby={titleId}>
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <p className="font-semibold" aria-live="polite">
            Step {step + 1} of {TOTAL}
          </p>
          <p className="text-muted">Free estimate. No obligation.</p>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line" aria-hidden>
          <div className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out" style={{ width: `${((step + 1) / TOTAL) * 100}%` }} />
        </div>
      </div>

      <div ref={bodyRef} key={step} className={dir === 1 ? "animate-step-in" : "animate-step-back"}>
        {step === 0 && <StepServices {...stepProps} error={errors.services} />}
        {step === 1 && <StepProperty {...stepProps} error={errors.property} />}
        {step === 2 && <StepSize {...stepProps} />}
        {step === 3 && <StepTiming {...stepProps} error={errors.timing} />}
        {step === 4 && <StepInfo {...stepProps} errors={errors} />}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={step === 0}
          className="btn btn-ghost disabled:pointer-events-none disabled:opacity-0"
          aria-hidden={step === 0}
          tabIndex={step === 0 ? -1 : 0}
        >
          <ArrowLeft aria-hidden className="size-[18px]" /> Back
        </button>
        <button type="submit" className="btn btn-primary min-w-[160px]">
          {step === TOTAL - 1 ? "Send my request" : "Next"}
          <ArrowRight aria-hidden className="size-[18px]" />
        </button>
      </div>
    </form>
  );
}
