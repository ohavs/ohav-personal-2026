"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/data";

/**
 * אינטרו קולנועי: מונה 0→100 עם פס אקצנט, ואז "וילון" שנפתח כלפי מעלה.
 * נועל גלילה בזמן האינטרו ומשחרר בסיום.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const DURATION = 1900;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => finish(), 350);
      }
    };
    raf = requestAnimationFrame(tick);

    function finish() {
      setDone(true);
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 900);
    }

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-bg px-6 py-8 md:px-12 md:py-12"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="label text-muted-fg">OHAV / STUDIO</span>
            <span className="label text-muted-fg">{SITE.location}</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="overflow-hidden">
              <motion.h1
                className="display text-[18vw] leading-none text-fg md:text-[12vw]"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {SITE.name}
              </motion.h1>
            </div>
            <span className="display shrink-0 text-[14vw] leading-none text-accent md:text-[8vw] tabular-nums">
              {count}
            </span>
          </div>

          {/* פס התקדמות */}
          <div className="relative mt-4 h-[3px] w-full bg-muted-2">
            <motion.div
              className="absolute inset-y-0 right-0 bg-accent"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
