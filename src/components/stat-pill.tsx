export function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5 font-mono text-sm">
      <span className="font-medium text-text">{value}</span>
      <span className="text-muted">{label}</span>
    </div>
  );
}
