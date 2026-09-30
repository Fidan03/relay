import { Reveal } from "@/components/reveal";

// Fictional placeholder wordmarks — swap for real customer logos when available.
const TRUST_LOGOS = ["Fenwick", "Wrenmoor", "Ashgrove", "Latchkey", "Ridgeline", "Tidewave"];

export function TrustBar() {
  return (
    <section className="border-y border-border">
      <Reveal className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {TRUST_LOGOS.map((name) => (
            <span
              key={name}
              className="font-display text-lg font-medium text-muted select-none"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="mt-6 text-center font-mono text-xs text-muted">
          2.1M jobs processed daily · 99.95% uptime
        </p>
      </Reveal>
    </section>
  );
}
