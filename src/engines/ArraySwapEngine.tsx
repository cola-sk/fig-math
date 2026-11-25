import { motion } from "motion/react";
import type { ArraySwapSceneState, ArraySwapUnit } from "../types/lesson";
import { StageFrame } from "./StageFrame";

function renderUnitGlyph(type: ArraySwapUnit["baseType"], converted: boolean) {
  if (type === "chicken" || (type === "rabbit" && !converted)) {
    // Wait: if converted is true on a chicken->rabbit, render rabbit ears; otherwise check baseType
  }
  const effectiveType = converted
    ? type === "chicken"
      ? "rabbit"
      : type === "bike"
        ? "tricycle"
        : type === "small-boat"
          ? "big-boat"
          : type
    : type;

  switch (effectiveType) {
    case "chicken":
      return (
        <g transform="translate(0, -4)">
          <circle cx="0" cy="0" r="14" fill="var(--bg-surface)" stroke="var(--ink-primary)" strokeWidth="2" />
          <path d="M 8 -4 L 16 -1 L 8 3 Z" fill="var(--accent-amber)" stroke="var(--ink-primary)" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="4" cy="-4" r="2" fill="var(--ink-primary)" />
          <path d="M -4 -14 Q 0 -21 5 -14" fill="var(--accent-coral)" stroke="var(--ink-primary)" strokeWidth="1.5" />
        </g>
      );
    case "rabbit":
      return (
        <g transform="translate(0, -2)">
          <ellipse cx="-6" cy="-19" rx="4" ry="10" fill="var(--bg-surface)" stroke="var(--ink-primary)" strokeWidth="2" />
          <ellipse cx="5" cy="-19" rx="4" ry="10" fill="var(--bg-surface)" stroke="var(--ink-primary)" strokeWidth="2" />
          <ellipse cx="-6" cy="-19" rx="1.8" ry="6" fill="var(--accent-coral)" fillOpacity="0.45" />
          <ellipse cx="5" cy="-19" rx="1.8" ry="6" fill="var(--accent-coral)" fillOpacity="0.45" />
          <circle cx="0" cy="0" r="14" fill="var(--bg-surface)" stroke="var(--ink-primary)" strokeWidth="2" />
          <circle cx="-5" cy="-3" r="1.8" fill="var(--ink-primary)" />
          <circle cx="5" cy="-3" r="1.8" fill="var(--ink-primary)" />
          <circle cx="0" cy="2" r="2.2" fill="var(--accent-coral)" />
        </g>
      );
    case "bike":
      return (
        <g transform="translate(0, -2)">
          <path d="M -14 4 L -2 -10 L 12 4 M -2 -10 L 8 -13" fill="none" stroke="var(--ink-primary)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="-13" cy="5" r="5" fill="none" stroke="var(--ink-primary)" strokeWidth="2" />
          <circle cx="13" cy="5" r="5" fill="none" stroke="var(--ink-primary)" strokeWidth="2" />
        </g>
      );
    case "tricycle":
      return (
        <g transform="translate(0, -2)">
          <path d="M -16 4 L -4 -10 L 10 4 M -4 -10 L 8 -14" fill="none" stroke="var(--accent-coral)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="-15" cy="5" r="5" fill="none" stroke="var(--ink-primary)" strokeWidth="2" />
          <circle cx="0" cy="5" r="5" fill="none" stroke="var(--ink-primary)" strokeWidth="2" />
          <circle cx="15" cy="5" r="5" fill="none" stroke="var(--ink-primary)" strokeWidth="2" />
        </g>
      );
    case "small-boat":
      return (
        <g transform="translate(0, -2)">
          <path d="M -18 0 L 18 0 L 12 10 L -12 10 Z" fill="var(--bg-surface)" stroke="var(--ink-primary)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 0 0 L 0 -14 L 10 -4 Z" fill="var(--accent-teal)" fillOpacity="0.6" stroke="var(--ink-primary)" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
      );
    case "big-boat":
      return (
        <g transform="translate(0, -2)">
          <path d="M -22 0 L 22 0 L 15 11 L -15 11 Z" fill="var(--accent-coral)" fillOpacity="0.2" stroke="var(--accent-coral)" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M -2 0 L -2 -16 L 12 -5 Z" fill="var(--accent-coral)" fillOpacity="0.7" stroke="var(--ink-primary)" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
      );
  }
}

export function ArraySwapEngine({ scene }: { scene: ArraySwapSceneState }) {
  const count = scene.units.length;
  const cols = count <= 5 ? count : count <= 8 ? 4 : 5;
  const rows = Math.ceil(count / cols);
  const cardW = cols >= 5 ? 124 : 144;
  const cardH = rows >= 3 ? 104 : 132;
  const gapX = 16;
  const gapY = 18;
  const gridW = cols * cardW + (cols - 1) * gapX;
  const startX = (760 - gridW) / 2;
  const startY = scene.summaryBanner ? 74 : 56;

  return (
    <StageFrame ariaLabel={scene.unitTitle}>
      {/* Top status banner */}
      {scene.summaryBanner && (
        <motion.g
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <rect
            x="110"
            y="18"
            width="540"
            height="36"
            rx="10"
            fill="var(--bg-surface)"
            stroke="var(--border-strong)"
            strokeWidth="1.2"
          />
          <text
            x="380"
            y="41"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--ink-primary)"
          >
            {scene.summaryBanner}
          </text>
        </motion.g>
      )}

      {/* Unit Cards */}
      {scene.units.map((unit, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const x = startX + col * (cardW + gapX);
        const y = startY + row * (cardH + gapY);
        const isConverted = unit.state === "converted";
        const isHighlighted = unit.state === "highlighted";
        const isLifted = unit.state === "lifted";

        const borderColor = isConverted
          ? "var(--accent-coral)"
          : isHighlighted
            ? "var(--accent-teal)"
            : "var(--border-strong)";

        const fillColor = isConverted
          ? "var(--accent-coral-soft)"
          : isHighlighted
            ? "var(--accent-teal-soft)"
            : "var(--bg-surface)";

        return (
          <motion.g
            key={unit.id}
            initial={false}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            filter="url(#fig-soft-shadow)"
          >
            <rect
              width={cardW}
              height={cardH}
              rx="14"
              fill={fillColor}
              stroke={borderColor}
              strokeWidth={isConverted || isHighlighted ? 2.2 : 1.5}
            />

            {/* Index tag */}
            <text
              x="12"
              y="20"
              fontSize="11"
              fontWeight="600"
              fill="var(--ink-muted)"
            >
              #{idx + 1}
            </text>

            {/* State pill */}
            <text
              x={cardW - 10}
              y="20"
              textAnchor="end"
              fontSize="11"
              fontWeight="600"
              fill={isConverted ? "var(--accent-coral)" : "var(--ink-secondary)"}
            >
              {unit.label}
            </text>

            {/* Glyph */}
            <g transform={`translate(${cardW / 2}, ${cardH * 0.46})`}>
              {renderUnitGlyph(unit.baseType, isConverted)}
            </g>

            {/* Part dots (legs / wheels / seats) */}
            <g transform={`translate(${cardW / 2}, ${cardH - 22})`}>
              {Array.from({ length: unit.currentLegs }).map((_, pIdx) => {
                const totalP = unit.currentLegs;
                const spacing = totalP > 4 ? 14 : 18;
                const px = (pIdx - (totalP - 1) / 2) * spacing;
                const isAdded = pIdx >= unit.currentLegs - unit.addedLegs;
                return (
                  <motion.circle
                    key={`${unit.id}-leg-${pIdx}`}
                    cx={px}
                    cy={0}
                    r={5}
                    initial={false}
                    animate={{
                      scale: isAdded ? [0.6, 1.25, 1] : 1,
                      fill: isAdded ? "var(--accent-coral)" : "var(--ink-primary)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}

              {/* Lifted / ghosted legs shown beneath with dashed coral circle */}
              {isLifted &&
                unit.liftedLegs > 0 &&
                Array.from({ length: unit.liftedLegs }).map((_, gIdx) => {
                  const gx = (gIdx - (unit.liftedLegs - 1) / 2) * 18;
                  return (
                    <motion.g
                      key={`${unit.id}-lifted-${gIdx}`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 0.8, y: 12 }}
                      transition={{ duration: 0.35 }}
                    >
                      <circle
                        cx={gx}
                        cy={0}
                        r={4.5}
                        fill="none"
                        stroke="var(--accent-coral)"
                        strokeWidth="1.5"
                        strokeDasharray="2.5 2"
                      />
                    </motion.g>
                  );
                })}
            </g>
          </motion.g>
        );
      })}

      {/* Diff pool bar at bottom when replacing */}
      {scene.diffPool && (
        <g transform="translate(110, 386)">
          <motion.g
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
          <rect
            width="540"
            height="36"
            rx="10"
            fill="var(--bg-surface)"
            stroke="var(--accent-coral-border)"
            strokeWidth="1.5"
          />
          <text
            x="16"
            y="23"
            fontSize="13"
            fontWeight="600"
            fill="var(--ink-primary)"
          >
            待补差额池：还剩 {scene.diffPool.remaining} {scene.partLabel}
          </text>
          <g transform="translate(270, 18)">
            {Array.from({ length: Math.min(scene.diffPool.totalNeeded, 16) }).map((_, i) => {
              const active = i < scene.diffPool!.remaining;
              return (
                <circle
                  key={`pool-${i}`}
                  cx={i * 15}
                  cy={0}
                  r={4.5}
                  fill={active ? "var(--accent-coral)" : "var(--border-subtle)"}
                />
              );
            })}
          </g>
          </motion.g>
        </g>
      )}
    </StageFrame>
  );
}
