import dynamic from "next/dynamic";

import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import type { FaqEntry } from "@/components/faq-accordion";

// Below the fold and interactive-only — same rationale as the Integration
// showcase's CodeTabs: defer the accordion's client JS to its own chunk.
const FaqAccordion = dynamic(() => import("@/components/faq-accordion").then((m) => m.FaqAccordion));

const FAQS: FaqEntry[] = [
  {
    question: "Self-hosted vs. managed — what's the difference?",
    answer:
      "Managed runs the queue and dashboard for you — we patch, scale, and back it with an SLA on paid plans. Self-hosted means you run the same worker and dashboard yourself, on your own infrastructure. Either way it's the same API, so switching later doesn't mean rewriting anything.",
  },
  {
    question: "What happens when a job fails repeatedly?",
    answer:
      "Relay retries failed jobs with exponential backoff, on a schedule you configure per job. Once the last retry fails, the job moves to a dead-letter queue instead of disappearing, so you can inspect it and replay it manually from the dashboard.",
  },
  {
    question: "Which runtimes are supported?",
    answer:
      "Node, Bun, Deno, and Edge — see the runtime tabs above for the exact import syntax on each. The enqueue() call and job semantics stay identical; only the import line changes.",
  },
  {
    question: "Is there a free-tier limit reset?",
    answer:
      "Yes. The Free plan's 10k jobs/mo resets on your billing cycle, not a rolling window. Go over mid-cycle and jobs still queue normally — they just wait for the reset or an upgrade to Pro.",
  },
  {
    question: "SOC 2 and data residency — where do things stand?",
    answer:
      "SOC 2 Type II is in progress; we'll publish the report as soon as it's ready. Self-hosted keeps every job on your own infrastructure today, and managed customers can talk to us about region options.",
  },
];

// Single-open accordion: five short (1-3 sentence) answers don't need to be
// visible simultaneously, and keeping only one open at a time matches the
// same restraint the rest of the page uses. `collapsible` lets the open item
// close again, so the default "all collapsed" state is always reachable.
export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <Reveal>
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-text sm:text-4xl">
          Common questions. Straight answers.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 min-w-0">
        <FaqAccordion faqs={FAQS} />
      </Reveal>
    </section>
  );
}
