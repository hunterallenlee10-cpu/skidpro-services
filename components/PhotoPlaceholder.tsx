import { Camera } from "lucide-react";

/** Labelled stand-in where a real photo from Adam is still needed. */
export default function PhotoPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder. ${label}`}
      className={`topo flex flex-col items-center justify-center gap-3 overflow-hidden border border-dashed border-muted/30 bg-surface p-6 text-center ${className}`}
    >
      <Camera aria-hidden className="size-8 text-muted/70" strokeWidth={1.5} />
      <p className="max-w-[22ch] text-sm font-medium text-muted">{label}</p>
    </div>
  );
}
