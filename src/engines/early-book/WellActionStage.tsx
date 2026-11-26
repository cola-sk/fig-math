import { useEffect, useRef, useState } from "react";
import { Button } from "@ui-sdk/react/button";
import { motion } from "motion/react";
import type { EarlyBookSceneState } from "../../types/lesson";
import { StageFrame } from "../StageFrame";

type WellTrail = { step: number; from: number; peak: number; end: number };
type SubAction = "up" | "down" | "done";

function buildTrails(total: number, up: number, down: number): WellTrail[] {
  const trails: WellTrail[] = [];
  let h = 0;
  for (let step = 1; step <= 12; step++) {
    const peak = Math.min(total, h + up);
    const reached = peak >= total;
    const end = reached ? total : peak - down;
    trails.push({ step, from: h, peak, end });
    h = end;
    if (reached) break;
  }
  return trails;
}

export function WellActionStage({ scene }: { scene: EarlyBookSceneState }) {
  const spec = scene.wellSpec ?? {
    total: 6,
    up: 2,
    down: 1,
    unit: "米",
    vertical: true,
  };
  const trails = buildTrails(spec.total, spec.up, spec.down);
  const runner2Trails = spec.secondRunner
    ? buildTrails(
        spec.secondRunner.total,
        spec.secondRunner.up,
        spec.secondRunner.down,
      )
    : [];

  const defaultRound =
    scene.focusRound !== undefined
      ? scene.focusRound
      : scene.phase === 0
        ? 0
        : scene.phase === 1
          ? 1
          : scene.phase === 2
            ? Math.max(1, trails.length - 1)
            : trails.length;

  const [subAction, setSubAction] = useState<SubAction>(
    scene.phase === 1 ? "up" : "done",
  );
  const [demoRound, setDemoRound] = useState<number>(defaultRound);
  const [fastMode, setFastMode] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  };

  useEffect(() => {
    clearTimers();
    setFastMode(false);
    setDemoRound(defaultRound);
    if (scene.focusRound !== undefined && scene.focusRound > 0) {
      setSubAction("up");
      const targetSub: SubAction =
        scene.focusRound < trails.length || scene.hideCurrentEnd ? "down" : "done";
      const id = window.setTimeout(() => setSubAction(targetSub), 650);
      timersRef.current.push(id);
    } else if (scene.phase === 1) {
      setSubAction("up");
      const id = window.setTimeout(() => setSubAction("down"), 650);
      timersRef.current.push(id);
    } else {
      setSubAction("done");
    }
    return clearTimers;
  }, [scene.phase, scene.focusRound, scene.hideCurrentEnd, defaultRound, spec.total, spec.up, spec.down, trails.length]);

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const targetRound = scene.focusRound ?? 1;

  const playDayNight = () => {
    clearTimers();
    setFastMode(false);
    setDemoRound(targetRound);
    setSubAction("up");
    const targetSub: SubAction =
      targetRound < trails.length || scene.hideCurrentEnd ? "down" : "done";
    schedule(() => setSubAction(targetSub), 650);
  };

  const playSprintPrefix = () => {
    clearTimers();
    setFastMode(true);
    const target = Math.max(1, trails.length - 1);
    setDemoRound(1);
    setSubAction("up");
    for (let r = 1; r <= target; r++) {
      const base = (r - 1) * 420;
      schedule(() => {
        setDemoRound(r);
        setSubAction("up");
      }, base);
      schedule(() => {
        setSubAction(r === target ? "done" : "down");
      }, base + 210);
    }
  };

  const playFullReplay = () => {
    clearTimers();
    setFastMode(false);
    setDemoRound(1);
    setSubAction("up");
    for (let r = 1; r <= trails.length; r++) {
      const base = (r - 1) * 520;
      schedule(() => {
        setDemoRound(r);
        setSubAction("up");
      }, base);
      if (r < trails.length) {
        schedule(() => setSubAction("down"), base + 260);
      } else {
        schedule(() => setSubAction("done"), base + 300);
      }
    }
  };

  const playNextRound = () => {
    clearTimers();
    setFastMode(false);
    const next = demoRound >= trails.length ? 1 : demoRound + 1;
    setDemoRound(next);
    setSubAction("up");
    if (next < trails.length) {
      schedule(() => setSubAction("down"), 450);
    } else {
      schedule(() => setSubAction("done"), 450);
    }
  };

  const activeRound = Math.min(Math.max(0, demoRound), trails.length);
  const shownTrails = trails.slice(0, activeRound);
  const currentTrail = shownTrails.at(-1);
  const currentPos = !currentTrail
    ? 0
    : subAction === "up"
      ? currentTrail.peak
      : currentTrail.end;

  const isUpPhase = subAction === "up";
  const isDownPhase = subAction === "down";
  const skyFill = isUpPhase
    ? "rgba(235, 176, 77, 0.14)"
    : isDownPhase
      ? "rgba(46, 102, 158, 0.15)"
      : "var(--bg-surface)";

  const titleLabel =
    scene.subject === "毛毛虫"
      ? "毛毛虫爬树"
      : scene.subject === "台阶"
        ? "爬台阶"
        : scene.subject === "跳格子"
          ? "跳格子"
          : scene.subject === "舞台"
            ? "舞台折返"
            : "蜗牛爬井";

  const statusCaption = (() => {
    if (scene.phase === 0) {
      return `先看清目标与每轮动作：每次向前/上 ${spec.up}${spec.unit}，再回退 ${spec.down}${spec.unit}。`;
    }
    if (scene.focusRound !== undefined && scene.phase < 3) {
      const roundTrail = trails[scene.focusRound - 1];
      if (isUpPhase) {
        return `☀️ 第 ${scene.focusRound} 轮白天/前进动作：从 ${roundTrail?.from ?? 0}${spec.unit} 上升 +${spec.up}${spec.unit}${spec.hideTotal && scene.hideCurrentEnd ? "" : ` 到 ${roundTrail?.peak ?? spec.up}${spec.unit}`}。`;
      }
      if (scene.hideCurrentEnd) {
        return `🌙 第 ${scene.focusRound} 轮夜晚/回退动作：再退回 ${spec.down}${spec.unit}，想一想现在到了多少${spec.unit}？`;
      }
      return `🌙 第 ${scene.focusRound} 轮夜晚/回退动作：下滑 ${spec.down}${spec.unit} 到 ${roundTrail?.end ?? 0}${spec.unit}，还差冲刺吗？`;
    }
    if (scene.phase === 1) {
      if (isUpPhase) {
        return `☀️ 白天/前进动作：从 0 爬到 ${spec.up}${spec.unit}（上升 +${spec.up}${spec.unit}）。`;
      }
      return `🌙 夜晚/回退动作：从 ${spec.up}${spec.unit} 下滑 ${spec.down}${spec.unit}，想一想一个昼夜净升几${spec.unit}？`;
    }
    if (scene.phase === 2) {
      const preRounds = Math.max(1, trails.length - 1);
      if (fastMode) {
        return `⏩ 正在加速演示前 ${preRounds} 轮（上${spec.up}退${spec.down}），到冲刺线前停下！`;
      }
      return `已完成前 ${preRounds} 轮，离终点只差最后冲刺的 ${spec.up}${spec.unit}（不再回退）！`;
    }
    return `🎉 第 ${trails.length} 轮直接到达终点，不再下滑！结果：${scene.finalValue}。`;
  })();

  const pillText = (() => {
    if (scene.phase === 0) {
      return spec.hideTotal
        ? `目标 ?${spec.unit} · 上${spec.up} 退${spec.down}`
        : `目标 ${spec.total}${spec.unit} · 上${spec.up} 退${spec.down}`;
    }
    if (scene.focusRound !== undefined && scene.phase < 3) {
      if (isUpPhase) {
        return `☀️ 第 ${scene.focusRound} 轮上爬 +${spec.up}${spec.unit}`;
      }
      if (scene.hideCurrentEnd) {
        return `🌙 第 ${scene.focusRound} 轮回退 −${spec.down}${spec.unit} · 当前 ?${spec.unit}`;
      }
      return `第 ${activeRound} 轮 · 当前 ${currentPos}${spec.unit}`;
    }
    if (scene.phase === 1) {
      return isUpPhase
        ? `☀️ 上爬 +${spec.up}${spec.unit}（到 ${spec.up}${spec.unit}）`
        : `🌙 下滑 −${spec.down}${spec.unit} · 净升 ?${spec.unit}`;
    }
    if (scene.phase === 2) {
      return `第 ${activeRound} 轮 · 当前 ${currentPos}${spec.unit}`;
    }
    return `🎉 到达终点 · ${scene.finalValue}`;
  })();

  const showRoundControls =
    scene.phase === 1 ||
    (scene.phase === 2 && scene.focusRound !== undefined && scene.focusRound < trails.length);

  const controls = (
    <>
      {showRoundControls && (
        <>
          <Button
            aria-label="演示白天上爬动作"
            aria-pressed={isUpPhase}
            onClick={() => {
              clearTimers();
              setDemoRound(targetRound);
              setSubAction("up");
            }}
            className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-bold transition ${
              isUpPhase
                ? "border-[var(--accent-coral)] bg-[var(--accent-coral)] text-white"
                : "border-[var(--border-strong)] bg-[var(--bg-stage)] text-[var(--ink-primary)]"
            }`}
          >
            ☀️ 演白天上爬
          </Button>
          <Button
            aria-label="演示晚上下滑动作"
            aria-pressed={isDownPhase}
            onClick={() => {
              clearTimers();
              setDemoRound(targetRound);
              setSubAction("down");
            }}
            className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-bold transition ${
              isDownPhase
                ? "border-[var(--accent-blue)] bg-[var(--accent-blue)] text-white"
                : "border-[var(--border-strong)] bg-[var(--bg-stage)] text-[var(--ink-primary)]"
            }`}
          >
            🌙 演晚上下滑
          </Button>
          <Button
            aria-label="连续演示一昼夜上爬和下滑"
            onClick={playDayNight}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-teal)] bg-[var(--accent-teal-soft)] px-2.5 py-1 text-xs font-bold text-[var(--accent-teal)] transition hover:brightness-95"
          >
            ▶ 连演本轮动作
          </Button>
        </>
      )}
      {scene.phase === 2 && (scene.focusRound === undefined || scene.focusRound >= trails.length) && (
        <Button
          aria-label="加速演示冲刺前各轮"
          onClick={playSprintPrefix}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-teal)] bg-[var(--accent-teal-soft)] px-2.5 py-1 text-xs font-bold text-[var(--accent-teal)] transition hover:brightness-95"
        >
          ⏩ 加速演示前几轮
        </Button>
      )}
      {scene.phase >= 3 && (
        <>
          <Button
            aria-label="逐轮演示下一天"
            onClick={playNextRound}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-stage)] px-2.5 py-1 text-xs font-bold text-[var(--ink-primary)] transition hover:border-[var(--accent-teal)]"
          >
            ⏭ 逐轮演示（第 {activeRound}/{trails.length} 轮）
          </Button>
          <Button
            aria-label="重播爬井完整过程"
            onClick={playFullReplay}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-teal)] bg-[var(--accent-teal-soft)] px-2.5 py-1 text-xs font-bold text-[var(--accent-teal)] transition hover:brightness-95"
          >
            ▶ 重播完整过程
          </Button>
        </>
      )}
    </>
  );

  // Right-side 2D Sawtooth Chart geometry (x=456..736, y=68..318)
  const chartX = 486;
  const chartW = 230;
  const chartTop = 88;
  const chartBot = 290;
  const chartMaxTotal = Math.max(spec.total, spec.secondRunner?.total ?? 0);
  const chartMaxSteps = Math.max(trails.length, runner2Trails.length, 1);
  const cyFor = (v: number) =>
    chartBot - (v / chartMaxTotal) * (chartBot - chartTop);
  const cxFor = (slot: number) =>
    chartX + (slot / (chartMaxSteps * 2)) * chartW;

  const sawPoints: string[] = [`${cxFor(0)},${cyFor(0)}`];
  shownTrails.forEach((t, idx) => {
    const showPeak = idx < shownTrails.length - 1 || !isUpPhase || isUpPhase;
    if (showPeak) {
      sawPoints.push(`${cxFor(idx * 2 + 1)},${cyFor(t.peak)}`);
    }
    if (idx < shownTrails.length - 1 || (!isUpPhase && t.peak < spec.total)) {
      sawPoints.push(`${cxFor(idx * 2 + 2)},${cyFor(t.end)}`);
    }
  });

  const targetDisplay =
    spec.hideTotal && scene.phase < 3 ? "?" : `${spec.total}${spec.unit}`;

  return (
    <StageFrame
      ariaLabel={`${titleLabel}过程动画舞台`}
      controls={scene.phase > 0 ? controls : undefined}
      statusCaption={statusCaption}
      onReplay={() => {
        if (scene.phase === 1) playDayNight();
        else if (scene.phase === 2) playSprintPrefix();
        else if (scene.phase >= 3) playFullReplay();
      }}
    >
      {/* Top Title */}
      <text
        x="380"
        y="36"
        textAnchor="middle"
        fontSize="16.5"
        fontWeight="800"
        fill="var(--ink-primary)"
      >
        {titleLabel} · 动作推演与高度折线
      </text>

      {/* Left 2D Storybook Scene Panel */}
      <rect
        x="24"
        y="56"
        width="414"
        height="314"
        rx="20"
        fill={skyFill}
        stroke="var(--border-strong)"
      />

      {/* Day / Night indicator pill */}
      {scene.phase >= 1 && (
        <g>
          <rect
            x="38"
            y="68"
            width="106"
            height="24"
            rx="12"
            fill={isUpPhase ? "var(--accent-amber)" : isDownPhase ? "var(--accent-blue)" : "var(--accent-teal)"}
          />
          <text
            x="91"
            y="84"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="800"
            fill="#ffffff"
          >
            {isUpPhase ? "☀️ 白天上爬" : isDownPhase ? "🌙 晚上下滑" : "✓ 到达终点"}
          </text>
        </g>
      )}

      {/* Left Scene Content */}
      {spec.vertical ? (
        (() => {
          const wellX = 82;
          const wellW = 86;
          const topY = 104;
          const botY = 316;
          const yFor = (val: number) =>
            botY - (Math.min(spec.total, Math.max(0, val)) / spec.total) * (botY - topY);
          const sprintY = yFor(Math.max(0, spec.total - spec.up));
          const colStep = Math.min(36, Math.floor(236 / Math.max(1, trails.length)));

          return (
            <g>
              {/* Well / Tree Body */}
              <rect
                x={wellX}
                y={topY}
                width={wellW}
                height={botY - topY}
                rx="10"
                fill="var(--bg-surface)"
                stroke="var(--accent-blue)"
                strokeWidth="3"
              />
              {/* Target rim line */}
              <line
                x1={wellX - 12}
                y1={topY}
                x2={wellX + wellW + 250}
                y2={topY}
                stroke="var(--accent-teal)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              <text
                x={wellX - 16}
                y={topY + 4}
                textAnchor="end"
                fontSize="11"
                fontWeight="800"
                fill="var(--accent-teal)"
              >
                {targetDisplay}
              </text>
              <text
                x={wellX - 16}
                y={botY + 4}
                textAnchor="end"
                fontSize="11"
                fontWeight="700"
                fill="var(--ink-muted)"
              >
                0{spec.unit}
              </text>

              {/* Tick marks */}
              {[0.25, 0.5, 0.75].map((ratio) => {
                const ty = botY - ratio * (botY - topY);
                return (
                  <line
                    key={ratio}
                    x1={wellX}
                    y1={ty}
                    x2={wellX + 10}
                    y2={ty}
                    stroke="var(--ink-muted)"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Last-day sprint zone with leader-line label */}
              {scene.phase >= 2 && (
                <g>
                  <rect
                    x={wellX + 2}
                    y={topY + 2}
                    width={wellW - 4}
                    height={Math.max(8, sprintY - topY - 2)}
                    fill="url(#fig-hatch-coral)"
                  />
                  <line
                    x1={wellX}
                    y1={sprintY}
                    x2={wellX + wellW + 245}
                    y2={sprintY}
                    stroke="var(--accent-coral)"
                    strokeWidth="1.8"
                    strokeDasharray="5 3"
                  />
                  <circle cx={wellX + wellW - 8} cy={(topY + sprintY) / 2} r="3" fill="var(--accent-coral)" />
                  <line
                    x1={wellX + wellW - 8}
                    y1={(topY + sprintY) / 2}
                    x2={wellX + wellW + 24}
                    y2={(topY + sprintY) / 2}
                    stroke="var(--accent-coral)"
                    strokeWidth="1.5"
                  />
                  <rect
                    x={wellX + wellW + 24}
                    y={(topY + sprintY) / 2 - 11}
                    width="112"
                    height="22"
                    rx="11"
                    fill="var(--bg-surface)"
                    stroke="var(--accent-coral)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={wellX + wellW + 80}
                    y={(topY + sprintY) / 2 + 4}
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="800"
                    fill="var(--accent-coral)"
                  >
                    最后1天冲刺（{spec.up}{spec.unit}）
                  </text>
                </g>
              )}

              {/* Animated Climber */}
              <motion.g
                initial={false}
                animate={{ y: yFor(currentPos) + 10 }}
                transition={{ duration: fastMode ? 0.18 : 0.45, ease: "easeInOut" }}
              >
                <text x={wellX + wellW / 2} y="0" textAnchor="middle" fontSize="28">
                  {scene.subject === "毛毛虫" ? "🐛" : "🐌"}
                </text>
              </motion.g>

              {/* Active motion vector arrow & floating +/- pill */}
              {currentTrail && (isUpPhase || isDownPhase) && (
                <g>
                  <line
                    x1={wellX + wellW / 2 + 24}
                    y1={yFor(isUpPhase ? currentTrail.from : currentTrail.peak)}
                    x2={wellX + wellW / 2 + 24}
                    y2={yFor(isUpPhase ? currentTrail.peak : currentTrail.end)}
                    stroke={isUpPhase ? "var(--accent-coral)" : "var(--accent-blue)"}
                    strokeWidth="3"
                    className="fig-flow-dash"
                  />
                  <rect
                    x={wellX + wellW + 8}
                    y={yFor(currentPos) - 12}
                    width="54"
                    height="22"
                    rx="11"
                    fill={isUpPhase ? "var(--accent-coral)" : "var(--accent-blue)"}
                  />
                  <text
                    x={wellX + wellW + 35}
                    y={yFor(currentPos) + 3}
                    textAnchor="middle"
                    fontSize="11.5"
                    fontWeight="800"
                    fill="#ffffff"
                  >
                    {isUpPhase ? `+${spec.up}` : `−${spec.down}`}
                  </text>
                </g>
              )}

              {/* Stage-by-stage vertical trails */}
              {shownTrails.map((t, idx) => {
                const tx = wellX + wellW + 18 + idx * colStep;
                if (tx > 420) return null;
                const yFrom = yFor(t.from);
                const yPeak = yFor(t.peak);
                const yEnd = yFor(t.end);
                const isLatest = idx === shownTrails.length - 1;
                const hideDown = isLatest && isUpPhase;
                const reached = t.peak >= spec.total;
                return (
                  <g key={t.step}>
                    <line
                      x1={tx}
                      y1={yFrom}
                      x2={tx}
                      y2={yPeak}
                      stroke="var(--accent-coral)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className={isLatest && isUpPhase ? "fig-flow-dash" : undefined}
                    />
                    <circle cx={tx} cy={yPeak} r="3.5" fill="var(--accent-coral)" />
                    {!reached && !hideDown && (
                      <g>
                        <line
                          x1={tx + 7}
                          y1={yPeak}
                          x2={tx + 7}
                          y2={yEnd}
                          stroke="var(--accent-blue)"
                          strokeWidth="2.5"
                          className={isLatest && isDownPhase ? "fig-flow-dash" : "fig-flow-dash"}
                        />
                        <circle cx={tx + 7} cy={yEnd} r="3" fill="var(--accent-blue)" />
                      </g>
                    )}
                    <text
                      x={tx + 3}
                      y={botY + 18}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="700"
                      fill={reached ? "var(--accent-coral)" : "var(--ink-secondary)"}
                    >
                      {t.step}天
                    </text>
                  </g>
                );
              })}

              {/* Comparison badge for two runners (q4) */}
              {spec.secondRunner && (
                <g>
                  <rect x="242" y="68" width="182" height="24" rx="12" fill="var(--bg-surface)" stroke="var(--border-subtle)" />
                  <text x="333" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-secondary)">
                    对比：{spec.secondRunner.name}（上{spec.secondRunner.up}滑{spec.secondRunner.down}）
                  </text>
                </g>
              )}
            </g>
          );
        })()
      ) : (
        (() => {
          // Horizontal track mode (爬台阶 / 跳格子 / 舞台)
          const startX = 64;
          const endX = 414;
          const xFor = (v: number) => startX + (Math.min(spec.total, Math.max(0, v)) / spec.total) * (endX - startX);
          const trackY = 296;

          return (
            <g>
              <line x1={startX} y1={trackY} x2={endX} y2={trackY} stroke="var(--ink-secondary)" strokeWidth="4" strokeLinecap="round" />
              <text x={startX} y={trackY + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-muted)">0</text>
              <text x={endX} y={trackY + 18} textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--accent-teal)">{spec.total}{spec.unit}</text>

              {shownTrails.map((t, idx) => {
                const ry = 114 + idx * 28;
                if (ry > 260) return null;
                const x1 = xFor(t.from);
                const xPeak = xFor(t.peak);
                const xEnd = xFor(t.end);
                const isLatest = idx === shownTrails.length - 1;
                const hideDown = isLatest && isUpPhase;
                const reached = t.peak >= spec.total;
                return (
                  <g key={t.step}>
                    <line
                      x1={x1} y1={ry} x2={xPeak} y2={ry}
                      stroke="var(--accent-coral)" strokeWidth="3.5" strokeLinecap="round"
                      className={isLatest && isUpPhase ? "fig-flow-dash" : undefined}
                    />
                    <circle cx={xPeak} cy={ry} r="3.5" fill="var(--accent-coral)" />
                    {!reached && !hideDown && (
                      <g>
                        <line
                          x1={xPeak} y1={ry + 8} x2={xEnd} y2={ry + 8}
                          stroke="var(--accent-blue)" strokeWidth="2.5"
                          className="fig-flow-dash"
                        />
                        <circle cx={xEnd} cy={ry + 8} r="3" fill="var(--accent-blue)" />
                      </g>
                    )}
                    <text x={startX - 8} y={ry + 4} textAnchor="end" fontSize="10.5" fontWeight="700" fill={reached ? "var(--accent-coral)" : "var(--ink-secondary)"}>
                      第{t.step}次
                    </text>
                  </g>
                );
              })}

              {/* Animated horizontal walker */}
              <motion.g
                initial={false}
                animate={{ x: xFor(currentPos) }}
                transition={{ duration: fastMode ? 0.18 : 0.45, ease: "easeInOut" }}
              >
                <text x="0" y={trackY - 12} textAnchor="middle" fontSize="26">🚶</text>
              </motion.g>

              {spec.secondRunner && (
                <g>
                  <rect x="242" y="68" width="182" height="24" rx="12" fill="var(--bg-surface)" stroke="var(--border-subtle)" />
                  <text x="333" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-secondary)">
                    对比：{spec.secondRunner.name}（到第{spec.secondRunner.total}{spec.unit}）
                  </text>
                </g>
              )}
            </g>
          );
        })()
      )}

      {/* Dark Contextual Pill inside Left Scene */}
      <rect x="116" y="340" width="230" height="24" rx="12" fill="#1e1e1e" />
      <text x="231" y="356" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
        {pillText}
      </text>

      {/* Right 2D Synchronized Sawtooth Chart */}
      <rect
        x="456"
        y="56"
        width="280"
        height="314"
        rx="20"
        fill="var(--bg-surface)"
        stroke="var(--border-subtle)"
      />
      <text x="596" y="76" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="var(--ink-primary)">
        高度变化折线图
      </text>
      <line x1={chartX} y1={chartTop} x2={chartX} y2={chartBot} stroke="var(--ink-muted)" strokeWidth="1.5" />
      <line x1={chartX} y1={chartBot} x2={chartX + chartW} y2={chartBot} stroke="var(--ink-muted)" strokeWidth="1.5" />
      <line x1={chartX} y1={chartTop} x2={chartX + chartW} y2={chartTop} stroke="var(--accent-teal)" strokeWidth="1.8" strokeDasharray="5 4" />
      <text x={chartX - 6} y={chartTop + 4} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--accent-teal)">
        {targetDisplay}
      </text>
      <text x={chartX - 6} y={chartBot + 4} textAnchor="end" fontSize="10" fill="var(--ink-muted)">
        0
      </text>

      {sawPoints.length > 1 && (
        <polyline
          points={sawPoints.join(" ")}
          fill="none"
          stroke="var(--accent-coral)"
          strokeWidth="2.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}

      {runner2Trails.length > 0 && scene.phase >= 2 && (
        <polyline
          points={[
            `${cxFor(0)},${cyFor(0)}`,
            ...runner2Trails.flatMap((t, idx) =>
              t.peak >= spec.secondRunner!.total
                ? [`${cxFor(idx * 2 + 1)},${cyFor(t.peak)}`]
                : [`${cxFor(idx * 2 + 1)},${cyFor(t.peak)}`, `${cxFor(idx * 2 + 2)},${cyFor(t.end)}`],
            ),
          ].join(" ")}
          fill="none"
          stroke="var(--accent-blue)"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
      )}

      {/* Right-panel Step Readout (strictly no spoilers) */}
      <rect x="472" y="304" width="248" height="28" rx="8" fill="var(--accent-teal-soft)" stroke="var(--accent-teal)" />
      <text x="596" y="322" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--ink-primary)">
        {scene.middleLabel}：{scene.phase >= 2 ? scene.middleValue : "?"}
      </text>
      <text x="596" y="354" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="var(--accent-coral)">
        结果：{scene.phase >= 3 ? scene.finalValue : "?"}
      </text>
    </StageFrame>
  );
}
