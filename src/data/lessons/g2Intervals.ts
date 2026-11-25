import type { MathLesson } from "../../types/lesson";

export const g2IntervalsLesson: MathLesson = {
  id: "g2-intervals",
  chapterId: "g2-juyifansan-intervals",
  chapterTitle: "00. 二年级 · 间隔与推理",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "第 9 周",
  title: "间隔趣谈（锯木头 · 爬楼梯 · 敲钟）",
  summary: "把一根木头锯成几段？从 1 楼爬到 4 楼爬了几层？用动画看清“段数”和“次数”永远差 1！",
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
      modeLabel: "锯木头例题",
      bookPart: "A版",
      tier: "base",
      title: "把木头锯成几段，要锯几次？",
      subtitle: "切一刀多一段，锯的次数永远比段数少 1",
      defaultParams: { pieces: 5, minutesPerCut: 3 },
      paramDefs: [
        { key: "pieces", label: "要锯成的段数", min: 2, max: 8, step: 1, unit: "段" },
        { key: "minutesPerCut", label: "每锯1次用时", min: 2, max: 6, step: 1, unit: "分" },
      ],
      build: (params) => {
        const pieces = params.pieces ?? 5;
        const mins = params.minutesPerCut ?? 3;
        const cuts = pieces - 1;
        const totalTime = cuts * mins;

        return {
          problemStatement: `一根木头要锯成 ${pieces} 段，每锯开 1 处需要 ${mins} 分钟。全部锯完一共需要多少分钟？`,
          formulas: [
            { id: "g2i-1", latex: `${pieces} - 1 = ${cuts}\\text{ (次)}`, comment: "锯的次数 = 段数 - 1" },
            { id: "g2i-2", latex: `${cuts} \\times ${mins} = ${totalTime}\\text{ (分)}`, comment: "次数 × 每次时间 = 总时间" },
          ],
          steps: [
            {
              step: 1,
              tag: "看清段数",
              title: `先把木头分成 ${pieces} 段`,
              narration: `一整根木头摆在这里，我们要把它分成 ${pieces} 段。千万别直接用 ${pieces} × ${mins} 哦，先数数要切几刀！`,
              tipTitle: "生活中的小秘密",
              tipBody: "剪刀咔嚓剪 1 次，绳子会变成 2 段；剪 2 次，变成 3 段！",
              activeFormulaIndices: [],
              liveStats: [
                { label: "目标段数", value: `${pieces} 段` },
                { label: "每次用时", value: `${mins} 分钟` },
                { label: "需要锯几次", value: "?" },
                { label: "总时间", value: "?" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "line",
                totalLength: pieces,
                unitLabel: "段",
                intervals: pieces,
                showIntervalArcs: false,
                woodLog: { pieces, isSplit: false },
                queueNodes: [],
              },
            },
            {
              step: 2,
              tag: "动手切开",
              title: `切 ${cuts} 刀，就能分出 ${pieces} 段！`,
              narration: `看木头中间的红虚线：只需要锯 ${pieces} - 1 = ${cuts} 次，最后一段就自然掉下来了，不需要再多锯 1 次！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "目标段数", value: `${pieces} 段` },
                { label: "锯的次数", value: `${cuts} 次`, tone: "coral" },
                { label: "每次用时", value: `${mins} 分钟` },
                { label: "总时间", value: "待计算" },
              ],
              checkpoint: {
                question: `把木头锯成 ${pieces} 段，实际只需要锯几刀？`,
                options: [`${pieces} 刀`, `${cuts} 刀`, `${pieces + 1} 刀`],
                correctIndex: 1,
                feedbackCorrect: `答对了！次数 = 段数 - 1 = ${cuts} 次！`,
                feedbackWrong: `数一数图上的红色“切”字剪刀标记，刚好只有 ${cuts} 刀哦！`,
              },
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
              },
            },
            {
              step: 3,
              tag: "算出总时间",
              title: `${cuts} 次 × ${mins} 分钟 = ${totalTime} 分钟`,
              narration: `因为只锯了 ${cuts} 次，每次 ${mins} 分钟，所以总时间是 ${cuts} × ${mins} = ${totalTime} 分钟！`,
              activeFormulaIndices: [1],
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
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "爬楼梯变式",
      bookPart: "A版",
      tier: "standard",
      title: "从 1 楼爬到几楼，其实爬了几层？",
      subtitle: "1 楼就在平地上，不用爬！层数 = 楼层差",
      defaultParams: { targetFloor: 5, secondsPerFloor: 15 },
      paramDefs: [
        { key: "targetFloor", label: "目标楼层", min: 3, max: 7, step: 1, unit: "楼" },
        { key: "secondsPerFloor", label: "每层楼梯用时", min: 10, max: 30, step: 5, unit: "秒" },
      ],
      build: (params) => {
        const target = params.targetFloor ?? 5;
        const secs = params.secondsPerFloor ?? 15;
        const flights = target - 1;
        const totalSecs = flights * secs;

        return {
          problemStatement: `乐乐从 1 楼走到 ${target} 楼，每上一层楼需要 ${secs} 秒钟。他从 1 楼走到 ${target} 楼一共需要多少秒？`,
          formulas: [
            { id: "g2s-1", latex: `${target} - 1 = ${flights}\\text{ (层)}`, comment: "1楼不用爬！实际爬的楼梯层数" },
            { id: "g2s-2", latex: `${flights} \\times ${secs} = ${totalSecs}\\text{ (秒)}`, comment: "层数 × 每层时间 = 总时间" },
          ],
          steps: [
            {
              step: 1,
              tag: "找准层数",
              title: `1 楼在地上，只爬了 ${flights} 段楼梯！`,
              narration: `从 1 楼到 ${target} 楼，中间只有 ${target} - 1 = ${flights} 段楼梯（每段就是“1 层”）！把楼层想成树，楼梯就是树与树之间的间隔！`,
              tipTitle: "举一反三口诀",
              tipBody: "从 1 楼到 N 楼，爬了 N - 1 层；如果从 2 楼到 6 楼，爬了 6 - 2 = 4 层！",
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "起点 → 终点", value: `1楼 → ${target}楼` },
                { label: "实际爬的层数", value: `${flights} 层`, tone: "coral" },
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
          ],
        };
      },
    },
    {
      id: "var-2",
      modeLabel: "敲钟拔高",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：大摆钟敲 3 下用 4 秒，敲 6 下用几秒？",
      subtitle: "敲钟响的时候不占时间，算的是“两次响声之间的间隔”！",
      defaultParams: { firstHits: 3, secondHits: 6, secPerGap: 2 },
      paramDefs: [
        { key: "firstHits", label: "第一次敲的次数", min: 3, max: 5, step: 1, unit: "下" },
        { key: "secondHits", label: "第二次敲的次数", min: 5, max: 8, step: 1, unit: "下" },
        { key: "secPerGap", label: "每个间隔秒数", min: 2, max: 4, step: 1, unit: "秒" },
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
            { id: "g2c-1", latex: `${h1} - 1 = ${g1}\\text{ (个间隔)}`, comment: `敲 ${h1} 下只有 ${g1} 个间隔` },
            { id: "g2c-2", latex: `${t1} \\div ${g1} = ${secPerGap}\\text{ (秒)}`, comment: "求出每个间隔几秒" },
            { id: "g2c-3", latex: `${h2} - 1 = ${g2}\\text{ (个间隔)}`, comment: `敲 ${h2} 下有 ${g2} 个间隔` },
            { id: "g2c-4", latex: `${g2} \\times ${secPerGap} = ${t2}\\text{ (秒)}`, comment: "总时间" },
          ],
          steps: [
            {
              step: 1,
              tag: "B版避坑",
              title: `敲 ${h1} 下只有 ${g1} 个空隙！`,
              narration: `注意陷阱！“铛-铛-铛”响 ${h1} 下，响声之间只有 ${h1} - 1 = ${g1} 个停顿的间隔。${t1} ÷ ${g1} = ${secPerGap} 秒/个间隔！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "第一次敲钟", value: `${h1} 下 (${g1} 间隔)` },
                { label: "每段间隔", value: `${secPerGap} 秒`, tone: "coral" },
                { label: "第二次敲钟", value: `${h2} 下` },
                { label: "总时间", value: "?" },
              ],
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
              },
            },
            {
              step: 2,
              tag: "推理求解",
              title: `敲 ${h2} 下有 ${g2} 个间隔 = ${t2} 秒`,
              narration: `敲 ${h2} 下有 ${h2} - 1 = ${g2} 个间隔，每个间隔 ${secPerGap} 秒，所以一共需要 ${g2} × ${secPerGap} = ${t2} 秒！`,
              tipTitle: "B版拔高总结",
              tipBody: "时间都花在“间隔”上，而不是“敲的那一下”上——算时间先找间隔数！",
              activeFormulaIndices: [2, 3],
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
          ],
        };
      },
    },
  ],
};
