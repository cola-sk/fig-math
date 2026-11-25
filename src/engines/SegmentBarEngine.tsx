import { motion } from "motion/react";
import type { SegmentBarRow, SegmentBarSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

const COLOR_MAP: Record<SegmentBarRow["color"], { fill: string; stroke: string; soft: string }> = {
  coral: {
    fill: "var(--accent-coral)",
    stroke: "var(--accent-coral)",
    soft: "var(--accent-coral-soft)",
  },
  teal: {
    fill: "var(--accent-teal)",
    stroke: "var(--accent-teal)",
    soft: "var(--accent-teal-soft)",
  },
  blue: {
    fill: "var(--accent-blue)",
    stroke: "var(--accent-blue)",
    soft: "var(--accent-blue-soft)",
  },
  amber: {
    fill: "var(--accent-amber)",
    stroke: "var(--accent-amber)",
    soft: "rgba(199, 125, 25, 0.14)",
  },
};

function FlatPersonIcon({
  x,
  y,
  fill,
  faded = false,
}: {
  x: number;
  y: number;
  fill: string;
  faded?: boolean;
}) {
  return (
    <g transform={`translate(${x}, ${y})`} opacity={faded ? 0.36 : 1}>
      <circle cx="0" cy="-9" r="5" fill={fill} stroke="var(--ink-primary)" strokeWidth="1.2" />
      <path
        d="M -6.5 3 C -6.5 -4, 6.5 -4, 6.5 3 Z"
        fill={fill}
        stroke="var(--ink-primary)"
        strokeWidth="1.2"
      />
    </g>
  );
}

export function SegmentBarEngine({ scene }: { scene: SegmentBarSceneState }) {
  // Flat 2D storybook bus stop scene for Bus Ride lessons
  if (scene.visualMode === "bus" && scene.busVisual) {
    const { initial, getOff, getOn, phase } = scene.busVisual;
    const netChange = getOn - getOff;
    const finalCount = initial + netChange;
    const isOffset = phase === "offset";
    const isTotal = phase === "total";

    const maxRowCount = Math.max(getOff, getOn, 1);
    const dotStep = Math.min(28, 390 / maxRowCount);
    const rowStartX = 212;
    const offY = 312;
    const onY = 362;
    const extraBoxX = rowStartX + getOff * dotStep - 10;
    const extraBoxW = Math.max(24, netChange * dotStep - 4);
    const extraLabelX = Math.min(640, Math.max(extraBoxX + extraBoxW / 2, rowStartX + getOff * dotStep + 22));

    return (
      <StageFrame ariaLabel="平面公交车上下车场景舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
            <rect x="90" y="18" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
            <text x="380" y="41" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {scene.annotation}
            </text>
          </motion.g>
        )}

        {/* Road & Bus Stop Sign (Clean Flat 2D) */}
        <line x1="56" y1="226" x2="704" y2="226" stroke="var(--border-strong)" strokeWidth="2.5" strokeLinecap="round" />
        <g transform="translate(626, 132)">
          <line x1="16" y1="24" x2="16" y2="94" stroke="var(--ink-secondary)" strokeWidth="3" strokeLinecap="round" />
          <rect x="-12" y="0" width="56" height="28" rx="8" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="2" />
          <text x="16" y="18" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="var(--accent-teal)">
            少年宫站
          </text>
        </g>

        {/* Left Side: Getting Off indicator */}
        <g transform="translate(74, 140)">
          <motion.g
            initial={false}
            animate={{ opacity: isTotal ? 0.35 : 1, x: isTotal ? -8 : 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <rect x="0" y="0" width="104" height="58" rx="14" fill="rgba(199, 125, 25, 0.14)" stroke="var(--accent-amber)" strokeWidth="2" />
            <text x="52" y="23" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent-amber)">
              ← 下车
            </text>
            <text x="52" y="45" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--ink-primary)">
              {getOff} 人
            </text>
          </motion.g>
        </g>

        {/* Center: Cute Flat 2D Side-View School Bus */}
        <g transform="translate(216, 98)" filter="url(#fig-soft-shadow)">
          <rect
            x="0"
            y="0"
            width="284"
            height="112"
            rx="20"
            fill="#ffd66b"
            stroke="var(--ink-primary)"
            strokeWidth="2.5"
          />
          <rect x="2" y="74" width="280" height="12" fill="#f5a623" fillOpacity="0.45" />
          {[18, 66, 114, 162].map((wx, i) => (
            <rect
              key={i}
              x={wx}
              y="16"
              width="38"
              height="32"
              rx="7"
              fill="#e6f5fc"
              stroke="var(--ink-primary)"
              strokeWidth="1.8"
            />
          ))}
          <path
            d="M 214 16 H 260 C 266 16 270 20 270 26 V 48 H 214 Z"
            fill="#d7effa"
            stroke="var(--ink-primary)"
            strokeWidth="1.8"
          />
          <circle cx="274" cy="86" r="5" fill="#fff5cc" stroke="var(--ink-primary)" strokeWidth="1.5" />
          <circle cx="64" cy="112" r="17" fill="#32302e" stroke="var(--bg-surface)" strokeWidth="3" />
          <circle cx="64" cy="112" r="6" fill="#d9d4cb" />
          <circle cx="222" cy="112" r="17" fill="#32302e" stroke="var(--bg-surface)" strokeWidth="3" />
          <circle cx="222" cy="112" r="6" fill="#d9d4cb" />

          {/* Passenger Counter inside Bus */}
          <motion.g
            initial={false}
            animate={{ scale: isTotal ? 1.04 : 1 }}
            style={{ originX: "142px", originY: "78px" }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            <rect
              x="54"
              y="60"
              width="176"
              height="34"
              rx="11"
              fill={isTotal ? "var(--accent-teal)" : "var(--bg-surface)"}
              stroke="var(--ink-primary)"
              strokeWidth="1.8"
            />
            <text
              x="142"
              y="82"
              textAnchor="middle"
              fontSize="14.5"
              fontWeight="800"
              fill={isTotal ? "#ffffff" : "var(--ink-primary)"}
            >
              {isTotal ? `现在车上：${finalCount} 人` : `车上原有：${initial} 人`}
            </text>
          </motion.g>
        </g>

        {/* Right Side: Getting On indicator */}
        <g transform="translate(518, 140)">
          <motion.g
            initial={false}
            animate={{
              x: isTotal ? -92 : 0,
              y: isTotal ? -58 : 0,
              opacity: isTotal ? 0.96 : 1,
            }}
            transition={{ type: "spring", stiffness: 190, damping: 20 }}
          >
            <rect
              x="0"
              y="0"
              width="98"
              height="58"
              rx="14"
              fill={isTotal ? "var(--accent-teal-soft)" : "var(--accent-coral-soft)"}
              stroke={isTotal ? "var(--accent-teal)" : "var(--accent-coral)"}
              strokeWidth="2"
            />
            <text
              x="49"
              y="23"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={isTotal ? "var(--accent-teal)" : "var(--accent-coral)"}
            >
              {isTotal ? "净多出" : "← 上车"}
            </text>
            <text x="49" y="45" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--ink-primary)">
              +{isTotal ? netChange : getOn} 人
            </text>
          </motion.g>
        </g>

        {/* Bottom Visual Math Area: Observe -> One-to-One Offset -> Total */}
        {!isTotal ? (
          <g>
            <rect
              x="74"
              y="258"
              width="612"
              height="146"
              rx="16"
              fill="var(--bg-surface)"
              stroke="var(--border-subtle)"
              strokeWidth="1.5"
            />
            <text x="192" y={offY} textAnchor="end" fontSize="13.5" fontWeight="800" fill="var(--ink-primary)">
              下车 ({getOff}人)
            </text>
            <text x="192" y={onY} textAnchor="end" fontSize="13.5" fontWeight="800" fill="var(--ink-primary)">
              上车 ({getOn}人)
            </text>

            {Array.from({ length: getOff }).map((_, i) => (
              <FlatPersonIcon
                key={`off-p-${i}`}
                x={rowStartX + i * dotStep}
                y={offY - 2}
                fill="#e59a38"
                faded={isOffset}
              />
            ))}

            {Array.from({ length: getOn }).map((_, i) => {
              const isMatched = i < getOff;
              return (
                <FlatPersonIcon
                  key={`on-p-${i}`}
                  x={rowStartX + i * dotStep}
                  y={onY - 2}
                  fill={isOffset && !isMatched ? "var(--accent-coral)" : "var(--accent-teal)"}
                  faded={isOffset && isMatched}
                />
              );
            })}

            {isOffset && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <rect
                  x={rowStartX - 14}
                  y={offY - 22}
                  width={getOff * dotStep}
                  height={onY - offY + 32}
                  rx="10"
                  fill="var(--bg-surface-muted)"
                  fillOpacity="0.28"
                  stroke="var(--ink-muted)"
                  strokeWidth="1.6"
                  strokeDasharray="5 4"
                />
                <text
                  x={rowStartX - 14 + (getOff * dotStep) / 2}
                  y={offY - 28}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="800"
                  fill="var(--ink-secondary)"
                >
                  一进一出抵消 {getOff} 人
                </text>

                <rect
                  x={extraBoxX}
                  y={onY - 22}
                  width={extraBoxW}
                  height="32"
                  rx="10"
                  fill="var(--accent-coral-soft)"
                  stroke="var(--accent-coral)"
                  strokeWidth="2"
                />
                <text
                  x={extraLabelX}
                  y={offY + 4}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="900"
                  fill="var(--accent-coral)"
                >
                  多出 {netChange} 人！
                </text>
              </motion.g>
            )}

            {!isOffset && (
              <text x="656" y="336" textAnchor="end" fontSize="13" fontWeight="700" fill="var(--accent-coral)">
                比一比：哪一排更长？
              </text>
            )}
          </g>
        ) : (
          <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <rect
              x="96"
              y="268"
              width="568"
              height="112"
              rx="16"
              fill="var(--bg-surface)"
              stroke="var(--accent-teal)"
              strokeWidth="2"
            />
            <rect x="128" y="294" width="350" height="40" rx="10" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="2" />
            <text x="303" y="319" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="var(--ink-primary)">
              原来车上：{initial} 人
            </text>
            <rect x="486" y="294" width="146" height="40" rx="10" fill="var(--accent-coral-soft)" stroke="var(--accent-coral)" strokeWidth="2" />
            <text x="559" y="319" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="var(--accent-coral)">
              多出 +{netChange} 人
            </text>
            <text x="380" y="364" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="var(--ink-primary)">
              合起来：{initial} + {netChange} = {finalCount} 人（顺序验算：{initial} - {getOff} + {getOn} = {finalCount} 人 ✓）
            </text>
          </motion.g>
        )}
      </StageFrame>
    );
  }

  // Concrete countable token mode for young learners (6-8yo Grade 1-2)
  if (scene.visualMode === "dots" && scene.dotVisual) {
    const {
      row1Label,
      row2Label,
      row1Count,
      row2Count,
      movedCount,
      showSplitGuide,
    } = scene.dotVisual;

    const maxCols = Math.max(row1Count, row2Count + movedCount, 12);
    const startX = 118;
    const availW = 590;
    const stepX = Math.min(34, availW / Math.max(1, maxCols));
    const radius = Math.min(11, stepX * 0.36);
    const yRow1 = 158;
    const yRow2 = 278;

    const keptRow1 = row1Count - movedCount;
    const baseOverlap = Math.min(row1Count, row2Count);
    const diffCount = Math.max(0, row1Count - row2Count);

    return (
      <StageFrame ariaLabel="实物移多补少动态舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
            <rect
              x="90"
              y="22"
              width="580"
              height="38"
              rx="12"
              fill="var(--bg-surface)"
              stroke="var(--border-strong)"
            />
            <text
              x="380"
              y="46"
              textAnchor="middle"
              fontSize="14.5"
              fontWeight="700"
              fill="var(--ink-primary)"
            >
              {scene.annotation}
            </text>
          </motion.g>
        )}

        {/* Row Labels */}
        <text
          x={startX - 20}
          y={yRow1 + 5}
          textAnchor="end"
          fontSize="15"
          fontWeight="700"
          fill="var(--ink-primary)"
        >
          {row1Label}
        </text>
        <text
          x={startX - 20}
          y={yRow2 + 5}
          textAnchor="end"
          fontSize="15"
          fontWeight="700"
          fill="var(--ink-primary)"
        >
          {row2Label}
        </text>

        {/* Alignment dashed line after baseOverlap */}
        {baseOverlap > 0 && (
          <line
            x1={startX + baseOverlap * stepX - stepX * 0.5}
            y1={yRow1 - 36}
            x2={startX + baseOverlap * stepX - stepX * 0.5}
            y2={yRow2 + 36}
            stroke="var(--ink-muted)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        )}

        {/* Half-split scissor line in the middle of the extra tokens */}
        {showSplitGuide && diffCount >= 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const splitX =
                startX + (baseOverlap + diffCount / 2) * stepX - stepX * 0.5;
              return (
                <g>
                  <line
                    x1={splitX}
                    y1={yRow1 - 44}
                    x2={splitX}
                    y2={yRow1 + 36}
                    stroke="var(--accent-coral)"
                    strokeWidth="2.5"
                    strokeDasharray="5 3"
                  />
                  <rect
                    x={splitX - 34}
                    y={yRow1 - 66}
                    width="68"
                    height="22"
                    rx="11"
                    fill="var(--accent-coral)"
                  />
                  <text
                    x={splitX}
                    y={yRow1 - 51}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="#ffffff"
                  >
                    对半切开
                  </text>
                </g>
              );
            })()}
          </motion.g>
        )}

        {/* Row 2 original tokens */}
        {Array.from({ length: row2Count }).map((_, idx) => {
          const cx = startX + idx * stepX;
          return (
            <motion.g
              key={`r2-dot-${idx}`}
              initial={false}
              animate={{ x: cx, y: yRow2 }}
            >
              <circle
                cx="0"
                cy="0"
                r={radius}
                fill="var(--accent-teal)"
                fillOpacity="0.88"
                stroke="var(--bg-surface)"
                strokeWidth="2"
              />
              <circle cx="-3" cy="-3" r={radius * 0.25} fill="#ffffff" fillOpacity="0.55" />
            </motion.g>
          );
        })}

        {/* Row 1 tokens — the last `movedCount` literally fly down to Row 2! */}
        {Array.from({ length: row1Count }).map((_, idx) => {
          const isExtra = idx >= baseOverlap;
          const isMoving = movedCount > 0 && idx >= keptRow1;
          const moveOrder = idx - keptRow1;
          const targetX = isMoving
            ? startX + (row2Count + moveOrder) * stepX
            : startX + idx * stepX;
          const targetY = isMoving ? yRow2 : yRow1;
          const startPosX = startX + idx * stepX;

          return (
            <motion.g
              key={`r1-dot-${idx}`}
              initial={{ x: startPosX, y: yRow1 }}
              animate={{ x: targetX, y: targetY }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 18,
                delay: isMoving ? moveOrder * 0.08 : 0,
              }}
            >
              <circle
                cx="0"
                cy="0"
                r={radius}
                fill={isExtra ? "var(--accent-coral)" : "var(--accent-blue)"}
                fillOpacity="0.92"
                stroke="var(--bg-surface)"
                strokeWidth="2"
                filter={isMoving ? "url(#fig-soft-shadow)" : undefined}
              />
              <circle cx="-3" cy="-3" r={radius * 0.25} fill="#ffffff" fillOpacity="0.55" />
            </motion.g>
          );
        })}

        {/* Row count pills at right */}
        <g transform={`translate(118, ${yRow1 + 48})`}>
          <text fontSize="13" fontWeight="700" fill="var(--ink-secondary)">
            第一行现在有 {keptRow1} 个
          </text>
        </g>
        <g transform={`translate(118, ${yRow2 + 48})`}>
          <text fontSize="13" fontWeight="700" fill="var(--accent-teal)">
            第二行现在有 {row2Count + movedCount} 个
            {keptRow1 === row2Count + movedCount ? "（两行一样多啦！）" : ""}
          </text>
        </g>
      </StageFrame>
    );
  }

  const barStartX = 135;
  const maxBarW = 470;
  const rowGap = 92;
  const startY = 92;
  const barH = 44;

  return (
    <StageFrame ariaLabel="线段图推理舞台">
      {/* Top Annotation */}
      {scene.annotation && (
        <motion.g
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <rect
            x="90"
            y="22"
            width="580"
            height="36"
            rx="10"
            fill="var(--bg-surface)"
            stroke="var(--border-strong)"
          />
          <text
            x="380"
            y="45"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--ink-primary)"
          >
            {scene.annotation}
          </text>
        </motion.g>
      )}

      {/* Vertical Dashed Baseline */}
      <line
        x1={barStartX}
        y1={startY - 12}
        x2={barStartX}
        y2={startY + scene.rows.length * rowGap - 22}
        stroke="var(--ink-muted)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {scene.rows.map((row, rowIdx) => {
        const y = startY + rowIdx * rowGap;
        const palette = COLOR_MAP[row.color];
        const totalRowW = Math.max(90, row.visualTotalRatio * maxBarW);
        const hasExtra = typeof row.extraValue === "number" && row.extraValue !== 0;
        const extraVisualRatio = hasExtra ? Math.min(0.32, Math.max(0.16, Math.abs(row.extraValue!) / 60)) : 0;
        const baseW = hasExtra && row.extraValue! > 0
          ? totalRowW * (1 - extraVisualRatio)
          : totalRowW;
        const extraW = hasExtra ? totalRowW * extraVisualRatio : 0;
        const singlePartW = baseW / Math.max(1, row.parts);
        const extraOffset = row.extraState === "detached" ? 28 : 0;

        return (
          <g key={row.id}>
            {/* Row Name */}
            <text
              x={barStartX - 16}
              y={y + barH / 2 + 5}
              textAnchor="end"
              fontSize="15"
              fontWeight="700"
              fill="var(--ink-primary)"
            >
              {row.label}
            </text>

            {/* Equal Parts */}
            {Array.from({ length: row.parts }).map((_, partIdx) => {
              const px = barStartX + partIdx * singlePartW;
              return (
                <motion.g
                  key={`${row.id}-part-${partIdx}`}
                  initial={false}
                  animate={{ x: px, y }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                >
                  <rect
                    width={Math.max(16, singlePartW - 3)}
                    height={barH}
                    rx="8"
                    fill={palette.soft}
                    stroke={palette.stroke}
                    strokeWidth="2"
                  />
                  {row.partLabel && (
                    <text
                      x={(singlePartW - 3) / 2}
                      y={barH / 2 + 5}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="700"
                      fill="var(--ink-primary)"
                    >
                      {row.partLabel}
                    </text>
                  )}
                </motion.g>
              );
            })}

            {/* Extra Constant Segment */}
            {hasExtra && (
              <motion.g
                initial={false}
                animate={{
                  x: barStartX + baseW + extraOffset,
                  y,
                  opacity: row.extraState === "faded" ? 0.32 : 1,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
              >
                <rect
                  width={Math.max(48, extraW)}
                  height={barH}
                  rx="8"
                  fill={
                    row.extraState === "highlighted" || row.extraState === "detached"
                      ? "url(#fig-hatch-coral)"
                      : palette.soft
                  }
                  stroke={
                    row.extraState === "highlighted" || row.extraState === "detached"
                      ? "var(--accent-coral)"
                      : palette.stroke
                  }
                  strokeWidth="2"
                  strokeDasharray={row.extraState === "faded" || row.extraState === "detached" ? "5 3" : undefined}
                />
                {row.extraLabel && (
                  <text
                    x={Math.max(48, extraW) / 2}
                    y={barH / 2 + 5}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill={
                      row.extraState === "detached" || row.extraState === "highlighted"
                        ? "var(--accent-coral)"
                        : "var(--ink-primary)"
                    }
                  >
                    {row.extraLabel}
                  </text>
                )}
              </motion.g>
            )}

            {/* Transfer Note (e.g. give 4 candies) */}
            {row.transferNote && (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                x={barStartX + totalRowW + 14}
                y={y + barH / 2 + 5}
                fontSize="13"
                fontWeight="600"
                fill="var(--accent-coral)"
              >
                {row.transferNote}
              </motion.text>
            )}
          </g>
        );
      })}

      {/* Difference Alignment Guide */}
      {scene.diffGuide && scene.rows.length >= 2 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {(() => {
            const rA = scene.rows[scene.diffGuide.fromRow];
            const rB = scene.rows[scene.diffGuide.toRow];
            const endA = barStartX + rA.visualTotalRatio * maxBarW;
            const endB = barStartX + rB.visualTotalRatio * maxBarW;
            const minX = Math.min(endA, endB);
            const maxX = Math.max(endA, endB);
            const yTop = startY + scene.diffGuide.fromRow * rowGap + barH + 10;
            const yBot = startY + scene.diffGuide.toRow * rowGap - 10;
            const yMid = (yTop + yBot) / 2;

            return (
              <g>
                <line
                  x1={minX}
                  y1={startY}
                  x2={minX}
                  y2={startY + scene.rows.length * rowGap - 20}
                  stroke="var(--accent-coral)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d={`M ${minX} ${yMid} L ${maxX} ${yMid}`}
                  stroke="var(--accent-coral)"
                  strokeWidth="2"
                />
                <rect
                  x={(minX + maxX) / 2 - 42}
                  y={yMid - 12}
                  width="84"
                  height="24"
                  rx="6"
                  fill="var(--bg-surface)"
                  stroke="var(--accent-coral)"
                />
                <text
                  x={(minX + maxX) / 2}
                  y={yMid + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--accent-coral)"
                >
                  {scene.diffGuide.label}
                </text>
              </g>
            );
          })()}
        </motion.g>
      )}

      {/* Total Brace at the right */}
      {scene.totalBrace && (
        <g transform={`translate(645, ${startY})`}>
          <motion.g
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
          >
          <path
            d={`M 0 0 Q 16 0 16 20 L 16 ${(scene.rows.length - 1) * rowGap / 2 + 12} Q 16 ${(scene.rows.length - 1) * rowGap / 2 + 22} 28 ${(scene.rows.length - 1) * rowGap / 2 + 22} Q 16 ${(scene.rows.length - 1) * rowGap / 2 + 22} 16 ${(scene.rows.length - 1) * rowGap / 2 + 32} L 16 ${(scene.rows.length - 1) * rowGap + barH - 20} Q 16 ${(scene.rows.length - 1) * rowGap + barH} 0 ${(scene.rows.length - 1) * rowGap + barH}`}
            fill="none"
            stroke={
              scene.totalBrace.state === "adjusted"
                ? "var(--accent-coral)"
                : scene.totalBrace.state === "solved"
                  ? "var(--accent-teal)"
                  : "var(--ink-primary)"
            }
            strokeWidth="2.2"
          />
          <text
            x="36"
            y={(scene.rows.length - 1) * rowGap / 2 + 26}
            fontSize="15"
            fontWeight="700"
            fill={
              scene.totalBrace.state === "adjusted"
                ? "var(--accent-coral)"
                : scene.totalBrace.state === "solved"
                  ? "var(--accent-teal)"
                  : "var(--ink-primary)"
            }
          >
            {scene.totalBrace.label}
          </text>
          </motion.g>
        </g>
      )}
    </StageFrame>
  );
}
