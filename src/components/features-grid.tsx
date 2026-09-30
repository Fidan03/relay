import { Activity, ArchiveX, CalendarClock, Globe, RotateCcw, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: RotateCcw,
    title: "Automatic retries",
    description: "Exponential backoff, configurable per job.",
  },
  {
    icon: ArchiveX,
    title: "Dead-letter queues",
    description: "Failed jobs never silently disappear.",
  },
  {
    icon: Activity,
    title: "Real-time dashboard",
    description: "See every job's status live.",
  },
  {
    icon: Globe,
    title: "Runs anywhere",
    description: "Node, Bun, Deno, or Edge runtimes.",
  },
  {
    icon: CalendarClock,
    title: "Cron + on-demand",
    description: "Scheduled and triggered jobs, same API.",
  },
  {
    icon: ScrollText,
    title: "Observability built in",
    description: "Logs and traces per job, no extra setup.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <Reveal>
        <SectionEyebrow>Why Relay</SectionEyebrow>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-medium tracking-tight text-text sm:text-4xl">
          Everything you need. Nothing that wakes you up.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 min-w-0">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Card>
                <CardContent className="flex flex-col items-start gap-3">
                  <Icon className="size-5 text-accent-on-surface" aria-hidden="true" />
                  <h3 className="font-heading text-base leading-snug font-medium">{title}</h3>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
