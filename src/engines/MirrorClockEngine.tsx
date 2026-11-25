import { motion } from "motion/react";
import type { MirrorClockSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

function ClockFace({
  cx,
  cy,
  hour,
  minute,
  label,
  tone,
}: {
  cx: number;
  cy: number;
  hour: number;
  minute: number;
  label: string;
  tone: "coral" | "teal";
}) {
  const r = 82;
  const minAngle = (minute * 6 - 90) * (Math.PI / 180);
  const hourAngle = (((hour % 12) + minute / 60) * 30 - 90) * (Math.PI / 180);
  const stroke = tone === "coral" ? "var(--accent-coral)" : "var(--accent-teal)";

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="var(--bg-surface)" stroke={stroke} strokeWidth="3" filter="url(#fig-soft-shadow)" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        const tx = cx + Math.cos(a) * (r - 16);
        const ty = cy + Math.sin(a) * (r - 16) + 4;
        return (
          <text key={i} x={tx} y={ty} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-muted)">
            {i === 0 ? 12 : i}
          </text>
        );
      })}
      {/* Hour hand */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos(hourAngle) * 42}
        y2={cy + Math.sin(hourAngle) * 42}
        stroke="var(--ink-primary)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos(minAngle) * 60}
        y2={cy + Math.sin(minAngle) * 60}
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="5" fill="var(--ink-primary)" />
      <text x={cx} y={cy + r + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill={stroke}>
        {label}
      </text>
    </g>
  );
}

export function MirrorClockEngine({ scene }: { scene: MirrorClockSceneState }) {
  const mirrorX = 380;

  if (scene.mode === "clock") {
    const h = scene.hour ?? 3;
    const m = scene.minute ?? 0;
    const mirrorH = (12 - h - (m > 0 ? 1 : 0) + 12) % 12 || 12;
    const mirrorM = m === 0 ? 0 : 60 - m;

    return (
      <StageFrame ariaLabel="镜面时钟对称舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
            <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {scene.annotation}
            </text>
          </motion.g>
        )}

        {/* Mirror Axis */}
        <line x1={mirrorX} y1="88" x2={mirrorX} y2="378" stroke="var(--accent-blue)" strokeWidth="4" strokeDasharray="8 5" />
        <rect x={mirrorX - 30} y="74" width="60" height="22" rx="11" fill="var(--accent-blue)" />
        <text x={mirrorX} y="89" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
          镜面
        </text>

        <ClockFace
          cx={210}
          cy={232}
          hour={h}
          minute={m}
          label={`镜子里的钟：${h}:${String(m).padStart(2, "0")}`}
          tone="coral"
        />

        {scene.showMirrored && (
          <motion.g initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
            <ClockFace
              cx={550}
              cy={232}
              hour={mirrorH}
              minute={mirrorM}
              label={`实际时间：${mirrorH}:${String(mirrorM).padStart(2, "0")}`}
              tone="teal"
            />
          </motion.g>
        )}
      </StageFrame>
    );
  }

  // Shape symmetry mode
  const grid = scene.leftCells ?? [
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 1],
  ];
  const cellSize = 42;
  const startY = 148;

  return (
    <StageFrame ariaLabel="镜面对称翻折舞台">
      {scene.annotation && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
          <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
            {scene.annotation}
          </text>
        </motion.g>
      )}

      <line x1={mirrorX} y1="92" x2={mirrorX} y2="372" stroke="var(--accent-blue)" strokeWidth="4" strokeDasharray="8 5" />
      <rect x={mirrorX - 30} y="78" width="60" height="22" rx="11" fill="var(--accent-blue)" />
      <text x={mirrorX} y="93" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
        镜子
      </text>

      {grid.map((row, rIdx) =>
        row.map((val, cIdx) => {
          const lx = mirrorX - (4 - cIdx) * cellSize - 16;
          const rx = mirrorX + (3 - cIdx) * cellSize + 16;
          const y = startY + rIdx * cellSize;
          return (
            <g key={`cell-${rIdx}-${cIdx}`}>
              <rect
                x={lx}
                y={y}
                width={cellSize - 3}
                height={cellSize - 3}
                rx="6"
                fill={val ? "var(--accent-coral)" : "var(--bg-surface)"}
                stroke="var(--border-strong)"
                strokeWidth="1.5"
              />
              {scene.showMirrored && (
                <motion.rect
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (rIdx + cIdx) * 0.04 }}
                  x={rx}
                  y={y}
                  width={cellSize - 3}
                  height={cellSize - 3}
                  rx="6"
                  fill={val ? "var(--accent-teal)" : "var(--bg-surface)"}
                  stroke="var(--border-strong)"
                  strokeWidth="1.5"
                />
              )}
            </g>
          );
        }),
      )}
    </StageFrame>
  );
}
