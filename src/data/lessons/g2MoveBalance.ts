import type { MathLesson } from "../../types/lesson";

export const g2MoveBalanceLesson: MathLesson = {
  id: "g2-move-balance",
  chapterId: "g2-juyifansan-move",
  chapterTitle: "00. 二年级 · 间隔与推理",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "第 13 周",
  title: "移多补少（多出的一半送给谁？）",
  summary: "把多出来的那一段“切下一半”放到少的那一边，两排瞬间变得一样多！",
  engine: "segment-bar",
  keywords: ["二年级", "移多补少", "平分", "相差", "举一反三"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "08. 逆向思维训练",
      weekLabel: "p.84",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "移多补少例题",
      bookPart: "A版",
      tier: "base",
      title: "第一排比第二排多，要移几个才一样多？",
      subtitle: "千万别把多出来的全给别人！只给“多出的一半”",
      defaultParams: { row2: 8, diff: 6 },
      paramDefs: [
        { key: "row2", label: "第二排小红花", min: 5, max: 12, step: 1, unit: "朵" },
        { key: "diff", label: "第一排多出的朵数", min: 2, max: 10, step: 2, unit: "朵" },
      ],
      build: (params) => {
        const row2 = params.row2 ?? 8;
        const diff = params.diff ?? 6;
        const row1 = row2 + diff;
        const half = diff / 2;
        const balanced = row2 + half;

        return {
          problemStatement: `第一行摆了 ${row1} 朵小红花，第二行摆了 ${row2} 朵小红花。从第一行移几朵到第二行，两行的小红花就一样多了？`,
          formulas: [
            { id: "g2m-1", latex: `${row1} - ${row2} = ${diff}\\text{ (朵)}`, comment: "先算第一行比第二行多多少" },
            { id: "g2m-2", latex: `${diff} \\div 2 = ${half}\\text{ (朵)}`, comment: "把多出来的一半移过去！" },
          ],
          steps: [
            {
              step: 1,
              tag: "对齐找差",
              title: "左端对齐，找出多出的部分",
              narration: `第一行 ${row1} 朵，第二行 ${row2} 朵。两行左端对齐一比，第一行多出来的尾巴有 ${row1} - ${row2} = ${diff} 朵！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "第一行原有", value: `${row1} 朵` },
                { label: "第二行原有", value: `${row2} 朵` },
                { label: "多出尾巴", value: `${diff} 朵`, tone: "coral" },
                { label: "需要移动", value: "?" },
              ],
              sceneState: {
                kind: "segment-bar",
                visualMode: "dots",
                dotVisual: {
                  unitName: "朵小红花",
                  row1Label: "第一行",
                  row2Label: "第二行",
                  row1Count: row1,
                  row2Count: row2,
                  movedCount: 0,
                  showSplitGuide: true,
                },
                annotation: `第一行比第二行多出 ${diff} 朵小红花，从中间对半切开！`,
                rows: [
                  {
                    id: "r1",
                    label: "第一行",
                    color: "coral",
                    parts: 1,
                    partLabel: `${row2} 朵`,
                    extraValue: diff,
                    extraLabel: `多 ${diff} 朵`,
                    extraState: "highlighted",
                    visualTotalRatio: 0.82,
                  },
                  {
                    id: "r2",
                    label: "第二行",
                    color: "teal",
                    parts: 1,
                    partLabel: `${row2} 朵`,
                    visualTotalRatio: 0.56,
                  },
                ],
                diffGuide: { label: `多出 ${diff} 朵`, fromRow: 0, toRow: 1, highlight: true },
              },
            },
            {
              step: 2,
              tag: "平分尾巴",
              title: `把多出的 ${diff} 朵对半切，移 ${half} 朵过去！`,
              narration: `如果把 ${diff} 朵全给第二行，第二行又会反过来多 ${diff} 朵！所以要把多出的 ${diff} 朵分成两半：自己留 ${half} 朵，拿 ${half} 朵放到第二行，两边都是 ${balanced} 朵！`,
              tipTitle: "移多补少金句",
              tipBody: "相差数 ÷ 2 = 移动数！（移动 1 个，差距缩小 2 个！）",
              activeFormulaIndices: [1],
              liveStats: [
                { label: "多出总数", value: `${diff} 朵` },
                { label: "移过去一半", value: `${half} 朵`, tone: "coral" },
                { label: "第一行现在", value: `${balanced} 朵`, tone: "teal" },
                { label: "第二行现在", value: `${balanced} 朵`, tone: "teal" },
              ],
              checkpoint: {
                question: `如果第一行给第二行 ${diff} 朵（全给过去），结果会怎样？`,
                options: ["两行一样多", `第二行反而比第一行多 ${diff} 朵`],
                correctIndex: 1,
                feedbackCorrect: `答对了！全给过去就像“跷跷板”翻了过来，所以只能给多出的一半！`,
                feedbackWrong: `算算看：第一行变成 ${row2}，第二行变成 ${row1}，反过来了哦！`,
              },
              sceneState: {
                kind: "segment-bar",
                visualMode: "dots",
                dotVisual: {
                  unitName: "朵小红花",
                  row1Label: "第一行",
                  row2Label: "第二行",
                  row1Count: row1,
                  row2Count: row2,
                  movedCount: half,
                  showSplitGuide: false,
                },
                annotation: `多出来的 ${half} 朵小红花飞到第二行，两边都是 ${balanced} 朵！`,
                rows: [
                  {
                    id: "r1",
                    label: "第一行",
                    color: "coral",
                    parts: 1,
                    partLabel: `${row2}`,
                    extraValue: half,
                    extraLabel: `留${half}`,
                    extraState: "normal",
                    transferNote: `送出 ${half} 朵 ↓`,
                    visualTotalRatio: 0.69,
                  },
                  {
                    id: "r2",
                    label: "第二行",
                    color: "teal",
                    parts: 1,
                    partLabel: `${row2}`,
                    extraValue: half,
                    extraLabel: `得${half}`,
                    extraState: "highlighted",
                    visualTotalRatio: 0.69,
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
      modeLabel: "倒推相差",
      bookPart: "A版",
      tier: "standard",
      title: "甲给乙几支铅笔后一样多，原来相差几支？",
      subtitle: "顺着算除以 2，反过来求原差就要乘 2",
      defaultParams: { give: 5, afterEqual: 14 },
      paramDefs: [
        { key: "give", label: "哥哥给妹妹几支", min: 2, max: 8, step: 1, unit: "支" },
        { key: "afterEqual", label: "相等后每人有", min: 10, max: 20, step: 1, unit: "支" },
      ],
      build: (params) => {
        const give = params.give ?? 5;
        const eq = params.afterEqual ?? 14;
        const origBrother = eq + give;
        const origSister = eq - give;
        const diff = give * 2;

        return {
          problemStatement: `哥哥给妹妹 ${give} 支铅笔后，两人的铅笔就同样多（各有 ${eq} 支）。原来哥哥比妹妹多几支铅笔？`,
          formulas: [
            { id: "g2mv1-1", latex: `${give} \\times 2 = ${diff}\\text{ (支)}`, comment: "原差 = 移动数 × 2" },
            { id: "g2mv1-2", latex: `${eq} + ${give} = ${origBrother}\\text{ (支)}`, comment: "哥哥原来有（倒推加回来）" },
            { id: "g2mv1-3", latex: `${eq} - ${give} = ${origSister}\\text{ (支)}`, comment: "妹妹原来有（倒推还回去）" },
          ],
          steps: [
            {
              step: 1,
              tag: "反过来想",
              title: `给 ${give} 支变相等 → 原来多出 ${give} × 2 = ${diff} 支`,
              narration: `哥哥少了 ${give} 支，妹妹多了 ${give} 支，才变成一样多（${eq} 支）！所以哥哥原来有 ${origBrother} 支，妹妹原来有 ${origSister} 支，相差 ${diff} 支。`,
              activeFormulaIndices: [0, 1, 2],
              liveStats: [
                { label: "原来相差", value: `${diff} 支`, tone: "coral" },
                { label: "哥哥原有", value: `${origBrother} 支` },
                { label: "妹妹原有", value: `${origSister} 支` },
                { label: "相等时各有", value: `${eq} 支`, tone: "teal" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `把给出去的 ${give} 支拿回来：哥哥 ${origBrother} 支，妹妹 ${origSister} 支`,
                rows: [
                  {
                    id: "bro",
                    label: "哥哥",
                    color: "coral",
                    parts: 1,
                    partLabel: `${origSister}`,
                    extraValue: diff,
                    extraLabel: `多 ${diff} 支`,
                    extraState: "highlighted",
                    visualTotalRatio: 0.82,
                  },
                  {
                    id: "sis",
                    label: "妹妹",
                    color: "teal",
                    parts: 1,
                    partLabel: `${origSister}`,
                    visualTotalRatio: 0.54,
                  },
                ],
                diffGuide: { label: `2×${give}=${diff}支`, fromRow: 0, toRow: 1, highlight: true },
              },
            },
          ],
        };
      },
    },
    {
      id: "var-2",
      modeLabel: "给出后还差",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：本来一样多，给对方几颗后相差多少？",
      subtitle: "原本同样多，只要“此消彼长”，差距一下子拉开 2 倍！",
      defaultParams: { start: 16, give: 4 },
      paramDefs: [
        { key: "start", label: "原本每人糖果数", min: 10, max: 24, step: 2, unit: "颗" },
        { key: "give", label: "小军给小红几颗", min: 2, max: 8, step: 1, unit: "颗" },
      ],
      build: (params) => {
        const start = params.start ?? 16;
        const give = params.give ?? 4;
        const junNow = start - give;
        const hongNow = start + give;
        const diffNow = give * 2;

        return {
          problemStatement: `小军和小红原来有同样多的糖果（各 ${start} 颗）。小军给了小红 ${give} 颗后，现在小红比小军多几颗？`,
          formulas: [
            { id: "g2mv2-1", latex: `${start} - ${give} = ${junNow}\\text{ (颗)}`, comment: "小军剩下的" },
            { id: "g2mv2-2", latex: `${start} + ${give} = ${hongNow}\\text{ (颗)}`, comment: "小红现在的" },
            { id: "g2mv2-3", latex: `${give} \\times 2 = ${diffNow}\\text{ (颗)}`, comment: "快速秒杀：相差 = 给出数 × 2" },
          ],
          steps: [
            {
              step: 1,
              tag: "起跑相同",
              title: `一开始，两排一样长（各 ${start} 颗）`,
              narration: `起初两人的线段完全对齐，都是 ${start} 颗，差距为 0。`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "小军原有", value: `${start} 颗` },
                { label: "小红原有", value: `${start} 颗` },
                { label: "初始差距", value: "0 颗" },
                { label: "准备给出", value: `${give} 颗`, tone: "coral" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `初始状态：两人都有 ${start} 颗，完全一样多`,
                rows: [
                  { id: "jun", label: "小军", color: "blue", parts: 1, partLabel: `${start}颗`, visualTotalRatio: 0.65 },
                  { id: "hong", label: "小红", color: "teal", parts: 1, partLabel: `${start}颗`, visualTotalRatio: 0.65 },
                ],
              },
            },
            {
              step: 2,
              tag: "此消彼长",
              title: `小军少 ${give}，小红多 ${give} → 相差 ${diffNow} 颗！`,
              narration: `小军少了一截 ${give} 颗，同时小红长出了一截 ${give} 颗。一退一进，两人就拉开了 ${give} + ${give} = ${diffNow} 颗的差距！`,
              activeFormulaIndices: [0, 1, 2],
              liveStats: [
                { label: "小军现在", value: `${junNow} 颗` },
                { label: "小红现在", value: `${hongNow} 颗`, tone: "teal" },
                { label: "现在相差", value: `${diffNow} 颗`, tone: "coral" },
                { label: "秒杀公式", value: `${give} × 2` },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `一减一加拉开双倍差距：${hongNow} - ${junNow} = ${diffNow} 颗`,
                rows: [
                  {
                    id: "jun",
                    label: "小军",
                    color: "blue",
                    parts: 1,
                    partLabel: `${junNow}`,
                    extraValue: give,
                    extraLabel: `少${give}`,
                    extraState: "faded",
                    visualTotalRatio: 0.65,
                  },
                  {
                    id: "hong",
                    label: "小红",
                    color: "coral",
                    parts: 1,
                    partLabel: `${start}`,
                    extraValue: give,
                    extraLabel: `+${give}`,
                    extraState: "highlighted",
                    visualTotalRatio: 0.82,
                  },
                ],
                diffGuide: { label: `相差 ${diffNow} 颗`, fromRow: 0, toRow: 1, highlight: true },
              },
            },
          ],
        };
      },
    },
  ],
};
