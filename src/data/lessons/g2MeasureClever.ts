import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";

export const g2MeasureCleverLesson: MathLesson = {
  id: "g2-measure-clever",
  chapterId: "g2-divergent-thinking",
  chapterTitle: "10. 发散思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.107",
  title: "巧妙测量（断尺量长度与无刻度尺）",
  summary: "尺子摔断了、没有 0 刻度怎么办？记住“终点刻度 − 起点刻度 = 实际长度”！如果是无刻度尺，还能两两做差量出新长度！",
  engine: "number-line",
  keywords: ["二年级", "巧妙测量", "断尺", "刻度", "发散思维"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "10. 发散思维训练",
      weekLabel: "p.107",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 断尺量铅笔",
      bookPart: "A版",
      tier: "base",
      title: "断尺从 3 厘米开始量，铅笔尖对准 11 厘米，铅笔长几厘米？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {
        startCm: 3,
        endCm: 11,
      },
      paramDefs: [
        { key: "startCm", label: "起点刻度", min: 1, max: 6, step: 1, unit: "cm" },
        { key: "endCm", label: "终点刻度", min: 8, max: 16, step: 1, unit: "cm" },
      ],
      build: (params) => {
        const startCm = params.startCm ?? 3;
        const endCm = Math.max(startCm + 2, params.endCm ?? 11);
        const len = endCm - startCm;
        return {
          problemStatement: `小琪的一把尺子前面断掉了，只剩下从 ${startCm} 厘米开始的刻度。她把铅笔一端对准 ${startCm} 厘米，另一端正好对准 ${endCm} 厘米。这支铅笔长多少厘米？`,
          formulas: [
            { id: "mc-1", latex: `\\text{物体长度} = \\text{终点刻度} - \\text{起点刻度}`, comment: "断尺测量核心公式" },
            { id: "mc-2", latex: `${endCm} - ${startCm} = ${len}\\text{ (厘米)}`, comment: `一共跨越了 ${len} 个 1 厘米` },
          ],
          steps: teachingSteps([
{ title: `铅笔从零刻度开始吗？`, narration: `这把尺子的前面断了，铅笔起点是 ${startCm}，终点是 ${endCm}。只读终点刻度，就一定是铅笔长度吗？`, sceneState: { ...({
                kind: "number-line",
                layout: "line",
                totalLength: endCm + 2,
                unitLabel: "cm",
                markers: [
                  { id: "m-start", posRatio: startCm / (endCm + 2), label: `起点 ${startCm}`, tone: "neutral" },
                  { id: "m-end", posRatio: endCm / (endCm + 2), label: `终点 ${endCm}`, tone: "coral" },
                ],
                highlightGap: { fromRatio: startCm / (endCm + 2), toRatio: endCm / (endCm + 2), label: `? cm` },
              }), highlightGap: { fromRatio: startCm / (endCm + 2), toRatio: endCm / (endCm + 2), label: `? 厘米` } }, activeFormulaIndices: [] },
{ title: `从起点向前走一大格，量到的是多长？`, narration: `尺子相邻两个厘米刻度之间是 1 厘米。先从 ${startCm} 走到 ${startCm+1}，数一格，再照这样数到终点。`, sceneState: { ...({
                kind: "number-line",
                layout: "line",
                totalLength: endCm + 2,
                unitLabel: "cm",
                markers: [
                  { id: "m-start", posRatio: startCm / (endCm + 2), label: `起点 ${startCm}`, tone: "neutral" },
                  { id: "m-end", posRatio: endCm / (endCm + 2), label: `终点 ${endCm}`, tone: "coral" },
                ],
                highlightGap: { fromRatio: startCm / (endCm + 2), toRatio: endCm / (endCm + 2), label: `? cm` },
              }), highlightGap: { fromRatio: startCm / (endCm + 2), toRatio: (startCm + 1) / (endCm + 2), label: `1 厘米` } }, activeFormulaIndices: [] },
{ title: `完整的这一段，实际跨了多少厘米？`, narration: `真正量的是从 ${startCm} 到 ${endCm} 的距离。前面没有放铅笔的部分要去掉，想想该怎样求。`, sceneState: { ...({
                kind: "number-line",
                layout: "line",
                totalLength: endCm + 2,
                unitLabel: "cm",
                markers: [
                  { id: "m-start", posRatio: startCm / (endCm + 2), label: `起点 ${startCm}`, tone: "neutral" },
                  { id: "m-end", posRatio: endCm / (endCm + 2), label: `终点 ${endCm}`, tone: "coral" },
                ],
                highlightGap: { fromRatio: startCm / (endCm + 2), toRatio: endCm / (endCm + 2), label: `? cm` },
              }), highlightGap: { fromRatio: startCm / (endCm + 2), toRatio: endCm / (endCm + 2), label: `? 厘米` } }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`铅笔长多少厘米？`, len, ` 厘米`, `终点刻度减去起点刻度。`) },
{ tag: `验证与回顾`, title: `用终点减起点 → ${endCm} - ${startCm} = ${len} 厘米`, narration: `铅笔长 ${len} 厘米。检验：从起点 ${startCm} 向前量 ${len} 厘米，正好走到 ${endCm}。`, tipTitle: "断尺测量口诀", tipBody: "尺子没从 0 开始别害怕，终点刻度减去起点刻度，就是物体的真实长度！", activeFormulaIndices: [0, 1], liveStats: [
                { label: "列式", value: `${endCm} - ${startCm}` },
                { label: "铅笔长度", value: `${len} 厘米`, tone: "teal" },
              ], sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: endCm + 2,
                unitLabel: "cm",
                markers: [
                  { id: "m-start", posRatio: startCm / (endCm + 2), label: `起点 ${startCm}`, tone: "neutral" },
                  { id: "m-end", posRatio: endCm / (endCm + 2), label: `终点 ${endCm}`, tone: "coral" },
                ],
                highlightGap: { fromRatio: startCm / (endCm + 2), toRatio: endCm / (endCm + 2), label: `实际长 ${len} cm` },
              } }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 一把尺子量出多种长度",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：只有 0、2、5 三个刻度，一次能直接量出几种长度？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `一把神奇的木尺上只有 0 厘米、2 厘米和 5 厘米这三个刻度。用这把尺子一次（不移动尺子）最多能直接量出几种不同的长度？分别是多少？`,
        formulas: [
          { id: "mc-3", latex: `2 - 0 = 2,\\quad 5 - 0 = 5,\\quad 5 - 2 = 3`, comment: "任意两个刻度做差，共 3 种" },
        ],
        steps: teachingSteps([
{ title: `只有三个刻度，物体一定要从零放起吗？`, narration: `尺子上有 0、2、5 三个刻度。只要两端都对齐刻度，就能直接量一段长度。试试挑两个刻度。`, sceneState: { ...({
              kind: "number-line",
              layout: "line",
              totalLength: 6,
              unitLabel: "cm",
              markers: [
                { id: "t0", posRatio: 0, label: "0", tone: "teal" },
                { id: "t2", posRatio: 2 / 6, label: "2", tone: "neutral" },
                { id: "t5", posRatio: 5 / 6, label: "5", tone: "coral" },
              ],
              highlightGap: { fromRatio: 2 / 6, toRatio: 5 / 6, label: "5 - 2 = 3 cm" },
            }), highlightGap: undefined }, activeFormulaIndices: [] },
{ title: `从零开始的两段，分别有多长？`, narration: `0 到 2 可以量 2 厘米，0 到 5 可以量 5 厘米。还有哪两个刻度可以配成一对，量出新的长度？`, sceneState: { ...({
              kind: "number-line",
              layout: "line",
              totalLength: 6,
              unitLabel: "cm",
              markers: [
                { id: "t0", posRatio: 0, label: "0", tone: "teal" },
                { id: "t2", posRatio: 2 / 6, label: "2", tone: "neutral" },
                { id: "t5", posRatio: 5 / 6, label: "5", tone: "coral" },
              ],
              highlightGap: { fromRatio: 2 / 6, toRatio: 5 / 6, label: "5 - 2 = 3 cm" },
            }), highlightGap: { fromRatio: 0/6, toRatio: 2/6, label: `2 厘米` } }, activeFormulaIndices: [] },
{ title: `2 到 5 这段，会带来新长度吗？`, narration: `把物体两端对齐 2 和 5，长度是两刻度的差。算出这一段后，再数一数所有不同的长度。`, sceneState: { ...({
              kind: "number-line",
              layout: "line",
              totalLength: 6,
              unitLabel: "cm",
              markers: [
                { id: "t0", posRatio: 0, label: "0", tone: "teal" },
                { id: "t2", posRatio: 2 / 6, label: "2", tone: "neutral" },
                { id: "t5", posRatio: 5 / 6, label: "5", tone: "coral" },
              ],
              highlightGap: { fromRatio: 2 / 6, toRatio: 5 / 6, label: "5 - 2 = 3 cm" },
            }), highlightGap: { fromRatio: 2/6, toRatio: 5/6, label: `? 厘米` } }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`2 到 5 之间长多少厘米？`, 3, ` 厘米`, `终点减起点，物体不一定要从 0 开始放。`) },
{ tag: `验证与回顾`, title: "能直接量出 2cm、3cm 和 5cm 一共 3 种！", narration: `能直接量出 2、3、5 厘米，共 3 种。按起点列举：从 0 出发量到 2 或 5，从 2 出发量到 5，三对刻度都检查到了。`, activeFormulaIndices: [0], liveStats: [
              { label: "可量出长度", value: "2cm, 3cm, 5cm", tone: "teal" },
              { label: "总计", value: "3 种", tone: "coral" },
            ], sceneState: {
              kind: "number-line",
              layout: "line",
              totalLength: 6,
              unitLabel: "cm",
              markers: [
                { id: "t0", posRatio: 0, label: "0", tone: "teal" },
                { id: "t2", posRatio: 2 / 6, label: "2", tone: "neutral" },
                { id: "t5", posRatio: 5 / 6, label: "5", tone: "coral" },
              ],
              highlightGap: { fromRatio: 0, toRatio: 5 / 6, label: "可量 2cm / 3cm / 5cm" },
            }, tipBody: `两个刻度配一对，终点减起点；相同长度只算一次。` }
]),
      }),
    },
  ],
};
