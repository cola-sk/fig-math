import { describe, expect, it } from "vitest";
import {
  EDITION_CATALOG,
  GRADE_CATALOG,
  LESSONS,
  getLessonsByGrade,
} from "../data/lessons";

describe("FigMath curriculum integrity", () => {
  it("contains 33 Olympiad lessons across 10 visual engines", () => {
    expect(LESSONS.length).toBe(33);
    const engines = new Set(LESSONS.map((l) => l.engine));
    expect(engines.size).toBe(10);
  });

  it("supports 数学思维训练（斗半匠） complete Grade 2 TOC (29 lessons)", () => {
    const ed = EDITION_CATALOG.find((e) => e.id === "doubanjiang");
    expect(ed?.ready).toBe(true);
    expect(ed?.name).toContain("斗半匠");
    expect(GRADE_CATALOG.map((g) => g.value)).toEqual([
      "all",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
    ]);
    expect(getLessonsByGrade("2", "doubanjiang").length).toBe(29);
    expect(getLessonsByGrade("1", "doubanjiang").length).toBe(0);
  });

  it("layers every lesson with valid formulas, steps, and checkpoints", () => {
    for (const lesson of LESSONS) {
      expect(lesson.variants.length).toBeGreaterThanOrEqual(2);
      expect(lesson.editionMappings.length).toBeGreaterThanOrEqual(1);
      const hasChallenge = lesson.variants.some((v) => v.tier === "challenge");
      expect(hasChallenge).toBe(true);

      for (const variant of lesson.variants) {
        const builtDefault = variant.build(variant.defaultParams);
        expect(builtDefault.problemStatement.length).toBeGreaterThan(8);
        expect(builtDefault.formulas.length).toBeGreaterThan(0);
        expect(builtDefault.steps.length).toBeGreaterThan(0);

        for (const step of builtDefault.steps) {
          for (const idx of step.activeFormulaIndices) {
            expect(idx).toBeGreaterThanOrEqual(0);
            expect(idx).toBeLessThan(builtDefault.formulas.length);
          }
          if (step.checkpoint) {
            expect(step.checkpoint.correctIndex).toBeGreaterThanOrEqual(0);
            expect(step.checkpoint.correctIndex).toBeLessThan(
              step.checkpoint.options.length,
            );
          }
        }

        const minParams: Record<string, number> = {};
        const maxParams: Record<string, number> = {};
        for (const def of variant.paramDefs) {
          minParams[def.key] = def.min;
          maxParams[def.key] = def.max;
        }
        expect(variant.build(minParams).steps.length).toBeGreaterThan(0);
        expect(variant.build(maxParams).steps.length).toBeGreaterThan(0);
      }
    }
  });
});
