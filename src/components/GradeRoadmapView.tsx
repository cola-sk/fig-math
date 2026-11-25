import { ArrowRight, BookOpen, Layers, Sparkles } from "lucide-react";
import type { GradeMeta } from "../data/lessons";
import type { GradeFilter } from "../types/lesson";

interface GradeRoadmapViewProps {
  gradeMeta: GradeMeta;
  onSelectGrade: (grade: GradeFilter) => void;
}

export function GradeRoadmapView({
  gradeMeta,
  onSelectGrade,
}: GradeRoadmapViewProps) {
  return (
    <div className="mx-auto max-w-3xl py-6">
      <div className="fig-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-coral-soft)] text-[var(--accent-coral)]">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[var(--ink-primary)]">
                  {gradeMeta.label}奥数举一反三
                </h1>
                <span className="rounded-full border border-[var(--accent-coral-border)] bg-[var(--accent-coral-soft)] px-2.5 py-0.5 text-xs font-bold text-[var(--accent-coral)]">
                  专题待制作
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--ink-secondary)]">
                {gradeMeta.tagline}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-stage)] p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[var(--ink-secondary)]">
            <Layers className="h-4 w-4 text-[var(--accent-teal)]" aria-hidden="true" />
            <span>{gradeMeta.label}核心规划专题</span>
          </div>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {gradeMeta.plannedTopics.map((topic, idx) => (
              <li
                key={topic}
                className="flex items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-sm font-medium text-[var(--ink-primary)]"
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--bg-surface-muted)] font-mono text-xs font-bold text-[var(--ink-secondary)]">
                  {idx + 1}
                </span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => onSelectGrade("all")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--accent-coral)] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-105"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>查看全部已上线专题</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onSelectGrade("2")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--ink-primary)] transition hover:border-[var(--border-strong)]"
          >
            先看二年级动图（3 讲）
          </button>
          <button
            type="button"
            onClick={() => onSelectGrade("3")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--ink-primary)] transition hover:border-[var(--border-strong)]"
          >
            三年级（4 讲）
          </button>
        </div>
      </div>
    </div>
  );
}
