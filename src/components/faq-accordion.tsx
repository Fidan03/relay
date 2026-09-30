"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqEntry {
  question: string;
  answer: string;
}

// Single-open accordion: five short (1-3 sentence) answers don't need to be
// visible simultaneously, and keeping only one open at a time matches the
// same restraint the rest of the page uses. `collapsible` lets the open item
// close again, so the default "all collapsed" state is always reachable.
export function FaqAccordion({ faqs }: { faqs: FaqEntry[] }) {
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      {faqs.map(({ question, answer }) => (
        <AccordionItem key={question} value={question}>
          <AccordionTrigger className="text-base">{question}</AccordionTrigger>
          <AccordionContent className="text-muted">{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
