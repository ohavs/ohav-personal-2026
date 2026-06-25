"use client";

import Marquee from "@/components/ui/Marquee";
import { SITE } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t-2 border-line bg-bg">
      {/* מרקיזה ענקית */}
      <div className="border-b-2 border-line py-4">
        <Marquee direction="ltr" duration={26} pauseOnHover={false}>
          <span className="display flex items-center text-[10vw] leading-none text-stroke">
            בוא נדבר&nbsp;&nbsp;—&nbsp;&nbsp;LET&apos;S TALK&nbsp;&nbsp;—&nbsp;&nbsp;
          </span>
        </Marquee>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <a href="#top" className="flex items-center gap-2">
            <span className="display text-4xl text-fg">{SITE.name}</span>
            <span className="h-2.5 w-2.5 bg-accent" />
          </a>
          <p className="mt-3 max-w-xs text-sm text-muted-fg">{SITE.tagline}</p>
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <a
            href={`mailto:${SITE.email}`}
            className="text-lg font-bold text-fg transition-colors hover:text-accent"
          >
            {SITE.email}
          </a>
          <span className="label text-muted-fg">{SITE.location}</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 border-t-2 border-line px-5 py-5 text-center md:flex-row md:px-10 md:text-right">
        <span className="label text-muted-fg">
          © {year} {SITE.nameLatin}. כל הזכויות שמורות.
        </span>
        <a href="#top" className="label text-muted-fg transition-colors hover:text-accent">
          חזרה למעלה ↑
        </a>
      </div>
    </footer>
  );
}
