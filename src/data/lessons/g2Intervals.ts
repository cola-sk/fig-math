import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";
export const g2IntervalsLesson: MathLesson = {
  id: "g2-intervals",
  chapterId: "g2-juyifansan-intervals",
  chapterTitle: "02. 对应思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.10",
  title: "间隔趣谈（锯木头 · 爬楼梯 · 敲钟）",
  summary:
    "把一根木头锯成几段？从 1 楼爬到 4 楼爬了几层？用动画看清“段数”和“次数”永远差 1！",
  engine: "number-line",
  keywords: ["二年级", "间隔趣谈", "锯木头", "爬楼梯", "敲钟", "举一反三"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "02. 对应思维训练",
      weekLabel: "p.10",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 锯木头例题",
      bookPart: "A版",
      tier: "base",
      title: "把木头锯成几段，要锯几次？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { pieces: 5, minutesPerCut: 3 },
      paramDefs: [
        {
          key: "pieces",
          label: "要锯成的段数",
          min: 2,
          max: 8,
          step: 1,
          unit: "段",
        },
        {
          key: "minutesPerCut",
          label: "每锯1次用时",
          min: 2,
          max: 6,
          step: 1,
          unit: "分",
        },
      ],
      build: (params) => {
        const pieces = params.pieces ?? 5;
        const mins = params.minutesPerCut ?? 3;
        const cuts = pieces - 1;
        const totalTime = cuts * mins;
        return {
          problemStatement: `一根木头要锯成 ${pieces} 段，每锯开 1 处需要 ${mins} 分钟。全部锯完一共需要多少分钟？`,
          formulas: [
            {
              id: "g2i-1",
              latex: `${pieces} - 1 = ${cuts}\\text{ (次)}`,
              comment: "锯的次数 = 段数 - 1",
            },
            {
              id: "g2i-2",
              latex: `${cuts} \\times ${mins} = ${totalTime}\\text{ (分)}`,
              comment: "次数 × 每次时间 = 总时间",
            },
          ],
          steps: teachingSteps([
            {
              title: `锯一次，木头会多出几段？`,
              narration: `要锯成 ${pieces} 段，每次 ${mins} 分钟。先想想：完整的一根木头本来就有一段，第一次锯完会有几段？`,
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: pieces,
                unitLabel: "段",
                intervals: pieces,
                showIntervalArcs: false,
                queueNodes: [],
                woodLog: { pieces, isSplit: false },
                hideLengthLabel: true,
              },
              activeFormulaIndices: [],
            },
            {
              title: `得到目标段数，需要锯几次？`,
              narration: `每锯一次就多出一段。想把原来的 1 段变成 ${pieces} 段，需要增加几段？也就需要锯几次？`,
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: pieces,
                unitLabel: "段",
                intervals: pieces,
                showIntervalArcs: false,
                queueNodes: [],
                woodLog: { pieces, isSplit: true },
                hideLengthLabel: true,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `要锯几次？`,
                cuts,
                ` 次`,
                `木头本来已经有一段。`,
              ),
            },
            {
              title: `次数找到了，总共需要几分钟？`,
              narration: `要锯 ${cuts} 次，每次 ${mins} 分钟。算总时间时应该用段数，还是用真正锯的次数？`,
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: pieces,
                unitLabel: "段",
                intervals: pieces,
                showIntervalArcs: false,
                woodLog: { pieces, isSplit: true },
                queueNodes: Array.from({ length: cuts }).map((_, i) => ({
                  id: `cut-${i}`,
                  posRatio: (i + 1) / pieces,
                  label: `第${i + 1}刀`,
                  role: "cut",
                })),
                hideLengthLabel: true,
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `总共需要多少分钟？`,
                totalTime,
                ` 分钟`,
                `把每一次锯木头的时间合起来。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `${cuts} 次 × ${mins} 分钟 = ${totalTime} 分钟`,
              tipBody: "段数减一是次数，次数乘每次的时间。",
              narration: `因为只锯了 ${cuts} 次，每次 ${mins} 分钟，所以总时间是 ${cuts} × ${mins} = ${totalTime} 分钟！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "段数", value: `${pieces} 段` },
                { label: "锯的次数", value: `${cuts} 次`, tone: "coral" },
                { label: "总用时", value: `${totalTime} 分钟`, tone: "teal" },
                { label: "口诀", value: "次 = 段 - 1" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: pieces,
                unitLabel: "段",
                intervals: pieces,
                showIntervalArcs: false,
                woodLog: { pieces, isSplit: true },
                queueNodes: Array.from({ length: cuts }).map((_, i) => ({
                  id: `cut-${i}`,
                  posRatio: (i + 1) / pieces,
                  label: `${(i + 1) * mins}分`,
                  role: "cut",
                })),
              },
            },
          ]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "举一反三 · 爬楼梯变式",
      bookPart: "A版",
      tier: "standard",
      title: "从 1 楼爬到几楼，其实爬了几层？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { targetFloor: 5, secondsPerFloor: 15 },
      paramDefs: [
        {
          key: "targetFloor",
          label: "目标楼层",
          min: 3,
          max: 7,
          step: 1,
          unit: "楼",
        },
        {
          key: "secondsPerFloor",
          label: "每层楼梯用时",
          min: 10,
          max: 30,
          step: 5,
          unit: "秒",
        },
      ],
      build: (params) => {
        const target = params.targetFloor ?? 5;
        const secs = params.secondsPerFloor ?? 15;
        const flights = target - 1;
        const totalSecs = flights * secs;
        return {
          problemStatement: `乐乐从 1 楼走到 ${target} 楼，每上一层楼需要 ${secs} 秒钟。他从 1 楼走到 ${target} 楼一共需要多少秒？`,
          formulas: [
            {
              id: "g2s-1",
              latex: `${target} - 1 = ${flights}\\text{ (层)}`,
              comment: "1楼不用爬！实际爬的楼梯层数",
            },
            {
              id: "g2s-2",
              latex: `${flights} \\times ${secs} = ${totalSecs}\\text{ (秒)}`,
              comment: "层数 × 每层时间 = 总时间",
            },
          ],
          steps: teachingSteps([
            {
              title: `从 1 楼出发，1 楼本身需要爬吗？`,
              narration: `从 1 楼走到 ${target} 楼，每上一层要 ${secs} 秒。手指从起点开始，每跨过一个空隙，才上了一层。`,
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: flights,
                unitLabel: "层",
                intervals: flights,
                queueNodes: Array.from({ length: target }).map((_, i) => ({
                  id: `fl-${i}`,
                  posRatio: i / flights,
                  label: `${i + 1}楼`,
                  role: i === 0 || i === target - 1 ? "target" : "normal",
                })),
                showIntervalArcs: false,
                hideLengthLabel: true,
              },
              activeFormulaIndices: [],
            },
            {
              title: `数楼层之间的空隙，一共爬了几层？`,
              narration: `1 楼是起点。1 楼到 2 楼才爬第一层，照这样从起点数到 ${target} 楼，有几段楼梯？`,
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: flights,
                unitLabel: "层",
                intervals: flights,
                queueNodes: Array.from({ length: target }).map((_, i) => ({
                  id: `fl-${i}`,
                  posRatio: i / flights,
                  label: `${i + 1}楼`,
                  role: i === 0 || i === target - 1 ? "target" : "normal",
                })),
                showIntervalArcs: true,
                hideLengthLabel: true,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `实际需要爬几层楼梯？`,
                flights,
                ` 层`,
                `数的是楼层之间的空隙。`,
              ),
            },
            {
              title: `每层用时一样，总共需要几秒？`,
              narration: `实际要爬 ${flights} 层，每层用 ${secs} 秒。把这些相同的时间合起来，总共是多少秒？`,
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: flights,
                unitLabel: "层",
                intervals: flights,
                queueNodes: Array.from({ length: target }).map((_, i) => ({
                  id: `fl-${i}`,
                  posRatio: i / flights,
                  label: `${i + 1}楼`,
                  role: i === 0 || i === target - 1 ? "target" : "normal",
                })),
                showIntervalArcs: true,
                hideLengthLabel: true,
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `总共需要多少秒？`,
                totalSecs,
                ` 秒`,
                `层数乘每层所需时间。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `1 楼在地上，只爬了 ${flights} 段楼梯！`,
              narration: `从 1 楼到 ${target} 楼，中间只有 ${target} - 1 = ${flights} 段楼梯（每段就是“1 层”）！把楼层想成树，楼梯就是树与树之间的间隔！`,
              tipTitle: "举一反三口诀",
              tipBody: `楼层不是楼梯段，终点减起点，再乘每层时间。`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "起点 → 终点", value: `1楼 → ${target}楼` },
                {
                  label: "实际爬的层数",
                  value: `${flights} 层`,
                  tone: "coral",
                },
                { label: "每层时间", value: `${secs} 秒` },
                { label: "总用时", value: `${totalSecs} 秒`, tone: "teal" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: flights,
                unitLabel: "层",
                intervals: flights,
                showIntervalArcs: true,
                queueNodes: Array.from({ length: target }).map((_, i) => ({
                  id: `fl-${i}`,
                  posRatio: i / flights,
                  label: `${i + 1}楼`,
                  role: i === 0 || i === target - 1 ? "target" : "normal",
                })),
              },
            },
          ]),
        };
      },
    },
    {
      id: "var-2",
      modeLabel: "拓展拔高 · 敲钟拔高",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：大摆钟敲 3 下用 4 秒，敲 6 下用几秒？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { firstHits: 3, secondHits: 6, secPerGap: 2 },
      paramDefs: [
        {
          key: "firstHits",
          label: "第一次敲的次数",
          min: 3,
          max: 5,
          step: 1,
          unit: "下",
        },
        {
          key: "secondHits",
          label: "第二次敲的次数",
          min: 5,
          max: 8,
          step: 1,
          unit: "下",
        },
        {
          key: "secPerGap",
          label: "每个间隔秒数",
          min: 2,
          max: 4,
          step: 1,
          unit: "秒",
        },
      ],
      build: (params) => {
        const h1 = params.firstHits ?? 3;
        const h2 = Math.max(h1 + 1, params.secondHits ?? 6);
        const secPerGap = params.secPerGap ?? 2;
        const g1 = h1 - 1;
        const t1 = g1 * secPerGap;
        const g2 = h2 - 1;
        const t2 = g2 * secPerGap;
        return {
          problemStatement: `广场的大时钟 ${h1} 点钟敲 ${h1} 下，${t1} 秒敲完。照这样计算，${h2} 点钟敲 ${h2} 下，需要多少秒才能敲完？`,
          formulas: [
            {
              id: "g2c-1",
              latex: `${h1} - 1 = ${g1}\\text{ (个间隔)}`,
              comment: `敲 ${h1} 下只有 ${g1} 个间隔`,
            },
            {
              id: "g2c-2",
              latex: `${t1} \\div ${g1} = ${secPerGap}\\text{ (秒)}`,
              comment: "求出每个间隔几秒",
            },
            {
              id: "g2c-3",
              latex: `${h2} - 1 = ${g2}\\text{ (个间隔)}`,
              comment: `敲 ${h2} 下有 ${g2} 个间隔`,
            },
            {
              id: "g2c-4",
              latex: `${g2} \\times ${secPerGap} = ${t2}\\text{ (秒)}`,
              comment: "总时间",
            },
          ],
          steps: teachingSteps([
            {
              title: `敲钟用的时间，藏在响声里还是空隙里？`,
              narration: `${h1} 下响声用了 ${t1} 秒。把响声当成点，从第一次响到最后一次响，中间有几段等待？`,
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: t1,
                unitLabel: "秒",
                intervals: g1,
                queueNodes: Array.from({ length: h1 }).map((_, i) => ({
                  id: `hit1-${i}`,
                  posRatio: i / g1,
                  label: `响${i + 1}`,
                  role: "overlap",
                })),
                hideLengthLabel: true,
                showIntervalArcs: false,
              },
              activeFormulaIndices: [],
            },
            {
              title: `先数空隙，每段等待几秒？`,
              narration: `${h1} 下响声之间有 ${g1} 段等待。总共 ${t1} 秒，平均每段等待几秒？`,
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: t1,
                unitLabel: "秒",
                intervals: g1,
                showIntervalArcs: true,
                queueNodes: Array.from({ length: h1 }).map((_, i) => ({
                  id: `hit1-${i}`,
                  posRatio: i / g1,
                  label: `响${i + 1}`,
                  role: "overlap",
                })),
                hideLengthLabel: true,
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `每个间隔用几秒？`,
                secPerGap,
                ` 秒`,
                `把总时间平均分给响声之间的空隙。`,
              ),
            },
            {
              title: `换成另一组响声，该用多少个间隔来算？`,
              narration: `每个间隔 ${secPerGap} 秒。${h2} 下响声之间有 ${g2} 个间隔，请用间隔数算出总时间。`,
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: t2,
                unitLabel: "秒",
                intervals: g2,
                showIntervalArcs: true,
                queueNodes: Array.from({ length: h2 }).map((_, i) => ({
                  id: `hit2-${i}`,
                  posRatio: i / g2,
                  label: `响${i + 1}`,
                  role: "target",
                })),
                hideLengthLabel: true,
              },
              activeFormulaIndices: [0, 1, 2],
              checkpoint: numberCheckpoint(
                `敲 ${h2} 下需要多少秒？`,
                t2,
                ` 秒`,
                `第一次响之前和最后一次响之后不另算等待时间。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `敲 ${h2} 下有 ${g2} 个间隔 = ${t2} 秒`,
              narration: `敲 ${h2} 下有 ${h2} - 1 = ${g2} 个间隔，每个间隔 ${secPerGap} 秒，所以一共需要 ${g2} × ${secPerGap} = ${t2} 秒！`,
              tipTitle: "B版拔高总结",
              tipBody:
                "时间都花在“间隔”上，而不是“敲的那一下”上——算时间先找间隔数！",
              activeFormulaIndices: [0, 1, 2, 3],
              liveStats: [
                { label: "敲钟次数", value: `${h2} 下` },
                { label: "间隔个数", value: `${g2} 个`, tone: "coral" },
                { label: "每个间隔", value: `${secPerGap} 秒` },
                { label: "敲完总时间", value: `${t2} 秒`, tone: "teal" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: t2,
                unitLabel: "秒",
                intervals: g2,
                showIntervalArcs: true,
                queueNodes: Array.from({ length: h2 }).map((_, i) => ({
                  id: `hit2-${i}`,
                  posRatio: i / g2,
                  label: `响${i + 1}`,
                  role: "target",
                })),
              },
            },
          ]),
        };
      },
    },
  ],
};
