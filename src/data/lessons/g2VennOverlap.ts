import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";

export const g2VennOverlapLesson: MathLesson = {
  id: "g2-venn-overlap",
  chapterId: "g2-set-thinking",
  chapterTitle: "03. 集合思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.21",
  title: "重叠问题（足球与篮球韦恩图）",
  summary: "一个班喜欢足球的、喜欢篮球的、两样都喜欢的和都不喜欢的怎么算？画两个交叠的圈一秒看透！",
  engine: "venn-set",
  keywords: ["二年级", "重叠问题", "集合思维", "韦恩图", "足球", "篮球", "容斥"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "03. 集合思维训练",
      weekLabel: "p.21",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 足球篮球例题",
      bookPart: "A版",
      tier: "base",
      title: "全班 40 人，求两样都不喜欢的人数",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { football: 25, basketball: 20, both: 7, neither: 2 },
      paramDefs: [
        { key: "football", label: "喜欢足球人数", min: 15, max: 28, step: 1, unit: "人" },
        { key: "basketball", label: "喜欢篮球人数", min: 12, max: 25, step: 1, unit: "人" },
        { key: "both", label: "两样都喜欢", min: 3, max: 10, step: 1, unit: "人" },
        { key: "neither", label: "都不喜欢", min: 1, max: 8, step: 1, unit: "人" },
      ],
      build: (params) => {
        const football = params.football ?? 25;
        const basketball = params.basketball ?? 20;
        const both = Math.min(football - 2, basketball - 2, params.both ?? 7);
        const neither = params.neither ?? 2;
        const union = football + basketball - both;
        const total = union + neither;

        return {
          problemStatement: `二（1）班共有 ${total} 名同学。统计发现：喜欢踢足球的有 ${football} 人，喜欢打篮球的有 ${basketball} 人，两样都喜欢的有 ${both} 人。问：两样都不喜欢的有多少人？`,
          formulas: [
            { id: "vo-1", latex: `${football} + ${basketball} - ${both} = ${union}\\text{ (人)}`, comment: "至少喜欢一项的人数（减掉重复的）" },
            { id: "vo-2", latex: `${total} - ${union} = ${neither}\\text{ (人)}`, comment: "全班总数 - 至少喜欢一项 = 都不喜欢" },
          ],
          steps: teachingSteps([
{ title: `两个圈重叠的地方，应该站哪些同学？`, narration: `足球圈和篮球圈有一块重叠。两样都喜欢的同学应该站哪里？两样都不喜欢的呢？`, sceneState: { ...({
                kind: "venn-set",
                totalLabel: "二（1）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "overlap",
                annotation: `中间重叠的 ${both} 人，被两个圆圈各数了 1 次！`,
              }), highlightZone: `all`, visibleValues: ["overlap"], annotation: `圈内是喜欢的同学，圈外是两样都不喜欢的同学` }, activeFormulaIndices: [] },
{ title: `先算至少喜欢一项的人，有多少？`, narration: `足球有 ${football} 人，篮球有 ${basketball} 人，两样都喜欢的 ${both} 人在两边都出现了。合起来数时，重复的一次该怎么处理？`, sceneState: { ...({
                kind: "venn-set",
                totalLabel: "二（1）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "overlap",
                annotation: `中间重叠的 ${both} 人，被两个圆圈各数了 1 次！`,
              }), highlightZone: `overlap`, visibleValues: ["overlap"], annotation: `圈内是喜欢的同学，圈外是两样都不喜欢的同学` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`至少喜欢一项的有多少人？`, union, ` 人`, `圈里每个同学只数一次。`) },
{ title: `圈内总人数知道了，最后怎样找？`, narration: `至少喜欢一项的有 ${union} 人，全班有 ${total} 人。剩下在圈外的有多少人？`, sceneState: { ...({
                kind: "venn-set",
                totalLabel: "二（1）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "overlap",
                annotation: `中间重叠的 ${both} 人，被两个圆圈各数了 1 次！`,
              }), highlightZone: `neither`, visibleValues: ["union", "overlap"], annotation: `圈内是喜欢的同学，圈外是两样都不喜欢的同学` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`两样都不喜欢的有几人？`, neither, ` 人`, `用全班人数减去圈内人数。`) },
{ tag: `验证与回顾`, title: `圈外还有 ${total} - ${union} = ${neither} 人都不喜欢`, narration: `两样都不喜欢的有 ${neither} 人，两样都喜欢的有 ${both} 人。检验：${football} + ${basketball} - ${both} + ${neither} = ${total}，正好是全班人数。`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "全班总人数", value: `${total} 人` },
                { label: "圆圈里(喜欢)", value: `${union} 人` },
                { label: "圈外(都不喜欢)", value: `${neither} 人`, tone: "blue" },
                { label: "验算总数", value: `${union}+${neither}=${total}`, tone: "teal" },
              ], sceneState: { ...({
                kind: "venn-set",
                totalLabel: "二（1）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "overlap",
                annotation: `中间重叠的 ${both} 人，被两个圆圈各数了 1 次！`,
              }), highlightZone: `neither`, visibleValues: ["overlap", "neither", "union", "disjoint"], annotation: `圈内是喜欢的同学，圈外是两样都不喜欢的同学` }, tipBody: `圈里重叠减一次，圈外同学别忘记。` }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 反求都喜欢",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：反过来求“两样都喜欢”有多少人？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { football: 24, basketball: 18, both: 8, neither: 4 },
      paramDefs: [
        { key: "football", label: "喜欢足球人数", min: 14, max: 26, step: 1, unit: "人" },
        { key: "basketball", label: "喜欢篮球人数", min: 12, max: 24, step: 1, unit: "人" },
        { key: "both", label: "实际重叠(生成总数)", min: 3, max: 10, step: 1, unit: "人" },
        { key: "neither", label: "都不喜欢", min: 2, max: 8, step: 1, unit: "人" },
      ],
      build: (params) => {
        const football = params.football ?? 24;
        const basketball = params.basketball ?? 18;
        const both = Math.min(football - 2, basketball - 2, params.both ?? 8);
        const neither = params.neither ?? 4;
        const union = football + basketball - both;
        const total = union + neither;

        return {
          problemStatement: `二（2）班有 ${total} 人，其中喜欢足球的有 ${football} 人，喜欢篮球的有 ${basketball} 人，两样都不喜欢的有 ${neither} 人。问：两样都喜欢的有多少人？`,
          formulas: [
            { id: "vov-1", latex: `${total} - ${neither} = ${union}\\text{ (人)}`, comment: "先去掉圈外都不喜欢的，得到圆圈总人数" },
            { id: "vov-2", latex: `${football} + ${basketball} - ${union} = ${both}\\text{ (人)}`, comment: "两圆相加多出来的，就是重叠部分！" },
          ],
          steps: teachingSteps([
{ title: `两个圈重叠的地方，应该站哪些同学？`, narration: `足球圈和篮球圈有一块重叠。两样都喜欢的同学应该站哪里？两样都不喜欢的呢？`, sceneState: { ...({
                kind: "venn-set",
                totalLabel: "二（2）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "overlap",
                annotation: `多出来的 ${football + basketball} - ${union} = ${both} 人，就是中间重叠部分！`,
              }), highlightZone: `all`, visibleValues: ["neither"], annotation: `圈内是喜欢的同学，圈外是两样都不喜欢的同学` }, activeFormulaIndices: [] },
{ title: `先算至少喜欢一项的人，有多少？`, narration: `全班有 ${total} 人，两样都不喜欢的有 ${neither} 人。先把圈外的去掉，两个圈里合起来有多少人？`, sceneState: { ...({
                kind: "venn-set",
                totalLabel: "二（2）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "overlap",
                annotation: `多出来的 ${football + basketball} - ${union} = ${both} 人，就是中间重叠部分！`,
              }), highlightZone: `neither`, visibleValues: ["neither"], annotation: `圈内是喜欢的同学，圈外是两样都不喜欢的同学` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`至少喜欢一项的有多少人？`, union, ` 人`, `圈里每个同学只数一次。`) },
{ title: `圈内总人数知道了，最后怎样找？`, narration: `两个圈合起来有 ${union} 人。若把足球 ${football} 人和篮球 ${basketball} 人直接相加，超过圈内总人数的是什么人？`, sceneState: { ...({
                kind: "venn-set",
                totalLabel: "二（2）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "overlap",
                annotation: `多出来的 ${football + basketball} - ${union} = ${both} 人，就是中间重叠部分！`,
              }), highlightZone: `overlap`, visibleValues: ["union", "neither"], annotation: `圈内是喜欢的同学，圈外是两样都不喜欢的同学` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`两样都喜欢的有几人？`, both, ` 人`, `两个项目人数之和，比圈内人数多出的就是重复部分。`) },
{ tag: `验证与回顾`, title: `先把圈外 ${neither} 人请出去，剩下 ${union} 人在圈里`, narration: `两样都不喜欢的有 ${neither} 人，两样都喜欢的有 ${both} 人。检验：${football} + ${basketball} - ${both} + ${neither} = ${total}，正好是全班人数。`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "圈内实际人数", value: `${union} 人` },
                { label: "足球+篮球相加", value: `${football + basketball} 人` },
                { label: "多出(都喜欢)", value: `${both} 人`, tone: "coral" },
                { label: "都不喜欢", value: `${neither} 人` },
              ], sceneState: { ...({
                kind: "venn-set",
                totalLabel: "二（2）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "overlap",
                annotation: `多出来的 ${football + basketball} - ${union} = ${both} 人，就是中间重叠部分！`,
              }), highlightZone: `overlap`, visibleValues: ["overlap", "neither", "union", "disjoint"], annotation: `圈内是喜欢的同学，圈外是两样都不喜欢的同学` }, tipBody: `圈里重叠减一次，圈外同学别忘记。` }
]),
        };
      },
    },
  ],
};
