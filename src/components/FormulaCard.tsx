import katex from "katex";
import { NotebookPen } from "lucide-react";
import type { FormulaLine } from "../types/lesson";

interface FormulaCardProps {
  formulas: FormulaLine[];
  activeIndices: number[];
}

function renderLatex(latex: string): string {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: false,
    });
  } catch {
    return latex;
  }
}

export function FormulaCard({ formulas, activeIndices }: FormulaCardProps) {
  return (
    <section className="fig-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-dashed border-[var(--border-subtle)] bg-[var(--bg-stage)] px-4 py-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[var(--ink-primary)]">
          <NotebookPen className="h-4 w-4 text-[var(--accent-coral)]" aria-hidden="true" />
          <span>算式草稿本</span>
        </div>
        <span className="rounded-full bg-[var(--bg-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--ink-secondary)]">
          跟着画面一步步算
        </span>
      </div>

      <div className="space-y-1.5 p-3">
        {activeIndices.length === 0 && (
          <p className="px-3 py-2 text-sm text-[var(--ink-secondary)]">先看图想一想，算式会在讲解后揭晓。</p>
        )}
        {formulas.map((line, idx) => {
          if (!activeIndices.includes(idx)) return null;
          const isActive = true;
          return (
            <div
              key={line.id}
              className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 transition-colors ${
                isActive
                  ? "border-[var(--accent-coral-border)] bg-[var(--accent-coral-soft)] text-[var(--ink-primary)]"
                  : "border-transparent bg-transparent text-[var(--ink-secondary)]"
              }`}
            >
              <span
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold ${
                  isActive
                    ? "bg-[var(--accent-coral)] text-white"
                    : "bg-[var(--bg-surface-muted)] text-[var(--ink-muted)]"
                }`}
              >
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <div
                  className="overflow-x-auto text-[15px] font-semibold"
                  dangerouslySetInnerHTML={{ __html: renderLatex(line.latex) }}
                />
                {line.comment && (
                  <div className="text-xs font-medium text-[var(--ink-muted)]">
                    {line.comment}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
