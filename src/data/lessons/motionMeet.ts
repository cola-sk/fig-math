import type { MathLesson } from "../../types/lesson";

export const motionMeetLesson: MathLesson = {
  id: "motion-meet",
  chapterId: "03-intervals",
  chapterTitle: "03. 间隔与行程",
  grade: 4,
  gradeLabel: "四年级",
  weekLabel: "第 14 讲",
  title: "行程问题（相遇与追及）",
  summary: "两人面对面跑靠「速度和」吃掉总距离；一个追另一个靠「速度差」拉近距离差！",
  engine: "number-line",
  keywords: ["行程问题", "相遇", "追及", "速度和", "速度差"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 4,
      gradeLabel: "四年级",
      chapterTitle: "模型思维 · 行程问题",
      weekLabel: "思维第 9 讲",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "例题 · 相遇",
      bookPart: "A版",
      tier: "base",
      title: "相向而行：几分钟相遇？",
      subtitle: "每分钟两人共同缩短「速度和」那么长一段路",
      defaultParams: { time: 3, speedA: 60, speedB: 40 },
      paramDefs: [
        { key: "time", label: "相遇时间", min: 2, max: 6, step: 1, unit: "分" },
        { key: "speedA", label: "小明速度", min: 40, max: 80, step: 10, unit: "米/分" },
        { key: "speedB", label: "小红速度", min: 30, max: 70, step: 10, unit: "米/分" },
      ],
      build: (params) => {
        const time = params.time ?? 3;
        const speedA = params.speedA ?? 60;
        const speedB = params.speedB ?? 40;
        const combinedSpeed = speedA + speedB;
        const totalDistance = combinedSpeed * time;
        const posA1 = speedA / totalDistance;
        const posB1 = 1 - speedB / totalDistance;
        const meetRatio = (speedA * time) / totalDistance;

        return {
          problemStatement: `A、B 两地相距 ${totalDistance} 米。小明以 ${speedA} 米/分的速度从 A 地出发，小红以 ${speedB} 米/分的速度从 B 地同时相向而行，几分钟后两人相遇？`,
          formulas: [
            { id: "mm-1", latex: `${speedA} + ${speedB} = ${combinedSpeed}\\text{ (米/分)}`, comment: "每分钟两人一共走的路程（速度和）" },
            { id: "mm-2", latex: `${totalDistance} \\div ${combinedSpeed} = ${time}\\text{ (分)}`, comment: "相遇时间 = 总路程 ÷ 速度和" },
          ],
          steps: [
            {
              step: 1,
              tag: "准备出发",
              title: "站在两端，面对面出发",
              narration: `小明在左端 A，小红在右端 B，中间隔着 ${totalDistance} 米。接下来看 1 分钟后发生什么！`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "两地总距", value: `${totalDistance} 米` },
                { label: "已用时间", value: "0 分" },
                { label: "剩余距离", value: `${totalDistance} 米`, tone: "coral" },
                { label: "速度和", value: `${combinedSpeed} 米/分` },
              ],
              sceneState: {
                kind: "number-line",
                layout: "track",
                totalLength: totalDistance,
                unitLabel: "米",
                actors: [
                  { id: "a", name: "小明", posRatio: 0, color: "coral", speedLabel: `${speedA}米/分`, direction: "right" },
                  { id: "b", name: "小红", posRatio: 1, color: "teal", speedLabel: `${speedB}米/分`, direction: "left" },
                ],
                markers: [
                  { id: "mA", posRatio: 0, label: "A地" },
                  { id: "mB", posRatio: 1, label: "B地" },
                ],
              },
            },
            {
              step: 2,
              tag: "速度和",
              title: `经过 1 分钟：合起来缩短了 ${combinedSpeed} 米`,
              narration: `第 1 分钟，小明向右走 ${speedA} 米，小红向左走 ${speedB} 米。他们之间的距离一下拉近了 ${speedA} + ${speedB} = ${combinedSpeed} 米！`,
              tipTitle: "相遇核心概念",
              tipBody: "相向而行时，两人“合作”吃掉距离，所以每分钟缩短的路程 = 速度和！",
              activeFormulaIndices: [0],
              liveStats: [
                { label: "已用时间", value: "1 分" },
                { label: "1分钟拉近", value: `${combinedSpeed} 米`, tone: "blue" },
                { label: "还剩距离", value: `${totalDistance - combinedSpeed} 米`, tone: "coral" },
                { label: "速度和", value: `${combinedSpeed} 米/分` },
              ],
              sceneState: {
                kind: "number-line",
                layout: "track",
                totalLength: totalDistance,
                unitLabel: "米",
                highlightGap: {
                  fromRatio: posA1,
                  toRatio: posB1,
                  label: `还剩 ${totalDistance - combinedSpeed} 米`,
                },
                actors: [
                  { id: "a", name: "小明", posRatio: posA1, color: "coral", speedLabel: `+${speedA}米`, direction: "right" },
                  { id: "b", name: "小红", posRatio: posB1, color: "teal", speedLabel: `+${speedB}米`, direction: "left" },
                ],
                markers: [
                  { id: "mA", posRatio: 0, label: "A地" },
                  { id: "mB", posRatio: 1, label: "B地" },
                ],
              },
            },
            {
              step: 3,
              tag: "相遇成功",
              title: `${time} 分钟后，两人正好相遇！`,
              narration: `总距离 ${totalDistance} 米里，有 ${totalDistance} ÷ ${combinedSpeed} = ${time} 个“速度和”，所以 ${time} 分钟后两人在距 A 地 ${speedA * time} 米处相遇！`,
              activeFormulaIndices: [1],
              liveStats: [
                { label: "相遇时间", value: `${time} 分钟`, tone: "teal" },
                { label: "小明走了", value: `${speedA * time} 米`, tone: "coral" },
                { label: "小红走了", value: `${speedB * time} 米`, tone: "teal" },
                { label: "剩余距离", value: "0 米" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "track",
                totalLength: totalDistance,
                unitLabel: "米",
                actors: [
                  { id: "a", name: "小明", posRatio: meetRatio - 0.02, color: "coral", speedLabel: `${speedA * time}米`, direction: "right" },
                  { id: "b", name: "小红", posRatio: meetRatio + 0.02, color: "teal", speedLabel: `${speedB * time}米`, direction: "left" },
                ],
                markers: [
                  { id: "mA", posRatio: 0, label: "A地" },
                  { id: "meet", posRatio: meetRatio, label: `相遇点(${speedA * time}米)` },
                  { id: "mB", posRatio: 1, label: "B地" },
                ],
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "变式一 · 追及",
      bookPart: "B版",
      tier: "challenge",
      title: "同向追及：几分钟追上？",
      subtitle: "同方向跑，靠的是每分钟多跑的「速度差」",
      defaultParams: { time: 4, fast: 80, slow: 50 },
      paramDefs: [
        { key: "time", label: "追及时间", min: 2, max: 6, step: 1, unit: "分" },
        { key: "fast", label: "哥哥速度", min: 70, max: 100, step: 10, unit: "米/分" },
        { key: "slow", label: "弟弟速度", min: 40, max: 60, step: 10, unit: "米/分" },
      ],
      build: (params) => {
        const time = params.time ?? 4;
        const fast = params.fast ?? 80;
        const slow = Math.min(fast - 10, params.slow ?? 50);
        const speedDiff = fast - slow;
        const initialGap = speedDiff * time;
        const catchDist = fast * time;

        return {
          problemStatement: `弟弟先出发，在前面 ${initialGap} 米处以 ${slow} 米/分的速度往前走。哥哥在后面以 ${fast} 米/分的速度去追他，几分钟能追上？`,
          formulas: [
            { id: "mc-1", latex: `${fast} - ${slow} = ${speedDiff}\\text{ (米/分)}`, comment: "哥哥每分钟比弟弟多追的距离（速度差）" },
            { id: "mc-2", latex: `${initialGap} \\div ${speedDiff} = ${time}\\text{ (分)}`, comment: "追及时间 = 路程差 ÷ 速度差" },
          ],
          steps: [
            {
              step: 1,
              tag: "看路程差",
              title: `起步时，哥哥落后 ${initialGap} 米`,
              narration: `两人往同一个方向跑！弟弟在前面 ${initialGap} 米，哥哥在起点追。`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "起初路程差", value: `${initialGap} 米`, tone: "coral" },
                { label: "哥哥速度", value: `${fast} 米/分` },
                { label: "弟弟速度", value: `${slow} 米/分` },
                { label: "速度差", value: `${speedDiff} 米/分`, tone: "blue" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "track",
                totalLength: catchDist,
                unitLabel: "米",
                highlightGap: {
                  fromRatio: 0,
                  toRatio: initialGap / catchDist,
                  label: `落后 ${initialGap} 米`,
                },
                actors: [
                  { id: "fast", name: "哥哥", posRatio: 0, color: "coral", speedLabel: `${fast}米/分`, direction: "right" },
                  { id: "slow", name: "弟弟", posRatio: initialGap / catchDist, color: "teal", speedLabel: `${slow}米/分`, direction: "right" },
                ],
                markers: [
                  { id: "s0", posRatio: 0, label: "起点" },
                  { id: "e0", posRatio: 1, label: "追上点" },
                ],
              },
            },
            {
              step: 2,
              tag: "追近一点",
              title: `1 分钟后，距离缩小了 ${speedDiff} 米`,
              narration: `哥哥向前跑 ${fast} 米，同时弟弟也往前走了 ${slow} 米，所以哥哥净追近了 ${fast} - ${slow} = ${speedDiff} 米！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "已用时间", value: "1 分" },
                { label: "1分钟净追近", value: `${speedDiff} 米`, tone: "blue" },
                { label: "还差距离", value: `${initialGap - speedDiff} 米`, tone: "coral" },
                { label: "状态", value: "继续追" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "track",
                totalLength: catchDist,
                unitLabel: "米",
                highlightGap: {
                  fromRatio: fast / catchDist,
                  toRatio: (initialGap + slow) / catchDist,
                  label: `还差 ${initialGap - speedDiff} 米`,
                },
                actors: [
                  { id: "fast", name: "哥哥", posRatio: fast / catchDist, color: "coral", speedLabel: `${fast}米`, direction: "right" },
                  { id: "slow", name: "弟弟", posRatio: (initialGap + slow) / catchDist, color: "teal", speedLabel: `${initialGap + slow}米`, direction: "right" },
                ],
                markers: [
                  { id: "s0", posRatio: 0, label: "起点" },
                  { id: "e0", posRatio: 1, label: "追上点" },
                ],
              },
            },
            {
              step: 3,
              tag: "成功追上",
              title: `${time} 分钟后追上！`,
              narration: `路程差 ${initialGap} 米 ÷ 速度差 ${speedDiff} 米/分 = ${time} 分钟，哥哥在 ${catchDist} 米处追上弟弟！`,
              activeFormulaIndices: [1],
              liveStats: [
                { label: "追及时间", value: `${time} 分钟`, tone: "teal" },
                { label: "哥哥共跑", value: `${catchDist} 米`, tone: "coral" },
                { label: "弟弟共走", value: `${slow * time} 米`, tone: "teal" },
                { label: "距离差", value: "0 米" },
              ],
              sceneState: {
                kind: "number-line",
                layout: "track",
                totalLength: catchDist,
                unitLabel: "米",
                actors: [
                  { id: "fast", name: "哥哥", posRatio: 0.98, color: "coral", speedLabel: "追上啦!", direction: "right" },
                  { id: "slow", name: "弟弟", posRatio: 1, color: "teal", speedLabel: `${catchDist}米处`, direction: "right" },
                ],
                markers: [
                  { id: "s0", posRatio: 0, label: "起点" },
                  { id: "e0", posRatio: 1, label: `追上(${catchDist}米)` },
                ],
              },
            },
          ],
        };
      },
    },
  ],
};
