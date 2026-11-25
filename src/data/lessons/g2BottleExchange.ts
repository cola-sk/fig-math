import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";

export const g2BottleExchangeLesson: MathLesson = {
  id: "g2-bottle-exchange",
  chapterId: "g2-divergent-thinking",
  chapterTitle: "10. 发散思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.114",
  title: "换购问题（空瓶换汽水，还能借 1 个瓶子？）",
  summary: "喝完汽水留下的空瓶还能继续换新汽水！一轮一轮把空瓶换下去，最后不够换时还能跟老板“借 1 喝完还 1”！",
  engine: "combo-visual",
  keywords: ["二年级", "换购问题", "空瓶换水", "发散思维", "借空瓶"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "10. 发散思维训练",
      weekLabel: "p.114",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "基础例题 · 3 个空瓶换 1 瓶",
      bookPart: "A版",
      tier: "base",
      title: "买了 6 瓶汽水，3 个空瓶换 1 瓶，一共能喝几瓶？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {
        bought: 6,
      },
      paramDefs: [
        { key: "bought", label: "先买几瓶汽水", min: 3, max: 12, step: 3, unit: "瓶" },
      ],
      build: (params) => {
        const bought = params.bought ?? 6;
        let totalDrunk = bought;
        let empties = bought;
        const round1 = Math.floor(empties / 3);
        totalDrunk += round1;
        empties = (empties % 3) + round1;
        const afterFirst = empties;
        const round2 = Math.floor(empties / 3);
        while (empties >= 3) {
          const exchanged = Math.floor(empties / 3);
          totalDrunk += exchanged;
          empties = (empties % 3) + exchanged;
        }
        const canBorrow = empties === 2;
        if (canBorrow) totalDrunk += 1;
        return {
          problemStatement: `超市做活动：3 个空汽水瓶可以免费换 1 瓶新汽水。小宇买了 ${bought} 瓶汽水，请问他最多一共能喝到多少瓶汽水？允许向店主借空瓶，喝完必须还清。`,
          formulas: [
            { id: "be-1", latex: `\\text{第 1 轮：买 } ${bought} \\text{ 瓶} \\to ${bought} \\text{ 个空瓶} \\to \\text{换 } ${round1} \\text{ 瓶}`, comment: "喝完第 1 轮再去换新汽水" },
            {
              id: "be-2",
              latex: canBorrow
                ? `\\text{借 1 凑 3 换 1 瓶，喝完正好还 1 个空瓶！}`
                : `\\text{还剩 } ${empties} \\text{ 个空瓶，继续换直到不足 2 个}`,
              comment: `一共喝到 ${totalDrunk} 瓶`,
            },
          ],
          steps: teachingSteps([
{ title: `喝完一瓶后，手里还会留下什么？`, narration: `先买 ${bought} 瓶，3 个空瓶换 1 瓶新汽水。题目允许借空瓶，但喝完必须还清。先想一想，换来的汽水喝完后有没有空瓶？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `🥤 买 ${bought} 瓶`, tone: "coral" },{ id: `c1`, text: `3 空瓶 → 1 瓶`, tone: "teal" }], rows: [], annotation: `一轮一轮记录，借的瓶必须归还` }, activeFormulaIndices: [] },
{ title: `先用买来的空瓶，第一轮能换几瓶？`, narration: `先喝完买来的 ${bought} 瓶，就得到 ${bought} 个空瓶。每 3 个换一瓶，第一轮能换几瓶？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `${bought} 个空瓶`, tone: "coral" },{ id: `c1`, text: `每 3 个换 1 瓶`, tone: "teal" }], rows: [{ label: `第一轮换到`, badge: `? 瓶`, active: true }], annotation: `` }, activeFormulaIndices: [], checkpoint: numberCheckpoint(`第一轮能换几瓶？`, round1, ` 瓶`, `只有凑够一组空瓶，才能换一瓶。`) },
{ title: `第一轮后还有空瓶，下一轮够换几瓶？`, narration: `第一轮换到 ${round1} 瓶。喝完后，加上没用掉的空瓶，手里有 ${afterFirst} 个。继续按 3 个一组，还能换几瓶？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `第一轮换 ${round1} 瓶`, tone: "coral" },{ id: `c1`, text: `现在有 ${afterFirst} 空瓶`, tone: "teal" }], rows: [{ label: `下一轮能换`, badge: `? 瓶`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`不用借瓶，下一轮还能换几瓶？`, round2, ` 瓶`, `换来的每瓶喝完，都会留下一个空瓶。`) },
{ title: `普通兑换结束了，借瓶后还能多喝吗？`, narration: `${round2 > 0 ? "第二轮又换到 " + round2 + " 瓶。" : "空瓶不足 3 个，普通兑换结束。"}最后有 ${empties} 个空瓶。${canBorrow ? "借 1 个凑齐 3 个，换 1 瓶喝完，再把新空瓶还回去。" : "只剩 1 个，借 1 个还凑不齐 3 个，无法这样继续。"}把先买的和每轮换的合起来，总共喝几瓶？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `普通兑换后 ${empties} 空瓶`, tone: "coral" }], rows: [{ label: `借瓶并还清`, badge: `${canBorrow ? "还能多喝 1 瓶" : "不能再多喝"}`, active: true },{ label: `合计喝到`, badge: `? 瓶`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`一共最多喝到几瓶？`, totalDrunk, ` 瓶`, `每轮换到的都加上，借的空瓶不能算汽水。`) },
{ title: `逐轮检查，总数和空瓶都对上了吗？`, narration: `一共喝 ${totalDrunk} 瓶。验算各轮：先买 ${bought}，第一轮换 ${round1}，第二轮换 ${round2}，借瓶多喝 ${canBorrow ? 1 : 0}，合计 ${totalDrunk}。最后借的空瓶已归还。`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `先买 ${bought}`, tone: "coral" },{ id: `c1`, text: `第一轮 ${round1}`, tone: "teal" },{ id: `c2`, text: `第二轮 ${round2}`, tone: "teal" },{ id: `c3`, text: `借瓶 ${canBorrow ? 1 : 0}`, tone: "teal" }], rows: [{ label: `共喝到`, badge: `${totalDrunk} 瓶`, active: true },{ label: `借瓶`, badge: `已还清`, active: true }], annotation: `` }, activeFormulaIndices: [0, 1], tipTitle: `记住这个小办法`, tipBody: `喝完空瓶再入账，够一组才换一瓶；借瓶可以想，归还要算清。`, liveStats: [{ label: `最多喝到`, value: `${totalDrunk} 瓶` }] }
]),
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 至少买几瓶就够喝",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：12 个小朋友每人喝 1 瓶，至少要买几瓶？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `如果 4 个空瓶可以换 1 瓶汽水，二（1）班有 12 个小朋友，每人喝 1 瓶汽水，至少需要买多少瓶？允许向店主借空瓶，喝完必须还清。`,
        formulas: [
          { id: "be-3", latex: `\\text{买 3 瓶 + 借 1 空瓶} = \\text{喝 4 瓶}`, comment: "凑 4 个空瓶换第 4 瓶，喝完还 1 个空瓶" },
          { id: "be-4", latex: `12 \\div 4 \\times 3 = 9\\text{ (瓶)}`, comment: "每 4 人一组，只需买 3 瓶，共需买 9 瓶" },
        ],
        steps: teachingSteps([
{ title: `只买的瓶数，等于能喝的总瓶数吗？`, narration: `4 个空瓶换 1 瓶，12 个小朋友每人喝 1 瓶。允许借空瓶但必须还清，先想想能不能少买一点。`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `12 人各喝 1 瓶`, tone: "coral" },{ id: `c1`, text: `4 空瓶换 1 瓶`, tone: "teal" }], rows: [], annotation: `求至少买几瓶，借瓶必须还清` }, activeFormulaIndices: [] },
{ title: `先试四人一组，买三瓶够不够？`, narration: `先买 3 瓶，喝完得到 3 个空瓶。还差 1 个就能换下一瓶。试着借 1 个，换来喝完后，能还清吗？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `买 3 瓶 → 3 空瓶`, tone: "coral" },{ id: `c1`, text: `借 1 空瓶 → 凑 4`, tone: "teal" }], rows: [{ label: `换来喝完后`, badge: `能还吗？`, active: true }], annotation: `` }, activeFormulaIndices: [], checkpoint: { question: `换来的汽水喝完，能归还借的一个空瓶吗？`, options: ["能，喝完会有一个空瓶", "不能，还需要买一瓶"], correctIndex: 0, feedbackCorrect: `对，喝完换来的汽水，就有空瓶可以归还。`, feedbackWrong: `别忘换来的汽水喝完也会留下空瓶。` } },
{ title: `每四人只买三瓶，十二人要买几瓶？`, narration: `这样每买 3 瓶，可以让 4 人各喝 1 瓶。12 人分成 3 组，每组买 3 瓶，一共至少买几瓶？`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `4 人一组`, tone: "coral" },{ id: `c1`, text: `每组买 3 瓶`, tone: "teal" },{ id: `c2`, text: `共 3 组`, tone: "teal" }], rows: [{ label: `需要买`, badge: `? 瓶`, active: true }], annotation: `` }, activeFormulaIndices: [0], checkpoint: numberCheckpoint(`至少需要买几瓶？`, 9, ` 瓶`, `按 4 人一组，每组只买 3 瓶。`) },
{ title: `买九瓶能喝够，再试八瓶为什么不够`, narration: `买 9 瓶：9 个空瓶换 2 瓶，喝完和余下的合成 3 个空瓶；再借 1 个换 1 瓶，喝完还瓶，共 12 瓶。若只买 8 瓶，每换喝 1 瓶，空瓶净少 3 个；借瓶还清后，8 个空瓶最多支持再喝 2 瓶，只够 10 瓶。`, sceneState: { kind: "combo-visual", mode: "money", cards: [{ id: `c0`, text: `买 9 瓶：9 + 2 + 1`, tone: "coral" }], rows: [{ label: `共喝`, badge: `12 瓶`, active: true },{ label: `买 8 瓶：8 + 2`, badge: `只够 10 瓶`, active: true }], annotation: `` }, activeFormulaIndices: [0, 1], tipTitle: `记住这个小办法`, tipBody: `能喝够还要比少买一瓶，才能说明是“至少”。`, liveStats: [{ label: `至少买`, value: `9 瓶` }] }
]),
      }),
    },
  ],
};
