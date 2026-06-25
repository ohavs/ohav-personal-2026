"use client";

import { useRef, ReactNode } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  wrap,
  useReducedMotion,
} from "framer-motion";

/**
 * מרקיזה מבוססת מהירות גלילה — תנועה רציפה שמואצת ומשנה כיוון לפי הגלילה (parallax).
 * חסינה ל-RTL (ה-track תמיד dir=ltr עם 4 עותקים → לולאה חלקה ללא רווחים).
 * משתמשת ב-overflow-x: clip כך ששום דבר לא נחתך אנכית (סוגריים, ניקוד, גרשיים).
 */
export default function ScrollMarquee({
  children,
  baseVelocity = 4,
  className = "",
  separator = "—",
  separatorClassName = "text-accent",
  pauseOnHover = false,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
  separator?: ReactNode;
  separatorClassName?: string;
  pauseOnHover?: boolean;
}) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  // 4 עותקים → גלישה בתוך חלון של 25% נותנת לולאה חלקה
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const directionFactor = useRef(1);
  const hovering = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    if (hovering.current && pauseOnHover) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // היפוך כיוון לפי כיוון הגלילה
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    // האצה לפי מהירות הגלילה (אפקט parallax)
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const Unit = (
    <span className="flex shrink-0 items-center">
      <span className="px-[0.25em]">{children}</span>
      <span className={`px-[0.15em] ${separatorClassName}`} aria-hidden="true">
        {separator}
      </span>
    </span>
  );

  return (
    <div
      dir="ltr"
      className={`relative w-full overflow-x-clip ${className}`}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <motion.div
        className="flex flex-nowrap whitespace-nowrap will-change-transform"
        style={{ x }}
      >
        {Unit}
        {Unit}
        {Unit}
        {Unit}
      </motion.div>
    </div>
  );
}
