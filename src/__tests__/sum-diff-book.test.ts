import { describe, expect, it } from "vitest";
import { sumDiffLesson } from "../data/lessons/sumDiff";

describe("二年级和差问题书题", () => {
  it("keeps the supplied problems in book order without inventing later questions", () => {
    const groups=[1,2].map(group=>sumDiffLesson.variants.filter(v=>v.sectionId===`discovery-${group}`));
    expect(groups[0].map(v=>v.questionNo??0)).toEqual([0,1,2,3,4,5,6]);
    expect(groups[1].map(v=>v.questionNo??0)).toEqual([0,1,2,3]);
    expect(groups[0][4].sectionKind).toBe("practice");
  });
  it("shows the independently calculated answers at the final step", () => {
    const results: Record<string,string[]> = {example:["9 支","17 支"],"d1-q1":["9 根","15 根"],"d1-q2":["5 块","8 块"],"d1-q3":["8 本","13 本"],"d1-q4":["10 颗","18 颗"],"d1-q5":["3 根","6 根"],"d1-q6":["8 道","12 道"],"d2-example":["8 岁","12 岁"],"d2-q1":["7 岁","12 岁"],"d2-q2":["9 岁","12 岁"],"d2-q3":["12年后","20岁","26岁"]};
    for(const v of sumDiffLesson.variants){
      const built=v.build({});
      for(const answer of results[v.id]) expect(built.steps.at(-1)?.narration).toContain(answer);
      expect(built.steps[0].activeFormulaIndices).toEqual([]);
      expect(built.steps.slice(1,-1).filter(step=>step.checkpoint).length).toBeGreaterThanOrEqual(2);
      if(v.id!=="d2-q3") {
        const scene=built.steps[0].sceneState;
        expect(scene.kind).toBe("segment-bar");
        if(scene.kind!=="segment-bar") throw new Error("missing bar scene");
        expect(scene.rows.map(row=>row.partLabel)).toEqual(["?","?"]);
      }
    }
  });
});
