import { useEffect, useRef, useState } from "react";
import { Button } from "@ui-sdk/react/button";
import { motion } from "motion/react";
import type { EarlyBookSceneState } from "../../types/lesson";
import { StageFrame } from "../StageFrame";

function PersonAvatar({
  x,
  y,
  scale = 1,
  variant,
  counted,
  active = false,
  hiddenCount,
}: {
  x: number;
  y: number;
  scale?: number;
  variant: "normal" | "p1" | "p2";
  counted: boolean;
  active?: boolean;
  hiddenCount?: boolean;
}) {
  const fill =
    variant === "p1"
      ? "var(--accent-coral)"
      : variant === "p2"
        ? "var(--accent-blue)"
        : counted
          ? "var(--accent-teal-soft)"
          : "var(--bg-surface)";
  const stroke =
    variant === "p1"
      ? "var(--accent-coral)"
      : variant === "p2"
        ? "var(--accent-blue)"
        : counted
          ? "var(--accent-teal)"
          : "var(--border-strong)";

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <motion.g
        initial={false}
        animate={{ y: active ? -4 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <circle
          cx="0"
          cy="-9"
          r="5.5"
          fill={hiddenCount ? "var(--bg-surface)" : fill}
          stroke={stroke}
          strokeWidth="1.8"
          strokeDasharray={hiddenCount ? "3 2" : undefined}
        />
        <path
          d="M -7.5 13 C -7.5 3.5, -5 -1, 0 -1 C 5 -1, 7.5 3.5, 7.5 13 Z"
          fill={hiddenCount ? "var(--bg-surface)" : fill}
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeDasharray={hiddenCount ? "3 2" : undefined}
        />
        {hiddenCount && (
          <text
            x="0"
            y="10"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="800"
            fill="var(--ink-muted)"
          >
            ?
          </text>
        )}
      </motion.g>
    </g>
  );
}

export function QueueActionStage({ scene }: { scene: EarlyBookSceneState }) {
  const seg = scene.queueSegments ?? {
    before: 4,
    target: "主角",
    after: 4,
    hideAfter: false,
    hideBetween: false,
    teams: 1,
    teamDiff: 0,
    reverseCount: false,
    gridSquare: false,
  };

  const revealAfter = !seg.hideAfter || scene.phase >= 3;
  const revealBetween = !seg.hideBetween || scene.phase >= 3;
  const hasBetween = typeof seg.between === "number" && Boolean(seg.secondTarget);

  const visibleBefore = Math.max(0, seg.before);
  const visibleBetween = hasBetween ? (revealBetween ? Math.max(0, seg.between ?? 0) : 3) : 0;
  const visibleAfter = revealAfter ? Math.max(0, seg.after) : 3;

  const totalPeopleSlots =
    visibleBefore + 1 + (hasBetween ? visibleBetween + 1 : 0) + visibleAfter;

  const [countCursor, setCountCursor] = useState<number>(
    scene.phase === 0 ? -1 : totalPeopleSlots - 1,
  );
  const [reverseSweep, setReverseSweep] = useState<boolean>(false);
  const [teamFanout, setTeamFanout] = useState<boolean>(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  };

  const runCountDemo = (withTeamFanout: boolean) => {
    clearTimers();
    setReverseSweep(false);
    setTeamFanout(false);
    setCountCursor(0);
    const maxPreview = Math.min(totalPeopleSlots, 18);
    const stepMs = Math.max(45, Math.min(95, Math.floor(650 / Math.max(1, maxPreview))));
    for (let i = 1; i < maxPreview; i++) {
      const id = window.setTimeout(() => setCountCursor(i), i * stepMs);
      timersRef.current.push(id);
    }
    const endId = window.setTimeout(() => {
      setCountCursor(totalPeopleSlots - 1);
      if (seg.reverseCount) setReverseSweep(true);
      if (withTeamFanout && (seg.teams ?? 1) > 1) setTeamFanout(true);
    }, maxPreview * stepMs + 60);
    timersRef.current.push(endId);
  };

  useEffect(() => {
    clearTimers();
    setTeamFanout(false);
    setReverseSweep(false);
    if (scene.phase === 0) {
      setCountCursor(-1);
    } else {
      runCountDemo(scene.phase >= 2);
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.phase, totalPeopleSlots, seg.teams, seg.reverseCount]);

  // Build exact 1-to-1 slots inside left stage [42 .. 422]
  const usableLeft = 42;
  const usableWidth = 376;
  const slotStep = Math.min(30, usableWidth / Math.max(1, totalPeopleSlots));
  const avatarScale = Math.min(1, Math.max(0.56, slotStep / 28));
  const startX =
    usableLeft + (usableWidth - (totalPeopleSlots - 1) * slotStep) / 2;

  type SlotInfo = {
    idx: number;
    x: number;
    variant: "normal" | "p1" | "p2";
    hiddenCount: boolean;
    orderNumber: number;
  };
  const slots: SlotInfo[] = [];
  let cursorX = startX;
  let idx = 0;

  for (let i = 0; i < visibleBefore; i++) {
    slots.push({
      idx,
      x: cursorX,
      variant: "normal",
      hiddenCount: false,
      orderNumber: i + 1,
    });
    idx++;
    cursorX += slotStep;
  }

  const p1Idx = idx;
  const p1X = cursorX;
  slots.push({
    idx,
    x: cursorX,
    variant: "p1",
    hiddenCount: false,
    orderNumber: visibleBefore + 1,
  });
  idx++;
  cursorX += slotStep;

  let p2Idx = -1;
  let p2X = -1;
  if (hasBetween) {
    for (let i = 0; i < visibleBetween; i++) {
      slots.push({
        idx,
        x: cursorX,
        variant: "normal",
        hiddenCount: !revealBetween,
        orderNumber: visibleBefore + 2 + i,
      });
      idx++;
      cursorX += slotStep;
    }
    p2Idx = idx;
    p2X = cursorX;
    slots.push({
      idx,
      x: cursorX,
      variant: "p2",
      hiddenCount: false,
      orderNumber:
        revealBetween ? visibleBefore + 2 + visibleBetween : visibleBefore + 2,
    });
    idx++;
    cursorX += slotStep;
  }

  for (let i = 0; i < visibleAfter; i++) {
    slots.push({
      idx,
      x: cursorX,
      variant: "normal",
      hiddenCount: !revealAfter,
      orderNumber: idx + 1,
    });
    idx++;
    cursorX += slotStep;
  }

  const rowY = (seg.teams ?? 1) > 1 && teamFanout ? 136 : 196;
  const showMultiTeams = scene.phase >= 2 && (seg.teams ?? 1) > 1;
  const teamCount = Math.min(6, seg.teams ?? 1);
  const showSquareGrid = Boolean(seg.gridSquare) && scene.phase >= 2;

  const statusCaption = (() => {
    if (scene.phase === 0) {
      return `先看清队伍里的主角位置：标出「前面」「本人」「后面」分别对应哪些人。`;
    }
    if (scene.phase === 1) {
      return `👆 逐个点数对齐：千万别漏算主角自己，也别重复数同一位同学！`;
    }
    if (scene.phase === 2) {
      if ((seg.teams ?? 1) > 1) {
        return `队伍分成 ${seg.teams} 排${seg.teamDiff ? `（每排差 ${seg.teamDiff} 人）` : "同样人数"}，先算清这一排人数：${scene.middleValue}。`;
      }
      if (seg.gridSquare) {
        return `先算出方阵每一行的人数（${scene.middleValue}），再看有几行同样多！`;
      }
      return `中间关键量已标出（${scene.middleLabel}：${scene.middleValue}），看看各段怎样合起来！`;
    }
    return `🎉 对齐各段人数算清总数！结果：${scene.finalValue}。`;
  })();

  const pillText = (() => {
    if (scene.phase === 0) {
      return `看清位置 · 前 / 主角 / 后`;
    }
    if (scene.phase === 1) {
      return `逐段点数 · 别漏也别重`;
    }
    if (scene.phase === 2) {
      return `${scene.middleLabel}：${scene.middleValue}`;
    }
    return `🎉 ${scene.finalValue}`;
  })();

  const controls = (
    <>
      {scene.phase === 1 && (
        <Button
          aria-label="演示排队逐段点数"
          onClick={() => runCountDemo(false)}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-teal)] bg-[var(--accent-teal)] px-2.5 py-1 text-xs font-bold text-white transition"
        >
          👆 演示逐段点数
        </Button>
      )}
      {scene.phase >= 2 && (
        <Button
          aria-label="演示排队过程动画"
          onClick={() => runCountDemo(true)}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-coral)] bg-[var(--accent-coral)] px-2.5 py-1 text-xs font-bold text-white transition"
        >
          🎬 演示排队动画
        </Button>
      )}
    </>
  );

  return (
    <StageFrame
      ariaLabel="排队与队列问题 2D 过程图解"
      controls={controls}
      statusCaption={statusCaption}
      onReplay={() => runCountDemo(scene.phase >= 2)}
    >
      {/* Left 2D Queue Stage Container */}
      <rect
        x="24"
        y="56"
        width="414"
        height="314"
        rx="20"
        fill="var(--bg-surface)"
        stroke="var(--border-subtle)"
      />
      <rect x="34" y="66" width="394" height="264" rx="14" fill="var(--bg-stage)" />

      {/* Direction sign */}
      <text x="48" y="88" fontSize="11.5" fontWeight="700" fill="var(--ink-secondary)">
        排头（前面）→
      </text>
      <text x="414" y="88" textAnchor="end" fontSize="11.5" fontWeight="700" fill="var(--ink-secondary)">
        ← 排尾（后面）
      </text>

      {/* Directional Bracket Arcs */}
      {scene.phase >= 1 && visibleBefore > 0 && (
        <g>
          <path
            d={`M ${slots[0].x} ${rowY + 28} Q ${(slots[0].x + slots[p1Idx - 1].x) / 2} ${rowY + 48} ${slots[p1Idx - 1].x} ${rowY + 28}`}
            fill="none"
            stroke="var(--accent-teal)"
            strokeWidth="2.4"
            className="fig-flow-dash"
          />
          <text
            x={(slots[0].x + slots[p1Idx - 1].x) / 2}
            y={rowY + 58}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--accent-teal)"
          >
            前 {visibleBefore} 人
          </text>
        </g>
      )}

      {scene.phase >= 1 && visibleAfter > 0 && (
        <g>
          <path
            d={`M ${slots[slots.length - visibleAfter].x} ${rowY + 28} Q ${(slots[slots.length - visibleAfter].x + slots[slots.length - 1].x) / 2} ${rowY + 48} ${slots[slots.length - 1].x} ${rowY + 28}`}
            fill="none"
            stroke="var(--accent-blue)"
            strokeWidth="2.4"
            className={
              seg.reverseCount && reverseSweep
                ? "fig-flow-dash-reverse"
                : "fig-flow-dash"
            }
          />
          <text
            x={(slots[slots.length - visibleAfter].x + slots[slots.length - 1].x) / 2}
            y={rowY + 58}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--accent-blue)"
          >
            后 {revealAfter ? `${seg.after} 人` : "? 人"}
          </text>
        </g>
      )}

      {/* Leader-line anchored label for Protagonist 1 */}
      <line
        x1={p1X}
        y1={rowY - 20}
        x2={p1X}
        y2={rowY - 40}
        stroke="var(--accent-coral)"
        strokeWidth="2"
      />
      <rect
        x={Math.max(40, Math.min(350, p1X - 32))}
        y={rowY - 62}
        width="64"
        height="22"
        rx="11"
        fill="var(--accent-coral)"
      />
      <text
        x={Math.max(72, Math.min(382, p1X))}
        y={rowY - 47}
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="#ffffff"
      >
        {seg.target}
      </text>

      {/* Leader-line anchored label for Protagonist 2 (if two targets) */}
      {hasBetween && p2Idx >= 0 && seg.secondTarget && (
        <g>
          <line
            x1={p2X}
            y1={rowY - 20}
            x2={p2X}
            y2={rowY - 40}
            stroke="var(--accent-blue)"
            strokeWidth="2"
          />
          <rect
            x={Math.max(40, Math.min(350, p2X - 32))}
            y={rowY - 62}
            width="64"
            height="22"
            rx="11"
            fill="var(--accent-blue)"
          />
          <text
            x={Math.max(72, Math.min(382, p2X))}
            y={rowY - 47}
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#ffffff"
          >
            {seg.secondTarget}
          </text>
        </g>
      )}

      {/* 1-to-1 People Row */}
      {slots.map((slot) => (
        <g key={slot.idx}>
          <PersonAvatar
            x={slot.x}
            y={rowY}
            scale={avatarScale}
            variant={slot.variant}
            counted={slot.idx <= countCursor || slot.variant !== "normal"}
            active={
              slot.idx === countCursor && countCursor < totalPeopleSlots - 1
            }
            hiddenCount={slot.hiddenCount}
          />
          {scene.phase >= 1 && slot.idx <= countCursor && !slot.hiddenCount && totalPeopleSlots <= 15 && (
            <text
              x={slot.x}
              y={rowY + 23}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fill={slot.variant === "p1" ? "var(--accent-coral)" : "var(--ink-muted)"}
            >
              {slot.orderNumber}
            </text>
          )}
        </g>
      ))}

      {/* Multi-team Fan-out Rows */}
      {showMultiTeams && teamFanout && (
        <g>
          {Array.from({ length: teamCount - 1 }, (_, rIdx) => {
            const ry = rowY + 72 + rIdx * 24;
            const rowDots = Math.min(12, Math.max(3, totalPeopleSlots - (seg.teamDiff ? rIdx + 1 : 0)));
            return (
              <motion.g
                key={rIdx}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rIdx * 0.08 }}
              >
                <text x="48" y={ry + 4} fontSize="10" fontWeight="700" fill="var(--ink-secondary)">
                  第{rIdx + 2}队
                </text>
                {Array.from({ length: rowDots }, (_, cIdx) => (
                  <PersonAvatar
                    key={cIdx}
                    x={94 + cIdx * 22}
                    y={ry}
                    scale={0.62}
                    variant="normal"
                    counted
                  />
                ))}
              </motion.g>
            );
          })}
        </g>
      )}

      {/* Dark Contextual Pill */}
      <rect x="96" y="340" width="270" height="24" rx="12" fill="#1e1e1e" />
      <text x="231" y="356" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
        {pillText}
      </text>

      {/* Right 2D Synchronized Segment Schematic */}
      <rect
        x="456"
        y="56"
        width="280"
        height="314"
        rx="20"
        fill="var(--bg-surface)"
        stroke="var(--border-subtle)"
      />
      <text x="596" y="80" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="var(--ink-primary)">
        排队分段模型
      </text>

      {/* Visual Segment Formula Blocks */}
      <g>
        <rect x="476" y="98" width="72" height="44" rx="10" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" />
        <text x="512" y="116" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--ink-secondary)">前段</text>
        <text x="512" y="133" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--accent-teal)">
          {seg.before}
        </text>

        <text x="556" y="125" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--ink-muted)">+</text>

        <rect x="564" y="98" width="64" height="44" rx="10" fill="var(--accent-coral-soft)" stroke="var(--accent-coral)" />
        <text x="596" y="116" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--ink-secondary)">{seg.target}</text>
        <text x="596" y="133" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--accent-coral)">1</text>

        <text x="636" y="125" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--ink-muted)">+</text>

        <rect x="644" y="98" width="72" height="44" rx="10" fill="var(--accent-blue-soft)" stroke="var(--accent-blue)" />
        <text x="680" y="116" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--ink-secondary)">后段</text>
        <text x="680" y="133" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--accent-blue)">
          {revealAfter ? seg.after : "?"}
        </text>
      </g>

      {/* Optional Mini Square Grid if gridSquare */}
      {showSquareGrid && (
        <g>
          <text x="596" y="164" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-secondary)">
            方阵行与列对称示意图
          </text>
          {Array.from({ length: 4 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={566 + c * 20}
                cy={178 + r * 16}
                r="4.5"
                fill={r === 1 && c === 1 ? "var(--accent-coral)" : "var(--accent-teal-soft)"}
                stroke={r === 1 && c === 1 ? "var(--accent-coral)" : "var(--accent-teal)"}
                strokeWidth="1.5"
              />
            )),
          )}
        </g>
      )}

      {/* Facts summary */}
      {!showSquareGrid && (
        <g>
          {scene.facts.slice(0, 3).map((fact, fIdx) => (
            <g key={fIdx}>
              <rect
                x="476"
                y={162 + fIdx * 40}
                width="240"
                height="32"
                rx="9"
                fill="var(--bg-stage)"
                stroke="var(--border-subtle)"
              />
              <text
                x="596"
                y={182 + fIdx * 40}
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill="var(--ink-primary)"
              >
                {fact}
              </text>
            </g>
          ))}
        </g>
      )}

      {/* Strictly Non-Spoiling Readouts */}
      <rect x="472" y="294" width="248" height="28" rx="8" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" />
      <text x="596" y="312" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--ink-primary)">
        {scene.middleLabel}：{scene.phase >= 2 ? scene.middleValue : "?"}
      </text>
      <text x="596" y="348" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="var(--accent-coral)">
        结果：{scene.phase >= 3 ? scene.finalValue : "?"}
      </text>
    </StageFrame>
  );
}
