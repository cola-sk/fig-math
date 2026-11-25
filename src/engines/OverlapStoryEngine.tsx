import { motion } from "motion/react";
import type { OverlapStorySceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

export function OverlapStoryEngine({ scene }: { scene: OverlapStorySceneState }) {
  const sides = scene.sides ?? 4;
  const startAngle = sides === 4 ? (-3 * Math.PI) / 4 : -Math.PI / 2;
  const points = Array.from({ length: sides }, (_, i) => {
    const angle = startAngle + (2 * Math.PI * i) / sides;
    return { x: 380 + 125 * Math.cos(angle), y: 225 + 125 * Math.sin(angle) };
  });
  return <StageFrame ariaLabel="重叠问题图解舞台">
    <text x="380" y="43" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink-primary)">{scene.labels[0]}</text>
    {scene.visual === "sets" && <g>
      {scene.phase >= 2 && (
        <motion.rect
          x="185" y="95" width="390" height="250" rx="28"
          fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" strokeDasharray="8 5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        />
      )}
      <motion.circle cx="320" cy="220" r="105" fill="var(--accent-coral)" fillOpacity={scene.phase === 1 ? ".15" : ".22"} stroke="var(--accent-coral)" strokeWidth="3" initial={false} animate={{ opacity: scene.phase === 1 ? .7 : 1 }} />
      <motion.circle cx="440" cy="220" r="105" fill="var(--accent-teal)" fillOpacity={scene.phase === 1 ? ".15" : ".22"} stroke="var(--accent-teal)" strokeWidth="3" initial={false} animate={{ opacity: scene.phase === 1 ? .7 : 1 }} />
      {scene.phase >= 1 && (
        <motion.ellipse
          cx="380" cy="220" rx="44" ry="82"
          fill="var(--accent-coral)" fillOpacity={scene.phase === 1 ? ".24" : ".12"}
          stroke="var(--accent-coral)" strokeWidth="2" strokeDasharray="5 4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        />
      )}
      <text x="264" y="220" textAnchor="middle" fontSize="18" fill="var(--ink-primary)">{scene.labels[1]}</text>
      <text x="496" y="220" textAnchor="middle" fontSize="18" fill="var(--ink-primary)">{scene.labels[2]}</text>
      <motion.text x="380" y="225" textAnchor="middle" fontSize="17" fill="var(--accent-coral)" fontWeight="700" animate={{ scale: scene.phase === 1 ? 1.15 : 1 }}>{scene.labels[3]}</motion.text>
      {scene.labels[4] && (
        <motion.text
          x="380" y="378" textAnchor="middle" fontSize="17"
          fontWeight={scene.phase === 2 ? "700" : "500"}
          fill={scene.phase === 2 ? "var(--accent-coral)" : "var(--ink-primary)"}
          animate={{ scale: scene.phase === 2 ? 1.08 : 1 }}
        >
          {scene.labels[4]}
        </motion.text>
      )}
    </g>}
    {scene.visual === "boards" && (() => {
      const isQ5 = scene.labels[2].includes("65厘米");
      const pxPerCm = isQ5 ? 5.2 : 5.5;
      const totalCm = isQ5 ? 90 : 80;
      const firstCm = 50;
      const secondCm = isQ5 ? 65 : 48;
      const overlapCm = isQ5 ? 25 : 18;

      const totalW = totalCm * pxPerCm;
      const firstW = firstCm * pxPerCm;
      const secondW = secondCm * pxPerCm;
      const overlapW = overlapCm * pxPerCm;

      const left = (760 - totalW) / 2;
      const overlapX = left + firstW - overlapW;
      const rightEnd = left + totalW;
      const plankY = 188;
      const plankH = 54;
      const isSeparated = scene.phase === 0;

      return <g>
        {/* Top total length bracket */}
        <line x1={left} y1="108" x2={rightEnd} y2="108" stroke="var(--ink-secondary)" strokeWidth="2" />
        <line x1={left} y1="100" x2={left} y2="116" stroke="var(--ink-secondary)" strokeWidth="2" />
        <line x1={rightEnd} y1="100" x2={rightEnd} y2="116" stroke="var(--ink-secondary)" strokeWidth="2" />
        <text x="380" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink-primary)">
          全长 {totalCm} 厘米
        </text>

        {/* Overlap bracket */}
        <line x1={overlapX} y1="154" x2={overlapX + overlapW} y2="154" stroke="var(--accent-blue)" strokeWidth="2" />
        <line x1={overlapX} y1="148" x2={overlapX} y2="160" stroke="var(--accent-blue)" strokeWidth="2" />
        <line x1={overlapX + overlapW} y1="148" x2={overlapX + overlapW} y2="160" stroke="var(--accent-blue)" strokeWidth="2" />
        <text x={overlapX + overlapW / 2} y="142" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent-blue)">
          {isQ5 ? (scene.phase >= 3 ? "重叠 25 厘米" : "重叠 ? 厘米") : "重叠 18 厘米"}
        </text>

        {/* First wooden plank */}
        <motion.g initial={false} animate={{ y: isSeparated ? -20 : 0 }}>
          <rect
            x={left} y={plankY} width={firstW} height={plankH} rx="8"
            fill="var(--accent-coral)" fillOpacity=".45"
            stroke="var(--accent-coral)" strokeWidth="2.5"
          />
        </motion.g>

        {/* Second wooden plank */}
        <motion.g initial={false} animate={{ y: isSeparated ? 20 : 0 }}>
          <rect
            x={overlapX} y={plankY} width={secondW} height={plankH} rx="8"
            fill="var(--accent-teal)" fillOpacity=".45"
            stroke="var(--accent-teal)" strokeWidth="2.5"
          />
        </motion.g>

        {/* Overlap highlight & nail in center */}
        {!isSeparated && (
          <g>
            <rect
              x={overlapX} y={plankY - 4} width={overlapW} height={plankH + 8} rx="4"
              fill="var(--accent-blue)" fillOpacity=".14"
              stroke="var(--accent-blue)" strokeWidth="2" strokeDasharray="5 4"
            />
            <circle cx={overlapX + overlapW / 2} cy={plankY + plankH / 2} r="7" fill="var(--bg-surface)" stroke="var(--ink-primary)" strokeWidth="2.5" />
          </g>
        )}

        {/* Exposed segment hint for Q4 at phase >= 2 */}
        {!isQ5 && scene.phase >= 2 && (
          <g>
            <line x1={overlapX + overlapW} y1="260" x2={rightEnd} y2="260" stroke="var(--accent-teal)" strokeWidth="2" strokeDasharray="4 3" />
            <text x={(overlapX + overlapW + rightEnd) / 2} y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent-teal)">
              露出 30 厘米
            </text>
          </g>
        )}

        {/* Bottom brackets for each plank */}
        <line x1={left} y1="296" x2={left + firstW} y2="296" stroke="var(--accent-coral)" strokeWidth="2" />
        <line x1={left} y1="289" x2={left} y2="303" stroke="var(--accent-coral)" strokeWidth="2" />
        <line x1={left + firstW} y1="289" x2={left + firstW} y2="303" stroke="var(--accent-coral)" strokeWidth="2" />
        <text x={left + firstW / 2} y="318" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent-coral)">
          第一块 {firstCm} 厘米
        </text>

        <line x1={overlapX} y1="342" x2={rightEnd} y2="342" stroke="var(--accent-teal)" strokeWidth="2" />
        <line x1={overlapX} y1="335" x2={overlapX} y2="349" stroke="var(--accent-teal)" strokeWidth="2" />
        <line x1={rightEnd} y1="335" x2={rightEnd} y2="349" stroke="var(--accent-teal)" strokeWidth="2" />
        <text x={overlapX + secondW / 2} y="364" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent-teal)">
          {isQ5 ? "第二块 65 厘米" : scene.phase >= 3 ? "第二块 48 厘米" : "第二块 ? 厘米"}
        </text>
      </g>;
    })()}
    {scene.visual === "barrels" && <g>
      {/* Alignment guides showing both buckets have the exact same empty container */}
      <line x1="165" y1="108" x2="595" y2="108" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="165" y1="316" x2="595" y2="316" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="5 4" />

      {[0, 1].map((i) => {
        const bx = 185 + i * 260;
        const isFull = i === 0;
        const oilTop = isFull ? 122 : 216;
        const oilHeight = 310 - oilTop;
        const bucketStroke = scene.phase === 2 ? "var(--accent-coral)" : "var(--ink-secondary)";

        return (
          <g key={i} transform={`translate(${bx}, 0)`}>
            {/* Bucket outer body (metallic/amber container) */}
            <rect
              x="0" y="108" width="130" height="208" rx="14"
              fill="var(--bg-surface)"
              stroke={bucketStroke}
              strokeWidth={scene.phase === 2 ? "4.5" : "3.5"}
            />
            {/* Top rim ellipse & side handles to look like a real oil drum */}
            <ellipse
              cx="65" cy="108" rx="65" ry="12"
              fill="var(--bg-surface-muted)"
              stroke={bucketStroke}
              strokeWidth={scene.phase === 2 ? "4" : "3"}
            />
            <rect x="-10" y="148" width="10" height="32" rx="4" fill="var(--bg-surface-muted)" stroke={bucketStroke} strokeWidth="2.5" />
            <rect x="130" y="148" width="10" height="32" rx="4" fill="var(--bg-surface-muted)" stroke={bucketStroke} strokeWidth="2.5" />

            {/* Golden/Amber cooking oil inside */}
            <motion.rect
              x="7" y={oilTop} width="116" height={oilHeight} rx="10"
              fill="var(--accent-amber)" fillOpacity=".65"
              initial={{ opacity: 0.3 }} animate={{ opacity: 1 }}
            />
            {/* Oil surface ellipse */}
            <ellipse
              cx="65" cy={oilTop} rx="58" ry="8"
              fill="var(--accent-amber)" fillOpacity=".85"
              stroke="var(--accent-coral)" strokeWidth="1.5" strokeOpacity=".45"
            />

            {/* Half-way divider on full bucket & highlight for extra half-bucket of oil */}
            {isFull && scene.phase >= 1 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <rect
                  x="7" y="122" width="116" height="94" rx="8"
                  fill="var(--accent-coral)" fillOpacity=".26"
                  stroke="var(--accent-coral)" strokeWidth="2.5" strokeDasharray="5 4"
                />
                <text x="65" y="168" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--ink-primary)">
                  {scene.phase === 1 ? "多出的半桶油 ?" : "半桶油 14kg"}
                </text>
              </motion.g>
            )}

            {/* Label inside lower half */}
            <text x="65" y="274" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {scene.phase >= 2 ? "半桶油 14kg" : isFull ? "装满油" : "半桶油"}
            </text>

            {/* Total weight tag below each bucket */}
            <text x="65" y="344" textAnchor="middle" fontSize="17" fontWeight="800" fill="var(--ink-primary)">
              {scene.labels[i + 1]}
            </text>
          </g>
        );
      })}

      {/* Center badge emphasizing same empty bucket */}
      <rect x="330" y="196" width="100" height="32" rx="16" fill="var(--bg-stage)" stroke={scene.phase === 2 ? "var(--accent-coral)" : "var(--border-strong)"} strokeWidth="2" />
      <text x="380" y="217" textAnchor="middle" fontSize="13" fontWeight="800" fill={scene.phase === 2 ? "var(--accent-coral)" : "var(--ink-secondary)"}>
        同一个油桶
      </text>

      {scene.phase >= 1 && (
        <text x="380" y="392" textAnchor="middle" fontSize="16" fontWeight="800" fill="var(--accent-coral)">
          {scene.phase === 1
            ? "油桶一样重！相差的 40 - 26 正好是上半桶油"
            : scene.phase === 2
              ? "满桶油 = 14×2 = 28千克；半桶油 14千克 + 空桶 = 26千克"
              : "装满油时油重 28千克 · 空油桶重 12千克"}
        </text>
      )}
    </g>}
    {scene.visual === "polygon" && (() => {
      const cx = 380;
      const cy = 225;
      const count = scene.perSide ?? 2;
      const isReverse = count === 0 && scene.phase < 3;
      const totalDots = count > 0 ? (count - 1) * sides : 12;

      return <g>
        <polygon
          points={points.map(p => `${p.x},${p.y}`).join(" ")}
          fill="var(--accent-teal)"
          fillOpacity={scene.phase === 3 ? ".16" : ".1"}
          stroke={scene.phase === 1 ? "var(--accent-coral)" : "var(--accent-teal)"}
          strokeWidth={scene.phase === 1 ? "4.5" : "3.5"}
        />

        {/* Edge-by-edge counting brackets & badges */}
        {points.map((p, i) => {
          const next = points[(i + 1) % points.length];
          const mx = (p.x + next.x) / 2;
          const my = (p.y + next.y) / 2;
          const dx = mx - cx;
          const dy = my - cy;
          const len = Math.hypot(dx, dy) || 1;
          const nx = dx / len;
          const ny = dy / len;

          const showEdgeBracket =
            (scene.phase === 0 && i === 0) ||
            scene.phase === 1;

          const offsetDist = sides === 4 ? 32 : 36;
          const bx1 = p.x + nx * 16;
          const by1 = p.y + ny * 16;
          const bx2 = next.x + nx * 16;
          const by2 = next.y + ny * 16;
          const lx = mx + nx * offsetDist;
          const ly = my + ny * offsetDist;

          return (
            <g key={`edge-${i}`}>
              {showEdgeBracket && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <line
                    x1={bx1} y1={by1} x2={bx2} y2={by2}
                    stroke="var(--accent-coral)" strokeWidth="2.5" strokeDasharray="5 3"
                  />
                  <rect
                    x={lx - 24} y={ly - 12} width="48" height="24" rx="12"
                    fill="var(--bg-surface)" stroke="var(--accent-coral)" strokeWidth="1.5"
                  />
                  <text
                    x={lx} y={ly + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--accent-coral)"
                  >
                    {isReverse ? (scene.phase === 1 ? "+1角?" : "?") : `${count}`}
                  </text>
                </motion.g>
              )}

              {/* Middle dots along the edge */}
              {Array.from({ length: Math.max(0, count - 2) }, (_, j) => {
                const t = (j + 1) / (count - 1);
                return (
                  <motion.circle
                    key={j}
                    cx={p.x + (next.x - p.x) * t}
                    cy={p.y + (next.y - p.y) * t}
                    r="6.5"
                    fill="var(--accent-teal)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Corner vertices with step-specific duplicate highlights */}
        {points.map((p, i) => {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const len = Math.hypot(dx, dy) || 1;
          const nx = dx / len;
          const ny = dy / len;
          const badgeX = p.x + nx * 28;
          const badgeY = p.y + ny * 26;

          return (
            <g key={`corner-${i}`}>
              {count > 0 && (
                <g>
                  {scene.phase === 2 && (
                    <motion.circle
                      cx={p.x} cy={p.y} r="17"
                      fill="none" stroke="var(--accent-coral)" strokeWidth="2.5" strokeDasharray="4 3"
                      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.15, opacity: 1 }}
                    />
                  )}
                  <motion.circle
                    cx={p.x} cy={p.y} r="10"
                    fill="var(--accent-coral)"
                    initial={false}
                    animate={{ scale: scene.phase === 2 ? 1.2 : 1 }}
                  />
                </g>
              )}

              {scene.phase === 2 && (
                <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                  <rect
                    x={badgeX - 18} y={badgeY - 11} width="36" height="22" rx="11"
                    fill="var(--accent-coral)"
                  />
                  <text
                    x={badgeX} y={badgeY + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff"
                  >
                    {isReverse ? "算2次" : "−1"}
                  </text>
                </motion.g>
              )}
            </g>
          );
        })}

        {/* Center summary inside the polygon */}
        <g>
          {isReverse ? (
            <text x={cx} y={cy + 6} textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--accent-coral)">
              {scene.phase === 0
                ? "共 12 棵，每边一样多"
                : scene.phase === 1
                  ? "3 个角各多算 1 次 → 12 + 3"
                  : "15 棵次 ÷ 3 条边 = ?"}
            </text>
          ) : (
            <text x={cx} y={cy + 6} textAnchor="middle" fontSize="15" fontWeight="800" fill={scene.phase === 3 ? "var(--accent-teal)" : "var(--ink-secondary)"}>
              {scene.phase === 0
                ? `${sides} 条边 · ${sides} 个角`
                : scene.phase === 1
                  ? `按边各数一遍：${count} × ${sides}`
                  : scene.phase === 2
                    ? `${sides} 个角各多算 1 次（−${sides}）`
                    : `每个角只算 1 次 · 共 ${totalDots} 个`}
            </text>
          )}
        </g>

        <text x="380" y="395" textAnchor="middle" fontSize="17" fontWeight="600" fill="var(--ink-primary)">
          {scene.labels[1]}
        </text>
      </g>;
    })()}
  </StageFrame>;
}
