import type { MathLesson } from "../../types/lesson";

export const g2MatchstickLesson: MathLesson = {
  id: "g2-matchstick",
  chapterId: "g2-divergent-thinking",
  chapterTitle: "10. 发散思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.111",
  title: "火柴谜（移动 1 根让等式成立）",
  summary: "算式错了别急着擦！看看能不能把一个数字身上的火柴“借走 1 根”，或者把“+”和“-”变个身，让两边相等！",
  engine: "balance-puzzle",
  keywords: ["二年级", "火柴谜", "火柴棒", "等式成立", "发散思维"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "10. 发散思维训练",
      weekLabel: "p.111",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "数字变身术",
      bookPart: "A版",
      tier: "base",
      title: "移动 1 根火柴，让“6 + 4 = 4”成立！",
      subtitle: "把“+”号上的一根竖火柴拿走，或者把“6”变成“0”或“8”试试看！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `用火柴棒摆出了一个错误的算式：6 + 4 = 4。请你只移动 1 根火柴棒，让这个等式成立！`,
        formulas: [
          { id: "ms-1", latex: `6 + 4 = 10 \\neq 4`, comment: "左边太大了（多了 6），需要变小" },
          { id: "ms-2", latex: `8 - 4 = 4`, comment: "把 + 的竖棒移到 6 上变成 8！" },
        ],
        steps: [
          {
            step: 1,
            tag: "观察大小差异",
            title: "第 1 步：左边 6 + 4 = 10，右边只有 4，左边太大啦！",
            narration: `做火柴谜要先比较左右两边大小！左边是 10，右边是 4，差了好多。想办法把加号“+”变成减号“-”，这样多出来的 1 根还能送给“6”！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "移动前左边", value: "6 + 4 = 10" },
              { label: "移动前右边", value: "4", tone: "coral" },
            ],
            sceneState: {
              kind: "balance-puzzle",
              mode: "matchstick",
              matchBefore: "6 + 4 = 4",
              matchMoveNote: "把“+”的竖棒拿下来，放到“6”的右上角！",
              annotation: "思路：加法变减法可以让左边立刻变小！",
            },
          },
          {
            step: 2,
            tag: "成功变身",
            title: "第 2 步：6 变成 8，+ 变成 - → 8 - 4 = 4！",
            narration: `把“+”号上那根竖着的火柴搬走，贴到“6”的右上角缺口上，“6”瞬间变成了“8”，而“+”变成了“-”！于是算式变成 8 - 4 = 4，完全成立！（其实把 6 变成 0，0 + 4 = 4 也对哦！）`,
            tipTitle: "火柴棒常用变身",
            tipBody: "拿走 1 根：8→6/9/0、9→3/5、6→5、+→-；加上 1 根：5→6/9、3→9、0→8、-→+！",
            activeFormulaIndices: [0, 1],
            liveStats: [
              { label: "只移动", value: "1 根火柴" },
              { label: "新算式", value: "8 - 4 = 4", tone: "teal" },
            ],
            sceneState: {
              kind: "balance-puzzle",
              mode: "matchstick",
              matchBefore: "6 + 4 = 4",
              matchMoveNote: "移动 1 根火柴：+ 变 - ，6 变 8",
              matchAfter: "8 - 4 = 4",
              annotation: "太棒了！8 - 4 = 4 成立！（提示：0 + 4 = 4 也是对的哦）",
            },
          },
        ],
      }),
    },
    {
      id: "var-1",
      modeLabel: "数字内部借 1 根",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：移动 1 根火柴，让“7 - 3 = 8”成立！",
      subtitle: "右边是 8 太大了，把 8 身上借走 1 根变成 6 或 9，送到 7 或 3 上！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `请移动 1 根火柴棒，让错误算式“7 - 3 = 8”变成正确的算式！（提示：可以把“减”变成“加”哦）`,
        formulas: [
          { id: "ms-3", latex: `8 \\xrightarrow{\\text{借走 1 根}} 6 \\text{ 或 } 9 \\text{ 或 } 0`, comment: "把右边的 8 变小" },
          { id: "ms-4", latex: `7 + 3 = 10\\text{? 不对，} 7 - 3 = 4\\text{? 试试 } 9 - 3 = 6!`, comment: "7 借 1 根给 8? 反过来：8 借 1 根给 7 变 9，8 变 6！" },
        ],
        steps: [
          {
            step: 1,
            tag: "找大数借火柴",
            title: "第 1 步：把“8”借走 1 根变成“6”，送给“7”？",
            narration: `7 - 3 本来等于 4，怎么会等于 8 呢？如果我们从 8 身上拿走 1 根，8 可以变成 6 或 9。如果 8 变成 6，只需要左边等于 6！把这 1 根送给 7，7 就变成 9 了：9 - 3 = 6！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "移动前", value: "7 - 3 = 8" },
              { label: "谁借谁", value: "8 借 1 根给 7", tone: "coral" },
            ],
            sceneState: {
              kind: "balance-puzzle",
              mode: "matchstick",
              matchBefore: "7 - 3 = 8",
              matchMoveNote: "从“8”右上角拿走 1 根，放到“7”左上角！",
              annotation: "8 少 1 根变 6，7 多 1 根变 9！",
            },
          },
          {
            step: 2,
            tag: "检验新算式",
            title: "第 2 步：9 - 3 = 6，等式完美成立！",
            narration: `9 - 3 = 6！只移动了 1 根火柴，左右两边一下子相等啦！`,
            activeFormulaIndices: [1],
            liveStats: [
              { label: "新算式", value: "9 - 3 = 6", tone: "teal" },
            ],
            sceneState: {
              kind: "balance-puzzle",
              mode: "matchstick",
              matchBefore: "7 - 3 = 8",
              matchMoveNote: "8 变 6，7 变 9",
              matchAfter: "9 - 3 = 6",
              annotation: "9 - 3 = 6 成立！火柴谜是不是很有趣？",
            },
          },
        ],
      }),
    },
  ],
};
