"use client";

import { SITE, NAV_LINKS } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t-2 border-line bg-bg">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 py-12 md:grid-cols-3 md:px-10 md:py-16">
        {/* לוגו + סלוגן */}
        <div className="md:col-span-1">
          <a href="#top" className="flex items-center gap-2">
            <span className="display text-5xl text-fg">{SITE.name}</span>
            <span className="h-2.5 w-2.5 bg-accent" />
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-fg">
            {SITE.tagline}
          </p>
        </div>

        {/* ניווט */}
        <nav className="flex flex-col gap-2 md:col-span-1">
          <span className="label mb-2 text-muted-fg">ניווט</span>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="w-fit text-lg font-bold text-fg transition-colors hover:text-accent-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* יצירת קשר */}
        <div className="flex flex-col gap-2 md:col-span-1 md:items-end">
          <span className="label mb-2 text-muted-fg">צור קשר</span>
          <a
            href={`mailto:${SITE.email}`}
            className="text-lg font-bold text-fg transition-colors hover:text-accent-ink"
          >
            {SITE.email}
          </a>
          <span className="text-muted-fg">{SITE.location}</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 border-t-2 border-line px-5 py-5 text-center md:flex-row md:px-10 md:text-right">
        <span className="label text-muted-fg">
          © {year} {SITE.nameLatin}. כל הזכויות שמורות.
        </span>
        <a href="#top" className="label text-muted-fg transition-colors hover:text-accent-ink">
          חזרה למעלה ↑
        </a>
      </div>
    </footer>
  );
}
