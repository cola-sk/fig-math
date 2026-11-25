import type { MathLesson } from "../../types/lesson";

export const sumMultipleLesson: MathLesson = {
  id: "sum-multiple",
  chapterId: "02-segment",
  chapterTitle: "02. 线段图大法",
  grade: 3,
  gradeLabel: "三年级",
  weekLabel: "第 8 讲",
  title: "和倍与差倍问题（找准 1 份）",
  summary: "把较小量看成「1 份」积木块，再数清总和或差额占了几份，除法一下就求出 1 份！",
  engine: "segment-bar",
  keywords: ["和倍", "差倍", "倍数", "几倍多几", "一倍量"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 3,
      gradeLabel: "三年级",
      chapterTitle: "形象思维 · 线段图",
      weekLabel: "思维第 5 讲",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "例题 · 和倍",
      bookPart: "A版",
      tier: "base",
      title: "白兔与灰兔（整倍之和）",
      subtitle: "4 倍加上 1 倍，一共是 5 份",
      defaultParams: { onePart: 9, ratio: 4 },
      paramDefs: [
        { key: "onePart", label: "1份量（灰兔）", min: 4, max: 18, step: 1, unit: "只" },
        { key: "ratio", label: "白兔是灰兔的几倍", min: 2, max: 5, step: 1, unit: "倍" },
      ],
      build: (params) => {
        const onePart = params.onePart ?? 9;
        const ratio = params.ratio ?? 4;
        const white = onePart * ratio;
        const total = white + onePart;
        const totalParts = ratio + 1;

        return {
          problemStatement: `草地上白兔和灰兔一共有 ${total} 只，其中白兔的只数是灰兔的 ${ratio} 倍。白兔和灰兔各有多少只？`,
          formulas: [
            { id: "sm-1", latex: `${ratio} + 1 = ${totalParts}\\text{ (份)}`, comment: "总和一共占的份数" },
            { id: "sm-2", latex: `${total} \\div ${totalParts} = ${onePart}\\text{ (只)}`, comment: "求出1份（灰兔）" },
            { id: "sm-3", latex: `${onePart} \\times ${ratio} = ${white}\\text{ (只)}`, comment: "白兔数量" },
          ],
          steps: [
            {
              step: 1,
              tag: "找一倍量",
              title: "把灰兔当成「1 份」积木块",
              narration: `白兔是灰兔的 ${ratio} 倍，所以“的”前面的灰兔是基准（1 份），白兔就有 ${ratio} 块一模一样的积木。`,
              tipTitle: "和倍黄金法则",
              tipBody: "“是谁的几倍”，就把谁设为 1 份！",
              activeFormulaIndices: [],
              liveStats: [
                { label: "灰兔份数", value: "1 份" },
                { label: "白兔份数", value: `${ratio} 份` },
                { label: "总只数", value: `${total} 只` },
                { label: "每份几只", value: "?" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `灰兔 = 1 份，白兔 = ${ratio} 份`,
                rows: [
                  {
                    id: "white",
                    label: "白兔",
                    color: "coral",
                    parts: ratio,
                    partLabel: "1份",
                    visualTotalRatio: 0.85,
                  },
                  {
                    id: "gray",
                    label: "灰兔",
                    color: "teal",
                    parts: 1,
                    partLabel: "1份",
                    visualTotalRatio: 0.85 / ratio,
                  },
                ],
                totalBrace: { label: `共 ${total} 只`, state: "normal" },
              },
            },
            {
              step: 2,
              tag: "数总份数",
              title: `合起来一共 ${ratio} + 1 = ${totalParts} 份`,
              narration: `把白兔的 ${ratio} 份和灰兔的 1 份加在一起，总只数 ${total} 只刚好平均分成 ${totalParts} 份！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "总份数", value: `${totalParts} 份`, tone: "coral" },
                { label: "总只数", value: `${total} 只` },
                { label: "1份(灰兔)", value: `${onePart} 只`, tone: "teal" },
                { label: "白兔", value: `${white} 只` },
              ],
              checkpoint: {
                question: `总数 ${total} 只对应 ${totalParts} 份，为什么不是除以 ${ratio}？`,
                options: [
                  `因为总数里还包含了灰兔自己的 1 份`,
                  `因为白兔跑掉了一只`,
                ],
                correctIndex: 0,
                feedbackCorrect: `完全正确！灰兔 1 份 + 白兔 ${ratio} 份 = ${totalParts} 份，最容易漏掉“+1”！`,
                feedbackWrong: `仔细数数图上的积木块：白兔 ${ratio} 块，下面灰兔还有 1 块，合起来是 ${totalParts} 块！`,
              },
              sceneState: {
                kind: "segment-bar",
                annotation: `${total} ÷ (${ratio} + 1) = ${onePart} 只/份`,
                rows: [
                  {
                    id: "white",
                    label: "白兔",
                    color: "coral",
                    parts: ratio,
                    partLabel: `${onePart}`,
                    visualTotalRatio: 0.85,
                  },
                  {
                    id: "gray",
                    label: "灰兔",
                    color: "teal",
                    parts: 1,
                    partLabel: `${onePart}`,
                    visualTotalRatio: 0.85 / ratio,
                  },
                ],
                totalBrace: { label: `${totalParts}份 = ${total}`, state: "solved" },
              },
            },
            {
              step: 3,
              tag: "验证",
              title: "乘出白兔，检查总和",
              narration: `灰兔 = ${onePart} 只，白兔 = ${onePart} × ${ratio} = ${white} 只。检查：${white} + ${onePart} = ${total} 只，刚好！`,
              activeFormulaIndices: [2],
              liveStats: [
                { label: "灰兔", value: `${onePart} 只`, tone: "teal" },
                { label: "白兔", value: `${white} 只`, tone: "coral" },
                { label: "总和验算", value: `${total} 只`, tone: "teal" },
                { label: "倍数验算", value: `${ratio} 倍`, tone: "teal" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `答案：白兔 ${white} 只，灰兔 ${onePart} 只`,
                rows: [
                  {
                    id: "white",
                    label: "白兔",
                    color: "coral",
                    parts: ratio,
                    partLabel: `${onePart}`,
                    visualTotalRatio: 0.85,
                  },
                  {
                    id: "gray",
                    label: "灰兔",
                    color: "teal",
                    parts: 1,
                    partLabel: `${onePart}`,
                    visualTotalRatio: 0.85 / ratio,
                  },
                ],
                totalBrace: { label: `${white}+${onePart}=${total}`, state: "solved" },
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "变式一 · 差倍",
      bookPart: "A版",
      tier: "standard",
      title: "书架上下层（差倍问题）",
      subtitle: "知道“多几倍”和“多几本”，把除法换个方向",
      defaultParams: { onePart: 12, ratio: 3 },
      paramDefs: [
        { key: "onePart", label: "下层本数(1份)", min: 6, max: 24, step: 1, unit: "本" },
        { key: "ratio", label: "上层是下层的几倍", min: 2, max: 5, step: 1, unit: "倍" },
      ],
      build: (params) => {
        const onePart = params.onePart ?? 12;
        const ratio = params.ratio ?? 3;
        const upper = onePart * ratio;
        const diff = upper - onePart;
        const diffParts = ratio - 1;

        return {
          problemStatement: `书架上层放书的数量是下层的 ${ratio} 倍，上层比下层多 ${diff} 本书。上、下两层各有多少本书？`,
          formulas: [
            { id: "dm-1", latex: `${ratio} - 1 = ${diffParts}\\text{ (份)}`, comment: "上层比下层多的份数" },
            { id: "dm-2", latex: `${diff} \\div ${diffParts} = ${onePart}\\text{ (本)}`, comment: "下层（1份）" },
            { id: "dm-3", latex: `${onePart} \\times ${ratio} = ${upper}\\text{ (本)}`, comment: "上层本数" },
          ],
          steps: [
            {
              step: 1,
              tag: "看差值",
              title: `多出来的 ${diff} 本，对应几份？`,
              narration: `下层是 1 份，上层是 ${ratio} 份。竖线对齐左边后，多出来的就是 ${ratio} - 1 = ${diffParts} 份！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "上层比下层多", value: `${diff} 本`, tone: "coral" },
                { label: "多出的份数", value: `${diffParts} 份`, tone: "coral" },
                { label: "下层(1份)", value: "?" },
                { label: "上层", value: "?" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `上层比下层多 ${diffParts} 份，正好对应多出的 ${diff} 本`,
                rows: [
                  {
                    id: "up",
                    label: "上层",
                    color: "coral",
                    parts: ratio,
                    partLabel: "1份",
                    visualTotalRatio: 0.85,
                  },
                  {
                    id: "down",
                    label: "下层",
                    color: "teal",
                    parts: 1,
                    partLabel: "1份",
                    visualTotalRatio: 0.85 / ratio,
                  },
                ],
                diffGuide: { label: `${diffParts}份=${diff}本`, fromRow: 0, toRow: 1, highlight: true },
              },
            },
            {
              step: 2,
              tag: "求解",
              title: "求出 1 份，全部打通！",
              narration: `${diff} ÷ ${diffParts} = ${onePart} 本，这就是下层的 1 份！上层 = ${onePart} × ${ratio} = ${upper} 本。`,
              tipTitle: "和倍 vs 差倍对比",
              tipBody: "和倍除以 (倍数 + 1)，差倍除以 (倍数 - 1)，关键都是让「数量」对准「份数」！",
              activeFormulaIndices: [1, 2],
              liveStats: [
                { label: "下层本数", value: `${onePart} 本`, tone: "teal" },
                { label: "上层本数", value: `${upper} 本`, tone: "coral" },
                { label: "差值验算", value: `${upper - onePart} = ${diff}`, tone: "teal" },
                { label: "倍数验算", value: `${ratio} 倍`, tone: "teal" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `每份 = ${diff} ÷ ${diffParts} = ${onePart} 本`,
                rows: [
                  {
                    id: "up",
                    label: "上层",
                    color: "coral",
                    parts: ratio,
                    partLabel: `${onePart}`,
                    visualTotalRatio: 0.85,
                  },
                  {
                    id: "down",
                    label: "下层",
                    color: "teal",
                    parts: 1,
                    partLabel: `${onePart}`,
                    visualTotalRatio: 0.85 / ratio,
                  },
                ],
                diffGuide: { label: `多 ${diff} 本`, fromRow: 0, toRow: 1 },
              },
            },
          ],
        };
      },
    },
    {
      id: "var-2",
      modeLabel: "变式二 · 几倍多几",
      bookPart: "B版",
      tier: "challenge",
      title: "不是整倍怎么办？（切掉尾巴）",
      subtitle: "甲比乙的 2 倍多 5 岁，把多出来的 5 切掉就整除了！",
      defaultParams: { child: 10, extra: 5 },
      paramDefs: [
        { key: "child", label: "小敏年龄(1份)", min: 5, max: 18, step: 1, unit: "岁" },
        { key: "extra", label: "多出的零头", min: 2, max: 12, step: 1, unit: "岁" },
      ],
      build: (params) => {
        const child = params.child ?? 10;
        const extra = params.extra ?? 5;
        const parent = child * 2 + extra;
        const sum = parent + child;
        const cleanSum = sum - extra;

        return {
          problemStatement: `爸爸和小敏今年年龄之和是 ${sum} 岁，爸爸的年龄比小敏的 2 倍还多 ${extra} 岁。两人今年各多少岁？`,
          formulas: [
            { id: "jm-1", latex: `${sum} - ${extra} = ${cleanSum}\\text{ (岁)}`, comment: "切掉多出的零头，变成整3份" },
            { id: "jm-2", latex: `${cleanSum} \\div (2 + 1) = ${child}\\text{ (岁)}`, comment: "小敏的年龄" },
            { id: "jm-3", latex: `${child} \\times 2 + ${extra} = ${parent}\\text{ (岁)}`, comment: "爸爸的年龄" },
          ],
          steps: [
            {
              step: 1,
              tag: "拆尾巴",
              title: `先把多余的 ${extra} 岁零头剪掉`,
              narration: `总和 ${sum} 直接除以 3 除不尽，因为爸爸还有“多 ${extra} 岁”的尾巴！把尾巴减掉：${sum} - ${extra} = ${cleanSum}，立刻变成整整齐齐的 3 份！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "原总和", value: `${sum} 岁` },
                { label: "剪掉零头", value: `-${extra} 岁`, tone: "coral" },
                { label: "整倍之和", value: `${cleanSum} 岁`, tone: "blue" },
                { label: "总份数", value: "3 份" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `剪掉 +${extra} 后，剩下 3 份整倍 = ${cleanSum}`,
                rows: [
                  {
                    id: "dad",
                    label: "爸爸",
                    color: "coral",
                    parts: 2,
                    partLabel: "1份",
                    extraValue: extra,
                    extraLabel: `+${extra}`,
                    extraState: "detached",
                    visualTotalRatio: 0.82,
                  },
                  {
                    id: "kid",
                    label: "小敏",
                    color: "teal",
                    parts: 1,
                    partLabel: "1份",
                    visualTotalRatio: 0.36,
                  },
                ],
                totalBrace: { label: `剩下 ${cleanSum}`, state: "adjusted" },
              },
            },
            {
              step: 2,
              tag: "求解验证",
              title: "求出小敏，再把尾巴加给爸爸",
              narration: `小敏 = ${cleanSum} ÷ 3 = ${child} 岁；爸爸 = ${child} × 2 + ${extra} = ${parent} 岁。验算：${parent} + ${child} = ${sum} 岁！`,
              activeFormulaIndices: [1, 2],
              liveStats: [
                { label: "小敏年龄", value: `${child} 岁`, tone: "teal" },
                { label: "爸爸年龄", value: `${parent} 岁`, tone: "coral" },
                { label: "总和验算", value: `${sum} 岁`, tone: "teal" },
                { label: "几倍多几", value: `2倍多${extra}`, tone: "teal" },
              ],
              sceneState: {
                kind: "segment-bar",
                annotation: `小敏 ${child} 岁，爸爸 ${parent} 岁`,
                rows: [
                  {
                    id: "dad",
                    label: "爸爸",
                    color: "coral",
                    parts: 2,
                    partLabel: `${child}`,
                    extraValue: extra,
                    extraLabel: `+${extra}`,
                    extraState: "normal",
                    visualTotalRatio: 0.82,
                  },
                  {
                    id: "kid",
                    label: "小敏",
                    color: "teal",
                    parts: 1,
                    partLabel: `${child}`,
                    visualTotalRatio: 0.36,
                  },
                ],
                totalBrace: { label: `共 ${sum} 岁`, state: "solved" },
              },
            },
          ],
        };
      },
    },
  ],
};
