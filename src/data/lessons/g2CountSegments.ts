import type { MathLesson } from "../../types/lesson";

export const g2CountSegmentsLesson: MathLesson = {
  id: "g2-count-segments",
  chapterId: "g2-ordered-thinking",
  chapterTitle: "06. 有序思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.46",
  title: "数线段问题（不重不漏打枪法）",
  summary: "一条直线上有几个点，一共有多少条线段？按照“1段、2段、3段……”有序分类数，再也不会数漏！",
  engine: "count-diagram",
  keywords: ["二年级", "数线段", "有序思维", "分类计数", "打枪法"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "06. 有序思维训练",
      weekLabel: "p.46",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "分类数线段例题",
      bookPart: "A版",
      tier: "base",
      title: "4 个点（3 条基本线段），一共有几条线段？",
      subtitle: "按长度分类：1 小段、2 小段、3 小段",
      defaultParams: { baseCount: 3 },
      paramDefs: [
        { key: "baseCount", label: "基本小线段数量", min: 2, max: 5, step: 1, unit: "段" },
      ],
      build: (params) => {
        const n = params.baseCount ?? 3;
        const total = (n * (n + 1)) / 2;
        const sumExpr = Array.from({ length: n })
          .map((_, i) => n - i)
          .join(" + ");

        return {
          problemStatement: `一条直线上共有 ${n + 1} 个点（分成了 ${n} 条基本小线段）。数一数，图中一共有多少条线段？`,
          formulas: [
            { id: "cs-1", latex: `${sumExpr} = ${total}\\text{ (条)}`, comment: "从基本段数一直加到 1！" },
          ],
          steps: [
            {
              step: 1,
              tag: "数 1 段",
              title: `第 1 类：最短的基本线段有 ${n} 条`,
              narration: `先把所有 1 小段长的线段用红弧线标出来，一共有 ${n} 条！`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "1小段长的", value: `${n} 条`, tone: "coral" },
                { label: "2小段拼成的", value: `${n - 1} 条` },
                { label: "总线段数", value: "?" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "segments",
                baseCount: n,
                highlightSpan: 1,
                annotation: `第 1 类（由 1 小段组成）：共有 ${n} 条`,
              },
            },
            {
              step: 2,
              tag: "数 2 段",
              title: `第 2 类：2 小段拼成的有 ${n - 1} 条`,
              narration: `把相邻的 2 小段拼在一起变成一条更长的线段，向右一格格移动数一数，共有 ${n - 1} 条！`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "1小段长的", value: `${n} 条` },
                { label: "2小段拼成的", value: `${n - 1} 条`, tone: "teal" },
                { label: "总线段数", value: "继续累加" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "segments",
                baseCount: n,
                highlightSpan: 2,
                annotation: `第 2 类（由 2 小段拼成）：共有 ${n - 1} 条`,
              },
            },
            {
              step: 3,
              tag: "有序求和",
              title: `加到最长的 1 条：${sumExpr} = ${total} 条！`,
              narration: `每一类依次少 1 条，直到最长的整条线段（1 条）。全部加起来：${sumExpr} = ${total} 条！`,
              tipTitle: "数线段万能公式",
              tipBody: "先数有 n 条基本小线段，总数就是：n + (n-1) + … + 1！",
              activeFormulaIndices: [0],
              liveStats: [
                { label: "基本小线段", value: `${n} 条` },
                { label: "算式", value: sumExpr },
                { label: "总线段数", value: `${total} 条`, tone: "coral" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "segments",
                baseCount: n,
                highlightSpan: n,
                annotation: `最长整条（1 条）+ 前面各类 = 共 ${total} 条！`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "火车票种数",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：5 个火车站单程要准备几种车票？",
      subtitle: "每两个站之间就像一条线段！",
      defaultParams: { stations: 5 },
      paramDefs: [
        { key: "stations", label: "火车站数量", min: 4, max: 6, step: 1, unit: "个" },
      ],
      build: (params) => {
        const st = params.stations ?? 5;
        const segs = st - 1;
        const total = (segs * (segs + 1)) / 2;
        const expr = Array.from({ length: segs })
          .map((_, i) => segs - i)
          .join(" + ");

        return {
          problemStatement: `一列火车从起点到终点共停靠 ${st} 个车站。铁路局需要为这趟车准备多少种不同的单程车票？`,
          formulas: [
            { id: "csv-1", latex: `${st} - 1 = ${segs}\\text{ (段)}`, comment: `${st} 个站有 ${segs} 段基本区间` },
            { id: "csv-2", latex: `${expr} = ${total}\\text{ (种)}`, comment: "每条线段对应 1 种单程票" },
          ],
          steps: [
            {
              step: 1,
              tag: "模型转化",
              title: `${st} 个车站 = ${st} 个点，共有 ${total} 种车票！`,
              narration: `把 ${st} 个车站画成一条线上的 ${st} 个点，两站之间就是一条线段！${segs} 段基本线段一共有 ${expr} = ${total} 种单程车票。`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "车站点数", value: `${st} 个` },
                { label: "基本区间", value: `${segs} 段` },
                { label: "单程票种数", value: `${total} 种`, tone: "coral" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "segments",
                baseCount: segs,
                highlightSpan: 1,
                annotation: `${st} 个站（${segs} 段区间）→ 共 ${total} 种单程票`,
              },
            },
          ],
        };
      },
    },
  ],
};
