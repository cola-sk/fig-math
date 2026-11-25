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

function parameterCorners(variant: (typeof LESSONS)[number]["variants"][number]) {
  return variant.paramDefs.reduce<Record<string, number>[]>(
    (corners, def) => corners.flatMap((params) => [
      { ...params, [def.key]: def.min },
      { ...params, [def.key]: def.max },
    ]),
    [{ ...variant.defaultParams }],
  );
}

describe("Grade 2 pause, reveal, and arithmetic review", () => {
  for (const lesson of getLessonsByGrade("2")) {
    it(`${lesson.title} keeps every example and variant paced at parameter corners`, () => {
      for (const variant of lesson.variants) {
        for (const params of [variant.defaultParams, ...parameterCorners(variant)]) {
          const built = variant.build(params);
          expect(built.steps.length).toBeGreaterThanOrEqual(4);
          if (variant.tier === "base") expect(built.steps.length).toBeLessThanOrEqual(5);
          expect(built.steps[0].activeFormulaIndices).toEqual([]);
          expect(built.steps[0].title + built.steps[0].narration).toMatch(/[？?]/);
          expect(built.steps.at(-1)?.tipBody).toBeTruthy();
          expect(new Set(built.steps.at(-1)?.activeFormulaIndices).size).toBe(built.formulas.length);
          expect(built.steps.slice(1, -1).some((step) => step.checkpoint)).toBe(true);
          built.steps.forEach((step, index) => {
            expect(step.step).toBe(index + 1);
            if (step.checkpoint) {
              const { options, correctIndex } = step.checkpoint;
              expect(options.length).toBeGreaterThanOrEqual(2);
              expect(options.length).toBeLessThanOrEqual(3);
              expect(new Set(options).size).toBe(options.length);
              expect(options[correctIndex]).toBeTruthy();
              expect(step.activeFormulaIndices.every((formula) => formula >= 0 && formula < built.formulas.length)).toBe(true);
            }
          });
          expect(JSON.stringify(built)).not.toMatch(/NaN|Infinity|undefined/);
        }
      }
    });
  }

  it("continues every bottle exchange round and repays borrowed bottles", () => {
    const variant = LESSONS.find((lesson) => lesson.id === "g2-bottle-exchange")!.variants[0];
    for (const bought of [3, 6, 9, 12]) {
      let empty = bought;
      let drunk = bought;
      while (empty >= 3) { empty -= 2; drunk++; }
      if (empty === 2) drunk++;
      const built = variant.build({ bought });
      expect(built.steps.at(-1)?.liveStats).toContainEqual({ label: "最多喝到", value: `${drunk} 瓶` });
    }
  });

  it("compares well escape days with independent day by day simulation", () => {
    const lesson = LESSONS.find((item) => item.id === "g2-well-climb")!;
    for (const variant of lesson.variants) {
      for (const params of parameterCorners(variant)) {
        const built = variant.build(params);
        const last = built.steps.at(-1)!.sceneState;
        expect(last.kind).toBe("well-climb");
        if (last.kind !== "well-climb") throw new Error("Missing well scene");
        let height = 0;
        let days = 0;
        while (height < last.wellDepth) {
          days++;
          height += last.dayClimb;
          if (height < last.wellDepth) height -= last.nightSlide;
        }
        expect(last.trails.length).toBe(days);
        expect(last.trails.at(-1)?.escaped).toBe(true);
        expect(last.trails.slice(0, -1).every((trail) => !trail.escaped)).toBe(true);
        expect(built.steps.at(-1)?.narration).toContain(`第 ${days} 天`);
      }
    }
  });

  it("minimizes note count against exhaustive dynamic programming", () => {
    const variant = LESSONS.find((lesson) => lesson.id === "g2-money-pay")!.variants[1];
    const min = [0];
    for (let price = 1; price <= 29; price++) {
      min[price] = 1 + Math.min(...[1, 2, 5, 10].filter((coin) => coin <= price).map((coin) => min[price - coin]));
      if (price >= 23) expect(variant.build({ price }).steps.at(-1)?.liveStats).toContainEqual({ label: "最少总张数", value: `${min[price]} 张`, tone: "coral" });
    }
  });

  it("uses exactly one legal seven segment match move", () => {
    const digits: Record<string, string> = { "2": "abdeg", "3": "abcdg", "4": "bcfg", "6": "acdefg", "8": "abcdefg", "+": "hv", "-": "h", "=": "ij" };
    for (const variant of LESSONS.find((lesson) => lesson.id === "g2-matchstick")!.variants) {
      const scene = variant.build({}).steps.at(-1)!.sceneState;
      if (scene.kind !== "balance-puzzle") throw new Error("Missing match scene");
      const positions = (equation: string) => new Set(equation.replaceAll(" ", "").split("").flatMap((digit, index) => digits[digit].split("").map((stick) => `${index}:${stick}`)));
      const before = positions(scene.matchBefore!);
      const after = positions(scene.matchAfter!);
      expect([...before].filter((stick) => !after.has(stick))).toHaveLength(1);
      expect([...after].filter((stick) => !before.has(stick))).toHaveLength(1);
      const [a, operator, b, , result] = scene.matchAfter!.replaceAll(" ", "");
      expect(operator === "+" ? +a + +b : +a - +b).toBe(+result);
    }
  });
});
