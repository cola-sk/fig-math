import type { ArraySwapUnit, MathLesson } from "../../types/lesson";

function makeUnits(
  total: number,
  convertedCount: number,
  baseType: ArraySwapUnit["baseType"],
  baseLegs: number,
  targetLegs: number,
  baseName: string,
  targetName: string,
  stateMode: "initial" | "assumed" | "replacing" | "done",
): ArraySwapUnit[] {
  return Array.from({ length: total }).map((_, idx) => {
    const isConverted = idx < convertedCount;
    const isNextTarget = stateMode === "replacing" && idx === convertedCount;

    return {
      id: `unit-${idx}`,
      baseType,
      label: isConverted ? targetName : baseName,
      baseLegs,
      currentLegs: isConverted ? targetLegs : baseLegs,
      liftedLegs: stateMode === "assumed" ? targetLegs - baseLegs : 0,
      addedLegs: isConverted ? targetLegs - baseLegs : 0,
      state: isConverted
        ? "converted"
        : isNextTarget
          ? "highlighted"
          : stateMode === "assumed"
            ? "lifted"
            : "normal",
    };
  });
}

export const chickenRabbitLesson: MathLesson = {
  id: "chicken-rabbit",
  chapterId: "01-reasoning",
  chapterTitle: "01. 逻辑与假设法",
  grade: 3,
  gradeLabel: "三年级",
  weekLabel: "第 12 讲",
  title: "鸡兔同笼（假设替换法）",
  summary: "把两种动物都假设成同一种，通过多出或缺少的腿数，一步步把另一类换回来。",
  engine: "array-swap",
  keywords: ["鸡兔同笼", "假设法", "自行车", "三轮车", "租船", "替换"],
  editionMappings: [
    {
      edition: "doubanjiang",
      grade: 3,
      gradeLabel: "三年级",
      chapterTitle: "代换与假设思维",
      weekLabel: "思维第 10 讲",
    },
  ],
  variants: [
    {
      id: "example",
      modeLabel: "例题精讲",
      bookPart: "A版",
      tier: "base",
      title: "鸡兔同笼标准题",
      subtitle: "假设全是鸡，看看少了多少只脚",
      defaultParams: { total: 8, rabbits: 3 },
      paramDefs: [
        { key: "total", label: "总头数", min: 4, max: 10, step: 1, unit: "只" },
        { key: "rabbits", label: "兔子只数（生成总脚数）", min: 1, max: 6, step: 1, unit: "只" },
      ],
      build: (params) => {
        const total = Math.max(4, params.total ?? 8);
        const rabbits = Math.min(total - 1, Math.max(1, params.rabbits ?? 3));
        const chickens = total - rabbits;
        const totalLegs = chickens * 2 + rabbits * 4;
        const assumedLegs = total * 2;
        const diffLegs = totalLegs - assumedLegs;
        const stepLegs = 2;

        return {
          problemStatement: `笼子里有鸡和兔共 ${total} 只，数一数一共有 ${totalLegs} 只脚。问：鸡和兔各有多少只？`,
          formulas: [
            { id: "f1", latex: `${total} \\times 2 = ${assumedLegs}\\text{ (只)}`, comment: "假设全是鸡的脚数" },
            { id: "f2", latex: `${totalLegs} - ${assumedLegs} = ${diffLegs}\\text{ (只)}`, comment: "实际比假设多出的脚" },
            { id: "f3", latex: `4 - 2 = 2\\text{ (只)}`, comment: "1只兔比1只鸡多2只脚" },
            { id: "f4", latex: `${diffLegs} \\div 2 = ${rabbits}\\text{ (只兔)}`, comment: "补回脚数变成兔" },
            { id: "f5", latex: `${total} - ${rabbits} = ${chickens}\\text{ (只鸡)}`, comment: "剩下的都是鸡" },
          ],
          steps: [
            {
              step: 1,
              tag: "建模",
              title: "看清总头数",
              narration: `一共有 ${total} 个头。我们先把 ${total} 个位置摆出来，每个位置站 1 只小动物，总共要有 ${totalLegs} 只脚。`,
              tipTitle: "想一想",
              tipBody: "鸡和兔混在一起不好直接算，奥数里最厉害的魔法叫「全部变成同一种」！",
              activeFormulaIndices: [],
              liveStats: [
                { label: "总头数", value: `${total} 只` },
                { label: "目标总脚数", value: `${totalLegs} 只`, tone: "coral" },
                { label: "当前画面脚数", value: `${assumedLegs} 只` },
                { label: "鸡 / 兔", value: "待揭晓" },
              ],
              sceneState: {
                kind: "array-swap",
                unitTitle: "鸡兔同笼假设舞台",
                partLabel: "只脚",
                summaryBanner: `共有 ${total} 只动物，目标是凑出 ${totalLegs} 只脚`,
                units: makeUnits(total, 0, "chicken", 2, 4, "未知", "兔", "initial"),
              },
            },
            {
              step: 2,
              tag: "假设",
              title: "口令：兔子抬起前脚！",
              narration: `假设这 ${total} 只全都是鸡（每只 2 只脚），就好像兔子们听口令把前两只脚抬起来一样！这时地上只有 ${total} × 2 = ${assumedLegs} 只脚。`,
              tipTitle: "动画里发生了什么",
              tipBody: "虚线小圆圈代表暂时被抬起来的脚，先假设每只只有 2 只脚着地。",
              activeFormulaIndices: [0],
              liveStats: [
                { label: "假设全鸡脚数", value: `${assumedLegs} 只`, tone: "blue" },
                { label: "目标总脚数", value: `${totalLegs} 只` },
                { label: "地上脚数", value: `${assumedLegs} 只` },
                { label: "每只脚数", value: "2 只" },
              ],
              sceneState: {
                kind: "array-swap",
                unitTitle: "全部假设成鸡",
                partLabel: "只脚",
                summaryBanner: `全部当成鸡：${total} × 2 = ${assumedLegs} 只脚`,
                units: makeUnits(total, 0, "chicken", 2, 4, "鸡(2脚)", "兔(4脚)", "assumed"),
              },
            },
            {
              step: 3,
              tag: "找差值",
              title: "为什么少了脚？",
              narration: `题目说一共有 ${totalLegs} 只脚，现在地上只有 ${assumedLegs} 只，少了 ${totalLegs} - ${assumedLegs} = ${diffLegs} 只脚！这 ${diffLegs} 只脚就是被兔子抬起来的前脚。`,
              activeFormulaIndices: [1],
              liveStats: [
                { label: "假设脚数", value: `${assumedLegs} 只` },
                { label: "还差脚数", value: `${diffLegs} 只`, tone: "coral" },
                { label: "每只兔差脚", value: "2 只" },
                { label: "待替换", value: "? 只" },
              ],
              checkpoint: {
                question: `1 只鸡换成 1 只兔，地上会多出几只脚？`,
                options: ["多出 1 只脚", "多出 2 只脚", "多出 4 只脚"],
                correctIndex: 1,
                feedbackCorrect: "答对了！兔子有 4 只脚，鸡有 2 只脚，每次换 1 只正好补回 4 - 2 = 2 只脚！",
                feedbackWrong: "再数一数：鸡有 2 只脚，兔有 4 只脚，4 - 2 = 2 只哦！",
              },
              sceneState: {
                kind: "array-swap",
                unitTitle: "计算脚数差额",
                partLabel: "只脚",
                summaryBanner: `还差 ${diffLegs} 只脚等待放回地上`,
                diffPool: { totalNeeded: diffLegs, remaining: diffLegs, unitStep: stepLegs },
                units: makeUnits(total, 0, "chicken", 2, 4, "待判断", "兔(4脚)", "replacing"),
              },
            },
            {
              step: 4,
              tag: "替换",
              title: "把抬起的脚一对对放下来",
              narration: `每把 1 只鸡换成兔，就补上 2 只脚。一共少 ${diffLegs} 只脚，${diffLegs} ÷ 2 = ${rabbits}，所以需要补 ${rabbits} 次——先换第 1 只看看！`,
              activeFormulaIndices: [2, 3],
              liveStats: [
                { label: "已变出兔子", value: "1 只", tone: "coral" },
                { label: "已补脚数", value: "2 只" },
                { label: "还剩待补脚", value: `${diffLegs - 2} 只`, tone: "coral" },
                { label: "当前总脚数", value: `${assumedLegs + 2} 只` },
              ],
              sceneState: {
                kind: "array-swap",
                unitTitle: "逐个替换成兔",
                partLabel: "只脚",
                summaryBanner: `第 1 次补回 2 只脚 → 变成兔子！`,
                diffPool: {
                  totalNeeded: diffLegs,
                  remaining: Math.max(0, diffLegs - 2),
                  unitStep: stepLegs,
                },
                units: makeUnits(total, 1, "chicken", 2, 4, "鸡(2脚)", "兔(4脚)", "replacing"),
              },
            },
            {
              step: 5,
              tag: "验证",
              title: "全部换完，大功告成！",
              narration: `共换了 ${rabbits} 次，差额池清零！所以兔子有 ${rabbits} 只，剩下的 ${total} - ${rabbits} = ${chickens} 只就是鸡。验算：${chickens}×2 + ${rabbits}×4 = ${totalLegs} 只脚，完全正确！`,
              tipTitle: "鸡兔同笼顺口溜",
              tipBody: "假设全是鸡，脚数少下来；除以脚数差，求出兔子来！",
              activeFormulaIndices: [3, 4],
              liveStats: [
                { label: "兔子数量", value: `${rabbits} 只`, tone: "coral" },
                { label: "鸡的数量", value: `${chickens} 只`, tone: "teal" },
                { label: "总脚数验算", value: `${totalLegs} 只`, tone: "teal" },
                { label: "待补差额", value: "0 只" },
              ],
              sceneState: {
                kind: "array-swap",
                unitTitle: "鸡兔同笼验算完成",
                partLabel: "只脚",
                summaryBanner: `答案揭晓：兔 ${rabbits} 只，鸡 ${chickens} 只（总脚 ${totalLegs} 只）`,
                diffPool: { totalNeeded: diffLegs, remaining: 0, unitStep: stepLegs },
                units: makeUnits(total, rabbits, "chicken", 2, 4, "鸡(2脚)", "兔(4脚)", "done"),
              },
            },
          ],
        };
      },
    },
    {
      id: "var-1",
      modeLabel: "变式一 · 车轮",
      bookPart: "A版",
      tier: "standard",
      title: "自行车与三轮车",
      subtitle: "换件衣服还是鸡兔同笼！",
      defaultParams: { total: 9, tricycles: 4 },
      paramDefs: [
        { key: "total", label: "总辆数", min: 4, max: 10, step: 1, unit: "辆" },
        { key: "tricycles", label: "三轮车数量", min: 1, max: 6, step: 1, unit: "辆" },
      ],
      build: (params) => {
        const total = Math.max(4, params.total ?? 9);
        const tricycles = Math.min(total - 1, Math.max(1, params.tricycles ?? 4));
        const bikes = total - tricycles;
        const totalWheels = bikes * 2 + tricycles * 3;
        const assumedWheels = total * 2;
        const diffWheels = totalWheels - assumedWheels;

        return {
          problemStatement: `车棚里停着自行车和三轮车共 ${total} 辆，一共有 ${totalWheels} 个轮子。问：自行车和三轮车各有多少辆？`,
          formulas: [
            { id: "v1-1", latex: `${total} \\times 2 = ${assumedWheels}\\text{ (个)}`, comment: "假设全是自行车" },
            { id: "v1-2", latex: `${totalWheels} - ${assumedWheels} = ${diffWheels}\\text{ (个)}`, comment: "少算的轮子数" },
            { id: "v1-3", latex: `3 - 2 = 1\\text{ (个)}`, comment: "每辆三轮车多 1 个轮" },
            { id: "v1-4", latex: `${diffWheels} \\div 1 = ${tricycles}\\text{ (辆三轮)}`, comment: "换回三轮车" },
            { id: "v1-5", latex: `${total} - ${tricycles} = ${bikes}\\text{ (辆自行)}`, comment: "剩下的自行车" },
          ],
          steps: [
            {
              step: 1,
              tag: "迁移识别",
              title: "一眼看穿：自行车=鸡，三轮车=兔",
              narration: `自行车有 2 个轮子，三轮车有 3 个轮子。这和鸡兔同笼一模一样，只是“脚”变成了“轮子”！`,
              tipTitle: "举一反三密码",
              tipBody: "只要遇到「两种东西总数已知 + 另一种属性总数已知」，全部用假设法！",
              activeFormulaIndices: [],
              liveStats: [
                { label: "总车辆", value: `${total} 辆` },
                { label: "目标轮子", value: `${totalWheels} 个`, tone: "coral" },
                { label: "每辆相差", value: "1 个轮" },
                { label: "状态", value: "准备假设" },
              ],
              sceneState: {
                kind: "array-swap",
                unitTitle: "车辆假设模型",
                partLabel: "个轮",
                summaryBanner: `共 ${total} 辆车，共有 ${totalWheels} 个轮子`,
                units: makeUnits(total, 0, "bike", 2, 3, "待判断", "三轮", "initial"),
              },
            },
            {
              step: 2,
              tag: "假设",
              title: "假设全都是 2 轮自行车",
              narration: `假设 ${total} 辆全是自行车，轮子只有 ${total} × 2 = ${assumedWheels} 个。`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "假设轮子", value: `${assumedWheels} 个`, tone: "blue" },
                { label: "目标轮子", value: `${totalWheels} 个` },
                { label: "每辆车轮", value: "2 个" },
                { label: "差额", value: `${diffWheels} 个` },
              ],
              sceneState: {
                kind: "array-swap",
                unitTitle: "假设全是自行车",
                partLabel: "个轮",
                summaryBanner: `假设全自行车：${total} × 2 = ${assumedWheels} 个轮子`,
                units: makeUnits(total, 0, "bike", 2, 3, "2轮", "3轮", "assumed"),
              },
            },
            {
              step: 3,
              tag: "找差值",
              title: "少算了多少个轮子？",
              narration: `实际有 ${totalWheels} 个轮子，比假设多了 ${diffWheels} 个。注意！三轮车只比自行车多 3 - 2 = 1 个轮子哦！`,
              activeFormulaIndices: [1, 2],
              liveStats: [
                { label: "多出轮子", value: `${diffWheels} 个`, tone: "coral" },
                { label: "每辆差轮", value: "1 个" },
                { label: "可换三轮", value: `${tricycles} 辆` },
                { label: "当前轮数", value: `${assumedWheels} 个` },
              ],
              sceneState: {
                kind: "array-swap",
                unitTitle: "计算轮子差额",
                partLabel: "个轮",
                summaryBanner: `每换 1 辆只补 1 个轮子，共要补 ${diffWheels} 个`,
                diffPool: { totalNeeded: diffWheels, remaining: diffWheels, unitStep: 1 },
                units: makeUnits(total, 0, "bike", 2, 3, "自行车", "三轮车", "replacing"),
              },
            },
            {
              step: 4,
              tag: "验证",
              title: "补回轮子，得出答案",
              narration: `${diffWheels} ÷ 1 = ${tricycles} 辆三轮车，剩下的 ${total} - ${tricycles} = ${bikes} 辆是自行车！验算：${bikes}×2 + ${tricycles}×3 = ${totalWheels} 个轮子。`,
              activeFormulaIndices: [3, 4],
              liveStats: [
                { label: "三轮车", value: `${tricycles} 辆`, tone: "coral" },
                { label: "自行车", value: `${bikes} 辆`, tone: "teal" },
                { label: "轮子验算", value: `${totalWheels} 个`, tone: "teal" },
                { label: "待补差额", value: "0 个" },
              ],
              sceneState: {
                kind: "array-swap",
                unitTitle: "车轮问题解答完毕",
                partLabel: "个轮",
                summaryBanner: `三轮车 ${tricycles} 辆，自行车 ${bikes} 辆`,
                diffPool: { totalNeeded: diffWheels, remaining: 0, unitStep: 1 },
                units: makeUnits(total, tricycles, "bike", 2, 3, "2轮", "3轮", "done"),
              },
            },
          ],
        };
      },
    },
    {
      id: "var-2",
      modeLabel: "变式二 · 租船",
      bookPart: "B版",
      tier: "challenge",
      title: "大船小船坐同学",
      subtitle: "4人小船和6人大船，同样是假设法",
      defaultParams: { total: 7, bigBoats: 3 },
      paramDefs: [
        { key: "total", label: "总船数", min: 4, max: 9, step: 1, unit: "条" },
        { key: "bigBoats", label: "大船条数", min: 1, max: 5, step: 1, unit: "条" },
      ],
      build: (params) => {
        const total = Math.max(4, params.total ?? 7);
        const bigBoats = Math.min(total - 1, Math.max(1, params.bigBoats ?? 3));
        const smallBoats = total - bigBoats;
        const totalKids = smallBoats * 4 + bigBoats * 6;
        const assumedKids = total * 4;
        const diffKids = totalKids - assumedKids;

        return {
          problemStatement: `${totalKids} 名同学去划船，一共租了 ${total} 条船，每条船都坐满。已知大船每条坐 6 人，小船每条坐 4 人。大、小船各租了几条？`,
          formulas: [
            { id: "v2-1", latex: `${total} \\times 4 = ${assumedKids}\\text{ (人)}`, comment: "假设全租小船" },
            { id: "v2-2", latex: `${totalKids} - ${assumedKids} = ${diffKids}\\text{ (人)}`, comment: "还有这么多人没上船" },
            { id: "v2-3", latex: `6 - 4 = 2\\text{ (人)}`, comment: "小船换大船多坐2人" },
            { id: "v2-4", latex: `${diffKids} \\div 2 = ${bigBoats}\\text{ (条大船)}`, comment: "需要的大船条数" },
            { id: "v2-5", latex: `${total} - ${bigBoats} = ${smallBoats}\\text{ (条小船)}`, comment: "需要的小船条数" },
          ],
          steps: [
            {
              step: 1,
              tag: "假设",
              title: "先假设全租 4 人小船",
              narration: `${total} 条船如果全是 4 人小船，只能坐 ${total} × 4 = ${assumedKids} 人。`,
              activeFormulaIndices: [0],
              liveStats: [
                { label: "总船数", value: `${total} 条` },
                { label: "同学总数", value: `${totalKids} 人` },
                { label: "小船可坐", value: `${assumedKids} 人`, tone: "blue" },
                { label: "岸上等待", value: `${diffKids} 人`, tone: "coral" },
              ],
              sceneState: {
                kind: "array-swap",
                unitTitle: "租船问题假设模型",
                partLabel: "人",
                summaryBanner: `全租小船坐 ${assumedKids} 人，岸上还剩 ${diffKids} 人`,
                diffPool: { totalNeeded: diffKids, remaining: diffKids, unitStep: 2 },
                units: makeUnits(total, 0, "small-boat", 4, 6, "小船(4人)", "大船(6人)", "assumed"),
              },
            },
            {
              step: 2,
              tag: "替换",
              title: "小船换大船，每条多坐 2 人",
              narration: `岸上还有 ${diffKids} 人没座！每把 1 条小船换成大船，就能多坐 6 - 4 = 2 人。${diffKids} ÷ 2 = ${bigBoats}，所以要换 ${bigBoats} 条大船！`,
              activeFormulaIndices: [1, 2, 3, 4],
              liveStats: [
                { label: "大船", value: `${bigBoats} 条`, tone: "coral" },
                { label: "小船", value: `${smallBoats} 条`, tone: "teal" },
                { label: "总人数验算", value: `${totalKids} 人`, tone: "teal" },
                { label: "岸上剩余", value: "0 人" },
              ],
              sceneState: {
                kind: "array-swap",
                unitTitle: "租船替换完成",
                partLabel: "人",
                summaryBanner: `大船 ${bigBoats} 条（共${bigBoats * 6}人），小船 ${smallBoats} 条（共${smallBoats * 4}人）`,
                diffPool: { totalNeeded: diffKids, remaining: 0, unitStep: 2 },
                units: makeUnits(total, bigBoats, "small-boat", 4, 6, "小船(4人)", "大船(6人)", "done"),
              },
            },
          ],
        };
      },
    },
  ],
};
