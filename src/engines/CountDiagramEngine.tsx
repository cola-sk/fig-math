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

        {Array.from({ length: (scene.triangleLayers ?? 1) - 1 }, (_, index) => {
          const ratio = (index + 1) / (scene.triangleLayers ?? 1);
          const y = topY + (baseY - topY) * ratio;
          return <line key={index} x1={topX + (xLeft - topX) * ratio} y1={y} x2={topX + (xRight - topX) * ratio} y2={y} stroke="var(--ink-primary)" strokeWidth="2.2" />;
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

  // Blocks / 3D cube counting mode
  const heights = scene.blockHeights ?? [3, 2, 1];
  const cubeW = 62;
  const cubeH = 44;
  const depthX = 16;
  const depthY = 12;
  const colGap = 24;
  const totalW = heights.length * cubeW + (heights.length - 1) * colGap;
  const startX = (760 - totalW) / 2 - depthX / 2;
  const baseY = 304;
  const targetH = scene.targetBlockHeight ?? 0;
  const currentTotal = heights.reduce((a, b) => a + b, 0);
  const missingTotal = targetH > 0 ? heights.reduce((sum, h) => sum + Math.max(0, targetH - h), 0) : 0;

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

      {heights.map((h, colIdx) => {
        const cx = startX + colIdx * (cubeW + colGap);
        const maxDrawH = Math.max(h, targetH);
        const topY = baseY - (maxDrawH - 1) * cubeH;

        return (
          <g key={`col-${colIdx}`}>
            {/* Existing solid 3D cubes from bottom to top */}
            {Array.from({ length: h }).map((_, levelIdx) => {
              const cy = baseY - levelIdx * cubeH;
              const isHidden = levelIdx < h - 1 && Boolean(scene.showHiddenNote);
              const frontFill = isHidden ? "var(--accent-coral-soft)" : "var(--bg-surface)";
              const topFill = isHidden ? "#ffd9cf" : "var(--bg-stage)";
              const sideFill = isHidden ? "#f8bfb0" : "var(--bg-surface-muted)";
              const strokeCol = isHidden ? "var(--accent-coral)" : "var(--ink-primary)";

              return (
                <g key={`cube-${colIdx}-${levelIdx}`} transform={`translate(${cx}, ${cy})`}>
                  <motion.g
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (colIdx * 2 + levelIdx) * 0.07, type: "spring", stiffness: 220, damping: 20 }}
                  >
                    {/* Top face */}
                    <polygon
                      points={`0,0 ${depthX},${-depthY} ${cubeW + depthX},${-depthY} ${cubeW},0`}
                      fill={topFill}
                      stroke={strokeCol}
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    {/* Right side face */}
                    <polygon
                      points={`${cubeW},0 ${cubeW + depthX},${-depthY} ${cubeW + depthX},${cubeH - depthY} ${cubeW},${cubeH}`}
                      fill={sideFill}
                      stroke={strokeCol}
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    {/* Front face */}
                    <rect
                      x="0"
                      y="0"
                      width={cubeW}
                      height={cubeH}
                      rx="3"
                      fill={frontFill}
                      stroke={strokeCol}
                      strokeWidth="2.2"
                    />
                    <text
                      x={cubeW / 2}
                      y={cubeH / 2 + 5}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="800"
                      fill={isHidden ? "var(--accent-coral)" : "var(--ink-primary)"}
                    >
                      {isHidden ? "压住" : `${levelIdx + 1}层`}
                    </text>
                  </motion.g>
                </g>
              );
            })}

            {/* Ghost missing cubes for "补齐" variant */}
            {targetH > h &&
              Array.from({ length: targetH - h }).map((_, offset) => {
                const levelIdx = h + offset;
                const cy = baseY - levelIdx * cubeH;
                return (
                  <g key={`ghost-${colIdx}-${levelIdx}`} transform={`translate(${cx}, ${cy})`}>
                    <motion.g
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + offset * 0.08 }}
                    >
                      <polygon
                        points={`0,0 ${depthX},${-depthY} ${cubeW + depthX},${-depthY} ${cubeW},0`}
                        fill="var(--accent-teal-soft)"
                        fillOpacity="0.6"
                        stroke="var(--accent-teal)"
                        strokeWidth="1.8"
                        strokeDasharray="4 3"
                      />
                      <polygon
                        points={`${cubeW},0 ${cubeW + depthX},${-depthY} ${cubeW + depthX},${cubeH - depthY} ${cubeW},${cubeH}`}
                        fill="var(--accent-teal-soft)"
                        fillOpacity="0.45"
                        stroke="var(--accent-teal)"
                        strokeWidth="1.8"
                        strokeDasharray="4 3"
                      />
                      <rect
                        x="0"
                        y="0"
                        width={cubeW}
                        height={cubeH}
                        rx="3"
                        fill="var(--accent-teal-soft)"
                        fillOpacity="0.7"
                        stroke="var(--accent-teal)"
                        strokeWidth="2"
                        strokeDasharray="5 4"
                      />
                      <text x={cubeW / 2} y={cubeH / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--accent-teal)">
                        +1缺
                      </text>
                    </motion.g>
                  </g>
                );
              })}

            {/* Column height badge on top */}
            {scene.showHiddenNote && (
              <motion.g
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + colIdx * 0.08 }}
              >
                <rect
                  x={cx + cubeW / 2 - 22}
                  y={topY - 46}
                  width="54"
                  height="24"
                  rx="12"
                  fill={targetH > 0 && targetH > h ? "var(--accent-teal)" : "var(--accent-coral)"}
                />
                <text
                  x={cx + cubeW / 2 + 5}
                  y={topY - 30}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="800"
                  fill="#ffffff"
                >
                  {targetH > 0 && targetH > h ? `缺${targetH - h}块` : `${h} 块`}
                </text>
              </motion.g>
            )}

            {/* Column label below */}
            <text
              x={cx + cubeW / 2}
              y={baseY + cubeH + 22}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="700"
              fill="var(--ink-secondary)"
            >
              第{colIdx + 1}摞
            </text>
          </g>
        );
      })}

      <text x="380" y="394" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--ink-primary)">
        {scene.showCountSummary === false
          ? "先数已有的方块，再看空出的格子，答案暂时留空"
          : targetH > 0
          ? `补齐目标 ${heights.length * targetH} 块：已有 ${currentTotal} 块，还缺 ${missingTotal} 块`
          : scene.showHiddenNote
            ? `按列相加：${heights.join(" + ")} = ${currentTotal} 块小正方体`
            : "数一数每一摞有多高（上面的块踩在下面的块上）"}
      </text>
    </StageFrame>
  );
}
