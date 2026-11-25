import { teachingSteps, numberCheckpoint } from "../teachingSteps";
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
      modeLabel: "基础例题 · 数立体方块例题",
      bookPart: "A版",
      tier: "base",
      title: "压在底下的方块看不见，怎么数才不漏？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
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
          steps: teachingSteps([
{ title: `上面的方块，是靠什么托住的？`, narration: `三摞积木的高度分别是 ${c1}、${c2}、${c3} 块。下面托住上面的小方块，也要算在内吗？`, sceneState: { ...({
                kind: "count-diagram",
                mode: "blocks",
                baseCount: 3,
                highlightSpan: 1,
                blockHeights: [c1, c2, c3],
                showHiddenNote: false,
                annotation: "每一摞从下往上堆起来，不能悬空",
              }), showHiddenNote: false, targetBlockHeight: 0, showCountSummary: false, annotation: `一摞一摞数，从底下数到上面` }, activeFormulaIndices: [] },
{ title: `前两摞合起来，有多少块？`, narration: `先从第一摞的底下往上数完，再数第二摞。两摞合起来共有多少块？第三摞先不要加。`, sceneState: { ...({
                kind: "count-diagram",
                mode: "blocks",
                baseCount: 3,
                highlightSpan: 1,
                blockHeights: [c1, c2, c3],
                showHiddenNote: false,
                annotation: "每一摞从下往上堆起来，不能悬空",
              }), showHiddenNote: true, targetBlockHeight: 0, showCountSummary: false, annotation: `一摞一摞数，从底下数到上面` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`前两摞合起来有几块？`, c1 + c2, ` 块`, `每块积木只属于一摞，不要数重复。`) },
{ title: `前两摞数好了，还差哪一摞？`, narration: `前两摞共 ${c1 + c2} 块，还有第三摞 ${c3} 块。把它也合进来，一共有多少块？`, sceneState: { ...({
                kind: "count-diagram",
                mode: "blocks",
                baseCount: 3,
                highlightSpan: 1,
                blockHeights: [c1, c2, c3],
                showHiddenNote: false,
                annotation: "每一摞从下往上堆起来，不能悬空",
              }), showHiddenNote: true, targetBlockHeight: 0, showCountSummary: false, annotation: `一摞一摞数，从底下数到上面` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`三摞总共有几块？`, total, ` 块`, `已经数完的部分加上还没数的那一摞。`) },
{ tag: `验证与回顾`, title: `把三摞加起来：${c1} + ${c2} + ${c3} = ${total} 块`, narration: `共有 ${total} 块。再换成按层数：最下面每摞都有一块，往上逐层数，合计仍是 ${total} 块。`, activeFormulaIndices: [0], liveStats: [
                { label: "第1摞", value: `${c1} 块`, tone: "coral" },
                { label: "第2摞", value: `${c2} 块` },
                { label: "第3摞", value: `${c3} 块` },
                { label: "总块数", value: `${total} 块`, tone: "teal" },
              ], sceneState: { ...({
                kind: "count-diagram",
                mode: "blocks",
                baseCount: 3,
                highlightSpan: 1,
                blockHeights: [c1, c2, c3],
                showHiddenNote: false,
                annotation: "每一摞从下往上堆起来，不能悬空",
              }), showHiddenNote: true, targetBlockHeight: 0, showCountSummary: true, annotation: `一摞一摞数，从底下数到上面` }, tipBody: `按摞数或按层数，托在下面也要数。` }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 缺几块补齐",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：补成三摞、每摞三块的积木墙，还需要几块？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
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
          steps: teachingSteps([
{ title: `要把每摞补成一样高，哪些地方还空着？`, narration: `已有 ${current} 块，目标是 3 摞，每摞 3 块。先看每摞的上面，哪些位置还可以添方块？`, sceneState: { ...({
                kind: "count-diagram",
                mode: "blocks",
                baseCount: 3,
                highlightSpan: 1,
                blockHeights: [c1, c2, c3],
                targetBlockHeight: 3,
                showHiddenNote: true,
                annotation: `总目标 9 块 - 已有 ${current} 块 = 还缺 ${need} 块`,
              }), showHiddenNote: false, targetBlockHeight: 3, showCountSummary: false, annotation: `一摞一摞数，从底下数到上面` }, activeFormulaIndices: [] },
{ title: `如果全部补齐，一共应该有几块？`, narration: `目标是 3 摞，每摞都是 3 块。先算补齐后的总数，已有的方块也包含在里面。`, sceneState: { ...({
                kind: "count-diagram",
                mode: "blocks",
                baseCount: 3,
                highlightSpan: 1,
                blockHeights: [c1, c2, c3],
                targetBlockHeight: 3,
                showHiddenNote: true,
                annotation: `总目标 9 块 - 已有 ${current} 块 = 还缺 ${need} 块`,
              }), showHiddenNote: false, targetBlockHeight: 3, showCountSummary: false, annotation: `一摞一摞数，从底下数到上面` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`补齐后总共有几块？`, 9, ` 块`, `把 3 摞同样高的积木合起来。`) },
{ title: `目标总数知道了，还需要添几块？`, narration: `补齐后应有 9 块，已经有 ${current} 块。还空着的部分怎样求？`, sceneState: { ...({
                kind: "count-diagram",
                mode: "blocks",
                baseCount: 3,
                highlightSpan: 1,
                blockHeights: [c1, c2, c3],
                targetBlockHeight: 3,
                showHiddenNote: true,
                annotation: `总目标 9 块 - 已有 ${current} 块 = 还缺 ${need} 块`,
              }), showHiddenNote: false, targetBlockHeight: 3, showCountSummary: false, annotation: `一摞一摞数，从底下数到上面` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`还需要添几块？`, need, ` 块`, `目标总数去掉已经摆好的方块。`) },
{ tag: `验证与回顾`, title: `一共需要 9 块，已有 ${current} 块，还缺 ${need} 块`, narration: `还要添 ${need} 块。逐摞检查缺口：${3-c1} + ${3-c2} + ${3-c3} = ${need}，和用 9 减已有块数一样。`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "补齐总数", value: "9 块" },
                { label: "已有块数", value: `${current} 块` },
                { label: "还缺块数", value: `${need} 块`, tone: "coral" },
              ], sceneState: { ...({
                kind: "count-diagram",
                mode: "blocks",
                baseCount: 3,
                highlightSpan: 1,
                blockHeights: [c1, c2, c3],
                targetBlockHeight: 3,
                showHiddenNote: true,
                annotation: `总目标 9 块 - 已有 ${current} 块 = 还缺 ${need} 块`,
              }), showHiddenNote: true, targetBlockHeight: 3, showCountSummary: true, annotation: `一摞一摞数，从底下数到上面` }, tipBody: `先看全部要多少，再减已经有多少。` }
]),
        };
      },
    },
  ],
};
