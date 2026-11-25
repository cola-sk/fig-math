import { describe, expect, it } from "vitest";
import { g2FastCalcLesson } from "../data/lessons/g2FastCalc";

describe("二年级简便计算书题", () => {
  it("preserves every example and exercise in book order", () => {
    const variants = g2FastCalcLesson.variants;
    expect(variants).toHaveLength(19);
    expect(variants.map((v) => [v.questionNo ?? 0, v.questionPart ?? 0])).toEqual([
      [0,1], [0,2], [1,1], [1,2], [1,3], [1,4], [2,1], [2,2], [2,3], [2,4],
      [3,1], [3,2], [4,1], [4,2], [4,3], [4,4], [5,0], [6,0], [7,0],
    ]);
    const expected = [115, 63, 164, 145, 36, 85, 168, 278, 98, 99, 26, 47, 120, 110, 50, 70, 300, 1110, 11118];
    variants.forEach((variant, i) => {
      const built = variant.build({});
      const quiz = built.steps[2].checkpoint!;
      expect(quiz.options[quiz.correctIndex]).toBe(String(expected[i]));
      expect(built.steps.at(-1)?.narration).toContain(String(expected[i]));
      expect(built.steps[0].activeFormulaIndices).toEqual([]);
      expect(built.steps[1].activeFormulaIndices).toEqual([]);
      expect(built.steps[1].checkpoint).toBeDefined();
    });
  });
});
