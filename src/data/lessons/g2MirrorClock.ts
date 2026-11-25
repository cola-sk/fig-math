import type { MathLesson } from "../../types/lesson";

export const g2MirrorClockLesson: MathLesson = {
  id: "g2-mirror-clock",
  chapterId: "g2-visual-thinking",
  chapterTitle: "04. 形象思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.32",
  title: "镜面问题（左右对称与镜中时钟）",
  summary: "照镜子时“上下不变，左右相反”！从镜子里看时钟，用 12 时减去镜面时间就能秒出真实时间。",
  engine: "mirror-clock",
  keywords: ["二年级", "镜面问题", "形象思维", "轴对称", "镜子时钟"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "04. 形象思维训练",
      weekLabel: "p.32",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "镜子里的时钟",
      bookPart: "A版",
      tier: "base",
      title: "镜子里看到 3:00，实际是几点钟？",
      subtitle: "左右翻折一下，3 点和 9 点正好对称！",
      defaultParams: { hour: 3 },
      paramDefs: [
        { key: "hour", label: "镜子里的整点时刻", min: 1, max: 11, step: 1, unit: "点" },
      ],
      build: (params) => {
        const h = params.hour ?? 3;
        const realH = 12 - h;

        return {
          problemStatement: `小明从镜子里看到墙上挂钟的指针指向 ${h}:00（整点）。请问现在实际的时间是几点钟？`,
          formulas: [
            { id: "mc-1", latex: `12 - ${h} = ${realH}\\text{ (点)}`, comment: "整点对称规律：镜中 + 实际 = 12" },
          ],
          steps: [
            {
              step: 1,
              tag: "看镜面",
              title: `镜子里的时针指着 ${h}，分针指着 12`,
              narration: `注意看蓝色的镜面线：镜子会像翻书一样，把左边的东西翻到右边，右边的翻到左边！`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "镜中时间", value: `${h}:00`, tone: "coral" },
                { label: "12点位置", value: "在正中不变" },
                { label: "实际时间", value: "?" },
              ],
              sceneState: {
                kind: "mirror-clock",
                mode: "clock",
                hour: h,
                minute: 0,
                showMirrored: false,
                annotation: `镜子里的指针指向 ${h}:00，翻折过去会指到哪里？`,
              },
            },
            {
              step: 2,
              tag: "左右翻折",
              title: `翻回真实世界：12 - ${h} = ${realH} 点！`,
              narration: `沿着蓝色镜面线左右一翻，${h} 和 ${realH} 刚好左右对称！记住口诀：镜中时间 + 真实时间 = 12 点，所以实际是 ${realH}:00！`,
              tipTitle: "镜面时钟口诀",
              tipBody: "整点看镜子：用 12 减镜中点数；如果带分钟：用 11 时 60 分去减！",
              activeFormulaIndices: [0],
              liveStats: [
                { label: "镜中时间", value: `${h}:00`, tone: "coral" },
                { label: "实际时间", value: `${realH}:00`, tone: "teal" },
                { label: "相加验证", value: `${h} + ${realH} = 12` },
              ],
              checkpoint: {
                question: "如果镜子里看到的是 4:00，实际是几点？",
                options: ["4:00", "8:00", "10:00"],
                correctIndex: 1,
                feedbackCorrect: "答对了！12 - 4 = 8，所以实际是 8:00！",
                feedbackWrong: "用 12 减去镜子里的整点数：12 - 4 = 8 点哦！",
              },
              sceneState: {
                kind: "mirror-clock",
                mode: "clock",
                hour: h,
                minute: 0,
                showMirrored: true,
                annotation: `左右对称翻折：镜中 ${h}:00 ↔ 实际 ${realH}:00`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "图形镜面对称",
      bookPart: "A版",
      tier: "standard",
      title: "格子图照镜子：离镜子近的，镜像也近！",
      subtitle: "上下不动，左右一格格反过来画",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `左边方格图里有一个红色图形，如果右边放一面竖直的镜子，镜子里的图案应该是什么样子？`,
        formulas: [
          { id: "ms-1", latex: `\\text{规律：上下不变，左右相反}`, comment: "离镜面越近的格子，对称后依然离镜面最近" },
        ],
        steps: [
          {
            step: 1,
            tag: "找规律",
            title: "先看左边图形离镜面有多远",
            narration: `红色小方块贴着蓝色镜面线，只要记住“近对近、远对远”，把每一行左右倒过来画就行！`,
            activeFormulaIndices: [],
            liveStats: [
              { label: "上下位置", value: "完全不变" },
              { label: "左右方向", value: "左右相反", tone: "coral" },
            ],
            sceneState: {
              kind: "mirror-clock",
              mode: "shape",
              showMirrored: false,
              annotation: "观察左边图形，准备沿蓝色镜线翻折过去",
            },
          },
          {
            step: 2,
            tag: "对称展开",
            title: "像蝴蝶合拢翅膀一样左右完全对称！",
            narration: `青色方格就是镜子里的图案：每一行的高度不变，左右位置正好和红色方格相反！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "上下位置", value: "不变" },
              { label: "左右方向", value: "已对称翻折", tone: "teal" },
            ],
            sceneState: {
              kind: "mirror-clock",
              mode: "shape",
              showMirrored: true,
              annotation: "镜像完成：离镜面近的依然近，远的依然远",
            },
          },
        ],
      }),
    },
    {
      id: "var-2",
      modeLabel: "带分钟镜面时钟",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：镜子里看到 2:20，实际是几点几分？",
      subtitle: "把 12:00 拆成 11:60 再来减！",
      defaultParams: { hour: 2, minute: 20 },
      paramDefs: [
        { key: "hour", label: "镜中小时", min: 1, max: 10, step: 1, unit: "时" },
        { key: "minute", label: "镜中分钟", min: 10, max: 50, step: 5, unit: "分" },
      ],
      build: (params) => {
        const h = params.hour ?? 2;
        const m = params.minute ?? 20;
        const realH = 11 - h;
        const realM = 60 - m;

        return {
          problemStatement: `从镜子里看到电子表/挂钟的时间是 ${h}:${String(m).padStart(2, "0")}，请问实际现在是几时几分？`,
          formulas: [
            { id: "mcb-1", latex: `11\\text{时}60\\text{分} - ${h}\\text{时}${m}\\text{分} = ${realH}\\text{时}${realM}\\text{分}`, comment: "12时借1小时变11时60分" },
          ],
          steps: [
            {
              step: 1,
              tag: "借位巧算",
              title: `11 时 60 分 - ${h} 时 ${m} 分 = ${realH} 时 ${realM} 分`,
              narration: `因为有分钟数，我们把 12:00 写成 11 时 60 分：11 - ${h} = ${realH} 时，60 - ${m} = ${realM} 分！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "镜中时间", value: `${h}:${m}`, tone: "coral" },
                { label: "真实时间", value: `${realH}:${realM}`, tone: "teal" },
              ],
              sceneState: {
                kind: "mirror-clock",
                mode: "clock",
                hour: h,
                minute: m,
                showMirrored: true,
                annotation: `11时60分 - ${h}时${m}分 = ${realH}时${realM}分`,
              },
            },
          ],
        };
      },
    },
  ],
};
