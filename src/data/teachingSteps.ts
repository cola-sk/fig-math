import type { LessonStep, StepCheckpoint } from "../types/lesson";

type TeachingStep = Pick<LessonStep, "title" | "narration" | "sceneState"> &
  Partial<Omit<LessonStep, "step" | "title" | "narration" | "sceneState">>;

export function teachingSteps(stages: TeachingStep[]): LessonStep[] {
  return stages.map((stage, index) => ({
    activeFormulaIndices: [],
    liveStats: [],
    tag:
      index === stages.length - 1
        ? "验证与回顾"
        : index === 0
          ? "观察与思考"
          : index === 1
            ? "寻找突破口"
            : index === 2
              ? "转化与追问"
              : "继续推理",
    ...stage,
    step: index + 1,
  }));
}

export function numberCheckpoint(
  question: string,
  answer: number,
  unit: string,
  hint: string,
): StepCheckpoint {
  const choices = answer === 0 ? [0, 1, 2] : [answer - 1, answer, answer + 1];
  const offset = Math.abs(answer) % choices.length;
  const ordered = [...choices.slice(offset), ...choices.slice(0, offset)];
  return {
    question,
    options: ordered.map((value) => `${value}${unit}`),
    correctIndex: ordered.indexOf(answer),
    feedbackCorrect: `想对了，是 ${answer}${unit}！${hint}`,
    feedbackWrong: `再看一看图。${hint}`,
  };
}
