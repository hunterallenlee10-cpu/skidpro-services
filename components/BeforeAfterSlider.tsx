"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import { GripVertical } from "lucide-react";
import type { Photo } from "@/lib/images";

type Props = { before: Photo; after: Photo; label: string };

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/** Drag, touch and keyboard before/after slider. Sweeps once when it scrolls into view. */
export default function BeforeAfterSlider({ before, after, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const pos = useMotionValue(50);
  const [value, setValue] = useState(50);
  const [dragging, setDragging] = useState(false);
  const sweep = useRef<AnimationPlaybackControls | null>(null);
  const touched = useRef(false);

  useMotionValueEvent(pos, "change", (v) => setValue(Math.round(v)));
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);

  // Auto-sweep once, then hand control to the user.
  useEffect(() => {
    if (!inView || reduce || touched.current) return;
    const t = setTimeout(() => {
      sweep.current = animate(pos, [50, 84, 16, 50], { duration: 2.8, ease: "easeInOut", times: [0, 0.35, 0.75, 1] });
    }, 250);
    return () => {
      clearTimeout(t);
      sweep.current?.stop();
    };
  }, [inView, reduce, pos]);

  const takeOver = () => {
    touched.current = true;
    sweep.current?.stop();
  };

  const setFromClientX = (x: number) => {
    const r = ref.current!.getBoundingClientRect();
    pos.set(clamp(((x - r.left) / r.width) * 100));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    takeOver();
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) setFromClientX(e.clientX);
  };
  const onPointerUp = () => setDragging(false);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowLeft: -5, ArrowRight: 5, PageDown: -20, PageUp: 20 };
    let next: number | null = null;
    if (e.key in steps) next = pos.get() + steps[e.key];
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    takeOver();
    pos.set(clamp(next));
  };

  return (
    <div
      ref={ref}
      className={`relative w-full select-none overflow-hidden rounded-md border border-line bg-surface ${
        dragging ? "cursor-grabbing" : "cursor-ew-resize"
      }`}
      style={{ maxWidth: after.width, aspectRatio: `${after.width} / ${after.height}`, touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <Image
        src={after.src}
        alt={after.alt}
        width={after.width}
        height={after.height}
        sizes={`${after.width}px`}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <Image
          src={before.src}
          alt={before.alt}
          width={before.width}
          height={before.height}
          sizes={`${before.width}px`}
          draggable={false}
          className="pointer-events-none h-full w-full object-cover"
        />
      </motion.div>

      <span className="font-display pointer-events-none absolute left-3 top-3 rounded-sm bg-bg/80 px-2.5 py-1 text-lg font-extrabold tracking-wider backdrop-blur-sm">
        Before
      </span>
      <span className="font-display pointer-events-none absolute right-3 top-3 rounded-sm bg-accent px-2.5 py-1 text-lg font-extrabold tracking-wider text-bg">
        After
      </span>

      {/* Divider and handle */}
      <motion.div className="absolute inset-y-0 w-0" style={{ left }}>
        <div aria-hidden className="absolute inset-y-0 -left-px w-[2px] bg-accent shadow-[0_0_12px_rgba(0,0,0,0.6)]" />
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${label}: drag to compare before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={`${value}% before photo showing`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 left-0 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-bg bg-accent text-bg shadow-lg transition-transform hover:scale-110"
        >
          <GripVertical aria-hidden className="size-5" strokeWidth={2.5} />
        </div>
      </motion.div>
    </div>
  );
}
