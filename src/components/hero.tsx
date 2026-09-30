import { Button } from "@/components/ui/button";
import { CopyInstall } from "@/components/copy-install";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { HeroPanel } from "@/components/hero-panel";
import { DashboardMockup } from "@/components/dashboard-mockup";
import { WaitlistDialog } from "@/components/waitlist-dialog";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32 lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-36">
      <div className="flex min-w-0 flex-col items-start gap-6">
        <SectionEyebrow>TypeScript · Self-hosted or managed · 99.95% uptime</SectionEyebrow>

        <h1 className="text-balance font-display text-[clamp(2.5rem,2rem+3vw,4rem)] leading-[1.05] font-medium tracking-tight text-text">
          Background jobs that don&apos;t wake you up at 2 a.m.
        </h1>

        <p className="max-w-prose text-lg leading-[1.6] text-muted">
          Relay schedules, retries, and monitors your jobs — with a dashboard that tells you what
          broke before your users do.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
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
      </div>

      <HeroPanel>
        <DashboardMockup />
      </HeroPanel>
    </section>
  );
}
