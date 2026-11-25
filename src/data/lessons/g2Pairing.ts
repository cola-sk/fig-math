import { teachingSteps, numberCheckpoint } from "../teachingSteps";
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
      modeLabel: "基础例题 · 穿衣搭配例题",
      bookPart: "A版",
      tier: "base",
      title: "2 件上衣和 3 条裤子，一共有几种穿法？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
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
          steps: teachingSteps([
{ title: `怎样搭配，才能不漏不重？`, narration: `左边有 ${tops} 个选择，右边有 ${bottoms} 个选择。每次两边各选一个，你打算按什么顺序找？`, sceneState: { kind: "combo-visual", mode: "pairing", leftItems: leftItems, rightItems: rightItems, revealedCount: 0, annotation: `固定左边一个，再依次搭配右边` }, activeFormulaIndices: [] },
{ title: `先固定第一个上衣，能连几条线？`, narration: `先选左边第一个，再和右边的每一个分别搭配。请数一数，这一组会有多少种穿法？`, sceneState: { kind: "combo-visual", mode: "pairing", leftItems: leftItems, rightItems: rightItems, revealedCount: 1, annotation: `固定左边一个，再依次搭配右边` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`固定左边一个，有几种穿法？`, bottoms, ` 种`, `右边每个选择都能和它搭配一次。`) },
{ title: `这一组找齐了，其余各组呢？`, narration: `第一组有 ${bottoms} 种。左边一共有 ${tops} 个，每一个都能这样搭配。所有组加起来会有多少种穿法？`, sceneState: { kind: "combo-visual", mode: "pairing", leftItems: leftItems, rightItems: rightItems, revealedCount: bottoms, annotation: `固定左边一个，再依次搭配右边` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`总共有几种穿法？`, total, ` 种`, `每组一样多，可以把相同的数相加。`) },
{ tag: `验证与回顾`, title: `${tops} 件上衣 × ${bottoms} 条裤子 = ${total} 种穿法！`, narration: `每一件上衣都能连出 ${bottoms} 条线！一共有 ${tops} 件上衣，就有 ${tops} 个 ${bottoms}，${tops} × ${bottoms} = ${total} 种穿法！`, activeFormulaIndices: [0], liveStats: [
                { label: "上衣", value: `${tops} 件` },
                { label: "裤子", value: `${bottoms} 条` },
                { label: "总搭配数", value: `${total} 种`, tone: "teal" },
              ], sceneState: {
                kind: "combo-visual",
                mode: "pairing",
                leftItems,
                rightItems,
                revealedCount: total,
                annotation: `乘法原理：${tops} × ${bottoms} = ${total} 种不同穿法`,
              }, tipBody: `先固定一个，逐个来搭配；再换下一个，不重也不漏。` }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 路线搭配问题",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：从家经游乐园到学校，有几条路？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
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
          steps: teachingSteps([
{ title: `怎样搭配，才能不漏不重？`, narration: `左边有 ${r1} 个选择，右边有 ${r2} 个选择。每次两边各选一个，你打算按什么顺序找？`, sceneState: { kind: "combo-visual", mode: "pairing", leftItems: leftItems, rightItems: rightItems, revealedCount: 0, annotation: `固定左边一个，再依次搭配右边` }, activeFormulaIndices: [] },
{ title: `先固定第一个前段路，能连几条线？`, narration: `先选左边第一个，再和右边的每一个分别搭配。请数一数，这一组会有多少种走法？`, sceneState: { kind: "combo-visual", mode: "pairing", leftItems: leftItems, rightItems: rightItems, revealedCount: 1, annotation: `固定左边一个，再依次搭配右边` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`固定左边一个，有几种走法？`, r2, ` 种`, `右边每个选择都能和它搭配一次。`) },
{ title: `这一组找齐了，其余各组呢？`, narration: `第一组有 ${r2} 种。左边一共有 ${r1} 个，每一个都能这样搭配。所有组加起来会有多少种走法？`, sceneState: { kind: "combo-visual", mode: "pairing", leftItems: leftItems, rightItems: rightItems, revealedCount: r2, annotation: `固定左边一个，再依次搭配右边` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`总共有几种走法？`, total, ` 种`, `每组一样多，可以把相同的数相加。`) },
{ tag: `验证与回顾`, title: `${r1} × ${r2} = ${total} 条路线！`, narration: `把前段路当“上衣”，后段路当“裤子”，连线一看就知道一共有 ${r1} × ${r2} = ${total} 种走法！`, activeFormulaIndices: [0], liveStats: [
                { label: "前段路", value: `${r1} 条` },
                { label: "后段路", value: `${r2} 条` },
                { label: "总走法", value: `${total} 种`, tone: "coral" },
              ], sceneState: {
                kind: "combo-visual",
                mode: "pairing",
                leftItems,
                rightItems,
                revealedCount: total,
                annotation: `路线搭配：${r1} × ${r2} = ${total} 种走法`,
              }, tipBody: `先固定一个，逐个来搭配；再换下一个，不重也不漏。` }
]),
        };
      },
    },
  ],
};
