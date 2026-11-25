import { Hash } from "lucide-react";
import type { LiveStat } from "../types/lesson";

interface QuantityBoardCardProps {
  stats: LiveStat[];
  compact?: boolean;
}

const TONE_CLASS: Record<NonNullable<LiveStat["tone"]>, string> = {
  default: "text-[var(--ink-primary)]",
  coral: "text-[var(--accent-coral)]",
  teal: "text-[var(--accent-teal)]",
  blue: "text-[var(--accent-blue)]",
};

export function QuantityBoardCard({
  stats,
  compact = false,
}: QuantityBoardCardProps) {
  if (stats.length === 0) return null;
  if (compact) {
    return (
      <section className="fig-card px-4 py-3">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[var(--ink-secondary)]">
          <Hash
            className="h-3.5 w-3.5 text-[var(--accent-teal)]"
            aria-hidden="true"
          />
          <span>关键数字</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stats.map((item) => (
            <div
              key={item.label}
              className="inline-flex items-baseline gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-stage)] px-2.5 py-1 text-xs"
            >
              <span className="text-[var(--ink-muted)]">{item.label}</span>
              <span
                className={`font-mono font-extrabold ${
                  TONE_CLASS[item.tone ?? "default"]
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="fig-card p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-[var(--ink-secondary)]">
        <Hash
          className="h-3.5 w-3.5 text-[var(--accent-teal)]"
          aria-hidden="true"
        />
        <span>当前数量看板</span>
      </div>

      <dl className="grid grid-cols-2 gap-2.5">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-stage)] px-3 py-2"
          >
            <dt className="text-[11px] font-medium text-[var(--ink-muted)]">
              {item.label}
            </dt>
            <dd
              className={`mt-0.5 font-mono text-base font-extrabold ${
                TONE_CLASS[item.tone ?? "default"]
              }`}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
