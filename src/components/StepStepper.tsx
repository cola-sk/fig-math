import { Button } from "@ui-sdk/react/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LessonStep } from "../types/lesson";

interface StepStepperProps {
  steps: LessonStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

export function StepStepper({
  steps,
  currentStepIndex,
  onSelectStep,
}: StepStepperProps) {
  return (
    <div className="fig-card px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[var(--ink-muted)]">
          本讲推演步骤
        </span>
        <span className="font-mono text-xs font-semibold text-[var(--ink-secondary)]">
          第 {currentStepIndex + 1} / {steps.length} 步
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          aria-label="步骤条向前回看"
          disabled={currentStepIndex === 0}
          onClick={() => onSelectStep(Math.max(0, currentStepIndex - 1))}
          className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] transition hover:border-[var(--border-strong)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Button>

        <div className="flex flex-1 items-center gap-1.5 overflow-x-auto py-1">
          {steps.map((s, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isPast = idx < currentStepIndex;
            return (
              <Button
                key={s.step}
                type="button"
                onClick={() => onSelectStep(idx)}
                aria-label={`跳到第 ${s.step} 步`}
                aria-current={isCurrent ? "step" : undefined}
                className={`group flex min-w-[92px] flex-1 cursor-pointer items-center gap-2 rounded-xl border px-2.5 py-1.5 text-left transition ${
                  isCurrent
                    ? "border-[var(--accent-coral)] bg-[var(--accent-coral-soft)]"
                    : isPast
                      ? "border-[var(--border-subtle)] bg-[var(--bg-surface-muted)]/60"
                      : "border-transparent hover:border-[var(--border-subtle)]"
                }`}
              >
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold ${
                    isCurrent
                      ? "bg-[var(--accent-coral)] text-white"
                      : isPast
                        ? "bg-[var(--accent-teal)] text-white"
                        : "bg-[var(--bg-surface-muted)] text-[var(--ink-muted)]"
                  }`}
                >
                  {s.step}
                </span>
                <span
                  className={`truncate text-xs ${
                    isCurrent
                      ? "font-bold text-[var(--ink-primary)]"
                      : "font-medium text-[var(--ink-secondary)]"
                  }`}
                >
                  {s.tag}
                </span>
              </Button>
            );
          })}
        </div>

        <Button
          type="button"
          aria-label="步骤条继续推演"
          disabled={currentStepIndex >= steps.length - 1}
          onClick={() =>
            onSelectStep(Math.min(steps.length - 1, currentStepIndex + 1))
          }
          className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] transition hover:border-[var(--border-strong)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
