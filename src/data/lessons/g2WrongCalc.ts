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
      modeLabel: "加号看成减号",
      bookPart: "A版",
      tier: "base",
      title: "把“□ + 18”看成了“□ - 18”，算得 25，正确结果是几？",
      subtitle: "先从错误算式倒推出 □ 是几，再代回正确算式！",
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
          steps: [
            {
              step: 1,
              tag: "将错就错求 □",
              title: `第 1 步：用错误算式倒推出 □ = ${wrongRes} + ${b} = ${mystery}`,
              narration: `虽然看错了符号，但小马虎的减法没算错！从“□ - ${b} = ${wrongRes}”倒推回去，被减数 □ 就是 ${wrongRes} + ${b} = ${mystery}！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "错误算式", value: `□ - ${b} = ${wrongRes}` },
                { label: "倒推出 □", value: `${mystery}`, tone: "coral" },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                rows: [
                  { label: `错误算式：□ - ${b} = ${wrongRes}`, badge: "第一步", active: true },
                  { label: `倒推求原数：□ = ${wrongRes} + ${b} = ${mystery}`, badge: `□ = ${mystery}`, active: true },
                ],
                annotation: `先将错就错，算出原来的第一个数 □ = ${mystery}！`,
              },
            },
            {
              step: 2,
              tag: "代回正确算式",
              title: `第 2 步：把 □ = ${mystery} 代回“□ + ${b}” → ${rightRes}`,
              narration: `找到了 □ = ${mystery}，现在按正确的加法来算：${mystery} + ${b} = ${rightRes}！`,
              tipTitle: "错中求解秘诀",
              tipBody: "第一步“将错就错”把没看错的那个数求出来；第二步把求出的数放回正确算式里重算一遍！",
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "原来的 □", value: `${mystery}` },
                { label: "正确得数", value: `${rightRes}`, tone: "teal" },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                rows: [
                  { label: `已知原数：□ = ${mystery}`, badge: "已锁定" },
                  { label: `正确算式：${mystery} + ${b} = ${rightRes}`, badge: `答案 ${rightRes}`, active: true },
                ],
                annotation: `正解出炉：${mystery} + ${b} = ${rightRes}！`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "数字看错相差法",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：把十位上的 3 看成了 8，结果多了多少？",
      subtitle: "把加数看大了 50，结果就多算了 50，减回去就行！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `乐乐做一道加法题时，把其中一个加数十位上的 3 看成了 8，算出的结果是 94。正确的结果应该是多少？`,
        formulas: [
          { id: "wc-3", latex: `80 - 30 = 50`, comment: "十位上的 3 看成 8，多加了 50" },
          { id: "wc-4", latex: `94 - 50 = 44`, comment: "把多加的 50 减回去" },
        ],
        steps: [
          {
            step: 1,
            tag: "比出多加了多少",
            title: "第 1 步：十位上的 3 变成 8，多加了 50",
            narration: `十位上的 3 代表 30，看成 8 就变成了 80！也就是在加法里多加了 80 - 30 = 50！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "本来是", value: "30" },
              { label: "看成了", value: "80（多加50）", tone: "coral" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "原来的十位：3（代表 30）", badge: "正确" },
                { label: "看错的十位：8（代表 80）", badge: "多加 50", active: true },
              ],
              annotation: "多加了 80 - 30 = 50，所以结果也跟着大了 50！",
            },
          },
          {
            step: 2,
            tag: "减回多加的数",
            title: "第 2 步：把多加的 50 减回去 → 94 - 50 = 44",
            narration: `结果多算了 50，只要把 94 减去 50，就还原出正确的得数 44 啦！`,
            activeFormulaIndices: [1],
            liveStats: [
              { label: "正确得数", value: "44", tone: "teal" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "错误结果：94", badge: "大了 50" },
                { label: "正确结果：94 - 50 = 44", badge: "答案 44", active: true },
              ],
              annotation: "多加就减去，少加就补上！正确结果是 44！",
            },
          },
        ],
      }),
    },
  ],
};
