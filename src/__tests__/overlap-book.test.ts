import { describe, expect, it } from "vitest";
import { g2VennOverlapLesson } from "../data/lessons/g2VennOverlap";

describe("二年级重叠问题书题", () => {
  it("keeps two ordered sets of an example and six exercises", () => {
    expect(g2VennOverlapLesson.variants).toHaveLength(14);
    for (const group of [1, 2]) {
      const questions = g2VennOverlapLesson.variants.filter((v) => v.sectionId === `discovery-${group}`);
      expect(questions.map((v) => v.questionNo ?? 0)).toEqual([0, 1, 2, 3, 4, 5, 6]);
      expect(questions[0].sectionKind).toBe("example");
      expect(questions[6].sectionKind).toBe("challenge");
      expect(questions.every((v) => !v.isPlaceholder)).toBe(true);
    }
  });

  it("reveals the verified answers after both thinking pauses", () => {
    const expected = [40, 19, 29, 44, 48, 25, 12, 20, 24, 36, 12, 12, 35, 5];
    g2VennOverlapLesson.variants.forEach((v, i) => {
      const built = v.build({});
      expect(built.steps[0].activeFormulaIndices).toEqual([]);
      expect(built.steps[1].checkpoint).toBeDefined();
      const quiz = built.steps[2].checkpoint!;
      expect(quiz.options[quiz.correctIndex]).toMatch(new RegExp(`^${expected[i]}(?![0-9])`));
      expect(built.steps.at(-1)?.narration).toContain(String(expected[i]));
    });
  });
});
