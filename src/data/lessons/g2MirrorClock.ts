import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";
export const g2MirrorClockLesson: MathLesson = {
  id: "g2-mirror-clock",
  chapterId: "g2-visual-thinking",
  chapterTitle: "04. 形象思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.32",
  title: "镜面问题（左右对称与镜中时钟）",
  summary:
    "照镜子时“上下不变，左右相反”！从镜子里看时钟，用 12 时减去镜面时间就能秒出真实时间。",
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
      modeLabel: "基础例题 · 镜子里的时钟",
      bookPart: "A版",
      tier: "base",
      title: "镜子里看到 3:00，实际是几点钟？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { hour: 3 },
      paramDefs: [
        {
          key: "hour",
          label: "镜子里的整点时刻",
          min: 1,
          max: 11,
          step: 1,
          unit: "点",
        },
      ],
      build: (params) => {
        const h = params.hour ?? 3;
        const realH = 12 - h;
        return {
          problemStatement: `小明从镜子里看到墙上挂钟的指针指向 ${h}:00（整点）。请问现在实际的时间是几点钟？`,
          formulas: [
            {
              id: "mc-1",
              latex: `12 - ${h} = ${realH}\\text{ (点)}`,
              comment: "整点对称规律：镜中 + 实际 = 12",
            },
          ],
          steps: teachingSteps([
            {
              title: `镜子把钟面沿哪个方向翻过去？`,
              narration: `镜子里看到 ${h}:00。先找 12 和 6 连成的竖线，两边的指针会怎样对应？`,
              sceneState: {
                kind: "mirror-clock",
                mode: "clock",
                hour: h,
                minute: 0,
                showMirrored: false,
                annotation: `镜子里的钟已知，实际时间暂时留空`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `先找不动的轴，再想两边怎样对应`,
              narration: `12 和 6 在竖线上，翻折后位置不变。其他位置左右互换。你能先用手指出时针应该落到哪一侧吗？`,
              sceneState: {
                kind: "mirror-clock",
                mode: "clock",
                hour: h,
                minute: 0,
                showMirrored: false,
                annotation: `镜子里的钟已知，实际时间暂时留空`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `用对称关系，实际是几点？`,
              narration: `镜中整点数和实际整点数合起来是 12。镜子里是 ${h} 点，实际整点是多少？`,
              sceneState: {
                kind: "mirror-clock",
                mode: "clock",
                hour: h,
                minute: 0,
                showMirrored: false,
                annotation: `镜子里的钟已知，实际时间暂时留空`,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `实际是几点整？`,
                realH,
                ` 点`,
                `用 12 减去镜中的整点数。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `翻回真实世界：12 - ${h} = ${realH} 点！`,
              narration: `实际是 ${realH}:00。把时针沿竖线翻回去，正好回到镜中的 ${h}:00。`,
              tipTitle: "镜面时钟口诀",
              tipBody: `先找镜面轴，再看指针对称；整点用十二减，有分钟先借位。`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "镜中时间", value: `${h}:00`, tone: "coral" },
                { label: "实际时间", value: `${realH}:00`, tone: "teal" },
                { label: "相加验证", value: `${h} + ${realH} = 12` },
              ],
              sceneState: {
                kind: "mirror-clock",
                mode: "clock",
                hour: h,
                minute: 0,
                showMirrored: true,
                annotation: `镜中与实际时刻沿竖线对称`,
              },
            },
          ]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "举一反三 · 图形镜面对称",
      bookPart: "A版",
      tier: "standard",
      title: "格子图照镜子：离镜子近的，镜像也近！",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `左边方格图里有一个红色图形，如果右边放一面竖直的镜子，镜子里的图案应该是什么样子？`,
        formulas: [
          {
            id: "ms-1",
            latex: `\\text{规律：上下不变，左右相反}`,
            comment: "离镜面越近的格子，对称后依然离镜面最近",
          },
        ],
        steps: teachingSteps([
          {
            title: `红色格子翻过去，会跑到另一行吗？`,
            narration: `先挑一个红格子，看它在第几行，离蓝色镜面有几格。镜子像合上一本书，试着想它会落在哪里。`,
            sceneState: {
              kind: "mirror-clock",
              mode: "shape",
              showMirrored: false,
              annotation: `竖直镜面：先看格子与镜面的距离`,
            },
            activeFormulaIndices: [],
          },
          {
            title: `贴近镜面的格子，镜像也贴近吗？`,
            narration: `沿镜面翻过去，同一行里的格子一一对上。离镜面近的格子，会跑到很远的地方吗？`,
            sceneState: {
              kind: "mirror-clock",
              mode: "shape",
              showMirrored: false,
              annotation: `竖直镜面：先看格子与镜面的距离`,
            },
            activeFormulaIndices: [],
            checkpoint: {
              question: `翻过去的格子应该怎样找？`,
              options: ["同一行、距镜面一样远", "随便换一行", "全部贴在镜面上"],
              correctIndex: 0,
              feedbackCorrect: `对，沿镜面翻折后，同一行且距离相同。`,
              feedbackWrong: `想象把画着格子的纸沿镜面合起来。`,
            },
          },
          {
            title: `逐行找对应格子，准备好对答案了吗？`,
            narration: `从上往下一行行看，给每个红格子在镜面另一边找一个同样远的伙伴。先在心里画好，再翻到下一步检查。`,
            sceneState: {
              kind: "mirror-clock",
              mode: "shape",
              showMirrored: false,
              annotation: `竖直镜面：先看格子与镜面的距离`,
            },
            activeFormulaIndices: [],
          },
          {
            tag: `验证与回顾`,
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
              annotation: `竖直镜面：先看格子与镜面的距离`,
            },
            tipBody: `竖镜两边一对一，同一行里等距离。`,
          },
        ]),
      }),
    },
    {
      id: "var-2",
      modeLabel: "拓展拔高 · 带分钟镜面时钟",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：镜子里看到 2:20，实际是几点几分？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { hour: 2, minute: 20 },
      paramDefs: [
        {
          key: "hour",
          label: "镜中小时",
          min: 1,
          max: 10,
          step: 1,
          unit: "时",
        },
        {
          key: "minute",
          label: "镜中分钟",
          min: 10,
          max: 50,
          step: 5,
          unit: "分",
        },
      ],
      build: (params) => {
        const h = params.hour ?? 2;
        const m = params.minute ?? 20;
        const realH = 11 - h;
        const realM = 60 - m;
        return {
          problemStatement: `从镜子里看到指针挂钟的时间是 ${h}:${String(m).padStart(2, "0")}，请问实际现在是几时几分？`,
          formulas: [
            {
              id: "mcb-1",
              latex: `11\\text{时}60\\text{分} - ${h}\\text{时}${m}\\text{分} = ${realH}\\text{时}${realM}\\text{分}`,
              comment: "12时借1小时变11时60分",
            },
          ],
          steps: teachingSteps([
            {
              title: `镜子把钟面沿哪个方向翻过去？`,
              narration: `镜子里看到 ${h}:${String(m).padStart(2, "0")}。这是一面指针钟，沿 12 和 6 的竖线翻回去，指针会到哪里？`,
              sceneState: {
                kind: "mirror-clock",
                mode: "clock",
                hour: h,
                minute: m,
                showMirrored: false,
                annotation: `镜子里的钟已知，实际时间暂时留空`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `先找不动的轴，再想两边怎样对应`,
              narration: `沿竖线翻回去，12 的位置不变。要算时刻差，可以把 12 时整借出 1 时，换成几时多少分？`,
              sceneState: {
                kind: "mirror-clock",
                mode: "clock",
                hour: h,
                minute: m,
                showMirrored: false,
                annotation: `镜子里的钟已知，实际时间暂时留空`,
              },
              activeFormulaIndices: [],
              checkpoint: {
                question: `12 时整可以换写成什么？`,
                options: ["11 时 60 分", "11 时 10 分", "12 时 60 分"],
                correctIndex: 0,
                feedbackCorrect: `对！1 时是 60 分，借出 1 时后总时间没变。`,
                feedbackWrong: `1 小时等于 60 分。`,
              },
            },
            {
              title: `用对称关系，实际是几点？`,
              narration: `12 时整等于 11 时 60 分。先用 60 分减 ${m} 分，再用 11 时减 ${h} 时，实际会是几时几分？`,
              sceneState: {
                kind: "mirror-clock",
                mode: "clock",
                hour: h,
                minute: m,
                showMirrored: false,
                annotation: `镜子里的钟已知，实际时间暂时留空`,
              },
              activeFormulaIndices: [],
              checkpoint: {
                question: `实际是几时几分？`,
                options: [
                  '${realH}:${String(realM).padStart(2,"0")}',
                  '${h}:${String(m).padStart(2,"0")}',
                ],
                correctIndex: 0,
                feedbackCorrect: `对！小时和分钟分别相减，时刻合起来正好是 12 时。`,
                feedbackWrong: `先用 60 减分钟，再用 11 减小时。`,
              },
            },
            {
              tag: `验证与回顾`,
              title: `11 时 60 分 - ${h} 时 ${m} 分 = ${realH} 时 ${realM} 分`,
              narration: `实际是 ${realH}:${String(realM).padStart(2, "0")}。验算：${h} 时 ${m} 分加上 ${realH} 时 ${realM} 分，正好是 12 时整。`,
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
                annotation: `镜中与实际时刻沿竖线对称`,
              },
              tipBody: `先找镜面轴，再看指针对称；整点用十二减，有分钟先借位。`,
            },
          ]),
        };
      },
    },
  ],
};
