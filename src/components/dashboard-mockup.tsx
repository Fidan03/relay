import { cn } from "@/lib/utils";
import { StatusPill, type JobStatus } from "@/components/status-pill";

interface Job {
  name: string;
  status: JobStatus;
  meta: string;
}

const JOBS: Job[] = [
  { name: "send-welcome-email", status: "running", meta: "1m 42s" },
  { name: "sync-stripe-invoices", status: "done", meta: "2.1s" },
  { name: "resize-uploaded-image", status: "queued", meta: "4s" },
  { name: "webhook-retry:shopify", status: "running", meta: "8s" },
  { name: "generate-weekly-report", status: "done", meta: "640ms" },
];

const JOBS_TODAY = "2,847";
const JOBS_DELTA = "+18%";

// Illustrative throughput trend, oldest to newest — hand-tuned to read as a
// plausible climbing-with-noise curve, not a real metrics feed.
const TREND_LEVELS = [20, 35, 28, 45, 38, 55, 48, 62, 54, 70, 60, 78, 68, 88, 76, 95];

function buildPolylinePoints(levels: number[], width: number, height: number) {
  const step = width / (levels.length - 1);
  return levels
    .map((level, i) => {
      const x = i * step;
      const y = height - (level / 100) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function Sparkline({ gradientId }: { gradientId: string }) {
  const width = 200;
  const height = 40;
  const linePoints = buildPolylinePoints(TREND_LEVELS, width, height);
  const areaPoints = `0,${height} ${linePoints} ${width},${height}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="h-10 w-full"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-on-surface)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent-on-surface)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline
        points={linePoints}
        fill="none"
        stroke="var(--accent-on-surface)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Relay dashboard preview: ${JOBS_TODAY} jobs in the last 24 hours, ${JOBS_DELTA} from yesterday, with jobs currently running, queued, and completed`}
      className={cn("overflow-hidden rounded-2xl border border-border bg-surface", className)}
    >
      <div aria-hidden="true">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs text-muted">Live</span>
          </div>
          <span className="font-mono text-xs text-muted">relay/production</span>
        </div>

        <div className="border-b border-border px-5 pt-4 pb-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-semibold text-text">{JOBS_TODAY}</span>
              <span className="font-mono text-xs text-muted">jobs / 24h</span>
            </div>
            <span className="font-mono text-xs text-accent-on-surface">{JOBS_DELTA}</span>
          </div>
          <div className="mt-2">
            <Sparkline gradientId="dashboard-mockup-trend" />
          </div>
        </div>

        <div className="px-5 pt-3 pb-1">
          <span className="font-mono text-[11px] tracking-wide text-muted uppercase">
            Recent jobs
          </span>
        </div>

        <ul className="divide-y divide-border">
          {JOBS.map((job) => (
            <li
              key={job.name}
              className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <StatusPill status={job.status} />
                <span className="font-mono text-sm text-text sm:truncate">{job.name}</span>
              </div>
              <span className="font-mono text-xs text-muted tabular-nums sm:shrink-0">
                {job.meta}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
