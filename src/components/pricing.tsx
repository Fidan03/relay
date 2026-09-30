import { PricingCard, type PricingPlan } from "@/components/pricing-card";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

const PLANS: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    features: ["10k jobs/mo", "Community support", "7-day job history", "Single region"],
    cta: "Start free",
    href: "#",
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    features: [
      "1M jobs/mo",
      "Email support",
      "Real-time dashboard",
      "30-day job history",
      "Node, Bun, Deno, and Edge runtimes",
    ],
    cta: "Try Pro free",
    href: "#",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Contact us",
    features: [
      "Unlimited jobs",
      "SSO",
      "SLA & uptime guarantee",
      "Dedicated support",
      "Custom data retention",
    ],
    cta: "Contact sales",
    href: "#",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <Reveal>
        <SectionEyebrow>Pricing</SectionEyebrow>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-medium tracking-tight text-text sm:text-4xl">
          Start free. Scale when you need to.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 min-w-0">
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <li key={plan.name}>
              <PricingCard plan={plan} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
