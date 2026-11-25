import { numberCheckpoint, teachingSteps } from "../teachingSteps";
import type { BookSectionKind, ComboVisualSceneState, DifficultyTier, LessonVariant, MathLesson } from "../../types/lesson";

type BookCalculation = {
  id: string;
  questionNo?: number;
  part?: number;
  kind: BookSectionKind;
  tier: DifficultyTier;
  terms: number[];
  rounded: number[];
};

const bookCalculations: BookCalculation[] = [
  { id: "example", part: 1, kind: "example", tier: "base", terms: [99, 16], rounded: [100, 16] },
  { id: "var-1", part: 2, kind: "example", tier: "base", terms: [166, -103], rounded: [166, -100] },
  { id: "q1-1", questionNo: 1, part: 1, kind: "warmup", tier: "base", terms: [66, 98], rounded: [66, 100] },
  { id: "q1-2", questionNo: 1, part: 2, kind: "warmup", tier: "base", terms: [99, 46], rounded: [100, 46] },
  { id: "q1-3", questionNo: 1, part: 3, kind: "warmup", tier: "base", terms: [85, -49], rounded: [85, -50] },
  { id: "q1-4", questionNo: 1, part: 4, kind: "warmup", tier: "base", terms: [184, -99], rounded: [184, -100] },
  { id: "q2-1", questionNo: 2, part: 1, kind: "warmup", tier: "base", terms: [99, 69], rounded: [100, 69] },
  { id: "q2-2", questionNo: 2, part: 2, kind: "warmup", tier: "base", terms: [79, 199], rounded: [79, 200] },
  { id: "q2-3", questionNo: 2, part: 3, kind: "warmup", tier: "base", terms: [199, -101], rounded: [200, -100] },
  { id: "q2-4", questionNo: 2, part: 4, kind: "warmup", tier: "base", terms: [198, -99], rounded: [200, -100] },
  { id: "q3-1", questionNo: 3, part: 1, kind: "practice", tier: "standard", terms: [123, -97], rounded: [123, -100] },
  { id: "q3-2", questionNo: 3, part: 2, kind: "practice", tier: "standard", terms: [103, -56], rounded: [100, -56] },
  { id: "q4-1", questionNo: 4, part: 1, kind: "practice", tier: "standard", terms: [97, 19, 4], rounded: [100, 19, 4] },
  { id: "q4-2", questionNo: 4, part: 2, kind: "practice", tier: "standard", terms: [103, 11, -4], rounded: [100, 11, -4] },
  { id: "q4-3", questionNo: 4, part: 3, kind: "practice", tier: "standard", terms: [101, -49, -2], rounded: [100, -50, -2] },
  { id: "q4-4", questionNo: 4, part: 4, kind: "practice", tier: "standard", terms: [99, -28, -1], rounded: [100, -28, -1] },
  { id: "q5", questionNo: 5, kind: "challenge", tier: "challenge", terms: [99, 98, 97, 6], rounded: [100, 100, 100, 6] },
  { id: "q6", questionNo: 6, kind: "challenge", tier: "challenge", terms: [9, 99, 999, 3], rounded: [10, 100, 1000, 3] },
  { id: "q7", questionNo: 7, kind: "challenge", tier: "challenge", terms: [12, 102, 1002, 10002], rounded: [10, 100, 1000, 10000] },
];

const sum = (terms: number[]) => terms.reduce((a, b) => a + b, 0);
const expression = (terms: number[]) => terms.map((term, i) => i === 0 ? `${term}` : `${term < 0 ? "−" : "+"} ${Math.abs(term)}`).join(" ");

function createCalculation(spec: BookCalculation): LessonVariant {
  const original = expression(spec.terms);
  const rounded = expression(spec.rounded);
  const temporary = sum(spec.rounded);
  const result = sum(spec.terms);
  const correction = result - temporary;
  const adjustment = `${correction < 0 ? "再减" : correction > 0 ? "再加" : "不用调"} ${correction === 0 ? "" : Math.abs(correction)}`.trim();
  const transformations = spec.terms.flatMap((term, i) => {
    const target = spec.rounded[i];
    if (term === target) return [];
    const diff = Math.abs(target - term);
    if (i === 0 || term > 0) {
      return [
        `${Math.abs(term)} 看成 ${Math.abs(target)}（${target > term ? `多加了 ${diff}，等会要减 ${diff}` : `少加了 ${diff}，等会要补 ${diff}`}）`,
      ];
    }
    return [
      `减去 ${Math.abs(term)} 看成减去 ${Math.abs(target)}（${Math.abs(target) > Math.abs(term) ? `多减了 ${diff}，等会要加回 ${diff}` : `少减了 ${diff}，等会要再减 ${diff}`}）`,
    ];
  });
  const changes = transformations.join("；");
  const adjustCards = spec.terms.flatMap((term, i) => {
    const target = spec.rounded[i];
    if (term === target) return [];
    const delta = term - target;
    return [
      {
        id: `adj-${i}`,
        text: `${Math.abs(term)}→${Math.abs(target)} (${delta < 0 ? `−${Math.abs(delta)}` : `+${delta}`})`,
        tone: delta < 0 ? ("coral" as const) : ("teal" as const),
      },
    ];
  });
  const modeLabel = spec.kind === "example" ? `小例题大发现（${spec.part}）` : `第 ${spec.questionNo} 题${spec.part ? `（${spec.part}）` : ""}`;
  const scene = (phase: number): ComboVisualSceneState => ({
    kind: "combo-visual",
    mode: "make-ten",
    annotation:
      phase === 0
        ? "找一找：哪些数离整十、整百或整千只差一点点？"
        : phase === 1
          ? "先用好算的整十、整百或整千数算一遍"
          : phase === 2
            ? `先算得 ${temporary}，再把多算或少算的调回来（${adjustment}）`
            : `凑整先算 + 调整变化 = ${result}`,
    cards:
      phase === 0
        ? spec.terms.map((term, i) => ({
            id: `n${i}`,
            text: `${i > 0 ? (term < 0 ? "− " : "+ ") : ""}${Math.abs(term)}`,
            tone: "blue" as const,
          }))
        : phase === 1
          ? spec.terms.flatMap((term, i) =>
              term === spec.rounded[i]
                ? []
                : [
                    {
                      id: `r${i}`,
                      text: `${Math.abs(term)} → ${Math.abs(spec.rounded[i])}`,
                      tone: "teal" as const,
                    },
                  ],
            )
          : adjustCards,
    rows:
      phase === 0
        ? [{ label: "原式", badge: `${original} = ?`, active: true }]
        : phase === 1
          ? [{ label: `凑整先算：${rounded}`, badge: "等于多少？", active: true }]
          : phase === 2
            ? [
                { label: `凑整结果：${rounded} = ${temporary}`, badge: "第一步" },
                { label: `接着调整：${temporary} ${correction < 0 ? "−" : "+"} ${Math.abs(correction)}`, badge: "结果是？", active: true },
              ]
            : [
                { label: `凑整先算：${rounded} = ${temporary}`, badge: "第一步" },
                { label: `调整还原：${temporary} ${correction < 0 ? "−" : "+"} ${Math.abs(correction)} = ${result}`, badge: "完成", active: true },
              ],
  });
  return {
    id: spec.id,
    modeLabel,
    bookPart: spec.tier === "challenge" ? "B版" : "A版",
    tier: spec.tier,
    sectionId: "discovery",
    sectionKind: spec.kind,
    questionNo: spec.questionNo,
    questionPart: spec.part,
    title: `${modeLabel}：${original}`,
    subtitle: "先凑整，再调整，最后检验。",
    defaultParams: {},
    paramDefs: [],
    build: () => ({
      problemStatement: `用简便方法计算：${original} = ？`,
      formulas: [
        { id: `${spec.id}-round`, latex: `${rounded.replaceAll("−", "-")} = ${temporary}`, comment: "先按整十、整百或整千计算" },
        { id: `${spec.id}-correct`, latex: `${temporary} ${correction < 0 ? "-" : "+"} ${Math.abs(correction)} = ${result}`, comment: "把凑整时的变化调整回来" },
      ],
      steps: teachingSteps([
        {
          title: "先观察：哪些数接近整十、整百或整千？",
          narration: `看看算式 ${original}，里面哪些数离整十、整百或整千只差一点点？把它们凑整会不会更好算？`,
          sceneState: scene(0),
          liveStats: [{ label: "原题算式", value: `${original} = ?`, tone: "coral" }],
        },
        {
          title: "先把凑整后的算式算出来，等于多少？",
          narration: `我们先把接近整十、整百或整千的数凑成整数，变成 ${rounded}。先别管多算还是少算，算一算 ${rounded} 等于多少？`,
          sceneState: scene(1),
          liveStats: [
            { label: "凑整先算", value: `${rounded} = ?`, tone: "coral" },
            { label: "最终结果", value: "?" },
          ],
          checkpoint: numberCheckpoint(`先算 ${rounded}，结果是多少？`, temporary, "", "整十、整百、整千相加减很好算哦！"),
        },
        {
          title: "凑整时多算还是少算了？怎样调回原题？",
          narration: `太棒了，${rounded} = ${temporary}！看变化：${changes}。合起来要${adjustment}，原题结果是多少？`,
          sceneState: scene(2),
          activeFormulaIndices: [0],
          liveStats: [
            { label: "凑整先算", value: `${temporary}`, tone: "teal" },
            { label: "需要调整", value: adjustment, tone: "coral" },
            { label: "最终结果", value: "?" },
          ],
          checkpoint: numberCheckpoint("调整之后，原题的结果是多少？", result, "", "记住：多加要减去，多减要补回，少减接着减！"),
        },
        {
          title: "揭晓答案，回头验算",
          narration: `${temporary} ${adjustment}，算出原式等于 ${result}。我们也可以顺着原式算一算，结果一模一样！`,
          sceneState: scene(3),
          activeFormulaIndices: [0, 1],
          liveStats: [
            { label: "凑整先算", value: `${temporary}` },
            { label: "调整还原", value: adjustment },
            { label: "原题结果", value: `${result}`, tone: "teal" },
          ],
          tipBody: "多加要减去，少加要补上；多减要补回，少减接着减。",
        },
      ]),
    }),
  };
}

export const g2FastCalcLesson: MathLesson = {
  id: "g2-fast-calc", chapterId: "g2-transform-thinking", chapterTitle: "05. 转化思维训练", grade: 2, gradeLabel: "二年级", weekLabel: "p.36",
  title: "简便计算", summary: "按原书练习接近整十、整百和整千的数，学会凑整与调整。", engine: "combo-visual", keywords: ["二年级", "简便计算", "转化思维", "凑整"],
  editionMappings: [{ edition: "doubanjiang", grade: 2, gradeLabel: "二年级", chapterTitle: "05. 转化思维训练", weekLabel: "p.36" }],
  sections: [{ id: "discovery", title: "小例题大发现", subtitle: "例题两小问及七道练习", pageRange: "p.36–39" }],
  variants: bookCalculations.map(createCalculation),
};
