import dynamic from "next/dynamic";

import { highlight } from "@/lib/highlight";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import type { CodeTab } from "@/components/code-tabs";

// Below the fold and interactive-only (tab switching, copy button) — split its
// client JS into its own chunk rather than the shared main bundle. Server
// rendering stays on (the default), so the highlighted code is still present
// in the initial HTML; only the hydration JS for the tabs loads separately.
const CodeTabs = dynamic(() => import("@/components/code-tabs").then((m) => m.CodeTabs));

// Same ~5-line relay.enqueue() call on every tab — only the import line (and
// Node's require/sync call, being CommonJS-flavored) changes per runtime, so
// the runtime differences are the only thing that visually varies tab to tab.
const snippets: {
  value: string;
  label: string;
  filename: string;
  lang: "ts" | "bash";
  code: string;
}[] = [
  {
    value: "node",
    label: "Node",
    filename: "worker.js",
    lang: "ts",
    code: `const { relay } = require("@relay/queue");

relay.enqueue("send-welcome-email", {
  userId: user.id,
});`,
  },
  {
    value: "bun",
    label: "Bun",
    filename: "worker.ts",
    lang: "ts",
    code: `import { relay } from "@relay/queue";

await relay.enqueue("send-welcome-email", {
  userId: user.id,
});`,
  },
  {
    value: "deno",
    label: "Deno",
    filename: "worker.ts",
    lang: "ts",
    code: `import { relay } from "jsr:@relay/queue";

await relay.enqueue("send-welcome-email", {
  userId: user.id,
});`,
  },
  {
    value: "edge",
    label: "Edge",
    filename: "worker.ts",
    lang: "ts",
    code: `import { relay } from "@relay/queue/edge";

await relay.enqueue("send-welcome-email", {
  userId: user.id,
});`,
  },
];

export async function IntegrationShowcase() {
  // Highlight all snippets on the server in parallel, then hand the strings to the
  // client tabs component.
  const tabs: CodeTab[] = await Promise.all(
    snippets.map(async ({ lang, code, ...rest }) => ({
      ...rest,
      code,
      html: await highlight(code, lang),
    }))
  );

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <Reveal>
        <SectionEyebrow>Node · Bun · Deno · Edge</SectionEyebrow>
        <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-text sm:text-4xl">
          Works with the runtime you already use.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 min-w-0">
        <CodeTabs tabs={tabs} />
      </Reveal>
    </section>
  );
}
