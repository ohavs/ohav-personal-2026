"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import { ABOUT_PARAGRAPHS, STATS } from "@/lib/data";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xMarker = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden border-t-2 border-line bg-bg py-20 md:py-32"
    >
      <div className="px-5 md:px-10">
        <Reveal>
          <span className="label text-accent">02 / עליי</span>
        </Reveal>

        {/* הצהרה ענקית */}
        <div className="mt-8 max-w-6xl">
          <h2 className="display text-[8vw] leading-[0.95] text-fg md:text-[5.5vw]">
            <RevealWords text="אני מעצב חוויות" />
            <br />
            <RevealWords
              text="שאי אפשר לשכוח."
              wordClassName="text-stroke-accent"
              delay={0.1}
            />
          </h2>
        </div>

        {/* טקסט + סטטיסטיקות */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-1">
            <div className="space-y-6 text-lg leading-relaxed text-muted-fg md:text-xl">
              {ABOUT_PARAGRAPHS.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={i === 0 ? "font-bold text-fg" : ""}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="grid grid-cols-2 gap-px border-2 border-line bg-line">
              {STATS.map((s, i) => (
                <Reveal key={i} delay={i * 0.06} className="bg-bg">
                  <div className="flex flex-col gap-1 p-5">
                    <span className="display text-4xl text-accent md:text-5xl">
                      {s.value}
                    </span>
                    <span className="label text-muted-fg">{s.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* מרקר טקסט ענק ברקע */}
      <motion.div
        style={{ x: xMarker }}
        aria-hidden="true"
        className="pointer-events-none mt-20 select-none whitespace-nowrap"
      >
        <span className="display text-[18vw] leading-none text-muted/60 text-stroke">
          DESIGN · BUILD · REPEAT · DESIGN · BUILD · REPEAT
        </span>
      </motion.div>
    </section>
  );
}
