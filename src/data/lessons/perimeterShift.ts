import type { MathLesson } from "../../types/lesson";

export const perimeterShiftLesson: MathLesson = {
  id: "perimeter-shift",
  chapterId: "04-geometry",
  chapterTitle: "04. 几何巧思",
  grade: 4,
  gradeLabel: "四年级",
  weekLabel: "第 6 讲",
  title: "巧求周长（平移变形法）",
  summary: "不用一段段去量不规则楼梯的每一级！把凹进去的边向外平移，直接拼成完整长方形。",
  engine: "geometry-grid",
  keywords: ["巧求周长", "平移法", "台阶形", "凹字形", "周长"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 4,
      gradeLabel: "四年级",
      chapterTitle: "转化思维 · 几何周长",
      weekLabel: "思维第 6 讲",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "例题 · 台阶形",
      bookPart: "A版",
      tier: "base",
      title: "楼梯台阶图形求周长",
      subtitle: "横边向上移，竖边向右移，秒变大长方形",
      defaultParams: { width: 12, height: 8 },
      paramDefs: [
        { key: "width", label: "图形总底宽", min: 8, max: 20, step: 1, unit: "cm" },
        { key: "height", label: "图形总高度", min: 5, max: 14, step: 1, unit: "cm" },
      ],
      build: (params) => {
        const width = params.width ?? 12;
        const height = params.height ?? 8;
        const perimeter = (width + height) * 2;

        return {
          problemStatement: `下图的楼梯台阶形图形，底边长 ${width} cm，左边高 ${height} cm，每个拐角都是直角。求这个图形的周长是多少厘米？`,
          formulas: [
            { id: "ps-1", latex: `\\text{横边平移之和} = ${width}\\text{ cm}`, comment: "所有台阶水平面向上推出，刚好等于底边" },
            { id: "ps-2", latex: `\\text{竖边平移之和} = ${height}\\text{ cm}`, comment: "所有台阶立面向右推出，刚好等于左边" },
            { id: "ps-3", latex: `(${width} + ${height}) \\times 2 = ${perimeter}\\text{ (cm)}`, comment: "直接用大长方形周长公式！" },
          ],
          steps: [
            {
              step: 1,
              tag: "观察",
              title: "小台阶的每一小段都没给长度，怎么办？",
              narration: `题目只告诉我们总宽 ${width} cm 和总高 ${height} cm，台阶的每一级多宽多高都不知道——因为不需要知道！`,
              activeFormulaIndices: [],
              liveStats: [
                { label: "已知底宽", value: `${width} cm` },
                { label: "已知高度", value: `${height} cm` },
                { label: "平移状态", value: "未平移" },
                { label: "周长", value: "? cm" },
              ],
              sceneState: {
                kind: "geometry-grid",
                variant: "staircase",
                widthVal: width,
                heightVal: height,
                unit: "cm",
                shiftedHorizontal: false,
                shiftedVertical: false,
                highlightInnerEdges: false,
                showOuterRect: false,
                annotation: "每一级台阶的小长度未知，准备施展「平移魔法」",
              },
            },
            {
              step: 2,
              tag: "横边上移",
              title: "所有横着的“台阶面”一起向上抬！",
              narration: `把橙色的水平台阶面全部往上平移到最顶端——它们严丝合缝地拼成了一条完整的大顶边，长度正好等于底边 ${width} cm！`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "顶边合体长度", value: `${width} cm`, tone: "coral" },
                { label: "底边长度", value: `${width} cm` },
                { label: "横边已平移", value: "完成" },
                { label: "竖边状态", value: "待平移" },
              ],
              sceneState: {
                kind: "geometry-grid",
                variant: "staircase",
                widthVal: width,
                heightVal: height,
                unit: "cm",
                shiftedHorizontal: true,
                shiftedVertical: false,
                highlightInnerEdges: false,
                showOuterRect: true,
                annotation: `橙色横边全部上移 → 刚好补齐长方形的顶边（${width} cm）`,
              },
            },
            {
              step: 3,
              tag: "竖边右移",
              title: "所有竖着的“台阶立面”一起向右推！",
              narration: `把青色的竖直台阶面全部向右平移到最右边——它们又严丝合缝地拼成了大长方形的右边，长度等于 ${height} cm！`,
              tipTitle: "平移法核心秘诀",
              tipBody: "只要是往一个方向凹进去的楼梯形，周长就等于包围它的大长方形周长！",
              activeFormulaIndices: [1, 2],
              liveStats: [
                { label: "大长方形长", value: `${width} cm`, tone: "coral" },
                { label: "大长方形宽", value: `${height} cm`, tone: "teal" },
                { label: "周长公式", value: `(${width}+${height})×2` },
                { label: "最终周长", value: `${perimeter} cm`, tone: "teal" },
              ],
              sceneState: {
                kind: "geometry-grid",
                variant: "staircase",
                widthVal: width,
                heightVal: height,
                unit: "cm",
                shiftedHorizontal: true,
                shiftedVertical: true,
                highlightInnerEdges: false,
                showOuterRect: true,
                annotation: `变形成功！周长 = (${width} + ${height}) × 2 = ${perimeter} cm`,
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "变式一 · 凹字形",
      bookPart: "B版",
      tier: "challenge",
      title: "凹字形陷阱：千万别漏掉里面那两条边！",
      subtitle: "能平移补齐的先补齐，多出来的两条竖壁单独加上",
      defaultParams: { width: 12, height: 8, depth: 3 },
      paramDefs: [
        { key: "width", label: "外框宽", min: 8, max: 18, step: 1, unit: "cm" },
        { key: "height", label: "外框高", min: 6, max: 14, step: 1, unit: "cm" },
        { key: "depth", label: "凹槽深度", min: 2, max: 5, step: 1, unit: "cm" },
      ],
      build: (params) => {
        const width = params.width ?? 12;
        const height = params.height ?? 8;
        const depth = Math.min(height - 2, params.depth ?? 3);
        const rectPerim = (width + height) * 2;
        const totalPerim = rectPerim + depth * 2;

        return {
          problemStatement: `一个“凹”字形图形，外框宽 ${width} cm、高 ${height} cm，中间向下凹进去的深度是 ${depth} cm。这个“凹”字形的周长是多少厘米？`,
          formulas: [
            { id: "pv-1", latex: `(${width} + ${height}) \\times 2 = ${rectPerim}\\text{ (cm)}`, comment: "把凹槽底边上移后得到的外框周长" },
            { id: "pv-2", latex: `${depth} \\times 2 = ${depth * 2}\\text{ (cm)}`, comment: "凹槽左右两条竖直内壁不能抵消" },
            { id: "pv-3", latex: `${rectPerim} + ${depth * 2} = ${totalPerim}\\text{ (cm)}`, comment: "外框周长 + 多出的两条边" },
          ],
          steps: [
            {
              step: 1,
              tag: "平移补底",
              title: "先把凹槽底边往上抬，补成大长方形",
              narration: `把凹槽底部那条青色横边向上平移，刚好补全大长方形的顶边，这部分周长是 (${width} + ${height}) × 2 = ${rectPerim} cm。`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "外框大长方形", value: `${rectPerim} cm`, tone: "teal" },
                { label: "凹槽深度", value: `${depth} cm` },
                { label: "还没算的边", value: "2 条内壁！", tone: "coral" },
                { label: "总周长", value: "待补全" },
              ],
              sceneState: {
                kind: "geometry-grid",
                variant: "concave",
                widthVal: width,
                heightVal: height,
                concaveDepth: depth,
                unit: "cm",
                shiftedHorizontal: true,
                shiftedVertical: false,
                highlightInnerEdges: false,
                showOuterRect: true,
                annotation: "青色底边补上了长方形的缺口，但注意看里面的两条竖边！",
              },
            },
            {
              step: 2,
              tag: "避坑加边",
              title: `加上多出来的 2 条 ${depth} cm 内壁！`,
              narration: `两条橙色的竖直内壁谁也没法把它们平移出去，它们是实打实多出来的！所以必须加上 ${depth} × 2 = ${depth * 2} cm，最终周长 = ${rectPerim} + ${depth * 2} = ${totalPerim} cm！`,
              tipTitle: "凹字形防错口诀",
              tipBody: "先按大长方形算一圈，再数一数凹进去“多出几条壁”！",
              activeFormulaIndices: [1, 2],
              liveStats: [
                { label: "外框周长", value: `${rectPerim} cm` },
                { label: "多出内壁", value: `2 × ${depth} = ${depth * 2} cm`, tone: "coral" },
                { label: "最终周长", value: `${totalPerim} cm`, tone: "teal" },
                { label: "陷阱避开", value: "成功！" },
              ],
              sceneState: {
                kind: "geometry-grid",
                variant: "concave",
                widthVal: width,
                heightVal: height,
                concaveDepth: depth,
                unit: "cm",
                shiftedHorizontal: true,
                shiftedVertical: false,
                highlightInnerEdges: true,
                showOuterRect: true,
                annotation: `总周长 = 外框 ${rectPerim} + 多出2条壁 ${depth * 2} = ${totalPerim} cm`,
              },
            },
          ],
        };
      },
    },
  ],
};
