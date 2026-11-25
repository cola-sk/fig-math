import type {
  DifficultyTier,
  EditionId,
  GradeFilter,
  GradeNumber,
  MathLesson,
  TierFilter,
} from "../../types/lesson";
import { chickenRabbitLesson } from "./chickenRabbit";
import { g2BottleExchangeLesson } from "./g2BottleExchange";
import { g2BusRideLesson } from "./g2BusRide";
import { g2CombinationLesson } from "./g2Combination";
import { g2CountAnglesLesson } from "./g2CountAngles";
import { g2CountFiguresLesson } from "./g2CountFigures";
import { g2CountSegmentsLesson } from "./g2CountSegments";
import { g2FastCalcLesson } from "./g2FastCalc";
import { g2HalfProblemLesson } from "./g2HalfProblem";
import { g2IntervalsLesson } from "./g2Intervals";
import { g2LogicClueLesson } from "./g2LogicClue";
import { g2MatchstickLesson } from "./g2Matchstick";
import { g2MathPuzzleLesson } from "./g2MathPuzzle";
import { g2MeasureCleverLesson } from "./g2MeasureClever";
import { g2MirrorClockLesson } from "./g2MirrorClock";
import { g2MoneyPayLesson } from "./g2MoneyPay";
import { g2MoveBalanceLesson } from "./g2MoveBalance";
import { g2NumberSeqLesson } from "./g2NumberSeq";
import { g2ObserveShapesLesson } from "./g2ObserveShapes";
import { g2PairingLesson } from "./g2Pairing";
import { g2PermutationLesson } from "./g2Permutation";
import { g2QueueOverlapLesson } from "./g2QueueOverlap";
import { g2SeesawLesson } from "./g2Seesaw";
import { g2ShapePatternLesson } from "./g2ShapePattern";
import { g2SubstitutionLesson } from "./g2Substitution";
import { g2VennOverlapLesson } from "./g2VennOverlap";
import { g2WellClimbLesson } from "./g2WellClimb";
import { g2WrongCalcLesson } from "./g2WrongCalc";
import { motionMeetLesson } from "./motionMeet";
import { perimeterShiftLesson } from "./perimeterShift";
import { sumDiffLesson } from "./sumDiff";
import { sumMultipleLesson } from "./sumMultiple";
import { treePlantingLesson } from "./treePlanting";

export const LESSONS: MathLesson[] = [
  // 二年级《数学思维训练》（斗半匠）完整目录顺序（第 1 页 + 第 2 页）
  g2QueueOverlapLesson,   // 01. 整体思维 · 排队问题 p.2
  g2BusRideLesson,        // 01. 整体思维 · 乘车问题 p.6
  g2IntervalsLesson,      // 02. 对应思维 · 爬楼/间隔 p.10
  g2WellClimbLesson,      // 02. 对应思维 · 爬井问题 p.14
  treePlantingLesson,     // 02. 对应思维 · 植树问题 p.17
  g2VennOverlapLesson,    // 03. 集合思维 · 重叠问题 p.21
  g2ObserveShapesLesson,  // 04. 形象思维 · 观察/数方块图形 p.28
  g2MirrorClockLesson,    // 04. 形象思维 · 镜面问题 p.32
  g2FastCalcLesson,       // 05. 转化思维 · 简便计算 p.36
  sumDiffLesson,          // 05. 转化思维 · 和差问题 p.40
  g2CountSegmentsLesson,  // 06. 有序思维 · 数线段 p.46
  g2CountAnglesLesson,    // 06. 有序思维 · 数角 p.49
  g2CountFiguresLesson,   // 06. 有序思维 · 数图形 p.52
  g2PermutationLesson,    // 06. 有序思维 · 排列问题 p.56
  g2PairingLesson,        // 06. 有序思维 · 搭配问题 p.59
  g2CombinationLesson,    // 06. 有序思维 · 组合问题 p.62
  g2MoneyPayLesson,       // 06. 有序思维 · 用人民币付钱 p.65
  g2SeesawLesson,         // 07. 代换思维 · 跷跷板的奥秘 p.69
  g2SubstitutionLesson,   // 07. 代换思维 · 等量代换 p.72
  g2HalfProblemLesson,    // 08. 逆向思维 · 一半问题 p.77
  g2WrongCalcLesson,      // 08. 逆向思维 · 错中求解 p.80
  g2MoveBalanceLesson,    // 08. 逆向思维 · 移多补少 p.84
  g2MathPuzzleLesson,     // 09. 推理思维 · 算式谜 p.89
  g2LogicClueLesson,      // 09. 推理思维 · 条件推理 p.93
  g2NumberSeqLesson,      // 09. 推理思维 · 数字推理 p.97
  g2ShapePatternLesson,   // 09. 推理思维 · 图形推理 p.102
  g2MeasureCleverLesson,  // 10. 发散思维 · 巧妙测量 p.107
  g2MatchstickLesson,     // 10. 发散思维 · 火柴谜 p.111
  g2BottleExchangeLesson, // 10. 发散思维 · 换购问题 p.114
  // 三～四年级拓展专题
  chickenRabbitLesson,
  sumMultipleLesson,
  motionMeetLesson,
  perimeterShiftLesson,
];

export interface EditionMeta {
  id: EditionId;
  name: string;
  shortName: string;
  publisher: string;
  ready: boolean;
  description: string;
}

export const EDITION_CATALOG: EditionMeta[] = [
  {
    id: "doubanjiang",
    name: "《数学思维训练》（斗半匠）",
    shortName: "数学思维训练（斗半匠）",
    publisher: "二十一世纪出版社 · 新版 2.0",
    ready: true,
    description: "按整体、对应、集合、形象、转化、有序思维编排",
  },
  {
    id: "xueersi",
    name: "《学而思秘籍》",
    shortName: "学而思（预留）",
    publisher: "12级模块化培优体系",
    ready: false,
    description: "模块化培优体系（待映射）",
  },
  {
    id: "gaosi",
    name: "《高斯数学导引》",
    shortName: "高斯导引（预留）",
    publisher: "高思1~5星分层母题库",
    ready: false,
    description: "竞赛星级分层题库映射（待映射）",
  },
  {
    id: "keben",
    name: "《从课本到奥数》",
    shortName: "课本到奥数（预留）",
    publisher: "华师大 · 同步浅奥入门",
    ready: false,
    description: "贴合校内进度的浅奥入门映射（待映射）",
  },
];

export const TIER_CATALOG: Array<{
  value: TierFilter;
  label: string;
  stars: string;
}> = [
  { value: "all", label: "全部层级", stars: "" },
  { value: "base", label: "基础例题", stars: "★" },
  { value: "standard", label: "举一反三", stars: "★★" },
  { value: "challenge", label: "拓展拔高", stars: "★★★" },
];

export const TIER_BADGE_MAP: Record<
  DifficultyTier,
  { label: string; stars: string; tone: "teal" | "blue" | "coral" }
> = {
  base: { label: "基础例题", stars: "★", tone: "teal" },
  standard: { label: "举一反三", stars: "★★", tone: "blue" },
  challenge: { label: "拓展拔高", stars: "★★★", tone: "coral" },
};

export interface GradeMeta {
  value: GradeFilter;
  label: string;
  shortLabel: string;
  tagline: string;
  plannedTopics: string[];
}

export const GRADE_CATALOG: GradeMeta[] = [
  {
    value: "all",
    label: "全部年级",
    shortLabel: "全部",
    tagline: "浏览《数学思维训练》（斗半匠）已上线的全套奥数动图专题",
    plannedTopics: [],
  },
  {
    value: "1",
    label: "一年级",
    shortLabel: "一年级",
    tagline: "《数学思维训练》（斗半匠）一年级 · 数感启蒙与图形观察",
    plannedTopics: [
      "比一比（长短/轻重/多少）",
      "几和第几（前后排队位置）",
      "认识平面与立体图形",
      "移多补少入门",
      "单数与双数的秘密",
      "巧算凑十与破十",
    ],
  },
  {
    value: "2",
    label: "二年级",
    shortLabel: "二年级",
    tagline: "《数学思维训练》（斗半匠）二年级 · 排队、乘车、爬楼、爬井、植树、重叠与和差",
    plannedTopics: [
      "排队问题（重叠计数 / 之间几人）",
      "爬楼问题 & 锯木头（间隔思维）",
      "爬井问题（蜗牛爬井周期）",
      "植树问题（两端/不栽/环形）",
      "重叠问题（足球/篮球韦恩图）",
      "乘车问题 & 移多补少",
    ],
  },
  {
    value: "3",
    label: "三年级",
    shortLabel: "三年级",
    tagline: "《数学思维训练》（斗半匠）三年级 · 线段图、假设替换与倍数模型",
    plannedTopics: [
      "和差问题（去多补齐法）",
      "和倍与差倍问题",
      "植树问题（点与段的秘密）",
      "鸡兔同笼（假设替换法）",
    ],
  },
  {
    value: "4",
    label: "四年级",
    shortLabel: "四年级",
    tagline: "《数学思维训练》（斗半匠）四年级 · 行程模型与几何平移割补",
    plannedTopics: [
      "巧求周长（平移变形法）",
      "行程问题（相遇与追及）",
    ],
  },
  {
    value: "5",
    label: "五年级",
    shortLabel: "五年级",
    tagline: "《数学思维训练》（斗半匠）五年级 · 等积变形、牛吃草与数论",
    plannedTopics: [
      "等积变形与一半模型",
      "牛吃草动态消耗模型",
      "流水行船与火车过桥",
      "分解质因数与同余问题",
    ],
  },
  {
    value: "6",
    label: "六年级",
    shortLabel: "六年级",
    tagline: "《数学思维训练》（斗半匠）六年级 · 分数工程、圆与扇形、浓度配比",
    plannedTopics: [
      "工程问题（单位 1 进度条）",
      "圆与扇形容斥割补",
      "十字交叉浓度配比",
      "行程综合与变速问题",
    ],
  },
];

export function isGradeFilter(value: string): value is GradeFilter {
  return ["all", "1", "2", "3", "4", "5", "6"].includes(value);
}

export function isEditionId(value: string): value is EditionId {
  return ["doubanjiang", "xueersi", "gaosi", "keben"].includes(value);
}

export function getLessonMetaForEdition(
  lesson: MathLesson,
  edition: EditionId,
) {
  const match = lesson.editionMappings.find((m) => m.edition === edition);
  return (
    match ?? {
      edition,
      grade: lesson.grade,
      gradeLabel: lesson.gradeLabel,
      chapterTitle: lesson.chapterTitle,
      weekLabel: lesson.weekLabel,
    }
  );
}

export function getLessonsByGrade(
  grade: GradeFilter,
  edition: EditionId = "doubanjiang",
): MathLesson[] {
  const inEdition = LESSONS.filter((lesson) =>
    lesson.editionMappings.some((m) => m.edition === edition),
  );
  if (grade === "all") return inEdition;
  const num = Number(grade) as GradeNumber;
  return inEdition.filter((lesson) =>
    lesson.editionMappings.some(
      (m) => m.edition === edition && m.grade === num,
    ),
  );
}

export function getLessonById(id: string): MathLesson {
  return LESSONS.find((l) => l.id === id) ?? LESSONS[0];
}
