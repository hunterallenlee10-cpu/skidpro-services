import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  children?: ReactNode;
  className?: string;
};

export default function SectionHeading({ eyebrow, title, id, children, className = "" }: Props) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 id={id} className="font-display text-[clamp(44px,6vw,80px)] font-black leading-[0.9]">
        {title}
      </h2>
      {children && <div className="mt-5 text-lg leading-relaxed text-muted">{children}</div>}
    </div>
  );
}
