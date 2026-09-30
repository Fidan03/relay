import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type JobStatus = "running" | "queued" | "done";

const STATUS_LABEL: Record<JobStatus, string> = {
  running: "Running",
  queued: "Queued",
  done: "Done",
};

function StatusGlyph({ status }: { status: JobStatus }) {
  if (status === "running") {
    return (
      <span className="relative flex size-1.5" aria-hidden="true">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
      </span>
    );
  }
  if (status === "done") {
    return <Check className="size-3 text-muted" aria-hidden="true" strokeWidth={2.5} />;
  }
  return <span className="size-1.5 rounded-full border border-muted" aria-hidden="true" />;
}

export function StatusPill({ status, className }: { status: JobStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono text-xs", className)}>
      <StatusGlyph status={status} />
      <span className={cn(status === "running" ? "text-text" : "text-muted")}>
        {STATUS_LABEL[status]}
      </span>
    </span>
  );
}
