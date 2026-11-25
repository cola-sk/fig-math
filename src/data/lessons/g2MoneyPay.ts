import { teachingSteps, numberCheckpoint } from "../teachingSteps";
import type { MathLesson } from "../../types/lesson";
export const g2MoneyPayLesson: MathLesson = {
  id: "g2-money-pay",
  chapterId: "g2-ordered-thinking",
  chapterTitle: "06. 有序思维训练",
  grade: 2,
  gradeLabel: "二年级",
  weekLabel: "p.65",
  title: "用人民币付钱问题（从大到小枚举）",
  summary:
    "有 5 元、2 元、1 元纸币，怎么付正好 8 元？记住“先用大面额，再用小面额”有序列表，一种也不漏！",
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
      modeLabel: "基础例题 · 付 8 元有几种方法",
      bookPart: "A版",
      tier: "base",
      title: "用 5 元、2 元、1 元付 8 元，一共有几种付法？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: {},
      paramDefs: [],
      build: () => ({
        problemStatement: `一本故事书 8 元钱。小敏手里有足够多的 5 元、2 元和 1 元纸币，如果正好付 8 元不找零，一共有多少种不同的付钱方法？`,
        formulas: [
          {
            id: "mp-1",
            latex: `\\text{用 1 张 5 元：} 3\\text{元} \\to 2\\text{种}`,
            comment: "5+2+1 或 5+1+1+1",
          },
          {
            id: "mp-2",
            latex: `\\text{用 0 张 5 元：} 8\\text{元} \\to 5\\text{种}`,
            comment: "2元分别用 4, 3, 2, 1, 0 张",
          },
          {
            id: "mp-3",
            latex: `2 + 5 = 7\\text{ (种)}`,
            comment: "合起来共 7 种付法",
          },
        ],
        steps: teachingSteps([
          {
            title: `先按哪张纸币来分情况？`,
            narration: `5 元、2 元、1 元纸币都足够，正好付 8 元。先想想 5 元纸币最多用几张，付钱的先后顺序不算新方法。`,
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              cards: [
                { id: `c0`, text: `5 元`, tone: "coral" },
                { id: `c1`, text: `2 元`, tone: "teal" },
                { id: `c2`, text: `1 元`, tone: "teal" },
              ],
              rows: [{ label: `正好付`, badge: `8 元`, active: true }],
              annotation: `按大面额的张数分类`,
            },
            activeFormulaIndices: [],
          },
          {
            title: `先用一张 5 元，剩下的怎样凑？`,
            narration: `还差 3 元，只用 2 元和 1 元。试试用 1 张 2 元，或者不用 2 元，各怎样补齐？有几种？`,
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              cards: [
                { id: `c0`, text: `5 元`, tone: "coral" },
                { id: `c1`, text: `还差 3 元`, tone: "teal" },
              ],
              rows: [
                { label: `用 1 张 2 元`, badge: `再补 ?`, active: true },
                { label: `不用 2 元`, badge: `用 1 元补齐`, active: true },
              ],
              annotation: ``,
            },
            activeFormulaIndices: [],
            checkpoint: numberCheckpoint(
              `用一张 5 元时，有几种付法？`,
              2,
              ` 种`,
              `剩下的 3 元，2 元纸币只能用一张或不用。`,
            ),
          },
          {
            title: `不用 5 元，按 2 元的张数往下试`,
            narration: `用 5 元时有 2 种。不用 5 元时，2 元纸币可以从最多 4 张往下减，每次剩下的用 1 元补齐。会有几种？`,
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              cards: [{ id: `c0`, text: `不用 5 元`, tone: "coral" }],
              rows: [
                { label: `2 元张数`, badge: `4、3、2、1、0`, active: true },
                { label: `1 元补足`, badge: `合计 8 元`, active: true },
              ],
              annotation: ``,
            },
            activeFormulaIndices: [0],
            checkpoint: numberCheckpoint(
              `不用 5 元时有几种付法？`,
              5,
              ` 种`,
              `每一种 2 元张数，对应一种 1 元张数。`,
            ),
          },
          {
            title: `两类都找齐了，总共有几种？`,
            narration: `用 5 元的有 2 种，不用 5 元的有 5 种。这两类会重复吗？把它们合起来，先算总数。`,
            sceneState: {
              kind: "combo-visual",
              mode: "money",
              cards: [
                { id: `c0`, text: `用 5 元：2 种`, tone: "coral" },
                { id: `c1`, text: `不用 5 元：5 种`, tone: "teal" },
              ],
              rows: [{ label: `合计`, badge: `? 种`, active: true }],
              annotation: ``,
            },
            activeFormulaIndices: [0, 1],
            checkpoint: numberCheckpoint(
              `全部共有几种付法？`,
              7,
              ` 种`,
              `两类没有重复，直接合起来。`,
            ),
          },
          {
            tag: `验证与回顾`,
            title: "两类合起来，共有 7 种付法",
            narration: `共有 7 种。用 5 元的两种是 5+2+1 和 5+1+1+1；不用 5 元的五种列在图上，每一行都正好付 8 元。`,
            tipTitle: "有序付钱口诀",
            tipBody:
              "从最大面额开始试，张数从多往少减，每种情况剩下用 1 元补！",
            activeFormulaIndices: [0, 1, 2],
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
              annotation:
                "不用 5 元有 5 种，加上前面的 2 种，一共有 7 种付法！",
            },
          },
        ]),
      }),
    },
    {
      id: "var-1",
      modeLabel: "拓展拔高 · 至少几张纸币",
      bookPart: "B版",
      tier: "challenge",
      title: "拓展拔高：买 27 元文具，最少要付几张纸币？",
      subtitle: "先观察条件，动手想一想，再逐步验证。",
      defaultParams: { price: 27 },
      paramDefs: [
        {
          key: "price",
          label: "文具价格",
          min: 23,
          max: 29,
          step: 1,
          unit: "元",
        },
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
            {
              id: "mpv-1",
              latex:
                `${price} = 10 + 10 + ${fiveCount > 0 ? "5 + " : ""}${twoCount > 0 ? "2".repeat(twoCount).split("").join("+") + (oneCount ? "+1" : "") : oneCount ? "1" : ""}`.replace(
                  /\+\s*$/,
                  "",
                ),
              comment: "尽量多用大面额 10 元、5 元",
            },
            {
              id: "mpv-2",
              latex: `\\text{最少张数} = ${totalNotes}\\text{ (张)}`,
              comment: "大面额优先",
            },
          ],
          steps: teachingSteps([
            {
              title: `想让张数少，先选哪种面额？`,
              narration: `书包 ${price} 元，有 10 元、5 元、2 元、1 元。用一张 10 元，可以代替好几张小面额，先试试看最多放几张。`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `10 元`, tone: "coral" },
                  { id: `c1`, text: `5 元`, tone: "teal" },
                  { id: `c2`, text: `2 元`, tone: "teal" },
                  { id: `c3`, text: `1 元`, tone: "teal" },
                ],
                rows: [{ label: `目标`, badge: `${price} 元`, active: true }],
                annotation: ``,
              },
              activeFormulaIndices: [],
            },
            {
              title: `先放两张 10 元，还差多少钱？`,
              narration: `已经付出 20 元，还差多少？剩下的金额先试 5 元，再试 2 元和 1 元，别付多了。`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `10 元`, tone: "coral" },
                  { id: `c1`, text: `10 元`, tone: "teal" },
                ],
                rows: [{ label: `还差`, badge: `? 元`, active: true }],
                annotation: ``,
              },
              activeFormulaIndices: [],
              checkpoint: numberCheckpoint(
                `还差多少元？`,
                price - 20,
                ` 元`,
                `从价格里减去已经付出的金额。`,
              ),
            },
            {
              title: `把剩下的凑齐，最少共几张？`,
              narration: `还差 ${price - 20} 元，可以用 ${fiveCount} 张 5 元、${twoCount} 张 2 元、${oneCount} 张 1 元。连同前面两张，一共几张？`,
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: `c0`, text: `10 元 × 2`, tone: "coral" },
                  { id: `c1`, text: `5 元 × ${fiveCount}`, tone: "teal" },
                  { id: `c2`, text: `2 元 × ${twoCount}`, tone: "teal" },
                  { id: `c3`, text: `1 元 × ${oneCount}`, tone: "teal" },
                ],
                rows: [{ label: `总张数`, badge: `? 张`, active: true }],
                annotation: ``,
              },
              activeFormulaIndices: [0],
              checkpoint: numberCheckpoint(
                `最少一共几张？`,
                totalNotes,
                ` 张`,
                `数的是纸币张数，不是面额之和。`,
              ),
            },
            {
              tag: `验证与回顾`,
              title: `优先用 10 元和 5 元，最少只需 ${totalNotes} 张！`,
              narration: `最少 ${totalNotes} 张。金额验算：20 + ${fiveCount} × 5 + ${twoCount} × 2 + ${oneCount} = ${price}。把一张 10 元或 5 元换成小面额都要更多张；零头里尽量用 2 元比只用 1 元张数少。`,
              activeFormulaIndices: [0, 1],
              liveStats: [
                { label: "商品价格", value: `${price} 元` },
                { label: "10元张数", value: "2 张" },
                {
                  label: "最少总张数",
                  value: `${totalNotes} 张`,
                  tone: "coral",
                },
              ],
              sceneState: {
                kind: "combo-visual",
                mode: "money",
                cards: [
                  { id: "n1", text: "10元×2", tone: "coral" },
                  ...(fiveCount > 0
                    ? [
                        {
                          id: "n2",
                          text: `5元×${fiveCount}`,
                          tone: "teal" as const,
                        },
                      ]
                    : []),
                  ...(twoCount > 0
                    ? [
                        {
                          id: "n3",
                          text: `2元×${twoCount}`,
                          tone: "blue" as const,
                        },
                      ]
                    : []),
                  ...(oneCount > 0
                    ? [
                        {
                          id: "n4",
                          text: `1元×${oneCount}`,
                          tone: "muted" as const,
                        },
                      ]
                    : []),
                ],
                rows: [
                  {
                    label: `大面额优先凑出 ${price} 元`,
                    badge: `最少 ${totalNotes} 张`,
                    active: true,
                  },
                ],
                annotation: `优先选大面额，最少只需 ${totalNotes} 张纸币！`,
              },
              tipBody: `先用大面额，再把零头凑；金额要正好，张数再数清。`,
            },
          ]),
        };
      },
    },
  ],
};
