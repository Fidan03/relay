"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyInstall({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied or unavailable; leave the button in its
      // default state rather than throwing or claiming a false success.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy install command"
      className="group inline-flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm text-text transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span className="text-muted select-none">$</span>
      <span>{command}</span>
      {copied ? (
        <Check className="size-4 text-accent" aria-hidden="true" />
      ) : (
        <Copy className="size-4 text-muted group-hover:text-text" aria-hidden="true" />
      )}
    </button>
  );
}
