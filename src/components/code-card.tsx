import { cn } from "@/lib/utils";

// Presentational only — no client JS. Takes pre-highlighted HTML (from lib/highlight)
// so it can render on the server or inside a client component alike.
export function CodeCard({
  filename,
  html,
  className,
}: {
  filename: string;
  html: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-surface", className)}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-3 rounded-full bg-border" aria-hidden="true" />
        <span className="size-3 rounded-full bg-border" aria-hidden="true" />
        <span className="size-3 rounded-full bg-border" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-muted">{filename}</span>
      </div>
      <div
        className="overflow-x-auto p-4 font-mono text-sm leading-relaxed [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
