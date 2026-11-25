import type { MathLesson } from "../../types/lesson";

export const g2MathPuzzleLesson: MathLesson = {
  id: "g2-math-puzzle",
  chapterId: "g2-reasoning-thinking",
  chapterTitle: "09. 推理思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.89",
  title: "算式谜（竖式里的隐藏数字）",
  summary: "竖式里躲着几个调皮的文字或符号！从个位出发，看清有没有进位或借位，一个一个把数字抓出来！",
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
      modeLabel: "加法竖式谜",
      bookPart: "A版",
      tier: "base",
      title: "竖式“好 4 + 3 学 = 8 2”，好和学各是几？",
      subtitle: "先看个位“4 + 学 = 2”，不够减说明向十位进了 1（其实是 12）！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `在加法竖式“好4 + 3学 = 82”中，“好”和“学”分别代表不同的数字。请问“好”和“学”各是多少？`,
        formulas: [
          { id: "mpz-1", latex: `4 + \\text{学} = 12 \\implies \\text{学} = 8 \\text{ (个位满十进 1)}`, comment: "4 加几尾数是 2？只有 12！" },
          { id: "mpz-2", latex: `\\text{好} + 3 + 1 = 8 \\implies \\text{好} = 4`, comment: "十位别忘了加上个位进来的 1" },
        ],
        steps: [
          {
            step: 1,
            tag: "先破个位",
            title: "第 1 步：个位 4 + 学 尾数是 2 → 学 = 8（进 1）",
            narration: `解算式谜先看个位！4 加“学”不可能等于 2，说明个位满十进了 1，4 + 学 = 12！所以“学” = 12 - 4 = 8！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "个位线索", value: "4 + 学 = 12" },
              { label: "算出“学”", value: "8（进 1）", tone: "coral" },
            ],
            sceneState: {
              kind: "balance-puzzle",
              mode: "arith-puzzle",
              puzzleLines: ["  好  4", "+ 3  学", "———————", "  8  2"],
              puzzleHint: "突破口在个位：4 + 学 = 12 → 学 = 8，向十位进 1！",
              annotation: "第一步：先看个位，判断出满十进 1！",
            },
          },
          {
            step: 2,
            tag: "再破十位",
            title: "第 2 步：十位 好 + 3 + 进位 1 = 8 → 好 = 4",
            narration: `个位进了 1 给十位，千万别忘！十位上是“好 + 3 + 1 = 8”，所以“好” = 8 - 4 = 4！验证：44 + 38 = 82，完全正确！`,
            tipTitle: "竖式算式谜口诀",
            tipBody: "加减竖式从个位算起，尾数变小必进位，减不够时必借位！",
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
        ],
      }),
    },
    {
      id: "var-1",
      modeLabel: "黄金三角数",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：两位数加两位数进位成三位数（虫蚀谜）",
      subtitle: "两个两位数相加，最多只能等于 198，所以百位一定是 1！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `在竖式“9□ + □5 = 1△3”中，百位上的 1 已经写出来了。如果两个方框里的数字相同，请问 □ 和 △ 各是几？`,
        formulas: [
          { id: "mpz-3", latex: `\\square + 5 = 13 \\implies \\square = 8`, comment: "个位满十进 1" },
          { id: "mpz-4", latex: `98 + 85 = 183 \\implies \\triangle = 8`, comment: "代入检验得出 △ = 8" },
        ],
        steps: [
          {
            step: 1,
            tag: "破个位",
            title: "第 1 步：□ + 5 尾数是 3 → □ = 8",
            narration: `个位上是 □ + 5，结果尾数是 3，所以 □ + 5 = 13，□ = 8，同时向十位进 1！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "算出 □", value: "8", tone: "coral" },
            ],
            sceneState: {
              kind: "balance-puzzle",
              mode: "arith-puzzle",
              puzzleLines: ["   9  □", "+  □  5", "————————", "1  △  3"],
              puzzleHint: "个位：□ + 5 = 13 → □ = 8（进 1）",
              annotation: "个位突破：□ = 8！",
            },
          },
          {
            step: 2,
            tag: "算十位",
            title: "第 2 步：98 + 85 = 183 → △ = 8",
            narration: `把 □ = 8 填进去，十位是 9 + 8 + 进位 1 = 18，所以百位是 1，十位 △ = 8！`,
            activeFormulaIndices: [1],
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
          },
        ],
      }),
    },
  ],
};
