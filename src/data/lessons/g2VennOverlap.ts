import type { MathLesson } from "../../types/lesson";

export const g2VennOverlapLesson: MathLesson = {
  id: "g2-venn-overlap",
  chapterId: "g2-set-thinking",
  chapterTitle: "集合思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "第 21 页",
  title: "重叠问题（足球与篮球韦恩图）",
  summary: "一个班喜欢足球的、喜欢篮球的、两样都喜欢的和都不喜欢的怎么算？画两个交叠的圈一秒看透！",
  engine: "venn-set",
  keywords: ["二年级", "重叠问题", "集合思维", "韦恩图", "足球", "篮球", "容斥"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "03. 集合思维训练",
      weekLabel: "p.21",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "足球篮球例题",
      bookPart: "A版",
      tier: "base",
      title: "全班 40 人，求两样都不喜欢的人数",
      subtitle: "先把两圈加起来，减掉中间算重了的“都喜欢”，再从全班减掉",
      defaultParams: { football: 25, basketball: 20, both: 7, neither: 2 },
      paramDefs: [
        { key: "football", label: "喜欢足球人数", min: 15, max: 28, step: 1, unit: "人" },
        { key: "basketball", label: "喜欢篮球人数", min: 12, max: 25, step: 1, unit: "人" },
        { key: "both", label: "两样都喜欢", min: 3, max: 10, step: 1, unit: "人" },
        { key: "neither", label: "都不喜欢", min: 1, max: 8, step: 1, unit: "人" },
      ],
      build: (params) => {
        const football = params.football ?? 25;
        const basketball = params.basketball ?? 20;
        const both = Math.min(football - 2, basketball - 2, params.both ?? 7);
        const neither = params.neither ?? 2;
        const union = football + basketball - both;
        const total = union + neither;
        const onlyFoot = football - both;
        const onlyBasket = basketball - both;

        return {
          problemStatement: `二（1）班共有 ${total} 名同学。统计发现：喜欢踢足球的有 ${football} 人，喜欢打篮球的有 ${basketball} 人，两样都喜欢的有 ${both} 人。问：两样都不喜欢的有多少人？`,
          formulas: [
            { id: "vo-1", latex: `${football} + ${basketball} - ${both} = ${union}\\text{ (人)}`, comment: "至少喜欢一项的人数（减掉重复的）" },
            { id: "vo-2", latex: `${total} - ${union} = ${neither}\\text{ (人)}`, comment: "全班总数 - 至少喜欢一项 = 都不喜欢" },
          ],
          steps: [
            {
              step: 1,
              tag: "画韦恩图",
              title: "把两个圆圈叠在一起，中间就是“都喜欢”",
              narration: `左边橙圈是喜欢足球的 ${football} 人，右边青圈是喜欢篮球的 ${basketball} 人。他们中间叠在一起的 ${both} 人，既在足球圈里，又在篮球圈里！`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "全班总人数", value: `${total} 人` },
                { label: "喜欢足球", value: `${football} 人`, tone: "coral" },
                { label: "喜欢篮球", value: `${basketball} 人`, tone: "teal" },
                { label: "两样都喜欢", value: `${both} 人` },
              ],
              sceneState: {
                kind: "venn-set",
                totalLabel: "二（1）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "overlap",
                annotation: `中间重叠的 ${both} 人，被两个圆圈各数了 1 次！`,
              },
            },
            {
              step: 2,
              tag: "去重算并集",
              title: `${football} + ${basketball} - ${both} = ${union} 人`,
              narration: `如果直接把 ${football} + ${basketball}，中间那 ${both} 人就被算了 2 次！所以必须减去 1 次 ${both}，得到至少喜欢一项的共有 ${union} 人（只喜欢足球 ${onlyFoot} + 都喜欢 ${both} + 只喜欢篮球 ${onlyBasket} = ${union} 人）。`,
              tipTitle: "重叠问题金句",
              tipBody: "两圆相加，减去重叠！（重叠部分算了两次，减一次才刚好！）",
              activeFormulaIndices: [0],
              liveStats: [
                { label: "只喜欢足球", value: `${onlyFoot} 人`, tone: "coral" },
                { label: "只喜欢篮球", value: `${onlyBasket} 人`, tone: "teal" },
                { label: "至少喜欢一项", value: `${union} 人`, tone: "blue" },
                { label: "都不喜欢", value: "?" },
              ],
              checkpoint: {
                question: `为什么算“至少喜欢一项”时要减去 ${both}？`,
                options: [
                  `因为这 ${both} 人不喜欢运动`,
                  `因为这 ${both} 人在足球和篮球里被重复算了 2 次`,
                ],
                correctIndex: 1,
                feedbackCorrect: "太棒了！重复数了 2 次，减掉 1 次就正好每个人都只数 1 遍！",
                feedbackWrong: "看看中间交叠的小牌子：那几个人两边都算了，所以要减掉 1 次哦。",
              },
              sceneState: {
                kind: "venn-set",
                totalLabel: "二（1）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "disjoint",
                annotation: `只左 ${onlyFoot} + 重叠 ${both} + 只右 ${onlyBasket} = ${union} 人`,
              },
            },
            {
              step: 3,
              tag: "圈外求差",
              title: `圈外还有 ${total} - ${union} = ${neither} 人都不喜欢`,
              narration: `全班大方框里一共有 ${total} 人，两个圆圈一共占了 ${union} 人，剩下的 ${total} - ${union} = ${neither} 人就在圆圈外面——他们两样都不喜欢！`,
              activeFormulaIndices: [1],
              liveStats: [
                { label: "全班总人数", value: `${total} 人` },
                { label: "圆圈里(喜欢)", value: `${union} 人` },
                { label: "圈外(都不喜欢)", value: `${neither} 人`, tone: "blue" },
                { label: "验算总数", value: `${union}+${neither}=${total}`, tone: "teal" },
              ],
              sceneState: {
                kind: "venn-set",
                totalLabel: "二（1）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "neither",
                annotation: `答案：两样都不喜欢的有 ${neither} 人！`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "反求都喜欢",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：反过来求“两样都喜欢”有多少人？",
      subtitle: "已知全班人数和都不喜欢的人数，倒推中间重叠有多大！",
      defaultParams: { football: 24, basketball: 18, both: 8, neither: 4 },
      paramDefs: [
        { key: "football", label: "喜欢足球人数", min: 14, max: 26, step: 1, unit: "人" },
        { key: "basketball", label: "喜欢篮球人数", min: 12, max: 24, step: 1, unit: "人" },
        { key: "both", label: "实际重叠(生成总数)", min: 3, max: 10, step: 1, unit: "人" },
        { key: "neither", label: "都不喜欢", min: 2, max: 8, step: 1, unit: "人" },
      ],
      build: (params) => {
        const football = params.football ?? 24;
        const basketball = params.basketball ?? 18;
        const both = Math.min(football - 2, basketball - 2, params.both ?? 8);
        const neither = params.neither ?? 4;
        const union = football + basketball - both;
        const total = union + neither;

        return {
          problemStatement: `二（2）班有 ${total} 人，其中喜欢足球的有 ${football} 人，喜欢篮球的有 ${basketball} 人，两样都不喜欢的有 ${neither} 人。问：两样都喜欢的有多少人？`,
          formulas: [
            { id: "vov-1", latex: `${total} - ${neither} = ${union}\\text{ (人)}`, comment: "先去掉圈外都不喜欢的，得到圆圈总人数" },
            { id: "vov-2", latex: `${football} + ${basketball} - ${union} = ${both}\\text{ (人)}`, comment: "两圆相加多出来的，就是重叠部分！" },
          ],
          steps: [
            {
              step: 1,
              tag: "B版倒推",
              title: `先把圈外 ${neither} 人请出去，剩下 ${union} 人在圈里`,
              narration: `全班 ${total} 人减去圈外都不喜欢的 ${neither} 人，圆圈里实际只有 ${union} 人。可是 ${football} + ${basketball} = ${football + basketball} 人，多出来的 ${football + basketball} - ${union} = ${both} 人就是中间重叠的“都喜欢”！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "圈内实际人数", value: `${union} 人` },
                { label: "足球+篮球相加", value: `${football + basketball} 人` },
                { label: "多出(都喜欢)", value: `${both} 人`, tone: "coral" },
                { label: "都不喜欢", value: `${neither} 人` },
              ],
              sceneState: {
                kind: "venn-set",
                totalLabel: "二（2）班全班",
                totalCount: total,
                leftLabel: "喜欢足球",
                leftTotal: football,
                rightLabel: "喜欢篮球",
                rightTotal: basketball,
                overlapCount: both,
                neitherCount: neither,
                highlightZone: "overlap",
                annotation: `多出来的 ${football + basketball} - ${union} = ${both} 人，就是中间重叠部分！`,
              },
            },
          ],
        };
      },
    },
  ],
};
