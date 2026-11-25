import type { MathLesson } from "../../types/lesson";

export const g2PairingLesson: MathLesson = {
  id: "g2-pairing",
  chapterId: "g2-ordered-thinking",
  chapterTitle: "06. 有序思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.59",
  title: "搭配问题（穿衣连线与乘法原理）",
  summary: "2 件上衣配 3 条裤子有几种穿法？用“连线法”把每件上衣都连向所有裤子，一眼看清为什么用乘法！",
  engine: "combo-visual",
  keywords: ["二年级", "搭配问题", "有序思维", "连线法", "乘法原理"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "06. 有序思维训练",
      weekLabel: "p.59",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "穿衣搭配例题",
      bookPart: "A版",
      tier: "base",
      title: "2 件上衣和 3 条裤子，一共有几种穿法？",
      subtitle: "固定第 1 件上衣连 3 条裤子，第 2 件也连 3 条裤子",
      defaultParams: { tops: 2, bottoms: 3 },
      paramDefs: [
        { key: "tops", label: "上衣件数", min: 2, max: 3, step: 1, unit: "件" },
        { key: "bottoms", label: "裤子条数", min: 2, max: 4, step: 1, unit: "条" },
      ],
      build: (params) => {
        const tops = params.tops ?? 2;
        const bottoms = params.bottoms ?? 3;
        const total = tops * bottoms;
        const leftItems = Array.from({ length: tops }).map((_, i) => `上衣 ${i + 1}`);
        const rightItems = Array.from({ length: bottoms }).map((_, i) => `裤子 ${i + 1}`);

        return {
          problemStatement: `衣柜里有 ${tops} 件不同的上衣和 ${bottoms} 条不同的裤子。每次选 1 件上衣和 1 条裤子搭配，一共有多少种不同的穿法？`,
          formulas: [
            { id: "pr-1", latex: `${tops} \\times ${bottoms} = ${total}\\text{ (种)}`, comment: "每件上衣都有 " + bottoms + " 种搭法" },
          ],
          steps: [
            {
              step: 1,
              tag: "先连第1件",
              title: `第 1 件上衣可以配 ${bottoms} 条裤子（${bottoms} 种）`,
              narration: `我们先拿「上衣 1」，它可以分别搭配每一条裤子，连出 ${bottoms} 条橙色连线，这就是 ${bottoms} 种穿法！`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "上衣数量", value: `${tops} 件` },
                { label: "裤子数量", value: `${bottoms} 条` },
                { label: "第1件穿法", value: `${bottoms} 种`, tone: "coral" },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "pairing",
                leftItems,
                rightItems,
                revealedCount: bottoms,
                annotation: `上衣 1 连出 ${bottoms} 条线 → 有 ${bottoms} 种穿法`,
              },
            },
            {
              step: 2,
              tag: "全部连完",
              title: `${tops} 件上衣 × ${bottoms} 条裤子 = ${total} 种穿法！`,
              narration: `每一件上衣都能连出 ${bottoms} 条线！一共有 ${tops} 件上衣，就有 ${tops} 个 ${bottoms}，${tops} × ${bottoms} = ${total} 种穿法！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "上衣", value: `${tops} 件` },
                { label: "裤子", value: `${bottoms} 条` },
                { label: "总搭配数", value: `${total} 种`, tone: "teal" },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "pairing",
                leftItems,
                rightItems,
                revealedCount: total,
                annotation: `乘法原理：${tops} × ${bottoms} = ${total} 种不同穿法`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "路线搭配问题",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：从家经游乐园到学校，有几条路？",
      subtitle: "走路就像穿衣服一样，“前段路数 × 后段路数”！",
      defaultParams: { road1: 3, road2: 2 },
      paramDefs: [
        { key: "road1", label: "家→游乐园路线数", min: 2, max: 3, step: 1, unit: "条" },
        { key: "road2", label: "游乐园→学校路线数", min: 2, max: 4, step: 1, unit: "条" },
      ],
      build: (params) => {
        const r1 = params.road1 ?? 3;
        const r2 = params.road2 ?? 2;
        const total = r1 * r2;
        const leftItems = Array.from({ length: r1 }).map((_, i) => `前段路 ${i + 1}`);
        const rightItems = Array.from({ length: r2 }).map((_, i) => `后段路 ${i + 1}`);

        return {
          problemStatement: `从家到游乐园有 ${r1} 条路，从游乐园到学校有 ${r2} 条路。从家经过游乐园去学校，一共有多少种不同的走法？`,
          formulas: [
            { id: "prv-1", latex: `${r1} \\times ${r2} = ${total}\\text{ (条)}`, comment: "前段每条路都能接后段的任意一条" },
          ],
          steps: [
            {
              step: 1,
              tag: "路线连线",
              title: `${r1} × ${r2} = ${total} 条路线！`,
              narration: `把前段路当“上衣”，后段路当“裤子”，连线一看就知道一共有 ${r1} × ${r2} = ${total} 种走法！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "前段路", value: `${r1} 条` },
                { label: "后段路", value: `${r2} 条` },
                { label: "总走法", value: `${total} 种`, tone: "coral" },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "pairing",
                leftItems,
                rightItems,
                revealedCount: total,
                annotation: `路线搭配：${r1} × ${r2} = ${total} 种走法`,
              },
            },
          ],
        };
      },
    },
  ],
};
