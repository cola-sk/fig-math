import type { MathLesson } from "../../types/lesson";

export const g2MoneyPayLesson: MathLesson = {
  id: "g2-money-pay",
  chapterId: "g2-ordered-thinking",
  chapterTitle: "06. 有序思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.65",
  title: "用人民币付钱问题（从大到小枚举）",
  summary: "有 5 元、2 元、1 元纸币，怎么付正好 8 元？记住“先用大面额，再用小面额”有序列表，一种也不漏！",
  engine: "combo-visual",
  keywords: ["二年级", "人民币付钱", "有序枚举", "有序思维", "凑钱"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 2,
      gradeLabel: "二年级",
      chapterTitle: "06. 有序思维训练",
      weekLabel: "p.65",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "付 8 元有几种方法",
      bookPart: "A版",
      tier: "base",
      title: "用 5 元、2 元、1 元付 8 元，一共有几种付法？",
      subtitle: "先决定用几张 5 元（1 张或 0 张），再从多到少配 2 元！",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `一本故事书 8 元钱。小敏手里有足够多的 5 元、2 元和 1 元纸币，如果正好付 8 元不找零，一共有多少种不同的付钱方法？`,
        formulas: [
          { id: "mp-1", latex: `\\text{用 1 张 5 元：} 3\\text{元} \\to 2\\text{种}`, comment: "5+2+1 或 5+1+1+1" },
          { id: "mp-2", latex: `\\text{用 0 张 5 元：} 8\\text{元} \\to 5\\text{种}`, comment: "2元分别用 4, 3, 2, 1, 0 张" },
          { id: "mp-3", latex: `2 + 5 = 7\\text{ (种)}`, comment: "合起来共 7 种付法" },
        ],
        steps: [
          {
            step: 1,
            tag: "先用 5 元",
            title: "第 1 步：用 1 张 5 元（还差 3 元）→ 2 种",
            narration: `付钱枚举一定要“先大后小”！如果先拿 1 张 5 元，只需凑剩下的 3 元：可以是 1 张 2 元 + 1 张 1 元，或者 3 张 1 元（共 2 种）。`,
            activeFormulaIndices: [0],
            liveStats: [
              { label: "目标金额", value: "8 元" },
              { label: "用1张5元", value: "2 种", tone: "coral" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              cards: [
                { id: "m1", text: "5元", tone: "coral" },
                { id: "m2", text: "2元", tone: "teal" },
                { id: "m3", text: "1元", tone: "blue" },
              ],
              rows: [
                { label: "方法1：5元×1 + 2元×1 + 1元×1", badge: "= 8元", active: true },
                { label: "方法2：5元×1 + 1元×3", badge: "= 8元", active: true },
              ],
              annotation: "先固定最大的 5 元（用 1 张）：找到 2 种方法",
            },
          },
          {
            step: 2,
            tag: "不用 5 元",
            title: "第 2 步：不用 5 元，只用 2 元和 1 元 → 5 种",
            narration: `不用 5 元时，2 元纸币从最多（4 张）往下减，依次用 4、3、2、1、0 张，剩下的全用 1 元补齐，刚好 5 种！合起来一共 2 + 5 = 7 种！`,
            tipTitle: "有序付钱口诀",
            tipBody: "从最大面额开始试，张数从多往少减，每种情况剩下用 1 元补！",
            activeFormulaIndices: [1, 2],
            liveStats: [
              { label: "用1张5元", value: "2 种" },
              { label: "用0张5元", value: "5 种", tone: "teal" },
              { label: "付钱总方案", value: "7 种", tone: "coral" },
            ],
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              rows: [
                { label: "方法3：2元×4", badge: "= 8元", active: true },
                { label: "方法4：2元×3 + 1元×2", badge: "= 8元", active: true },
                { label: "方法5：2元×2 + 1元×4", badge: "= 8元", active: true },
                { label: "方法6：2元×1 + 1元×6", badge: "= 8元", active: true },
                { label: "方法7：1元×8", badge: "= 8元", active: true },
              ],
              annotation: "不用 5 元有 5 种，加上前面的 2 种，一共有 7 种付法！",
            },
          },
        ],
      }),
    },
    {
      id: "var-1",
      modeLabel: "至少几张纸币",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展提高：买 27 元文具，最少要付几张纸币？",
      subtitle: "想要张数最少，就要尽量多用大面额纸币！",
      defaultParams: { price: 27 },
      paramDefs: [
        { key: "price", label: "文具价格", min: 23, max: 29, step: 1, unit: "元" },
      ],
      build: (params) => {
        const price = params.price ?? 27;
        const ones = price % 5;
        const fiveCount = Math.floor((price - 20) / 5);
        const twoCount = Math.floor(ones / 2);
        const oneCount = ones % 2;
        const totalNotes = 2 + fiveCount + twoCount + oneCount;

        return {
          problemStatement: `买一个 ${price} 元的书包，手里有 10 元、5 元、2 元、1 元纸币，想使付出的纸币“张数最少”，最少需要付几张？`,
          formulas: [
            { id: "mpv-1", latex: `${price} = 10 + 10 + ${fiveCount > 0 ? "5 + " : ""}${twoCount > 0 ? "2".repeat(twoCount).split("").join("+") + (oneCount ? "+1" : "") : oneCount ? "1" : ""}`.replace(/\+\s*$/, ""), comment: "尽量多用大面额 10 元、5 元" },
            { id: "mpv-2", latex: `\\text{最少张数} = ${totalNotes}\\text{ (张)}`, comment: "大面额优先" },
          ],
          steps: [
            {
              step: 1,
              tag: "贪心凑整",
              title: `优先用 10 元和 5 元，最少只需 ${totalNotes} 张！`,
              narration: `想要张数最少，就优先用面值最大的 10 元（用 2 张 = 20 元），剩下的 ${price - 20} 元尽量用 5 元、2 元、1 元，一共只需 ${totalNotes} 张！`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "商品价格", value: `${price} 元` },
                { label: "10元张数", value: "2 张" },
                { label: "最少总张数", value: `${totalNotes} 张`, tone: "coral" },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: "n1", text: "10元×2", tone: "coral" },
                  ...(fiveCount > 0 ? [{ id: "n2", text: `5元×${fiveCount}`, tone: "teal" as const }] : []),
                  ...(twoCount > 0 ? [{ id: "n3", text: `2元×${twoCount}`, tone: "blue" as const }] : []),
                  ...(oneCount > 0 ? [{ id: "n4", text: `1元×${oneCount}`, tone: "muted" as const }] : []),
                ],
                rows: [
                  { label: `大面额优先凑出 ${price} 元`, badge: `最少 ${totalNotes} 张`, active: true },
                ],
                annotation: `优先选大面额，最少只需 ${totalNotes} 张纸币！`,
              },
            },
          ],
        };
      },
    },
  ],
};
