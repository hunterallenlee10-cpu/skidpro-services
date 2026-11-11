"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { services, type ServiceId } from "@/lib/business";
import { serviceIcons } from "@/lib/serviceIcons";

export const PROPERTY_TYPES = ["Residential", "Commercial", "Agricultural", "Contractor job"] as const;
export const SIZES = ["Small (under 1 acre)", "Medium (1 to 5 acres)", "Big (5 to 10 acres)", "Large (10+ acres)"] as const;
export const TIMING = ["ASAP", "Within 2 weeks", "This month", "Just planning"] as const;

export type QuoteData = {
  services: ServiceId[];
  property: string;
  size: number;
  driveway: string;
  timing: string;
  town: string;
  name: string;
  phone: string;
  notes: string;
};

export const inputClass =
  "min-h-12 w-full rounded-sm border border-line bg-bg px-4 text-base text-text placeholder:text-muted/70 focus:border-accent focus:outline-none aria-[invalid=true]:border-red-400";

export function StepTitle({ id, children, hint }: { id: string; children: ReactNode; hint?: string }) {
  return (
    <div className="mb-6">
      <h3 id={id} className="font-display text-[34px] font-black leading-none sm:text-[40px]" tabIndex={-1}>
        {children}
      </h3>
      {hint && <p className="mt-2 text-[15px] text-muted">{hint}</p>}
    </div>
  );
}

export function ErrorText({ id, children }: { id: string; children?: string }) {
  return (
    <p id={id} role="alert" className="mt-3 min-h-5 text-sm font-medium text-red-300">
      {children}
    </p>
  );
}

/** A big tappable option. Checkbox or radio semantics come from the native input. */
function Choice({
  type,
  name,
  checked,
  onChange,
  children,
}: {
  type: "checkbox" | "radio";
  name: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label
      className={`relative flex min-h-14 cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-[15px] font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
        checked ? "border-accent bg-accent/12 text-text" : "border-line bg-bg text-text/85 hover:border-text/30"
      }`}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      {children}
      <span
        aria-hidden
        className={`ml-auto grid size-5 shrink-0 place-items-center rounded-[3px] border ${
          checked ? "border-accent bg-accent text-bg" : "border-text/30"
        }`}
      >
        {checked && <Check className="size-3.5" strokeWidth={3} />}
      </span>
    </label>
  );
}

type StepProps = { data: QuoteData; set: (patch: Partial<QuoteData>) => void; error?: string; titleId: string };

export function StepServices({ data, set, error, titleId }: StepProps) {
  const toggle = (id: ServiceId) =>
    set({ services: data.services.includes(id) ? data.services.filter((s) => s !== id) : [...data.services, id] });
  return (
    <fieldset aria-labelledby={titleId} aria-describedby="err-services">
      <StepTitle id={titleId} hint="Pick everything that applies.">What do you need?</StepTitle>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {services.map((s) => {
          const Icon = serviceIcons[s.id];
          return (
            <Choice key={s.id} type="checkbox" name="services" checked={data.services.includes(s.id)} onChange={() => toggle(s.id)}>
              <Icon aria-hidden className="size-5 shrink-0 text-accent" strokeWidth={1.75} />
              {s.title}
            </Choice>
          );
        })}
      </div>
      <ErrorText id="err-services">{error}</ErrorText>
    </fieldset>
  );
}

export function StepProperty({ data, set, error, titleId }: StepProps) {
  return (
    <fieldset aria-labelledby={titleId} aria-describedby="err-property">
      <StepTitle id={titleId}>What kind of property?</StepTitle>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {PROPERTY_TYPES.map((p) => (
          <Choice key={p} type="radio" name="property" checked={data.property === p} onChange={() => set({ property: p })}>
            {p}
          </Choice>
        ))}
      </div>
      <ErrorText id="err-property">{error}</ErrorText>
    </fieldset>
  );
}

export function StepSize({ data, set, titleId }: StepProps) {
  const gravel = data.services.includes("gravel-driveways");
  return (
    <div>
      <StepTitle id={titleId} hint="A rough guess is fine. Adam will see it in person.">How big is the job?</StepTitle>
      <div className="rounded-sm border border-line bg-bg p-5">
        <p className="font-display text-[30px] font-black leading-none text-accent" aria-hidden>
          {SIZES[data.size]}
        </p>
        <label htmlFor="size" className="sr-only">
          Job size
        </label>
        <input
          id="size"
          type="range"
          min={0}
          max={SIZES.length - 1}
          step={1}
          value={data.size}
          aria-valuetext={SIZES[data.size]}
          onChange={(e) => set({ size: Number(e.target.value) })}
          className="mt-6 h-11 w-full cursor-pointer accent-[#F47B20]"
        />
        <div className="mt-1 flex justify-between text-xs font-medium text-muted" aria-hidden>
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>
      {gravel && (
        <div className="mt-6">
          <label htmlFor="driveway" className="text-[15px] font-semibold">
            Driveway length, roughly <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="driveway"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 300 feet"
            value={data.driveway}
            onChange={(e) => set({ driveway: e.target.value })}
            className={`${inputClass} mt-2`}
          />
        </div>
      )}
    </div>
  );
}

export function StepTiming({ data, set, error, titleId }: StepProps) {
  return (
    <div>
      <fieldset aria-labelledby={titleId} aria-describedby="err-timing">
        <StepTitle id={titleId}>When do you need it?</StepTitle>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {TIMING.map((t) => (
            <Choice key={t} type="radio" name="timing" checked={data.timing === t} onChange={() => set({ timing: t })}>
              {t}
            </Choice>
          ))}
        </div>
        <ErrorText id="err-timing">{error}</ErrorText>
      </fieldset>
      <label htmlFor="town" className="mt-2 block text-[15px] font-semibold">
        Town <span className="font-normal text-muted">(optional)</span>
      </label>
      <input
        id="town"
        type="text"
        autoComplete="address-level2"
        placeholder="e.g. Enid"
        value={data.town}
        onChange={(e) => set({ town: e.target.value })}
        className={`${inputClass} mt-2`}
      />
    </div>
  );
}

export function StepInfo({
  data,
  set,
  errors,
  titleId,
}: Omit<StepProps, "error"> & { errors: { name?: string; phone?: string } }) {
  return (
    <div className="grid gap-5">
      <StepTitle id={titleId} hint="Adam uses this to call or text you back. Nothing else.">Your info</StepTitle>
      <div>
        <label htmlFor="q-name" className="text-[15px] font-semibold">
          Name
        </label>
        <input
          id="q-name"
          type="text"
          autoComplete="name"
          value={data.name}
          aria-invalid={!!errors.name}
          aria-describedby="err-name"
          onChange={(e) => set({ name: e.target.value })}
          className={`${inputClass} mt-2`}
        />
        <ErrorText id="err-name">{errors.name}</ErrorText>
      </div>
      <div className="-mt-3">
        <label htmlFor="q-phone" className="text-[15px] font-semibold">
          Phone
        </label>
        <input
          id="q-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(580) 555-0123"
          value={data.phone}
          aria-invalid={!!errors.phone}
          aria-describedby="err-phone"
          onChange={(e) => set({ phone: formatPhone(e.target.value) })}
          className={`${inputClass} mt-2`}
        />
        <ErrorText id="err-phone">{errors.phone}</ErrorText>
      </div>
      <div className="-mt-3">
        <label htmlFor="q-notes" className="text-[15px] font-semibold">
          Anything else? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="q-notes"
          rows={3}
          value={data.notes}
          onChange={(e) => set({ notes: e.target.value })}
          className={`${inputClass} mt-2 py-3`}
        />
      </div>
    </div>
  );
}

export const phoneDigits = (v: string) => v.replace(/\D/g, "").replace(/^1(?=\d{10})/, "");

export function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
