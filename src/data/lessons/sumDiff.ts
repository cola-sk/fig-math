import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";
export const sumDiffLesson: MathLesson = {
  id: "sum-diff",
  chapterId: "02-segment",
  chapterTitle: "05. 转化思维训练",
  grade: 3,
  gradeLabel: "三年级",
  weekLabel: "p.40",
  title: "和差问题（去多补齐法）",
  summary:
    "已知两数的「和」与「差」，用线段图把多出的那一段切掉，变成两条一样长的线段。",
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
      modeLabel: "基础例题 · 例题精讲",
      bookPart: "A版",
      tier: "base",
      title: "甲乙两筐苹果",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { small: 19, diff: 10 },
      paramDefs: [
        {
          key: "small",
          label: "较小数（乙筐）",
          min: 8,
          max: 40,
          step: 1,
          unit: "个",
        },
        {
          key: "diff",
          label: "两数相差",
          min: 4,
          max: 24,
          step: 2,
          unit: "个",
        },
      ],
      build: (params) => {
        const small = params.small ?? 19;
        const diff = params.diff ?? 10;
        const big = small + diff;
        const sum = big + small;
        const twiceSmall = sum - diff;
        const ratioSmall = (0.85 * small) / big;
        const ratioBig = 0.85;
        return {
          problemStatement: `甲、乙两筐苹果一共有 ${sum} 个，甲筐比乙筐多 ${diff} 个。甲、乙两筐各有多少个苹果？`,
          formulas: [
            {
              id: "sd-1",
              latex: `${sum} - ${diff} = ${twiceSmall}\\text{ (个)}`,
              comment: "把多的部分切掉，得到2个乙",
            },
            {
              id: "sd-2",
              latex: `${twiceSmall} \\div 2 = ${small}\\text{ (个)}`,
              comment: "乙筐（较小数）",
            },
            {
              id: "sd-3",
              latex: `${small} + ${diff} = ${big}\\text{ (个)}`,
              comment: "甲筐（较大数）",
            },
          ],
          steps: teachingSteps([
            {
              title: `甲多出的部分，能单独指出来吗？`,
              narration: `两筐共 ${sum} 个，甲比乙多 ${diff} 个。先对齐两筐一样多的部分，多出来的只在哪一筐？`,
              sceneState: {
                kind: "segment-bar",
                rows: [
                  {
                    id: "big",
                    label: `甲筐`,
                    color: "coral",
                    parts: 1,
                    partLabel: `?`,
                    extraValue: diff,
                    extraLabel: `多 ${diff} 个`,
                    extraState: `highlighted`,
                    baseValue: small,
                    visualTotalRatio: ratioBig,
                  },
                  {
                    id: "small",
                    label: `乙筐`,
                    color: "teal",
                    parts: 1,
                    partLabel: `?`,
                    visualTotalRatio: ratioSmall,
                  },
                ],
                totalBrace: { label: `共 ${sum} 个`, state: `normal` },
              },
              activeFormulaIndices: [],
            },
            {
              title: `暂时拿掉多出的部分，剩下多少？`,
              narration: `从总数里暂时拿掉甲多出的 ${diff} 个，两筐就一样多。此时两筐合起来还剩多少个？`,
              sceneState: {
                kind: "segment-bar",
                rows: [
                  {
                    id: "big",
                    label: `甲筐`,
                    color: "coral",
                    parts: 1,
                    partLabel: `?`,
                    extraValue: diff,
                    extraLabel: `暂时拿掉`,
                    extraState: `highlighted`,
                    baseValue: small,
                    visualTotalRatio: ratioBig,
                  },
                  {
                    id: "small",
                    label: `乙筐`,
                    color: "teal",
                    parts: 1,
                    partLabel: `?`,
                    visualTotalRatio: ratioSmall,
                  },
                ],
                totalBrace: { label: `剩下 ? 个`, state: `normal` },
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `拿掉多出的部分后，共剩多少个？`,
                twiceSmall,
                ` 个`,
                `从总和中减去多出的尾巴。`,
              ),
            },
            {
              title: `一样多的两筐，乙筐有多少个？`,
              narration: `两份一样多的部分合起来是 ${twiceSmall} 个。平均分成两份，每份是多少？`,
              sceneState: {
                kind: "segment-bar",
                rows: [
                  {
                    id: "big",
                    label: `甲筐`,
                    color: "coral",
                    parts: 1,
                    partLabel: `?`,
                    extraValue: 0,
                    extraLabel: ``,
                    extraState: `highlighted`,
                    baseValue: small,
                    visualTotalRatio: ratioSmall,
                  },
                  {
                    id: "small",
                    label: `乙筐`,
                    color: "teal",
                    parts: 1,
                    partLabel: `?`,
                    visualTotalRatio: ratioSmall,
                  },
                ],
                totalBrace: { label: `剩 ${twiceSmall} 个`, state: `normal` },
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `乙筐有多少个？`,
                small,
                ` 个`,
                `相同的两份，平均分。`,
              ),
            },
            {
              title: `乙筐知道了，甲筐怎样还原？`,
              narration: `乙有 ${small} 个，甲原来比乙多 ${diff} 个。把暂时拿掉的尾巴接回甲，甲应该有多少个？`,
              sceneState: {
                kind: "segment-bar",
                rows: [
                  {
                    id: "big",
                    label: `甲筐`,
                    color: "coral",
                    parts: 1,
                    partLabel: `${small}`,
                    extraValue: diff,
                    extraLabel: `接回 ${diff}`,
                    extraState: `highlighted`,
                    baseValue: small,
                    visualTotalRatio: ratioBig,
                  },
                  {
                    id: "small",
                    label: `乙筐`,
                    color: "teal",
                    parts: 1,
                    partLabel: `${small}`,
                    visualTotalRatio: ratioSmall,
                  },
                ],
                totalBrace: { label: `原来共 ${sum} 个`, state: `normal` },
              },
              activeFormulaIndices: [0, 1],
              checkpoint: numberCheckpoint(
                `甲筐有多少个？`,
                big,
                ` 个`,
                `甲和乙一样多的部分，再加上原来多出的部分。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: "把尾巴接回甲筐",
              narration: `把刚才切掉的 ${diff} 个加回给甲筐：甲 = ${small} + ${diff} = ${big} 个！验算：${big} + ${small} = ${sum} 个，完全正确。`,
              tipTitle: "和差公式总结",
              tipBody: "小数 = (和 - 差) ÷ 2；大数 = (和 + 差) ÷ 2",
              activeFormulaIndices: [0, 1, 2],
              liveStats: [
                { label: "甲筐(大数)", value: `${big} 个`, tone: "coral" },
                { label: "乙筐(小数)", value: `${small} 个`, tone: "teal" },
                {
                  label: "和验算",
                  value: `${big + small} = ${sum}`,
                  tone: "teal",
                },
                {
                  label: "差验算",
                  value: `${big - small} = ${diff}`,
                  tone: "teal",
                },
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
                    baseValue: small,
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
                totalBrace: {
                  label: `${big} + ${small} = ${sum}`,
                  state: "solved",
                },
              },
            },
          ]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 给糖后倒推",
      bookPart: "B版",
      tier: "challenge",
      title: "移多补少藏起来的“差”",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { sister: 14, give: 4 },
      paramDefs: [
        {
          key: "sister",
          label: "妹妹原有糖数",
          min: 6,
          max: 30,
          step: 1,
          unit: "颗",
        },
        {
          key: "give",
          label: "哥哥给妹妹几颗",
          min: 2,
          max: 10,
          step: 1,
          unit: "颗",
        },
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
            {
              id: "sv1-1",
              latex: `${give} \\times 2 = ${diff}\\text{ (颗)}`,
              comment: "暗差！给出去的2倍才是原差",
            },
            {
              id: "sv1-2",
              latex: `(${sum} - ${diff}) \\div 2 = ${sister}\\text{ (颗)}`,
              comment: "妹妹原来的糖",
            },
            {
              id: "sv1-3",
              latex: `${sister} + ${diff} = ${brother}\\text{ (颗)}`,
              comment: "哥哥原来的糖",
            },
          ],
          steps: teachingSteps([
            {
              title: `给糖后一样多，给糖时两人怎样变？`,
              narration: `两人共有 ${sum} 颗。哥哥给妹妹 ${give} 颗后一样多。哥哥少了多少？妹妹又多了多少？`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `哥哥 → 妹妹`, tone: "coral" },
                  { id: `c1`, text: `给 ${give} 颗`, tone: "teal" },
                ],
                rows: [{ label: `原来相差`, badge: `? 颗`, active: true }],
                annotation: ``,
              },
              activeFormulaIndices: [],
            },
            {
              title: `一边减少、一边增加，原来相差多少？`,
              narration: `给出 ${give} 颗后，哥哥减少 ${give} 颗，妹妹增加 ${give} 颗。两边一起靠拢，原来的差应包含几段给出数？`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `哥哥少 ${give}`, tone: "coral" },
                  { id: `c1`, text: `妹妹多 ${give}`, tone: "teal" },
                ],
                rows: [{ label: `原来的差`, badge: `?`, active: true }],
                annotation: ``,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `原来两人相差几颗？`,
                diff,
                ` 颗`,
                `差距里有一减一加的两段。`,
              ),
            },
            {
              title: `去掉多出的部分，妹妹原有多少？`,
              narration: `总和 ${sum} 颗，原差 ${diff} 颗。先去掉哥哥多出的部分，再把两份同样多的糖平均分，妹妹原有多少？`,
              sceneState: {
                kind: "balance-puzzle",
                mode: "swap",
                swapRows: [
                  { left: `总和`, right: `${sum}`, highlight: true },
                  { left: `原差`, right: `${diff}`, highlight: true },
                  { left: `妹妹原有`, right: `?`, highlight: true },
                ],
                annotation: ``,
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `妹妹原来有几颗？`,
                sister,
                ` 颗`,
                `去掉差以后，剩下两份妹妹原来的糖。`,
              ),
            },
            {
              title: `妹妹找到了，哥哥原有多少？`,
              narration: `妹妹原有 ${sister} 颗，哥哥比她多 ${diff} 颗。请把哥哥原来的糖数找出来，再检查给糖后是否一样多。`,
              sceneState: {
                kind: "balance-puzzle",
                mode: "swap",
                swapRows: [
                  { left: `妹妹`, right: `${sister}`, highlight: true },
                  {
                    left: `哥哥`,
                    right: `${sister} + ${diff} = ?`,
                    highlight: true,
                  },
                ],
                annotation: ``,
              },
              activeFormulaIndices: [0, 1],
              checkpoint: numberCheckpoint(
                `哥哥原来有几颗？`,
                brother,
                ` 颗`,
                `哥哥原来比妹妹多两个给出数。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: "变回标准和差问题！",
              narration: `知道了“和=${sum}、差=${diff}”，按图先求妹妹，再求哥哥：妹妹 = (${sum} - ${diff}) ÷ 2 = ${sister} 颗，哥哥 = ${sister} + ${diff} = ${brother} 颗！`,
              activeFormulaIndices: [0, 1, 2],
              liveStats: [
                { label: "哥哥原有", value: `${brother} 颗`, tone: "coral" },
                { label: "妹妹原有", value: `${sister} 颗`, tone: "teal" },
                {
                  label: "给后两人",
                  value: `${brother - give} = ${sister + give}`,
                  tone: "teal",
                },
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
              tipBody: `先找原来相差多少，再用和与差还原。`,
            },
          ]),
        };
      },
    },
  ],
};
