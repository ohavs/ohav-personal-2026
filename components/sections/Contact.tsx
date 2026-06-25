"use client";

import Reveal, { RevealWords } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE, SOCIALS } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t-2 border-line bg-bg py-20 md:py-32"
    >
      <div className="px-5 md:px-10">
        <Reveal>
          <div className="flex items-end justify-between border-b-2 border-line pb-5">
            <span className="label text-accent">04 / צור קשר</span>
            <span className="label text-muted-fg">{SITE.available}</span>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col items-center text-center">
          <h2 className="display text-[16vw] leading-[0.9] text-fg md:text-[12vw]">
            <RevealWords text="בוא ניצור" />
            <br />
            <RevealWords text="משהו ביחד" wordClassName="text-accent" delay={0.1} />
          </h2>

          {/* כפתור מייל מגנטי */}
          <div className="mt-12">
            <MagneticButton
              href={`mailto:${SITE.email}`}
              ariaLabel={`שליחת מייל אל ${SITE.email}`}
              className="group border-2 border-accent bg-accent px-8 py-5 text-accent-fg transition-colors duration-200 hover:bg-bg hover:text-accent md:px-12 md:py-7"
            >
              <span className="display text-2xl md:text-4xl">{SITE.email}</span>
            </MagneticButton>
          </div>

          <p className="mt-8 max-w-md text-muted-fg">
            מעדיף ערוץ אחר? אני זמין גם כאן:
          </p>

          {/* רשתות */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label border-2 border-line px-4 py-2.5 text-fg transition-colors duration-150 hover:bg-fg hover:text-bg"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
