import { motion } from "motion/react";
import type { CountDiagramSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

export function CountDiagramEngine({ scene }: { scene: CountDiagramSceneState }) {
  const n = scene.baseCount;
  const span = scene.highlightSpan;

  if (scene.mode === "segments") {
    const x0 = 110;
    const x1 = 650;
    const lineY = 230;
    const stepW = (x1 - x0) / n;
    const labels = ["A", "B", "C", "D", "E", "F", "G"];

    const arcs: Array<{ start: number; end: number }> = [];
    if (span >= 1) {
      for (let i = 0; i <= n - span; i++) {
        arcs.push({ start: i, end: i + span });
      }
    }

    return (
      <StageFrame ariaLabel="有序数线段舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
            <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {scene.annotation}
            </text>
          </motion.g>
        )}

        <line x1={x0} y1={lineY} x2={x1} y2={lineY} stroke="var(--ink-primary)" strokeWidth="4" strokeLinecap="round" />

        {Array.from({ length: n + 1 }).map((_, idx) => {
          const px = x0 + idx * stepW;
          return (
            <g key={`pt-${idx}`} transform={`translate(${px}, ${lineY})`}>
              <circle cx="0" cy="0" r="7" fill="var(--bg-surface)" stroke="var(--ink-primary)" strokeWidth="2.5" />
              <text x="0" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--ink-primary)">
                {labels[idx] ?? idx + 1}
              </text>
            </g>
          );
        })}

        {arcs.map((arc, idx) => {
          const sx = x0 + arc.start * stepW;
          const ex = x0 + arc.end * stepW;
          const mx = (sx + ex) / 2;
          const lift = 36 + span * 26 + (idx % 2) * 14;
          const color = span === 1 ? "var(--accent-coral)" : span === 2 ? "var(--accent-teal)" : "var(--accent-blue)";
          return (
            <motion.g
              key={`arc-${span}-${idx}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <path
                d={`M ${sx} ${lineY - 8} Q ${mx} ${lineY - lift} ${ex} ${lineY - 8}`}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text x={mx} y={lineY - lift * 0.54} textAnchor="middle" fontSize="12" fontWeight="800" fill={color}>
                {labels[arc.start]}{labels[arc.end]}
              </text>
            </motion.g>
          );
        })}
      </StageFrame>
    );
  }

  if (scene.mode === "angles") {
    const ox = 160;
    const oy = 320;
    const len = 290;
    const rays = n + 1;
    const startAngle = -75;
    const endAngle = 0;

    const getRayAngle = (i: number) =>
      ((startAngle + (i / n) * (endAngle - startAngle)) * Math.PI) / 180;

    const wedges: Array<{ start: number; end: number }> = [];
    if (span >= 1) {
      for (let i = 0; i <= n - span; i++) {
        wedges.push({ start: i, end: i + span });
      }
    }

    return (
      <StageFrame ariaLabel="有序数角舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
            <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {scene.annotation}
            </text>
          </motion.g>
        )}

        {wedges.map((w, idx) => {
          const a1 = getRayAngle(w.start);
          const a2 = getRayAngle(w.end);
          const rArc = 95 + span * 32 + idx * 16;
          const x1 = ox + Math.cos(a1) * rArc;
          const y1 = oy + Math.sin(a1) * rArc;
          const x2 = ox + Math.cos(a2) * rArc;
          const y2 = oy + Math.sin(a2) * rArc;
          const color = span === 1 ? "var(--accent-coral)" : span === 2 ? "var(--accent-teal)" : "var(--accent-blue)";
          return (
            <motion.path
              key={`wedge-${span}-${idx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.08 }}
              d={`M ${x1} ${y1} A ${rArc} ${rArc} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}

        {Array.from({ length: rays }).map((_, i) => {
          const a = getRayAngle(i);
          const rx = ox + Math.cos(a) * len;
          const ry = oy + Math.sin(a) * len;
          return (
            <g key={`ray-${i}`}>
              <line x1={ox} y1={oy} x2={rx} y2={ry} stroke="var(--ink-primary)" strokeWidth="2.8" strokeLinecap="round" />
              <circle cx={rx} cy={ry} r="4" fill="var(--ink-primary)" />
            </g>
          );
        })}
        <circle cx={ox} cy={oy} r="7" fill="var(--accent-coral)" stroke="var(--ink-primary)" strokeWidth="2" />
        <text x={ox - 16} y={oy + 6} textAnchor="end" fontSize="15" fontWeight="800" fill="var(--ink-primary)">
          O
        </text>
      </StageFrame>
    );
  }

  if (scene.mode === "triangles") {
    const topX = 380;
    const topY = 92;
    const baseY = 344;
    const xLeft = 140;
    const xRight = 620;
    const stepW = (xRight - xLeft) / n;

    const groups: Array<{ start: number; end: number }> = [];
    if (span >= 1) {
      for (let i = 0; i <= n - span; i++) {
        groups.push({ start: i, end: i + span });
      }
    }

    return (
      <StageFrame ariaLabel="有序数三角形舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
            <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {scene.annotation}
            </text>
          </motion.g>
        )}

        {groups.map((g, idx) => {
          const bx1 = xLeft + g.start * stepW;
          const bx2 = xLeft + g.end * stepW;
          const fill = span === 1 ? "var(--accent-coral)" : span === 2 ? "var(--accent-teal)" : "var(--accent-blue)";
          return (
            <motion.polygon
              key={`tri-${span}-${idx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.24 }}
              transition={{ delay: idx * 0.09 }}
              points={`${topX},${topY} ${bx1},${baseY} ${bx2},${baseY}`}
              fill={fill}
            />
          );
        })}

        <polygon
          points={`${topX},${topY} ${xLeft},${baseY} ${xRight},${baseY}`}
          fill="none"
          stroke="var(--ink-primary)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {Array.from({ length: n - 1 }).map((_, i) => {
          const bx = xLeft + (i + 1) * stepW;
          return (
            <line
              key={`inner-${i}`}
              x1={topX}
              y1={topY}
              x2={bx}
              y2={baseY}
              stroke="var(--ink-primary)"
              strokeWidth="2.2"
            />
          );
        })}
      </StageFrame>
    );
  }

  // Blocks / isometric cube counting mode
  const heights = scene.blockHeights ?? [3, 2, 1, 1];
  const baseX = 280;
  const baseY = 330;
  const cubeW = 54;
  const cubeH = 44;

  return (
    <StageFrame ariaLabel="观察与数立体方块舞台">
      {scene.annotation && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
          <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
            {scene.annotation}
          </text>
        </motion.g>
      )}

      {heights.map((h, colIdx) =>
        Array.from({ length: h }).map((_, levelIdx) => {
          const cx = baseX + colIdx * (cubeW + 6);
          const cy = baseY - levelIdx * (cubeH + 2);
          const isHidden = levelIdx < h - 1 && colIdx === 0 && scene.showHiddenNote;
          return (
            <motion.g
              key={`cube-${colIdx}-${levelIdx}`}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (colIdx + levelIdx) * 0.06 }}
              transform={`translate(${cx}, ${cy})`}
            >
              <rect
                width={cubeW}
                height={cubeH}
                rx="7"
                fill={isHidden ? "var(--accent-coral-soft)" : "var(--bg-surface)"}
                stroke={isHidden ? "var(--accent-coral)" : "var(--ink-primary)"}
                strokeWidth="2.2"
              />
              <text x={cubeW / 2} y={cubeH / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink-primary)">
                {levelIdx + 1}层
              </text>
            </motion.g>
          );
        }),
      )}

      <text x={baseX + 115} y={baseY + 72} textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--ink-secondary)">
        分层/分列数：一共 {heights.reduce((a, b) => a + b, 0)} 块小正方体
      </text>
    </StageFrame>
  );
}
