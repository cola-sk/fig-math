import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";
export const g2MoveBalanceLesson: MathLesson = {
  id: "g2-move-balance",
  chapterId: "g2-juyifansan-move",
  chapterTitle: "08. 逆向思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.84",
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
      modeLabel: "基础例题 · 移多补少例题",
      bookPart: "A版",
      tier: "base",
      title: "第一排比第二排多，要移几个才一样多？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { row2: 8, diff: 6 },
      paramDefs: [
        {
          key: "row2",
          label: "第二排小红花",
          min: 5,
          max: 12,
          step: 1,
          unit: "朵",
        },
        {
          key: "diff",
          label: "第一排多出的朵数",
          min: 2,
          max: 10,
          step: 2,
          unit: "朵",
        },
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
            {
              id: "g2m-1",
              latex: `${row1} - ${row2} = ${diff}\\text{ (朵)}`,
              comment: "先算第一行比第二行多多少",
            },
            {
              id: "g2m-2",
              latex: `${diff} \\div 2 = ${half}\\text{ (朵)}`,
              comment: "把多出来的一半移过去！",
            },
          ],
          steps: teachingSteps([
            {
              title: `要让两行一样多，应该从哪行往哪行移？`,
              narration: `第一行 ${row1} 朵，第二行 ${row2} 朵。先找到多的一行和少的一行，不急着移动。`,
              sceneState: {
                kind: "segment-bar",
                visualMode: "dots",
                dotVisual: {
                  unitName: `朵小红花`,
                  row1Label: `第一行`,
                  row2Label: `第二行`,
                  row1Count: row1,
                  row2Count: row2,
                  movedCount: 0,
                  showSplitGuide: false,
                },
                rows: [],
                annotation: `先把相同的部分一一对应`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `一一对齐后，第一行多几朵？`,
              narration: `把两行相同的部分对齐。看看第一行多出的尾巴，应该怎样算出它有几朵？`,
              sceneState: {
                kind: "segment-bar",
                visualMode: "dots",
                dotVisual: {
                  unitName: `朵小红花`,
                  row1Label: `第一行`,
                  row2Label: `第二行`,
                  row1Count: row1,
                  row2Count: row2,
                  movedCount: 0,
                  showSplitGuide: false,
                },
                rows: [],
                annotation: `先把相同的部分一一对应`,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `两行相差几朵？`,
                diff,
                ` 朵`,
                `从较多的一行减去较少的一行。`,
              ),
            },
            {
              title: `多出来的部分，怎样分给两行？`,
              narration: `第一行多 ${diff} 朵。移动 1 朵，上面少 1 朵，下面多 1 朵，差距就缩小 2 朵。应该移多少？`,
              sceneState: {
                kind: "segment-bar",
                visualMode: "dots",
                dotVisual: {
                  unitName: `朵小红花`,
                  row1Label: `第一行`,
                  row2Label: `第二行`,
                  row1Count: row1,
                  row2Count: row2,
                  movedCount: 0,
                  showSplitGuide: true,
                },
                rows: [],
                annotation: `先把相同的部分一一对应`,
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `应该移几朵？`,
                half,
                ` 朵`,
                `把多出的部分平均分给两行。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `把多出的 ${diff} 朵对半切，移 ${half} 朵过去！`,
              narration: `如果把 ${diff} 朵全给第二行，第二行又会反过来多 ${diff} 朵！所以要把多出的 ${diff} 朵分成两半：自己留 ${half} 朵，拿 ${half} 朵放到第二行，两边都是 ${balanced} 朵！`,
              tipTitle: "移多补少金句",
              tipBody: "相差数 ÷ 2 = 移动数！（移动 1 个，差距缩小 2 个！）",
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "多出总数", value: `${diff} 朵` },
                { label: "移过去一半", value: `${half} 朵`, tone: "coral" },
                { label: "第一行现在", value: `${balanced} 朵`, tone: "teal" },
                { label: "第二行现在", value: `${balanced} 朵`, tone: "teal" },
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
          ]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "举一反三 · 倒推相差",
      bookPart: "A版",
      tier: "standard",
      title: "甲给乙几支铅笔后一样多，原来相差几支？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { give: 5, afterEqual: 14 },
      paramDefs: [
        {
          key: "give",
          label: "哥哥给妹妹几支",
          min: 2,
          max: 8,
          step: 1,
          unit: "支",
        },
        {
          key: "afterEqual",
          label: "相等后每人有",
          min: 10,
          max: 20,
          step: 1,
          unit: "支",
        },
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
            {
              id: "g2mv1-1",
              latex: `${give} \\times 2 = ${diff}\\text{ (支)}`,
              comment: "原差 = 移动数 × 2",
            },
            {
              id: "g2mv1-2",
              latex: `${eq} + ${give} = ${origBrother}\\text{ (支)}`,
              comment: "哥哥原来有（倒推加回来）",
            },
            {
              id: "g2mv1-3",
              latex: `${eq} - ${give} = ${origSister}\\text{ (支)}`,
              comment: "妹妹原来有（倒推还回去）",
            },
          ],
          steps: teachingSteps([
            {
              title: `给完后一样多，倒回去时谁应增加？`,
              narration: `给完后兄妹各有 ${eq} 支。把妹妹收到的 ${give} 支还给哥哥，哥哥和妹妹各会发生什么变化？`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `哥哥 ${eq} 支`, tone: "coral" },
                  { id: `c1`, text: `妹妹 ${eq} 支`, tone: "teal" },
                ],
                rows: [
                  {
                    label: `把 ${give} 支还回去`,
                    badge: `谁加，谁减？`,
                    active: true,
                  },
                ],
                annotation: ``,
              },
              activeFormulaIndices: [],
            },
            {
              title: `先还原哥哥原来的数量`,
              narration: `现在哥哥有 ${eq} 支，刚才给出了 ${give} 支。要回到给出前，哥哥原有多少支？`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `哥哥 ${eq} 支`, tone: "coral" },
                  { id: `c1`, text: `加回 ${give} 支`, tone: "teal" },
                ],
                rows: [{ label: `哥哥原有`, badge: `? 支`, active: true }],
                annotation: ``,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `哥哥原来有多少支？`,
                origBrother,
                ` 支`,
                `给出去的要加回来。`,
              ),
            },
            {
              title: `再还原妹妹，两人原来相差几支？`,
              narration: `哥哥原有 ${origBrother} 支。妹妹现在的 ${eq} 支里，要把收到的 ${give} 支还回去，原来是 ${origSister} 支。两人原来相差多少？`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `哥哥 ${origBrother} 支`, tone: "coral" },
                  { id: `c1`, text: `妹妹 ${origSister} 支`, tone: "teal" },
                ],
                rows: [{ label: `原来相差`, badge: `? 支`, active: true }],
                annotation: ``,
              },
              activeFormulaIndices: [1, 2],
              checkpoint: numberCheckpoint(
                `原来相差几支？`,
                diff,
                ` 支`,
                `一人加回、一人减回，差距包含两个给出数。`,
              ),
            },
            {
              tag: `验证与回顾`,
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
                diffGuide: {
                  label: `2×${give}=${diff}支`,
                  fromRow: 0,
                  toRow: 1,
                  highlight: true,
                },
              },
              tipBody: `一人减、一人加，原差是给出数的两倍。`,
            },
          ]),
        };
      },
    },
    {
      id: "var-2",
      modeLabel: "拓展拔高 · 给出后还差",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：本来一样多，给对方几颗后相差多少？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { start: 16, give: 4 },
      paramDefs: [
        {
          key: "start",
          label: "原本每人糖果数",
          min: 10,
          max: 24,
          step: 2,
          unit: "颗",
        },
        {
          key: "give",
          label: "小军给小红几颗",
          min: 2,
          max: 8,
          step: 1,
          unit: "颗",
        },
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
            {
              id: "g2mv2-1",
              latex: `${start} - ${give} = ${junNow}\\text{ (颗)}`,
              comment: "小军剩下的",
            },
            {
              id: "g2mv2-2",
              latex: `${start} + ${give} = ${hongNow}\\text{ (颗)}`,
              comment: "小红现在的",
            },
            {
              id: "g2mv2-3",
              latex: `${give} \\times 2 = ${diffNow}\\text{ (颗)}`,
              comment: "快速秒杀：相差 = 给出数 × 2",
            },
          ],
          steps: teachingSteps([
            {
              title: `原来一样多，给出后还会一样多吗？`,
              narration: `两人原来各 ${start} 颗。小军给小红 ${give} 颗后，谁会变多，谁会变少？`,
              sceneState: {
                kind: "segment-bar",
                rows: [
                  {
                    id: "jun",
                    label: "小军",
                    color: "blue",
                    parts: 1,
                    partLabel: `${start}颗`,
                    visualTotalRatio: 0.65,
                  },
                  {
                    id: "hong",
                    label: "小红",
                    color: "teal",
                    parts: 1,
                    partLabel: `${start}颗`,
                    visualTotalRatio: 0.65,
                  },
                ],
                annotation: `先看给出前，两人一样多`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `小军给出后剩几颗？`,
              narration: `小军给出 ${give} 颗，是从原来的 ${start} 颗里拿走。先只看小军，现在剩几颗？`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `小军原有 ${start} 颗`, tone: "coral" },
                  { id: `c1`, text: `给出 ${give} 颗`, tone: "teal" },
                ],
                rows: [{ label: `小军剩下`, badge: `? 颗`, active: true }],
                annotation: ``,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `小军现在有几颗？`,
                junNow,
                ` 颗`,
                `给出去，数量变少。`,
              ),
            },
            {
              title: `小红收到后，和小军相差几颗？`,
              narration: `小军剩 ${junNow} 颗，小红从 ${start} 颗增加到 ${hongNow} 颗。想想差距里有几段 ${give} 颗，再算相差多少。`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `小军 ${junNow} 颗`, tone: "coral" },
                  { id: `c1`, text: `小红 ${hongNow} 颗`, tone: "teal" },
                ],
                rows: [{ label: `现在相差`, badge: `? 颗`, active: true }],
                annotation: ``,
              },
              activeFormulaIndices: [0, 1],
              checkpoint: numberCheckpoint(
                `现在小红比小军多几颗？`,
                diffNow,
                ` 颗`,
                `一个少了给出数，一个多了给出数。`,
              ),
            },
            {
              tag: `验证与回顾`,
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
                diffGuide: {
                  label: `相差 ${diffNow} 颗`,
                  fromRow: 0,
                  toRow: 1,
                  highlight: true,
                },
              },
              tipBody: `原来一样多，一给一收，差距是给出数的两倍。`,
            },
          ]),
        };
      },
    },
  ],
};
