import { Button } from "@/components/ui/button";
import { CopyInstall } from "@/components/copy-install";
import { Reveal } from "@/components/reveal";
import { WaitlistDialog } from "@/components/waitlist-dialog";

// The Hero's pattern in miniature: primary CTA first for prominence, install
// command below as the smaller, secondary path — same order the Hero settled
// on, not the reverse. "View pricing" is a plain anchor, same as the Hero's.
export function FinalCta() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
      <Reveal className="flex flex-col items-center gap-6">
        <h2 className="font-display text-3xl font-medium tracking-tight text-text sm:text-4xl">
          Ship background jobs today.
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <WaitlistDialog
            trigger={
              <Button type="button" className="h-11 px-6 text-base">
                Start free
              </Button>
            }
          />
          <Button asChild variant="ghost">
            <a href="#pricing">View pricing</a>
          </Button>
        </div>

        <CopyInstall command="npm i @relay/queue" />
      </Reveal>
    </section>
  );
}
