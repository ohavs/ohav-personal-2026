"use client";

import Marquee from "@/components/ui/Marquee";
import { MARQUEE_WORDS } from "@/lib/data";

function Star() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mx-6 h-7 w-7 shrink-0 md:h-9 md:w-9"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 0l2.4 8.1L22 6l-5.6 6L22 18l-7.6-2.1L12 24l-2.4-8.1L2 18l5.6-6L2 6l7.6 2.1L12 0z" />
    </svg>
  );
}

export default function MarqueeStrip() {
  return (
    <section className="relative border-y-2 border-line bg-accent py-5 text-accent-fg md:py-6">
      <Marquee direction="rtl" duration={32} pauseOnHover={false}>
        {MARQUEE_WORDS.map((word, i) => (
          <span
            key={i}
            className="display flex items-center text-4xl uppercase md:text-6xl"
          >
            {word}
            <Star />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
