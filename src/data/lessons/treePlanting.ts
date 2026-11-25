import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";

export const treePlantingLesson: MathLesson = {
  id: "tree-planting",
  chapterId: "03-intervals",
  chapterTitle: "02. 对应思维训练",
  grade: 3,
  gradeLabel: "三年级",
  weekLabel: "p.17",
  title: "植树问题（点与段的秘密）",
  summary: "搞懂“间隔数”和“棵数”的关系：伸出一只手，5 根手指之间只有 4 个空隙！",
  engine: "number-line",
  keywords: ["植树问题", "间隔", "两端都栽", "两端不栽", "环形植树"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "02. 对应思维训练",
      weekLabel: "p.17",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 例题 · 两端都栽",
      bookPart: "A版",
      tier: "base",
      title: "路边栽树（两端都栽）",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { intervals: 6, spacing: 5 },
      paramDefs: [
        { key: "intervals", label: "间隔段数", min: 3, max: 9, step: 1, unit: "段" },
        { key: "spacing", label: "每段距离", min: 3, max: 10, step: 1, unit: "米" },
      ],
      build: (params) => {
        const intervals = params.intervals ?? 6;
        const spacing = params.spacing ?? 5;
        const totalLength = intervals * spacing;
        const treesCount = intervals + 1;

        return {
          problemStatement: `在一条长 ${totalLength} 米的小路一旁栽树，每隔 ${spacing} 米栽 1 棵，如果起点和终点（两端）都要栽，一共需要多少棵树？`,
          formulas: [
            { id: "tp-1", latex: `${totalLength} \\div ${spacing} = ${intervals}\\text{ (段)}`, comment: "先算有几段间隔" },
            { id: "tp-2", latex: `${intervals} + 1 = ${treesCount}\\text{ (棵)}`, comment: "两端都栽：棵数 = 间隔 + 1" },
          ],
          steps: teachingSteps([
{ title: `先看路的样子，哪里需要栽树？`, narration: `这是一条直路，起点和终点都要栽树。每隔 ${spacing} 米栽一棵，先看清树和树之间的空隙。`, sceneState: { ...({
                kind: "number-line",
                layout: "line",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                showIntervalArcs: true,
                trees: [],
              }), trees: [], showIntervalArcs: false, hideCountSummary: true }, activeFormulaIndices: [] },
{ title: `这条路能分成几个相同的间隔？`, narration: `全长 ${totalLength} 米，每个间隔 ${spacing} 米。先算路上能分出几段间隔。`, sceneState: { ...({
                kind: "number-line",
                layout: "line",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                showIntervalArcs: true,
                trees: [],
              }), trees: [], showIntervalArcs: true, hideCountSummary: true }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`共有几个间隔？`, intervals, ` 段`, `总长度里面有几个同样长的间隔？`) },
{ title: `间隔数找到了，树的棵数怎样数？`, narration: `有 ${intervals} 段间隔。每段开头先配一棵树，走到最后一个终点时，还需要补一棵吗？`, sceneState: { ...({
                kind: "number-line",
                layout: "line",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                showIntervalArcs: true,
                trees: [],
              }), trees: [{ id: "first", posRatio: 0, status: "highlight", label: "起点" }], showIntervalArcs: true, hideCountSummary: true }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`一共应栽几棵树？`, treesCount, ` 棵`, `直路两端都栽，要特别看看最后一个终点。`) },
{ tag: `验证与回顾`, title: "终点再补 1 棵：一共 +1！", narration: `终点（最右边）也要栽树，所以要在末尾再补上第 ${treesCount} 棵树！棵数 = ${intervals} + 1 = ${treesCount} 棵。`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "间隔段数", value: `${intervals} 段` },
                { label: "两端都栽棵数", value: `${treesCount} 棵`, tone: "coral" },
                { label: "口诀", value: "段数 + 1", tone: "teal" },
                { label: "总长", value: `${totalLength} 米` },
              ], sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                showIntervalArcs: true,
                trees: Array.from({ length: treesCount }).map((_, i) => ({
                  id: `t-${i}`,
                  posRatio: i / intervals,
                  status: i === treesCount - 1 ? "highlight" : "active",
                  label: `第${i + 1}棵`,
                })),
              }, tipBody: `两端都栽，间隔加一。` }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "举一反三 · 两端不栽",
      bookPart: "A版",
      tier: "standard",
      title: "两座教学楼之间栽树",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { intervals: 6, spacing: 5 },
      paramDefs: [
        { key: "intervals", label: "间隔段数", min: 3, max: 9, step: 1, unit: "段" },
        { key: "spacing", label: "每段距离", min: 3, max: 10, step: 1, unit: "米" },
      ],
      build: (params) => {
        const intervals = params.intervals ?? 6;
        const spacing = params.spacing ?? 5;
        const totalLength = intervals * spacing;
        const treesCount = intervals - 1;

        return {
          problemStatement: `两座教学楼相距 ${totalLength} 米，要在两楼之间的小路一旁每隔 ${spacing} 米栽 1 棵树（两端紧靠楼房不栽）。一共需要多少棵树？`,
          formulas: [
            { id: "tpv1-1", latex: `${totalLength} \\div ${spacing} = ${intervals}\\text{ (段)}`, comment: "先算有几段间隔" },
            { id: "tpv1-2", latex: `${intervals} - 1 = ${treesCount}\\text{ (棵)}`, comment: "两端不栽：棵数 = 间隔 - 1" },
          ],
          steps: teachingSteps([
{ title: `先看路的样子，哪里需要栽树？`, narration: `两端是楼房，不能栽树。每隔 ${spacing} 米栽一棵，先想想端点和中间有什么不同。`, sceneState: { ...({
                kind: "number-line",
                layout: "line",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                showIntervalArcs: true,
                trees: Array.from({ length: intervals + 1 }).map((_, i) => ({
                  id: `t-${i}`,
                  posRatio: i / intervals,
                  status: i === 0 || i === intervals ? "ghost" : "active",
                  label: i === 0 || i === intervals ? "楼房不栽" : `第${i}棵`,
                })),
              }), trees: [], showIntervalArcs: false, hideCountSummary: true }, activeFormulaIndices: [] },
{ title: `这条路能分成几个相同的间隔？`, narration: `全长 ${totalLength} 米，每个间隔 ${spacing} 米。先算路上能分出几段间隔。`, sceneState: { ...({
                kind: "number-line",
                layout: "line",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                showIntervalArcs: true,
                trees: Array.from({ length: intervals + 1 }).map((_, i) => ({
                  id: `t-${i}`,
                  posRatio: i / intervals,
                  status: i === 0 || i === intervals ? "ghost" : "active",
                  label: i === 0 || i === intervals ? "楼房不栽" : `第${i}棵`,
                })),
              }), trees: [], showIntervalArcs: true, hideCountSummary: true }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`共有几个间隔？`, intervals, ` 段`, `总长度里面有几个同样长的间隔？`) },
{ title: `间隔数找到了，树的棵数怎样数？`, narration: `有 ${intervals} 段间隔。先想两端都栽的情况，再拿走两端的树，中间留下几棵？`, sceneState: { ...({
                kind: "number-line",
                layout: "line",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                showIntervalArcs: true,
                trees: Array.from({ length: intervals + 1 }).map((_, i) => ({
                  id: `t-${i}`,
                  posRatio: i / intervals,
                  status: i === 0 || i === intervals ? "ghost" : "active",
                  label: i === 0 || i === intervals ? "楼房不栽" : `第${i}棵`,
                })),
              }), trees: [{ id: "first", posRatio: 0, status: "highlight", label: "起点" }], showIntervalArcs: true, hideCountSummary: true }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`一共应栽几棵树？`, treesCount, ` 棵`, `两端都不能栽，只保留中间的树。`) },
{ tag: `验证与回顾`, title: "两头有楼房，红叉位置不能栽！", narration: `本来“两端都栽”有 ${intervals + 1} 棵树，但现在起点和终点被教学楼占了（打叉位置），必须拿掉头和尾共 2 棵：(${intervals} + 1) - 2 = ${intervals} - 1 = ${treesCount} 棵！`, tipTitle: "植树三兄弟对比", tipBody: `两端不栽，间隔减一。`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "间隔段数", value: `${intervals} 段` },
                { label: "不能栽的位置", value: "头和尾 2 处", tone: "coral" },
                { label: "实际栽树", value: `${treesCount} 棵`, tone: "teal" },
                { label: "口诀", value: "段数 - 1" },
              ], sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                showIntervalArcs: true,
                trees: Array.from({ length: intervals + 1 }).map((_, i) => ({
                  id: `t-${i}`,
                  posRatio: i / intervals,
                  status: i === 0 || i === intervals ? "ghost" : "active",
                  label: i === 0 || i === intervals ? "楼房不栽" : `第${i}棵`,
                })),
              } }
]),
        };
      },
    },
    {
      id: "var-2",
      modeLabel: "拓展拔高 · 环形池塘",
      bookPart: "B版",
      tier: "challenge",
      title: "绕着圆形池塘栽树",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { intervals: 6, spacing: 5 },
      paramDefs: [
        { key: "intervals", label: "间隔段数", min: 4, max: 10, step: 1, unit: "段" },
        { key: "spacing", label: "每段距离", min: 3, max: 10, step: 1, unit: "米" },
      ],
      build: (params) => {
        const intervals = params.intervals ?? 6;
        const spacing = params.spacing ?? 5;
        const totalLength = intervals * spacing;

        return {
          problemStatement: `一个圆形池塘周长是 ${totalLength} 米，绕池塘一圈每隔 ${spacing} 米栽 1 棵柳树。一共要栽多少棵柳树？`,
          formulas: [
            { id: "tpv2-1", latex: `${totalLength} \\div ${spacing} = ${intervals}\\text{ (段)}`, comment: "周长分成几段间隔" },
            { id: "tpv2-2", latex: `\\text{棵数} = \\text{间隔数} = ${intervals}\\text{ (棵)}`, comment: "首尾相连，不加也不减！" },
          ],
          steps: teachingSteps([
{ title: `先看路的样子，哪里需要栽树？`, narration: `这是一圈池塘，走一圈会回到原处。每隔 ${spacing} 米栽一棵，起点和终点会不会是同一个位置？`, sceneState: { ...({
                kind: "number-line",
                layout: "circle",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                trees: Array.from({ length: intervals }).map((_, i) => ({
                  id: `ct-${i}`,
                  posRatio: i / intervals,
                  status: i === 0 ? "highlight" : "active",
                  label: `#${i + 1}`,
                })),
              }), trees: [], showIntervalArcs: false, hideCountSummary: true }, activeFormulaIndices: [] },
{ title: `这条路能分成几个相同的间隔？`, narration: `全长 ${totalLength} 米，每个间隔 ${spacing} 米。先算路上能分出几段间隔。`, sceneState: { ...({
                kind: "number-line",
                layout: "circle",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                trees: Array.from({ length: intervals }).map((_, i) => ({
                  id: `ct-${i}`,
                  posRatio: i / intervals,
                  status: i === 0 ? "highlight" : "active",
                  label: `#${i + 1}`,
                })),
              }), trees: [], showIntervalArcs: true, hideCountSummary: true }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`共有几个间隔？`, intervals, ` 段`, `总长度里面有几个同样长的间隔？`) },
{ title: `间隔数找到了，树的棵数怎样数？`, narration: `有 ${intervals} 段间隔。每段开头配一棵树，绕一圈回到起点，还能再多算起点一次吗？`, sceneState: { ...({
                kind: "number-line",
                layout: "circle",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                trees: Array.from({ length: intervals }).map((_, i) => ({
                  id: `ct-${i}`,
                  posRatio: i / intervals,
                  status: i === 0 ? "highlight" : "active",
                  label: `#${i + 1}`,
                })),
              }), trees: [{ id: "first", posRatio: 0, status: "highlight", label: "起点" }], showIntervalArcs: true, hideCountSummary: true }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`一共应栽几棵树？`, intervals, ` 棵`, `绕一圈回到起点，同一个位置只栽一棵。`) },
{ tag: `验证与回顾`, title: "弯成圆圈：起点和终点抱在一起！", narration: `把直线小路弯成圆形后，最后 1 棵树刚好和第 1 棵树重叠成同一棵！所以每段间隔对应 1 棵树，棵数 = 间隔数 = ${intervals} 棵！`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "池塘周长", value: `${totalLength} 米` },
                { label: "间隔段数", value: `${intervals} 段` },
                { label: "柳树棵数", value: `${intervals} 棵`, tone: "teal" },
                { label: "规律", value: "棵数 = 段数", tone: "coral" },
              ], sceneState: {
                kind: "number-line",
                layout: "circle",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                trees: Array.from({ length: intervals }).map((_, i) => ({
                  id: `ct-${i}`,
                  posRatio: i / intervals,
                  status: i === 0 ? "highlight" : "active",
                  label: `#${i + 1}`,
                })),
              }, tipBody: `首尾相连，棵数等于间隔数。` }
]),
        };
      },
    },
  ],
};
