import { motion } from "motion/react";
import type { WellClimbSceneState } from "../types/lesson";
import { StageFrame } from "./StageFrame";

export function WellClimbEngine({ scene }: { scene: WellClimbSceneState }) {
  const wellLeft = 240;
  const wellWidth = 130;
  const wellTop = 86;
  const wellBottom = 382;
  const wellHeightPx = wellBottom - wellTop;

  const yForHeight = (h: number) =>
    wellBottom - (Math.min(scene.wellDepth, Math.max(0, h)) / scene.wellDepth) * wellHeightPx;

  const snailY = yForHeight(scene.currentHeight);
  const reserveTopY = yForHeight(scene.wellDepth - scene.dayClimb);

  return (
    <StageFrame ariaLabel="蜗牛爬井动态舞台">
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

      {/* Well Walls */}
      <rect
        x={wellLeft}
        y={wellTop}
        width={wellWidth}
        height={wellHeightPx}
        fill="var(--bg-surface)"
        stroke="var(--ink-primary)"
        strokeWidth="2.5"
      />
      {/* Open top rim */}
      <line
        x1={wellLeft - 24}
        y1={wellTop}
        x2={wellLeft + wellWidth + 24}
        y2={wellTop}
        stroke="var(--accent-teal)"
        strokeWidth="3"
        strokeDasharray="6 4"
      />
      <text
        x={wellLeft - 32}
        y={wellTop + 5}
        textAnchor="end"
        fontSize="13"
        fontWeight="700"
        fill="var(--accent-teal)"
      >
        井口 ({scene.wellDepth}米)
      </text>
      <text
        x={wellLeft - 32}
        y={wellBottom + 4}
        textAnchor="end"
        fontSize="13"
        fontWeight="700"
        fill="var(--ink-muted)"
      >
        井底 (0米)
      </text>

      {/* Meter Tick Marks */}
      {Array.from({ length: scene.wellDepth + 1 }).map((_, m) => {
        const y = yForHeight(m);
        return (
          <g key={`tick-${m}`}>
            <line
              x1={wellLeft}
              y1={y}
              x2={wellLeft + 10}
              y2={y}
              stroke="var(--ink-muted)"
              strokeWidth="1.2"
            />
            {m > 0 && m < scene.wellDepth && (
              <text
                x={wellLeft - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="10.5"
                fill="var(--ink-muted)"
              >
                {m}m
              </text>
            )}
          </g>
        );
      })}

      {/* Last-Day Sprint Zone Highlight */}
      {scene.reserveTopBand && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect
            x={wellLeft + 2}
            y={wellTop + 2}
            width={wellWidth - 4}
            height={Math.max(8, reserveTopY - wellTop - 2)}
            fill="url(#fig-hatch-coral)"
          />
          <line
            x1={wellLeft - 18}
            y1={reserveTopY}
            x2={wellLeft + wellWidth + 14}
            y2={reserveTopY}
            stroke="var(--accent-coral)"
            strokeWidth="1.8"
            strokeDasharray="5 3"
          />
          <text
            x={wellLeft - 24}
            y={(wellTop + reserveTopY) / 2 + 4}
            textAnchor="end"
            fontSize="11.5"
            fontWeight="700"
            fill="var(--accent-coral)"
          >
            最后1天冲刺区（{scene.dayClimb}米，不滑）
          </text>
        </motion.g>
      )}

      {/* Day / Night Trails */}
      {scene.trails.map((t, idx) => {
        const tx = wellLeft + wellWidth + 24 + idx * 46;
        const yFrom = yForHeight(t.fromH);
        const yPeak = yForHeight(t.peakH);
        const yEnd = yForHeight(t.endH);
        if (tx > 710) return null;

        return (
          <motion.g
            key={`trail-${t.day}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            {/* Day Climb Up */}
            <line
              x1={tx}
              y1={yFrom}
              x2={tx}
              y2={yPeak}
              stroke="var(--accent-coral)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx={tx} cy={yPeak} r="4" fill="var(--accent-coral)" />

            {/* Night Slide Down (if not escaped) */}
            {!t.escaped && (
              <>
                <line
                  x1={tx + 10}
                  y1={yPeak}
                  x2={tx + 10}
                  y2={yEnd}
                  stroke="var(--accent-blue)"
                  strokeWidth="2.5"
                  strokeDasharray="3 3"
                />
                <circle cx={tx + 10} cy={yEnd} r="3.5" fill="var(--accent-blue)" />
              </>
            )}

            <text
              x={tx + 4}
              y={wellBottom + 20}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={t.escaped ? "var(--accent-teal)" : "var(--ink-secondary)"}
            >
              第{t.day}天
            </text>
          </motion.g>
        );
      })}

      {/* Cute Snail Actor */}
      <motion.g
        initial={false}
        animate={{ x: wellLeft + wellWidth / 2, y: snailY }}
        transition={{ type: "spring", stiffness: 170, damping: 20 }}
        filter="url(#fig-soft-shadow)"
      >
        {/* Shell */}
        <circle
          cx="-5"
          cy="-12"
          r="13"
          fill="var(--accent-coral)"
          stroke="var(--ink-primary)"
          strokeWidth="2"
        />
        <circle cx="-5" cy="-12" r="6" fill="none" stroke="#fffdf9" strokeWidth="1.8" />
        {/* Body */}
        <path
          d="M -18 -2 Q 4 -4 18 -2 Q 20 4 12 4 L -16 4 Z"
          fill="#e7c675"
          stroke="var(--ink-primary)"
          strokeWidth="1.8"
        />
        {/* Antennae */}
        <line x1="12" y1="-3" x2="15" y2="-11" stroke="var(--ink-primary)" strokeWidth="1.5" />
        <line x1="16" y1="-2" x2="21" y2="-10" stroke="var(--ink-primary)" strokeWidth="1.5" />
        <circle cx="15" cy="-11" r="2" fill="var(--ink-primary)" />
        <circle cx="21" cy="-10" r="2" fill="var(--ink-primary)" />
      </motion.g>
    </StageFrame>
  );
}
