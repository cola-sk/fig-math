import type { MathLesson } from "../../types/lesson";

export const sumDiffLesson: MathLesson = {
  id: "sum-diff",
  chapterId: "02-segment",
  chapterTitle: "02. 线段图大法",
  grade: 3,
  gradeLabel: "三年级",
  weekLabel: "第 5 讲",
  title: "和差问题（去多补齐法）",
  summary: "已知两数的「和」与「差」，用线段图把多出的那一段切掉，变成两条一样长的线段。",
  engine: "segment-bar",
  keywords: ["和差问题", "线段图", "移多补少", "暗差", "平均分"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "05. 转化思维训练",
      weekLabel: "p.40",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "例题精讲",
      bookPart: "A版",
      tier: "base",
      title: "甲乙两筐苹果",
      subtitle: "把多出来的部分剪掉，两数就一样大了",
      defaultParams: { small: 19, diff: 10 },
      paramDefs: [
        { key: "small", label: "较小数（乙筐）", min: 8, max: 40, step: 1, unit: "个" },
        { key: "diff", label: "两数相差", min: 4, max: 24, step: 2, unit: "个" },
      ],
      build: (params) => {
        const small = params.small ?? 19;
        const diff = params.diff ?? 10;
        const big = small + diff;
        const sum = big + small;
        const twiceSmall = sum - diff;
        const ratioSmall = 0.55;
        const ratioBig = Math.min(0.95, ratioSmall + (diff / Math.max(20, big)) * 0.35);

        return {
          problemStatement: `甲、乙两筐苹果一共有 ${sum} 个，甲筐比乙筐多 ${diff} 个。甲、乙两筐各有多少个苹果？`,
          formulas: [
            { id: "sd-1", latex: `${sum} - ${diff} = ${twiceSmall}\\text{ (个)}`, comment: "把多的部分切掉，得到2个乙" },
            { id: "sd-2", latex: `${twiceSmall} \\div 2 = ${small}\\text{ (个)}`, comment: "乙筐（较小数）" },
            { id: "sd-3", latex: `${small} + ${diff} = ${big}\\text{ (个)}`, comment: "甲筐（较大数）" },
          ],
          steps: [
            {
              step: 1,
              tag: "画图",
              title: "用线段画出“和”与“差”",
              narration: `先画一条线段表示乙筐，再画一条更长的线段表示甲筐。两段合起来是 ${sum} 个，甲比乙多出来的尾巴是 ${diff} 个。`,
              tipTitle: "线段图口诀",
              tipBody: "小数画短，大数画长，对齐左端看尾巴！",
              activeFormulaIndices: [],
              liveStats: [
                { label: "两筐总数(和)", value: `${sum} 个` },
                { label: "甲比乙多(差)", value: `${diff} 个`, tone: "coral" },
                { label: "乙筐", value: "?" },
                { label: "甲筐", value: "?" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `甲和乙一共 ${sum} 个，甲的尾巴比乙多 ${diff} 个`,
                rows: [
                  {
                    id: "big",
                    label: "甲筐",
                    color: "coral",
                    parts: 1,
                    partLabel: "和乙一样长",
                    extraValue: diff,
                    extraLabel: `+${diff}`,
                    extraState: "highlighted",
                    visualTotalRatio: ratioBig,
                  },
                  {
                    id: "small",
                    label: "乙筐",
                    color: "teal",
                    parts: 1,
                    partLabel: "1份",
                    visualTotalRatio: ratioSmall,
                  },
                ],
                diffGuide: { label: `多 ${diff} 个`, fromRow: 0, toRow: 1, highlight: true },
                totalBrace: { label: `共 ${sum} 个`, state: "normal" },
              },
            },
            {
              step: 2,
              tag: "切尾巴",
              title: "把多出来的“尾巴”切掉",
              narration: `如果我们从总和 ${sum} 里暂时减去多出的 ${diff} 个，甲筐和乙筐的线段就变得一模一样长啦！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "切掉多出部分", value: `-${diff} 个`, tone: "coral" },
                { label: "剩下总和", value: `${twiceSmall} 个`, tone: "blue" },
                { label: "相同线段数", value: "2 条" },
                { label: "乙筐", value: "?" },
              ],
              checkpoint: {
                question: `把多出来的 ${diff} 个切掉后，剩下的 ${twiceSmall} 个相当于几个乙筐？`,
                options: ["1 个乙筐", "2 个乙筐", "3 个乙筐"],
                correctIndex: 1,
                feedbackCorrect: "太棒了！两条线段变得一样长，所以正好是 2 个乙筐！",
                feedbackWrong: "看图哦：甲切掉尾巴后跟乙一样长，两条合起来是 2 个乙筐。",
              },
              sceneState: {
                kind: "segment-bar",
                annotation: `剪掉 +${diff} 后，剩下 2 条一样长的线段 = ${twiceSmall}`,
                rows: [
                  {
                    id: "big",
                    label: "甲筐",
                    color: "coral",
                    parts: 1,
                    partLabel: "?",
                    extraValue: diff,
                    extraLabel: `-${diff}`,
                    extraState: "detached",
                    visualTotalRatio: ratioBig,
                  },
                  {
                    id: "small",
                    label: "乙筐",
                    color: "teal",
                    parts: 1,
                    partLabel: "?",
                    visualTotalRatio: ratioSmall,
                  },
                ],
                totalBrace: { label: `剩下 ${twiceSmall}`, state: "adjusted" },
              },
            },
            {
              step: 3,
              tag: "求小数",
              title: "除以 2，求出乙筐",
              narration: `2 条一样长的线段一共是 ${twiceSmall} 个，所以乙筐 = ${twiceSmall} ÷ 2 = ${small} 个！`,
              activeFormulaIndices: [1],
              liveStats: [
                { label: "乙筐(小数)", value: `${small} 个`, tone: "teal" },
                { label: "甲的相等段", value: `${small} 个` },
                { label: "切掉的尾巴", value: `${diff} 个` },
                { label: "甲筐", value: `${small} + ${diff}` },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `每条短线段都是 ${twiceSmall} ÷ 2 = ${small}`,
                rows: [
                  {
                    id: "big",
                    label: "甲筐",
                    color: "coral",
                    parts: 1,
                    partLabel: `${small}`,
                    extraValue: diff,
                    extraLabel: `+${diff}`,
                    extraState: "faded",
                    visualTotalRatio: ratioBig,
                  },
                  {
                    id: "small",
                    label: "乙筐",
                    color: "teal",
                    parts: 1,
                    partLabel: `${small}`,
                    visualTotalRatio: ratioSmall,
                  },
                ],
                totalBrace: { label: `共 ${sum} 个`, state: "normal" },
              },
            },
            {
              step: 4,
              tag: "归位验证",
              title: "把尾巴接回甲筐",
              narration: `把刚才切掉的 ${diff} 个加回给甲筐：甲 = ${small} + ${diff} = ${big} 个！验算：${big} + ${small} = ${sum} 个，完全正确。`,
              tipTitle: "和差公式总结",
              tipBody: "小数 = (和 - 差) ÷ 2；大数 = (和 + 差) ÷ 2",
              activeFormulaIndices: [2],
              liveStats: [
                { label: "甲筐(大数)", value: `${big} 个`, tone: "coral" },
                { label: "乙筐(小数)", value: `${small} 个`, tone: "teal" },
                { label: "和验算", value: `${big + small} = ${sum}`, tone: "teal" },
                { label: "差验算", value: `${big - small} = ${diff}`, tone: "teal" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `接回尾巴：甲筐 = ${small} + ${diff} = ${big} 个`,
                rows: [
                  {
                    id: "big",
                    label: "甲筐",
                    color: "coral",
                    parts: 1,
                    partLabel: `${small}`,
                    extraValue: diff,
                    extraLabel: `+${diff}`,
                    extraState: "normal",
                    visualTotalRatio: ratioBig,
                  },
                  {
                    id: "small",
                    label: "乙筐",
                    color: "teal",
                    parts: 1,
                    partLabel: `${small}`,
                    visualTotalRatio: ratioSmall,
                  },
                ],
                totalBrace: { label: `${big} + ${small} = ${sum}`, state: "solved" },
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "变式一 · 暗差",
      bookPart: "B版",
      tier: "challenge",
      title: "移多补少藏起来的“差”",
      subtitle: "哥哥给妹妹几颗糖后一样多，原来差多少？",
      defaultParams: { sister: 14, give: 4 },
      paramDefs: [
        { key: "sister", label: "妹妹原有糖数", min: 6, max: 30, step: 1, unit: "颗" },
        { key: "give", label: "哥哥给妹妹几颗", min: 2, max: 10, step: 1, unit: "颗" },
      ],
      build: (params) => {
        const sister = params.sister ?? 14;
        const give = params.give ?? 4;
        const diff = give * 2;
        const brother = sister + diff;
        const sum = brother + sister;

        return {
          problemStatement: `兄妹两人共有 ${sum} 颗糖，如果哥哥给妹妹 ${give} 颗后，两人的糖就一样多。哥哥和妹妹原来各有多少颗糖？`,
          formulas: [
            { id: "sv1-1", latex: `${give} \\times 2 = ${diff}\\text{ (颗)}`, comment: "暗差！给出去的2倍才是原差" },
            { id: "sv1-2", latex: `(${sum} - ${diff}) \\div 2 = ${sister}\\text{ (颗)}`, comment: "妹妹原来的糖" },
            { id: "sv1-3", latex: `${sister} + ${diff} = ${brother}\\text{ (颗)}`, comment: "哥哥原来的糖" },
          ],
          steps: [
            {
              step: 1,
              tag: "破译暗差",
              title: "小心陷阱！差不是 4，而是 4×2=8",
              narration: `哥哥少 ${give} 颗，同时妹妹多 ${give} 颗，两人才扯平！所以哥哥原来比妹妹多 ${give} × 2 = ${diff} 颗。`,
              tipTitle: "移多补少铁律",
              tipBody: "甲给乙 A 个后相等，原来甲比乙多 2×A 个！千万别直接当成 A！",
              activeFormulaIndices: [0],
              liveStats: [
                { label: "糖果总和", value: `${sum} 颗` },
                { label: "哥哥给出", value: `${give} 颗` },
                { label: "实际原来相差", value: `${diff} 颗`, tone: "coral" },
                { label: "相等时每人", value: `${sum / 2} 颗` },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `给出 ${give} 颗变一样多 → 哥哥原来多出 2 个 ${give} = ${diff} 颗`,
                rows: [
                  {
                    id: "bro",
                    label: "哥哥",
                    color: "coral",
                    parts: 1,
                    partLabel: "和妹妹一样",
                    extraValue: diff,
                    extraLabel: `2×${give}=${diff}`,
                    extraState: "highlighted",
                    transferNote: `拿出 ${give} 颗给妹妹`,
                    visualTotalRatio: 0.78,
                  },
                  {
                    id: "sis",
                    label: "妹妹",
                    color: "teal",
                    parts: 1,
                    partLabel: "妹妹原有",
                    visualTotalRatio: 0.54,
                  },
                ],
                diffGuide: { label: `原差 ${diff} 颗`, fromRow: 0, toRow: 1, highlight: true },
                totalBrace: { label: `共 ${sum} 颗`, state: "normal" },
              },
            },
            {
              step: 2,
              tag: "还原求解",
              title: "变回标准和差问题！",
              narration: `知道了“和=${sum}、差=${diff}”，立刻用和差公式：妹妹 = (${sum} - ${diff}) ÷ 2 = ${sister} 颗，哥哥 = ${sister} + ${diff} = ${brother} 颗！`,
              activeFormulaIndices: [1, 2],
              liveStats: [
                { label: "哥哥原有", value: `${brother} 颗`, tone: "coral" },
                { label: "妹妹原有", value: `${sister} 颗`, tone: "teal" },
                { label: "给后两人", value: `${brother - give} = ${sister + give}`, tone: "teal" },
                { label: "原差", value: `${diff} 颗` },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `还原成功：哥哥 ${brother} 颗，妹妹 ${sister} 颗`,
                rows: [
                  {
                    id: "bro",
                    label: "哥哥",
                    color: "coral",
                    parts: 1,
                    partLabel: `${sister}`,
                    extraValue: diff,
                    extraLabel: `+${diff}`,
                    extraState: "normal",
                    visualTotalRatio: 0.78,
                  },
                  {
                    id: "sis",
                    label: "妹妹",
                    color: "teal",
                    parts: 1,
                    partLabel: `${sister}`,
                    visualTotalRatio: 0.54,
                  },
                ],
                totalBrace: { label: `共 ${sum} 颗`, state: "solved" },
              },
            },
          ],
        };
      },
    },
  ],
};
