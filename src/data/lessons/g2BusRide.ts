import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";

export const g2BusRideLesson: MathLesson = {
  id: "g2-bus-ride",
  chapterId: "g2-overall-thinking",
  chapterTitle: "01. 整体思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.6",
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
      modeLabel: "基础例题 · 整体变化例题",
      bookPart: "A版",
      tier: "base",
      title: "公交车到站后，现在还有几人？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
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
          steps: teachingSteps([
{ title: `到站后，车上的人会变多还是变少？`, narration: `车上原有 ${initial} 人。下去 ${getOff} 人，又上来 ${getOn} 人。先比一比进来和出去的人数。`, sceneState: { kind: "segment-bar", visualMode: "bus", busVisual: { initial: initial, getOff: getOff, getOn: getOn, phase: `observe` }, rows: [], annotation: `下车 ${getOff} 人，上车 ${getOn} 人` }, activeFormulaIndices: [], liveStats: [{ label: `原来`, value: `${initial} 人` },{ label: `现在`, value: `? 人` }] },
{ title: `先补回空位，还多出几人？`, narration: `上车的人更多，车上会变多。先让 ${getOff} 个上车的人补回空位，剩下几个是真正多出来的？`, sceneState: { ...({ kind: "segment-bar", visualMode: "bus", busVisual: { initial: initial, getOff: getOff, getOn: getOn, phase: `offset` }, rows: [], annotation: `下车 ${getOff} 人，上车 ${getOn} 人` }), busVisual: { initial, getOff, getOn, phase: "offset", hideNetChange: true } }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`上车的人补回空位后，还多出几人？`, netChange, ` 人`, `用上车人数减去下车人数。`) },
{ title: `多出的乘客找到了，现在共有几人？`, narration: `上来 ${getOn} 人，补回 ${getOff} 个空位，还多出 ${netChange} 人。原来有 ${initial} 人，现在该怎样合起来？`, sceneState: { kind: "segment-bar", visualMode: "bus", busVisual: { initial: initial, getOff: getOff, getOn: getOn, phase: `offset` }, rows: [], annotation: `下车 ${getOff} 人，上车 ${getOn} 人` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`现在车上共有几人？`, finalCount, ` 人`, `把原来的人数和多出的人数合起来。`) },
{ tag: `验证与回顾`, title: `原来 ${initial} 人加上多出的 ${netChange} 人 = ${finalCount} 人`, narration: `既然一进一出后车上比原来多出了 ${netChange} 人，直接算 ${initial} + ${netChange} = ${finalCount} 人！我们也可以按顺序验算一遍：${initial} - ${getOff} + ${getOn} = ${finalCount} 人，完全一样！`, tipTitle: "整体思维小口诀", tipBody: "先比上车和下车，抵消相同留多出，再和原来合一起，又快又不易出错！", activeFormulaIndices: [0, 1], liveStats: [
                { label: "原来人数", value: `${initial} 人` },
                { label: "多出人数", value: `+${netChange} 人`, tone: "coral" },
                { label: "现在车上共有", value: `${finalCount} 人`, tone: "teal" },
                { label: "顺序验算", value: `${initial}-${getOff}+${getOn}=${finalCount} ✓` },
              ], sceneState: {
                kind: "segment-bar",
                visualMode: "bus",
                busVisual: { initial, getOff, getOn, phase: "total" },
                annotation: `现在车上一共有 ${initial} + ${netChange} = ${finalCount} 名乘客`,
                rows: [],
              } }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "举一反三 · 倒推原来几人",
      bookPart: "A版",
      tier: "standard",
      title: "知道现在车上有几人，倒推原来有几人？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
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
          steps: teachingSteps([
{ title: `倒着回到到站前，先让谁下车？`, narration: `现在有 ${finalCount} 人。刚才上车的 ${getOn} 人还在车上，想还原到他们上车前，先加还是先减？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `🚌 现在 ${finalCount} 人`, tone: "coral" },{ id: `c1`, text: `上车 ${getOn} 人`, tone: "teal" },{ id: `c2`, text: `下车 ${getOff} 人`, tone: "teal" }], rows: [], annotation: `原来有 ? 人` }, activeFormulaIndices: [] },
{ title: `先请刚上车的人下去，还剩几人？`, narration: `倒着想，刚才上车的人要先减掉。算一算 ${finalCount} 减 ${getOn}，暂时还剩多少人？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `${finalCount} 人`, tone: "coral" },{ id: `c1`, text: `减去 ${getOn} 人`, tone: "teal" }], rows: [{ label: `暂时剩下`, badge: `? 人`, active: true }], annotation: `` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`请刚上车的人下去，还剩几人？`, finalCount - getOn, ` 人`, `先撤销最后发生的上车。`) },
{ title: `刚下车的人也要请回来，原来几人？`, narration: `先还原到 ${finalCount - getOn} 人，再把刚才下车的 ${getOff} 人请回来。现在你能算出原来的人数了吗？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `${finalCount - getOn} 人`, tone: "coral" },{ id: `c1`, text: `加回 ${getOff} 人`, tone: "teal" }], rows: [{ label: `原来`, badge: `? 人`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`原来车上有多少人？`, orig, ` 人`, `下车让人变少，倒回去就要加回来。`) },
{ tag: `验证与回顾`, title: `原来 ${orig} 人加上多出的 ${getOn - getOff} 人 = ${finalCount} 人`, narration: `原来有 ${orig} 人。顺着验算：${orig} - ${getOff} + ${getOn} = ${finalCount}，正好回到题目的人数。`, tipTitle: "整体思维小口诀", tipBody: `倒推要倒着走，上车减回、下车加回。`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "原来人数", value: `${orig} 人` },
                { label: "多出人数", value: `+${getOn - getOff} 人`, tone: "coral" },
                { label: "现在车上共有", value: `${finalCount} 人`, tone: "teal" },
                { label: "顺序验算", value: `${orig}-${getOff}+${getOn}=${finalCount} ✓` },
              ], sceneState: {
                kind: "segment-bar",
                visualMode: "bus",
                busVisual: { initial: orig, getOff, getOn, phase: "total" },
                annotation: `现在车上一共有 ${orig} + ${getOn - getOff} = ${finalCount} 名乘客`,
                rows: [],
              } }
]),
        };
      },
    },
    {
      id: "var-2",
      modeLabel: "拓展拔高 · 两车调配",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：两辆大巴怎么换座才能一样多？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
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
          steps: teachingSteps([
{ title: `两辆车的人数怎样变得一样多？`, narration: `1 号车有 ${bus1} 人，2 号车有 ${bus2} 人。要从哪辆车向哪辆车调人？先看看谁多。`, sceneState: { ...({
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
              }), dotVisual: { unitName: "人", row1Label: "1号车", row2Label: "2号车", row1Count: bus1, row2Count: bus2, movedCount: 0 }, annotation: `先比人数，暂不调动` }, activeFormulaIndices: [] },
{ title: `对齐两车，多出的部分有几人？`, narration: `两车相同的部分先放一边。1 号车比 2 号车多几人？先算人数差。`, sceneState: { ...({
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
              }), dotVisual: { unitName: "人", row1Label: "1号车", row2Label: "2号车", row1Count: bus1, row2Count: bus2, movedCount: 0 }, annotation: `多出的部分：? 人` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`两车相差几人？`, diff, ` 人`, `用较多人数减去较少人数。`) },
{ title: `多出的部分，应该全调过去吗？`, narration: `两车相差 ${diff} 人。调走 1 人，1 号车少 1 人，2 号车多 1 人。要一样多，应该把多出的部分怎样分？`, sceneState: { ...({
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
              }), dotVisual: { unitName: "人", row1Label: "1号车", row2Label: "2号车", row1Count: bus1, row2Count: bus2, movedCount: 0, showSplitGuide: true }, annotation: `多出 ${diff} 人，调走 ? 人` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`应从 1 号车调几人过去？`, move, ` 人`, `调走 1 人，两车差距会缩小 2 人。`) },
{ tag: `验证与回顾`, title: `多出来的 ${diff} 人对半切，调 ${move} 人去 2 号车`, narration: `调 ${move} 人。验算：${bus1} - ${move} = ${bus2 + move}，${bus2} + ${move} = ${bus2 + move}，两车一样多。`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "1号车原有", value: `${bus1} 人` },
                { label: "2号车原有", value: `${bus2} 人` },
                { label: "调走人数", value: `${move} 人`, tone: "coral" },
                { label: "调后每车", value: `${bus2 + move} 人`, tone: "teal" },
              ], sceneState: {
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
              }, tipBody: `相同部分先对齐，多出部分分两半。` }
]),
        };
      },
    },
  ],
};
