import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";

export const g2CombinationLesson: MathLesson = {
  id: "g2-combination",
  chapterId: "g2-ordered-thinking",
  chapterTitle: "06. 有序思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.62",
  title: "组合问题（握手与两两配对）",
  summary: "4 个小朋友每两人握一次手，一共握几次？甲和乙握、乙和甲握是同一次——组合“不讲顺序，不重复连线”！",
  engine: "combo-visual",
  keywords: ["二年级", "组合问题", "握手问题", "有序思维", "不重复"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "06. 有序思维训练",
      weekLabel: "p.62",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 握手问题例题",
      bookPart: "A版",
      tier: "base",
      title: "4 个好朋友每两人握一次手，共握几次？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { people: 4 },
      paramDefs: [
        { key: "people", label: "小朋友人数", min: 3, max: 5, step: 1, unit: "人" },
      ],
      build: (params) => {
        const p = params.people ?? 4;
        const n = p - 1;
        const total = (n * (n + 1)) / 2;
        const names = ["甲", "乙", "丙", "丁", "戊"].slice(0, p);
        const expr = Array.from({ length: n })
          .map((_, i) => n - i)
          .join(" + ");

        return {
          problemStatement: `${names.join("、")} 一共 ${p} 个好朋友见面，如果每两个人之间都要握一次手，一共要握多少次手？`,
          formulas: [
            { id: "cb-1", latex: `${expr} = ${total}\\text{ (次)}`, comment: "每人依次和“后面还没握过的人”握手" },
          ],
          steps: teachingSteps([
{ title: `交换两个人的顺序，要再算一次吗？`, narration: `每两人之间握一次手。甲和乙、乙和甲说的是同一对人，想想连线时该怎样避免重复？`, sceneState: { kind: "combo-visual", mode: "handshake", leftItems: names, revealedCount: 0, annotation: `两人之间只连一次线` }, activeFormulaIndices: [] },
{ title: `先轮到第一人，可以连几条线？`, narration: `第一个人和其他每个人各连一次。轮到下一个人时，已经连过的线还需要再连吗？`, sceneState: { kind: "combo-visual", mode: "handshake", leftItems: names, revealedCount: 1, annotation: `两人之间只连一次线` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`第一人要连几条线？`, n, ` 条`, `除了自己，其他每人各连一次。`) },
{ title: `第一组完成了，后面还要怎样数？`, narration: `第一组连了 ${n} 条。以后只找没连过的人，每组少一条。把 ${expr} 合起来，自己算出总数。`, sceneState: { kind: "combo-visual", mode: "handshake", leftItems: names, revealedCount: n, annotation: `两人之间只连一次线` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`总共是几次？`, total, ` 次`, `已经连过的两个人，不要回头再算。`) },
{ tag: `验证与回顾`, title: `不回头不重复：${expr} = ${total} 次！`, narration: `每个人只向“还没握过手的朋友”伸手，次数依次减少 1：${expr} = ${total} 次！`, tipTitle: "排列 vs 组合怎么分？", tipBody: `一对只算一次，按人向后连线。`, activeFormulaIndices: [0], liveStats: [
                { label: "算式", value: expr },
                { label: "握手总次数", value: `${total} 次`, tone: "teal" },
              ], sceneState: {
                kind: "combo-visual",
                mode: "handshake",
                leftItems: names,
                revealedCount: total,
                annotation: `一共连出 ${expr} = ${total} 条线 → 共握 ${total} 次手`,
              } }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 乒乓球单循环赛",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：5 名队员单循环比赛，共赛几场？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `学校乒乓球队 5 名队员进行单循环赛（每两人之间都要比赛 1 场），一共要赛多少场？`,
        formulas: [
          { id: "cbv-1", latex: `4 + 3 + 2 + 1 = 10\\text{ (场)}`, comment: "每两人连一条线，不重复计数" },
        ],
        steps: teachingSteps([
{ title: `交换两个人的顺序，要再算一次吗？`, narration: `每两人之间比赛一场。甲和乙、乙和甲说的是同一对人，想想连线时该怎样避免重复？`, sceneState: { kind: "combo-visual", mode: "handshake", leftItems: ["1号", "2号", "3号", "4号", "5号"], revealedCount: 0, annotation: `两人之间只连一次线` }, activeFormulaIndices: [] },
{ title: `先轮到第一人，可以连几条线？`, narration: `第一个人和其他每个人各连一次。轮到下一个人时，已经连过的线还需要再连吗？`, sceneState: { kind: "combo-visual", mode: "handshake", leftItems: ["1号", "2号", "3号", "4号", "5号"], revealedCount: 1, annotation: `两人之间只连一次线` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`第一人要连几条线？`, 4, ` 条`, `除了自己，其他每人各连一次。`) },
{ title: `第一组完成了，后面还要怎样数？`, narration: `第一组连了 ${4} 条。以后只找没连过的人，每组少一条。把 ${"4 + 3 + 2 + 1"} 合起来，自己算出总数。`, sceneState: { kind: "combo-visual", mode: "handshake", leftItems: ["1号", "2号", "3号", "4号", "5号"], revealedCount: 4, annotation: `两人之间只连一次线` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`总共是几场？`, 10, ` 场`, `已经连过的两个人，不要回头再算。`) },
{ tag: `验证与回顾`, title: "4 + 3 + 2 + 1 = 10 场", narration: `5 个人围成一圈，每两人之间连 1 条比赛线，共有 4 + 3 + 2 + 1 = 10 场比赛！`, activeFormulaIndices: [0], liveStats: [
              { label: "参赛队员", value: "5 人" },
              { label: "比赛总场数", value: "10 场", tone: "coral" },
            ], sceneState: {
              kind: "combo-visual",
              mode: "handshake",
              leftItems: ["1号", "2号", "3号", "4号", "5号"],
              revealedCount: 10,
              annotation: "5 人单循环：4 + 3 + 2 + 1 = 10 场",
            }, tipBody: `一对只算一次，按人向后连线。` }
]),
      }),
    },
  ],
};
