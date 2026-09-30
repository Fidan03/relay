"use client";

import { useState } from "react";

export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetMs);
    } catch {
      // Clipboard access denied or unavailable; leave copied false rather
      // than throwing or claiming a false success.
    }
  };

  return { copied, copy };
}
