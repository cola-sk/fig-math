import { motion } from "motion/react";
import type { ComboVisualSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

export function ComboVisualEngine({ scene }: { scene: ComboVisualSceneState }) {
  if (scene.mode === "pattern") {
    const positions = [{ x: 12, y: 12 }, { x: 88, y: 12 }, { x: 88, y: 88 }, { x: 12, y: 88 }];
    return (
      <StageFrame ariaLabel="正方形黑点位置推理舞台">
        <text x="380" y="43" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink-primary)">{scene.annotation}</text>
        {(scene.patternCorners ?? []).map((corner, index) => (
          <g key={index} transform={`translate(${85 + index * 155}, 160)`}>
            <rect width="100" height="100" rx="8" fill="var(--bg-surface)" stroke="var(--ink-primary)" strokeWidth="2.5" />
            {corner === null ? <text x="50" y="62" textAnchor="middle" fontSize="34" fill="var(--accent-coral)">?</text> : <circle cx={positions[corner].x} cy={positions[corner].y} r="8" fill="var(--accent-coral)" />}
            <text x="50" y="132" textAnchor="middle" fontSize="16" fill="var(--ink-primary)">第 {index + 1} 幅</text>
          </g>
        ))}
      </StageFrame>
    );
  }

  if (scene.mode === "pairing") {
    const left = scene.leftItems ?? ["上衣A", "上衣B"];
    const right = scene.rightItems ?? ["裤子1", "裤子2", "裤子3"];
    const xL = 190;
    const xR = 540;
    const yStart = 120;
    const gapL = 96;
    const gapR = 72;

    return (
      <StageFrame ariaLabel="有序搭配连线舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
            <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {scene.annotation}
            </text>
          </motion.g>
        )}

        {/* Lines */}
        {left.map((_, li) =>
          right.map((__, ri) => {
            const pairIdx = li * right.length + ri;
            if (scene.revealedCount !== undefined && pairIdx >= scene.revealedCount) {
              return null;
            }
            const y1 = yStart + li * gapL + 22;
            const y2 = yStart + ri * gapR + 22;
            const color = li === 0 ? "var(--accent-coral)" : "var(--accent-teal)";
            return (
              <motion.line
                key={`pair-${li}-${ri}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: ri * 0.08 }}
                x1={xL + 110}
                y1={y1}
                x2={xR}
                y2={y2}
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          }),
        )}

        {left.map((item, idx) => (
          <g key={`l-${idx}`} transform={`translate(${xL}, ${yStart + idx * gapL})`}>
            <rect width="110" height="44" rx="12" fill="var(--accent-coral-soft)" stroke="var(--accent-coral)" strokeWidth="2" />
            <text x="55" y="27" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {item}
            </text>
          </g>
        ))}

        {right.map((item, idx) => (
          <g key={`r-${idx}`} transform={`translate(${xR}, ${yStart + idx * gapR})`}>
            <rect width="110" height="44" rx="12" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" strokeWidth="2" />
            <text x="55" y="27" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {item}
            </text>
          </g>
        ))}
      </StageFrame>
    );
  }

  if (scene.mode === "handshake") {
    const people = scene.leftItems ?? ["甲", "乙", "丙", "丁"];
    const cx = 380;
    const cy = 242;
    const r = 122;
    const coords = people.map((_, i) => {
      const a = ((i / people.length) * 360 - 90) * (Math.PI / 180);
      return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
    });

    const edges: Array<{ a: number; b: number }> = [];
    for (let i = 0; i < people.length; i++) {
      for (let j = i + 1; j < people.length; j++) {
        edges.push({ a: i, b: j });
      }
    }

    return (
      <StageFrame ariaLabel="无序组合连线舞台">
        {scene.annotation && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
            <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
              {scene.annotation}
            </text>
          </motion.g>
        )}

        {edges.slice(0, scene.revealedCount ?? edges.length).map((e, idx) => (
          <motion.line
            key={`edge-${e.a}-${e.b}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.07 }}
            x1={coords[e.a].x}
            y1={coords[e.a].y}
            x2={coords[e.b].x}
            y2={coords[e.b].y}
            stroke={e.a === 0 ? "var(--accent-coral)" : "var(--accent-teal)"}
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}

        {people.map((name, idx) => (
          <g key={name} transform={`translate(${coords[idx].x}, ${coords[idx].y})`}>
            <circle cx="0" cy="0" r="24" fill="var(--bg-surface)" stroke="var(--ink-primary)" strokeWidth="2.5" filter="url(#fig-soft-shadow)" />
            <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--ink-primary)">
              {name}
            </text>
          </g>
        ))}
      </StageFrame>
    );
  }

  // Cards / Rows list mode (permutation, money enumeration, make-ten)
  const cards = scene.cards ?? [];
  const rows = scene.rows ?? [];

  return (
    <StageFrame ariaLabel="有序枚举与转化卡片舞台">
      {scene.annotation && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x="90" y="20" width="580" height="36" rx="12" fill="var(--bg-surface)" stroke="var(--border-strong)" />
          <text x="380" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
            {scene.annotation}
          </text>
        </motion.g>
      )}

      {cards.length > 0 && (
        <g transform="translate(0, 86)">
          {cards.map((card, idx) => {
            const cols = Math.min(4, cards.length);
            const cardW = 134;
            const gap = 16;
            const startX = (760 - (cols * cardW + (cols - 1) * gap)) / 2;
            const col = idx % cols;
            const row = Math.floor(idx / cols);
            const x = startX + col * (cardW + gap);
            const y = row * 70;
            const fill =
              card.tone === "coral"
                ? "var(--accent-coral-soft)"
                : card.tone === "teal"
                  ? "var(--accent-teal-soft)"
                  : card.tone === "blue"
                    ? "var(--accent-blue-soft)"
                    : "var(--bg-surface)";
            const stroke =
              card.tone === "coral"
                ? "var(--accent-coral)"
                : card.tone === "teal"
                  ? "var(--accent-teal)"
                  : card.tone === "blue"
                    ? "var(--accent-blue)"
                    : "var(--border-strong)";

            return (
              <g key={card.id} transform={`translate(${x}, ${y})`}>
                <motion.g
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <rect width={cardW} height="52" rx="12" fill={fill} stroke={stroke} strokeWidth="2" />
                  <text x={cardW / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="800" fill="var(--ink-primary)">
                    {card.text}
                  </text>
                </motion.g>
              </g>
            );
          })}
        </g>
      )}

      {rows.length > 0 && (
        <g transform={`translate(100, ${cards.length > 0 ? 86 + Math.ceil(cards.length / 4) * 70 + 12 : 92})`}>
          {rows.map((r, idx) => (
            <g key={r.label} transform={`translate(0, ${idx * Math.min(62, (380 - (cards.length > 0 ? 86 + Math.ceil(cards.length / 4) * 70 + 12 : 92)) / rows.length)})`}>
              <motion.g
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                <rect
                  width="560"
                  height="52"
                  rx="10"
                  fill={r.active ? "var(--accent-teal-soft)" : "var(--bg-surface)"}
                  stroke={r.active ? "var(--accent-teal)" : "var(--border-subtle)"}
                  strokeWidth="1.5"
                />
                <text x="18" y="21" fontSize="14" fontWeight="700" fill="var(--ink-primary)">
                  {r.label}
                </text>
                <text x="542" y="43" textAnchor="end" fontSize="13" fontWeight="700" fill="var(--accent-coral)">
                  {r.badge}
                </text>
              </motion.g>
            </g>
          ))}
        </g>
      )}
    </StageFrame>
  );
}
