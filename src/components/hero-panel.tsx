"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

// Generic fade-up entrance for the hero's right column — same motion Anchor
// used for its code panel, just not code-specific by name since Relay's hero
// wraps a DashboardMockup instead.
export function HeroPanel({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="min-w-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
