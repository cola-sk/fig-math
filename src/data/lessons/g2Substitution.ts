import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";
export const g2SubstitutionLesson: MathLesson = {
  id: "g2-substitution",
  chapterId: "g2-substitution-thinking",
  chapterTitle: "07. 代换思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.72",
  title: "等量代换（图形代表几？）",
  summary:
    "把相等的两个东西互相“替身交换”，把两种图形变成只剩一种图形，一下子就能算出它是几！",
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
      modeLabel: "基础例题 · △ 和 ○ 各是几",
      bookPart: "A版",
      tier: "base",
      title: "已知 △ = ○ + ○ + ○，且 △ + ○ = 20，求 △ 和 ○",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {
        total: 20,
      },
      paramDefs: [
        {
          key: "total",
          label: "△ + ○ 的和",
          min: 8,
          max: 40,
          step: 4,
          unit: "",
        },
      ],
      build: (params) => {
        const total = params.total ?? 20;
        const circle = Math.floor(total / 4);
        const tri = circle * 3;
        return {
          problemStatement: `已知 1 个 △ 等于 3 个 ○ 相加（△ = ○ + ○ + ○），并且 △ + ○ = ${total}。请问 △ 和 ○ 分别代表几？`,
          formulas: [
            {
              id: "sub-1",
              latex: `\\triangle = \\bigcirc + \\bigcirc + \\bigcirc`,
              comment: "1 个 △ 可以换成 3 个 ○",
            },
            {
              id: "sub-2",
              latex: `\\bigcirc + \\bigcirc + \\bigcirc + \\bigcirc = ${total}`,
              comment: `4 个 ○ 合起来是 ${total}`,
            },
            {
              id: "sub-3",
              latex: `\\bigcirc = ${total} \\div 4 = ${circle}, \\quad \\triangle = ${circle} \\times 3 = ${tri}`,
              comment: "先算 ○，再算 △",
            },
          ],
          steps: teachingSteps([
            {
              title: `两种图形一起出现，可以怎样换？`,
              narration: `题目说 1 个三角形和 3 个圆相等。在三角形加圆的那一行，能用什么代替三角形？`,
              sceneState: {
                kind: "balance-puzzle",
                mode: "swap",
                swapRows: [
                  { left: `△`, right: `○ + ○ + ○`, highlight: true },
                  { left: `△ + ○`, right: `${total}`, highlight: true },
                ],
                annotation: `先找能互换的一对`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `换掉三角形后，一共有几个圆？`,
              narration: `每个三角形都换成 3 个圆，原来旁边还有 1 个圆。请把它们合起来数一数。`,
              sceneState: {
                kind: "balance-puzzle",
                mode: "swap",
                swapRows: [
                  { left: `△`, right: `○ + ○ + ○`, highlight: true },
                  {
                    left: `(○ + ○ + ○) + ○`,
                    right: `${total}`,
                    highlight: true,
                  },
                ],
                annotation: `圆的总个数：?`,
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `替换后一共有几个圆？`,
                4,
                ` 个`,
                `换来的圆和原有的圆都要数。`,
              ),
            },
            {
              title: `这些圆一样大，每个圆是几？`,
              narration: `4 个圆合起来是 ${total}。每个圆代表相同的数，平均分一分，一个圆是多少？`,
              sceneState: {
                kind: "balance-puzzle",
                mode: "swap",
                swapRows: [
                  { left: `○ + ○ + ○ + ○`, right: `${total}`, highlight: true },
                  { left: `○`, right: `?`, highlight: true },
                ],
                annotation: `先求一个圆`,
              },
              activeFormulaIndices: [0, 1],
              checkpoint: numberCheckpoint(
                `圆代表几？`,
                circle,
                ``,
                `把总数平均分给 4 个圆。`,
              ),
            },
            {
              title: `圆已经求出，三角形是多少？`,
              narration: `圆代表 ${circle}。1 个三角形等于 3 个这样的圆，三角形是多少？算完再检查两个图形的和。`,
              sceneState: {
                kind: "balance-puzzle",
                mode: "swap",
                swapRows: [
                  { left: `○`, right: `${circle}`, highlight: true },
                  {
                    left: `△`,
                    right: `${circle} + ${circle} + ${circle} = ?`,
                    highlight: true,
                  },
                ],
                annotation: `三角形的数还没揭晓`,
              },
              activeFormulaIndices: [0, 1],
              checkpoint: numberCheckpoint(
                `三角形代表几？`,
                tri,
                ``,
                `三个相同的圆合起来。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `4 个 ○ = ${total} → ○ = ${circle}，△ = ${tri}`,
              narration: `把 △ 换成 3 个 ○ 后，第 2 行变成了 4 个 ○ 相加等于 ${total}！所以 1 个 ○ = ${total} ÷ 4 = ${circle}，△ = ${circle} × 3 = ${tri}！`,
              tipTitle: "等量代换口诀",
              tipBody:
                "两种图形在一起不好算，就用相等的“替身”换掉其中一个，变成同一种图形！",
              activeFormulaIndices: [0, 1, 2],
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
          ]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 整体打包消去",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：□ + □ + ☆ = 17，□ + ☆ = 11，求 □ 和 ☆",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `已知 □ + □ + ☆ = 17，而 □ + ☆ = 11。请问 □ 和 ☆ 分别是几？`,
        formulas: [
          {
            id: "sub-4",
            latex: `\\square + (\\square + \\star) = 17`,
            comment: "把 □ + ☆ 打包成 11",
          },
          {
            id: "sub-5",
            latex: `\\square = 17 - 11 = 6, \\quad \\star = 11 - 6 = 5`,
            comment: "一步算出 □ = 6，☆ = 5",
          },
        ],
        steps: teachingSteps([
          {
            title: `两行算式里，哪一组完全相同？`,
            narration: `看一看：第一行有两个方框和一颗星，第二行有一个方框和一颗星。能圈出相同的一组吗？`,
            sceneState: {
              kind: "balance-puzzle",
              mode: "swap",
              swapRows: [
                { left: `□ + □ + ☆`, right: `17`, highlight: true },
                { left: `□ + ☆`, right: `11`, highlight: true },
              ],
              annotation: `先圈共同的一组`,
            },
            activeFormulaIndices: [],
          },
          {
            title: `把共同的一组打包，能换成哪个数？`,
            narration: `第一行里的一组“方框加星”与第二行完全相同。把这组用一个数代替，第一行会变成什么？`,
            sceneState: {
              kind: "balance-puzzle",
              mode: "swap",
              swapRows: [
                { left: `□ + (□ + ☆)`, right: `17`, highlight: true },
                { left: `(□ + ☆)`, right: `11`, highlight: true },
              ],
              annotation: `括号里这一组可以整体替换`,
            },
            activeFormulaIndices: [],
          },
          {
            title: `方框加上一包等于 17，方框是几？`,
            narration: `打包后，第一行变成“方框 + 11 = 17”。去掉这一包，就能知道单独的方框是多少。`,
            sceneState: {
              kind: "balance-puzzle",
              mode: "swap",
              swapRows: [
                { left: `□ + 11`, right: `17`, highlight: true },
                { left: `□`, right: `?`, highlight: true },
              ],
              annotation: `去掉同样的一包`,
            },
            activeFormulaIndices: [0],
            checkpoint: numberCheckpoint(
              `方框代表几？`,
              6,
              ``,
              `17 里面去掉 11。`,
            ),
          },
          {
            title: `把方框放回第二行，星星是几？`,
            narration: `方框是 6。第二行“方框 + 星 = 11”，填回方框以后，星星是多少？`,
            sceneState: {
              kind: "balance-puzzle",
              mode: "swap",
              swapRows: [
                { left: `□`, right: `6`, highlight: true },
                { left: `6 + ☆`, right: `11`, highlight: true },
              ],
              annotation: `星星还要继续求`,
            },
            activeFormulaIndices: [0],
            checkpoint: numberCheckpoint(
              `星星代表几？`,
              5,
              ``,
              `两个数合起来是 11，已经知道其中一个。`,
            ),
          },
          {
            tag: `验证与回顾`,
            title: "□ + 11 = 17 → □ = 6，☆ = 5",
            narration: `方框是 6，星星是 5。验算两行：6 + 6 + 5 = 17，6 + 5 = 11，都符合条件。`,
            activeFormulaIndices: [0, 1],
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
            tipBody: `共同一组先打包，求出一个再找另一个。`,
          },
        ]),
      }),
    },
  ],
};
