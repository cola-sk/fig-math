import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";

export const g2HalfProblemLesson: MathLesson = {
  id: "g2-half-problem",
  chapterId: "g2-reverse-thinking",
  chapterTitle: "08. 逆向思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.77",
  title: "一半问题（画线段图倒推还原）",
  summary: "吃掉一半、用去一半还多几，顺着想容易绕晕！从最后剩下的那一段出发，画线段图倒着推回去最清楚！",
  engine: "segment-bar",
  keywords: ["二年级", "一半问题", "倒推法", "线段图", "逆向思维"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "08. 逆向思维训练",
      weekLabel: "p.77",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 用去一半还多几",
      bookPart: "A版",
      tier: "base",
      title: "一捆电线，先用去一半，又用去 2 米，还剩 6 米，原来长多少米？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {
        leftMeters: 6,
        extraUsed: 2,
      },
      paramDefs: [
        { key: "leftMeters", label: "最后还剩", min: 3, max: 15, step: 1, unit: "米" },
        { key: "extraUsed", label: "又多用去", min: 1, max: 8, step: 1, unit: "米" },
      ],
      build: (params) => {
        const left = params.leftMeters ?? 6;
        const extra = params.extraUsed ?? 2;
        const half = left + extra;
        const total = half * 2;
        return {
          problemStatement: `一捆电线，工人叔叔第一次用去全长的一半，第二次又用去 ${extra} 米，最后还剩 ${left} 米。这捆电线原来一共有多少米？`,
          formulas: [
            { id: "hf-1", latex: `\\text{全长的一半} = ${left} + ${extra} = ${half}\\text{ (米)}`, comment: "把多用掉的加回来，凑成完整一半" },
            { id: "hf-2", latex: `\\text{原来全长} = ${half} \\times 2 = ${total}\\text{ (米)}`, comment: "两个一半合起来就是总长" },
          ],
          steps: teachingSteps([
{ title: `从最后剩下的开始，能倒着找回吗？`, narration: `先用去一半，又用去 ${extra} 米，剩 ${left} 米。先指出最后剩下的是哪一段。`, sceneState: { kind: "segment-bar", rows: [{ id: "half", label: `最后剩下`, color: "teal", parts: 1, partLabel: `剩 ${left} 米`, extraValue: extra, extraLabel: `+${extra} 米`, extraState: "highlighted", visualTotalRatio: 0.8 }], annotation: `从剩下的出发，倒着还原` }, activeFormulaIndices: [] },
{ title: `怎样先找出真正的一半？`, narration: `把后来用去的 ${extra} 米放回来，它和剩下的 ${left} 米合起来，正好是一半。有多少米？`, sceneState: { kind: "segment-bar", rows: [{ id: "half", label: `还原一半`, color: "teal", parts: 1, partLabel: `剩 ${left} 米`, extraValue: extra, extraLabel: `+${extra} 米`, extraState: "highlighted", visualTotalRatio: 0.8 }], annotation: `从剩下的出发，倒着还原` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`真正的一半是多少？`, half, ` 米`, `还原一半后，才能找全长。`) },
{ title: `一半找到了，原来是多少？`, narration: `一半是 ${half} 米，两份同样长的一半合起来，原来全长是多少米？`, sceneState: { kind: "segment-bar", rows: [{ id: "full", label: "原来", color: "coral", parts: 2, partLabel: `${half} 米`, visualTotalRatio: 0.9 }], annotation: `两个一半合成全部：?` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`原来是多少？`, total, ` 米`, `两个同样的一半合起来才是全部。`) },
{ tag: `验证与回顾`, title: `两个一半合起来 = ${half} × 2 = ${total} 米`, narration: `既然一半是 ${half} 米，那么整捆电线就是 ${half} + ${half} = ${total} 米！检验一下：${total} 的一半是 ${half}，再用去 ${extra} 米，正好剩 ${left} 米！`, tipTitle: "一半问题口诀", tipBody: `先把真正一半找回来，再把两个一半合起来。`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "一半长度", value: `${half} 米` },
                { label: "原来全长", value: `${total} 米`, tone: "teal" },
              ], sceneState: {
                kind: "segment-bar",
                rows: [
                  {
                    id: "wire-full",
                    label: "原来全长",
                    color: "teal",
                    parts: 2,
                    partLabel: `${half}米`,
                    visualTotalRatio: 1,
                  },
                ],
                totalBrace: { label: `一共 ${total} 米`, state: "solved" },
                annotation: `${half} × 2 = ${total} 米，倒推一次做对！`,
              } }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 用去一半少几",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：吃掉一半少 2 颗糖，还剩 10 颗，原来有几颗？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `盒子里有一些糖果，小宇吃掉了总数的一半少 2 颗，盒子里还剩 10 颗。请问盒子里原来有多少颗糖果？`,
        formulas: [
          { id: "hf-3", latex: `\\text{总数的一半} = 10 - 2 = 8\\text{ (颗)}`, comment: "少吃了 2 颗，说明剩下的多出 2 颗" },
          { id: "hf-4", latex: `\\text{原来总数} = 8 \\times 2 = 16\\text{ (颗)}`, comment: "两个一半就是 16 颗" },
        ],
        steps: teachingSteps([
{ title: `从最后剩下的开始，能倒着找回吗？`, narration: `吃掉一半少 2 颗，剩下 10 颗。少吃的糖还留在盒子里，剩下的是正好一半吗？`, sceneState: { kind: "segment-bar", rows: [{ id: "half", label: `最后剩下`, color: "teal", parts: 1, partLabel: `剩 10 颗`, extraValue: 0, extraLabel: `+少吃的 2 颗`, extraState: "highlighted", visualTotalRatio: 0.8 }], annotation: `从剩下的出发，倒着还原` }, activeFormulaIndices: [] },
{ title: `怎样先找出真正的一半？`, narration: `剩下 10 颗里，多留了少吃的 2 颗。把多留的拿开，真正的一半有几颗？`, sceneState: { kind: "segment-bar", rows: [{ id: "half", label: `还原一半`, color: "teal", parts: 1, partLabel: `一半 ? 颗`, extraValue: 2, extraLabel: `+少吃的 2 颗`, extraState: "highlighted", visualTotalRatio: 0.8 }], annotation: `从剩下的出发，倒着还原` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`真正的一半是多少？`, 8, ` 颗`, `还原一半后，才能找全长。`) },
{ title: `一半找到了，原来是多少？`, narration: `一半是 8 颗，两个一半合起来是多少颗？先算，再用吃糖的经过检查。`, sceneState: { kind: "segment-bar", rows: [{ id: "full", label: "原来", color: "coral", parts: 2, partLabel: `8 颗`, visualTotalRatio: 0.9 }], annotation: `两个一半合成全部：?` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`原来是多少？`, 16, ` 颗`, `两个同样的一半合起来才是全部。`) },
{ tag: `验证与回顾`, title: "原来一共有 8 × 2 = 16 颗", narration: `一半是 8 颗，原来就是 8 × 2 = 16 颗！验证一下：16 颗的一半是 8 颗，少吃 2 颗就是吃了 6 颗，16 - 6 = 10 颗，完全正确！`, activeFormulaIndices: [0, 1], liveStats: [
              { label: "原来总数", value: "16 颗", tone: "teal" },
            ], sceneState: {
              kind: "segment-bar",
              rows: [
                {
                  id: "candy-full",
                  label: "原来总数",
                  color: "coral",
                  parts: 2,
                  partLabel: "8颗",
                  visualTotalRatio: 1,
                },
              ],
              totalBrace: { label: "一共 16 颗", state: "solved" },
              annotation: "验证：吃 6 颗剩 10 颗，8 × 2 = 16 颗！",
            }, tipBody: `先把真正一半找回来，再把两个一半合起来。` }
]),
      }),
    },
  ],
};
