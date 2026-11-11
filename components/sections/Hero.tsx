"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Snowflake } from "lucide-react";
import { photos } from "@/lib/images";
import QuoteButton from "../QuoteButton";
import CallButton from "../CallButton";

const words = ["land.", "driveways.", "building pads.", "cedar.", "snow."];
const facts = ["Free estimates", "Licensed & insured", "Locally owned"];

export default function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative flex min-h-[max(100svh,680px)] flex-col overflow-hidden"
    >
      {/* Background photo with a slow push-in */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20 will-change-transform"
        initial={{ scale: 1 }}
        animate={reduce ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: 20, ease: "easeOut" }}
      >
        {/* TODO: swap for a real drone shot of Adam's machine */}
        <Image
          src={photos.hero.src}
          alt={photos.hero.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-[68%_50%]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/55 to-bg/10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-bg/90 via-bg/50 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-bg/80 to-transparent" />

      <div className="container-x relative flex flex-1 flex-col pt-[92px]">
        {/* Timely: snow contracts */}
        <a
          href="#snow"
          className="group inline-flex items-center gap-2.5 self-start rounded-full border border-text/20 bg-bg/60 py-2 pl-3 pr-4 text-sm font-medium backdrop-blur-sm transition-colors hover:border-accent sm:self-end"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <Snowflake aria-hidden className="size-4 text-text/80" />
          Now booking snow contracts
        </a>

        <div className="flex flex-1 flex-col justify-end pb-10 pt-8 lg:pb-14">
          <p className="eyebrow mb-5">
            Enid, OK <span aria-hidden>·</span> Serving Northwest Oklahoma since 2025
          </p>
          <h1
            id="hero-title"
            className="font-display text-[clamp(60px,9.4vw,136px)] font-black leading-[0.86] tracking-[-0.015em]"
          >
            Power built <br className="hidden sm:block" />
            for tough jobs<span className="text-accent">.</span>
          </h1>

          <p className="font-display mt-5 text-[clamp(30px,4vw,54px)] font-extrabold leading-[1.15]" aria-live="off">
            We clear{" "}
            <span className="relative inline-grid align-baseline">
              <span className="sr-only">land, driveways, building pads, cedar and snow.</span>
              <AnimatePresence initial={false}>
                <motion.span
                  key={words[i]}
                  aria-hidden
                  className="col-start-1 row-start-1 whitespace-nowrap pb-[0.08em] text-accent"
                  initial={{ opacity: 0, y: reduce ? 0 : "0.35em" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : "-0.35em" }}
                  transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {words[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>

          <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed text-text/85 sm:text-lg">
            Skid steer work from one local operator who answers his phone. Residential, commercial and
            agricultural.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton className="!min-h-14 px-7 text-[17px]" />
            <CallButton className="!min-h-14 px-6 text-[17px]" />
          </div>
        </div>
      </div>

      {/* Quick facts strip */}
      <div className="relative border-t border-line bg-bg/75 backdrop-blur-sm">
        <div aria-hidden className="hazard absolute inset-x-0 -top-px h-[3px] opacity-80" />
        <ul className="container-x grid grid-cols-3 divide-x divide-line">
          {facts.map((f) => (
            <li
              key={f}
              className="font-display flex min-h-[64px] items-center justify-center px-2 text-center text-[17px] font-extrabold leading-tight tracking-wide sm:min-h-[76px] sm:text-2xl lg:text-[28px]"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
