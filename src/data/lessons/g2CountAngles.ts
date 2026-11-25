import { teachingSteps, numberCheckpoint } from "../teachingSteps";
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
      modeLabel: "基础例题 · 数角例题",
      bookPart: "A版",
      tier: "base",
      title: "4 条射线（3 个基本小角），共有几个角？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { baseCount: 3 },
      paramDefs: [
        {
          key: "baseCount",
          label: "基本小角个数",
          min: 2,
          max: 5,
          step: 1,
          unit: "个",
        },
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
            {
              id: "ca-1",
              latex: `${sumExpr} = ${total}\\text{ (个)}`,
              comment: "从基本角个数一直加到 1！",
            },
          ],
          steps: teachingSteps([
            {
              title: `图中只有最小的角吗？`,
              narration: `先看整幅图。不只数单独的小角，相邻的几块拼起来，能不能组成更大的角？`,
              sceneState: {
                kind: "count-diagram",
                mode: `angles`,
                baseCount: n,
                highlightSpan: 0,
                annotation: `按大小分类，不重不漏`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `先数最小的一类，有多少个？`,
              narration: `从左往右，按同样大小依次找。先把每个最小的角数一遍，再想想下一类该怎么找。`,
              sceneState: {
                kind: "count-diagram",
                mode: `angles`,
                baseCount: n,
                highlightSpan: 1,
                annotation: `按大小分类，不重不漏`,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `最小的角有多少个？`,
                n,
                ` 个`,
                `从左往右依次数，每个位置只数一次。`,
              ),
            },
            {
              title: `两个、三个拼起来的，也都找齐了吗？`,
              narration: `最小的有 ${n} 个。接着数两块拼成的、三块拼成的，一直数到整幅。每类依次是 ${sumExpr}，全部合起来是多少？`,
              sceneState: {
                kind: "count-diagram",
                mode: `angles`,
                baseCount: n,
                highlightSpan: 2,
                annotation: `按大小分类，不重不漏`,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `图中一共有多少个角？`,
                total,
                ` 个`,
                `每类比前一类少一个，一直加到最大的一个。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `2 个拼、3 个拼……一共 ${sumExpr} = ${total} 个角！`,
              narration: `把相邻的小角拼成大角，每一档少 1 个，全部加起来就是 ${sumExpr} = ${total} 个角！`,
              tipTitle: "数角 = 数线段",
              tipBody: `小的先数，大的再找，按类相加不漏掉。`,
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
          ]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 多加1条射线",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：再多画 1 条射线，会多出几个角？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { oldRays: 4 },
      paramDefs: [
        {
          key: "oldRays",
          label: "原来射线数量",
          min: 3,
          max: 5,
          step: 1,
          unit: "条",
        },
      ],
      build: (params) => {
        const oldRays = params.oldRays ?? 4;
        const oldAngles = ((oldRays - 1) * oldRays) / 2;
        const newAngles = (oldRays * (oldRays + 1)) / 2;
        const added = oldRays;
        return {
          problemStatement: `原来有 ${oldRays} 条射线（共有 ${oldAngles} 个角），现在从顶点 O 再多画 1 条射线，一共会多出几个角？`,
          formulas: [
            {
              id: "cav-1",
              latex: `\\text{新多出的角} = \\text{原来的射线数} = ${added}\\text{ (个)}`,
              comment: "新射线与原来每条射线各配成1个角",
            },
            {
              id: "cav-2",
              latex: `${oldAngles} + ${added} = ${newAngles}\\text{ (个)}`,
              comment: "现在的总角数",
            },
          ],
          steps: teachingSteps([
            {
              title: `多一条射线，会只多一个角吗？`,
              narration: `原有 ${oldRays} 条射线。在扇形外侧再画一条，新射线能和原来的哪些射线围成角？`,
              sceneState: {
                kind: "count-diagram",
                mode: "angles",
                baseCount: oldRays - 1,
                highlightSpan: 0,
                annotation: `新射线画在原有扇形外侧`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `固定新射线，和原来的射线一条条配对`,
              narration: `新射线和原来的第一条能围成一个角，和第二条也能。每条旧射线都试一遍，会有多少个新角？`,
              sceneState: {
                kind: "count-diagram",
                mode: "angles",
                baseCount: oldRays,
                highlightSpan: 1,
                annotation: `新射线画在原有扇形外侧`,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `一共多出几个角？`,
                added,
                ` 个`,
                `每条旧射线都和新射线配成一个新角。`,
              ),
            },
            {
              title: `新增的找齐了，现在总共有几个角？`,
              narration: `多出了 ${added} 个角，原有 ${oldAngles} 个角。两部分有没有重复？合起来算一算。`,
              sceneState: {
                kind: "count-diagram",
                mode: "angles",
                baseCount: oldRays,
                highlightSpan: 2,
                annotation: `新射线画在原有扇形外侧`,
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `现在共有几个角？`,
                newAngles,
                ` 个`,
                `旧角保留，再加上包含新射线的角。`,
              ),
            },
            {
              tag: `验证与回顾`,
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
              tipBody: `新线配旧线，一条配一个；旧角加新角，总数就找全。`,
            },
          ]),
        };
      },
    },
  ],
};
