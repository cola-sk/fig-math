import { describe, expect, it } from "vitest";
import { g2MirrorClockLesson } from "../data/lessons/g2MirrorClock";
import { g2ObserveShapesLesson } from "../data/lessons/g2ObserveShapes";

describe("二年级图形与镜面书题", () => {
  it("保留书中题号及小问顺序", () => {
    expect(g2ObserveShapesLesson.variants.map(v => [v.questionNo ?? 0, v.questionPart ?? 0])).toEqual([[0,0],[1,0],[2,1],[2,2],[3,0],[4,1],[4,2],[4,3],[5,0],[6,0]]);
    expect(g2MirrorClockLesson.variants.map(v => [v.questionNo ?? 0, v.questionPart ?? 0])).toEqual([[0,0],[1,1],[1,2],[2,0],[3,0],[4,0],[5,0]]);
  });
  it("原题答案在揭晓前保持隐藏，钟面反转整张表盘", () => {
    for (const lesson of [g2ObserveShapesLesson,g2MirrorClockLesson]) {
      for (const variant of lesson.variants) {
        const built=variant.build({});
        expect(built.steps).toHaveLength(4);
        expect(built.steps[0].activeFormulaIndices).toEqual([]);
        expect(built.steps[2].checkpoint).toBeDefined();
        const first=built.steps[0].sceneState;
        const last=built.steps[3].sceneState;
        if(first.kind !== "book-visual" || last.kind !== "book-visual") throw new Error("missing book scene");
        expect(first.answerText).toBeUndefined();
        expect(last.answerText).toBeTruthy();
      }
    }
    const mirrorClock=g2MirrorClockLesson.variants.find(v=>v.id==="q4")!.build({}).steps[0].sceneState;
    expect(mirrorClock).toMatchObject({mode:"clock",hour:10,minute:30,mirrorGiven:true});
    const actualClock=g2MirrorClockLesson.variants.find(v=>v.id==="q5")!.build({}).steps[0].sceneState;
    expect(actualClock).toMatchObject({mode:"clock",hour:9,minute:0,mirrorGiven:false});
    const blocks=g2ObserveShapesLesson.variants.find(v=>v.id==="q5")!.build({}).steps.at(-1)!.sceneState;
    expect(blocks).toMatchObject({grid:[[1,1,1],[1,1,1]]});
  });
});
