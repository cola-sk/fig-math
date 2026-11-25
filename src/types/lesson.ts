export type GradeNumber = 1 | 2 | 3 | 4 | 5 | 6;
export type GradeFilter = "all" | `${GradeNumber}`;
export type EditionId = "doubanjiang" | "xueersi" | "gaosi" | "keben";
export type DifficultyTier = "base" | "standard" | "challenge";
export type TierFilter = "all" | DifficultyTier;

export interface EditionMapping {
  edition: EditionId;
  grade: GradeNumber;
  gradeLabel: string;
  chapterTitle: string;
  weekLabel: string;
}

export type EngineKind =
  | "array-swap"
  | "segment-bar"
  | "number-line"
  | "geometry-grid"
  | "well-climb"
  | "venn-set"
  | "count-diagram"
  | "mirror-clock"
  | "combo-visual"
  | "balance-puzzle";

export interface ArraySwapUnit {
  id: string;
  baseType:
    "chicken" | "rabbit" | "bike" | "tricycle" | "small-boat" | "big-boat";
  label: string;
  baseLegs: number;
  currentLegs: number;
  liftedLegs: number;
  addedLegs: number;
  state: "normal" | "lifted" | "highlighted" | "converted";
}

export interface ArraySwapSceneState {
  kind: "array-swap";
  unitTitle: string;
  partLabel: string; // e.g. "只脚" | "个轮" | "位乘客"
  units: ArraySwapUnit[];
  summaryBanner?: string;
  diffPool?: {
    totalNeeded: number;
    remaining: number;
    unitStep: number;
  };
}

export interface SegmentBarRow {
  id: string;
  label: string;
  color: "coral" | "teal" | "blue" | "amber";
  /** Equal parts (e.g. 1份 each) */
  parts: number;
  /** Value of each equal part once solved (or '?' before solved) */
  partLabel?: string;
  /** Extra constant tail (e.g. "+10" or "+5") */
  extraValue?: number;
  extraLabel?: string;
  extraState?: "normal" | "faded" | "detached" | "highlighted";
  /** Relative scale factor for visual width */
  visualTotalRatio: number;
  baseValue?: number;
  /** Transfer preview (e.g. giving 4 candies to sibling) */
  transferNote?: string;
}

export interface SegmentBarSceneState {
  kind: "segment-bar";
  /** "dots" renders countable concrete tokens; "bus" renders flat 2D storybook bus scene */
  visualMode?: "bars" | "dots" | "bus";
  dotVisual?: {
    unitName: string; // e.g. "朵小红花" | "颗糖"
    row1Label: string;
    row2Label: string;
    row1Count: number;
    row2Count: number;
    /** Number of tokens flying from row1 to row2 in this step */
    movedCount: number;
    showSplitGuide?: boolean;
  };
  busVisual?: {
    initial: number;
    getOff: number;
    getOn: number;
    phase: "observe" | "offset" | "total";
    hideNetChange?: boolean;
  };
  rows: SegmentBarRow[];
  totalBrace?: {
    label: string;
    state: "normal" | "adjusted" | "solved";
  };
  diffGuide?: {
    label: string;
    fromRow: number;
    toRow: number;
    highlight?: boolean;
  };
  annotation?: string;
}

export interface NumberLineSceneState {
  kind: "number-line";
  layout: "line" | "circle" | "track";
  totalLength: number;
  hideLengthLabel?: boolean;
  hideCountSummary?: boolean;
  measurement?: {
    marks: number[];
    from: number;
    to: number;
    label: string;
    pencil?: { start: number; end: number };
  };
  unitLabel: string;
  /** For tree planting */
  intervals?: number;
  intervalSize?: number;
  trees?: Array<{
    id: string;
    posRatio: number; // 0..1 along line or 0..1 angle for circle
    status: "active" | "ghost" | "highlight";
    label?: string;
  }>;
  showIntervalArcs?: boolean;
  /** For meeting / chasing */
  actors?: Array<{
    id: string;
    name: string;
    posRatio: number; // 0..1
    color: "coral" | "teal";
    speedLabel: string;
    direction: "right" | "left";
  }>;
  markers?: Array<{
    id: string;
    posRatio: number;
    label: string;
    tone?: "coral" | "teal" | "neutral";
  }>;
  highlightGap?: {
    fromRatio: number;
    toRatio: number;
    label: string;
  };
  /** For queue / cut-wood / stairs nodes */
  queueNodes?: Array<{
    id: string;
    posRatio: number;
    label: string;
    role: "normal" | "target" | "overlap" | "excluded" | "cut";
  }>;
  /** Renders a warm wooden log that visually splits into pieces when cut */
  woodLog?: {
    pieces: number;
    isSplit: boolean;
  };
}

export interface GeometryGridSceneState {
  kind: "geometry-grid";
  variant: "staircase" | "concave";
  widthVal: number;
  heightVal: number;
  concaveDepth?: number;
  unit: string;
  /** Normalized 0..1 step progression for edge translation */
  shiftedHorizontal: boolean;
  shiftedVertical: boolean;
  highlightInnerEdges: boolean;
  showOuterRect: boolean;
  annotation?: string;
}

export interface WellClimbSceneState {
  kind: "well-climb";
  wellDepth: number;
  dayClimb: number;
  nightSlide: number;
  /** Current height (meters) of the snail/frog */
  currentHeight: number;
  /** Day trail steps to render */
  trails: Array<{
    day: number;
    fromH: number;
    peakH: number;
    endH: number;
    escaped?: boolean;
  }>;
  reserveTopBand?: boolean;
  annotation?: string;
}

export interface VennSetSceneState {
  kind: "venn-set";
  totalLabel: string;
  totalCount: number;
  leftLabel: string;
  leftTotal: number;
  rightLabel: string;
  rightTotal: number;
  overlapCount: number;
  neitherCount: number;
  visibleValues?: Array<"overlap" | "neither" | "union" | "disjoint">;
  highlightZone: "all" | "overlap" | "disjoint" | "neither";
  annotation?: string;
}

export interface CountDiagramSceneState {
  kind: "count-diagram";
  mode: "segments" | "angles" | "triangles" | "blocks";
  /** For segments/angles/triangles: number of base units */
  baseCount: number;
  triangleLayers?: number;
  showCountSummary?: boolean;
  /** Which group size is currently highlighted: 1 = single, 2 = 2-unit, etc., 0 = none */
  highlightSpan: number;
  /** For blocks mode: column heights */
  blockHeights?: number[];
  targetBlockHeight?: number;
  showHiddenNote?: boolean;
  annotation?: string;
}

export interface MirrorClockSceneState {
  kind: "mirror-clock";
  mode: "shape" | "clock";
  /** Mirror clock real time & mirrored time */
  hour?: number;
  minute?: number;
  showMirrored?: boolean;
  /** Mirror shape grid cells (4x4 boolean) */
  leftCells?: number[][];
  annotation?: string;
}

export interface ComboVisualSceneState {
  kind: "combo-visual";
  mode:
    "pairing" | "permutation" | "handshake" | "money" | "make-ten" | "pattern";
  patternCorners?: Array<number | null>;
  leftItems?: string[];
  rightItems?: string[];
  highlightLeftIdx?: number;
  /** Number of connections/rows to reveal */
  revealedCount?: number;
  /** For permutation / money / make-ten */
  cards?: Array<{
    id: string;
    text: string;
    tone?: "coral" | "teal" | "blue" | "muted";
  }>;
  rows?: Array<{ label: string; badge: string; active?: boolean }>;
  annotation?: string;
}

export interface BalancePuzzleSceneState {
  kind: "balance-puzzle";
  mode: "seesaw" | "swap" | "arith-puzzle" | "matchstick";
  /** For seesaw: tilt angle (-12 left heavy, 0 balanced, 12 right heavy) */
  tiltDeg?: number;
  leftItems?: string[];
  rightItems?: string[];
  /** For swap: equations rows */
  swapRows?: Array<{ left: string; right: string; highlight?: boolean }>;
  /** For arith-puzzle: vertical or horizontal equation boxes */
  puzzleLines?: string[];
  puzzleHint?: string;
  /** For matchstick: before/after equations or shape note */
  matchBefore?: string;
  matchAfter?: string;
  matchMoveNote?: string;
  annotation?: string;
}

export type SceneState =
  | ArraySwapSceneState
  | SegmentBarSceneState
  | NumberLineSceneState
  | GeometryGridSceneState
  | WellClimbSceneState
  | VennSetSceneState
  | CountDiagramSceneState
  | MirrorClockSceneState
  | ComboVisualSceneState
  | BalancePuzzleSceneState;

export interface FormulaLine {
  id: string;
  latex: string;
  comment?: string;
}

export interface LiveStat {
  label: string;
  value: string | number;
  tone?: "default" | "coral" | "teal" | "blue";
}

export interface StepCheckpoint {
  question: string;
  options: string[];
  correctIndex: number;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export interface LessonStep {
  step: number;
  tag: string;
  title: string;
  narration: string;
  tipTitle?: string;
  tipBody?: string;
  activeFormulaIndices: number[];
  liveStats: LiveStat[];
  sceneState: SceneState;
  checkpoint?: StepCheckpoint;
}

export interface ParamDefinition {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

export interface BuiltLessonVariant {
  problemStatement: string;
  formulas: FormulaLine[];
  steps: LessonStep[];
}

export interface LessonVariant {
  id: string;
  modeLabel: string; // e.g. "例题精讲" | "举一反三 · 1" | "B版 · 拔高"
  bookPart: "A版" | "B版";
  tier: DifficultyTier;
  title: string;
  subtitle: string;
  defaultParams: Record<string, number>;
  paramDefs: ParamDefinition[];
  build: (params: Record<string, number>) => BuiltLessonVariant;
}

export interface MathLesson {
  id: string;
  chapterId: string;
  chapterTitle: string;
  grade: GradeNumber;
  gradeLabel: string;
  weekLabel: string;
  title: string;
  summary: string;
  engine: EngineKind;
  keywords: string[];
  editionMappings: EditionMapping[];
  variants: LessonVariant[];
}
