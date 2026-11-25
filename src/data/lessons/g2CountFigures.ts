import type { MathLesson } from "../../types/lesson";

export const g2CountFiguresLesson: MathLesson = {
  id: "g2-count-figures",
  chapterId: "g2-ordered-thinking",
  chapterTitle: "06. 有序思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.52",
  title: "数图形问题（数三角形）",
  summary: "一个大三角形里切出几块小三角形？数清楚底边被分成了几段，就能秒算出总共有多少个三角形！",
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
      modeLabel: "单层三角形例题",
      bookPart: "A版",
      tier: "base",
      title: "底边有 4 个小三角形，共有几个三角形？",
      subtitle: "按“1块、2块、3块、4块拼成的”依次点亮！",
      defaultParams: { baseCount: 4 },
      paramDefs: [
        { key: "baseCount", label: "单个小三角形个数", min: 2, max: 5, step: 1, unit: "个" },
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
            { id: "cf-1", latex: `${sumExpr} = ${total}\\text{ (个)}`, comment: "底边每一条线段都对应 1 个三角形" },
          ],
          steps: [
            {
              step: 1,
              tag: "1块组成",
              title: `单个小三角形有 ${n} 个`,
              narration: `先数单独 1 块的三角形，涂成橙色，共有 ${n} 个！`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "1块组成", value: `${n} 个`, tone: "coral" },
                { label: "2块拼成", value: `${n - 1} 个` },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "triangles",
                baseCount: n,
                highlightSpan: 1,
                annotation: `1 块单独的三角形：共有 ${n} 个`,
              },
            },
            {
              step: 2,
              tag: "2块拼成",
              title: `由 2 块拼成的三角形有 ${n - 1} 个`,
              narration: `把相邻的 2 块合起来看（青色阴影），从左往右数共有 ${n - 1} 个！`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "1块组成", value: `${n} 个` },
                { label: "2块拼成", value: `${n - 1} 个`, tone: "teal" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "triangles",
                baseCount: n,
                highlightSpan: 2,
                annotation: `2 块拼成的三角形：共有 ${n - 1} 个`,
              },
            },
            {
              step: 3,
              tag: "汇总总数",
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
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "双层三角形拔高",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：中间加一条横线变成两层，共有几个？",
      subtitle: "一层有几个，两层就乘以 2！",
      defaultParams: { baseCount: 3, layers: 2 },
      paramDefs: [
        { key: "baseCount", label: "每层基本块数", min: 2, max: 4, step: 1, unit: "个" },
        { key: "layers", label: "横线分成几层", min: 2, max: 3, step: 1, unit: "层" },
      ],
      build: (params) => {
        const n = params.baseCount ?? 3;
        const layers = params.layers ?? 2;
        const oneLayer = (n * (n + 1)) / 2;
        const total = oneLayer * layers;

        return {
          problemStatement: `如果三角形底边有 ${n} 个基本块，并且从中间横着切成了 ${layers} 层，一共有多少个三角形？`,
          formulas: [
            { id: "cfv-1", latex: `\\text{1层个数} = ${oneLayer}\\text{ (个)}`, comment: "先算上面这一层有几个" },
            { id: "cfv-2", latex: `${oneLayer} \\times ${layers} = ${total}\\text{ (个)}`, comment: "共有几层就乘以几！" },
          ],
          steps: [
            {
              step: 1,
              tag: "分层乘法",
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
                highlightSpan: 1,
                annotation: `每层 ${oneLayer} 个 × ${layers} 层 = ${total} 个`,
              },
            },
          ],
        };
      },
    },
  ],
};
