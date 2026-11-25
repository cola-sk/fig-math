import type { MathLesson } from "../../types/lesson";

export const g2CountAnglesLesson: MathLesson = {
  id: "g2-count-angles",
  chapterId: "g2-ordered-thinking",
  chapterTitle: "06. 有序思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.49",
  title: "数角问题（扇形里的基本角）",
  summary: "从同一个顶点画出的几条射线组成了多少个角？做法和数线段一模一样！",
  engine: "count-diagram",
  keywords: ["二年级", "数角", "有序思维", "射线", "基本角"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "06. 有序思维训练",
      weekLabel: "p.49",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "数角例题",
      bookPart: "A版",
      tier: "base",
      title: "4 条射线（3 个基本小角），共有几个角？",
      subtitle: "先数单个小角，再数两个拼起来的角、三个拼起来的角",
      defaultParams: { baseCount: 3 },
      paramDefs: [
        { key: "baseCount", label: "基本小角个数", min: 2, max: 5, step: 1, unit: "个" },
      ],
      build: (params) => {
        const n = params.baseCount ?? 3;
        const total = (n * (n + 1)) / 2;
        const sumExpr = Array.from({ length: n })
          .map((_, i) => n - i)
          .join(" + ");

        return {
          problemStatement: `从点 O 出发画了 ${n + 1} 条射线（中间有 ${n} 个基本小角）。数一数，图中一共有多少个角？`,
          formulas: [
            { id: "ca-1", latex: `${sumExpr} = ${total}\\text{ (个)}`, comment: "从基本角个数一直加到 1！" },
          ],
          steps: [
            {
              step: 1,
              tag: "数单个角",
              title: `先数单个的基本小角：${n} 个`,
              narration: `红色弧线标出了最小的 ${n} 个基本小角，它们挨着排成一扇。`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "基本小角", value: `${n} 个`, tone: "coral" },
                { label: "射线数量", value: `${n + 1} 条` },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "angles",
                baseCount: n,
                highlightSpan: 1,
                annotation: `单个基本角有 ${n} 个`,
              },
            },
            {
              step: 2,
              tag: "拼角求和",
              title: `2 个拼、3 个拼……一共 ${sumExpr} = ${total} 个角！`,
              narration: `把相邻的小角拼成大角，每一档少 1 个，全部加起来就是 ${sumExpr} = ${total} 个角！`,
              tipTitle: "数角 = 数线段",
              tipBody: "只要是同一个顶点引出的射线，数角的规律和数线段完全一样！",
              activeFormulaIndices: [0],
              liveStats: [
                { label: "基本小角", value: `${n} 个` },
                { label: "总角数", value: `${total} 个`, tone: "teal" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "angles",
                baseCount: n,
                highlightSpan: 2,
                annotation: `有序累加：${sumExpr} = ${total} 个角`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "多加1条射线",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：再多画 1 条射线，会多出几个角？",
      subtitle: "新射线和原来每一条射线都会组成 1 个新角！",
      defaultParams: { oldRays: 4 },
      paramDefs: [
        { key: "oldRays", label: "原来射线数量", min: 3, max: 5, step: 1, unit: "条" },
      ],
      build: (params) => {
        const oldRays = params.oldRays ?? 4;
        const oldAngles = ((oldRays - 1) * oldRays) / 2;
        const newAngles = (oldRays * (oldRays + 1)) / 2;
        const added = oldRays;

        return {
          problemStatement: `原来有 ${oldRays} 条射线（共有 ${oldAngles} 个角），现在从顶点 O 再多画 1 条射线，一共会多出几个角？`,
          formulas: [
            { id: "cav-1", latex: `\\text{新多出的角} = \\text{原来的射线数} = ${added}\\text{ (个)}`, comment: "新射线与原来每条射线各配成1个角" },
            { id: "cav-2", latex: `${oldAngles} + ${added} = ${newAngles}\\text{ (个)}`, comment: "现在的总角数" },
          ],
          steps: [
            {
              step: 1,
              tag: "握手原理",
              title: `多出 ${added} 个角，总数变成 ${newAngles} 个`,
              narration: `新画的第 ${oldRays + 1} 条射线，会和原来的 ${oldRays} 条射线分别手拉手组成 ${oldRays} 个新角！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "原来角数", value: `${oldAngles} 个` },
                { label: "新多出角", value: `+${added} 个`, tone: "coral" },
                { label: "现在总数", value: `${newAngles} 个`, tone: "teal" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "angles",
                baseCount: oldRays,
                highlightSpan: 1,
                annotation: `新添 1 条射线，多出 ${added} 个新角`,
              },
            },
          ],
        };
      },
    },
  ],
};
