import type { MathLesson } from "../../types/lesson";

export const g2LogicClueLesson: MathLesson = {
  id: "g2-logic-clue",
  chapterId: "g2-reasoning-thinking",
  chapterTitle: "09. 推理思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.93",
  title: "条件推理（像小侦探一样排除线索）",
  summary: "谁拿了什么书？谁跑了第几名？抓住最确定的一条线索，用“连线排除法”一步步锁定答案！",
  engine: "combo-visual",
  keywords: ["二年级", "条件推理", "逻辑推理", "排除法", "小侦探"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "09. 推理思维训练",
      weekLabel: "p.93",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "三人拿书推理",
      bookPart: "A版",
      tier: "base",
      title: "甲乙丙拿语文、数学、英语书，已知甲拿语文，乙不拿数学…",
      subtitle: "先锁死最确定的条件（甲拿语文），剩下的二选一立刻秒解！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `小宇、小乐、小琪三个人分别拿着语文书、数学书和英语书。小宇说：“我拿的不是数学书，也不是英语书。”小乐说：“我拿的不是数学书。”请问他们三人分别拿了什么书？`,
        formulas: [
          { id: "lc-1", latex: `\\text{线索 1：小宇不拿数学、不拿英语} \\implies \\text{小宇 = 语文书}`, comment: "先锁定最确定的那个人" },
          { id: "lc-2", latex: `\\text{线索 2：小乐不拿数学} \\implies \\text{小乐 = 英语书，小琪 = 数学书}`, comment: "剩下的二选一排除即可" },
        ],
        steps: [
          {
            step: 1,
            tag: "锁定第一条线索",
            title: "第 1 步：小宇不是数学也不是英语 → 小宇拿语文书",
            narration: `破案第一步：找最确定的线索！三本书里排除了数学和英语，小宇手里只能是“语文书”！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "小宇锁定", value: "语文书", tone: "coral" },
              { label: "还剩书本", value: "数学、英语" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "小宇（不是数学、不是英语）", badge: "→ 语文书", active: true },
                { label: "小乐（待确定）", badge: "数学 / 英语" },
                { label: "小琪（待确定）", badge: "数学 / 英语" },
              ],
              annotation: "第一步锁定：小宇 = 语文书！",
            },
          },
          {
            step: 2,
            tag: "排除剩下两人",
            title: "第 2 步：小乐不是数学 → 小乐拿英语，小琪拿数学",
            narration: `只剩下数学和英语两本书。小乐说自己拿的不是数学，所以小乐只能拿“英语书”，最后剩下的“数学书”就归小琪啦！`,
            tipTitle: "小侦探破案法",
            tipBody: "遇到“不是这个、也不是那个”的推理题，先把能直接锁定的找出来，剩下的用排除法！",
            activeFormulaIndices: [0, 1],
            liveStats: [
              { label: "小宇", value: "语文书" },
              { label: "小乐", value: "英语书", tone: "teal" },
              { label: "小琪", value: "数学书", tone: "coral" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "小宇", badge: "语文书", active: true },
                { label: "小乐（不是数学）", badge: "→ 英语书", active: true },
                { label: "小琪（最后剩下）", badge: "→ 数学书", active: true },
              ],
              annotation: "全员破案！小宇=语文，小乐=英语，小琪=数学！",
            },
          },
        ],
      }),
    },
    {
      id: "var-1",
      modeLabel: "真话假话推理",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：只有一个人说了真话，谁做的好事？",
      subtitle: "三个人各说一句，假设其中一个说真话，看看另外两句是不是刚好都是假话！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `教室玻璃擦得亮晶晶的，老师表扬大家，三位同学说了下面的话，已知只有一个人说了真话：\n甲说：“不是我擦的。”\n乙说：“是丙擦的。”\n丙说：“不是我擦的。”\n请问玻璃到底是谁擦的？`,
        formulas: [
          { id: "lc-3", latex: `\\text{乙和丙说的话正好相反（必有一真一假）}`, comment: "抓住互相矛盾的两句话" },
          { id: "lc-4", latex: `\\text{甲必说假话} \\implies \\text{是甲擦的}`, comment: "一共只有 1 句真话，所以甲说假话" },
        ],
        steps: [
          {
            step: 1,
            tag: "找矛盾的两句话",
            title: "第 1 步：乙说“是丙”，丙说“不是丙” → 一真一假在乙丙之间",
            narration: `仔细看！乙说“是丙擦的”，丙说“不是我擦的”，这两句话完全相反，所以那一唯一句真话肯定藏在乙和丙中间！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "唯一真话", value: "在乙和丙之间", tone: "teal" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "乙：是丙擦的  vs  丙：不是我擦的", badge: "一真一假", active: true },
                { label: "甲：不是我擦的", badge: "必定说假话" },
              ],
              annotation: "乙和丙互相打架，唯一真话就在他俩中间，所以甲一定在说假话！",
            },
          },
          {
            step: 2,
            tag: "锁定做好事的人",
            title: "第 2 步：甲说“不是我”是假话 → 其实就是甲擦的！",
            narration: `既然甲说“不是我擦的”是假话，那就证明正好是甲擦的！检验一下：如果是甲，甲说假话，乙说假话，丙说“不是我”是真话，刚好只有 1 个真话！`,
            activeFormulaIndices: [1],
            liveStats: [
              { label: "做好事的是", value: "甲同学", tone: "coral" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "甲（不是我擦的）", badge: "假话 → 是甲擦的！", active: true },
                { label: "乙（是丙擦的）", badge: "假话" },
                { label: "丙（不是我擦的）", badge: "真话（唯一）", active: true },
              ],
              annotation: "破案了！是甲同学擦的，只有丙说了真话！",
            },
          },
        ],
      }),
    },
  ],
};
