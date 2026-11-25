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
      modeLabel: "好朋友凑整例题",
      bookPart: "A版",
      tier: "base",
      title: "27 + 46 + 13：先让谁和谁抱团？",
      subtitle: "个位 7 和 3 凑成 10，先算它们快十倍！",
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
            { id: "fc-1", latex: `(${a} + ${c}) + ${b}`, comment: "好朋友数 27 和 13 先凑整！" },
            { id: "fc-2", latex: `= ${pairSum} + ${b} = ${total}`, comment: "整十数加两位数，口算秒出" },
          ],
          steps: [
            {
              step: 1,
              tag: "找好朋友",
              title: `发现好朋友：${a} 的尾巴 7 和 ${c} 的尾巴 3！`,
              narration: `别从左到右硬算 ${a} + ${b}！先看个位：7 + 3 = 10，所以 ${a} 和 ${c} 是一对能凑成整十的好朋友！`,
              tipTitle: "凑整好朋友",
              tipBody: "1 和 9、2 和 8、3 和 7、4 和 6、5 和 5，看见它们先抱团！",
              activeFormulaIndices: [0],
              liveStats: [
                { label: "好朋友组合", value: `${a} + ${c}`, tone: "coral" },
                { label: "凑成整十", value: `${pairSum}`, tone: "teal" },
                { label: "另一个数", value: `${b}` },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "make-ten",
                cards: [
                  { id: "c1", text: `${a}`, tone: "coral" },
                  { id: "c2", text: `+ ${b}`, tone: "muted" },
                  { id: "c3", text: `+ ${c}`, tone: "coral" },
                ],
                rows: [
                  { label: `先算好朋友：${a} + ${c}`, badge: `= ${pairSum}（整十！）`, active: true },
                ],
                annotation: `${a} 和 ${c} 个位 7+3=10，先抱团凑整！`,
              },
            },
            {
              step: 2,
              tag: "口算秒出",
              title: `${pairSum} + ${b} = ${total}`,
              narration: `${pairSum} 是整十数，加上 ${b} 一秒口算就能得到 ${total}！`,
              activeFormulaIndices: [1],
              liveStats: [
                { label: "整十中间和", value: `${pairSum}`, tone: "teal" },
                { label: "最终结果", value: `${total}`, tone: "coral" },
              ],
              sceneState: {
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
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "多加要减（凑整）",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：54 + 29 怎么算最快？",
      subtitle: "把 29 看成 30，多加了 1 再还回去！",
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
          steps: [
            {
              step: 1,
              tag: "凑整转化",
              title: "借 1 变成整十数 30，算完还 1！",
              narration: `29 差 1 就到 30 了！先算 ${base} + 30 = ${base + 30}，因为刚才多加了 1，最后减回 1，得到 ${ans}！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "把 29 变成", value: "30 - 1", tone: "coral" },
                { label: "先加 30", value: `${base + 30}` },
                { label: "再减 1", value: `${ans}`, tone: "teal" },
              ],
              sceneState: {
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
              },
            },
          ],
        };
      },
    },
  ],
};
