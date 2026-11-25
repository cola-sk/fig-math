import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";
export const g2CountFiguresLesson: MathLesson = {
  id: "g2-count-figures",
  chapterId: "g2-ordered-thinking",
  chapterTitle: "06. 有序思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.52",
  title: "数图形问题（数三角形）",
  summary:
    "一个大三角形里切出几块小三角形？数清楚底边被分成了几段，就能秒算出总共有多少个三角形！",
  engine: "count-diagram",
  keywords: ["二年级", "数图形", "数三角形", "有序思维"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "06. 有序思维训练",
      weekLabel: "p.52",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 单层三角形例题",
      bookPart: "A版",
      tier: "base",
      title: "底边有 4 个小三角形，共有几个三角形？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { baseCount: 4 },
      paramDefs: [
        {
          key: "baseCount",
          label: "单个小三角形个数",
          min: 2,
          max: 5,
          step: 1,
          unit: "个",
        },
      ],
      build: (params) => {
        const n = params.baseCount ?? 4;
        const total = (n * (n + 1)) / 2;
        const sumExpr = Array.from({ length: n })
          .map((_, i) => n - i)
          .join(" + ");
        return {
          problemStatement: `下图是一个大三角形，从顶点向底边连了几条线，把底边分成了 ${n} 个独立的小三角形。请问图中一共有多少个三角形？`,
          formulas: [
            {
              id: "cf-1",
              latex: `${sumExpr} = ${total}\\text{ (个)}`,
              comment: "底边每一条线段都对应 1 个三角形",
            },
          ],
          steps: teachingSteps([
            {
              title: `图中只有最小的三角形吗？`,
              narration: `先看整幅图。不只数单独的小三角形，相邻的几块拼起来，能不能组成更大的三角形？`,
              sceneState: {
                kind: "count-diagram",
                mode: `triangles`,
                baseCount: n,
                highlightSpan: 0,
                annotation: `按大小分类，不重不漏`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `先数最小的一类，有多少个？`,
              narration: `从左往右，按同样大小依次找。先把每个最小的三角形数一遍，再想想下一类该怎么找。`,
              sceneState: {
                kind: "count-diagram",
                mode: `triangles`,
                baseCount: n,
                highlightSpan: 1,
                annotation: `按大小分类，不重不漏`,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `最小的三角形有多少个？`,
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
                mode: `triangles`,
                baseCount: n,
                highlightSpan: 2,
                annotation: `按大小分类，不重不漏`,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `图中一共有多少个三角形？`,
                total,
                ` 个`,
                `每类比前一类少一个，一直加到最大的一个。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `全部加起来：${sumExpr} = ${total} 个三角形！`,
              narration: `其实底边上的每一条线段都唯一对应一个三角形！所以总数 = ${sumExpr} = ${total} 个！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "算式", value: sumExpr },
                { label: "三角形总数", value: `${total} 个`, tone: "coral" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "triangles",
                baseCount: n,
                highlightSpan: n,
                annotation: `加到最大整块（1 个）= 共 ${total} 个三角形！`,
              },
              tipBody: `小的先数，大的再找，按类相加不漏掉。`,
            },
          ]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 双层三角形拔高",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：中间加一条横线变成两层，共有几个？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { baseCount: 3, layers: 2 },
      paramDefs: [
        {
          key: "baseCount",
          label: "每层基本块数",
          min: 2,
          max: 4,
          step: 1,
          unit: "个",
        },
        {
          key: "layers",
          label: "横线分成几层",
          min: 2,
          max: 3,
          step: 1,
          unit: "层",
        },
      ],
      build: (params) => {
        const n = params.baseCount ?? 3;
        const layers = params.layers ?? 2;
        const oneLayer = (n * (n + 1)) / 2;
        const total = oneLayer * layers;
        return {
          problemStatement: `如果三角形底边有 ${n} 个基本块，并且从中间横着切成了 ${layers} 层，一共有多少个三角形？`,
          formulas: [
            {
              id: "cfv-1",
              latex: `\\text{1层个数} = ${oneLayer}\\text{ (个)}`,
              comment: "先算上面这一层有几个",
            },
            {
              id: "cfv-2",
              latex: `${oneLayer} \\times ${layers} = ${total}\\text{ (个)}`,
              comment: "共有几层就乘以几！",
            },
          ],
          steps: teachingSteps([
            {
              title: `横线分层后，哪些图形仍是三角形？`,
              narration: `从顶点向下的线保持不变，再画平行于底边的横线。每个三角形都要用到顶点，先找最上面那条横线作底的。`,
              sceneState: {
                kind: "count-diagram",
                mode: "triangles",
                baseCount: n,
                highlightSpan: 0,
                triangleLayers: layers,
                annotation: `横线都和底边平行`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `只看一条底线，能找到几个三角形？`,
              narration: `按底边含 1 小段、2 小段，直到 ${n} 小段分类。先数一条底线对应的三角形有几个。`,
              sceneState: {
                kind: "count-diagram",
                mode: "triangles",
                baseCount: n,
                highlightSpan: 1,
                triangleLayers: layers,
                annotation: `横线都和底边平行`,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `同一条底线对应几个三角形？`,
                oneLayer,
                ` 个`,
                `各类依次从基本块数加到 1。`,
              ),
            },
            {
              title: `每条平行底线都能这样数，总共有几个？`,
              narration: `一条底线对应 ${oneLayer} 个三角形。共有 ${layers} 条可作底的横线，它们对应的三角形大小不同。全部合起来有多少个？`,
              sceneState: {
                kind: "count-diagram",
                mode: "triangles",
                baseCount: n,
                highlightSpan: 2,
                triangleLayers: layers,
                annotation: `横线都和底边平行`,
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `全部共有几个三角形？`,
                total,
                ` 个`,
                `每个都用原顶点，按底线分组，组数相同。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `先算 1 层有 ${oneLayer} 个，再乘 ${layers} 层 = ${total} 个`,
              narration: `上面 1 层是标准三角形（${oneLayer} 个），加上下面整层（又套出 ${oneLayer} 个大三角形），所以一共 ${oneLayer} × ${layers} = ${total} 个！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "1层个数", value: `${oneLayer} 个` },
                { label: "层数", value: `${layers} 层` },
                { label: "总三角形数", value: `${total} 个`, tone: "coral" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "triangles",
                baseCount: n,
                highlightSpan: n,
                triangleLayers: layers,
                annotation: `横线都和底边平行`,
              },
              tipBody: `先按底线分好组，每组数清再相加。`,
            },
          ]),
        };
      },
    },
  ],
};
