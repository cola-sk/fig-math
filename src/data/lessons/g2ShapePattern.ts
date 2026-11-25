import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";
export const g2ShapePatternLesson: MathLesson = {
  id: "g2-shape-pattern",
  chapterId: "g2-reasoning-thinking",
  chapterTitle: "09. 推理思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.102",
  title: "图形推理（旋转、颜色与周期规律）",
  summary:
    "小图形也在排队做操！观察它们的形状、颜色、数量或者旋转方向，找出“一组有几个”，剩下的马上猜出来！",
  engine: "combo-visual",
  keywords: ["二年级", "图形推理", "周期规律", "找规律", "推理思维"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "09. 推理思维训练",
      weekLabel: "p.102",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 周期排队找第几个",
      bookPart: "A版",
      tier: "base",
      title: "△ ○ □ △ ○ □ …… 第 14 个是什么图形？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {
        nth: 14,
      },
      paramDefs: [
        {
          key: "nth",
          label: "求第几个图形",
          min: 7,
          max: 25,
          step: 1,
          unit: "个",
        },
      ],
      build: (params) => {
        const nth = params.nth ?? 14;
        const groupSize = 3;
        const groups = Math.floor(nth / groupSize);
        const rem = nth % groupSize;
        const shapes = ["△", "○", "□"];
        const ans = rem === 0 ? shapes[2] : shapes[rem - 1];
        return {
          problemStatement: `一串图形按“△、○、□、△、○、□……”的顺序一直排下去。请问第 ${nth} 个是什么图形？`,
          formulas: [
            {
              id: "sp-1",
              latex: `\\text{每组 3 个：}\\triangle,\\; \\bigcirc,\\; \\square`,
              comment: "每 3 个图形重复一次",
            },
            {
              id: "sp-2",
              latex: `${nth} \\div 3 = ${groups}\\text{ (组)}\\cdots\\cdots ${rem}\\text{ (个)}`,
              comment:
                rem === 0
                  ? "没有余数，看每组最后一个"
                  : `余数是 ${rem}，看每组第 ${rem} 个`,
            },
          ],
          steps: teachingSteps([
            {
              title: `这一串里，哪一小组一直在重复？`,
              narration: `观察三角、圆、方，再往后看，顺序发生变化了吗？请用手圈出你认为重复的一组。`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `△`, tone: "coral" },
                  { id: `c1`, text: `○`, tone: "teal" },
                  { id: `c2`, text: `□`, tone: "teal" },
                  { id: `c3`, text: `△`, tone: "teal" },
                  { id: `c4`, text: `○`, tone: "teal" },
                  { id: `c5`, text: `□`, tone: "teal" },
                ],
                rows: [],
                annotation: `先找重复的一组`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `找到一组后，先把它数清楚`,
              narration: `每次都按三角、圆、方的顺序出现。一组有几个图形？第 ${nth} 个要跨过多少完整的组？`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `△ ○ □`, tone: "coral" },
                  { id: `c1`, text: `△ ○ □`, tone: "teal" },
                ],
                rows: [{ label: `每组几个`, badge: `?`, active: true }],
                annotation: ``,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `每组有几个图形？`,
                3,
                ` 个`,
                `重复的一组必须包括完整的三种图形。`,
              ),
            },
            {
              title: `数完完整组，再看剩下的位置`,
              narration: `每组有 3 个，${nth} 个能分成 ${groups} 个完整组，还剩 ${rem} 个。${rem === 0 ? "刚好数完一组，最后停在每组的哪个图形？" : "接着在新的一组数，停在第几个图形？"}`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `1：△`, tone: "coral" },
                  { id: `c1`, text: `2：○`, tone: "teal" },
                  { id: `c2`, text: `3：□`, tone: "teal" },
                ],
                rows: [
                  { label: `完整组`, badge: `${groups} 组`, active: true },
                  { label: `剩下`, badge: `${rem} 个`, active: true },
                  { label: `第 ${nth} 个`, badge: `?`, active: true },
                ],
                annotation: ``,
              },
              activeFormulaIndices: [0],
              checkpoint: {
                question: `第 ${nth} 个图形是什么？`,
                options: ["△", "○", "□"],
                correctIndex: shapes.indexOf(ans),
                feedbackCorrect: `对了！余数告诉我们停在一组的哪里。`,
                feedbackWrong: `余数是 0 时，停在刚数完的那一组最后。`,
              },
            },
            {
              tag: `验证与回顾`,
              title: `${nth} ÷ 3 = ${groups} 组……余 ${rem} → 答案是 ${ans}`,
              narration:
                rem === 0
                  ? `${nth} ÷ 3 = ${groups} 组，刚好没有余数！说明第 ${nth} 个就是第 ${groups} 组的最后一个，也就是“${ans}”！`
                  : `${nth} ÷ 3 = ${groups} 组还余 ${rem} 个！余数是 ${rem}，就从新的一组数第 ${rem} 个，答案就是“${ans}”！`,
              tipTitle: "周期规律口诀",
              tipBody:
                "余几就看每组第几个；没有余数（整除），就看每组最后一个！",
              activeFormulaIndices: [0, 1],
              liveStats: [
                {
                  label: "分组算式",
                  value: `${nth} ÷ 3 = ${groups} 余 ${rem}`,
                },
                { label: `第 ${nth} 个图形`, value: ans, tone: "teal" },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                rows: [
                  {
                    label: `一共分成 ${groups} 整组（共 ${groups * 3} 个）`,
                    badge: "已排完",
                  },
                  {
                    label:
                      rem === 0
                        ? "余数为 0 → 看每组最后一个"
                        : `余数为 ${rem} → 看每组第 ${rem} 个`,
                    badge: `答案：${ans}`,
                    active: true,
                  },
                ],
                annotation: `第 ${nth} 个图形是 ${ans}！`,
              },
            },
          ]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 旋转与位置变化",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：正方形小黑点顺时针转圈，第 4 格在哪？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `一个正方形分成四个角（左上、右上、右下、左下）。第 1 幅图小黑点在左上角，第 2 幅图在右上角，第 3 幅图在右下角。请问第 4 幅图小黑点在哪个角？`,
        formulas: [
          {
            id: "sp-3",
            latex: `\\text{左上} \\to \\text{右上} \\to \\text{右下} \\to \\text{左下}`,
            comment: "每次顺时针移动一个角",
          },
        ],
        steps: teachingSteps([
          {
            title: `黑点的位置在变，哪一点没有变？`,
            narration: `先看前三幅小图：黑点依次在左上、右上、右下。它每次都沿正方形的边走，下一次会怎样走？`,
            sceneState: {
              kind: "combo-visual",
              mode: "pattern",
              patternCorners: [0, 1, 2, null],
              annotation: `按第 1、2、3、4 幅的顺序看小黑点`,
            },
            activeFormulaIndices: [],
          },
          {
            title: `从前两步，能找出怎样的移动方向？`,
            narration: `手指先从左上走到右上，再走到右下。是沿同一个方向转，还是来回退？`,
            sceneState: {
              kind: "combo-visual",
              mode: "pattern",
              patternCorners: [0, 1, 2, null],
              annotation: `按第 1、2、3、4 幅的顺序看小黑点`,
              patternActiveIndex: 1,
            },
            activeFormulaIndices: [],
            checkpoint: {
              question: `前三幅按哪个方向移动？`,
              options: ["顺时针", "逆时针"],
              correctIndex: 0,
              feedbackCorrect: `对，方向和钟表指针相同。`,
              feedbackWrong: `先沿上边向右，再沿右边向下。`,
            },
          },
          {
            title: `沿同一方向再走一步，会在哪个角？`,
            narration: `前三幅都是顺时针，每次走到下一个角。现在从右下出发，再走一步。先说出位置，再看下一步。`,
            sceneState: {
              kind: "combo-visual",
              mode: "pattern",
              patternCorners: [0, 1, 2, null],
              annotation: `按第 1、2、3、4 幅的顺序看小黑点`,
              patternActiveIndex: 2,
            },
            activeFormulaIndices: [],
            checkpoint: {
              question: `第 4 幅黑点在哪个角？`,
              options: ["左上", "右上", "左下"],
              correctIndex: 2,
              feedbackCorrect: `对，从右下继续顺时针来到左下。`,
              feedbackWrong: `在纸上画一个正方形，沿刚才的方向接着走。`,
            },
          },
          {
            tag: `验证与回顾`,
            title: "从右下角继续顺时针 → 左下角！",
            narration: `从右下角再顺时针走一步，小黑点就来到“左下角”啦！如果还有第 5 幅图，它又会回到左上角！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "第 4 幅位置", value: "左下角", tone: "teal" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "pattern",
              patternCorners: [0, 1, 2, 3],
              annotation: `按第 1、2、3、4 幅的顺序看小黑点`,
              patternActiveIndex: 3,
            },
            tipBody: `先看方向和步长，再走一步来检验。`,
          },
        ]),
      }),
    },
  ],
};
