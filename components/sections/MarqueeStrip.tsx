"use client";

import ScrollMarquee from "@/components/ui/ScrollMarquee";
import { MARQUEE_WORDS } from "@/lib/data";

function Star() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 md:h-8 md:w-8"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 0l2.4 8.1L22 6l-5.6 6L22 18l-7.6-2.1L12 24l-2.4-8.1L2 18l5.6-6L2 6l7.6 2.1L12 0z" />
    </svg>
  );
}

export default function MarqueeStrip() {
  return (
    <section className="relative border-y-2 border-line bg-accent py-4 text-accent-fg md:py-6">
      <ScrollMarquee
        baseVelocity={6}
        separator={<Star />}
        separatorClassName="text-accent-fg/70"
      >
        <span className="display flex items-center gap-[0.3em] text-4xl uppercase md:text-6xl">
          {MARQUEE_WORDS.map((word, i) => (
            <span key={i} className="flex items-center gap-[0.3em]">
              {word}
              {i < MARQUEE_WORDS.length - 1 && (
                <span className="opacity-50">/</span>
              )}
            </span>
          ))}
        </span>
      </ScrollMarquee>
    </section>
  );
}
