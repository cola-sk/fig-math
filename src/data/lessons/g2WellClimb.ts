import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";
export const g2WellClimbLesson: MathLesson = {
  id: "g2-well-climb",
  chapterId: "g2-mapping-thinking",
  chapterTitle: "02. 对应思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.14",
  title: "爬井问题（蜗牛爬井周期）",
  summary:
    "白天往上爬、夜里往下滑！动画演给你看：最后一天白天一爬出井口，夜里就不会再滑下来了！",
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
      modeLabel: "基础例题 · 蜗牛爬井例题",
      bookPart: "A版",
      tier: "base",
      title: "10 米深井，白天爬 3 米夜里滑 2 米，几天爬出？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { wellDepth: 7, dayClimb: 3, nightSlide: 2 },
      paramDefs: [
        {
          key: "wellDepth",
          label: "井深",
          min: 5,
          max: 11,
          step: 1,
          unit: "米",
        },
        {
          key: "dayClimb",
          label: "白天向上爬",
          min: 3,
          max: 5,
          step: 1,
          unit: "米",
        },
        {
          key: "nightSlide",
          label: "夜里向下滑",
          min: 1,
          max: 2,
          step: 1,
          unit: "米",
        },
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
        return {
          problemStatement: `一口井深 ${depth} 米，一只小蜗牛从井底往上爬。它白天向上爬 ${day} 米，夜里向下滑 ${slide} 米。请问小蜗牛第几天能爬出井口？`,
          formulas: [
            {
              id: "wc-1",
              latex: `${day} - ${slide} = ${net}\\text{ (米/天)}`,
              comment: "每天昼夜实际净爬高度",
            },
            {
              id: "wc-2",
              latex: `${depth} - ${day} = ${preTarget}\\text{ (米)}`,
              comment: "预留最后1天白天冲刺的米数",
            },
            {
              id: "wc-3",
              latex: `${preTarget} \\div ${net} ${preTarget % net === 0 ? "=" : "\\approx"} ${Number((preTarget / net).toFixed(2))}\\text{，需 }${preDays}\\text{ 天（不足一天算一天）}`,
              comment: "前面需要爬的天数",
            },
            {
              id: "wc-4",
              latex: `${preDays} + 1 = ${totalDays}\\text{ (天)}`,
              comment: "加上最后爬出井口的第1天",
            },
          ],
          steps: teachingSteps([
            {
              title: `到了井口后，还会再滑回井里吗？`,
              narration: `井深 ${depth} 米，白天上升 ${day} 米，夜里滑下 ${slide} 米。先想一想，已经到井外的小动物，还需要经历井里的夜晚吗？`,
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: 0,
                trails: [],
                reserveTopBand: false,
                annotation: `白天先向上，到井口就结束`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `没有出井的日子，一昼夜升高几米？`,
              narration: `没到井口时，要先上升再滑下。请算一天一夜之后，比早上高了多少米。`,
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: trails[0].endH,
                trails: trails.slice(0, 1),
                reserveTopBand: false,
                annotation: `白天先向上，到井口就结束`,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `没出井时，一昼夜净上升多少米？`,
                net,
                ` 米`,
                `白天爬的减去夜里滑的，最后出井那天单独算。`,
              ),
            },
            {
              title: `最后一天前，至少要到哪里？`,
              narration: `普通一昼夜净升 ${net} 米。最后一天可以直接上升 ${day} 米，不再往下滑。要够到 ${depth} 米的井口，前一晚至少要到几米高？`,
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: trails[0].endH,
                trails: trails.slice(0, 1),
                reserveTopBand: true,
                annotation: `白天先向上，到井口就结束`,
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `最后一天前，至少要到几米高？`,
                preTarget,
                ` 米`,
                `从井深里先留出最后一个白天能爬的高度。`,
              ),
            },
            {
              title: `前面需要几天？别忘最后冲出井口的那天`,
              narration: `前面至少要升到 ${preTarget} 米，每个完整昼夜净升 ${net} 米，需要 ${preDays} 天；不足一天也要算一天。再加最后一个白天，是第几天？`,
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: trails[preDays - 1]?.endH ?? 0,
                trails: trails.slice(0, preDays),
                reserveTopBand: true,
                annotation: `白天先向上，到井口就结束`,
              },
              activeFormulaIndices: [0, 1],
              checkpoint: numberCheckpoint(
                `第几天能到井口？`,
                totalDays,
                ` 天`,
                `到井口的最后一天不再滑下，要单独加上。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `第 ${totalDays} 天白天直接爬出井口！`,
              narration: `第 ${totalDays} 天到达井口。顺着图逐天检查：最后一天从 ${trails[trails.length - 1].fromH} 米出发，再上升 ${day} 米就够到井口了。`,
              activeFormulaIndices: [0, 1, 2, 3],
              liveStats: [
                { label: "井深", value: `${depth} 米` },
                { label: "前面循环", value: `${preDays} 天` },
                { label: "最后冲刺", value: "1 天" },
                {
                  label: "出井总天数",
                  value: `第 ${totalDays} 天`,
                  tone: "teal",
                },
              ],
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: depth,
                trails: trails,
                reserveTopBand: true,
                annotation: `白天先向上，到井口就结束`,
              },
              tipBody: `普通昼夜算净升，最后白天不再滑。`,
            },
          ]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 有余数爬井",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：剩下高度除不尽怎么办？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { wellDepth: 10, dayClimb: 4, nightSlide: 2 },
      paramDefs: [
        {
          key: "wellDepth",
          label: "井深",
          min: 8,
          max: 14,
          step: 1,
          unit: "米",
        },
        {
          key: "dayClimb",
          label: "白天向上爬",
          min: 4,
          max: 5,
          step: 1,
          unit: "米",
        },
        {
          key: "nightSlide",
          label: "夜里向下滑",
          min: 2,
          max: 2,
          step: 1,
          unit: "米",
        },
      ],
      build: (params) => {
        const depth = params.wellDepth ?? 10;
        const day = params.dayClimb ?? 4;
        const slide = Math.min(day - 1, params.nightSlide ?? 2);
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
            {
              id: "wcv-1",
              latex: `${day} - ${slide} = ${net}\\text{ (米/天)}`,
              comment: "每天净上升",
            },
            {
              id: "wcv-2",
              latex: `${depth} - ${day} = ${preTarget}\\text{ (米)}`,
              comment: "最后1天之前至少要到的高度",
            },
            {
              id: "wcv-3",
              latex: `${preDays} + 1 = ${totalDays}\\text{ (天)}`,
              comment: "前面天数（有余数进1）+ 最后1天",
            },
          ],
          steps: teachingSteps([
            {
              title: `到了井口后，还会再滑回井里吗？`,
              narration: `井深 ${depth} 米，白天上升 ${day} 米，夜里滑下 ${slide} 米。先想一想，已经到井外的小动物，还需要经历井里的夜晚吗？`,
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: 0,
                trails: [],
                reserveTopBand: false,
                annotation: `白天先向上，到井口就结束`,
              },
              activeFormulaIndices: [],
            },
            {
              title: `没有出井的日子，一昼夜升高几米？`,
              narration: `没到井口时，要先上升再滑下。请算一天一夜之后，比早上高了多少米。`,
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: trails[0].endH,
                trails: trails.slice(0, 1),
                reserveTopBand: false,
                annotation: `白天先向上，到井口就结束`,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `没出井时，一昼夜净上升多少米？`,
                net,
                ` 米`,
                `白天爬的减去夜里滑的，最后出井那天单独算。`,
              ),
            },
            {
              title: `最后一天前，至少要到哪里？`,
              narration: `普通一昼夜净升 ${net} 米。最后一天可以直接上升 ${day} 米，不再往下滑。要够到 ${depth} 米的井口，前一晚至少要到几米高？`,
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: trails[0].endH,
                trails: trails.slice(0, 1),
                reserveTopBand: true,
                annotation: `白天先向上，到井口就结束`,
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `最后一天前，至少要到几米高？`,
                preTarget,
                ` 米`,
                `从井深里先留出最后一个白天能爬的高度。`,
              ),
            },
            {
              title: `前面需要几天？别忘最后冲出井口的那天`,
              narration: `前面至少要升到 ${preTarget} 米，每个完整昼夜净升 ${net} 米，需要 ${preDays} 天；不足一天也要算一天。再加最后一个白天，是第几天？`,
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: trails[preDays - 1]?.endH ?? 0,
                trails: trails.slice(0, preDays),
                reserveTopBand: true,
                annotation: `白天先向上，到井口就结束`,
              },
              activeFormulaIndices: [0, 1],
              checkpoint: numberCheckpoint(
                `第几天能到井口？`,
                totalDays,
                ` 天`,
                `到井口的最后一天不再滑下，要单独加上。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `一步步看轨迹：第 ${totalDays} 天跳出井口！`,
              narration: `第 ${totalDays} 天到达井口。顺着图逐天检查：最后一天从 ${trails[trails.length - 1].fromH} 米出发，再上升 ${day} 米就够到井口了。`,
              activeFormulaIndices: [0, 1, 2],
              liveStats: [
                { label: "井深", value: `${depth} 米` },
                { label: "每天净爬", value: `${net} 米` },
                {
                  label: "冲刺前高度",
                  value: `${trails[preDays - 1]?.endH ?? preTarget} 米`,
                },
                {
                  label: "跳出天数",
                  value: `第 ${totalDays} 天`,
                  tone: "teal",
                },
              ],
              sceneState: {
                kind: "well-climb",
                wellDepth: depth,
                dayClimb: day,
                nightSlide: slide,
                currentHeight: depth,
                trails: trails,
                reserveTopBand: true,
                annotation: `白天先向上，到井口就结束`,
              },
              tipBody: `普通昼夜算净升，最后白天不再滑。`,
            },
          ]),
        };
      },
    },
  ],
};
