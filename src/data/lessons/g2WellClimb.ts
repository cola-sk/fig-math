import type { MathLesson } from "../../types/lesson";

export const g2WellClimbLesson: MathLesson = {
  id: "g2-well-climb",
  chapterId: "g2-mapping-thinking",
  chapterTitle: "对应思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "第 14 页",
  title: "爬井问题（蜗牛爬井周期）",
  summary: "白天往上爬、夜里往下滑！动画演给你看：最后一天白天一爬出井口，夜里就不会再滑下来了！",
  engine: "well-climb",
  keywords: ["二年级", "爬井问题", "蜗牛爬井", "青蛙跳井", "对应思维", "周期"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "02. 对应思维训练",
      weekLabel: "p.14",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "蜗牛爬井例题",
      bookPart: "A版",
      tier: "base",
      title: "10 米深井，白天爬 3 米夜里滑 2 米，几天爬出？",
      subtitle: "红线代表白天向上爬，蓝虚线代表夜里向下滑",
      defaultParams: { wellDepth: 7, dayClimb: 3, nightSlide: 2 },
      paramDefs: [
        { key: "wellDepth", label: "井深", min: 5, max: 11, step: 1, unit: "米" },
        { key: "dayClimb", label: "白天向上爬", min: 3, max: 5, step: 1, unit: "米" },
        { key: "nightSlide", label: "夜里向下滑", min: 1, max: 2, step: 1, unit: "米" },
      ],
      build: (params) => {
        const depth = params.wellDepth ?? 7;
        const day = params.dayClimb ?? 3;
        const slide = Math.min(day - 1, params.nightSlide ?? 2);
        const net = day - slide;
        const preTarget = Math.max(0, depth - day);
        const preDays = Math.ceil(preTarget / net);
        const totalDays = preDays + 1;

        // Build exact day-by-day trails
        const trails: Array<{
          day: number;
          fromH: number;
          peakH: number;
          endH: number;
          escaped?: boolean;
        }> = [];
        let cur = 0;
        for (let d = 1; d <= totalDays; d++) {
          const peak = Math.min(depth, cur + day);
          const escaped = peak >= depth;
          const end = escaped ? depth : peak - slide;
          trails.push({ day: d, fromH: cur, peakH: peak, endH: end, escaped });
          cur = end;
          if (escaped) break;
        }

        const midDay = Math.max(1, Math.min(2, preDays));
        const midHeight = trails[midDay - 1]?.endH ?? net;

        return {
          problemStatement: `一口井深 ${depth} 米，一只小蜗牛从井底往上爬。它白天向上爬 ${day} 米，夜里向下滑 ${slide} 米。请问小蜗牛第几天能爬出井口？`,
          formulas: [
            { id: "wc-1", latex: `${day} - ${slide} = ${net}\\text{ (米/天)}`, comment: "每天昼夜实际净爬高度" },
            { id: "wc-2", latex: `${depth} - ${day} = ${preTarget}\\text{ (米)}`, comment: "预留最后1天白天冲刺的米数" },
            { id: "wc-3", latex: `${preTarget} \\div ${net} = ${preDays}\\text{ (天)}`, comment: "前面需要爬的天数" },
            { id: "wc-4", latex: `${preDays} + 1 = ${totalDays}\\text{ (天)}`, comment: "加上最后爬出井口的第1天" },
          ],
          steps: [
            {
              step: 1,
              tag: "看懂陷阱",
              title: `每天净爬 ${net} 米，但千万别直接用 ${depth} ÷ ${net}！`,
              narration: `小蜗牛一天一夜净向上爬 ${day} - ${slide} = ${net} 米。看井口橙色斜线区域：只要它爬到 ${preTarget} 米处，最后一天白天一口气爬 ${day} 米就直接出井了，夜里不会再滑下来！`,
              tipTitle: "爬井防坑口诀",
              tipBody: "先减最后一天白天爬的米数，再用剩下的除以净爬高度，最后加 1 天！",
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "井深", value: `${depth} 米` },
                { label: "每天净爬", value: `${net} 米`, tone: "blue" },
                { label: "最后1天冲刺", value: `${day} 米`, tone: "coral" },
                { label: "前几天要爬到", value: `${preTarget} 米` },
              ],
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: 0,
                trails: [],
                reserveTopBand: true,
                annotation: `先留出顶部 ${day} 米“最后冲刺区”，前面只需爬到 ${preTarget} 米！`,
              },
            },
            {
              step: 2,
              tag: "昼夜循环",
              title: `前 ${preDays} 天，白天爬 ${day} 米、夜里滑 ${slide} 米`,
              narration: `第 1 天到第 ${preDays} 天，小蜗牛反复“爬上去又滑下来”，到第 ${preDays} 天夜里结束时，它刚好停在 ${trails[preDays - 1]?.endH ?? preTarget} 米的位置！`,
              activeFormulaIndices: [2],
              liveStats: [
                { label: "已完成天数", value: `${preDays} 天` },
                { label: "当前高度", value: `${trails[preDays - 1]?.endH ?? midHeight} 米`, tone: "blue" },
                { label: "离井口还差", value: `${depth - (trails[preDays - 1]?.endH ?? midHeight)} 米`, tone: "coral" },
                { label: "总天数", value: "还差最后1天" },
              ],
              checkpoint: {
                question: `当小蜗牛在第 ${totalDays} 天白天爬到 ${depth} 米井口时，晚上还会往下滑吗？`,
                options: ["会再滑下去", "不会了，已经爬出井口啦！"],
                correctIndex: 1,
                feedbackCorrect: "答对了！爬出井口就站在地面上啦，再也不会滑下去！",
                feedbackWrong: "想想看：已经爬到井口外面了，就没有滑下去这回事啦！",
              },
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: trails[preDays - 1]?.endH ?? midHeight,
                trails: trails.slice(0, preDays),
                reserveTopBand: true,
                annotation: `第 ${preDays} 天结束时停在 ${trails[preDays - 1]?.endH ?? preTarget} 米，只差最后冲刺！`,
              },
            },
            {
              step: 3,
              tag: "成功出井",
              title: `第 ${totalDays} 天白天直接爬出井口！`,
              narration: `第 ${totalDays} 天白天，小蜗牛从 ${trails[preDays - 1]?.endH ?? preTarget} 米再向上爬 ${day} 米，直接冲出 ${depth} 米井口！一共用了 ${preDays} + 1 = ${totalDays} 天！`,
              activeFormulaIndices: [3],
              liveStats: [
                { label: "井深", value: `${depth} 米` },
                { label: "前面循环", value: `${preDays} 天` },
                { label: "最后冲刺", value: "1 天" },
                { label: "出井总天数", value: `第 ${totalDays} 天`, tone: "teal" },
              ],
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: depth,
                trails,
                reserveTopBand: true,
                annotation: `恭喜！第 ${totalDays} 天白天爬出井口（总用时 ${totalDays} 天）`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "有余数爬井",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：剩下高度除不尽怎么办？",
      subtitle: "有余数就要多等 1 天，千万别把小数点丢掉！",
      defaultParams: { wellDepth: 10, dayClimb: 4, nightSlide: 2 },
      paramDefs: [
        { key: "wellDepth", label: "井深", min: 8, max: 14, step: 1, unit: "米" },
        { key: "dayClimb", label: "白天向上爬", min: 4, max: 5, step: 1, unit: "米" },
        { key: "nightSlide", label: "夜里向下滑", min: 2, max: 2, step: 1, unit: "米" },
      ],
      build: (params) => {
        const depth = params.wellDepth ?? 10;
        const day = params.dayClimb ?? 4;
        const slide = params.nightSlide ?? 2;
        const net = day - slide;
        const preTarget = Math.max(0, depth - day);
        const preDays = Math.ceil(preTarget / net);
        const totalDays = preDays + 1;

        const trails: Array<{
          day: number;
          fromH: number;
          peakH: number;
          endH: number;
          escaped?: boolean;
        }> = [];
        let cur = 0;
        for (let d = 1; d <= totalDays; d++) {
          const peak = Math.min(depth, cur + day);
          const escaped = peak >= depth;
          const end = escaped ? depth : peak - slide;
          trails.push({ day: d, fromH: cur, peakH: peak, endH: end, escaped });
          cur = end;
          if (escaped) break;
        }

        return {
          problemStatement: `一只小青蛙从 ${depth} 米深的井底往上跳，每次白天跳 ${day} 米，夜里滑下 ${slide} 米。第几天能跳出井口？`,
          formulas: [
            { id: "wcv-1", latex: `${day} - ${slide} = ${net}\\text{ (米/天)}`, comment: "每天净上升" },
            { id: "wcv-2", latex: `${depth} - ${day} = ${preTarget}\\text{ (米)}`, comment: "最后1天之前至少要到的高度" },
            { id: "wcv-3", latex: `${preDays} + 1 = ${totalDays}\\text{ (天)}`, comment: "前面天数（有余数进1）+ 最后1天" },
          ],
          steps: [
            {
              step: 1,
              tag: "B版推演",
              title: `一步步看轨迹：第 ${totalDays} 天跳出井口！`,
              narration: `留出顶部 ${day} 米冲刺区，前 ${preDays} 天已经爬到 ${trails[preDays - 1]?.endH ?? preTarget} 米，第 ${totalDays} 天白天一跳就超过 ${depth} 米出井啦！`,
              activeFormulaIndices: [0, 1, 2],
              liveStats: [
                { label: "井深", value: `${depth} 米` },
                { label: "每天净爬", value: `${net} 米` },
                { label: "冲刺前高度", value: `${trails[preDays - 1]?.endH ?? preTarget} 米` },
                { label: "跳出天数", value: `第 ${totalDays} 天`, tone: "teal" },
              ],
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: depth,
                trails,
                reserveTopBand: true,
                annotation: `第 ${totalDays} 天白天跳出 ${depth} 米井口！`,
              },
            },
          ],
        };
      },
    },
  ],
};
