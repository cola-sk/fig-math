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
      modeLabel: "用去一半还多几",
      bookPart: "A版",
      tier: "base",
      title: "一捆电线，先用去一半，又用去 2 米，还剩 6 米，原来长多少米？",
      subtitle: "把最后剩下的 6 米和后来多用的 2 米拼起来，正好是整捆电线的一半！",
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
          steps: [
            {
              step: 1,
              tag: "先找一半",
              title: `第 1 步：倒推凑出“全长的一半” = ${left} + ${extra} = ${half} 米`,
              narration: `看线段图！整捆电线先对半切开，右边这一半先用去了 ${extra} 米，还剩下 ${left} 米。倒回去想：如果不切那 ${extra} 米，右半边就是 ${left} + ${extra} = ${half} 米！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "最后剩下", value: `${left} 米` },
                { label: "全长的一半", value: `${half} 米`, tone: "coral" },
              ],
              sceneState: {
                kind: "segment-bar",
                rows: [
                  {
                    id: "wire-half",
                    label: "电线全长",
                    color: "coral",
                    parts: 2,
                    partLabel: `${half}米`,
                    visualTotalRatio: 1,
                  },
                  {
                    id: "wire-right",
                    label: "后一半拆开",
                    color: "teal",
                    parts: 1,
                    partLabel: `剩${left}米`,
                    extraValue: extra,
                    extraLabel: `+又用${extra}米`,
                    extraState: "highlighted",
                    visualTotalRatio: 0.5,
                  },
                ],
                annotation: `右边这半条 = ${extra} + ${left} = ${half} 米！`,
              },
            },
            {
              step: 2,
              tag: "乘 2 得全长",
              title: `第 2 步：两个一半合起来 = ${half} × 2 = ${total} 米`,
              narration: `既然一半是 ${half} 米，那么整捆电线就是 ${half} + ${half} = ${total} 米！检验一下：${total} 的一半是 ${half}，再用去 ${extra} 米，正好剩 ${left} 米！`,
              tipTitle: "一半问题口诀",
              tipBody: "遇到“用去一半还多几”，先把剩下的加上多用的，得到一半后乘 2！",
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "一半长度", value: `${half} 米` },
                { label: "原来全长", value: `${total} 米`, tone: "teal" },
              ],
              sceneState: {
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
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "用去一半少几",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：吃掉一半少 2 颗糖，还剩 10 颗，原来有几颗？",
      subtitle: "吃得比一半少，说明剩下的比一半多！先把多出来的 2 颗减掉，才是真正的一半！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `盒子里有一些糖果，小宇吃掉了总数的一半少 2 颗，盒子里还剩 10 颗。请问盒子里原来有多少颗糖果？`,
        formulas: [
          { id: "hf-3", latex: `\\text{总数的一半} = 10 - 2 = 8\\text{ (颗)}`, comment: "少吃了 2 颗，说明剩下的多出 2 颗" },
          { id: "hf-4", latex: `\\text{原来总数} = 8 \\times 2 = 16\\text{ (颗)}`, comment: "两个一半就是 16 颗" },
        ],
        steps: [
          {
            step: 1,
            tag: "找出真正一半",
            title: "第 1 步：少吃 2 颗，剩下 10 颗里多藏了 2 颗",
            narration: `注意看“少 2 颗”：小宇本来要吃一半，结果少吃了 2 颗，这 2 颗就留在盒子里了！所以 10 颗里面包括“另一半”和“多留的 2 颗”。减掉 2 颗，一半是 10 - 2 = 8 颗！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "盒里还剩", value: "10 颗" },
              { label: "真正一半", value: "8 颗", tone: "coral" },
            ],
            sceneState: {
              kind: "segment-bar",
              rows: [
                {
                  id: "candy-left",
                  label: "真正一半",
                  color: "teal",
                  parts: 1,
                  partLabel: "8颗",
                  extraValue: 2,
                  extraLabel: "+多留2颗",
                  extraState: "highlighted",
                  visualTotalRatio: 0.625,
                },
                {
                  id: "candy-eaten",
                  label: "吃掉的",
                  color: "amber",
                  parts: 1,
                  partLabel: "6颗",
                  visualTotalRatio: 0.375,
                },
              ],
              annotation: "剩下的 10 颗 = 多留的 2 颗 + 另一半 8 颗！",
            },
          },
          {
            step: 2,
            tag: "乘 2 还原",
            title: "第 2 步：原来一共有 8 × 2 = 16 颗",
            narration: `一半是 8 颗，原来就是 8 × 2 = 16 颗！验证一下：16 颗的一半是 8 颗，少吃 2 颗就是吃了 6 颗，16 - 6 = 10 颗，完全正确！`,
            activeFormulaIndices: [1],
            liveStats: [
              { label: "原来总数", value: "16 颗", tone: "teal" },
            ],
            sceneState: {
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
            },
          },
        ],
      }),
    },
  ],
};
