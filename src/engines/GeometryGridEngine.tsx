import { motion } from "motion/react";
import type { GeometryGridSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

export function GeometryGridEngine({ scene }: { scene: GeometryGridSceneState }) {
  const ox = 200;
  const oy = 96;
  const rectW = 340;
  const rectH = 230;

  if (scene.variant === "staircase") {
    // 3-step staircase inside (ox, oy) -> (ox + rectW, oy + rectH)
    const w1 = rectW * 0.36;
    const w2 = rectW * 0.32;
    const h1 = rectH * 0.34;
    const h2 = rectH * 0.34;

    const polyPoints = [
      `${ox},${oy}`,
      `${ox + w1},${oy}`,
      `${ox + w1},${oy + h1}`,
      `${ox + w1 + w2},${oy + h1}`,
      `${ox + w1 + w2},${oy + h1 + h2}`,
      `${ox + rectW},${oy + h1 + h2}`,
      `${ox + rectW},${oy + rectH}`,
      `${ox},${oy + rectH}`,
    ].join(" ");

    return (
      <StageFrame ariaLabel="巧求周长台阶平移舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect
              x="110"
              y="20"
              width="540"
              height="34"
              rx="10"
              fill="var(--bg-surface)"
              stroke="var(--border-strong)"
            />
            <text
              x="380"
              y="42"
              textAnchor="middle"
              fontSize="13.5"
              fontWeight="600"
              fill="var(--ink-primary)"
            >
              {scene.annotation}
            </text>
          </motion.g>
        )}

        {/* Target Outer Rectangle Ghost */}
        {scene.showOuterRect && (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x={ox}
            y={oy}
            width={rectW}
            height={rectH}
            fill="none"
            stroke="var(--ink-muted)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
        )}

        {/* Base Polygon */}
        <polygon
          points={polyPoints}
          fill="var(--accent-blue-soft)"
          stroke="var(--ink-primary)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Horizontal step edges that shift UP to y = oy */}
        <motion.line
          x1={ox + w1}
          x2={ox + w1 + w2}
          initial={false}
          animate={{
            y1: scene.shiftedHorizontal ? oy : oy + h1,
            y2: scene.shiftedHorizontal ? oy : oy + h1,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          stroke="var(--accent-coral)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <motion.line
          x1={ox + w1 + w2}
          x2={ox + rectW}
          initial={false}
          animate={{
            y1: scene.shiftedHorizontal ? oy : oy + h1 + h2,
            y2: scene.shiftedHorizontal ? oy : oy + h1 + h2,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.08 }}
          stroke="var(--accent-coral)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Vertical step edges that shift RIGHT to x = ox + rectW */}
        <motion.line
          y1={oy}
          y2={oy + h1}
          initial={false}
          animate={{
            x1: scene.shiftedVertical ? ox + rectW : ox + w1,
            x2: scene.shiftedVertical ? ox + rectW : ox + w1,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          stroke="var(--accent-teal)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <motion.line
          y1={oy + h1}
          y2={oy + h1 + h2}
          initial={false}
          animate={{
            x1: scene.shiftedVertical ? ox + rectW : ox + w1 + w2,
            x2: scene.shiftedVertical ? ox + rectW : ox + w1 + w2,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.08 }}
          stroke="var(--accent-teal)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Outer Dimension Labels */}
        <text
          x={ox + rectW / 2}
          y={oy + rectH + 34}
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill="var(--ink-primary)"
        >
          底边长 = {scene.widthVal} {scene.unit}
        </text>
        <text
          x={ox - 24}
          y={oy + rectH / 2 + 5}
          textAnchor="end"
          fontSize="15"
          fontWeight="700"
          fill="var(--ink-primary)"
        >
          高 = {scene.heightVal} {scene.unit}
        </text>
      </StageFrame>
    );
  }

  // Concave U-shape variant
  const leftW = rectW * 0.3;
  const midW = rectW * 0.4;
  const depthH = rectH * 0.44;

  const uPoints = [
    `${ox},${oy}`,
    `${ox + leftW},${oy}`,
    `${ox + leftW},${oy + depthH}`,
    `${ox + leftW + midW},${oy + depthH}`,
    `${ox + leftW + midW},${oy}`,
    `${ox + rectW},${oy}`,
    `${ox + rectW},${oy + rectH}`,
    `${ox},${oy + rectH}`,
  ].join(" ");

  return (
    <StageFrame ariaLabel="凹字形平移求周长舞台">
      {scene.annotation && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect
            x="110"
            y="20"
            width="540"
            height="34"
            rx="10"
            fill="var(--bg-surface)"
            stroke="var(--border-strong)"
          />
          <text
            x="380"
            y="42"
            textAnchor="middle"
            fontSize="13.5"
            fontWeight="600"
            fill="var(--ink-primary)"
          >
            {scene.annotation}
          </text>
        </motion.g>
      )}

      {scene.showOuterRect && (
        <rect
          x={ox}
          y={oy}
          width={rectW}
          height={rectH}
          fill="none"
          stroke="var(--ink-muted)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
      )}

      <polygon
        points={uPoints}
        fill="var(--accent-blue-soft)"
        stroke="var(--ink-primary)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Bottom of the U-trough shifts UP to close top edge */}
      <motion.line
        x1={ox + leftW}
        x2={ox + leftW + midW}
        initial={false}
        animate={{
          y1: scene.shiftedHorizontal ? oy : oy + depthH,
          y2: scene.shiftedHorizontal ? oy : oy + depthH,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        stroke="var(--accent-teal)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Two inner vertical walls that CANNOT cancel out -> highlighted in coral */}
      <motion.g
        initial={false}
        animate={{ opacity: scene.highlightInnerEdges ? 1 : 0.35 }}
      >
        <line
          x1={ox + leftW}
          y1={oy}
          x2={ox + leftW}
          y2={oy + depthH}
          stroke="var(--accent-coral)"
          strokeWidth={scene.highlightInnerEdges ? 5.5 : 3}
          strokeLinecap="round"
        />
        <line
          x1={ox + leftW + midW}
          y1={oy}
          x2={ox + leftW + midW}
          y2={oy + depthH}
          stroke="var(--accent-coral)"
          strokeWidth={scene.highlightInnerEdges ? 5.5 : 3}
          strokeLinecap="round"
        />
        {scene.highlightInnerEdges && (
          <text
            x={ox + leftW + midW / 2}
            y={oy + depthH / 2 + 5}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent-coral)"
          >
            多出 2 条 {scene.concaveDepth ?? 4}
            {scene.unit}
          </text>
        )}
      </motion.g>

      <text
        x={ox + rectW / 2}
        y={oy + rectH + 34}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="var(--ink-primary)"
      >
        外宽 = {scene.widthVal} {scene.unit}
      </text>
      <text
        x={ox - 24}
        y={oy + rectH / 2 + 5}
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill="var(--ink-primary)"
      >
        外高 = {scene.heightVal} {scene.unit}
      </text>
    </StageFrame>
  );
}
