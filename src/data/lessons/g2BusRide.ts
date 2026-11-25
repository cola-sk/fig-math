import type { MathLesson } from "../../types/lesson";

export const g2BusRideLesson: MathLesson = {
  id: "g2-bus-ride",
  chapterId: "g2-overall-thinking",
  chapterTitle: "整体思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "第 6 页",
  title: "乘车问题（上下车整体变化）",
  summary: "不用盯着每一个人跑去哪！把上车和下车合在一起看成“净变化”，一下子就算出车上还剩几人。",
  engine: "segment-bar",
  keywords: ["二年级", "乘车问题", "整体思维", "倒推", "上车下车"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "01. 整体思维训练",
      weekLabel: "p.6",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "整体变化例题",
      bookPart: "A版",
      tier: "base",
      title: "上车比下车多几人，总数就净增加几人！",
      subtitle: "先算“净增加”，比一加一减更不容易出错",
      defaultParams: { initial: 18, getOff: 5, getOn: 8 },
      paramDefs: [
        { key: "initial", label: "车上原有人数", min: 10, max: 28, step: 1, unit: "人" },
        { key: "getOff", label: "到站下车人数", min: 2, max: 9, step: 1, unit: "人" },
        { key: "getOn", label: "到站上车人数", min: 4, max: 14, step: 1, unit: "人" },
      ],
      build: (params) => {
        const initial = params.initial ?? 18;
        const getOff = params.getOff ?? 5;
        const getOn = Math.max(getOff + 1, params.getOn ?? 8);
        const netChange = getOn - getOff;
        const finalCount = initial + netChange;

        return {
          problemStatement: `公交车上原来有 ${initial} 名乘客，到少年宫站后下去了 ${getOff} 人，又上来了 ${getOn} 人。现在公交车上有多少名乘客？`,
          formulas: [
            { id: "br-1", latex: `${getOn} - ${getOff} = ${netChange}\\text{ (人)}`, comment: "整体看：上车比下车多（净增加）" },
            { id: "br-2", latex: `${initial} + ${netChange} = ${finalCount}\\text{ (人)}`, comment: "原来人数 + 净增加人数" },
          ],
          steps: [
            {
              step: 1,
              tag: "整体抵消",
              title: `下去 ${getOff} 人、上来 ${getOn} 人，相当于净多 ${netChange} 人！`,
              narration: `用“整体思维”来看：先下去 ${getOff} 个位置，马上又坐进来 ${getOff} 个人补满，还多出 ${getOn} - ${getOff} = ${netChange} 个人！`,
              tipTitle: "整体思维小口诀",
              tipBody: "下车是“减”，上车是“加”，合起来看净增减，一步算更快！",
              activeFormulaIndices: [0],
              liveStats: [
                { label: "原来乘客", value: `${initial} 人` },
                { label: "下车 / 上车", value: `-${getOff} / +${getOn}` },
                { label: "整体净增加", value: `+${netChange} 人`, tone: "coral" },
                { label: "现在人数", value: "?" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `上车 ${getOn} 人抵消下车 ${getOff} 人，净增加 ${netChange} 人`,
                rows: [
                  {
                    id: "before",
                    label: "原来车上",
                    color: "teal",
                    parts: 1,
                    partLabel: `${initial} 人`,
                    visualTotalRatio: 0.62,
                  },
                  {
                    id: "change",
                    label: "站台变化",
                    color: "coral",
                    parts: 1,
                    partLabel: `抵消 ${getOff} 人`,
                    extraValue: netChange,
                    extraLabel: `净+${netChange}`,
                    extraState: "highlighted",
                    visualTotalRatio: 0.42,
                  },
                ],
              },
            },
            {
              step: 2,
              tag: "得出结果",
              title: `${initial} + ${netChange} = ${finalCount} 人`,
              narration: `原来有 ${initial} 人，整体净增加 ${netChange} 人，现在车上一共有 ${initial} + ${netChange} = ${finalCount} 人！（也可以按顺序算：${initial} - ${getOff} + ${getOn} = ${finalCount} 人）`,
              activeFormulaIndices: [1],
              liveStats: [
                { label: "原来人数", value: `${initial} 人` },
                { label: "净增加", value: `+${netChange} 人`, tone: "coral" },
                { label: "现在车上共有", value: `${finalCount} 人`, tone: "teal" },
                { label: "两种算法一致", value: "验算通过" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `现在车上一共有 ${finalCount} 名乘客`,
                rows: [
                  {
                    id: "now",
                    label: "现在车上",
                    color: "teal",
                    parts: 1,
                    partLabel: `原有 ${initial} 人`,
                    extraValue: netChange,
                    extraLabel: `+${netChange}人`,
                    extraState: "normal",
                    visualTotalRatio: 0.78,
                  },
                ],
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "倒推原来几人",
      bookPart: "A版",
      tier: "standard",
      title: "知道现在车上有几人，倒推原来有几人？",
      subtitle: "上车的请下去，下车的请回来！",
      defaultParams: { finalCount: 25, getOff: 6, getOn: 9 },
      paramDefs: [
        { key: "finalCount", label: "现在车上人数", min: 15, max: 35, step: 1, unit: "人" },
        { key: "getOff", label: "刚才下车人数", min: 3, max: 10, step: 1, unit: "人" },
        { key: "getOn", label: "刚才上车人数", min: 4, max: 12, step: 1, unit: "人" },
      ],
      build: (params) => {
        const finalCount = params.finalCount ?? 25;
        const getOff = params.getOff ?? 6;
        const getOn = params.getOn ?? 9;
        const orig = finalCount - getOn + getOff;

        return {
          problemStatement: `公交车到站时，下去了 ${getOff} 人，又上来了 ${getOn} 人，这时车上一共有 ${finalCount} 人。原来车上有多少人？`,
          formulas: [
            { id: "brv-1", latex: `${finalCount} - ${getOn} = ${finalCount - getOn}\\text{ (人)}`, comment: "把刚上车的人请下去" },
            { id: "brv-2", latex: `${finalCount - getOn} + ${getOff} = ${orig}\\text{ (人)}`, comment: "把刚下车的人请回来" },
          ],
          steps: [
            {
              step: 1,
              tag: "逆向倒推",
              title: "时间倒流：上车的减掉，下车的加回！",
              narration: `把现在的 ${finalCount} 人里刚上车的 ${getOn} 人请下去（-${getOn}），再把刚下车的 ${getOff} 人请回座位（+${getOff}），算出原来有 ${orig} 人！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "现在车上", value: `${finalCount} 人` },
                { label: "请下刚上车的", value: `-${getOn} 人`, tone: "coral" },
                { label: "请回刚下车的", value: `+${getOff} 人`, tone: "blue" },
                { label: "原来车上有", value: `${orig} 人`, tone: "teal" },
              ],
              checkpoint: {
                question: "倒推原来的乘客数时，刚才“上车的人”应该怎么算？",
                options: ["加上去", "减掉"],
                correctIndex: 1,
                feedbackCorrect: "完全正确！时间倒流，刚上车的要减掉，刚下车的要加回来！",
                feedbackWrong: "想想时间倒流哦：上车让人数变多了，倒推回去就得减掉。",
              },
              sceneState: {
                kind: "segment-bar",
                annotation: `倒推还原：${finalCount} - ${getOn} + ${getOff} = ${orig} 人`,
                rows: [
                  {
                    id: "orig",
                    label: "原来车上",
                    color: "teal",
                    parts: 1,
                    partLabel: `${orig} 人`,
                    visualTotalRatio: 0.65,
                  },
                  {
                    id: "now",
                    label: "现在车上",
                    color: "blue",
                    parts: 1,
                    partLabel: `${finalCount} 人`,
                    visualTotalRatio: 0.78,
                  },
                ],
              },
            },
          ],
        };
      },
    },
    {
      id: "var-2",
      modeLabel: "两车调配",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：两辆大巴怎么换座才能一样多？",
      subtitle: "乘车 + 移多补少综合！",
      defaultParams: { bus2: 14, diff: 10 },
      paramDefs: [
        { key: "bus2", label: "2号车人数", min: 10, max: 22, step: 1, unit: "人" },
        { key: "diff", label: "1号车多出人数", min: 4, max: 14, step: 2, unit: "人" },
      ],
      build: (params) => {
        const bus2 = params.bus2 ?? 14;
        const diff = params.diff ?? 10;
        const bus1 = bus2 + diff;
        const move = diff / 2;

        return {
          problemStatement: `春游坐大巴，1 号车坐了 ${bus1} 人，2 号车坐了 ${bus2} 人。要从 1 号车调几人到 2 号车，两辆车的人数才一样多？`,
          formulas: [
            { id: "brb-1", latex: `${bus1} - ${bus2} = ${diff}\\text{ (人)}`, comment: "1号车比2号车多的人数" },
            { id: "brb-2", latex: `${diff} \\div 2 = ${move}\\text{ (人)}`, comment: "把多出来的一半调过去" },
          ],
          steps: [
            {
              step: 1,
              tag: "看图调配",
              title: `多出来的 ${diff} 人对半切，调 ${move} 人去 2 号车`,
              narration: `把 1 号车多出的 ${diff} 人对半切开，留下 ${move} 人，调 ${move} 人上 2 号车，两辆车就都是 ${bus2 + move} 人啦！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "1号车原有", value: `${bus1} 人` },
                { label: "2号车原有", value: `${bus2} 人` },
                { label: "调走人数", value: `${move} 人`, tone: "coral" },
                { label: "调后每车", value: `${bus2 + move} 人`, tone: "teal" },
              ],
              sceneState: {
                kind: "segment-bar",
                visualMode: "dots",
                dotVisual: {
                  unitName: "人",
                  row1Label: "1号车",
                  row2Label: "2号车",
                  row1Count: bus1,
                  row2Count: bus2,
                  movedCount: move,
                  showSplitGuide: false,
                },
                annotation: `从 1 号车调 ${move} 人到 2 号车，两车都是 ${bus2 + move} 人！`,
                rows: [],
              },
            },
          ],
        };
      },
    },
  ],
};
