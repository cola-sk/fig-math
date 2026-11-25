import { useEffect, useState } from "react";
import { Button } from "@ui-sdk/react/button";
import { Field, FieldLabel } from "@ui-sdk/react/field";
import { Radio, RadioGroup, RadioIndicator } from "@ui-sdk/react/radio";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Star,
  Volume2,
} from "lucide-react";
import { motion } from "motion/react";
import type { LessonStep } from "../types/lesson";
import { isSpeechSupported, speakChinese } from "../utils/speech";

interface StepNarrativeCardProps {
  step: LessonStep;
  totalSteps: number;
  isYoungLearner: boolean;
  isLastStep: boolean;
  nextLessonTitle?: string;
  onPrev: () => void;
  onNext: () => void;
  onNextLesson?: () => void;
}

export function StepNarrativeCard({
  step,
  totalSteps,
  isYoungLearner,
  isLastStep,
  nextLessonTitle,
  onPrev,
  onNext,
  onNextLesson,
}: StepNarrativeCardProps) {
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOpt(null);
  }, [step.step, step.title]);

  const checkpoint = step.checkpoint;
  const chosenIdx = selectedOpt !== null ? Number(selectedOpt) : null;
  const isAnsweredCorrect =
    checkpoint && chosenIdx !== null && chosenIdx === checkpoint.correctIndex;

  return (
    <section className="fig-card p-5 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-[var(--ink-muted)]">
          第 {step.step} 步 / 共 {totalSteps} 步
        </span>
        <div className="flex items-center gap-2">
          {isSpeechSupported() && (
            <button
              type="button"
              onClick={() => speakChinese(`${step.title}。${step.narration}`)}
              aria-label="朗读这一步讲解"
              className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-stage)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--ink-secondary)] hover:text-[var(--accent-coral)]"
            >
              <Volume2 className="h-3 w-3" aria-hidden="true" />
              听一听
            </button>
          )}
          <span className="rounded-full bg-[var(--accent-coral-soft)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--accent-coral)]">
            {step.tag}
          </span>
        </div>
      </div>

      <div>
        <h2
          className={`font-extrabold text-[var(--ink-primary)] ${
            isYoungLearner ? "text-[19px] leading-snug" : "text-lg"
          }`}
        >
          {step.title}
        </h2>
        <p
          className={`mt-2 text-[var(--ink-secondary)] ${
            isYoungLearner ? "text-[15.5px] leading-7" : "text-sm leading-relaxed"
          }`}
        >
          {step.narration}
        </p>
      </div>

      {/* Kid-friendly Mnemonic / Tip Callout */}
      {step.tipBody && (
        <div className="rounded-xl border border-[var(--accent-coral-border)] bg-[var(--accent-coral-soft)] p-3.5">
          <div className="flex items-start gap-2.5">
            <Lightbulb
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-coral)]"
              aria-hidden="true"
            />
            <div className={isYoungLearner ? "text-[13.5px] leading-6" : "text-xs leading-relaxed"}>
              <div className="font-bold text-[var(--accent-coral)]">
                {step.tipTitle ?? "举一反三小口诀"}
              </div>
              <div className="mt-0.5 text-[var(--ink-primary)]">
                {step.tipBody}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Checkpoint Quiz with Star Celebration */}
      {checkpoint && (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-stage)] p-3.5 space-y-2.5">
          <Field>
            <div className="flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-[var(--accent-blue)]" aria-hidden="true" />
              <FieldLabel
                className={`font-bold text-[var(--ink-primary)] ${
                  isYoungLearner ? "text-sm" : "text-xs"
                }`}
              >
                小考一下：{checkpoint.question}
              </FieldLabel>
            </div>
            <RadioGroup
              value={selectedOpt}
              onValueChange={(val) => setSelectedOpt(val)}
              className="mt-2.5"
            >
              {checkpoint.options.map((opt, idx) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2.5 font-semibold text-[var(--ink-primary)] transition hover:border-[var(--border-strong)] has-[[data-checked]]:border-[var(--accent-coral)] has-[[data-checked]]:bg-[var(--accent-coral-soft)] ${
                    isYoungLearner ? "text-sm" : "text-xs"
                  }`}
                >
                  <Radio value={String(idx)}>
                    <RadioIndicator />
                  </Radio>
                  <span>{opt}</span>
                </label>
              ))}
            </RadioGroup>
          </Field>

          {chosenIdx !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold leading-relaxed ${
                isAnsweredCorrect
                  ? "bg-[var(--accent-teal-soft)] text-[var(--accent-teal)]"
                  : "bg-[var(--accent-coral-soft)] text-[var(--accent-coral)]"
              }`}
            >
              {isAnsweredCorrect && (
                <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[var(--bg-surface)] px-2 py-0.5 text-[11px] font-extrabold text-[var(--accent-amber)] shadow-xs">
                  <Star className="h-3 w-3 fill-[var(--accent-amber)]" aria-hidden="true" />
                  +1 颗智慧星！
                </span>
              )}
              <div>
                {isAnsweredCorrect
                  ? checkpoint.feedbackCorrect
                  : checkpoint.feedbackWrong}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Chunky Touch-Friendly Step Navigation */}
      <div className="flex items-center gap-2.5 pt-1">
        <Button
          onClick={onPrev}
          disabled={step.step <= 1}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 text-sm font-bold text-[var(--ink-secondary)] transition hover:border-[var(--border-strong)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          上一步
        </Button>

        {!isLastStep ? (
          <Button
            onClick={onNext}
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--accent-coral)] px-5 py-3 text-[15px] font-extrabold text-white shadow-sm transition hover:brightness-105"
          >
            <span>下一步</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button
            onClick={onNextLesson}
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--accent-teal)] px-5 py-3 text-[15px] font-extrabold text-white shadow-sm transition hover:brightness-105"
          >
            {nextLessonTitle ? (
              <>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>下一讲：{nextLessonTitle}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>太棒了，本讲完成！</span>
              </>
            )}
          </Button>
        )}
      </div>
    </section>
  );
}
