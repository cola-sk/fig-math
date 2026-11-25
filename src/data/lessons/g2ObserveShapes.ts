import type { MathLesson } from "../../types/lesson";

export const g2ObserveShapesLesson: MathLesson = {
  id: "g2-observe-shapes",
  chapterId: "g2-visual-thinking",
  chapterTitle: "04. 形象思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.28",
  title: "观察与数图形方块",
  summary: "把堆积在一起的小正方体“一列一列”或者“一层一层”数出来，被压在底下的也不会漏掉！",
  engine: "count-diagram",
  keywords: ["二年级", "形象思维", "数方块", "立体图形", "观察图形"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "04. 形象思维训练",
      weekLabel: "p.28",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "数立体方块例题",
      bookPart: "A版",
      tier: "base",
      title: "压在底下的方块看不见，怎么数才不漏？",
      subtitle: "竖着一列一列数，或者横着一层一层数！",
      defaultParams: { col1: 3, col2: 2, col3: 1 },
      paramDefs: [
        { key: "col1", label: "第1列高度", min: 2, max: 4, step: 1, unit: "块" },
        { key: "col2", label: "第2列高度", min: 1, max: 3, step: 1, unit: "块" },
        { key: "col3", label: "第3列高度", min: 1, max: 2, step: 1, unit: "块" },
      ],
      build: (params) => {
        const c1 = params.col1 ?? 3;
        const c2 = params.col2 ?? 2;
        const c3 = params.col3 ?? 1;
        const total = c1 + c2 + c3;

        return {
          problemStatement: `用小正方体搭成下面的一排积木：第 1 摞有 ${c1} 块，第 2 摞有 ${c2} 块，第 3 摞有 ${c3} 块。一共有多少块小正方体？`,
          formulas: [
            { id: "os-1", latex: `${c1} + ${c2} + ${c3} = ${total}\\text{ (块)}`, comment: "一列一列加起来，藏在下面的也不漏！" },
          ],
          steps: [
            {
              step: 1,
              tag: "标出每列",
              title: "先看每一摞有多高",
              narration: `上面的方块必须踩在下面的方块上，不能悬空！所以第 1 摞最上面是第 ${c1} 层，代表这一摞一共有 ${c1} 块。`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "第1摞", value: `${c1} 块` },
                { label: "第2摞", value: `${c2} 块` },
                { label: "第3摞", value: `${c3} 块` },
                { label: "总块数", value: "?" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "blocks",
                baseCount: 3,
                highlightSpan: 1,
                blockHeights: [c1, c2, c3],
                showHiddenNote: false,
                annotation: "每一摞从下往上堆起来，不能悬空",
              },
            },
            {
              step: 2,
              tag: "透视求和",
              title: `把三摞加起来：${c1} + ${c2} + ${c3} = ${total} 块`,
              narration: `红色框标出的底层方块虽然常常被前面的挡住，但只要按列数 ${c1} + ${c2} + ${c3} = ${total} 块，一块都不会漏掉！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "第1摞", value: `${c1} 块`, tone: "coral" },
                { label: "第2摞", value: `${c2} 块` },
                { label: "第3摞", value: `${c3} 块` },
                { label: "总块数", value: `${total} 块`, tone: "teal" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "blocks",
                baseCount: 3,
                highlightSpan: 1,
                blockHeights: [c1, c2, c3],
                showHiddenNote: true,
                annotation: `按列相加：${c1} + ${c2} + ${c3} = ${total} 块小正方体`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "缺几块补齐",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：补成一个 3×3 的大长方体还需要几块？",
      subtitle: "整体减去现有的，就是缺少的！",
      defaultParams: { col1: 3, col2: 2, col3: 1 },
      paramDefs: [
        { key: "col1", label: "第1列高度", min: 2, max: 3, step: 1, unit: "块" },
        { key: "col2", label: "第2列高度", min: 1, max: 3, step: 1, unit: "块" },
      ],
      build: (params) => {
        const c1 = params.col1 ?? 3;
        const c2 = params.col2 ?? 2;
        const c3 = 1;
        const current = c1 + c2 + c3;
        const full = 9;
        const need = full - current;

        return {
          problemStatement: `现在有 ${current} 块小正方体，想把这 3 摞全部补齐成“每摞都是 3 块”的大墙（共 9 块），还需要添上几块？`,
          formulas: [
            { id: "osv-1", latex: `3 \\times 3 = 9\\text{ (块)}`, comment: "补齐后的总块数" },
            { id: "osv-2", latex: `9 - ${current} = ${need}\\text{ (块)}`, comment: "还需要的块数" },
          ],
          steps: [
            {
              step: 1,
              tag: "补齐思考",
              title: `一共需要 9 块，已有 ${current} 块，还缺 ${need} 块`,
              narration: `3 摞每摞 3 块一共是 9 块，减去现有的 ${current} 块，还需要 ${need} 块！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "补齐总数", value: "9 块" },
                { label: "已有块数", value: `${current} 块` },
                { label: "还缺块数", value: `${need} 块`, tone: "coral" },
              ],
              sceneState: {
                kind: "count-diagram",
                mode: "blocks",
                baseCount: 3,
                highlightSpan: 1,
                blockHeights: [c1, c2, c3],
                showHiddenNote: true,
                annotation: `总目标 9 块 - 已有 ${current} 块 = 还缺 ${need} 块`,
              },
            },
          ],
        };
      },
    },
  ],
};
