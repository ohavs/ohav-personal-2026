"use client";

import { ReactNode } from "react";

/**
 * מרקיזה אינסופית. מכפילה את התוכן פעמיים כדי ליצור לולאה חלקה.
 * האנימציה היא CSS טהור (ראה globals.css) כך שהיא רצה מיד וגם נעצרת ב-reduced-motion.
 */
export default function Marquee({
  children,
  direction = "rtl",
  duration = 28,
  pauseOnHover = true,
  className = "",
}: {
  children: ReactNode;
  direction?: "rtl" | "ltr";
  duration?: number;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`marquee-wrap relative w-full overflow-hidden ${
        pauseOnHover ? "" : "pointer-events-none"
      } ${className}`}
    >
      <div
        className="marquee"
        data-dir={direction}
        style={{ ["--duration" as string]: `${duration}s` }}
        aria-hidden="false"
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
