import { useEffect, useState } from "react";
import { Button } from "@ui-sdk/react/button";
import { Toggle, ToggleIcon } from "@ui-sdk/react/toggle";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Minimize2,
  Sparkles,
  Volume2,
} from "lucide-react";
import { motion } from "motion/react";
import { SceneRenderer } from "../engines/SceneRenderer";
import type {
  FormulaLine,
  LessonStep,
  LessonVariant,
  MathLesson,
} from "../types/lesson";
import { isSpeechSupported, speakChinese } from "../utils/speech";
import { StepNarrativeCard } from "./StepNarrativeCard";
import { FormulaCard } from "./FormulaCard";

interface TeachingStageProps {
  lesson: MathLesson;
  variant: LessonVariant;
  problemStatement: string;
  steps: LessonStep[];
  formulas: FormulaLine[];
  currentStepIndex: number;
  nextLessonTitle?: string;
  onSelectStep: (index: number) => void;
  onNextLesson?: () => void;
  onExit: () => void;
}

export function TeachingStage({
  lesson,
  variant,
  problemStatement,
  steps,
  formulas,
  currentStepIndex,
  nextLessonTitle,
  onSelectStep,
  onNextLesson,
  onExit,
}: TeachingStageProps) {
  const [manualShowFormulas, setManualShowFormulas] = useState(false);

  const clampedIdx = Math.min(Math.max(0, currentStepIndex), steps.length - 1);
  const currentStep = steps[clampedIdx];
  const isLastStep = clampedIdx >= steps.length - 1;
  const shouldShowFormulas = isLastStep || manualShowFormulas;

  useEffect(() => {
    setManualShowFormulas(false);
  }, [lesson.id, variant.id]);

  // Keyboard navigation for classroom / projector / parent-child teaching
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onExit();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onSelectStep(Math.min(steps.length - 1, clampedIdx + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onSelectStep(Math.max(0, clampedIdx - 1));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [clampedIdx, steps.length, onExit, onSelectStep]);

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--bg-page)]">
      {/* Minimal Teaching Header */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 px-4 py-2.5 sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="rounded-lg bg-[var(--accent-coral)] px-2 py-0.5 text-xs font-extrabold text-white shrink-0">
              授课模式
            </span>
            <h1 className="truncate text-base font-extrabold text-[var(--ink-primary)] sm:text-lg">
              {lesson.title} · {variant.modeLabel}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isLastStep && (
              <Toggle
                aria-label="显示算式"
                pressed={manualShowFormulas}
                onPressedChange={setManualShowFormulas}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                  manualShowFormulas
                    ? "border-[var(--accent-coral)] bg-[var(--accent-coral-soft)] text-[var(--accent-coral)]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-stage)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                }`}
              >
                <ToggleIcon>
                  <Calculator className="h-3.5 w-3.5" />
                </ToggleIcon>
                <span>{manualShowFormulas ? "隐藏算式" : "显示算式"}</span>
              </Toggle>
            )}

            <Button
              onClick={onExit}
              aria-label="退出授课模式"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-stage)] px-3 py-1.5 text-xs font-bold text-[var(--ink-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)]"
            >
              <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>退出授课</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Pure Centered Teaching Canvas */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-between gap-4 px-4 py-5 sm:px-8">
        {/* Problem Statement */}
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3 shadow-xs">
          <p className="text-base font-semibold leading-relaxed text-[var(--ink-primary)] sm:text-lg">
            <span className="mr-2 inline-block rounded-md bg-[var(--accent-coral-soft)] px-2 py-0.5 text-xs font-bold text-[var(--accent-coral)] align-middle">
              题目
            </span>
            {problemStatement}
          </p>
          {isSpeechSupported() && (
            <Button
              type="button"
              onClick={() => speakChinese(problemStatement)}
              aria-label="朗读题目"
              className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-stage)] px-2.5 py-1.5 text-xs font-bold text-[var(--ink-secondary)] hover:text-[var(--accent-coral)]"
            >
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>读题</span>
            </Button>
          )}
        </div>

        {/* Large Visual Stage */}
        <div className="mx-auto w-full max-w-[820px]">
          <SceneRenderer scene={currentStep.sceneState} />
        </div>

        <StepNarrativeCard
          key={`${lesson.id}/${variant.id}/${clampedIdx}`}
          step={currentStep}
          totalSteps={steps.length}
          isYoungLearner={lesson.grade <= 2}
          isLastStep={isLastStep}
          nextLessonTitle={nextLessonTitle}
          onPrev={() => onSelectStep(Math.max(0, clampedIdx - 1))}
          onNext={() =>
            onSelectStep(Math.min(steps.length - 1, clampedIdx + 1))
          }
          onNextLesson={onNextLesson ?? onExit}
          showNavigation={false}
        />

        {/* Final Step Formula Reveal (hidden on earlier steps unless toggled) */}
        {shouldShowFormulas && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <FormulaCard
              formulas={formulas}
              activeIndices={
                isLastStep
                  ? formulas.map((_, i) => i)
                  : currentStep.activeFormulaIndices
              }
            />
          </motion.div>
        )}

        {/* Bottom Step Switcher Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <Button
            disabled={clampedIdx === 0}
            onClick={() => onSelectStep(Math.max(0, clampedIdx - 1))}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-bold text-[var(--ink-secondary)] transition hover:border-[var(--border-strong)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>上一步</span>
          </Button>

          <div className="flex items-center gap-2">
            {steps.map((s, idx) => {
              const isCurrent = idx === clampedIdx;
              return (
                <Button
                  key={s.step}
                  type="button"
                  onClick={() => onSelectStep(idx)}
                  aria-label={`跳到第 ${s.step} 步`}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`inline-flex h-9 min-w-[36px] cursor-pointer items-center justify-center rounded-full px-3 font-mono text-xs font-extrabold transition ${
                    isCurrent
                      ? "bg-[var(--accent-coral)] text-white shadow-sm"
                      : "border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  {s.step}
                </Button>
              );
            })}
          </div>

          {!isLastStep ? (
            <Button
              onClick={() =>
                onSelectStep(Math.min(steps.length - 1, clampedIdx + 1))
              }
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[var(--accent-coral)] px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-105"
            >
              <span>下一步</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : onNextLesson && nextLessonTitle ? (
            <Button
              onClick={onNextLesson}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[var(--accent-teal)] px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-105"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>下一讲：{nextLessonTitle}</span>
            </Button>
          ) : (
            <Button
              onClick={onExit}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[var(--accent-teal)] px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-105"
            >
              <span>完成并退出授课</span>
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
