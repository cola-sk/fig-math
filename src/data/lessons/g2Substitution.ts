import type { MathLesson } from "../../types/lesson";

export const g2SubstitutionLesson: MathLesson = {
  id: "g2-substitution",
  chapterId: "g2-substitution-thinking",
  chapterTitle: "07. 代换思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.72",
  title: "等量代换（图形代表几？）",
  summary: "把相等的两个东西互相“替身交换”，把两种图形变成只剩一种图形，一下子就能算出它是几！",
  engine: "balance-puzzle",
  keywords: ["二年级", "等量代换", "图形算式", "代换思维"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "07. 代换思维训练",
      weekLabel: "p.72",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "△ 和 ○ 各是几",
      bookPart: "A版",
      tier: "base",
      title: "已知 △ = ○ + ○ + ○，且 △ + ○ = 20，求 △ 和 ○",
      subtitle: "把算式里的 1 个 △ 换成 3 个 ○，就只剩下 ○ 啦！",
      defaultParams: {
        total: 20,
      },
      paramDefs: [
        { key: "total", label: "△ + ○ 的和", min: 8, max: 40, step: 4, unit: "" },
      ],
      build: (params) => {
        const total = params.total ?? 20;
        const circle = Math.floor(total / 4);
        const tri = circle * 3;
        return {
          problemStatement: `已知 1 个 △ 等于 3 个 ○ 相加（△ = ○ + ○ + ○），并且 △ + ○ = ${total}。请问 △ 和 ○ 分别代表几？`,
          formulas: [
            { id: "sub-1", latex: `\\triangle = \\bigcirc + \\bigcirc + \\bigcirc`, comment: "1 个 △ 可以换成 3 个 ○" },
            { id: "sub-2", latex: `\\bigcirc + \\bigcirc + \\bigcirc + \\bigcirc = ${total}`, comment: `4 个 ○ 合起来是 ${total}` },
            { id: "sub-3", latex: `\\bigcirc = ${total} \\div 4 = ${circle}, \\quad \\triangle = ${circle} \\times 3 = ${tri}`, comment: "先算 ○，再算 △" },
          ],
          steps: [
            {
              step: 1,
              tag: "看清替身关系",
              title: "第 1 步：1 个 △ 可以变成 3 个 ○",
              narration: `题目给了我们两行等式。第一行告诉我们：△ 的“替身”就是 3 个 ○！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "替身规则", value: "△ = 3 个 ○", tone: "coral" },
              ],
              sceneState: {
                kind: "balance-puzzle",
                mode: "swap",
                swapRows: [
                  { left: "△", right: "○ + ○ + ○", highlight: true },
                  { left: "△ + ○", right: `${total}` },
                ],
                annotation: "把第 2 行里的 △ 换成 3 个 ○ 试试看！",
              },
            },
            {
              step: 2,
              tag: "代换求解",
              title: `第 2 步：4 个 ○ = ${total} → ○ = ${circle}，△ = ${tri}`,
              narration: `把 △ 换成 3 个 ○ 后，第 2 行变成了 4 个 ○ 相加等于 ${total}！所以 1 个 ○ = ${total} ÷ 4 = ${circle}，△ = ${circle} × 3 = ${tri}！`,
              tipTitle: "等量代换口诀",
              tipBody: "两种图形在一起不好算，就用相等的“替身”换掉其中一个，变成同一种图形！",
              activeFormulaIndices: [1, 2],
              liveStats: [
                { label: "○ 等于", value: `${circle}`, tone: "teal" },
                { label: "△ 等于", value: `${tri}`, tone: "coral" },
              ],
              sceneState: {
                kind: "balance-puzzle",
                mode: "swap",
                swapRows: [
                  { left: "○ + ○ + ○ + ○", right: `${total}`, highlight: true },
                  { left: "○", right: `${circle}` },
                  { left: "△", right: `${tri}`, highlight: true },
                ],
                annotation: `代换成功！○ = ${circle}，△ = ${tri}（检验：${tri} + ${circle} = ${total}）`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "整体打包消去",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：□ + □ + ☆ = 17，□ + ☆ = 11，求 □ 和 ☆",
      subtitle: "把“□ + ☆ = 11”当成一个整体打包，直接塞进第一个算式！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `已知 □ + □ + ☆ = 17，而 □ + ☆ = 11。请问 □ 和 ☆ 分别是几？`,
        formulas: [
          { id: "sub-4", latex: `\\square + (\\square + \\star) = 17`, comment: "把 □ + ☆ 打包成 11" },
          { id: "sub-5", latex: `\\square = 17 - 11 = 6, \\quad \\star = 11 - 6 = 5`, comment: "一步算出 □ = 6，☆ = 5" },
        ],
        steps: [
          {
            step: 1,
            tag: "打包整体",
            title: "第 1 步：把“□ + ☆”打包换成 11",
            narration: `观察两个算式，第 1 个算式里正好藏着一个“□ + ☆”！我们直接把这组打包换成 11！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "整体打包", value: "□ + ☆ = 11", tone: "teal" },
            ],
            sceneState: {
              kind: "balance-puzzle",
              mode: "swap",
              swapRows: [
                { left: "□ + (□ + ☆)", right: "17", highlight: true },
                { left: "□ + ☆", right: "11" },
              ],
              annotation: "把括号里的 (□ + ☆) 直接换成 11！",
            },
          },
          {
            step: 2,
            tag: "算出结果",
            title: "第 2 步：□ + 11 = 17 → □ = 6，☆ = 5",
            narration: `□ + 11 = 17，所以 □ = 17 - 11 = 6！再代回 □ + ☆ = 11，☆ = 11 - 6 = 5！`,
            activeFormulaIndices: [1],
            liveStats: [
              { label: "□ 等于", value: "6", tone: "coral" },
              { label: "☆ 等于", value: "5", tone: "teal" },
            ],
            sceneState: {
              kind: "balance-puzzle",
              mode: "swap",
              swapRows: [
                { left: "□ + 11", right: "17", highlight: true },
                { left: "□", right: "6" },
                { left: "☆", right: "5", highlight: true },
              ],
              annotation: "整体代换超级快！□ = 6，☆ = 5！",
            },
          },
        ],
      }),
    },
  ],
};
