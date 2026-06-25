"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * כפתור/קישור מגנטי — נמשך בעדינות לעבר הסמן.
 * נכבה אוטומטית כשמבקשים reduced-motion וגם במכשירי מגע.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  strength = 0.4,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  strength?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = (href ? motion.a : motion.button) as typeof motion.a;

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`relative inline-flex cursor-pointer items-center justify-center ${className}`}
    >
      {children}
    </Comp>
  );
}
