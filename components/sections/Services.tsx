"use client";

import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import { SERVICES } from "@/lib/data";

export default function Services() {
  return (
    <section
      id="services"
      className="relative border-t-2 border-line bg-bg py-20 md:py-32"
    >
      <div className="px-5 md:px-10">
        <Reveal>
          <div className="flex items-end justify-between border-b-2 border-line pb-5">
            <span className="label text-accent-ink">03 / שירותים</span>
            <span className="label text-muted-fg">מה אני עושה</span>
          </div>
        </Reveal>

        <Parallax amount={50}>
          <h2 className="display mt-6 text-[12vw] leading-none text-fg md:text-[7vw]">
            איך אני יכול לעזור
          </h2>
        </Parallax>

        {/* שורות שירות */}
        <div className="mt-12 border-t-2 border-line">
          {SERVICES.map((s, i) => (
            <Reveal key={s.index} delay={i * 0.05}>
              <div className="group relative overflow-hidden border-b-2 border-line">
                {/* flood */}
                <span className="pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

                <div className="relative z-10 grid grid-cols-1 gap-6 py-7 md:grid-cols-12 md:items-center md:py-9">
                  {/* index + title */}
                  <div className="flex items-baseline gap-5 md:col-span-6">
                    <span className="label text-base text-muted-fg transition-colors duration-300 group-hover:text-accent-fg">
                      {s.index}
                    </span>
                    <h3 className="display text-4xl text-fg transition-colors duration-300 group-hover:text-accent-fg md:text-6xl">
                      {s.title}
                    </h3>
                  </div>

                  {/* description */}
                  <p className="text-muted-fg transition-colors duration-300 group-hover:text-accent-fg md:col-span-4">
                    {s.description}
                  </p>

                  {/* items */}
                  <div className="flex flex-wrap gap-2 md:col-span-2 md:justify-end">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className="label border-2 border-line px-2.5 py-1 text-[0.6rem] text-muted-fg transition-colors duration-300 group-hover:border-accent-fg/40 group-hover:text-accent-fg"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
