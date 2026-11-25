import { motion } from "motion/react";
import type { BalancePuzzleSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

export function BalancePuzzleEngine({ scene }: { scene: BalancePuzzleSceneState }) {
  if (scene.mode === "seesaw") {
    const tilt = scene.tiltDeg ?? 0;
    const left = scene.leftItems ?? ["1只小狗"];
    const right = scene.rightItems ?? ["3只小猫"];

    return (
      <StageFrame ariaLabel="跷跷板轻重天平舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
            <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {scene.annotation}
            </text>
          </motion.g>
        )}

        {/* Fulcrum Triangle */}
        <polygon points="380,260 345,332 415,332" fill="var(--accent-amber)" fillOpacity="0.85" stroke="var(--ink-primary)" strokeWidth="2.5" strokeLinejoin="round" />

        {/* Tilting Beam */}
        <motion.g
          initial={false}
          animate={{ rotate: tilt }}
          style={{ originX: "380px", originY: "260px" }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
        >
          <line x1="150" y1="260" x2="610" y2="260" stroke="var(--ink-primary)" strokeWidth="7" strokeLinecap="round" />

          {/* Left Tray */}
          <rect x="135" y="198" width="150" height="54" rx="12" fill="var(--accent-coral-soft)" stroke="var(--accent-coral)" strokeWidth="2" />
          <text x="210" y="230" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="var(--ink-primary)">
            {left.join(" + ")}
          </text>

          {/* Right Tray */}
          <rect x="475" y="198" width="150" height="54" rx="12" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="2" />
          <text x="550" y="230" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="var(--ink-primary)">
            {right.join(" + ")}
          </text>
        </motion.g>

        <text x="380" y="378" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-secondary)">
          {tilt === 0 ? "两边一样重（天平平衡）" : tilt < 0 ? "左边沉下去 → 左边更重！" : "右边沉下去 → 右边更重！"}
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
            <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
            <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {scene.annotation}
            </text>
          </motion.g>
        )}

        <g transform="translate(110, 96)">
          {rows.map((row, idx) => (
            <motion.g
              key={`${row.left}-${idx}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              transform={`translate(0, ${idx * 94})`}
            >
              <rect
                width="210"
                height="62"
                rx="14"
                fill={row.highlight ? "var(--accent-coral-soft)" : "var(--bg-surface)"}
                stroke={row.highlight ? "var(--accent-coral)" : "var(--border-strong)"}
                strokeWidth="2"
              />
              <text x="105" y="37" textAnchor="middle" fontSize="16" fontWeight="800" fill="var(--ink-primary)">
                {row.left}
              </text>

              <text x="270" y="38" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--accent-coral)">
                =
              </text>

              <rect
                x="330"
                width="210"
                height="62"
                rx="14"
                fill={row.highlight ? "var(--accent-teal-soft)" : "var(--bg-surface)"}
                stroke={row.highlight ? "var(--accent-teal)" : "var(--border-strong)"}
                strokeWidth="2"
              />
              <text x="435" y="37" textAnchor="middle" fontSize="16" fontWeight="800" fill="var(--ink-primary)">
                {row.right}
              </text>
            </motion.g>
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
            <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
            <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {scene.annotation}
            </text>
          </motion.g>
        )}

        <rect x="200" y="96" width="360" height="236" rx="18" fill="var(--bg-surface)" stroke="var(--border-strong)" strokeWidth="2" filter="url(#fig-soft-shadow)" />
        {lines.map((line, idx) => (
          <text
            key={idx}
            x="380"
            y={156 + idx * 54}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="26"
            fontWeight="800"
            fill={idx === lines.length - 1 ? "var(--accent-coral)" : "var(--ink-primary)"}
          >
            {line}
          </text>
        ))}

        {scene.puzzleHint && (
          <text x="380" y="378" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent-teal)">
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
          <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
          <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
            {scene.annotation}
          </text>
        </motion.g>
      )}

      <rect x="130" y="106" width="500" height="92" rx="16" fill="var(--bg-surface)" stroke="var(--border-strong)" strokeWidth="2" />
      <text x="156" y="134" fontSize="12" fontWeight="700" fill="var(--ink-muted)">
        移动前（不成立）：
      </text>
      <text x="380" y="172" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="28" fontWeight="800" fill="var(--ink-secondary)">
        {scene.matchBefore ?? "6 + 4 = 4"}
      </text>

      {scene.matchMoveNote && (
        <text x="380" y="232" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--accent-coral)">
          ↓ {scene.matchMoveNote} ↓
        </text>
      )}

      {scene.matchAfter && (
        <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <rect x="130" y="254" width="500" height="92" rx="16" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="2.5" />
          <text x="156" y="282" fontSize="12" fontWeight="700" fill="var(--accent-teal)">
            移动后（成立！）：
          </text>
          <text x="380" y="320" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="28" fontWeight="800" fill="var(--ink-primary)">
            {scene.matchAfter}
          </text>
        </motion.g>
      )}
    </StageFrame>
  );
}
