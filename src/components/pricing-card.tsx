import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const { name, price, period, features, cta, href, featured } = plan;

  return (
    <div className="relative h-full">
      {featured && (
        <Badge className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">Most popular</Badge>
      )}

      <Card
        className={cn(
          "h-full",
          featured && "ring-2 ring-accent shadow-lg shadow-accent/20"
        )}
      >
        <CardContent className="flex h-full flex-col gap-6">
          <div>
            <h3 className="font-mono text-sm text-muted uppercase tracking-wide">
              {name}
              {featured && <span className="sr-only"> — Most popular</span>}
            </h3>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-medium text-text">{price}</span>
              {period && <span className="text-sm text-muted">{period}</span>}
            </div>
          </div>

          <Button
            asChild
            variant={featured ? "default" : "outline"}
            className={cn(
              "w-full",
              !featured && "bg-transparent",
              featured && "focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            <a href={href}>{cta}</a>
          </Button>

          <ul className="flex flex-col gap-3 border-t border-border pt-6">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-accent-on-surface"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
