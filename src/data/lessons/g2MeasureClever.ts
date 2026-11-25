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
      modeLabel: "断尺量铅笔",
      bookPart: "A版",
      tier: "base",
      title: "断尺从 3 厘米开始量，铅笔尖对准 11 厘米，铅笔长几厘米？",
      subtitle: "数一数从 3 到 11 中间有几大格（几厘米），就是 11 - 3！",
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
          steps: [
            {
              step: 1,
              tag: "看清起点与终点",
              title: `第 1 步：铅笔从 ${startCm} 厘米到 ${endCm} 厘米，不是 ${endCm} 厘米哦！`,
              narration: `千万别直接读 ${endCm} 厘米！因为前面 ${startCm} 厘米是空的、没有放铅笔！我们要数一数从 ${startCm} 到 ${endCm} 中间有几段 1 厘米。`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "起点刻度", value: `${startCm} cm` },
                { label: "终点刻度", value: `${endCm} cm`, tone: "coral" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: endCm + 2,
                unitLabel: "cm",
                markers: [
                  { id: "m-start", posRatio: startCm / (endCm + 2), label: `起点 ${startCm}`, tone: "neutral" },
                  { id: "m-end", posRatio: endCm / (endCm + 2), label: `终点 ${endCm}`, tone: "coral" },
                ],
                highlightGap: { fromRatio: startCm / (endCm + 2), toRatio: endCm / (endCm + 2), label: `? cm` },
              },
            },
            {
              step: 2,
              tag: "大数减小数",
              title: `第 2 步：用终点减起点 → ${endCm} - ${startCm} = ${len} 厘米`,
              narration: `把前面的 ${startCm} 厘米减掉：${endCm} - ${startCm} = ${len} 厘米！所以这支铅笔的真实长度是 ${len} 厘米！`,
              tipTitle: "断尺测量口诀",
              tipBody: "尺子没从 0 开始别害怕，终点刻度减去起点刻度，就是物体的真实长度！",
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "列式", value: `${endCm} - ${startCm}` },
                { label: "铅笔长度", value: `${len} 厘米`, tone: "teal" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: endCm + 2,
                unitLabel: "cm",
                markers: [
                  { id: "m-start", posRatio: startCm / (endCm + 2), label: `起点 ${startCm}`, tone: "neutral" },
                  { id: "m-end", posRatio: endCm / (endCm + 2), label: `终点 ${endCm}`, tone: "coral" },
                ],
                highlightGap: { fromRatio: startCm / (endCm + 2), toRatio: endCm / (endCm + 2), label: `实际长 ${len} cm` },
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "一把尺子量出多种长度",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：只有 0、2、5 三个刻度，一次能直接量出几种长度？",
      subtitle: "任意两个刻度之间都能量出一段长度！像数线段一样不重不漏！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `一把神奇的木尺上只有 0 厘米、2 厘米和 5 厘米这三个刻度。用这把尺子一次（不移动尺子）最多能直接量出几种不同的长度？分别是多少？`,
        formulas: [
          { id: "mc-3", latex: `2 - 0 = 2,\\quad 5 - 0 = 5,\\quad 5 - 2 = 3`, comment: "任意两个刻度做差，共 3 种" },
        ],
        steps: [
          {
            step: 1,
            tag: "看作数线段",
            title: "第 1 步：0、2、5 三个刻度点，两两配对算差值！",
            narration: `把 0、2、5 想成一条直线上的 3 个点，任意两个点之间就是一段长度！这不就是我们学过的“数线段”吗？3 个点有 2 + 1 = 3 条线段！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "刻度点", value: "0, 2, 5（3 个点）" },
              { label: "配对数", value: "3 种", tone: "coral" },
            ],
            sceneState: {
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
            },
          },
          {
            step: 2,
            tag: "列出全部 3 种",
            title: "第 2 步：能直接量出 2cm、3cm 和 5cm 一共 3 种！",
            narration: `从 0 到 2 是 2 厘米；从 0 到 5 是 5 厘米；别忘了从 2 到 5 是 5 - 2 = 3 厘米！一共 3 种长度！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "可量出长度", value: "2cm, 3cm, 5cm", tone: "teal" },
              { label: "总计", value: "3 种", tone: "coral" },
            ],
            sceneState: {
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
            },
          },
        ],
      }),
    },
  ],
};
