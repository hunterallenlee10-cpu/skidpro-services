import { Phone } from "lucide-react";
import { business } from "@/lib/business";

export default function CallButton({ className = "", label }: { className?: string; label?: string }) {
  return (
    <a href={business.tel} className={`btn btn-ghost ${className}`}>
      <Phone aria-hidden className="size-[18px]" strokeWidth={2} />
      {label ?? `Call ${business.phoneDisplay}`}
    </a>
  );
}
