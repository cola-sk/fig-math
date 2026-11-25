import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";
export const g2MathPuzzleLesson: MathLesson = {
  id: "g2-math-puzzle",
  chapterId: "g2-reasoning-thinking",
  chapterTitle: "09. 推理思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.89",
  title: "算式谜（竖式里的隐藏数字）",
  summary:
    "竖式里躲着几个调皮的文字或符号！从个位出发，看清有没有进位或借位，一个一个把数字抓出来！",
  engine: "balance-puzzle",
  keywords: ["二年级", "算式谜", "竖式谜", "推理思维"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "09. 推理思维训练",
      weekLabel: "p.89",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 加法竖式谜",
      bookPart: "A版",
      tier: "base",
      title: "竖式“好 4 + 3 学 = 8 2”，好和学各是几？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `在加法竖式“好4 + 3学 = 82”中，“好”和“学”分别代表不同的数字。请问“好”和“学”各是多少？`,
        formulas: [
          {
            id: "mpz-1",
            latex: `4 + \\text{学} = 12 \\implies \\text{学} = 8 \\text{ (个位满十进 1)}`,
            comment: "4 加几尾数是 2？只有 12！",
          },
          {
            id: "mpz-2",
            latex: `\\text{好} + 3 + 1 = 8 \\implies \\text{好} = 4`,
            comment: "十位别忘了加上个位进来的 1",
          },
        ],
        steps: teachingSteps([
          {
            title: `先观察个位，怎样才会得到这个尾数？`,
            narration: `4 加上一个数字，个位却是 2。能直接加出 2 吗？`,
            sceneState: {
              kind: "balance-puzzle",
              mode: "arith-puzzle",
              puzzleLines: ["  好  4", "+ 3  学", "——————", "  8  2"],
              puzzleHint: `先判断有没有进位，不急着填数字`,
              annotation: `从个位开始，一列一列推理`,
            },
            activeFormulaIndices: [],
          },
          {
            title: `个位的和跨过了十，空着的数字是多少？`,
            narration: `4 加一个数字不能等于 2，说明和跨过了十，个位留下 2。这个和是多少？再反过来找“学”。`,
            sceneState: {
              kind: "balance-puzzle",
              mode: "arith-puzzle",
              puzzleLines: ["  好  4", "+ 3  学", "——————", "  8  2"],
              puzzleHint: `个位满十要进 1，先找个位缺少的数字`,
              annotation: `从个位开始，一列一列推理`,
            },
            activeFormulaIndices: [],
            checkpoint: numberCheckpoint(
              `“学”是几？`,
              8,
              ``,
              `先确定个位相加的完整结果，再找缺少的加数。`,
            ),
          },
          {
            title: `个位填好了，十位需要带上什么？`,
            narration: `学是 8，4 + 8 = 12。个位写 2，把进的 1 送到十位。好加上 3，再加进来的 1，怎样得到 8？`,
            sceneState: {
              kind: "balance-puzzle",
              mode: "arith-puzzle",
              puzzleLines: ["  好  4", "+ 3  8", "——————", "  8  2"],
              puzzleHint: `别忘个位送来的进位 1`,
              annotation: `从个位开始，一列一列推理`,
            },
            activeFormulaIndices: [0],
            checkpoint: numberCheckpoint(
              `“好”是几？`,
              4,
              ``,
              `十位要把个位送来的 1 一起算。`,
            ),
          },
          {
            tag: `验证与回顾`,
            title: "十位 好 + 3 + 进位 1 = 8 → 好 = 4",
            narration: `好是 4，学是 8。填回去验算：44 + 38 = 82，两列都对。`,
            tipTitle: "竖式算式谜口诀",
            tipBody: `从个位找线索，满十进一别忘记。`,
            activeFormulaIndices: [0, 1],
            liveStats: [
              { label: "“好”等于", value: "4", tone: "teal" },
              { label: "“学”等于", value: "8", tone: "coral" },
            ],
            sceneState: {
              kind: "balance-puzzle",
              mode: "arith-puzzle",
              puzzleLines: ["  4  4", "+ 3  8", "———————", "  8  2"],
              puzzleHint: "十位：4 + 3 + 进位1 = 8，竖式成立！",
              annotation: "破解成功！好 = 4，学 = 8（44 + 38 = 82）",
            },
          },
        ]),
      }),
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 黄金三角数",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：两位数加两位数进位成三位数（虫蚀谜）",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `在竖式“9□ + □5 = 1△3”中，百位上的 1 已经写出来了。如果两个方框里的数字相同，请问 □ 和 △ 各是几？`,
        formulas: [
          {
            id: "mpz-3",
            latex: `\\square + 5 = 13 \\implies \\square = 8`,
            comment: "个位满十进 1",
          },
          {
            id: "mpz-4",
            latex: `98 + 85 = 183 \\implies \\triangle = 8`,
            comment: "代入检验得出 △ = 8",
          },
        ],
        steps: teachingSteps([
          {
            title: `先观察个位，怎样才会得到这个尾数？`,
            narration: `一个数字加 5，个位却是 3。这个和能直接是 3 吗？`,
            sceneState: {
              kind: "balance-puzzle",
              mode: "arith-puzzle",
              puzzleLines: ["   9  □", "+  □  5", "——————", "1  △  3"],
              puzzleHint: `先判断有没有进位，不急着填数字`,
              annotation: `从个位开始，一列一列推理`,
            },
            activeFormulaIndices: [],
          },
          {
            title: `个位的和跨过了十，空着的数字是多少？`,
            narration: `一个数字加 5 不能等于 3，说明要进位。和的个位是 3，方框里应填几？`,
            sceneState: {
              kind: "balance-puzzle",
              mode: "arith-puzzle",
              puzzleLines: ["   9  □", "+  □  5", "——————", "1  △  3"],
              puzzleHint: `个位满十要进 1，先找个位缺少的数字`,
              annotation: `从个位开始，一列一列推理`,
            },
            activeFormulaIndices: [],
            checkpoint: numberCheckpoint(
              `方框是几？`,
              8,
              ``,
              `先确定个位相加的完整结果，再找缺少的加数。`,
            ),
          },
          {
            title: `个位填好了，十位需要带上什么？`,
            narration: `方框是 8，个位 8 + 5 = 13。十位有 9、8，还有个位送来的 1，十位应写几？`,
            sceneState: {
              kind: "balance-puzzle",
              mode: "arith-puzzle",
              puzzleLines: ["   9  8", "+  8  5", "——————", "1  △  3"],
              puzzleHint: `别忘个位送来的进位 1`,
              annotation: `从个位开始，一列一列推理`,
            },
            activeFormulaIndices: [0],
            checkpoint: numberCheckpoint(
              `三角形是几？`,
              8,
              ``,
              `十位要把个位送来的 1 一起算。`,
            ),
          },
          {
            tag: `验证与回顾`,
            title: "98 + 85 = 183 → △ = 8",
            narration: `方框和三角形都是 8。题目只要求两个方框相同，没有要求方框和三角形不同；验算 98 + 85 = 183。`,
            activeFormulaIndices: [0, 1],
            liveStats: [
              { label: "□ 等于", value: "8" },
              { label: "△ 等于", value: "8", tone: "teal" },
            ],
            sceneState: {
              kind: "balance-puzzle",
              mode: "arith-puzzle",
              puzzleLines: ["   9  8", "+  8  5", "————————", "1  8  3"],
              puzzleHint: "98 + 85 = 183，□ = 8，△ = 8！",
              annotation: "算式完全成立：98 + 85 = 183！",
            },
            tipBody: `从个位找线索，满十进一别忘记。`,
          },
        ]),
      }),
    },
  ],
};
