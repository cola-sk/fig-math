import { motion } from "motion/react";
import type { BalancePuzzleSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

function getSeesawBadge(text: string): { icon: string; count: string } {
  if (text.includes("小狗")) return { icon: "🐶", count: text };
  if (text.includes("小猫")) return { icon: "🐱", count: text };
  if (text.includes("小鸭")) return { icon: "🐥", count: text };
  if (text.includes("西瓜")) return { icon: "🍉", count: text };
  if (text.includes("菠萝")) return { icon: "🍍", count: text };
  return { icon: "⚖️", count: text };
}

function SeesawItems({ text, x }: { text: string; x: number }) {
  const badge = getSeesawBadge(text);
  const count = Math.min(6, Number(text.match(/^\d+/)?.[0] ?? 1));
  const columns = Math.min(3, count);
  const rows = Math.ceil(count / columns);
  return (
    <g>
      {Array.from({ length: count }, (_, index) => (
        <text
          key={index}
          x={x + ((index % columns) - (columns - 1) / 2) * 30}
          y={rows > 1 ? 208 + Math.floor(index / columns) * 21 : 220}
          textAnchor="middle"
          fontSize={rows > 1 ? 19 : 24}
        >
          {badge.icon}
        </text>
      ))}
      <text
        x={x}
        y="248"
        textAnchor="middle"
        fontSize="14.5"
        fontWeight="800"
        fill="var(--ink-primary)"
      >
        {badge.count}
      </text>
    </g>
  );
}

const DIGIT_STICKS: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abged",
  "3": "abgcd",
  "4": "fgbc",
  "5": "afgcd",
  "6": "afgecd",
  "7": "abc",
  "8": "abcdefg",
  "9": "abfgcd",
};
const STICK_POINTS: Record<string, [number, number, number, number]> = {
  a: [4, 0, 26, 0],
  b: [30, 4, 30, 16],
  c: [30, 24, 30, 36],
  d: [4, 40, 26, 40],
  e: [0, 24, 0, 36],
  f: [0, 4, 0, 16],
  g: [4, 20, 26, 20],
};

function MatchEquation({ text, y }: { text: string; y: number }) {
  const characters = text.replaceAll(" ", "").split("");
  const startX = (760 - (characters.length - 1) * 64 - 30) / 2;
  return (
    <g aria-label={text}>
      {characters.map((character, index) => {
        const points: [number, number, number, number][] = DIGIT_STICKS[
          character
        ]
          ? DIGIT_STICKS[character].split("").map((part) => STICK_POINTS[part])
          : character === "="
            ? [
                [0, 13, 30, 13],
                [0, 27, 30, 27],
              ]
            : character === "+"
              ? [
                  [0, 20, 30, 20],
                  [15, 5, 15, 35],
                ]
              : [[0, 20, 30, 20]];
        return (
          <g key={index} transform={`translate(${startX + index * 64}, ${y})`}>
            {points.map(([x1, y1, x2, y2], stick) => (
              <g key={stick}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--accent-amber)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx={x1} cy={y1} r="2.5" fill="var(--accent-coral)" />
              </g>
            ))}
          </g>
        );
      })}
    </g>
  );
}

export function BalancePuzzleEngine({
  scene,
}: {
  scene: BalancePuzzleSceneState;
}) {
  if (scene.mode === "seesaw") {
    const tilt = scene.tiltDeg ?? 0;
    const left = scene.leftItems ?? ["1只小狗"];
    const right = scene.rightItems ?? ["3只小猫"];

    return (
      <StageFrame ariaLabel="跷跷板轻重天平舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect
              x="90"
              y="20"
              width="580"
              height="36"
              rx="12"
              fill="var(--bg-surface)"
              stroke="var(--border-strong)"
            />
            <text
              x="380"
              y="43"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--ink-primary)"
            >
              {scene.annotation}
            </text>
          </motion.g>
        )}

        {/* Fulcrum Triangle */}
        <polygon
          points="380,268 342,338 418,338"
          fill="var(--accent-amber)"
          fillOpacity="0.85"
          stroke="var(--ink-primary)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Tilting Beam */}
        <motion.g
          initial={false}
          animate={{ rotate: tilt }}
          style={{ originX: "380px", originY: "268px" }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
        >
          <line
            x1="145"
            y1="268"
            x2="615"
            y2="268"
            stroke="var(--ink-primary)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Left Tray */}
          <rect
            x="125"
            y="188"
            width="170"
            height="72"
            rx="14"
            fill="var(--accent-coral-soft)"
            stroke="var(--accent-coral)"
            strokeWidth="2.2"
          />
          <SeesawItems text={left.join(" + ")} x={210} />

          {/* Right Tray */}
          <rect
            x="465"
            y="188"
            width="170"
            height="72"
            rx="14"
            fill="var(--accent-teal-soft)"
            stroke="var(--accent-teal)"
            strokeWidth="2.2"
          />
          <SeesawItems text={right.join(" + ")} x={550} />
        </motion.g>

        <text
          x="380"
          y="384"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="var(--ink-secondary)"
        >
          {tilt === 0
            ? "两边一样重（天平平衡）"
            : tilt < 0
              ? "左边沉下去 → 左边更重！"
              : "右边沉下去 → 右边更重！"}
        </text>
      </StageFrame>
    );
  }

  if (scene.mode === "swap") {
    const rows = scene.swapRows ?? [];
    return (
      <StageFrame ariaLabel="等量代换推理舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect
              x="90"
              y="20"
              width="580"
              height="36"
              rx="12"
              fill="var(--bg-surface)"
              stroke="var(--border-strong)"
            />
            <text
              x="380"
              y="43"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--ink-primary)"
            >
              {scene.annotation}
            </text>
          </motion.g>
        )}

        <g transform="translate(110, 96)">
          {rows.map((row, idx) => (
            <g
              key={`${row.left}-${idx}`}
              transform={`translate(0, ${idx * 94})`}
            >
              <motion.g
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <rect
                  width="210"
                  height="62"
                  rx="14"
                  fill={
                    row.highlight
                      ? "var(--accent-coral-soft)"
                      : "var(--bg-surface)"
                  }
                  stroke={
                    row.highlight
                      ? "var(--accent-coral)"
                      : "var(--border-strong)"
                  }
                  strokeWidth="2"
                />
                <text
                  x="105"
                  y="37"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="800"
                  fill="var(--ink-primary)"
                >
                  {row.left}
                </text>

                <text
                  x="270"
                  y="38"
                  textAnchor="middle"
                  fontSize="22"
                  fontWeight="900"
                  fill="var(--accent-coral)"
                >
                  =
                </text>

                <rect
                  x="330"
                  width="210"
                  height="62"
                  rx="14"
                  fill={
                    row.highlight
                      ? "var(--accent-teal-soft)"
                      : "var(--bg-surface)"
                  }
                  stroke={
                    row.highlight
                      ? "var(--accent-teal)"
                      : "var(--border-strong)"
                  }
                  strokeWidth="2"
                />
                <text
                  x="435"
                  y="37"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="800"
                  fill="var(--ink-primary)"
                >
                  {row.right}
                </text>
              </motion.g>
            </g>
          ))}
        </g>
      </StageFrame>
    );
  }

  if (scene.mode === "arith-puzzle") {
    const lines = scene.puzzleLines ?? [];
    return (
      <StageFrame ariaLabel="算式谜推理舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect
              x="90"
              y="20"
              width="580"
              height="36"
              rx="12"
              fill="var(--bg-surface)"
              stroke="var(--border-strong)"
            />
            <text
              x="380"
              y="43"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--ink-primary)"
            >
              {scene.annotation}
            </text>
          </motion.g>
        )}

        <rect
          x="200"
          y="96"
          width="360"
          height="236"
          rx="18"
          fill="var(--bg-surface)"
          stroke="var(--border-strong)"
          strokeWidth="2"
          filter="url(#fig-soft-shadow)"
        />
        {lines.map((line, idx) => (
          <text
            key={idx}
            x="380"
            y={156 + idx * 54}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="26"
            fontWeight="800"
            fill={
              idx === lines.length - 1
                ? "var(--accent-coral)"
                : "var(--ink-primary)"
            }
          >
            {line}
          </text>
        ))}

        {scene.puzzleHint && (
          <text
            x="380"
            y="378"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--accent-teal)"
          >
            {scene.puzzleHint}
          </text>
        )}
      </StageFrame>
    );
  }

  // Matchstick puzzle mode
  return (
    <StageFrame ariaLabel="火柴棒谜题舞台">
      {scene.annotation && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect
            x="90"
            y="20"
            width="580"
            height="36"
            rx="12"
            fill="var(--bg-surface)"
            stroke="var(--border-strong)"
          />
          <text
            x="380"
            y="43"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--ink-primary)"
          >
            {scene.annotation}
          </text>
        </motion.g>
      )}

      <rect
        x="130"
        y="106"
        width="500"
        height="92"
        rx="16"
        fill="var(--bg-surface)"
        stroke="var(--border-strong)"
        strokeWidth="2"
      />
      <text
        x="156"
        y="134"
        fontSize="12"
        fontWeight="700"
        fill="var(--ink-muted)"
      >
        移动前（不成立）：
      </text>
      <MatchEquation text={scene.matchBefore ?? "6 + 4 = 4"} y={146} />

      {scene.matchMoveNote && (
        <text
          x="380"
          y="232"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill="var(--accent-coral)"
        >
          ↓ {scene.matchMoveNote} ↓
        </text>
      )}

      {scene.matchAfter && (
        <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <rect
            x="130"
            y="254"
            width="500"
            height="92"
            rx="16"
            fill="var(--accent-teal-soft)"
            stroke="var(--accent-teal)"
            strokeWidth="2.5"
          />
          <text
            x="156"
            y="282"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent-teal)"
          >
            移动后（成立！）：
          </text>
          <MatchEquation text={scene.matchAfter} y={294} />
        </motion.g>
      )}
    </StageFrame>
  );
}
