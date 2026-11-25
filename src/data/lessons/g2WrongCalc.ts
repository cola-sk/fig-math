import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";

export const g2WrongCalcLesson: MathLesson = {
  id: "g2-wrong-calc",
  chapterId: "g2-reverse-thinking",
  chapterTitle: "08. 逆向思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.80",
  title: "错中求解（看错数字怎么办？）",
  summary: "小马虎把数字或符号看错了！别慌，先用“错误算式”倒推出原本那个神秘数，再按正确算式算一遍就行啦！",
  engine: "combo-visual",
  keywords: ["二年级", "错中求解", "逆向思维", "小马虎", "倒推"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "08. 逆向思维训练",
      weekLabel: "p.80",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 加号看成减号",
      bookPart: "A版",
      tier: "base",
      title: "把“□ + 18”看成了“□ - 18”，算得 25，正确结果是几？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {
        b: 18,
        wrongRes: 25,
      },
      paramDefs: [
        { key: "b", label: "第二个数", min: 5, max: 30, step: 1, unit: "" },
        { key: "wrongRes", label: "错算结果", min: 10, max: 50, step: 1, unit: "" },
      ],
      build: (params) => {
        const b = params.b ?? 18;
        const wrongRes = params.wrongRes ?? 25;
        const mystery = wrongRes + b;
        const rightRes = mystery + b;
        return {
          problemStatement: `小马虎在做一道加法题“□ + ${b}”时，粗心地把“+”看成了“-”，结果算出来的得数是 ${wrongRes}。请问正确的得数应该是多少？`,
          formulas: [
            { id: "wc-1", latex: `\\square - ${b} = ${wrongRes} \\implies \\square = ${wrongRes} + ${b} = ${mystery}`, comment: "将错就错，先求出被藏起来的 □" },
            { id: "wc-2", latex: `\\text{正确结果} = ${mystery} + ${b} = ${rightRes}`, comment: "把 □ 代回正确的加法算式" },
          ],
          steps: teachingSteps([
{ title: `小马虎做对了哪一道“错题”？`, narration: `原题是方框加 ${b}，他看成方框减 ${b}，算出了 ${wrongRes}。先别急着改答案，能借这条减法线索找出方框吗？`, sceneState: { kind: "balance-puzzle", mode: "swap", swapRows: [{ left: `正确：□ + ${b}`, right: `?`, highlight: true },{ left: `误看：□ - ${b}`, right: `${wrongRes}`, highlight: true }], annotation: `同一个方框，运算看错了` }, activeFormulaIndices: [] },
{ title: `方框减去一部分后剩这些，方框是多少？`, narration: `方框减去 ${b} 后是 ${wrongRes}。倒着把减去的放回去，方框里是什么数？`, sceneState: { kind: "balance-puzzle", mode: "swap", swapRows: [{ left: `□ - ${b}`, right: `${wrongRes}`, highlight: true },{ left: `□`, right: `?`, highlight: true }], annotation: `先利用他实际做的减法` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`方框里是什么数？`, mystery, ``, `把误减的数加回来。`) },
{ title: `方框找到了，正确的加法结果是多少？`, narration: `方框是 ${mystery}，原题要求加 ${b}。把这个数放回正确算式，再算一次。`, sceneState: { kind: "balance-puzzle", mode: "swap", swapRows: [{ left: `□`, right: `${mystery}`, highlight: true },{ left: `${mystery} + ${b}`, right: `?`, highlight: true }], annotation: `现在回到原题` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`正确结果是多少？`, rightRes, ``, `按照原题的加号来算。`) },
{ tag: `验证与回顾`, title: `把 □ = ${mystery} 代回“□ + ${b}” → ${rightRes}`, narration: `找到了 □ = ${mystery}，现在按正确的加法来算：${mystery} + ${b} = ${rightRes}！`, tipTitle: "错中求解秘诀", tipBody: `先看他怎么算，再还原原题算。`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "原来的 □", value: `${mystery}` },
                { label: "正确得数", value: `${rightRes}`, tone: "teal" },
              ], sceneState: {
                kind: "combo-visual",
                mode: "money",
                rows: [
                  { label: `已知原数：□ = ${mystery}`, badge: "已锁定" },
                  { label: `正确算式：${mystery} + ${b} = ${rightRes}`, badge: `答案 ${rightRes}`, active: true },
                ],
                annotation: `正解出炉：${mystery} + ${b} = ${rightRes}！`,
              } }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 数字看错相差法",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：把十位上的 3 看成了 8，结果多了多少？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `乐乐做一道加法题时，把其中一个加数十位上的 3 看成了 8，算出的结果是 94。正确的结果应该是多少？`,
        formulas: [
          { id: "wc-3", latex: `80 - 30 = 50`, comment: "十位上的 3 看成 8，多加了 50" },
          { id: "wc-4", latex: `94 - 50 = 44`, comment: "把多加的 50 减回去" },
        ],
        steps: teachingSteps([
{ title: `十位上的 3 看成 8，结果变大还是变小？`, narration: `错误的结果是 94。先看十位：3 个十被看成了 8 个十，变化发生在个位还是十位？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `十位：3 → 8`, tone: "coral" },{ id: `c1`, text: `错误结果 94`, tone: "teal" }], rows: [], annotation: `正确结果：?` }, activeFormulaIndices: [] },
{ title: `多看了几个十，一共多加了多少？`, narration: `3 个十变成 8 个十，多了几个十？请把它换成实际多加的数。`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `原来 30`, tone: "coral" },{ id: `c1`, text: `看成 80`, tone: "teal" }], rows: [{ label: `多加了`, badge: `?`, active: true }], annotation: `` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`一共多加了多少？`, 50, ``, `十位上每多 1，实际就多 10。`) },
{ title: `错误结果多了一部分，怎样还原？`, narration: `错误结果 94 里多加了 50。要回到正确结果，该加回去还是减回来？请先算一算。`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `错误结果 94`, tone: "coral" },{ id: `c1`, text: `多加 50`, tone: "teal" }], rows: [{ label: `正确结果`, badge: `?`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`正确结果是多少？`, 44, ``, `把多加的部分从错误结果中减掉。`) },
{ tag: `验证与回顾`, title: "把多加的 50 减回去 → 94 - 50 = 44", narration: `结果多算了 50，只要把 94 减去 50，就还原出正确的得数 44 啦！`, activeFormulaIndices: [0, 1], liveStats: [
              { label: "正确得数", value: "44", tone: "teal" },
            ], sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "错误结果：94", badge: "大了 50" },
                { label: "正确结果：94 - 50 = 44", badge: "答案 44", active: true },
              ],
              annotation: "多加就减去，少加就补上！正确结果是 44！",
            }, tipBody: `先找错了多少，多加就减回，少加就补上。` }
]),
      }),
    },
  ],
};
