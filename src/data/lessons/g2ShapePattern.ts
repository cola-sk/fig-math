import type { MathLesson } from "../../types/lesson";

export const g2ShapePatternLesson: MathLesson = {
  id: "g2-shape-pattern",
  chapterId: "g2-reasoning-thinking",
  chapterTitle: "09. 推理思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.102",
  title: "图形推理（旋转、颜色与周期规律）",
  summary: "小图形也在排队做操！观察它们的形状、颜色、数量或者旋转方向，找出“一组有几个”，剩下的马上猜出来！",
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
      modeLabel: "周期排队找第几个",
      bookPart: "A版",
      tier: "base",
      title: "△ ○ □ △ ○ □ …… 第 14 个是什么图形？",
      subtitle: "先圈出重复的一组（3 个一组），用除法看余数是几！",
      defaultParams: {
        nth: 14,
      },
      paramDefs: [
        { key: "nth", label: "求第几个图形", min: 7, max: 25, step: 1, unit: "个" },
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
            { id: "sp-1", latex: `\\text{每组 3 个：}\\triangle,\\; \\bigcirc,\\; \\square`, comment: "每 3 个图形重复一次" },
            { id: "sp-2", latex: `${nth} \\div 3 = ${groups}\\text{ (组)}\\cdots\\cdots ${rem}\\text{ (个)}`, comment: rem === 0 ? "没有余数，看每组最后一个" : `余数是 ${rem}，看每组第 ${rem} 个` },
          ],
          steps: [
            {
              step: 1,
              tag: "圈出周期",
              title: "第 1 步：找到重复的规律 → 每 3 个为 1 组",
              narration: `观察这串图形：“△、○、□”一直在重复出现，所以周期是 3（每 3 个图形打包成 1 组）。`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "每组几个", value: "3 个（△ ○ □）", tone: "coral" },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: "s1", text: "1: △", tone: "coral" },
                  { id: "s2", text: "2: ○", tone: "teal" },
                  { id: "s3", text: "3: □", tone: "blue" },
                ],
                rows: [
                  { label: "第 1 组：△ ○ □  |  第 2 组：△ ○ □", badge: "3 个一组", active: true },
                ],
                annotation: "每 3 个重复一次：第1个△，第2个○，第3个□！",
              },
            },
            {
              step: 2,
              tag: "除法看余数",
              title: `第 2 步：${nth} ÷ 3 = ${groups} 组……余 ${rem} → 答案是 ${ans}`,
              narration:
                rem === 0
                  ? `${nth} ÷ 3 = ${groups} 组，刚好没有余数！说明第 ${nth} 个就是第 ${groups} 组的最后一个，也就是“${ans}”！`
                  : `${nth} ÷ 3 = ${groups} 组还余 ${rem} 个！余数是 ${rem}，就从新的一组数第 ${rem} 个，答案就是“${ans}”！`,
              tipTitle: "周期规律口诀",
              tipBody: "余几就看每组第几个；没有余数（整除），就看每组最后一个！",
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "分组算式", value: `${nth} ÷ 3 = ${groups} 余 ${rem}` },
                { label: `第 ${nth} 个图形`, value: ans, tone: "teal" },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                rows: [
                  { label: `一共分成 ${groups} 整组（共 ${groups * 3} 个）`, badge: "已排完" },
                  {
                    label: rem === 0 ? "余数为 0 → 看每组最后一个" : `余数为 ${rem} → 看每组第 ${rem} 个`,
                    badge: `答案：${ans}`,
                    active: true,
                  },
                ],
                annotation: `第 ${nth} 个图形是 ${ans}！`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "旋转与位置变化",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：九宫格小黑点顺时针转圈，第 4 格在哪？",
      subtitle: "小黑点每次按顺时针跳到下一个角，跟着钟表指针转一圈！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `一个正方形分成四个角（左上、右上、右下、左下）。第 1 幅图小黑点在左上角，第 2 幅图在右上角，第 3 幅图在右下角。请问第 4 幅图小黑点在哪个角？`,
        formulas: [
          { id: "sp-3", latex: `\\text{左上} \\to \\text{右上} \\to \\text{右下} \\to \\text{左下}`, comment: "每次顺时针移动一个角" },
        ],
        steps: [
          {
            step: 1,
            tag: "看清移动方向",
            title: "第 1 步：左上 → 右上 → 右下，这是“顺时针”转圈！",
            narration: `把正方形想象成小钟表：小黑点先从左上跳到右上，再往下跳到右下，方向跟钟表指针走的方向一模一样（顺时针）！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "移动方向", value: "顺时针每次 1 格", tone: "coral" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "第 1 幅：左上角  →  第 2 幅：右上角", badge: "向右走" },
                { label: "第 3 幅：右下角  →  第 4 幅：？", badge: "向下走", active: true },
              ],
              annotation: "顺时针转圈：左上 → 右上 → 右下 → 下一个就是左下！",
            },
          },
          {
            step: 2,
            tag: "锁定第 4 幅",
            title: "第 2 步：从右下角继续顺时针 → 左下角！",
            narration: `从右下角再顺时针走一步，小黑点就来到“左下角”啦！如果还有第 5 幅图，它又会回到左上角！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "第 4 幅位置", value: "左下角", tone: "teal" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "第 1 幅：左上  |  第 2 幅：右上", badge: "顺时针" },
                { label: "第 3 幅：右下  |  第 4 幅：左下角", badge: "答案：左下角 ✓", active: true },
              ],
              annotation: "第 4 幅图小黑点在左下角！",
            },
          },
        ],
      }),
    },
  ],
};
