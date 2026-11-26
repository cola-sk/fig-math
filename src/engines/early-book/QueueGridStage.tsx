import { useEffect, useRef, useState } from "react";
import { Button } from "@ui-sdk/react/button";
import { motion } from "motion/react";
import type { EarlyBookSceneState } from "../../types/lesson";
import { StageFrame } from "../StageFrame";
import { PersonAvatar } from "./QueueActionStage";

export function QueueGridStage({
  scene,
  grid,
}: {
  scene: EarlyBookSceneState;
  grid: NonNullable<EarlyBookSceneState["queueGrid"]>;
}) {
  const totalCols = grid.left + 1 + grid.right;
  const totalRows = grid.front + 1 + grid.back;
  const targetRow = grid.front;
  const targetCol = grid.left;

  const activeAxis =
    scene.phase === 1
      ? grid.firstAxis
      : scene.phase === 2
        ? grid.firstAxis === "horizontal"
          ? "vertical"
          : "horizontal"
        : "both";

  const activeLen =
    activeAxis === "horizontal"
      ? totalCols
      : activeAxis === "vertical"
        ? totalRows
        : totalRows;

  const [axisCursor, setAxisCursor] = useState<number>(
    scene.phase === 0 ? -1 : activeLen - 1,
  );
  const [gridFillRow, setGridFillRow] = useState<number>(
    scene.phase >= 3 ? totalRows - 1 : -1,
  );
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  };

  const runAxisSweep = () => {
    clearTimers();
    setAxisCursor(0);
    const stepMs = Math.max(55, Math.min(115, Math.floor(680 / Math.max(1, activeLen))));
    for (let i = 1; i < activeLen; i++) {
      const id = window.setTimeout(() => setAxisCursor(i), i * stepMs);
      timersRef.current.push(id);
    }
  };

  const runGridExpand = () => {
    clearTimers();
    setGridFillRow(-1);
    const rowDelay = Math.max(75, Math.min(140, Math.floor(650 / Math.max(1, totalRows))));
    for (let r = 0; r < totalRows; r++) {
      const id = window.setTimeout(() => setGridFillRow(r), (r + 1) * rowDelay);
      timersRef.current.push(id);
    }
  };

  useEffect(() => {
    clearTimers();
    if (scene.phase === 0) {
      setAxisCursor(-1);
      setGridFillRow(-1);
    } else if (scene.phase === 1 || scene.phase === 2) {
      setGridFillRow(-1);
      runAxisSweep();
    } else {
      setAxisCursor(activeLen - 1);
      runGridExpand();
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.phase, activeLen, totalRows, totalCols, grid.firstAxis]);

  // Exact 1-to-1 coordinate geometry inside left stage [x: 34..428, y: 66..330]
  const colStep = totalCols > 1 ? Math.min(54, 290 / (totalCols - 1)) : 0;
  const rowStep = totalRows > 1 ? Math.min(42, 194 / (totalRows - 1)) : 0;
  const minPitch = Math.min(colStep || 44, rowStep || 44);
  const avatarScale = Math.min(0.84, Math.max(0.42, minPitch / 36));

  const gridWidth = (totalCols - 1) * colStep;
  const gridHeight = (totalRows - 1) * rowStep;
  const originX = 231 - gridWidth / 2;
  const originY = 202 - gridHeight / 2;

  const cellX = (c: number) => originX + c * colStep;
  const cellY = (r: number) => originY + r * rowStep;
  const targetX = cellX(targetCol);
  const targetY = cellY(targetRow);

  const isHorizontalFirst = grid.firstAxis === "horizontal";

  const axis1Parts = isHorizontalFirst
    ? grid.rightOrdinal
      ? `左 ${grid.left} + 从右第 ${grid.right + 1}`
      : `左 ${grid.left} + ${grid.target} 1 + 右 ${grid.right}`
    : `前 ${grid.front} + ${grid.target} 1 + 后 ${grid.back}`;

  const axis2Parts = isHorizontalFirst
    ? grid.back === 0
      ? `前 ${grid.front} 排 + 最后 1 排`
      : `前 ${grid.front} + ${grid.target} 1 + 后 ${grid.back}`
    : `左 ${grid.left} + ${grid.target} 1 + 右 ${grid.right}`;

  const statusCaption = (() => {
    if (scene.phase === 0) {
      return `先看二维十字方位图：标清「前」「后」「左」「右」各自有几${grid.back === 0 ? "人或几排" : "人"}！`;
    }
    if (scene.phase === 1) {
      return `👆 先集中看${grid.axis1Label}（${axis1Parts}），数一数这一条线上共有多少？`;
    }
    if (scene.phase === 2) {
      return `已知${grid.axis1Label}是 ${scene.middleValue}！再看另一方向（${axis2Parts}）共有几${grid.unit2}？`;
    }
    if (scene.phase === 3) {
      return `✨ ${grid.axis1Label} ${scene.middleValue}、${grid.axis2Label} ${scene.secondMiddleValue ?? "?"}，把十字补全成完整队列算总数！`;
    }
    return `🎉 十字补全为完整方阵队列，总人数：${scene.finalValue}！`;
  })();

  const pillText = (() => {
    if (scene.phase === 0) {
      return `十字方位图 · 先分清前后左右`;
    }
    if (scene.phase === 1) {
      return `聚焦${grid.axis1Label} · 逐个点数 = ?`;
    }
    if (scene.phase === 2) {
      return `${grid.axis1Label} ${scene.middleValue} · ${grid.axis2Label} = ?`;
    }
    if (scene.phase === 3) {
      return `${scene.middleValue} × ${scene.secondMiddleValue ?? "?"} = ?`;
    }
    return `🎉 ${scene.finalValue}`;
  })();

  const controls = (
    <>
      {scene.phase === 1 && (
        <Button
          aria-label="演示排队逐段点数"
          onClick={runAxisSweep}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-teal)] bg-[var(--accent-teal)] px-2.5 py-1 text-xs font-bold text-white transition"
        >
          👆 演示数{grid.axis1Label}
        </Button>
      )}
      {scene.phase === 2 && (
        <Button
          aria-label="演示排队第二维点数"
          onClick={runAxisSweep}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-blue)] bg-[var(--accent-blue)] px-2.5 py-1 text-xs font-bold text-white transition"
        >
          👆 演示数{grid.axis2Label}
        </Button>
      )}
      {scene.phase >= 3 && (
        <Button
          aria-label="演示十字补全方阵动画"
          onClick={runGridExpand}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-coral)] bg-[var(--accent-coral)] px-2.5 py-1 text-xs font-bold text-white transition"
        >
          🎬 演示十字补全队列
        </Button>
      )}
    </>
  );

  return (
    <StageFrame
      ariaLabel="二维排队十字到方阵 2D 渐进动画"
      controls={scene.phase > 0 ? controls : undefined}
      statusCaption={statusCaption}
      onReplay={() => {
        if (scene.phase >= 3) runGridExpand();
        else if (scene.phase >= 1) runAxisSweep();
      }}
    >
      {/* Left 2D Spatial Cross -> Grid Stage */}
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

      {/* Directional Labels at Phase 0..2 */}
      {scene.phase <= 2 && (
        <g>
          {grid.front > 0 && (
            <text
              x={targetX}
              y={Math.max(82, originY - 22)}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="800"
              fill={activeAxis === "vertical" ? "var(--accent-teal)" : "var(--ink-secondary)"}
              opacity={scene.phase === 0 || activeAxis === "vertical" ? 1 : 0.4}
            >
              前 {grid.front} {grid.back === 0 ? "排" : "人"} ↑
            </text>
          )}
          {grid.back > 0 ? (
            <text
              x={targetX}
              y={Math.min(320, cellY(totalRows - 1) + 26)}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="800"
              fill={activeAxis === "vertical" ? "var(--accent-teal)" : "var(--ink-secondary)"}
              opacity={scene.phase === 0 || activeAxis === "vertical" ? 1 : 0.4}
            >
              后 {grid.back} 人 ↓
            </text>
          ) : (
            <text
              x={targetX}
              y={Math.min(320, cellY(totalRows - 1) + 24)}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--accent-coral)"
            >
              （站在最后一排）
            </text>
          )}
          <text
            x={Math.max(42, originX - 18)}
            y={targetY + 4}
            textAnchor="end"
            fontSize="10.5"
            fontWeight="800"
            fill={activeAxis === "horizontal" ? "var(--accent-teal)" : "var(--ink-secondary)"}
            opacity={scene.phase === 0 || activeAxis === "horizontal" ? 1 : 0.4}
          >
            左 {grid.left} 人
          </text>
          <text
            x={Math.min(420, cellX(totalCols - 1) + 18)}
            y={targetY + 4}
            textAnchor="start"
            fontSize="10.5"
            fontWeight="800"
            fill={activeAxis === "horizontal" ? "var(--accent-teal)" : "var(--ink-secondary)"}
            opacity={scene.phase === 0 || activeAxis === "horizontal" ? 1 : 0.4}
          >
            {grid.rightOrdinal ? `从右第 ${grid.right + 1}` : `右 ${grid.right} 人`}
          </text>
        </g>
      )}

      {/* Active Axis Directional Brackets at Phase 1 & 2 */}
      {(scene.phase === 1 || scene.phase === 2) && activeAxis === "horizontal" && (
        <g>
          <path
            d={`M ${cellX(0)} ${targetY + 20} Q ${(cellX(0) + cellX(totalCols - 1)) / 2} ${targetY + 38} ${cellX(totalCols - 1)} ${targetY + 20}`}
            fill="none"
            stroke={grid.rightOrdinal ? "var(--accent-blue)" : "var(--accent-teal)"}
            strokeWidth="2.4"
            className={grid.rightOrdinal ? "fig-flow-dash-reverse" : "fig-flow-dash"}
          />
          <rect
            x="196"
            y={Math.min(302, targetY + 30)}
            width="70"
            height="18"
            rx="9"
            fill="var(--bg-surface)"
            stroke="var(--accent-teal)"
          />
          <text
            x="231"
            y={Math.min(315, targetY + 43)}
            textAnchor="middle"
            fontSize="10"
            fontWeight="800"
            fill="var(--accent-teal)"
          >
            共 ? 人
          </text>
        </g>
      )}

      {(scene.phase === 1 || scene.phase === 2) && activeAxis === "vertical" && (
        <g>
          <path
            d={`M ${targetX + 20} ${cellY(0)} Q ${targetX + 42} ${(cellY(0) + cellY(totalRows - 1)) / 2} ${targetX + 20} ${cellY(totalRows - 1)}`}
            fill="none"
            stroke="var(--accent-teal)"
            strokeWidth="2.4"
            className="fig-flow-dash"
          />
          <rect
            x={Math.min(358, targetX + 32)}
            y={(cellY(0) + cellY(totalRows - 1)) / 2 - 9}
            width="60"
            height="18"
            rx="9"
            fill="var(--bg-surface)"
            stroke="var(--accent-teal)"
          />
          <text
            x={Math.min(388, targetX + 62)}
            y={(cellY(0) + cellY(totalRows - 1)) / 2 + 4}
            textAnchor="middle"
            fontSize="10"
            fontWeight="800"
            fill="var(--accent-teal)"
          >
            共 ? {scene.phase === 1 ? grid.unit1 : grid.unit2}
          </text>
        </g>
      )}

      {/* Phase 3 & 4 Full Grid Dimension Brackets */}
      {scene.phase >= 3 && (
        <g>
          <line
            x1={cellX(0)}
            y1={Math.max(76, originY - 22)}
            x2={cellX(totalCols - 1)}
            y2={Math.max(76, originY - 22)}
            stroke="var(--accent-teal)"
            strokeWidth="2"
            className="fig-flow-dash"
          />
          <rect
            x="176"
            y={Math.max(68, originY - 32)}
            width="110"
            height="18"
            rx="9"
            fill="var(--accent-teal-soft)"
            stroke="var(--accent-teal)"
          />
          <text
            x="231"
            y={Math.max(81, originY - 19)}
            textAnchor="middle"
            fontSize="10"
            fontWeight="800"
            fill="var(--accent-teal)"
          >
            {isHorizontalFirst
              ? `${grid.axis1Label} ${scene.middleValue}`
              : `${grid.axis2Label} ${scene.secondMiddleValue ?? ""}`}
          </text>

          <line
            x1={Math.max(58, originX - 24)}
            y1={cellY(0)}
            x2={Math.max(58, originX - 24)}
            y2={cellY(totalRows - 1)}
            stroke="var(--accent-blue)"
            strokeWidth="2"
            className="fig-flow-dash"
          />
          <text
            x={Math.max(54, originX - 28)}
            y={(cellY(0) + cellY(totalRows - 1)) / 2 + 4}
            textAnchor="end"
            fontSize="10"
            fontWeight="800"
            fill="var(--accent-blue)"
          >
            {isHorizontalFirst
              ? scene.secondMiddleValue ?? ""
              : scene.middleValue}
          </text>
        </g>
      )}

      {/* 1-to-1 Cross & 2D Grid Avatars */}
      {Array.from({ length: totalRows }, (_, r) =>
        Array.from({ length: totalCols }, (_, c) => {
          const isCross = r === targetRow || c === targetCol;
          const isTarget = r === targetRow && c === targetCol;
          const x = cellX(c);
          const y = cellY(r);

          if (scene.phase <= 2 && !isCross) {
            return null;
          }

          if (scene.phase >= 3 && !isCross && r > gridFillRow) {
            return (
              <circle
                key={`${r}-${c}`}
                cx={x}
                cy={y}
                r="2.5"
                fill="var(--border-subtle)"
                opacity="0.5"
              />
            );
          }

          const onActiveArm =
            scene.phase === 0 ||
            scene.phase >= 3 ||
            (activeAxis === "horizontal" && r === targetRow) ||
            (activeAxis === "vertical" && c === targetCol);

          const armPos =
            activeAxis === "horizontal" ? c : activeAxis === "vertical" ? r : r;
          const isCounted =
            scene.phase >= 3 ||
            (scene.phase >= 1 && onActiveArm && armPos <= axisCursor);
          const isHopping =
            (scene.phase === 1 || scene.phase === 2) &&
            onActiveArm &&
            armPos === axisCursor &&
            axisCursor < activeLen - 1;

          return !isCross ? (
            <motion.g
              key={`${r}-${c}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <PersonAvatar
                x={x}
                y={y}
                scale={avatarScale}
                variant="normal"
                counted={isCounted}
                active={false}
              />
            </motion.g>
          ) : (
            <g key={`${r}-${c}`} opacity={onActiveArm ? 1 : 0.26}>
              <PersonAvatar
                x={x}
                y={y}
                scale={avatarScale}
                variant={isTarget ? "p1" : "normal"}
                counted={isCounted}
                active={isHopping}
              />
            </g>
          );
        }),
      )}

      {/* Protagonist Tag */}
      <g>
        <rect
          x={Math.max(40, Math.min(390, targetX - 14))}
          y={targetY - 26 * avatarScale - 16}
          width="28"
          height="16"
          rx="8"
          fill="var(--accent-coral)"
        />
        <text
          x={Math.max(54, Math.min(404, targetX))}
          y={targetY - 26 * avatarScale - 4}
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="#ffffff"
        >
          {grid.target}
        </text>
      </g>

      {/* Dark Contextual Pill */}
      <rect x="86" y="340" width="290" height="24" rx="12" fill="#1e1e1e" />
      <text x="231" y="356" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
        {pillText}
      </text>

      {/* Right 2D Synchronized Model Card */}
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
        十字方位 → 行列模型
      </text>

      {/* Step 1 Card */}
      <rect
        x="472"
        y="96"
        width="248"
        height="54"
        rx="12"
        fill={scene.phase === 1 ? "var(--accent-coral-soft)" : scene.phase >= 2 ? "var(--accent-teal-soft)" : "var(--bg-stage)"}
        stroke={scene.phase === 1 ? "var(--accent-coral)" : scene.phase >= 2 ? "var(--accent-teal)" : "var(--border-subtle)"}
      />
      <text x="486" y="116" fontSize="11" fontWeight="800" fill="var(--ink-secondary)">
        1. {grid.axis1Label}（{axis1Parts}）
      </text>
      <text x="486" y="138" fontSize="14.5" fontWeight="800" fill={scene.phase >= 2 ? "var(--accent-teal)" : "var(--accent-coral)"}>
        {scene.phase >= 2 ? scene.middleValue : "?"}
      </text>

      {/* Step 2 Card */}
      <rect
        x="472"
        y="162"
        width="248"
        height="54"
        rx="12"
        fill={scene.phase === 2 ? "var(--accent-coral-soft)" : scene.phase >= 3 ? "var(--accent-blue-soft)" : "var(--bg-stage)"}
        stroke={scene.phase === 2 ? "var(--accent-coral)" : scene.phase >= 3 ? "var(--accent-blue)" : "var(--border-subtle)"}
        opacity={scene.phase < 2 ? 0.6 : 1}
      />
      <text x="486" y="182" fontSize="11" fontWeight="800" fill="var(--ink-secondary)">
        2. {grid.axis2Label}（{axis2Parts}）
      </text>
      <text x="486" y="204" fontSize="14.5" fontWeight="800" fill={scene.phase >= 3 ? "var(--accent-blue)" : "var(--accent-coral)"}>
        {scene.phase >= 3 ? scene.secondMiddleValue ?? "?" : "?"}
      </text>

      {/* Step 3 Synthesis Card */}
      <rect
        x="472"
        y="228"
        width="248"
        height="54"
        rx="12"
        fill={scene.phase === 3 ? "var(--accent-coral-soft)" : "var(--bg-stage)"}
        stroke={scene.phase === 3 ? "var(--accent-coral)" : "var(--border-subtle)"}
        opacity={scene.phase < 3 ? 0.6 : 1}
      />
      <text x="486" y="248" fontSize="11" fontWeight="800" fill="var(--ink-secondary)">
        3. 补全方阵（{grid.axis1Label} × {grid.axis2Label}）
      </text>
      <text x="486" y="270" fontSize="13.5" fontWeight="800" fill="var(--ink-primary)">
        {scene.phase >= 3
          ? `${scene.middleValue} × ${scene.secondMiddleValue ?? "?"}`
          : "? × ?"}
      </text>

      {/* Strictly Non-Spoiling Readouts */}
      <rect x="472" y="294" width="248" height="28" rx="8" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" />
      <text x="596" y="312" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink-primary)">
        {scene.phase >= 3
          ? `${grid.axis1Label} ${scene.middleValue} · ${grid.axis2Label} ${scene.secondMiddleValue ?? "?"}`
          : `${scene.middleLabel}：${scene.phase >= 2 ? scene.middleValue : "?"}`}
      </text>
      <text x="596" y="348" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="var(--accent-coral)">
        结果：{scene.phase >= 4 ? scene.finalValue : "?"}
      </text>
    </StageFrame>
  );
}
