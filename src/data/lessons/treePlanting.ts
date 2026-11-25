import type { MathLesson } from "../../types/lesson";

export const treePlantingLesson: MathLesson = {
  id: "tree-planting",
  chapterId: "03-intervals",
  chapterTitle: "03. 间隔与行程",
  grade: 3,
  gradeLabel: "三年级",
  weekLabel: "第 10 讲",
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
      modeLabel: "例题 · 两端都栽",
      bookPart: "A版",
      tier: "base",
      title: "路边栽树（两端都栽）",
      subtitle: "1 个间隔配 1 棵树，终点还要多补 1 棵",
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
          steps: [
            {
              step: 1,
              tag: "数间隔",
              title: "先把路分成一段一段",
              narration: `总长 ${totalLength} 米，每隔 ${spacing} 米分一段，一共分成 ${totalLength} ÷ ${spacing} = ${intervals} 段间隔。`,
              tipTitle: "伸出手掌看一看",
              tipBody: "把树当成手指，间隔当成手指缝：5 根手指中间有 4 个缝，树永远比段多 1！",
              activeFormulaIndices: [0],
              liveStats: [
                { label: "小路总长", value: `${totalLength} 米` },
                { label: "树间距", value: `${spacing} 米` },
                { label: "间隔段数", value: `${intervals} 段`, tone: "coral" },
                { label: "总棵数", value: "待计算" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                showIntervalArcs: true,
                trees: [],
              },
            },
            {
              step: 2,
              tag: "一棵配一段",
              title: "“1 棵树 + 1 段路”拉手站队",
              narration: `从起点开始，第 1 棵树拉着第 1 段路，第 2 棵拉着第 2 段……${intervals} 段路正好先配了 ${intervals} 棵树！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "间隔段数", value: `${intervals} 段` },
                { label: "配对的树", value: `${intervals} 棵`, tone: "teal" },
                { label: "终点位置", value: "还空着！" },
                { label: "还需补种", value: "1 棵", tone: "coral" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength,
                unitLabel: "米",
                intervals,
                intervalSize: spacing,
                showIntervalArcs: true,
                trees: Array.from({ length: intervals }).map((_, i) => ({
                  id: `t-${i}`,
                  posRatio: i / intervals,
                  status: "active",
                  label: `第${i + 1}棵`,
                })),
              },
            },
            {
              step: 3,
              tag: "加头或加尾",
              title: "终点再补 1 棵：一共 +1！",
              narration: `终点（最右边）也要栽树，所以要在末尾再补上第 ${treesCount} 棵树！棵数 = ${intervals} + 1 = ${treesCount} 棵。`,
              activeFormulaIndices: [1],
              liveStats: [
                { label: "间隔段数", value: `${intervals} 段` },
                { label: "两端都栽棵数", value: `${treesCount} 棵`, tone: "coral" },
                { label: "口诀", value: "段数 + 1", tone: "teal" },
                { label: "总长", value: `${totalLength} 米` },
              ],
              sceneState: {
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
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "变式一 · 两端不栽",
      bookPart: "A版",
      tier: "standard",
      title: "两座教学楼之间栽树",
      subtitle: "两头都被房子占住了，只能减掉头尾两棵",
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
          steps: [
            {
              step: 1,
              tag: "对比变化",
              title: "两头有楼房，红叉位置不能栽！",
              narration: `本来“两端都栽”有 ${intervals + 1} 棵树，但现在起点和终点被教学楼占了（打叉位置），必须拿掉头和尾共 2 棵：(${intervals} + 1) - 2 = ${intervals} - 1 = ${treesCount} 棵！`,
              tipTitle: "植树三兄弟对比",
              tipBody: "两端都栽：段+1；只栽一端/环形：=段；两端不栽：段-1！",
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "间隔段数", value: `${intervals} 段` },
                { label: "不能栽的位置", value: "头和尾 2 处", tone: "coral" },
                { label: "实际栽树", value: `${treesCount} 棵`, tone: "teal" },
                { label: "口诀", value: "段数 - 1" },
              ],
              sceneState: {
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
              },
            },
          ],
        };
      },
    },
    {
      id: "var-2",
      modeLabel: "变式二 · 环形池塘",
      bookPart: "B版",
      tier: "challenge",
      title: "绕着圆形池塘栽树",
      subtitle: "把路弯成一个圆圈，起点和终点重合啦！",
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
          steps: [
            {
              step: 1,
              tag: "首尾相连",
              title: "弯成圆圈：起点和终点抱在一起！",
              narration: `把直线小路弯成圆形后，最后 1 棵树刚好和第 1 棵树重叠成同一棵！所以每段间隔对应 1 棵树，棵数 = 间隔数 = ${intervals} 棵！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "池塘周长", value: `${totalLength} 米` },
                { label: "间隔段数", value: `${intervals} 段` },
                { label: "柳树棵数", value: `${intervals} 棵`, tone: "teal" },
                { label: "规律", value: "棵数 = 段数", tone: "coral" },
              ],
              sceneState: {
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
              },
            },
          ],
        };
      },
    },
  ],
};
