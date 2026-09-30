import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[0.8rem] tracking-wide text-muted uppercase",
        className
      )}
    >
      {children}
    </p>
  );
}
