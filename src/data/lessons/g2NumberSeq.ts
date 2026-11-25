import type { MathLesson } from "../../types/lesson";

export const g2NumberSeqLesson: MathLesson = {
  id: "g2-number-seq",
  chapterId: "g2-reasoning-thinking",
  chapterTitle: "09. 推理思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.97",
  title: "数字推理（找规律填数）",
  summary: "一排数字藏着小秘密！先看看相邻两个数每次加几、减几，或者是不是两个数相加变成后面的数！",
  engine: "combo-visual",
  keywords: ["二年级", "数字推理", "找规律", "数列", "推理思维"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "09. 推理思维训练",
      weekLabel: "p.97",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "相差越来越大",
      bookPart: "A版",
      tier: "base",
      title: "找规律填数：1，2，4，7，11，（ ），22",
      subtitle: "相邻两个数的差分别是 +1、+2、+3、+4……每次多加 1！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `仔细观察下面这排数字的规律，括号里应该填几？\n1，2，4，7，11，（  ），22`,
        formulas: [
          { id: "ns-1", latex: `1 \\xrightarrow{+1} 2 \\xrightarrow{+2} 4 \\xrightarrow{+3} 7 \\xrightarrow{+4} 11`, comment: "相邻两数的差依次增加 1" },
          { id: "ns-2", latex: `11 + 5 = 16, \\quad 16 + 6 = 22`, comment: "接下来加 5，再加 6 正好对上 22" },
        ],
        steps: [
          {
            step: 1,
            tag: "算相邻两数的差",
            title: "第 1 步：把相邻两数的差写出来 → +1, +2, +3, +4",
            narration: `做数字推理的第一招：算差值！1 到 2 加了 1，2 到 4 加了 2，4 到 7 加了 3，7 到 11 加了 4。每次加的数都比上次多 1！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "前几步差值", value: "+1, +2, +3, +4", tone: "coral" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              cards: [
                { id: "n1", text: "1", tone: "teal" },
                { id: "n2", text: "2", tone: "teal" },
                { id: "n3", text: "4", tone: "teal" },
                { id: "n4", text: "7", tone: "teal" },
                { id: "n5", text: "11", tone: "coral" },
              ],
              rows: [
                { label: "1 → 2 (+1)  → 4 (+2)  → 7 (+3)  → 11 (+4)", badge: "差每次多 1", active: true },
              ],
              annotation: "差值规律：+1, +2, +3, +4，所以下一步应该 +5！",
            },
          },
          {
            step: 2,
            tag: "填出括号并检验",
            title: "第 2 步：11 + 5 = 16，再加 6 正好等于 22！",
            narration: `按规律，11 后面要 +5，得到 16！再检验最后一步：16 + 6 = 22，和题目完全吻合！`,
            tipTitle: "找规律检验法",
            tipBody: "填完括号后，一定要接着往后算一步，看看能不能对上后面的数字！",
            activeFormulaIndices: [0, 1],
            liveStats: [
              { label: "括号里填", value: "16", tone: "teal" },
              { label: "检验下一步", value: "16 + 6 = 22 ✓" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              cards: [
                { id: "n4", text: "7", tone: "teal" },
                { id: "n5", text: "11", tone: "teal" },
                { id: "n6", text: "16", tone: "coral" },
                { id: "n7", text: "22", tone: "blue" },
              ],
              rows: [
                { label: "11 + 5 = 16", badge: "填 16", active: true },
                { label: "16 + 6 = 22", badge: "检验通过 ✓", active: true },
              ],
              annotation: "答案是 16！+5 之后 +6 刚好等于 22！",
            },
          },
        ],
      }),
    },
    {
      id: "var-1",
      modeLabel: "兔子数列（前两数之和）",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：1，1，2，3，5，8，（ ），21",
      subtitle: "相邻差不好找时，试试看前面两个数加起来等于几！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `找规律填数：1，1，2，3，5，8，（  ），21`,
        formulas: [
          { id: "ns-3", latex: `1+1=2,\\; 1+2=3,\\; 2+3=5,\\; 3+5=8`, comment: "从第 3 个数起，每个数 = 前两个数之和" },
          { id: "ns-4", latex: `5 + 8 = 13, \\quad 8 + 13 = 21`, comment: "检验：8 + 13 = 21 成立" },
        ],
        steps: [
          {
            step: 1,
            tag: "发现相加规律",
            title: "第 1 步：前面两个数加起来，正好等于后一个数！",
            narration: `看这排数：1 + 1 = 2，1 + 2 = 3，2 + 3 = 5，3 + 5 = 8！这就是大名鼎鼎的“斐波那契（兔子）数列”！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "规律", value: "前两数之和 = 后一数", tone: "coral" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "1 + 1 = 2   |   1 + 2 = 3", badge: "前两数相加" },
                { label: "2 + 3 = 5   |   3 + 5 = 8", badge: "规律成立", active: true },
              ],
              annotation: "从第 3 个数开始，每个数都是前面两个数相加！",
            },
          },
          {
            step: 2,
            tag: "算出括号",
            title: "第 2 步：5 + 8 = 13，检验 8 + 13 = 21 ✓",
            narration: `所以括号里填 5 + 8 = 13！再往后看：8 + 13 = 21，正好对上最后一个数 21！`,
            activeFormulaIndices: [1],
            liveStats: [
              { label: "括号里填", value: "13", tone: "teal" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "5 + 8 = 13", badge: "填 13", active: true },
                { label: "8 + 13 = 21", badge: "检验通过 ✓", active: true },
              ],
              annotation: "答案是 13！",
            },
          },
        ],
      }),
    },
  ],
};
