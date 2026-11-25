import { teachingSteps, numberCheckpoint } from "../teachingSteps";
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
      modeLabel: "基础例题 · 分类数线段例题",
      bookPart: "A版",
      tier: "base",
      title: "4 个点（3 条基本线段），一共有几条线段？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
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
          steps: teachingSteps([
{ title: `图中只有最小的线段吗？`, narration: `先看整幅图。不只数单独的小线段，相邻的几块拼起来，能不能组成更大的线段？`, sceneState: { kind: "count-diagram", mode: `segments`, baseCount: n, highlightSpan: 0, annotation: `按大小分类，不重不漏` }, activeFormulaIndices: [] },
{ title: `先数最小的一类，有多少条？`, narration: `从左往右，按同样大小依次找。先把每条最小的线段数一遍，再想想下一类该怎么找。`, sceneState: { kind: "count-diagram", mode: `segments`, baseCount: n, highlightSpan: 1, annotation: `按大小分类，不重不漏` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`最小的线段有多少条？`, n, ` 条`, `从左往右依次数，每个位置只数一次。`) },
{ title: `两个、三个拼起来的，也都找齐了吗？`, narration: `最小的有 ${n} 条。接着数两块拼成的、三块拼成的，一直数到整幅。每类依次是 ${sumExpr}，全部合起来是多少？`, sceneState: { kind: "count-diagram", mode: `segments`, baseCount: n, highlightSpan: 2, annotation: `按大小分类，不重不漏` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`图中一共有多少条线段？`, total, ` 条`, `每类比前一类少一个，一直加到最大的一个。`) },
{ tag: `验证与回顾`, title: `加到最长的 1 条：${sumExpr} = ${total} 条！`, narration: `每一类依次少 1 条，直到最长的整条线段（1 条）。全部加起来：${sumExpr} = ${total} 条！`, tipTitle: "数线段万能公式", tipBody: `小的先数，大的再找，按类相加不漏掉。`, activeFormulaIndices: [0], liveStats: [
                { label: "基本小线段", value: `${n} 条` },
                { label: "算式", value: sumExpr },
                { label: "总线段数", value: `${total} 条`, tone: "coral" },
              ], sceneState: {
                kind: "count-diagram",
                mode: "segments",
                baseCount: n,
                highlightSpan: n,
                annotation: `最长整条（1 条）+ 前面各类 = 共 ${total} 条！`,
              } }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 火车票种数",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：5 个火车站单程要准备几种车票？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
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
          steps: teachingSteps([
{ title: `一张车票要确定哪两个站？`, narration: `这趟车只从起点开向终点，途中停靠 ${st} 个站。先想一想：出发站和到达站换了，车票是否也不同？`, sceneState: { kind: "count-diagram", mode: "segments", baseCount: segs, highlightSpan: 0, annotation: `只考虑沿列车前进方向的车票` }, activeFormulaIndices: [] },
{ title: `固定第一个站出发，可以到几个站？`, narration: `从第一个站出发，后面的站都能到。再从第二个站出发，可到的站会多一个还是少一个？`, sceneState: { kind: "count-diagram", mode: "segments", baseCount: segs, highlightSpan: 1, annotation: `一段路对应一张起终点确定的车票` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`从第一个站出发，有几种到达站？`, segs, ` 种`, `不能原地到达，只能去后面的站。`) },
{ title: `把各个出发站的车票合起来，有几种？`, narration: `第一个站可到 ${segs} 个站。后面每换一个出发站，就少一个到达站，共需相加 ${expr}。请自己算总数。`, sceneState: { kind: "count-diagram", mode: "segments", baseCount: segs, highlightSpan: 2, annotation: `各站出发的种数逐次减少` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`沿这趟车前进方向，共需几种车票？`, total, ` 种`, `按出发站分类，把每一类相加。`) },
{ tag: `验证与回顾`, title: `${st} 个车站 = ${st} 个点，共有 ${total} 种车票！`, narration: `把 ${st} 个车站画成一条线上的 ${st} 个点，两站之间就是一条线段！${segs} 段基本线段一共有 ${expr} = ${total} 种单程车票。`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "车站点数", value: `${st} 个` },
                { label: "基本区间", value: `${segs} 段` },
                { label: "单程票种数", value: `${total} 种`, tone: "coral" },
              ], sceneState: {
                kind: "count-diagram",
                mode: "segments",
                baseCount: segs,
                highlightSpan: 1,
                annotation: `${st} 个站（${segs} 段区间）→ 共 ${total} 种单程票`,
              }, tipBody: `先定出发站，再选到达站，只向前数不回头。` }
]),
        };
      },
    },
  ],
};
