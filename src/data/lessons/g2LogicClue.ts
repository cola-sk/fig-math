import { teachingSteps } from "../teachingSteps";
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
      modeLabel: "基础例题 · 三人拿书推理",
      bookPart: "A版",
      tier: "base",
      title: "三人各拿一本书，怎样根据线索确定？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `小宇、小乐、小琪三个人分别拿着语文书、数学书和英语书。小宇说：“我拿的不是数学书，也不是英语书。”小乐说：“我拿的不是数学书。”请问他们三人分别拿了什么书？`,
        formulas: [
          { id: "lc-1", latex: `\\text{线索 1：小宇不拿数学、不拿英语} \\implies \\text{小宇 = 语文书}`, comment: "先锁定最确定的那个人" },
          { id: "lc-2", latex: `\\text{线索 2：小乐不拿数学} \\implies \\text{小乐 = 英语书，小琪 = 数学书}`, comment: "剩下的二选一排除即可" },
        ],
        steps: teachingSteps([
{ title: `谁的线索能先排除两种书？`, narration: `小宇说不是数学、不是英语；小乐只说不是数学。先看哪条线索限制最多，能最快确定一个人？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `📚 语文`, tone: "coral" },{ id: `c1`, text: `📗 数学`, tone: "teal" },{ id: `c2`, text: `📘 英语`, tone: "teal" }], rows: [{ label: `小宇`, badge: `非数学、非英语`, active: true },{ label: `小乐`, badge: `非数学`, active: true },{ label: `小琪`, badge: `?`, active: true }], annotation: `` }, activeFormulaIndices: [] },
{ title: `排除两本后，小宇还能拿什么？`, narration: `三本书每人各拿一本，不重复。小宇排除数学和英语后，只剩哪本书能拿？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `语文`, tone: "coral" },{ id: `c1`, text: `数学 ×`, tone: "teal" },{ id: `c2`, text: `英语 ×`, tone: "teal" }], rows: [{ label: `小宇拿的书`, badge: `?`, active: true }], annotation: `` }, activeFormulaIndices: [], checkpoint: { question: `小宇拿什么书？`, options: ["英语书", "语文书", "数学书"], correctIndex: 1, feedbackCorrect: `对，排除数学和英语，只剩语文。`, feedbackWrong: `把小宇说不拿的两本书先划掉。` } },
{ title: `小宇确定后，小乐和小琪怎样分？`, narration: `小宇拿语文，剩下数学和英语。小乐不拿数学，所以小乐拿哪本？最后剩下的一本又归谁？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `小宇：语文`, tone: "coral" }], rows: [{ label: `剩下两本`, badge: `数学、英语`, active: true },{ label: `小乐`, badge: `不是数学`, active: true },{ label: `小琪`, badge: `?`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: { question: `小乐拿什么书？`, options: ["数学书", "英语书", "语文书"], correctIndex: 1, feedbackCorrect: `对，小乐拿英语，剩下数学给小琪。`, feedbackWrong: `语文已经给小宇，只在剩下的两本里排除。` } },
{ tag: `验证与回顾`, title: "小乐不是数学 → 小乐拿英语，小琪拿数学", narration: `小宇拿语文、小乐拿英语、小琪拿数学。检查：三本各不相同，小宇不拿数学也不拿英语，小乐不拿数学，两条线索都符合。`, tipTitle: "小侦探破案法", tipBody: `先看确定多的，再在剩下里面排除。`, activeFormulaIndices: [0, 1], liveStats: [
              { label: "小宇", value: "语文书" },
              { label: "小乐", value: "英语书", tone: "teal" },
              { label: "小琪", value: "数学书", tone: "coral" },
            ], sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "小宇", badge: "语文书", active: true },
                { label: "小乐（不是数学）", badge: "→ 英语书", active: true },
                { label: "小琪（最后剩下）", badge: "→ 数学书", active: true },
              ],
              annotation: "全员破案！小宇=语文，小乐=英语，小琪=数学！",
            } }
]),
      }),
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 真话假话推理",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：只有一个人说了真话，谁做的好事？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `教室玻璃擦得亮晶晶的，老师表扬大家，三位同学说了下面的话，已知只有一个人说了真话：\n甲说：“不是我擦的。”\n乙说：“是丙擦的。”\n丙说：“不是我擦的。”\n请问玻璃到底是谁擦的？`,
        formulas: [
          { id: "lc-3", latex: `\\text{乙和丙说的话正好相反（必有一真一假）}`, comment: "抓住互相矛盾的两句话" },
          { id: "lc-4", latex: `\\text{甲必说假话} \\implies \\text{是甲擦的}`, comment: "一共只有 1 句真话，所以甲说假话" },
        ],
        steps: teachingSteps([
{ title: `先找两句谈同一件事的话`, narration: `只有一人说真话。乙说是丙擦的，丙说不是自己擦的。这两句话在说同一件事，能同时都真吗？能同时都假吗？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `甲：不是我`, tone: "coral" },{ id: `c1`, text: `乙：是丙`, tone: "teal" },{ id: `c2`, text: `丙：不是我`, tone: "teal" }], rows: [], annotation: `先比较乙、丙两句` }, activeFormulaIndices: [] },
{ title: `互相相反的两句话，一共占几句真话？`, narration: `乙说是丙，丙说不是丙。无论到底是谁擦的，这两句一定是一真一假。一共只有一句真话，甲还能说真话吗？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `乙：是丙`, tone: "coral" },{ id: `c1`, text: `丙：不是丙`, tone: "teal" }], rows: [{ label: `两句话`, badge: `一真一假`, active: true },{ label: `甲说的话`, badge: `?`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: { question: `甲说的是真话还是假话？`, options: ["真话", "假话"], correctIndex: 1, feedbackCorrect: `对，唯一的真话已经在乙和丙之间，甲只能说假话。`, feedbackWrong: `所有人合计只有一句真话。` } },
{ title: `甲说“不是我”是假话，到底是谁？`, narration: `甲说“不是我擦的”，这句是假话。把它反过来想，擦玻璃的人是谁？先选一个人，再检查三句话。`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `甲：不是我`, tone: "coral" },{ id: `c1`, text: `这句是假话`, tone: "teal" }], rows: [{ label: `擦玻璃的人`, badge: `?`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: { question: `玻璃是谁擦的？`, options: ["甲", "乙", "丙"], correctIndex: 0, feedbackCorrect: `对，否定“不是我”，就是“是我”。`, feedbackWrong: `把甲这句假话变成与它相反的真话。` } },
{ tag: `验证与回顾`, title: "甲说“不是我”是假话 → 其实就是甲擦的！", narration: `既然甲说“不是我擦的”是假话，那就证明正好是甲擦的！检验一下：如果是甲，甲说假话，乙说假话，丙说“不是我”是真话，刚好只有 1 个真话！`, activeFormulaIndices: [0, 1], liveStats: [
              { label: "做好事的是", value: "甲同学", tone: "coral" },
            ], sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "甲（不是我擦的）", badge: "假话 → 是甲擦的！", active: true },
                { label: "乙（是丙擦的）", badge: "假话" },
                { label: "丙（不是我擦的）", badge: "真话（唯一）", active: true },
              ],
              annotation: "破案了！是甲同学擦的，只有丙说了真话！",
            }, tipBody: `相反两句先找出，真假总数再核对。` }
]),
      }),
    },
  ],
};
