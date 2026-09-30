"use client";

import { Check, Copy } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeCard } from "@/components/code-card";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

// html is already highlighted on the server and passed down as a string — strings
// serialize cleanly across the server→client boundary, so Shiki never ships to the
// client even though the tabs themselves are interactive. `code` is the same
// snippet's raw, unhighlighted text — kept alongside `html` so the copy button
// below can copy plain text, not markup.
export type CodeTab = {
  value: string;
  label: string;
  filename: string;
  html: string;
  code: string;
};

// The Hero and Final CTA both teach "code here is copyable" via CopyInstall —
// give these multi-line snippets the same affordance, without touching the
// shared CodeCard (it only knows how to render pre-highlighted HTML).
function CopyCodeButton({ code }: { code: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(code)}
      aria-label="Copy code"
      className="absolute top-1.5 right-2.5 flex size-6 items-center justify-center rounded-md text-muted transition-colors hover:bg-border hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {copied ? (
        <Check className="size-3.5 text-accent" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" aria-hidden="true" />
      )}
    </button>
  );
}

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  return (
    <Tabs defaultValue={tabs[0]?.value} className="w-full min-w-0">
      {/* Underline tabs — shadcn's default pill styling swapped for the brand's tokens. */}
      <TabsList className="mb-4 inline-flex h-auto gap-1 border-b border-border bg-transparent p-0">
        {tabs.map((t) => (
          <TabsTrigger
            key={t.value}
            value={t.value}
            className="rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 font-mono text-sm text-muted shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent data-active:bg-transparent! data-active:border-t-transparent! data-active:border-x-transparent! data-active:border-b-accent! data-active:text-text! data-active:shadow-none! dark:data-active:bg-transparent! dark:data-active:border-t-transparent! dark:data-active:border-x-transparent! dark:data-active:border-b-accent! dark:data-active:text-foreground!"
          >
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((t) => (
        <TabsContent
          key={t.value}
          value={t.value}
          className="mt-0 min-w-0 rounded-lg focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <div className="relative">
            <CodeCard filename={t.filename} html={t.html} />
            <CopyCodeButton code={t.code} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
