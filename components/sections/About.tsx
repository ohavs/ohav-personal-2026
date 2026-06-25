"use client";

import Reveal, { RevealWords } from "@/components/ui/Reveal";
import ScrollMarquee from "@/components/ui/ScrollMarquee";
import Parallax from "@/components/ui/Parallax";
import { ABOUT_PARAGRAPHS, STATS } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t-2 border-line bg-bg pt-20 md:pt-32"
    >
      <div className="px-5 md:px-10">
        <Reveal>
          <span className="label text-accent-ink">02 / עליי</span>
        </Reveal>

        {/* הצהרה ענקית */}
        <div className="mt-8 max-w-6xl">
          <h2 className="display text-[9vw] leading-[0.95] text-fg md:text-[5.5vw]">
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
                    <span className="display text-4xl text-accent-ink md:text-5xl">
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

      {/* להקת מרקיזה כפולה ענקית — שתי שורות בכיוונים מנוגדים (parallax) */}
      <Parallax amount={60} className="mt-20 flex flex-col gap-2 md:mt-28 md:gap-4">
        <ScrollMarquee baseVelocity={5} separator="✶" separatorClassName="text-accent-ink">
          <span className="display text-stroke flex items-center gap-[0.35em] text-[15vw] uppercase leading-[1.1] md:text-[11vw]">
            <span>DESIGN</span>
            <span className="[-webkit-text-stroke:0] [color:var(--color-accent-ink)]">·</span>
            <span>BUILD</span>
            <span className="[-webkit-text-stroke:0] [color:var(--color-accent-ink)]">·</span>
            <span>REPEAT</span>
          </span>
        </ScrollMarquee>

        <ScrollMarquee baseVelocity={-5} separator="✶" separatorClassName="text-fg/40">
          <span className="display flex items-center gap-[0.35em] text-accent-ink text-[15vw] leading-[1.1] md:text-[11vw]">
            <span>לעצב</span>
            <span className="text-fg/30">·</span>
            <span>לבנות</span>
            <span className="text-fg/30">·</span>
            <span>להדהים</span>
          </span>
        </ScrollMarquee>
      </Parallax>
    </section>
  );
}
