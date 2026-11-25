import { Button } from "@ui-sdk/react/button";
import { useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { MotionConfig } from "motion/react";

interface StageFrameProps {
  ariaLabel: string;
  viewBox?: string;
  children: ReactNode;
}

export function StageFrame({
  ariaLabel,
  viewBox = "0 0 760 440",
  children,
}: StageFrameProps) {
  const [replayTick, setReplayTick] = useState(0);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-stage)]"
        role="region"
        aria-label={ariaLabel}
      >
        <svg
          key={replayTick}
          className="block w-full h-auto select-none"
          viewBox={viewBox}
          role="img"
          aria-label={ariaLabel}
        >
          <defs>
            {/* Subtle paper grid floor */}
            <pattern
              id="fig-grid-floor"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 28 0 L 0 0 0 28"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
            </pattern>
            {/* Coral diagonal hatch */}
            <pattern
              id="fig-hatch-coral"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect
                width="8"
                height="8"
                fill="var(--accent-coral)"
                fillOpacity="0.12"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="8"
                stroke="var(--accent-coral)"
                strokeOpacity="0.55"
                strokeWidth="2.5"
              />
            </pattern>
            {/* Soft drop shadow */}
            <filter
              id="fig-soft-shadow"
              x="-15%"
              y="-15%"
              width="130%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="6"
                floodColor="#1e1e1e"
                floodOpacity="0.1"
              />
            </filter>
          </defs>

          <rect width="100%" height="100%" fill="url(#fig-grid-floor)" />
          {children}
        </svg>

        {/* Kid-friendly replay button */}
        <Button
          type="button"
          onClick={() => setReplayTick((t) => t + 1)}
          aria-label="再看一遍这一步动画"
          className="absolute right-3 bottom-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/92 px-3 py-1.5 text-xs font-bold text-[var(--ink-secondary)] shadow-sm backdrop-blur-sm transition hover:border-[var(--accent-coral-border)] hover:text-[var(--accent-coral)]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>再看一遍</span>
        </Button>
      </div>
    </MotionConfig>
  );
}
