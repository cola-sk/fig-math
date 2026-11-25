import { motion } from "motion/react";
import type { NumberLineSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

function TreeIcon({ status }: { status: "active" | "ghost" | "highlight" }) {
  const opacity = status === "ghost" ? 0.25 : 1;
  const leafFill =
    status === "highlight"
      ? "var(--accent-coral)"
      : status === "ghost"
        ? "var(--ink-muted)"
        : "var(--accent-teal)";

  return (
    <g opacity={opacity}>
      <rect x="-3" y="-12" width="6" height="14" rx="2" fill="#8b6647" />
      <circle
        cx="0"
        cy="-22"
        r="13"
        fill={leafFill}
        fillOpacity="0.88"
        stroke="var(--ink-primary)"
        strokeWidth="1.5"
      />
      {status === "ghost" && (
        <path
          d="M -8 -30 L 8 -14 M 8 -30 L -8 -14"
          stroke="var(--accent-coral)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

export function NumberLineEngine({ scene }: { scene: NumberLineSceneState }) {
  if (scene.measurement) {
    const { marks, from, to, label, pencil } = scene.measurement;
    const start = Math.min(...marks);
    const end = Math.max(...marks);
    const xAt = (value: number) =>
      90 + ((value - start) / Math.max(1, end - start)) * 580;
    return (
      <StageFrame ariaLabel="尺子刻度与铅笔测量舞台">
        <text
          x="380"
          y="43"
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill="var(--ink-primary)"
        >
          两端对准刻度，数中间的距离
        </text>
        {pencil && (
          <g>
            <rect
              x={xAt(pencil.start)}
              y="154"
              width={Math.max(1, xAt(pencil.end) - xAt(pencil.start) - 20)}
              height="28"
              rx="3"
              fill="var(--accent-amber)"
              stroke="var(--ink-primary)"
              strokeWidth="2"
            />
            <path
              d={`M ${xAt(pencil.end) - 20} 154 L ${xAt(pencil.end)} 168 L ${xAt(pencil.end) - 20} 182 Z`}
              fill="var(--accent-coral-soft)"
              stroke="var(--ink-primary)"
              strokeWidth="2"
            />
            <path
              d={`M ${xAt(pencil.end) - 7} 163 L ${xAt(pencil.end)} 168 L ${xAt(pencil.end) - 7} 173 Z`}
              fill="var(--ink-primary)"
            />
            {[pencil.start, pencil.end].map((value) => (
              <line
                key={value}
                x1={xAt(value)}
                y1="186"
                x2={xAt(value)}
                y2="240"
                stroke="var(--accent-coral)"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
            ))}
          </g>
        )}
        <rect
          x="76"
          y="242"
          width="608"
          height="58"
          rx="5"
          fill="var(--bg-surface)"
          stroke="var(--ink-primary)"
          strokeWidth="2"
        />
        {start > 0 && (
          <path
            d="M 76 242 l 8 10 l -8 10 l 8 10 l -8 10 l 8 10 l -8 8"
            fill="var(--bg-stage)"
            stroke="var(--ink-primary)"
            strokeWidth="2"
          />
        )}
        {marks.map((value) => (
          <g key={value}>
            <line
              x1={xAt(value)}
              y1="242"
              x2={xAt(value)}
              y2="263"
              stroke="var(--ink-primary)"
              strokeWidth="2"
            />
            <text
              x={xAt(value)}
              y="286"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="var(--ink-primary)"
            >
              {value}
            </text>
          </g>
        ))}
        <text
          x="670"
          y="323"
          textAnchor="end"
          fontSize="16"
          fill="var(--ink-secondary)"
        >
          厘米
        </text>
        <path
          d={`M ${xAt(from)} 320 v 15 H ${xAt(to)} v -15`}
          fill="none"
          stroke="var(--accent-teal)"
          strokeWidth="3"
        />
        <text
          x={(xAt(from) + xAt(to)) / 2}
          y="365"
          textAnchor="middle"
          fontSize="22"
          fontWeight="800"
          fill="var(--accent-teal)"
        >
          {label}
        </text>
      </StageFrame>
    );
  }
  if (scene.layout === "circle") {
    const cx = 380;
    const cy = 228;
    const radius = 128;

    return (
      <StageFrame ariaLabel="环形轨道与植树模型">
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="var(--accent-blue-soft)"
          stroke="var(--accent-teal)"
          strokeWidth="6"
        />
        <circle
          cx={cx}
          cy={cy}
          r={radius - 26}
          fill="var(--bg-stage)"
          stroke="var(--border-subtle)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="var(--ink-primary)"
        >
          周长 {scene.totalLength} {scene.unitLabel}
        </text>
        {scene.intervals && !scene.hideCountSummary && (
          <text
            x={cx}
            y={cy + 20}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent-coral)"
          >
            {scene.intervals} 段间隔 ={" "}
            {scene.trees?.filter((t) => t.status !== "ghost").length ?? 0} 棵树
          </text>
        )}

        {/* Trees around perimeter */}
        {scene.trees?.map((tree) => {
          const angle = tree.posRatio * Math.PI * 2 - Math.PI / 2;
          const tx = cx + Math.cos(angle) * radius;
          const ty = cy + Math.sin(angle) * radius;
          return (
            <motion.g
              key={tree.id}
              initial={false}
              animate={{ x: tx, y: ty }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <circle
                cx="0"
                cy="0"
                r="6"
                fill="var(--bg-surface)"
                stroke="var(--ink-primary)"
                strokeWidth="1.8"
              />
              <g transform="translate(0, -6)">
                <TreeIcon status={tree.status} />
              </g>
              {tree.label && (
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--ink-primary)"
                >
                  {tree.label}
                </text>
              )}
            </motion.g>
          );
        })}
      </StageFrame>
    );
  }

  // Linear track (tree planting or meeting/chasing)
  const x0 = 80;
  const x1 = 680;
  const trackW = x1 - x0;
  const trackY = 250;

  return (
    <StageFrame ariaLabel="数轴与行程轨道舞台">
      {/* Warm wooden log that physically splits apart for sawing-wood lessons */}
      {scene.woodLog ? (
        <g>
          {Array.from({ length: scene.woodLog.pieces }).map((_, idx) => {
            const pieces = scene.woodLog!.pieces;
            const splitGap = scene.woodLog!.isSplit ? 14 : 0;
            const totalGaps = (pieces - 1) * splitGap;
            const pieceW = (trackW - totalGaps) / pieces;
            const px = x0 + idx * (pieceW + splitGap);
            return (
              <motion.g
                key={`wood-piece-${idx}`}
                initial={false}
                animate={{ x: px, y: trackY - 16 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 20,
                  delay: scene.woodLog!.isSplit ? idx * 0.05 : 0,
                }}
                filter="url(#fig-soft-shadow)"
              >
                <rect
                  width={pieceW}
                  height="32"
                  rx="8"
                  fill="#c98e5b"
                  stroke="#7b4e2b"
                  strokeWidth="2"
                />
                <line
                  x1="10"
                  y1="11"
                  x2={Math.max(14, pieceW - 10)}
                  y2="11"
                  stroke="#9c6438"
                  strokeOpacity="0.45"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <text
                  x={pieceW / 2}
                  y="21"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="#fffdf9"
                >
                  第{idx + 1}段
                </text>
              </motion.g>
            );
          })}
        </g>
      ) : (
        /* Main Road / Number Line */
        <rect
          x={x0}
          y={trackY - 5}
          width={trackW}
          height="10"
          rx="5"
          fill="var(--border-subtle)"
        />
      )}

      {/* Interval Arcs */}
      {scene.showIntervalArcs && scene.intervals && scene.intervals > 0 && (
        <g>
          {Array.from({ length: scene.intervals }).map((_, i) => {
            const segW = trackW / scene.intervals!;
            const sx = x0 + i * segW;
            const ex = sx + segW;
            const mx = (sx + ex) / 2;
            return (
              <motion.g
                key={`arc-${i}`}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <path
                  d={`M ${sx} ${trackY - 6} Q ${mx} ${trackY - 52} ${ex} ${trackY - 6}`}
                  fill="none"
                  stroke="var(--accent-coral)"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <text
                  x={mx}
                  y={trackY - 36}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--accent-coral)"
                >
                  第{i + 1}段
                </text>
              </motion.g>
            );
          })}
        </g>
      )}

      {/* Highlight Gap (for distance / meeting) */}
      {scene.highlightGap && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {(() => {
            const gx0 = x0 + scene.highlightGap.fromRatio * trackW;
            const gx1 = x0 + scene.highlightGap.toRatio * trackW;
            return (
              <g>
                <rect
                  x={Math.min(gx0, gx1)}
                  y={trackY - 6}
                  width={Math.abs(gx1 - gx0)}
                  height="12"
                  rx="6"
                  fill="var(--accent-coral)"
                  fillOpacity="0.28"
                  stroke="var(--accent-coral)"
                  strokeWidth="1.5"
                />
                <text
                  x={(gx0 + gx1) / 2}
                  y={trackY + 34}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--accent-coral)"
                >
                  {scene.highlightGap.label}
                </text>
              </g>
            );
          })()}
        </motion.g>
      )}

      {/* Trees on line */}
      {scene.trees?.map((tree) => {
        const tx = x0 + tree.posRatio * trackW;
        return (
          <motion.g
            key={tree.id}
            initial={false}
            animate={{ x: tx, y: trackY }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <circle
              cx="0"
              cy="0"
              r="5"
              fill="var(--bg-surface)"
              stroke="var(--ink-primary)"
              strokeWidth="2"
            />
            <g transform="translate(0, -10)">
              <TreeIcon status={tree.status} />
            </g>
            {tree.label && (
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={
                  tree.status === "ghost"
                    ? "var(--ink-muted)"
                    : "var(--ink-primary)"
                }
              >
                {tree.label}
              </text>
            )}
          </motion.g>
        );
      })}

      {/* Queue / Saw-Cut Nodes */}
      {scene.queueNodes?.map((node) => {
        const nx = x0 + node.posRatio * trackW;
        const isTarget = node.role === "target";
        const isOverlap = node.role === "overlap";
        const isExcluded = node.role === "excluded";
        const isCut = node.role === "cut";

        if (isCut) {
          return (
            <motion.g
              key={node.id}
              initial={false}
              animate={{ x: nx, y: trackY }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <line
                x1="0"
                y1="-32"
                x2="0"
                y2="24"
                stroke="var(--accent-coral)"
                strokeWidth="3"
                strokeDasharray="4 3"
              />
              <circle cx="0" cy="-32" r="11" fill="var(--accent-coral)" />
              <text
                x="0"
                y="-28"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#ffffff"
              >
                切
              </text>
              <text
                x="0"
                y="40"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--accent-coral)"
              >
                {node.label}
              </text>
            </motion.g>
          );
        }

        const circleFill = isOverlap
          ? "var(--accent-coral)"
          : isTarget
            ? "var(--accent-teal)"
            : isExcluded
              ? "var(--bg-surface-muted)"
              : "var(--bg-surface)";
        const strokeColor = isOverlap
          ? "var(--accent-coral)"
          : isTarget
            ? "var(--accent-teal)"
            : "var(--ink-primary)";
        const textColor =
          isOverlap || isTarget ? "#ffffff" : "var(--ink-primary)";

        return (
          <motion.g
            key={node.id}
            initial={false}
            animate={{ x: nx, y: trackY, opacity: isExcluded ? 0.45 : 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <circle
              cx="0"
              cy="0"
              r={isOverlap || isTarget ? 18 : 14}
              fill={circleFill}
              stroke={strokeColor}
              strokeWidth={isOverlap || isTarget ? 2.5 : 1.8}
              filter={
                isOverlap || isTarget ? "url(#fig-soft-shadow)" : undefined
              }
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={textColor}
            >
              {node.label}
            </text>
          </motion.g>
        );
      })}

      {/* Moving Actors (for meeting / chasing) */}
      {scene.actors?.map((actor) => {
        const ax = x0 + actor.posRatio * trackW;
        const fill =
          actor.color === "coral"
            ? "var(--accent-coral)"
            : "var(--accent-teal)";
        const dirSign = actor.direction === "right" ? 1 : -1;
        return (
          <motion.g
            key={actor.id}
            initial={false}
            animate={{ x: ax, y: trackY - 30 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          >
            {/* Speed Vector Arrow */}
            <line
              x1={0}
              y1={-34}
              x2={dirSign * 44}
              y2={-34}
              stroke={fill}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <polygon
              points={
                dirSign > 0
                  ? `${dirSign * 44},-39 ${dirSign * 53},-34 ${dirSign * 44},-29`
                  : `${dirSign * 44},-39 ${dirSign * 53},-34 ${dirSign * 44},-29`
              }
              fill={fill}
            />
            <text
              x={dirSign * 22}
              y={-44}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={fill}
            >
              {actor.speedLabel}
            </text>

            {/* Avatar Badge */}
            <circle
              cx="0"
              cy="0"
              r="18"
              fill={fill}
              stroke="var(--bg-surface)"
              strokeWidth="3"
              filter="url(#fig-soft-shadow)"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="#ffffff"
            >
              {actor.name.slice(0, 2)}
            </text>
            <line x1="0" y1="18" x2="0" y2="30" stroke={fill} strokeWidth="2" />
          </motion.g>
        );
      })}

      {/* Milestones / Flags */}
      {scene.markers?.map((m) => {
        const mx = x0 + m.posRatio * trackW;
        return (
          <g key={m.id} transform={`translate(${mx}, ${trackY})`}>
            <line
              x1="0"
              y1="-10"
              x2="0"
              y2="10"
              stroke="var(--ink-primary)"
              strokeWidth="2"
            />
            <text
              x="0"
              y="62"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--ink-secondary)"
            >
              {m.label}
            </text>
          </g>
        );
      })}

      {/* Total Length Brace */}
      <g transform={`translate(${x0}, ${trackY + 78})`}>
        <line
          x1="0"
          y1="0"
          x2={trackW}
          y2="0"
          stroke="var(--ink-secondary)"
          strokeWidth="1.8"
        />
        <line
          x1="0"
          y1="-6"
          x2="0"
          y2="6"
          stroke="var(--ink-secondary)"
          strokeWidth="1.8"
        />
        <line
          x1={trackW}
          y1="-6"
          x2={trackW}
          y2="6"
          stroke="var(--ink-secondary)"
          strokeWidth="1.8"
        />
        <rect
          x={trackW / 2 - 58}
          y="-12"
          width="116"
          height="24"
          rx="6"
          fill="var(--bg-stage)"
        />
        <text
          x={trackW / 2}
          y="5"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="var(--ink-primary)"
        >
          {scene.hideLengthLabel
            ? "观察位置与间隔"
            : `总长 ${scene.totalLength} ${scene.unitLabel}`}
        </text>
      </g>
    </StageFrame>
  );
}
