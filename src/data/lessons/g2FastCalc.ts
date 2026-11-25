import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";

export const g2FastCalcLesson: MathLesson = {
  id: "g2-fast-calc",
  chapterId: "g2-transform-thinking",
  chapterTitle: "05. 转化思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.36",
  title: "简便计算（好朋友凑整与搬家）",
  summary: "把能凑成 10、100 的“好朋友数”先拉手抱团，再把接近整十的数转化成整十数！",
  engine: "combo-visual",
  keywords: ["二年级", "简便计算", "转化思维", "凑十", "带符号搬家"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "05. 转化思维训练",
      weekLabel: "p.36",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 好朋友凑整例题",
      bookPart: "A版",
      tier: "base",
      title: "27 + 46 + 13：先让谁和谁抱团？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { a: 27, b: 46, c: 13 },
      paramDefs: [
        { key: "a", label: "第一个加数", min: 17, max: 37, step: 10, unit: "" },
        { key: "b", label: "中间的加数", min: 26, max: 56, step: 10, unit: "" },
        { key: "c", label: "第三个加数", min: 13, max: 33, step: 10, unit: "" },
      ],
      build: (params) => {
        const a = params.a ?? 27;
        const b = params.b ?? 46;
        const c = params.c ?? 13;
        const pairSum = a + c;
        const total = pairSum + b;

        return {
          problemStatement: `巧算下面这道加法题：${a} + ${b} + ${c} = ？`,
          formulas: [
            { id: "fc-1", latex: `(${a} + ${c}) + ${b}`, comment: `${a} 和 ${c} 先凑整` },
            { id: "fc-2", latex: `= ${pairSum} + ${b} = ${total}`, comment: "整十数加两位数，口算秒出" },
          ],
          steps: teachingSteps([
{ title: `先找谁和谁凑起来容易算？`, narration: `观察 ${a}、${b}、${c}。看看个位上的数字，哪两个放在一起更容易凑成整十？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `${a}`, tone: "coral" },{ id: `c1`, text: `${b}`, tone: "teal" },{ id: `c2`, text: `${c}`, tone: "teal" }], rows: [], annotation: `先找容易凑整的一对` }, activeFormulaIndices: [] },
{ title: `先把好朋友合起来，得到多少？`, narration: `把 ${a} 和 ${c} 放在一起。请自己算出它们的和，先不要急着把三个数一起算。`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `${a}`, tone: "coral" },{ id: `c1`, text: `${c}`, tone: "teal" },{ id: `c2`, text: `${b}`, tone: "teal" }], rows: [{ label: `先合起来`, badge: `?`, active: true }], annotation: `` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`这两个好朋友的和是几？`, pairSum, ``, `先算凑整的一对。`) },
{ title: `整十数找到后，还要加上谁？`, narration: `${a} 和 ${c} 合起来是 ${pairSum}。还有 ${b} 没加，最后的和是多少？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `${pairSum}`, tone: "coral" },{ id: `c1`, text: `${b}`, tone: "teal" }], rows: [{ label: `最后的和`, badge: `?`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`三个数的和是几？`, total, ``, `别漏掉中间那个还没加的数。`) },
{ tag: `验证与回顾`, title: `${pairSum} + ${b} = ${total}`, narration: `${pairSum} 是整十数，加上 ${b} 口算就能得到 ${total}！`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "整十中间和", value: `${pairSum}`, tone: "teal" },
                { label: "最终结果", value: `${total}`, tone: "coral" },
              ], sceneState: {
                kind: "combo-visual",
                mode: "make-ten",
                cards: [
                  { id: "c1", text: `${pairSum}`, tone: "teal" },
                  { id: "c2", text: `+ ${b}`, tone: "blue" },
                  { id: "c3", text: `= ${total}`, tone: "coral" },
                ],
                rows: [
                  { label: `第1步：${a} + ${c}`, badge: `${pairSum}` },
                  { label: `第2步：${pairSum} + ${b}`, badge: `${total}`, active: true },
                ],
                annotation: `好朋友凑整，一步变身简单口算：${total}`,
              }, tipBody: `先找凑整好朋友，再把剩下合起来。` }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 多加要减（凑整）",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：54 + 29 怎么算最快？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { base: 54 },
      paramDefs: [
        { key: "base", label: "第一个加数", min: 34, max: 64, step: 10, unit: "" },
      ],
      build: (params) => {
        const base = params.base ?? 54;
        const ans = base + 29;
        return {
          problemStatement: `巧算：${base} + 29 = ？`,
          formulas: [
            { id: "fcb-1", latex: `${base} + 30 - 1`, comment: "把 29 转化成 30 - 1" },
            { id: "fcb-2", latex: `= ${base + 30} - 1 = ${ans}`, comment: "多加了 1 要减 1" },
          ],
          steps: teachingSteps([
{ title: `29 离哪个整十数最近？`, narration: `算 ${base} 加 29 时，如果先加一个整十数，会不会更容易？先找 29 邻近的整十数。`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `${base}`, tone: "coral" },{ id: `c1`, text: `29`, tone: "teal" }], rows: [], annotation: `先找邻近的整十数` }, activeFormulaIndices: [] },
{ title: `先多加到整十数，暂时得到多少？`, narration: `29 比 30 少 1。先试着把 ${base} 加上 30，暂时得到多少？这个结果比题目需要的多还是少？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `${base}`, tone: "coral" },{ id: `c1`, text: `先加 30`, tone: "teal" }], rows: [{ label: `暂时结果`, badge: `?`, active: true }], annotation: `` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`暂时加 30 得多少？`, base + 30, ``, `这里多加了 1，最后还要调整。`) },
{ title: `多加的这一点，怎样还回去？`, narration: `先加 30 得 ${base + 30}，比加 29 多加了 1。要得到原题的结果，接下来应该怎样改？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `${base + 30}`, tone: "coral" },{ id: `c1`, text: `多加了 1`, tone: "teal" }], rows: [{ label: `原题结果`, badge: `?`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`原题 ${base} 加 29 等于几？`, ans, ``, `把多加的 1 减回来。`) },
{ tag: `验证与回顾`, title: "借 1 变成整十数 30，算完还 1！", narration: `29 差 1 就到 30 了！先算 ${base} + 30 = ${base + 30}，因为刚才多加了 1，最后减回 1，得到 ${ans}！`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "把 29 变成", value: "30 - 1", tone: "coral" },
                { label: "先加 30", value: `${base + 30}` },
                { label: "再减 1", value: `${ans}`, tone: "teal" },
              ], sceneState: {
                kind: "combo-visual",
                mode: "make-ten",
                cards: [
                  { id: "b1", text: `${base}`, tone: "blue" },
                  { id: "b2", text: `+ 30`, tone: "teal" },
                  { id: "b3", text: `- 1`, tone: "coral" },
                ],
                rows: [
                  { label: "原式转化：+ 29 → + 30 - 1", badge: "多加要减", active: true },
                  { label: `结果：${base + 30} - 1`, badge: `= ${ans}`, active: true },
                ],
                annotation: "接近整十的数，先按整十加，多加了几再减几！",
              }, tipBody: `凑整算得快，多加要减回。` }
]),
        };
      },
    },
  ],
};
