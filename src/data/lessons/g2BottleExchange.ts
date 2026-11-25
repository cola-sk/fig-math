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
      modeLabel: "3 个空瓶换 1 瓶",
      bookPart: "A版",
      tier: "base",
      title: "买了 6 瓶汽水，3 个空瓶换 1 瓶，一共能喝几瓶？",
      subtitle: "第一轮喝 6 瓶得 6 个空瓶 → 换 2 瓶再喝 → 又得 2 个空瓶，还能借 1 还 1！",
      defaultParams: {
        bought: 6,
      },
      paramDefs: [
        { key: "bought", label: "先买几瓶汽水", min: 3, max: 12, step: 3, unit: "瓶" },
      ],
      build: (params) => {
        const bought = params.bought ?? 6;
        // 3 empty bottles -> 1 full bottle (with 1 empty left after drinking)
        // Simulate round by round without borrowing, then check if 2 left can borrow 1
        let totalDrunk = bought;
        let empties = bought;
        const round1 = Math.floor(empties / 3);
        totalDrunk += round1;
        empties = (empties % 3) + round1;
        const canBorrow = empties === 2;
        if (canBorrow) {
          totalDrunk += 1;
        }
        return {
          problemStatement: `超市做活动：3 个空汽水瓶可以免费换 1 瓶新汽水。小宇买了 ${bought} 瓶汽水，请问他最多一共能喝到多少瓶汽水？`,
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
          steps: [
            {
              step: 1,
              tag: "第 1 轮换购",
              title: `第 1 步：喝完 ${bought} 瓶得 ${bought} 个空瓶，先换 ${round1} 瓶`,
              narration: `先把买的 ${bought} 瓶喝完，手里有 ${bought} 个空瓶。因为 3 个空瓶换 1 瓶，所以 ${bought} ÷ 3 = ${round1} 瓶！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "先喝", value: `${bought} 瓶` },
                { label: "第 1 轮换到", value: `${round1} 瓶`, tone: "coral" },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                rows: [
                  { label: `买 ${bought} 瓶汽水喝完`, badge: `得 ${bought} 空瓶` },
                  { label: `${bought} 个空瓶 ÷ 3`, badge: `换 ${round1} 瓶新汽水`, active: true },
                ],
                annotation: `目前已经喝了 ${bought} + ${round1} = ${bought + round1} 瓶！`,
              },
            },
            {
              step: 2,
              tag: "继续换与借瓶",
              title: canBorrow
                ? `第 2 步：剩 2 个空瓶！借 1 瓶喝完再还空瓶 → 共 ${totalDrunk} 瓶`
                : `第 2 步：继续换购，最多喝 ${totalDrunk} 瓶`,
              narration: canBorrow
                ? `喝完这 ${round1} 瓶，手里正好剩 2 个空瓶！聪明的小宇跟老板借 1 个空瓶，凑成 3 个空瓶换 1 瓶新汽水，喝完再把空瓶还给老板！一共喝了 ${bought} + ${round1} + 1 = ${totalDrunk} 瓶！`
                : `把换来的汽水喝完，剩下的空瓶如果够 3 个就接着换，最后总共能喝到 ${totalDrunk} 瓶！`,
              tipTitle: "空瓶换水秘诀",
              tipBody: "3 个空瓶换 1 瓶水 = 2 个空瓶就能喝 1 份水（因为喝完还剩 1 个空瓶）！",
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "最多喝到", value: `${totalDrunk} 瓶`, tone: "teal" },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                rows: [
                  { label: `先买喝 ${bought} 瓶 + 第1轮换 ${round1} 瓶`, badge: `${bought + round1} 瓶` },
                  {
                    label: canBorrow ? "剩 2 空瓶：借 1 凑 3 换 1 瓶（喝完还瓶）" : `继续兑换完成`,
                    badge: `共 ${totalDrunk} 瓶！`,
                    active: true,
                  },
                ],
                annotation: `一共能喝到 ${totalDrunk} 瓶汽水！`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "至少买几瓶就够喝",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：12 个小朋友每人喝 1 瓶，至少要买几瓶？",
      subtitle: "4 个空瓶换 1 瓶，每买 3 瓶其实就能喝到 4 瓶（买 3 送 1）！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `如果 4 个空瓶可以换 1 瓶汽水，二（1）班有 12 个小朋友，每人喝 1 瓶汽水，至少需要买多少瓶？`,
        formulas: [
          { id: "be-3", latex: `\\text{买 3 瓶 + 借 1 空瓶} = \\text{喝 4 瓶}`, comment: "凑 4 个空瓶换第 4 瓶，喝完还 1 个空瓶" },
          { id: "be-4", latex: `12 \\div 4 \\times 3 = 9\\text{ (瓶)}`, comment: "每 4 人一组，只需买 3 瓶，共需买 9 瓶" },
        ],
        steps: [
          {
            step: 1,
            tag: "打包成 4 人一组",
            title: "第 1 步：每 4 个人为一组，只需买 3 瓶就能喝 4 瓶！",
            narration: `4 个空瓶换 1 瓶水，相当于 3 个空瓶就能喝 1 次水！给 4 个小朋友先买 3 瓶喝完，有 3 个空瓶；借 1 个空瓶凑 4 个换第 4 瓶，第 4 个小朋友喝完把空瓶还回去！`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "每组人数", value: "4 人" },
              { label: "每组只需买", value: "3 瓶", tone: "coral" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "买 3 瓶给前 3 人喝 → 得 3 个空瓶", badge: "喝 3 瓶" },
                { label: "借 1 空瓶凑 4 个 → 换第 4 瓶给第 4 人喝（还瓶）", badge: "共喝 4 瓶", active: true },
              ],
              annotation: "妙招：每买 3 瓶，就能让 4 个人每人喝到 1 瓶！",
            },
          },
          {
            step: 2,
            tag: "算出总购买数",
            title: "第 2 步：12 人分成 3 组 → 至少买 3 × 3 = 9 瓶！",
            narration: `12 个小朋友分成 12 ÷ 4 = 3 组，每组只要买 3 瓶，所以一共只需要买 3 × 3 = 9 瓶！`,
            activeFormulaIndices: [1],
            liveStats: [
              { label: "分成几组", value: "3 组" },
              { label: "至少要买", value: "9 瓶", tone: "teal" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "12 ÷ 4 = 3（组）", badge: "每组 4 人" },
                { label: "3 × 3 = 9（瓶）", badge: "只需买 9 瓶！", active: true },
              ],
              annotation: "验证：买 9 瓶得 9 空瓶→换 2 瓶剩 1 空瓶（共 3 空瓶）→借 1 换 1 瓶→9+2+1 = 12 瓶！",
            },
          },
        ],
      }),
    },
  ],
};
