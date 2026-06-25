"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroScene from "@/components/three/HeroScene";
import { SITE } from "@/lib/data";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yName = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden"
    >
      {/* רקע תלת־ממדי */}
      <motion.div style={{ scale: sceneScale }} className="absolute inset-0">
        <HeroScene />
      </motion.div>

      {/* שכבת קריאות */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-bg)_85%)]" />

      {/* תוכן */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pb-12"
      >
        {/* שורת מטא עליונה */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="label text-fg">{SITE.available}</span>
          </div>
          <p className="label max-w-xs text-muted-fg">{SITE.roleLatin}</p>
        </div>

        {/* שם ענק */}
        <motion.div style={{ y: yName }} className="flex flex-col">
          <div className="overflow-hidden">
            <motion.h1
              className="display text-[24vw] leading-[0.85] text-fg md:text-[20vw]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {SITE.name}
            </motion.h1>
          </div>

          <div className="mt-2 flex flex-col gap-4 border-t-2 border-line pt-4 md:flex-row md:items-end md:justify-between">
            <motion.p
              className="max-w-md text-lg font-medium leading-snug text-muted-fg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {SITE.tagline}
            </motion.p>
            <motion.span
              className="display text-2xl text-accent-ink md:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {SITE.role}
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* אינדיקטור גלילה */}
      <motion.a
        href="#works"
        aria-label="גלול לעבודות"
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="label text-muted-fg">גלול</span>
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-line p-1">
          <motion.span
            className="h-2 w-1 rounded-full bg-accent"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
