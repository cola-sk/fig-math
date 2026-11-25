import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";

export const g2QueueOverlapLesson: MathLesson = {
  id: "g2-queue-overlap",
  chapterId: "g2-juyifansan-queue",
  chapterTitle: "01. 整体思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.2",
  title: "排队问题（别把自己数丢或数重！）",
  summary: "二年级排队最经典的“重叠启蒙”：从前往后数一遍，从后往前又数一遍，主角自己被算了两次！",
  engine: "number-line",
  keywords: ["二年级", "排队问题", "重叠", "第几", "中间有几人", "举一反三"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "01. 整体思维训练",
      weekLabel: "p.2",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 排队例题",
      bookPart: "A版",
      tier: "base",
      title: "从前往后第 5，从后往前第 4，共几人？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { fromFront: 5, fromBack: 4 },
      paramDefs: [
        { key: "fromFront", label: "从前往后数排第几", min: 3, max: 7, step: 1, unit: "" },
        { key: "fromBack", label: "从后往前数排第几", min: 2, max: 6, step: 1, unit: "" },
      ],
      build: (params) => {
        const front = params.fromFront ?? 5;
        const back = params.fromBack ?? 4;
        const total = front + back - 1;
        const targetIdx = front - 1;

        return {
          problemStatement: `小朋友们排成一排做操。从前往后数，小明排第 ${front} 个；从后往前数，小明排第 ${back} 个。这一排一共有多少个小朋友？`,
          formulas: [
            { id: "g2q-1", latex: `${front} + ${back} = ${front + back}\\text{ (人)}`, comment: "把两次数的加起来，小明被数了2次！" },
            { id: "g2q-2", latex: `${front + back} - 1 = ${total}\\text{ (人)}`, comment: "减去重复数的 1 次小明" },
          ],
          steps: teachingSteps([
{ title: `两次都数到小明，他会被数几次？`, narration: `从前数，小明排第 ${front}；从后数，小明排第 ${back}。两次数人时，都要数到小明，想想直接相加会发生什么？`, sceneState: { ...({
                kind: "number-line",
                layout: "track",
                totalLength: total,
                unitLabel: "人",
                highlightGap: {
                  fromRatio: 0,
                  toRatio: targetIdx / Math.max(1, total - 1),
                  label: `从前数共 ${front} 人`,
                },
                queueNodes: Array.from({ length: total }).map((_, i) => ({
                  id: `q-${i}`,
                  posRatio: total === 1 ? 0.5 : i / (total - 1),
                  label: i === targetIdx ? "小明" : "",
                  role: i === targetIdx ? "overlap" : "normal",
                })),
              }), hideLengthLabel: true }, activeFormulaIndices: [] },
{ title: `先把两次数到的人相加，得到多少？`, narration: `两次数人都包括小明，先合起来算一算 ${front} + ${back}。这个结果还需要检查哪里？`, sceneState: { ...({
                kind: "number-line",
                layout: "track",
                totalLength: total,
                unitLabel: "人",
                highlightGap: {
                  fromRatio: targetIdx / Math.max(1, total - 1),
                  toRatio: 1,
                  label: `从后数共 ${back} 人（又算了小明！）`,
                },
                queueNodes: Array.from({ length: total }).map((_, i) => ({
                  id: `q-${i}`,
                  posRatio: total === 1 ? 0.5 : i / (total - 1),
                  label: i === targetIdx ? "×2" : "",
                  role: i === targetIdx ? "overlap" : "normal",
                })),
              }), hideLengthLabel: true }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`暂时把两次数到的人数相加是多少？`, front + back, ` 人`, `这里只是暂时相加，还没有去掉重复。`) },
{ title: `相加后多算了一次，真正共有几人？`, narration: `暂时相加得到 ${front + back} 人，小明在里面出现两次。一个小朋友只能算一次，应该怎样调整？`, sceneState: { ...({
                kind: "number-line",
                layout: "track",
                totalLength: total,
                unitLabel: "人",
                highlightGap: {
                  fromRatio: targetIdx / Math.max(1, total - 1),
                  toRatio: 1,
                  label: `从后数共 ${back} 人（又算了小明！）`,
                },
                queueNodes: Array.from({ length: total }).map((_, i) => ({
                  id: `q-${i}`,
                  posRatio: total === 1 ? 0.5 : i / (total - 1),
                  label: i === targetIdx ? "×2" : "",
                  role: i === targetIdx ? "overlap" : "normal",
                })),
              }), hideLengthLabel: true }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`这一排实际共有几人？`, total, ` 人`, `小明多算了一次，要扣掉一次。`) },
{ tag: `验证与回顾`, title: `减掉重复的 1 次：一共有 ${total} 人！`, narration: `所以总人数 = ${front} + ${back} - 1 = ${total} 人！也可以想成：小明前面 ${front - 1} 人 + 后面 ${back - 1} 人 + 小明自己 1 人 = ${total} 人！`, tipTitle: "排队黄金口诀", tipBody: "“第几 + 第几 - 1”（有第有第减1）；如果是“前面有几人 + 后面有几人 + 1”（有前有后加自己）！", activeFormulaIndices: [0, 1], liveStats: [
                { label: "小明前面", value: `${front - 1} 人` },
                { label: "小明后面", value: `${back - 1} 人` },
                { label: "重复扣减", value: "-1 人" },
                { label: "全排总人数", value: `${total} 人`, tone: "teal" },
              ], sceneState: {
                kind: "number-line",
                layout: "track",
                totalLength: total,
                unitLabel: "人",
                queueNodes: Array.from({ length: total }).map((_, i) => ({
                  id: `q-${i}`,
                  posRatio: total === 1 ? 0.5 : i / (total - 1),
                  label: i === targetIdx ? "小明" : String(i + 1),
                  role: i === targetIdx ? "target" : "normal",
                })),
              } }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "举一反三 · 中间有几人",
      bookPart: "A版",
      tier: "standard",
      title: "我排第 3，你排第 8，我们中间有几人？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { posA: 3, posB: 8 },
      paramDefs: [
        { key: "posA", label: "小红排第几", min: 2, max: 4, step: 1, unit: "" },
        { key: "posB", label: "小刚排第几", min: 6, max: 11, step: 1, unit: "" },
      ],
      build: (params) => {
        const posA = params.posA ?? 3;
        const posB = Math.max(posA + 2, params.posB ?? 8);
        const between = posB - posA - 1;

        return {
          problemStatement: `一排同学中，从左边数小红排第 ${posA} 个，小刚排第 ${posB} 个。小红和小刚“中间”隔着几个人？`,
          formulas: [
            { id: "g2qv1-1", latex: `${posB} - ${posA} = ${posB - posA}\\text{ (人)}`, comment: "先减掉小红和前面的人（还包含小刚）" },
            { id: "g2qv1-2", latex: `${posB - posA} - 1 = ${between}\\text{ (人)}`, comment: "再把小刚自己减掉！" },
          ],
          steps: teachingSteps([
{ title: `说“中间”，要包括两位同学自己吗？`, narration: `小红排第 ${posA}，小刚排第 ${posB}。“中间”只数两人之间的小朋友，先用手指出应数的范围。`, sceneState: { ...({
                kind: "number-line",
                layout: "track",
                totalLength: posB,
                unitLabel: "人",
                highlightGap: {
                  fromRatio: posA / (posB - 1),
                  toRatio: (posB - 2) / (posB - 1),
                  label: `中间 ${between} 人`,
                },
                queueNodes: Array.from({ length: posB }).map((_, i) => {
                  const num = i + 1;
                  const role =
                    num === posA || num === posB
                      ? "overlap"
                      : num > posA && num < posB
                        ? "target"
                        : "excluded";
                  return {
                    id: `qb-${i}`,
                    posRatio: i / (posB - 1),
                    label: num === posA ? "红" : num === posB ? "刚" : String(num),
                    role,
                  };
                }),
              }), hideLengthLabel: true }, activeFormulaIndices: [] },
{ title: `先减去小红和前面的同学，还包括谁？`, narration: `从小刚的位置数里，减去小红的位置数。留下的人里还有小刚自己，先算留下了几人。`, sceneState: { ...({
                kind: "number-line",
                layout: "track",
                totalLength: posB,
                unitLabel: "人",
                highlightGap: {
                  fromRatio: posA / (posB - 1),
                  toRatio: (posB - 2) / (posB - 1),
                  label: `中间 ${between} 人`,
                },
                queueNodes: Array.from({ length: posB }).map((_, i) => {
                  const num = i + 1;
                  const role =
                    num === posA || num === posB
                      ? "overlap"
                      : num > posA && num < posB
                        ? "target"
                        : "excluded";
                  return {
                    id: `qb-${i}`,
                    posRatio: i / (posB - 1),
                    label: num === posA ? "红" : num === posB ? "刚" : String(num),
                    role,
                  };
                }),
              }), hideLengthLabel: true }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`减去小红和前面的人后，暂时留下几人？`, posB - posA, ` 人`, `暂时还包含小刚本人。`) },
{ title: `去掉小刚本人，中间有几人？`, narration: `暂时留下 ${posB - posA} 人，其中包含小刚。只数两人中间的小朋友，还要去掉谁？`, sceneState: { ...({
                kind: "number-line",
                layout: "track",
                totalLength: posB,
                unitLabel: "人",
                highlightGap: {
                  fromRatio: posA / (posB - 1),
                  toRatio: (posB - 2) / (posB - 1),
                  label: `中间 ${between} 人`,
                },
                queueNodes: Array.from({ length: posB }).map((_, i) => {
                  const num = i + 1;
                  const role =
                    num === posA || num === posB
                      ? "overlap"
                      : num > posA && num < posB
                        ? "target"
                        : "excluded";
                  return {
                    id: `qb-${i}`,
                    posRatio: i / (posB - 1),
                    label: num === posA ? "红" : num === posB ? "刚" : String(num),
                    role,
                  };
                }),
              }), hideLengthLabel: true }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`小红和小刚中间有几人？`, between, ` 人`, `两位同学自己都不算在中间。`) },
{ tag: `验证与回顾`, title: `求“之间”，要减掉 ${posA} 再减 1！`, narration: `到小刚一共有 ${posB} 人，先把小红（第 ${posA}）和她左边的人全部减掉，剩下 ${posB} - ${posA} = ${posB - posA} 人；但这里面还包含小刚本人，所以再减 1，中间有 ${between} 人！`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "小红位置", value: `第 ${posA} 个` },
                { label: "小刚位置", value: `第 ${posB} 个` },
                { label: "中间隔着", value: `${between} 人`, tone: "coral" },
                { label: "口诀", value: "大 - 小 - 1", tone: "teal" },
              ], sceneState: {
                kind: "number-line",
                layout: "track",
                totalLength: posB,
                unitLabel: "人",
                highlightGap: {
                  fromRatio: posA / (posB - 1),
                  toRatio: (posB - 2) / (posB - 1),
                  label: `中间 ${between} 人`,
                },
                queueNodes: Array.from({ length: posB }).map((_, i) => {
                  const num = i + 1;
                  const role =
                    num === posA || num === posB
                      ? "overlap"
                      : num > posA && num < posB
                        ? "target"
                        : "excluded";
                  return {
                    id: `qb-${i}`,
                    posRatio: i / (posB - 1),
                    label: num === posA ? "红" : num === posB ? "刚" : String(num),
                    role,
                  };
                }),
              }, tipBody: `位置先相减，端点再看清；只数中间，还要减一人。` }
]),
        };
      },
    },
    {
      id: "var-2",
      modeLabel: "拓展拔高 · 倒推排第几",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：一共 10 人，从左数第 4，从右数第几？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { total: 10, fromLeft: 4 },
      paramDefs: [
        { key: "total", label: "全排总人数", min: 7, max: 12, step: 1, unit: "人" },
        { key: "fromLeft", label: "从左数排第几", min: 2, max: 6, step: 1, unit: "" },
      ],
      build: (params) => {
        const total = params.total ?? 10;
        const left = Math.min(total - 1, params.fromLeft ?? 4);
        const rightCountExcludingSelf = total - left;
        const fromRight = rightCountExcludingSelf + 1;

        return {
          problemStatement: `一共有 ${total} 个小朋友站成一排。从左往右数，乐乐排第 ${left} 个；如果从右往左数，乐乐排第几个？`,
          formulas: [
            { id: "g2qv2-1", latex: `${total} - ${left} = ${rightCountExcludingSelf}\\text{ (人)}`, comment: "乐乐右边有几个人" },
            { id: "g2qv2-2", latex: `${rightCountExcludingSelf} + 1 = ${fromRight}\\text{ (个)}`, comment: "从右数到乐乐自己要 +1！" },
          ],
          steps: teachingSteps([
{ title: `从右数到乐乐，要不要数乐乐自己？`, narration: `全队 ${total} 人，从左数乐乐排第 ${left}。先看看乐乐右边，再想想从右数到乐乐时最后数的是谁。`, sceneState: { ...({
                kind: "number-line",
                layout: "track",
                totalLength: total,
                unitLabel: "人",
                highlightGap: {
                  fromRatio: left / (total - 1),
                  toRatio: 1,
                  label: `右边有 ${rightCountExcludingSelf} 人`,
                },
                queueNodes: Array.from({ length: total }).map((_, i) => ({
                  id: `qr-${i}`,
                  posRatio: i / (total - 1),
                  label: i === left - 1 ? "乐乐" : "",
                  role: i === left - 1 ? "overlap" : i >= left ? "target" : "excluded",
                })),
              }), hideLengthLabel: true }, activeFormulaIndices: [] },
{ title: `乐乐右边有几人？`, narration: `从总人数里减去左边数到乐乐的这一段，剩下的就是乐乐右边的人。他们有几个？`, sceneState: { ...({
                kind: "number-line",
                layout: "track",
                totalLength: total,
                unitLabel: "人",
                highlightGap: {
                  fromRatio: left / (total - 1),
                  toRatio: 1,
                  label: `右边有 ${rightCountExcludingSelf} 人`,
                },
                queueNodes: Array.from({ length: total }).map((_, i) => ({
                  id: `qr-${i}`,
                  posRatio: i / (total - 1),
                  label: i === left - 1 ? "乐乐" : "",
                  role: i === left - 1 ? "overlap" : i >= left ? "target" : "excluded",
                })),
              }), hideLengthLabel: true }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`乐乐右边有几人？`, rightCountExcludingSelf, ` 人`, `从左数到乐乐的那一段已经包括乐乐。`) },
{ title: `右边人数知道了，乐乐从右排第几？`, narration: `乐乐右边有 ${rightCountExcludingSelf} 人。继续从右数到乐乐本人，还要再数一次，排第几？`, sceneState: { ...({
                kind: "number-line",
                layout: "track",
                totalLength: total,
                unitLabel: "人",
                highlightGap: {
                  fromRatio: left / (total - 1),
                  toRatio: 1,
                  label: `右边有 ${rightCountExcludingSelf} 人`,
                },
                queueNodes: Array.from({ length: total }).map((_, i) => ({
                  id: `qr-${i}`,
                  posRatio: i / (total - 1),
                  label: i === left - 1 ? "乐乐" : "",
                  role: i === left - 1 ? "overlap" : i >= left ? "target" : "excluded",
                })),
              }), hideLengthLabel: true }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`乐乐从右往左数排第几个？`, fromRight, ` 个`, `右边人数加上乐乐自己。`) },
{ tag: `验证与回顾`, title: `右边有 ${rightCountExcludingSelf} 人，算上自己排第 ${fromRight}！`, narration: `总数 ${total} 减去左边的 ${left} 人（包含乐乐），算出乐乐右边有 ${rightCountExcludingSelf} 人。所以从右往左数，数完那 ${rightCountExcludingSelf} 人再数到乐乐，是第 ${rightCountExcludingSelf} + 1 = ${fromRight} 个！`, activeFormulaIndices: [0, 1], liveStats: [
                { label: "全排总人数", value: `${total} 人` },
                { label: "从左数乐乐", value: `第 ${left} 个` },
                { label: "乐乐右边有", value: `${rightCountExcludingSelf} 人` },
                { label: "从右数乐乐", value: `第 ${fromRight} 个`, tone: "coral" },
              ], sceneState: {
                kind: "number-line",
                layout: "track",
                totalLength: total,
                unitLabel: "人",
                highlightGap: {
                  fromRatio: left / (total - 1),
                  toRatio: 1,
                  label: `右边有 ${rightCountExcludingSelf} 人`,
                },
                queueNodes: Array.from({ length: total }).map((_, i) => ({
                  id: `qr-${i}`,
                  posRatio: i / (total - 1),
                  label: i === left - 1 ? "乐乐" : String(i + 1),
                  role: i === left - 1 ? "overlap" : i >= left ? "target" : "excluded",
                })),
              }, tipBody: `一边人数加自己，才是从这边排第几。` }
]),
        };
      },
    },
  ],
};
