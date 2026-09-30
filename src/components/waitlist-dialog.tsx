"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import type { Button } from "@/components/ui/button";

const WaitlistDialogContent = dynamic(() =>
  import("@/components/waitlist-dialog-content").then((m) => m.WaitlistDialogContent)
);

// Renders a plain, cheap trigger until it's actually clicked. The real dialog
// — Radix Dialog, zod, the submit hook — only loads then, so mounting
// "Start free" in 4 places (header, mobile nav, hero, final CTA) doesn't add
// that weight to every page's initial JS, only to the one someone opens.
export function WaitlistDialog({ trigger }: { trigger: React.ReactElement<React.ComponentProps<typeof Button>> }) {
  const [wantsOpen, setWantsOpen] = React.useState(false);

  if (!wantsOpen) {
    return React.cloneElement(trigger, {
      onClick: () => setWantsOpen(true),
      "aria-haspopup": "dialog",
    });
  }

  return <WaitlistDialogContent trigger={trigger} defaultOpen />;
}
