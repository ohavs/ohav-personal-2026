"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function ProjectCard({
  project,
  layout = "h",
}: {
  project: Project;
  layout?: "h" | "v";
}) {
  return (
    <article
      dir="rtl"
      className={`group relative shrink-0 overflow-hidden border-2 border-line bg-bg-soft ${
        layout === "h"
          ? "h-full w-[82vw] sm:w-[58vw] lg:w-[42vw] xl:w-[34vw]"
          : "w-full"
      }`}
    >
      {/* flood inversion overlay */}
      <span className="pointer-events-none absolute inset-0 z-0 translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />

      <div className="relative z-10 flex h-full flex-col">
        {/* top meta */}
        <div className="flex items-center justify-between border-b-2 border-line px-5 py-3 transition-colors duration-500 group-hover:border-accent-fg/30">
          <span className="display text-xl text-accent transition-colors duration-300 group-hover:text-accent-fg">
            {project.index}
          </span>
          <span className="label text-muted-fg transition-colors duration-300 group-hover:text-accent-fg">
            {project.category} · {project.year}
          </span>
        </div>

        {/* cover — כיסוי טיפוגרפי מעוצב (ללא תלות בנכסים חיצוניים) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden border-y-2 border-line bg-bg transition-colors duration-500 group-hover:border-accent-fg/20">
          {/* גוון הפרויקט */}
          <div
            className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-0"
            style={{
              background: `radial-gradient(120% 120% at 80% 0%, ${project.color} 0%, transparent 55%)`,
            }}
          />
          {/* פסים אלכסוניים */}
          <div
            className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${project.color} 0 1px, transparent 1px 16px)`,
            }}
          />
          {/* כותרת ענקית מתוארת */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="display text-stroke text-[5.5rem] uppercase leading-none transition-all duration-500 group-hover:[-webkit-text-stroke-color:var(--color-accent-fg)] md:text-[7rem]">
              {project.title}
            </span>
          </div>
          {/* badge */}
          <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center border-2 border-line text-fg transition-all duration-500 group-hover:border-accent-fg group-hover:text-accent-fg">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="square" />
            </svg>
          </span>
        </div>

        {/* title + desc */}
        <div className="flex flex-1 flex-col justify-between gap-4 p-5">
          <div>
            <h3 className="display text-5xl text-fg transition-colors duration-300 group-hover:text-accent-fg md:text-6xl">
              {project.title}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-fg transition-colors duration-300 group-hover:text-accent-fg/80">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="label border-2 border-line px-2.5 py-1 text-[0.6rem] text-muted-fg transition-colors duration-300 group-hover:border-accent-fg/40 group-hover:text-accent-fg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Works() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;

        const getScrollAmount = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          animation: tween,
          invalidateOnRefresh: true,
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="works" className="relative bg-bg py-16 md:py-0">
      {/* header */}
      <div className="px-5 md:px-10 md:pt-24">
        <Reveal>
          <div className="flex items-end justify-between border-b-2 border-line pb-5">
            <div className="flex items-baseline gap-4">
              <span className="label text-accent">01 / עבודות</span>
            </div>
            <span className="label text-muted-fg">
              {PROJECTS.length} פרויקטים
            </span>
          </div>
          <h2 className="display mt-6 text-[14vw] leading-none text-fg md:text-[9vw]">
            עבודות נבחרות
          </h2>
        </Reveal>
      </div>

      {/* Desktop: horizontal pinned scroll (מושבת ב-reduced-motion) */}
      <div
        ref={pinRef}
        className={`relative h-screen overflow-hidden ${
          reduced ? "hidden" : "hidden lg:block"
        }`}
      >
        <div className="flex h-full items-center">
          <div
            ref={trackRef}
            dir="ltr"
            className="flex h-[72vh] items-stretch gap-6 px-10 will-change-transform"
          >
            {/* intro panel */}
            <div className="flex h-full w-[34vw] shrink-0 flex-col justify-center">
              <p dir="rtl" className="max-w-sm text-2xl font-bold leading-snug text-fg">
                מבחר פרויקטים שבהם עיצוב, קוד ותנועה נפגשים.
              </p>
              <p dir="rtl" className="mt-4 max-w-sm text-muted-fg">
                גלול כדי לדפדף ◄
              </p>
            </div>
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} layout="h" />
            ))}
            {/* end panel */}
            <div className="flex h-full w-[28vw] shrink-0 flex-col items-start justify-center">
              <a
                href="#contact"
                dir="rtl"
                className="display text-5xl leading-tight text-fg transition-colors hover:text-accent"
              >
                יש לך פרויקט?
                <br />
                <span className="text-accent">בוא נדבר ←</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile (+ reduced-motion desktop): vertical stack */}
      <div
        className={`mt-8 grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 ${
          reduced ? "" : "lg:hidden"
        }`}
      >
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.08}>
            <ProjectCard project={p} layout="v" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
