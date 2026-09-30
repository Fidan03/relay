"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

// Shared scroll-reveal for sections below the fold, per SPEC.md's motion system:
// fade-up on scroll, once, ~16px travel. MotionConfig in layout.tsx already
// handles prefers-reduced-motion for every motion.* usage, this one included.
//
// useInView alone misses a real case: a fast jump past the section (keyboard
// End, a hash-link jump, or a full-page capture) can move the viewport from
// "before" to "after" without ever intersecting it, so the IntersectionObserver
// never fires "entered" and the content stays invisible forever. The scroll
// listener below catches that by revealing immediately once the section is
// already behind the viewport, animation or not.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  const [skippedPast, setSkippedPast] = useState(false);

  useEffect(() => {
    if (inView) return;

    const checkSkipped = () => {
      if (ref.current && ref.current.getBoundingClientRect().bottom < 0) {
        setSkippedPast(true);
      }
    };

    const raf = requestAnimationFrame(checkSkipped);
    window.addEventListener("scroll", checkSkipped, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", checkSkipped);
    };
  }, [inView]);

  const revealed = inView || skippedPast;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
