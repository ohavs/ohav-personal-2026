"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-300 ${
          scrolled
            ? "border-b-2 border-line bg-bg/80 backdrop-blur-md"
            : "border-b-2 border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
          <a href="#top" className="group flex items-center gap-2">
            <span className="display text-2xl leading-none text-fg">
              {SITE.name}
            </span>
            <span className="h-2 w-2 bg-accent transition-transform duration-200 group-hover:scale-150" />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-baseline gap-1.5 text-sm font-bold text-fg transition-colors hover:text-accent"
                >
                  <span className="label text-[0.6rem] text-muted-fg transition-colors group-hover:text-accent">
                    {link.index}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="label hidden border-2 border-line px-4 py-2 text-fg transition-colors duration-150 hover:bg-accent hover:text-accent-fg md:inline-block"
          >
            בוא נדבר
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={open}
            className="relative z-[110] flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-7 bg-fg transition-all duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-7 bg-fg transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-7 bg-fg transition-all duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col justify-center bg-bg px-6 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-center gap-4 text-[16vw] leading-tight text-fg transition-colors hover:text-accent"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className="label text-base text-accent">
                      {link.index}
                    </span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-col gap-1">
              <span className="label text-muted-fg">צור קשר</span>
              <a href={`mailto:${SITE.email}`} className="text-lg font-bold text-fg">
                {SITE.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
