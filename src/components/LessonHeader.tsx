import { Button } from "@ui-sdk/react/button";
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from "@ui-sdk/react/segmented-control";
import { BookOpen, Check, Sparkles, Volume2 } from "lucide-react";
import { TIER_BADGE_MAP, getLessonMetaForEdition } from "../data/lessons";
import type {
  BookSectionKind,
  EditionId,
  MathLesson,
  TierFilter,
} from "../types/lesson";
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

const BOOK_SECTION_META: Record<
  BookSectionKind,
  { label: string; badge: string; toneClass: string }
> = {
  example: {
    label: "小例题大发现",
    badge: "例题",
    toneClass:
      "border-[var(--accent-teal)]/35 bg-[var(--accent-teal-soft)] text-[var(--accent-teal)]",
  },
  warmup: {
    label: "小试牛刀",
    badge: "★ 小试牛刀",
    toneClass:
      "border-[var(--accent-teal)]/30 bg-[var(--accent-teal-soft)] text-[var(--accent-teal)]",
  },
  practice: {
    label: "大显身手",
    badge: "★★ 大显身手",
    toneClass:
      "border-[var(--accent-blue)]/30 bg-[var(--accent-blue-soft)] text-[var(--accent-blue)]",
  },
  challenge: {
    label: "挑战自我",
    badge: "★★★ 挑战自我",
    toneClass:
      "border-[var(--accent-coral-border)] bg-[var(--accent-coral-soft)] text-[var(--accent-coral)]",
  },
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

  const sections = lesson.sections ?? [];
  const hasBookSections = sections.length > 0;
  const activeSection = hasBookSections
    ? sections.find((s) => s.id === activeVariant.sectionId) ?? sections[0]
    : undefined;

  const sectionVariants = activeSection
    ? displayVariants.filter((v) => v.sectionId === activeSection.id)
    : [];
  const activeSectionPool =
    sectionVariants.length > 0
      ? sectionVariants
      : activeSection
        ? lesson.variants.filter((v) => v.sectionId === activeSection.id)
        : [];

  const exampleVariants = activeSectionPool.filter(
    (v) => v.sectionKind === "example",
  );
  const practiceGroups: Array<{
    kind: Exclude<BookSectionKind, "example">;
    items: typeof activeSectionPool;
  }> = (["warmup", "practice", "challenge"] as const)
    .map((kind) => ({
      kind,
      items: activeSectionPool.filter((v) => v.sectionKind === kind),
    }))
    .filter((group) => group.items.length > 0);

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

        {hasBookSections && activeSection ? (
          <SegmentedControl
            aria-label="切换小例题大发现板块"
            value={activeSection.id}
            onValueChange={(nextSectionId) => {
              if (!nextSectionId) return;
              const targetVariant =
                displayVariants.find((v) => v.sectionId === nextSectionId) ??
                lesson.variants.find((v) => v.sectionId === nextSectionId);
              if (targetVariant) {
                onSelectVariant(targetVariant.id);
              }
            }}
          >
            <SegmentedControlIndicator />
            {sections.map((section) => (
              <SegmentedControlItem key={section.id} value={section.id}>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
                  <span>{section.title}</span>
                  {section.pageRange && (
                    <span className="text-[10px] opacity-70">
                      {section.pageRange}
                    </span>
                  )}
                </span>
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        ) : (
          /* Single clean Variant Switcher */
          <SegmentedControl
            aria-label="切换例题与举一反三变式"
            value={activeVariant.id}
            onValueChange={(next) => {
              if (next) onSelectVariant(next);
            }}
          >
            <SegmentedControlIndicator />
            {displayVariants.map((variant) => {
              const done = completedVariants.includes(
                `${lesson.id}:${variant.id}`,
              );
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
        )}
      </div>

      {hasBookSections && activeSection && (
        <div
          className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 shadow-xs space-y-2.5"
          aria-label={`${activeSection.title} 例题与我要练一练导航`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[var(--ink-primary)]">
              <Sparkles
                className="h-3.5 w-3.5 text-[var(--accent-coral)]"
                aria-hidden="true"
              />
              <span>{activeSection.title}</span>
            </span>
            {activeSection.subtitle && (
              <span className="text-xs text-[var(--ink-secondary)]">
                {activeSection.subtitle}
              </span>
            )}
          </div>

          {exampleVariants.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--border-subtle)] pt-2.5">
              <span className="rounded-md border border-[var(--accent-teal)]/35 bg-[var(--accent-teal-soft)] px-2 py-0.5 text-[11px] font-bold text-[var(--accent-teal)]">
                例题
              </span>
              {exampleVariants.map((variant) => {
                const isSelected = variant.id === activeVariant.id;
                const done = completedVariants.includes(
                  `${lesson.id}:${variant.id}`,
                );
                const part = variant.questionPart ? `（${variant.questionPart}）` : "";
                const label = `${activeSection.title} · 例题${part}`;
                return (
                  <Button
                    key={variant.id}
                    aria-label={label}
                    aria-pressed={isSelected}
                    onClick={() => onSelectVariant(variant.id)}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-bold transition ${
                      isSelected
                        ? "border-[var(--accent-coral)] bg-[var(--accent-coral)] text-white shadow-sm ring-2 ring-[var(--accent-coral)]/25"
                        : "border-[var(--border-strong)] bg-[var(--bg-stage)] text-[var(--ink-primary)] hover:border-[var(--accent-coral-border)]"
                    }`}
                  >
                    {done ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <BookOpen className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
                    )}
                    <span>例题讲解{part}</span>
                    {variant.isPlaceholder && (
                      <span className="rounded bg-black/10 px-1.5 py-0.5 text-[10px]">
                        框架占位
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          )}

          {practiceGroups.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--border-subtle)] pt-2.5">
              <span className="text-xs font-extrabold text-[var(--ink-secondary)]">
                我要练一练
              </span>
              {practiceGroups.map((group) => {
                const meta = BOOK_SECTION_META[group.kind];
                return (
                  <div
                    key={group.kind}
                    className="flex flex-wrap items-center gap-1.5"
                  >
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${meta.toneClass}`}
                    >
                      {meta.badge}
                    </span>
                    {group.items.map((variant) => {
                      const isSelected = variant.id === activeVariant.id;
                      const done = completedVariants.includes(
                        `${lesson.id}:${variant.id}`,
                      );
                      const qText = variant.questionNo
                        ? `第 ${variant.questionNo} 题${variant.questionPart ? `（${variant.questionPart}）` : ""}`
                        : variant.modeLabel;
                      const ariaLabel = `${activeSection.title} · ${meta.label} ${qText}`;
                      return (
                        <Button
                          key={variant.id}
                          aria-label={ariaLabel}
                          aria-pressed={isSelected}
                          onClick={() => onSelectVariant(variant.id)}
                          className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                            isSelected
                              ? "border-[var(--accent-coral)] bg-[var(--accent-coral)] text-white shadow-xs"
                              : variant.isPlaceholder
                                ? "border-dashed border-[var(--border-strong)] bg-[var(--bg-stage)] text-[var(--ink-secondary)] hover:border-[var(--accent-coral-border)] hover:text-[var(--ink-primary)]"
                                : "border-[var(--border-subtle)] bg-[var(--bg-stage)] text-[var(--ink-primary)] hover:border-[var(--accent-coral-border)]"
                          }`}
                        >
                          {done && (
                            <Check className="h-3 w-3" aria-hidden="true" />
                          )}
                          <span>{qText}</span>
                        </Button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

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
