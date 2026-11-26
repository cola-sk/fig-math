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
      const built=variant.build({});
      const finalStep=built.steps.find(
        (s)=>s.checkpoint && new RegExp(`^${answers[i]}(?![0-9])`).test(s.checkpoint.options[s.checkpoint.correctIndex]),
      );
      expect(finalStep).toBeDefined();
      expect(built.steps[0].activeFormulaIndices).toEqual([]);
      expect(built.steps[1].activeFormulaIndices).toEqual([]);
      expect(built.steps.at(-1)?.activeFormulaIndices).toHaveLength(built.formulas.length);
      const initial=built.steps[0].sceneState;
      if(initial.kind!=="early-book") throw new Error("missing book scene");
      expect(initial.phase).toBe(0);
    });
  });
  it("shows progressive 5-step cross-to-grid breakdowns for multi-axis queue problems", () => {
    const expected = [
      { id: "q3", middle1: /^13(?![0-9])/, middle2: /^3(?![0-9])/, final: /^39(?![0-9])/ },
      { id: "q7", middle1: /^9(?![0-9])/, middle2: /^5(?![0-9])/, final: /^45(?![0-9])/ },
      { id: "q8", middle1: /^7(?![0-9])/, middle2: /^7(?![0-9])/, final: /^49(?![0-9])/ },
    ];
    for (const spec of expected) {
      const built = queueBookLesson.variants.find((v) => v.id === spec.id)!.build({});
      expect(built.steps).toHaveLength(5);
      expect(built.steps[1].checkpoint!.options[built.steps[1].checkpoint!.correctIndex]).toMatch(spec.middle1);
      expect(built.steps[2].checkpoint!.options[built.steps[2].checkpoint!.correctIndex]).toMatch(spec.middle2);
      expect(built.steps[3].checkpoint!.options[built.steps[3].checkpoint!.correctIndex]).toMatch(spec.final);
      expect(built.steps[2].activeFormulaIndices).toEqual([0]);
      expect(built.steps[3].activeFormulaIndices).toEqual([0, 1]);
    }
  });
  it("shows the unstated endpoint-spacing assumption for the flag problem", () => {
    const question=treesBookLesson.variants.find(v=>v.id==="q5")!.build({});
    expect(question.steps.at(-1)?.narration).toContain("题干本身没有明确说明");
    expect(question.steps[1].title).toContain("两端空隙也看成相等");
  });
  it("enumerates round-by-round steps for <= 5 round well and dance problems", () => {
    const ex = wellBookLesson.variants.find((v) => v.id === "example")!.build({});
    expect(ex.steps.map((s) => s.tag)).toEqual([
      "观察与思考",
      "第 1 天",
      "第 2 天",
      "第 3 天",
      "第 4 天",
      "第 5 天冲顶",
    ]);
    const q1 = wellBookLesson.variants.find((v) => v.id === "q1")!.build({});
    expect(q1.steps).toHaveLength(7);
    const q3 = wellBookLesson.variants.find((v) => v.id === "q3")!.build({});
    expect(q3.steps).toHaveLength(6);
    const q6 = wellBookLesson.variants.find((v) => v.id === "q6")!.build({});
    expect(q6.steps.map((s) => s.tag)).toEqual([
      "观察与思考",
      "第 1 次跳",
      "第 2 次跳",
      "第 3 次跳",
      "第 4 次到达",
      "验证与回顾",
    ]);
    const q4 = wellBookLesson.variants.find((v) => v.id === "q4")!.build({});
    expect(q4.steps).toHaveLength(5);
  });
});
