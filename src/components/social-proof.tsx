import { FileBarChart, Mail, Quote, Webhook } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

// Illustrative testimonial — a plausible but invented persona/company, not a
// real customer. Written from the customer's side: what changed for them,
// not a restatement of the feature list above.
const QUOTE = {
  text: "We had three different retry loops hand-rolled across our services before Relay. Now it's one dashboard, and the pager doesn't go off for jobs that just needed a second try.",
  name: "Dana Okafor",
  role: "Backend Lead, Tidewave",
  initials: "DO",
};

// Real workloads teams actually run on Relay — distinct from the FEATURES
// section above (that's the product's capabilities; this is what people build
// with them).
const USE_CASES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Mail,
    title: "Email digests",
    description: "Daily and weekly summaries, batched and sent on schedule.",
  },
  {
    icon: Webhook,
    title: "Failed delivery replay",
    description: "Replay failed webhook deliveries without babysitting them.",
  },
  {
    icon: FileBarChart,
    title: "Report generation",
    description: "Heavy exports and PDFs generated off the request path.",
  },
];

export function SocialProof() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <Reveal>
        <SectionEyebrow>Real workloads</SectionEyebrow>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-medium tracking-tight text-text sm:text-4xl">
          How teams put Relay to work.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 min-w-0">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="flex flex-col gap-6">
            <Quote className="size-6 text-accent-on-surface" aria-hidden="true" />
            <blockquote className="m-0 flex flex-col gap-6">
              <p className="text-lg leading-relaxed text-text sm:text-xl">
                “{QUOTE.text}”
              </p>
              <footer className="flex items-center gap-3 border-t border-border pt-6">
                <Avatar>
                  {/* bg-muted/text-muted-foreground both resolve to the same
                      --muted token in this design system, so the default
                      AvatarFallback styling has zero self-contrast — override
                      locally rather than restyle the shared primitive. */}
                  <AvatarFallback className="bg-border text-text">
                    {QUOTE.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-text">
                    <cite className="not-italic">{QUOTE.name}</cite>
                  </p>
                  <p className="text-sm text-muted">{QUOTE.role}</p>
                </div>
              </footer>
            </blockquote>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={0.15} className="mt-12 min-w-0">
        <p className="mb-4 font-mono text-xs tracking-wide text-muted uppercase">
          How teams use Relay
        </p>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {USE_CASES.map(({ icon: Icon, title, description }) => (
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
