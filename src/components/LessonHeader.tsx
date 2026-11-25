import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from "@ui-sdk/react/segmented-control";
import { Check, Volume2 } from "lucide-react";
import { TIER_BADGE_MAP, getLessonMetaForEdition } from "../data/lessons";
import type { EditionId, MathLesson, TierFilter } from "../types/lesson";
import { isSpeechSupported, speakChinese } from "../utils/speech";

interface LessonHeaderProps {
  lesson: MathLesson;
  selectedEdition: EditionId;
  activeVariantId: string;
  selectedTier: TierFilter;
  problemStatement: string;
  completedVariants: string[];
  onSelectVariant: (variantId: string) => void;
}

const TONE_PILL_STYLE = {
  teal: "bg-[var(--accent-teal-soft)] text-[var(--accent-teal)] border-[var(--accent-teal)]/30",
  blue: "bg-[var(--accent-blue-soft)] text-[var(--accent-blue)] border-[var(--accent-blue)]/30",
  coral: "bg-[var(--accent-coral-soft)] text-[var(--accent-coral)] border-[var(--accent-coral-border)]",
};

export function LessonHeader({
  lesson,
  selectedEdition,
  activeVariantId,
  selectedTier,
  problemStatement,
  completedVariants,
  onSelectVariant,
}: LessonHeaderProps) {
  const editionMeta = getLessonMetaForEdition(lesson, selectedEdition);
  const isYoungLearner = editionMeta.grade <= 2;

  const visibleVariants =
    selectedTier === "all"
      ? lesson.variants
      : lesson.variants.filter((v) => v.tier === selectedTier);

  const displayVariants =
    visibleVariants.length > 0 ? visibleVariants : lesson.variants;

  const activeVariant =
    lesson.variants.find((v) => v.id === activeVariantId) ?? lesson.variants[0];
  const tierMeta = TIER_BADGE_MAP[activeVariant.tier];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-md bg-[#1e1e1e] px-2 py-0.5 text-[#f7f4ee]">
              {editionMeta.gradeLabel} · {editionMeta.weekLabel}
            </span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${
                TONE_PILL_STYLE[tierMeta.tone]
              }`}
            >
              {tierMeta.stars} {tierMeta.label}
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-[var(--ink-primary)] sm:text-2xl">
            {lesson.title}
          </h1>
        </div>

        {/* Single clean Variant Switcher */}
        <SegmentedControl
          aria-label="切换例题与举一反三变式"
          value={activeVariant.id}
          onValueChange={(next) => {
            if (next) onSelectVariant(next);
          }}
        >
          <SegmentedControlIndicator />
          {displayVariants.map((variant) => {
            const done = completedVariants.includes(`${lesson.id}:${variant.id}`);
            const stars = TIER_BADGE_MAP[variant.tier].stars;
            return (
              <SegmentedControlItem key={variant.id} value={variant.id}>
                <span className="inline-flex items-center gap-1">
                  {done && (
                    <Check
                      className="h-3.5 w-3.5 text-[var(--accent-teal)]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-[10px] opacity-75">{stars}</span>
                  {variant.modeLabel}
                </span>
              </SegmentedControlItem>
            );
          })}
        </SegmentedControl>
      </div>

      {/* Kid-friendly Problem Statement Banner with Read-Aloud Button */}
      <div className="flex items-start justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 shadow-xs">
        <p
          className={`leading-relaxed text-[var(--ink-primary)] font-medium ${
            isYoungLearner ? "text-base sm:text-[17px]" : "text-sm sm:text-[15px]"
          }`}
        >
          <span className="mr-2 inline-block rounded-md bg-[var(--accent-coral-soft)] px-2 py-0.5 text-xs font-bold text-[var(--accent-coral)] align-middle">
            {tierMeta.label}
          </span>
          {problemStatement}
        </p>

        {isSpeechSupported() && (
          <button
            type="button"
            onClick={() => speakChinese(problemStatement)}
            aria-label="朗读这道题目"
            className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-stage)] px-2.5 py-1.5 text-xs font-bold text-[var(--ink-secondary)] transition hover:border-[var(--accent-coral-border)] hover:text-[var(--accent-coral)]"
          >
            <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>读题</span>
          </button>
        )}
      </div>
    </div>
  );
}
