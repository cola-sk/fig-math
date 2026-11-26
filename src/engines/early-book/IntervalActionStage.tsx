import { useEffect, useRef, useState } from "react";
import { Button } from "@ui-sdk/react/button";
import { motion } from "motion/react";
import type { EarlyBookSceneState } from "../../types/lesson";
import { StageFrame } from "../StageFrame";

function PlantItem({
  subject,
  index,
}: {
  subject?: string;
  index: number;
}) {
  if (subject === "气球") {
    const colors = [
      "var(--accent-coral)",
      "var(--accent-blue)",
      "var(--accent-teal)",
      "var(--accent-amber)",
    ];
    const fill = colors[index % colors.length];
    return (
      <g>
        <line x1="0" y1="6" x2="0" y2="38" stroke="var(--ink-muted)" strokeWidth="1.8" />
        <ellipse cx="0" cy="-6" rx="11" ry="13.5" fill={fill} stroke="var(--bg-surface)" strokeWidth="1.5" />
        <path d="M -3 8 L 3 8 L 0 5 Z" fill={fill} />
      </g>
    );
  }
  if (subject === "花") {
    return (
      <g>
        <path d="M -9 24 L 9 24 L 6.5 38 L -6.5 38 Z" fill="var(--accent-amber)" stroke="var(--ink-secondary)" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="0" y1="8" x2="0" y2="24" stroke="var(--accent-teal)" strokeWidth="2.4" />
        <circle cx="0" cy="4" r="5" fill="var(--accent-coral)" />
        <circle cx="-6" cy="8" r="4.2" fill="var(--accent-coral-soft)" stroke="var(--accent-coral)" strokeWidth="1.3" />
        <circle cx="6" cy="8" r="4.2" fill="var(--accent-coral-soft)" stroke="var(--accent-coral)" strokeWidth="1.3" />
        <circle cx="0" cy="8" r="3" fill="var(--accent-amber)" />
      </g>
    );
  }
  if (subject === "彩旗") {
    const flagFill = index % 2 === 0 ? "var(--accent-coral)" : "var(--accent-blue)";
    return (
      <g>
        <line x1="0" y1="-10" x2="0" y2="38" stroke="var(--ink-secondary)" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M 1 -10 L 20 -2 L 1 7 Z" fill={flagFill} stroke={flagFill} strokeWidth="1.2" strokeLinejoin="round" />
      </g>
    );
  }
  // Default: clean 2D flat tree
  return (
    <g>
      <rect x="-3" y="14" width="6" height="24" rx="2" fill="var(--ink-secondary)" />
      <circle cx="0" cy="2" r="14" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="2.2" />
      <circle cx="0" cy="-3" r="8" fill="var(--accent-teal)" opacity="0.22" />
    </g>
  );
}

export function IntervalActionStage({ scene }: { scene: EarlyBookSceneState }) {
  const isStairs = scene.mode === "stairs";

  const stairsSpec = scene.stairsSpec ?? {
    from: 1,
    to: 4,
    targetFrom: 1,
    targetTo: 4,
    unit: "层",
  };

  const rawTrees = scene.treesSpec ?? {
    count: 5,
    intervals: 4,
    totalLength: 20,
    gapLength: 5,
    ask: "count" as const,
    bothEnds: true,
    noEnds: false,
    unit: "棵",
  };
  const treeIntervals = Math.max(
    2,
    rawTrees.intervals ??
      (rawTrees.noEnds
        ? rawTrees.count + 1
        : rawTrees.bothEnds
          ? Math.max(2, rawTrees.count - 1)
          : rawTrees.count),
  );
  const treeCount = rawTrees.count;
  const totalLength = rawTrees.totalLength ?? treeIntervals * (rawTrees.gapLength ?? 5);
  const gapLength = rawTrees.gapLength ?? Math.round(totalLength / treeIntervals);
  const treeAsk = rawTrees.ask ?? "count";
  const treeSlots = treeIntervals + 1;

  const totalStairSteps = Math.min(
    6,
    Math.max(2, Math.abs((stairsSpec.targetTo || stairsSpec.to) - stairsSpec.from)),
  );
  const maxAnimStep = isStairs
    ? totalStairSteps
    : scene.phase === 3 && treeAsk === "count"
      ? treeCount
      : treeIntervals;

  const [activeStep, setActiveStep] = useState<number>(
    scene.phase === 0 ? 0 : maxAnimStep,
  );
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  };

  const playIntervalDemo = () => {
    clearTimers();
    setActiveStep(0);
    const delayMs = isStairs ? 320 : Math.max(120, Math.min(260, Math.floor(1100 / Math.max(1, maxAnimStep))));
    for (let i = 1; i <= maxAnimStep; i++) {
      const id = window.setTimeout(() => setActiveStep(i), i * delayMs);
      timersRef.current.push(id);
    }
  };

  useEffect(() => {
    clearTimers();
    if (scene.phase === 0) {
      setActiveStep(0);
    } else {
      playIntervalDemo();
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.phase, scene.mode, maxAnimStep, totalLength, gapLength, treeCount, treeAsk, rawTrees.noEnds]);

  const itemNoun =
    scene.subject === "气球"
      ? "气球"
      : scene.subject === "彩旗"
        ? "彩旗"
        : scene.subject === "花"
          ? "盆花"
          : "树";

  const statusCaption = isStairs
    ? scene.phase === 0
      ? `先看起点是 ${stairsSpec.from} 楼还是几楼，爬楼梯算的是「楼梯段数」而不是楼层号！`
      : scene.phase === 1
        ? `🪜 每向上爬 1 层 = 走过 1 段楼梯间隔，一起从 ${stairsSpec.from} 楼数一数。`
        : scene.phase === 2
          ? `关键段数已标出（${scene.middleLabel}：${scene.middleValue}），对照右边间隔图核对！`
          : `🎉 算清总间隔数与每段用时/台阶数！结果：${scene.finalValue}。`
    : (() => {
        const endRuleText = rawTrees.noEnds
          ? "两端都不栽"
          : rawTrees.bothEnds
            ? "两端都栽"
            : "只栽一端";
        if (scene.phase === 0) {
          if (treeAsk === "count") {
            return `先看清条件：总长 ${totalLength} 米，每隔 ${gapLength} 米放 1 个${itemNoun}，且「${endRuleText}」！`;
          }
          if (treeAsk === "gap") {
            return `总长 ${totalLength} 米里摆了 ${treeCount} 个${itemNoun}（${endRuleText}），先看它们把路分成了几段！`;
          }
          return `这里摆了 ${treeCount} 个${itemNoun}（${endRuleText}），相邻间隔 ${gapLength} 米，先看中间有几段！`;
        }
        if (scene.phase === 1) {
          if (treeAsk === "count") {
            return `📏 按每段 ${gapLength} 米沿路量过去，观察红虚线表示的「间隔」一共有几段？`;
          }
          return `🔍 从左到右扫描 ${treeCount} 个${itemNoun}之间，观察红虚线表示的「间隔」一共有几段？`;
        }
        if (scene.phase === 2) {
          if (treeAsk === "count") {
            return `整条路分成了 ${treeIntervals} 个间隔（每段 ${gapLength} 米），按「${endRuleText}」算一算一共放几个${itemNoun}？`;
          }
          if (treeAsk === "gap") {
            return `共有 ${treeIntervals} 个相等间隔，把总长 ${totalLength} 米平均分给这 ${treeIntervals} 段，每段几米？`;
          }
          return `共有 ${treeIntervals} 个间隔，每段都是 ${gapLength} 米，合起来总长是多少米？`;
        }
        return `🎉 ${treeIntervals} 个间隔 × ${gapLength} 米 = ${totalLength} 米，共 ${treeCount} 个${itemNoun}！结果：${scene.finalValue}。`;
      })();

  const pillText = isStairs
    ? scene.phase >= 2
      ? `${scene.middleLabel}：${scene.middleValue}`
      : `爬 ${totalStairSteps} 段 · 从 ${stairsSpec.from}${stairsSpec.unit}出发`
    : (() => {
        if (scene.phase === 0) {
          return treeAsk === "total"
            ? `共 ${treeCount} 个${itemNoun} · 每段 ${gapLength} 米`
            : treeAsk === "gap"
              ? `总长 ${totalLength} 米 · 共 ${treeCount} 个${itemNoun}`
              : `总长 ${totalLength} 米 · 每隔 ${gapLength} 米`;
        }
        if (scene.phase === 1) {
          return treeAsk === "count"
            ? `每段 ${gapLength} 米量一量 · 共 ? 段`
            : `${treeCount} 个${itemNoun}之间 · 共 ? 个间隔`;
        }
        if (scene.phase === 2) {
          return treeAsk === "count"
            ? `${treeIntervals} 段间隔 · 共 ? 个${itemNoun}`
            : treeAsk === "gap"
              ? `${totalLength} 米 ÷ ${treeIntervals} 段 = ? 米`
              : `${treeIntervals} 段 × ${gapLength} 米 = ? 米`;
        }
        return `🎉 ${scene.finalValue}`;
      })();

  const treeButtonText =
    scene.phase === 1
      ? treeAsk === "count"
        ? `📏 演示按 ${gapLength} 米分段`
        : "🔍 演示逐段数间隔"
      : scene.phase === 3 && treeAsk === "count"
        ? `🌱 演示逐个种满 ${treeCount} 个`
        : "🌳 演示点与间隔关系";

  const controls =
    scene.phase >= 1 ? (
      <Button
        aria-label={isStairs ? "演示爬楼梯间隔动画" : "演示植树点与间隔动画"}
        onClick={playIntervalDemo}
        className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-coral)] bg-[var(--accent-coral)] px-2.5 py-1 text-xs font-bold text-white transition"
      >
        {isStairs ? "🪜 演示逐层上爬" : treeButtonText}
      </Button>
    ) : null;

  // Stairs geometry inside [24..438, 56..370]
  const stairW = 300 / totalStairSteps;
  const stairH = 180 / totalStairSteps;
  const baseX = 76;
  const baseY = 296;
  const stairPath = Array.from({ length: totalStairSteps }, (_, i) => {
    const x0 = baseX + i * stairW;
    const y0 = baseY - i * stairH;
    return `L ${x0 + stairW} ${y0} L ${x0 + stairW} ${y0 - stairH}`;
  }).join(" ");

  const climberStep = Math.min(totalStairSteps, activeStep);
  const climberX = baseX + climberStep * stairW - stairW * 0.35;
  const climberY = baseY - climberStep * stairH - 14;

  // Trees geometry inside [24..438, 56..370]
  const roadLeft = 56;
  const roadRight = 406;
  const roadY = 236;
  const slotStep = (roadRight - roadLeft) / treeIntervals;
  const itemScale = Math.min(0.95, Math.max(0.62, slotStep / 48));

  const isPlantableSlot = (slotIdx: number) => {
    if (rawTrees.noEnds) return slotIdx > 0 && slotIdx < treeSlots - 1;
    if (rawTrees.bothEnds) return true;
    return slotIdx < treeSlots - 1;
  };

  // Map plantable slot index -> 1-based plant order (1..treeCount)
  const plantOrderOf = (slotIdx: number) =>
    rawTrees.noEnds ? slotIdx : slotIdx + 1;

  const showKnownPlants = treeAsk !== "count";
  const showRevealedPlants = treeAsk === "count" && scene.phase >= 3;
  const showQuestionMarkers = treeAsk === "count" && scene.phase === 2;

  const visibleArcCount =
    scene.phase === 0
      ? 1
      : scene.phase === 1
        ? Math.min(treeIntervals, activeStep)
        : treeIntervals;

  const showTotalBracketValue = treeAsk !== "total" || scene.phase >= 3;
  const showGapValue = treeAsk !== "gap" || scene.phase >= 3;

  const roadStroke =
    scene.subject === "气球"
      ? "var(--accent-coral)"
      : scene.subject === "花"
        ? "var(--accent-amber)"
        : "var(--ink-secondary)";

  return (
    <StageFrame
      ariaLabel={isStairs ? "爬楼梯间隔问题 2D 动画" : "植树间隔问题 2D 动画"}
      controls={controls}
      statusCaption={statusCaption}
      onReplay={playIntervalDemo}
    >
      {/* Left 2D Story Scene */}
      <rect
        x="24"
        y="56"
        width="414"
        height="314"
        rx="20"
        fill="var(--bg-surface)"
        stroke="var(--border-subtle)"
      />
      <rect x="34" y="66" width="394" height="264" rx="14" fill="var(--bg-stage)" />

      {isStairs ? (
        <g>
          {/* Staircase path */}
          <path
            d={`M ${baseX - 24} ${baseY} H ${baseX} ${stairPath} H ${baseX + totalStairSteps * stairW + 24}`}
            fill="none"
            stroke="var(--accent-teal)"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          {/* Floor Markers */}
          {Array.from({ length: totalStairSteps + 1 }, (_, i) => {
            const fx = baseX + i * stairW;
            const fy = baseY - i * stairH;
            return (
              <g key={i}>
                <circle
                  cx={fx}
                  cy={fy}
                  r="5"
                  fill={i <= activeStep ? "var(--accent-coral)" : "var(--bg-surface)"}
                  stroke="var(--accent-teal)"
                  strokeWidth="2"
                />
                <text
                  x={fx + 14}
                  y={fy + 16}
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--ink-secondary)"
                >
                  {stairsSpec.from + i}楼
                </text>
              </g>
            );
          })}

          {/* Animated Interval Arcs */}
          {scene.phase >= 1 &&
            Array.from({ length: Math.min(totalStairSteps, activeStep) }, (_, step) => {
              const x0 = baseX + step * stairW;
              const y0 = baseY - step * stairH;
              const x1 = x0 + stairW;
              const y1 = y0 - stairH;
              const cx = (x0 + x1) / 2 - 10;
              const cy = (y0 + y1) / 2 - 22;
              return (
                <g key={step}>
                  <path
                    d={`M ${x0} ${y0 - 6} Q ${cx} ${cy} ${x1} ${y1 - 6}`}
                    fill="none"
                    stroke="var(--accent-coral)"
                    strokeWidth="2.8"
                    className="fig-flow-dash"
                  />
                  <rect
                    x={cx - 12}
                    y={cy - 10}
                    width="24"
                    height="16"
                    rx="6"
                    fill="var(--accent-coral)"
                  />
                  <text
                    x={cx}
                    y={cy + 2}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="800"
                    fill="#ffffff"
                  >
                    第{step + 1}段
                  </text>
                </g>
              );
            })}

          {/* Animated 2D Climber */}
          <motion.g
            initial={false}
            animate={{ x: Math.max(baseX - 10, climberX), y: climberY }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <circle cx="0" cy="-12" r="7" fill="var(--accent-coral)" />
            <rect x="-7" y="-4" width="14" height="14" rx="5" fill="var(--accent-coral)" />
          </motion.g>
        </g>
      ) : (
        <g>
          {/* Endpoint Rule Chip */}
          <rect
            x="44"
            y="76"
            width="104"
            height="22"
            rx="11"
            fill={rawTrees.noEnds ? "var(--accent-coral-soft)" : "var(--accent-teal-soft)"}
            stroke={rawTrees.noEnds ? "var(--accent-coral)" : "var(--accent-teal)"}
          />
          <text
            x="96"
            y="91"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="800"
            fill={rawTrees.noEnds ? "var(--accent-coral)" : "var(--accent-teal)"}
          >
            {rawTrees.noEnds ? "两端不栽 ✕" : rawTrees.bothEnds ? "两端都栽 ✓" : "只栽一端"}
          </text>

          {/* Scene Context Tag */}
          <text x="418" y="91" textAnchor="end" fontSize="11" fontWeight="700" fill="var(--ink-secondary)">
            {scene.subject === "气球"
              ? "彩带挂气球"
              : scene.subject === "花"
                ? "操场一侧放花"
                : scene.subject === "彩旗"
                  ? "公路一侧插彩旗"
                  : "小路一侧栽树"}
          </text>

          {/* Top Total-Length Bracket */}
          <g>
            <line
              x1={roadLeft}
              y1="118"
              x2={roadRight}
              y2="118"
              stroke={showTotalBracketValue ? "var(--accent-teal)" : "var(--accent-coral)"}
              strokeWidth="2"
              strokeDasharray={showTotalBracketValue ? undefined : "5 3"}
            />
            <line x1={roadLeft} y1="112" x2={roadLeft} y2="124" stroke={showTotalBracketValue ? "var(--accent-teal)" : "var(--accent-coral)"} strokeWidth="2" />
            <line x1={roadRight} y1="112" x2={roadRight} y2="124" stroke={showTotalBracketValue ? "var(--accent-teal)" : "var(--accent-coral)"} strokeWidth="2" />
            <rect
              x="184"
              y="106"
              width="94"
              height="22"
              rx="11"
              fill={showTotalBracketValue ? "var(--accent-teal-soft)" : "var(--accent-coral-soft)"}
              stroke={showTotalBracketValue ? "var(--accent-teal)" : "var(--accent-coral)"}
            />
            <text
              x="231"
              y="121"
              textAnchor="middle"
              fontSize="11"
              fontWeight="800"
              fill={showTotalBracketValue ? "var(--accent-teal)" : "var(--accent-coral)"}
            >
              {showTotalBracketValue ? `总长 ${totalLength} 米` : "总长 ? 米"}
            </text>
          </g>

          {/* Road / Ribbon / Track Baseline */}
          <line
            x1="44"
            y1={roadY}
            x2="418"
            y2={roadY}
            stroke={roadStroke}
            strokeWidth={scene.subject === "气球" ? "4" : "6"}
            strokeLinecap="round"
          />
          {scene.subject !== "气球" && (
            <line
              x1="52"
              y1={roadY}
              x2="410"
              y2={roadY}
              stroke="var(--bg-surface)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              opacity="0.7"
            />
          )}

          {/* Interval Arcs */}
          {Array.from({ length: visibleArcCount }, (_, i) => {
            const x1 = roadLeft + i * slotStep;
            const x2 = roadLeft + (i + 1) * slotStep;
            const mid = (x1 + x2) / 2;
            const arcDepth = treeIntervals >= 8 ? 24 : 30;
            const showDenseLabels = treeIntervals <= 6 || i === 0 || i === treeIntervals - 1;
            return (
              <g key={`gap-${i}`}>
                <path
                  d={`M ${x1} ${roadY + 6} Q ${mid} ${roadY + 6 + arcDepth} ${x2} ${roadY + 6}`}
                  fill="none"
                  stroke="var(--accent-coral)"
                  strokeWidth="2.4"
                  className="fig-flow-dash"
                />
                {scene.phase >= 2 && (
                  <text
                    x={mid}
                    y={roadY + 21}
                    textAnchor="middle"
                    fontSize={treeIntervals >= 8 ? "9" : "10"}
                    fontWeight="800"
                    fill="var(--accent-coral)"
                  >
                    {i + 1}
                  </text>
                )}
                {showDenseLabels && (
                  <text
                    x={mid}
                    y={roadY + 38}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="700"
                    fill={showGapValue ? "var(--ink-secondary)" : "var(--accent-coral)"}
                  >
                    {showGapValue ? `${gapLength}米` : "?米"}
                  </text>
                )}
              </g>
            );
          })}

          {/* Road Tick Marks & Endpoints / Plant Items (Exact 1-to-1) */}
          {Array.from({ length: treeSlots }, (_, slotIdx) => {
            const tx = roadLeft + slotIdx * slotStep;
            const plantable = isPlantableSlot(slotIdx);
            const isEnd = slotIdx === 0 || slotIdx === treeSlots - 1;
            const order = plantOrderOf(slotIdx);

            // Decide what to render at this exact slot
            const showEmptyEnd = rawTrees.noEnds && isEnd;
            const showActualPlant =
              plantable &&
              (showKnownPlants ||
                (showRevealedPlants && order <= activeStep) ||
                (treeAsk === "count" && scene.phase === 0 && order <= 2));
            const showPendingSlot =
              plantable && showQuestionMarkers;

            return (
              <g key={`slot-${slotIdx}`}>
                {/* Tick mark on road */}
                <circle
                  cx={tx}
                  cy={roadY}
                  r="3.2"
                  fill={showEmptyEnd ? "var(--bg-surface)" : "var(--accent-teal)"}
                  stroke={showEmptyEnd ? "var(--accent-coral)" : "var(--bg-surface)"}
                  strokeWidth="1.5"
                />

                {showEmptyEnd && (
                  <g transform={`translate(${tx} ${roadY - 22})`}>
                    <circle
                      r="9"
                      fill="var(--accent-coral-soft)"
                      stroke="var(--accent-coral)"
                      strokeWidth="1.6"
                      strokeDasharray="3 2"
                    />
                    <text
                      y="3.5"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="800"
                      fill="var(--accent-coral)"
                    >
                      ✕
                    </text>
                    <text
                      y="-14"
                      textAnchor="middle"
                      fontSize="9.5"
                      fontWeight="700"
                      fill="var(--accent-coral)"
                    >
                      {slotIdx === 0 ? "起点" : "终点"}
                    </text>
                  </g>
                )}

                {showPendingSlot && (
                  <g transform={`translate(${tx} ${roadY - 26})`}>
                    <motion.g
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <circle
                        r="10"
                        fill="var(--bg-surface)"
                        stroke="var(--accent-teal)"
                        strokeWidth="1.8"
                        strokeDasharray="3 2"
                      />
                      <text
                        y="4"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="800"
                        fill="var(--accent-teal)"
                      >
                        ?
                      </text>
                    </motion.g>
                  </g>
                )}

                {showActualPlant && (
                  <g transform={`translate(${tx} ${roadY - 38 * itemScale}) scale(${itemScale})`}>
                    <motion.g
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <PlantItem subject={scene.subject} index={order - 1} />
                    </motion.g>
                  </g>
                )}

                {/* 1..N index label above known/revealed plants */}
                {showActualPlant && (showKnownPlants || showRevealedPlants) && (
                  <text
                    x={tx}
                    y={roadY - 56 * itemScale - 4}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="800"
                    fill="var(--ink-secondary)"
                  >
                    {order}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      )}

      {/* Dark Contextual Pill */}
      <rect x="86" y="340" width="290" height="24" rx="12" fill="#1e1e1e" />
      <text x="231" y="356" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
        {pillText}
      </text>

      {/* Right 2D Synchronized Schematic */}
      <rect
        x="456"
        y="56"
        width="280"
        height="314"
        rx="20"
        fill="var(--bg-surface)"
        stroke="var(--border-subtle)"
      />
      <text x="596" y="80" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="var(--ink-primary)">
        {isStairs ? "楼层与间隔对照图" : "点与间隔关系图"}
      </text>

      {/* Dynamic Mini Rule Diagram */}
      {isStairs ? (
        <g>
          {Array.from({ length: 4 }, (_, i) => {
            const nx = 496 + i * 66;
            return (
              <g key={i}>
                {i < 3 && (
                  <line
                    x1={nx + 10}
                    y1="114"
                    x2={nx + 56}
                    y2="114"
                    stroke="var(--accent-coral)"
                    strokeWidth="2.6"
                    className="fig-flow-dash"
                  />
                )}
                <circle
                  cx={nx}
                  cy="114"
                  r="10"
                  fill="var(--accent-teal-soft)"
                  stroke="var(--accent-teal)"
                  strokeWidth="2"
                />
                <text x={nx} y="118" textAnchor="middle" fontSize="10" fontWeight="800" fill="var(--accent-teal)">
                  {stairsSpec.from + i}F
                </text>
              </g>
            );
          })}
          <text x="596" y="144" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-secondary)">
            爬楼梯段数 = 终点楼层 − 起点楼层
          </text>
        </g>
      ) : (
        <g>
          {/* Tailored 3-segment mini schematic reflecting bothEnds vs noEnds */}
          {Array.from({ length: 4 }, (_, i) => {
            const nx = 496 + i * 66;
            const skipNode = rawTrees.noEnds && (i === 0 || i === 3);
            return (
              <g key={i}>
                {i < 3 && (
                  <line
                    x1={nx + 10}
                    y1="112"
                    x2={nx + 56}
                    y2="112"
                    stroke="var(--accent-coral)"
                    strokeWidth="2.6"
                    className="fig-flow-dash"
                  />
                )}
                <circle
                  cx={nx}
                  cy="112"
                  r="9.5"
                  fill={skipNode ? "var(--bg-surface)" : "var(--accent-teal-soft)"}
                  stroke={skipNode ? "var(--accent-coral)" : "var(--accent-teal)"}
                  strokeWidth="2"
                  strokeDasharray={skipNode ? "3 2" : undefined}
                />
                <text
                  x={nx}
                  y="116"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="800"
                  fill={skipNode ? "var(--accent-coral)" : "var(--accent-teal)"}
                >
                  {skipNode ? "✕" : rawTrees.noEnds ? i : i + 1}
                </text>
              </g>
            );
          })}
          <text x="596" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-secondary)">
            {rawTrees.noEnds
              ? "两端都不栽：棵数 = 间隔数 − 1"
              : rawTrees.bothEnds
                ? "两端都栽：棵数 = 间隔数 + 1"
                : "只栽一端：棵数 = 间隔数"}
          </text>

          {/* 3-box live quantity breakdown (strictly non-spoiling) */}
          <g>
            <rect x="472" y="154" width="76" height="42" rx="9" fill="var(--bg-stage)" stroke="var(--border-subtle)" />
            <text x="510" y="170" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink-muted)">总长</text>
            <text x="510" y="187" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="var(--ink-primary)">
              {showTotalBracketValue ? `${totalLength}米` : "?"}
            </text>

            <rect x="558" y="154" width="76" height="42" rx="9" fill="var(--accent-coral-soft)" stroke="var(--accent-coral)" />
            <text x="596" y="170" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--accent-coral)">间隔数</text>
            <text x="596" y="187" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="var(--accent-coral)">
              {scene.phase >= 2 ? `${treeIntervals}段` : "?"}
            </text>

            <rect x="644" y="154" width="76" height="42" rx="9" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" />
            <text x="682" y="170" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--accent-teal)">
              {treeAsk === "gap" ? "每段长" : `${itemNoun}数`}
            </text>
            <text x="682" y="187" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="var(--accent-teal)">
              {treeAsk === "gap"
                ? scene.phase >= 3
                  ? `${gapLength}米`
                  : "?"
                : treeAsk === "count"
                  ? scene.phase >= 3
                    ? `${treeCount}${rawTrees.unit}`
                    : "?"
                  : `${treeCount}个`}
            </text>
          </g>
        </g>
      )}

      {/* Facts cards */}
      {scene.facts.slice(0, isStairs ? 3 : 2).map((fact, fIdx) => (
        <g key={fIdx}>
          <rect
            x="472"
            y={(isStairs ? 166 : 210) + fIdx * 36}
            width="248"
            height="28"
            rx="8"
            fill="var(--bg-stage)"
            stroke="var(--border-subtle)"
          />
          <text
            x="596"
            y={(isStairs ? 184 : 228) + fIdx * 36}
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="700"
            fill="var(--ink-primary)"
          >
            {fact}
          </text>
        </g>
      ))}

      {/* Strictly Non-Spoiling Readouts */}
      <rect x="472" y="294" width="248" height="28" rx="8" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" />
      <text x="596" y="312" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--ink-primary)">
        {scene.middleLabel}：{scene.phase >= 2 ? scene.middleValue : "?"}
      </text>
      <text x="596" y="348" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="var(--accent-coral)">
        结果：{scene.phase >= 3 ? scene.finalValue : "?"}
      </text>
    </StageFrame>
  );
}
