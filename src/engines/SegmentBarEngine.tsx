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

export function SegmentBarEngine({ scene }: { scene: SegmentBarSceneState }) {
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
