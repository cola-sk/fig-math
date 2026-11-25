import { teachingSteps, numberCheckpoint } from "../teachingSteps";
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
      modeLabel: "基础例题 · 相差越来越大",
      bookPart: "A版",
      tier: "base",
      title: "找规律填数：1，2，4，7，11，（ ），22",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `仔细观察下面这排数字的规律，括号里应该填几？\n1，2，4，7，11，（  ），22`,
        formulas: [
          { id: "ns-1", latex: `1 \\xrightarrow{+1} 2 \\xrightarrow{+2} 4 \\xrightarrow{+3} 7 \\xrightarrow{+4} 11`, comment: "相邻两数的差依次增加 1" },
          { id: "ns-2", latex: `11 + 5 = 16, \\quad 16 + 6 = 22`, comment: "接下来加 5，再加 6 正好对上 22" },
        ],
        steps: teachingSteps([
{ title: `先观察已知数字，你想怎样找规律？`, narration: `这排数字是 1、2、4、7、11、?、22。相邻两数是每次加同一个数吗？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `1`, tone: "coral" },{ id: `c1`, text: `2`, tone: "teal" },{ id: `c2`, text: `4`, tone: "teal" },{ id: `c3`, text: `7`, tone: "teal" },{ id: `c4`, text: `11`, tone: "teal" },{ id: `c5`, text: `?`, tone: "teal" },{ id: `c6`, text: `22`, tone: "teal" }], rows: [], annotation: `先观察，空位暂不填` }, activeFormulaIndices: [] },
{ title: `先试一试，怎样从前面的数走到后面？`, narration: `从 1 到 2 多 1，从 2 到 4 多 2。请继续比较 4 到 7、7 到 11，增加的数有什么变化？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `+1`, tone: "coral" },{ id: `c1`, text: `+2`, tone: "teal" },{ id: `c2`, text: `?`, tone: "teal" },{ id: `c3`, text: `?`, tone: "teal" }], rows: [{ label: `继续比较`, badge: `还符合吗？`, active: true }], annotation: `` }, activeFormulaIndices: [] },
{ title: `前面的规律都符合，括号里应该填几？`, narration: `前面每次增加的数依次是 1、2、3、4，接下来该增加多少？用这个规律，从 11 找到空位。`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `11`, tone: "coral" },{ id: `c1`, text: `下一次增加 ?`, tone: "teal" },{ id: `c2`, text: `空位 ?`, tone: "teal" }], rows: [{ label: `填空后还要检验`, badge: `对上最后的数`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`括号里填几？`, 16, ``, `填完后接着算一步，看看是否对上最后的已知数。`) },
{ tag: `验证与回顾`, title: "11 + 5 = 16，再加 6 正好等于 22！", narration: `按规律，11 后面要 +5，得到 16！再检验最后一步：16 + 6 = 22，和题目完全吻合！`, tipTitle: "找规律检验法", tipBody: `先用已知数试规律，填完再往后验一步。`, activeFormulaIndices: [0, 1], liveStats: [
              { label: "括号里填", value: "16", tone: "teal" },
              { label: "检验下一步", value: "16 + 6 = 22 ✓" },
            ], sceneState: {
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
            } }
]),
      }),
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 兔子数列（前两数之和）",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：1，1，2，3，5，8，（ ），21",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `找规律填数：1，1，2，3，5，8，（  ），21`,
        formulas: [
          { id: "ns-3", latex: `1+1=2,\\; 1+2=3,\\; 2+3=5,\\; 3+5=8`, comment: "从第 3 个数起，每个数 = 前两个数之和" },
          { id: "ns-4", latex: `5 + 8 = 13, \\quad 8 + 13 = 21`, comment: "检验：8 + 13 = 21 成立" },
        ],
        steps: teachingSteps([
{ title: `先观察已知数字，你想怎样找规律？`, narration: `这排数字是 1、1、2、3、5、8、?、21。先观察前面的数字，试试哪些数之间有关联。`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `1`, tone: "coral" },{ id: `c1`, text: `1`, tone: "teal" },{ id: `c2`, text: `2`, tone: "teal" },{ id: `c3`, text: `3`, tone: "teal" },{ id: `c4`, text: `5`, tone: "teal" },{ id: `c5`, text: `8`, tone: "teal" },{ id: `c6`, text: `?`, tone: "teal" },{ id: `c7`, text: `21`, tone: "teal" }], rows: [], annotation: `先观察，空位暂不填` }, activeFormulaIndices: [] },
{ title: `先试一试，怎样从前面的数走到后面？`, narration: `先试两个数相加：1 和 1 合起来是 2，1 和 2 合起来是 3。再试 2 和 3、3 和 5，能对上后面的数吗？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `1 + 1 = 2`, tone: "coral" },{ id: `c1`, text: `1 + 2 = 3`, tone: "teal" }], rows: [{ label: `继续比较`, badge: `还符合吗？`, active: true }], annotation: `` }, activeFormulaIndices: [] },
{ title: `前面的规律都符合，括号里应该填几？`, narration: `从第三个数起，前两个数的和等于后一个数。空位前的两个数是 5 和 8，空位里应填几？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `5`, tone: "coral" },{ id: `c1`, text: `8`, tone: "teal" },{ id: `c2`, text: `空位 ?`, tone: "teal" }], rows: [{ label: `填空后还要检验`, badge: `对上最后的数`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`括号里填几？`, 13, ``, `填完后接着算一步，看看是否对上最后的已知数。`) },
{ tag: `验证与回顾`, title: "5 + 8 = 13，检验 8 + 13 = 21 ✓", narration: `所以括号里填 5 + 8 = 13！再往后看：8 + 13 = 21，正好对上最后一个数 21！`, activeFormulaIndices: [0, 1], liveStats: [
              { label: "括号里填", value: "13", tone: "teal" },
            ], sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "5 + 8 = 13", badge: "填 13", active: true },
                { label: "8 + 13 = 21", badge: "检验通过 ✓", active: true },
              ],
              annotation: "答案是 13！",
            }, tipBody: `先用已知数试规律，填完再往后验一步。` }
]),
      }),
    },
  ],
};
