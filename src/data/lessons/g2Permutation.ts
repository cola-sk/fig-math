import type { MathLesson } from "../../types/lesson";

export const g2PermutationLesson: MathLesson = {
  id: "g2-permutation",
  chapterId: "g2-ordered-thinking",
  chapterTitle: "06. 有序思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.56",
  title: "排列问题（数字卡片与排队）",
  summary: "用 3 张数字卡片能摆出多少个不同的两位数？学会“固定十位法”，按顺序排绝不漏掉一个！",
  engine: "combo-visual",
  keywords: ["二年级", "排列问题", "有序思维", "数字卡片", "固定十位"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "06. 有序思维训练",
      weekLabel: "p.56",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "数字卡片排两位数",
      bookPart: "A版",
      tier: "base",
      title: "用 1、2、3 能摆出几个不同的两位数？",
      subtitle: "先固定十位，再选个位——有序思考不重不漏！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `用数字卡片 1、2、3 这三张卡片（每次取两张，不能重复使用），一共可以组成多少个不同的两位数？`,
        formulas: [
          { id: "pm-1", latex: `3 \\times 2 = 6\\text{ (个)}`, comment: "十位有3种选法，个位剩2种选法" },
        ],
        steps: [
          {
            step: 1,
            tag: "固定十位",
            title: "先让 1 当十位：摆出 12、13",
            narration: `把 1 固定在十位上，剩下的 2 和 3 轮流站到个位，摆出 12 和 13 这 2 个数。`,
            activeFormulaIndices: [],
            liveStats: [
              { label: "1开头的两位数", value: "12, 13 (2个)", tone: "coral" },
              { label: "已摆出", value: "2 个" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "permutation",
              cards: [
                { id: "p1", text: "12", tone: "coral" },
                { id: "p2", text: "13", tone: "coral" },
              ],
              rows: [
                { label: "十位是 1：个位选 2 或 3", badge: "12、13（2个）", active: true },
              ],
              annotation: "固定十位 = 1，有 2 种摆法",
            },
          },
          {
            step: 2,
            tag: "全部列举",
            title: "再让 2、3 轮流当十位：一共 3 × 2 = 6 个！",
            narration: `十位可以是 1、2、3（共 3 种选择），每种确定后，个位都有剩下的 2 个数字可选，所以共有 3 × 2 = 6 个不同的两位数！`,
            tipTitle: "排列有序口诀",
            tipBody: "高位先固定，低位按顺序换；有顺序要求的叫「排列」（12 和 21 是两个不同的数）！",
            activeFormulaIndices: [0],
            liveStats: [
              { label: "十位选法", value: "3 种 (1/2/3)" },
                { label: "个位选法", value: "2 种" },
              { label: "总数", value: "6 个", tone: "teal" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "permutation",
              cards: [
                { id: "p1", text: "12", tone: "coral" },
                { id: "p2", text: "13", tone: "coral" },
                { id: "p3", text: "21", tone: "teal" },
                { id: "p4", text: "23", tone: "teal" },
                { id: "p5", text: "31", tone: "blue" },
                { id: "p6", text: "32", tone: "blue" },
              ],
              rows: [
                { label: "十位是 1 / 2 / 3 各有 2 个", badge: "3 × 2 = 6 个", active: true },
              ],
              annotation: "一共摆出 12, 13, 21, 23, 31, 32 共 6 个两位数！",
            },
          },
        ],
      }),
    },
    {
      id: "var-1",
      modeLabel: "带 0 的数字陷阱",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：用 0、2、5 能组成几个两位数？",
      subtitle: "小心陷阱！0 不能站在十位（最高位）上！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `用数字卡片 0、2、5 组成没有重复数字的两位数，一共能组成几个？（注意 0 的位置！）`,
        formulas: [
          { id: "pmv-1", latex: `2 \\times 2 = 4\\text{ (个)}`, comment: "十位只能选2或5（2种），个位可以选0（2种）" },
        ],
        steps: [
          {
            step: 1,
            tag: "避坑 0 在首位",
            title: "0 不能当十位！十位只有 2 种选法",
            narration: `“02”和“05”不是两位数！所以十位只能放 2 或 5（2 种选择），放好之后 0 就可以放进个位了，共 2 × 2 = 4 个：20、25、50、52！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "十位可选", value: "2 或 5 (2种)", tone: "coral" },
              { label: "个位可选", value: "含 0 (2种)" },
              { label: "两位数总数", value: "4 个", tone: "teal" },
            ],
            checkpoint: {
              question: "用 0、2、5 摆两位数，“02”算两位数吗？",
              options: ["算", "不算，最高位不能是 0"],
              correctIndex: 1,
              feedbackCorrect: "答对了！最高位不能站 0，所以只有 20、25、50、52 这 4 个！",
              feedbackWrong: "记住：两位数的十位上绝对不能是 0 哦！",
            },
            sceneState: {
              kind: "combo-visual",
              mode: "permutation",
              cards: [
                { id: "z1", text: "20", tone: "teal" },
                { id: "z2", text: "25", tone: "teal" },
                { id: "z3", text: "50", tone: "blue" },
                { id: "z4", text: "52", tone: "blue" },
              ],
              rows: [
                { label: "十位不能为 0：只有 2 和 5", badge: "2 × 2 = 4 个", active: true },
              ],
              annotation: "避开 0 在十位的陷阱：只有 20, 25, 50, 52 共 4 个",
            },
          },
        ],
      }),
    },
  ],
};
