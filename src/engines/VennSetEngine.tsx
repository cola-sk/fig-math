import { motion } from "motion/react";
import type { VennSetSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

export function VennSetEngine({ scene }: { scene: VennSetSceneState }) {
  const cxLeft = 308;
  const cxRight = 452;
  const cy = 248;
  const r = 104;

  const onlyLeft = Math.max(0, scene.leftTotal - scene.overlapCount);
  const onlyRight = Math.max(0, scene.rightTotal - scene.overlapCount);
  const unionCount = onlyLeft + scene.overlapCount + onlyRight;

  return (
    <StageFrame ariaLabel="集合重叠韦恩图舞台">
      {scene.annotation && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect
            x="90"
            y="18"
            width="580"
            height="36"
            rx="12"
            fill="var(--bg-surface)"
            stroke="var(--border-strong)"
          />
          <text
            x="380"
            y="41"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--ink-primary)"
          >
            {scene.annotation}
          </text>
        </motion.g>
      )}

      {/* Outer Universe Box */}
      <rect
        x="80"
        y="74"
        width="600"
        height="332"
        rx="20"
        fill={
          scene.highlightZone === "neither"
            ? "var(--accent-blue-soft)"
            : "var(--bg-surface)"
        }
        stroke={
          scene.highlightZone === "neither"
            ? "var(--accent-blue)"
            : "var(--border-strong)"
        }
        strokeWidth="2"
      />
      <text
        x="102"
        y="102"
        fontSize="14"
        fontWeight="700"
        fill="var(--ink-primary)"
      >
        {scene.totalLabel}：{scene.totalCount} 人
      </text>

      {/* Left Circle */}
      <motion.circle
        cx={cxLeft}
        cy={cy}
        r={r}
        fill="var(--accent-coral)"
        fillOpacity={scene.highlightZone === "neither" ? 0.1 : 0.18}
        stroke="var(--accent-coral)"
        strokeWidth={scene.highlightZone === "disjoint" ? 3 : 2.2}
      />

      {/* Right Circle */}
      <motion.circle
        cx={cxRight}
        cy={cy}
        r={r}
        fill="var(--accent-teal)"
        fillOpacity={scene.highlightZone === "neither" ? 0.1 : 0.18}
        stroke="var(--accent-teal)"
        strokeWidth={scene.highlightZone === "disjoint" ? 3 : 2.2}
      />

      {/* Left & Right Circle Titles */}
      <text
        x={cxLeft - 44}
        y={cy - r - 12}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="var(--accent-coral)"
      >
        {scene.leftLabel} ({scene.leftTotal}人)
      </text>
      <text
        x={cxRight + 44}
        y={cy - r - 12}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="var(--accent-teal)"
      >
        {scene.rightLabel} ({scene.rightTotal}人)
      </text>

      {/* Region Numbers */}
      <g>
        <text
          x={cxLeft - 46}
          y={cy - 4}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="var(--ink-secondary)"
        >
          只喜欢左边
        </text>
        <text
          x={cxLeft - 46}
          y={cy + 20}
          textAnchor="middle"
          fontSize="20"
          fontWeight="800"
          fill="var(--accent-coral)"
        >
          {onlyLeft}人
        </text>
      </g>

      <g>
        <text
          x={cxRight + 46}
          y={cy - 4}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="var(--ink-secondary)"
        >
          只喜欢右边
        </text>
        <text
          x={cxRight + 46}
          y={cy + 20}
          textAnchor="middle"
          fontSize="20"
          fontWeight="800"
          fill="var(--accent-teal)"
        >
          {onlyRight}人
        </text>
      </g>

      {/* Overlap Intersection Pill */}
      <motion.g
        initial={false}
        animate={{
          scale: scene.highlightZone === "overlap" ? 1.08 : 1,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
      >
        <rect
          x="342"
          y={cy - 28}
          width="76"
          height="56"
          rx="14"
          fill="var(--bg-surface)"
          stroke={
            scene.highlightZone === "overlap"
              ? "var(--accent-coral)"
              : "var(--border-strong)"
          }
          strokeWidth={scene.highlightZone === "overlap" ? 2.5 : 1.5}
          filter="url(#fig-soft-shadow)"
        />
        <text
          x="380"
          y={cy - 5}
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="700"
          fill="var(--ink-secondary)"
        >
          都喜欢
        </text>
        <text
          x="380"
          y={cy + 18}
          textAnchor="middle"
          fontSize="18"
          fontWeight="800"
          fill="var(--accent-coral)"
        >
          {scene.overlapCount}人
        </text>
      </motion.g>

      {/* Union / Neither Summary Footer */}
      <g transform="translate(102, 386)">
        <text fontSize="13.5" fontWeight="700" fill="var(--ink-primary)">
          至少喜欢一项：{unionCount} 人
        </text>
      </g>
      <g transform="translate(658, 386)">
        <text
          textAnchor="end"
          fontSize="13.5"
          fontWeight="700"
          fill={
            scene.highlightZone === "neither"
              ? "var(--accent-blue)"
              : "var(--ink-secondary)"
          }
        >
          两样都不喜欢：{scene.neitherCount} 人
        </text>
      </g>
    </StageFrame>
  );
}
