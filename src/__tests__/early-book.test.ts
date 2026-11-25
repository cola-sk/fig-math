import { describe, expect, it } from "vitest";
import { busBookLesson, queueBookLesson, stairsBookLesson, treesBookLesson, wellBookLesson } from "../data/lessons/g2EarlyBook";

describe("二年级第2至19页书题", () => {
  const cases = [
    [queueBookLesson, [18,45,14,39,9,19,14,45,49,2]],
    [busBookLesson, [45,50,20,42,13,66,51]],
    [stairsBookLesson, [10,40,63,4,45,63,81,72,7,17]],
    [wellBookLesson, [5,12,2,5,8,3,22]],
    [treesBookLesson, [9,9,5,5,36,8,8]],
  ] as const;
  it.each(cases)("$title：题序、关键结果与思考留白", (lesson, answers) => {
    expect(lesson.variants).toHaveLength(answers.length);
    expect(lesson.variants.map(v=>v.questionNo??0)).toEqual(answers.map((_,i)=>i));
    lesson.variants.forEach((variant,i)=>{
      const built=variant.build({}), quiz=built.steps[2].checkpoint!;
      expect(quiz.options[quiz.correctIndex]).toMatch(new RegExp(`^${answers[i]}(?![0-9])`));
      expect(built.steps[0].activeFormulaIndices).toEqual([]);
      expect(built.steps[1].activeFormulaIndices).toEqual([]);
      expect(built.steps.at(-1)?.activeFormulaIndices).toHaveLength(built.formulas.length);
      const initial=built.steps[0].sceneState;
      if(initial.kind!=="early-book") throw new Error("missing book scene");
      expect(initial.phase).toBe(0);
    });
  });
  it("shows the unstated endpoint-spacing assumption for the flag problem", () => {
    const question=treesBookLesson.variants.find(v=>v.id==="q5")!.build({});
    expect(question.steps.at(-1)?.narration).toContain("题干本身没有明确说明");
    expect(question.steps[1].title).toContain("两端空隙也看成相等");
  });
});
