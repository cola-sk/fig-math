import { useEffect, useRef, useState } from "react";
import { Button } from "@ui-sdk/react/button";
import { motion } from "motion/react";
import type { EarlyBookSceneState } from "../../types/lesson";
import { StageFrame } from "../StageFrame";

type BusAnimStage = "idle" | "act1" | "act2" | "done";

function MiniWalker({ x, y, fill, delay = 0, shiftX = 0 }: { x: number; y: number; fill: string; delay?: number; shiftX?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <motion.g
        initial={{ opacity: 0, x: -shiftX }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay }}
      >
        <circle cx="0" cy="-7" r="4.5" fill={fill} stroke="var(--ink-primary)" strokeWidth="1" />
        <path d="M -5.5 5 Q -5.5 -2 0 -2 Q 5.5 -2 5.5 5 Z" fill={fill} stroke="var(--ink-primary)" strokeWidth="1" />
      </motion.g>
    </g>
  );
}

export function BusActionStage({ scene }: { scene: EarlyBookSceneState }) {
  const b = scene.busSpec ?? {
    initial: "原有",
    step1Label: "第一步变化",
    step1Dir: "out" as const,
    step2Label: "第二步变化",
    step2Dir: "in" as const,
  };

  const [animStage, setAnimStage] = useState<BusAnimStage>(
    scene.phase === 0 ? "idle" : scene.phase === 1 ? "act1" : scene.phase === 2 ? "act2" : "done",
  );
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  };

  useEffect(() => {
    clearTimers();
    setAnimStage(
      scene.phase === 0 ? "idle" : scene.phase === 1 ? "act1" : scene.phase === 2 ? "act2" : "done",
    );
    return clearTimers;
  }, [scene.phase, b.initial]);

  const playAction1 = () => {
    clearTimers();
    setAnimStage("idle");
    const id = window.setTimeout(() => setAnimStage("act1"), 40);
    timersRef.current.push(id);
  };

  const playAction2 = () => {
    clearTimers();
    setAnimStage("act1");
    const id = window.setTimeout(() => setAnimStage("act2"), 80);
    timersRef.current.push(id);
  };

  const playBoth = () => {
    clearTimers();
    setAnimStage("act1");
    const id = window.setTimeout(() => setAnimStage("act2"), 650);
    timersRef.current.push(id);
  };

  const playFull = () => {
    clearTimers();
    setAnimStage("act1");
    timersRef.current.push(window.setTimeout(() => setAnimStage("act2"), 600));
    timersRef.current.push(window.setTimeout(() => setAnimStage("done"), 1200));
  };

  const isBus = scene.subject === "公交车";
  const icon = scene.subject === "电脑" ? "💻" : scene.subject === "水果" ? "🍎" : "🩰";
  const showAct1 = animStage === "act1" || animStage === "act2" || animStage === "done";
  const showAct2 = animStage === "act2" || animStage === "done";

  const busPill = (() => {
    if (scene.phase === 0) return b.initial;
    if (scene.phase === 1) {
      return b.initialNum !== undefined && b.step1Delta !== undefined
        ? `${b.initialNum} ${b.step1Delta < 0 ? "−" : "+"} ${Math.abs(b.step1Delta)} = ?`
        : `${b.initial} → 第一步 ?`;
    }
    if (scene.phase === 2) {
      return `中间：${scene.middleValue} · ${b.step2Label}`;
    }
    return `结果：${scene.finalValue}`;
  })();

  const statusCaption = (() => {
    if (scene.phase === 0) {
      return `先看清初始数量（${b.initial}）和接下来发生的两步变化。`;
    }
    if (scene.phase === 1) {
      return `${b.reverse ? "⏪ 倒推第一步：" : "第一步动作："}${b.step1Label}，想一想还剩多少？`;
    }
    if (scene.phase === 2) {
      return `中间数量是 ${scene.middleValue}；接着发生「${b.step2Label}」，现在一共是多少？`;
    }
    return `🎉 两步动作全部完成，最终结果：${scene.finalValue}！`;
  })();

  const controls = (
    <>
      {scene.phase === 1 && (
        <Button
          aria-label="演示乘车第一步变化"
          onClick={playAction1}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-coral)] bg-[var(--accent-coral-soft)] px-2.5 py-1 text-xs font-bold text-[var(--accent-coral)] transition hover:brightness-95"
        >
          ▶ 演示第一步动作
        </Button>
      )}
      {scene.phase === 2 && (
        <>
          <Button
            aria-label="演示乘车第二步变化"
            onClick={playAction2}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-teal)] bg-[var(--accent-teal-soft)] px-2.5 py-1 text-xs font-bold text-[var(--accent-teal)] transition hover:brightness-95"
          >
            ▶ 演示第二步动作
          </Button>
          <Button
            aria-label="连续演示两步数量变化"
            onClick={playBoth}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-stage)] px-2.5 py-1 text-xs font-bold text-[var(--ink-primary)] transition hover:border-[var(--accent-teal)]"
          >
            ⏩ 连演两步
          </Button>
        </>
      )}
      {scene.phase >= 3 && (
        <Button
          aria-label="重播乘车完整过程"
          onClick={playFull}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--accent-teal)] bg-[var(--accent-teal-soft)] px-2.5 py-1 text-xs font-bold text-[var(--accent-teal)] transition hover:brightness-95"
        >
          ▶ 重播完整过程
        </Button>
      )}
    </>
  );

  return (
    <StageFrame
      ariaLabel="乘车与数量变化动作舞台"
      controls={scene.phase > 0 ? controls : undefined}
      statusCaption={statusCaption}
      onReplay={() => {
        if (scene.phase === 1) playAction1();
        else if (scene.phase === 2) playBoth();
        else if (scene.phase >= 3) playFull();
      }}
    >
      <text x="380" y="36" textAnchor="middle" fontSize="16.5" fontWeight="800" fill="var(--ink-primary)">
        {b.reverse ? "倒推还原 · 动作过程动画" : "数量变化 · 动作过程动画"}
      </text>

      {/* Left 2D Storybook Scene */}
      <rect x="24" y="56" width="414" height="314" rx="20" fill="var(--bg-surface)" stroke="var(--border-strong)" />

      {/* Two-stop route bar if applicable */}
      {b.twoStops && (
        <g>
          <line x1="72" y1="84" x2="388" y2="84" stroke="var(--border-strong)" strokeWidth="3" />
          <circle cx="130" cy="84" r="6" fill={scene.phase >= 1 ? "var(--accent-coral)" : "var(--ink-muted)"} />
          <text x="130" y="72" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--ink-secondary)">
            第1站(下{b.twoStops.s1Off}上{b.twoStops.s1On})
          </text>
          <circle cx="330" cy="84" r="6" fill={scene.phase >= 2 ? "var(--accent-teal)" : "var(--ink-muted)"} />
          <text x="330" y="72" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--ink-secondary)">
            第2站(下{b.twoStops.s2Off}上{b.twoStops.s2On})
          </text>
        </g>
      )}

      {/* Bus Stop / Platform ground */}
      <rect x="38" y="274" width="386" height="22" rx="8" fill="var(--bg-surface-muted)" stroke="var(--border-subtle)" />
      {/* Leader-line label */}
      <circle cx="62" cy="285" r="3" fill="var(--ink-secondary)" />
      <line x1="62" y1="285" x2="62" y2="306" stroke="var(--ink-secondary)" strokeWidth="1.2" />
      <rect x="38" y="306" width="54" height="19" rx="9" fill="var(--bg-surface)" stroke="var(--border-strong)" />
      <text x="65" y="319" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink-secondary)">
        {isBus ? "公交站" : scene.subject}
      </text>

      {isBus ? (
        <g>
          {/* Bus body */}
          <rect x="116" y="138" width="230" height="114" rx="22" fill="var(--accent-coral-soft)" stroke="var(--accent-coral)" strokeWidth="3" />
          <rect x="132" y="152" width="198" height="44" rx="8" fill="var(--accent-blue-soft)" stroke="var(--accent-blue)" />
          {/* Sliding Doors */}
          <rect
            x="136" y="204" width={showAct1 ? 14 : 26} height="44" rx="4"
            fill={showAct1 ? "var(--bg-stage)" : "var(--accent-coral)"}
            stroke="var(--ink-secondary)" strokeWidth="1.5"
          />
          <rect
            x={showAct2 ? 312 : 300} y="204" width={showAct2 ? 14 : 26} height="44" rx="4"
            fill={showAct2 ? "var(--bg-stage)" : "var(--accent-teal)"}
            stroke="var(--ink-secondary)" strokeWidth="1.5"
          />
          {/* Wheels */}
          <circle cx="164" cy="258" r="16" fill="var(--ink-secondary)" />
          <circle cx="298" cy="258" r="16" fill="var(--ink-secondary)" />
          <text x="231" y="179" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="var(--ink-primary)">
            {b.initial}
          </text>
        </g>
      ) : (
        <g>
          <rect x="138" y="136" width="186" height="122" rx="20" fill="var(--accent-blue-soft)" stroke="var(--accent-blue)" strokeWidth="2.5" />
          <text x="231" y="202" textAnchor="middle" fontSize="58">{icon}</text>
          <text x="231" y="242" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--ink-primary)">
            {b.initial}
          </text>
        </g>
      )}

      {/* Action 1: Flow arc + animated little walkers moving OUT/IN on left */}
      {showAct1 && (
        <g>
          <path
            d={b.step1Dir === "out" ? "M 134 222 Q 86 218 54 256" : "M 54 256 Q 86 218 134 222"}
            fill="none"
            stroke="var(--accent-coral)"
            strokeWidth="3"
            className="fig-flow-dash"
          />
          {[0, 1, 2, 3].map((i) => (
            <MiniWalker
              key={`w1-${i}-${animStage}`}
              x={44 + i * 18}
              y={266}
              fill="var(--accent-coral)"
              delay={i * 0.08}
              shiftX={b.step1Dir === "out" ? -32 : 32}
            />
          ))}
          <rect x="34" y="138" width="90" height="28" rx="12" fill="var(--accent-coral)" />
          <text x="79" y="156" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#ffffff">
            {b.step1Label}
          </text>
        </g>
      )}

      {/* Action 2: Flow arc + animated little walkers moving IN/OUT on right */}
      {showAct2 && (
        <g>
          <path
            d={b.step2Dir === "in" ? "M 408 256 Q 376 218 326 222" : "M 326 222 Q 376 218 408 256"}
            fill="none"
            stroke="var(--accent-teal)"
            strokeWidth="3"
            className="fig-flow-dash"
          />
          {[0, 1, 2, 3].map((i) => (
            <MiniWalker
              key={`w2-${i}-${animStage}`}
              x={354 + i * 18}
              y={266}
              fill="var(--accent-teal)"
              delay={i * 0.08}
              shiftX={b.step2Dir === "in" ? -32 : 32}
            />
          ))}
          <rect x="338" y="138" width="90" height="28" rx="12" fill="var(--accent-teal)" />
          <text x="383" y="156" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#ffffff">
            {b.step2Label}
          </text>
        </g>
      )}

      {/* Dark Status Pill */}
      <rect x="116" y="336" width="230" height="24" rx="12" fill="#1e1e1e" />
      <text x="231" y="352" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">
        {busPill}
      </text>

      {/* Right 2D State-Flow Schematic */}
      <rect x="456" y="56" width="280" height="314" rx="20" fill="var(--bg-surface)" stroke="var(--border-subtle)" />
      <text x="596" y="80" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="var(--ink-primary)">
        数量变化流程简图
      </text>

      {/* Node 1: Initial */}
      <rect x="486" y="96" width="220" height="42" rx="12" fill="var(--bg-stage)" stroke="var(--border-strong)" strokeWidth="2" />
      <text x="596" y="122" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="var(--ink-primary)">
        初始：{b.initial}
      </text>

      {/* Connector 1 */}
      <line
        x1="596" y1="138" x2="596" y2="178"
        stroke={scene.phase === 1 ? "var(--accent-coral)" : "var(--ink-muted)"}
        strokeWidth="3"
        className={scene.phase === 1 ? "fig-flow-dash" : undefined}
      />
      <rect x="536" y="146" width="120" height="22" rx="11" fill={scene.phase >= 1 ? "var(--accent-coral)" : "var(--bg-surface-muted)"} />
      <text x="596" y="161" textAnchor="middle" fontSize="11" fontWeight="800" fill={scene.phase >= 1 ? "#ffffff" : "var(--ink-secondary)"}>
        {b.step1Label}
      </text>

      {/* Node 2: Middle */}
      <rect
        x="486" y="178" width="220" height="44" rx="12"
        fill={scene.phase >= 2 ? "var(--accent-teal-soft)" : "var(--bg-stage)"}
        stroke={scene.phase >= 2 ? "var(--accent-teal)" : "var(--border-subtle)"}
        strokeWidth="2"
      />
      <text x="596" y="205" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="var(--ink-primary)">
        {scene.middleLabel}：{scene.phase >= 2 ? scene.middleValue : "?"}
      </text>

      {/* Connector 2 */}
      <line
        x1="596" y1="222" x2="596" y2="264"
        stroke={scene.phase === 2 ? "var(--accent-teal)" : "var(--ink-muted)"}
        strokeWidth="3"
        className={scene.phase === 2 ? "fig-flow-dash" : undefined}
      />
      <rect x="536" y="232" width="120" height="22" rx="11" fill={scene.phase >= 2 ? "var(--accent-teal)" : "var(--bg-surface-muted)"} />
      <text x="596" y="247" textAnchor="middle" fontSize="11" fontWeight="800" fill={scene.phase >= 2 ? "#ffffff" : "var(--ink-secondary)"}>
        {b.step2Label}
      </text>

      {/* Node 3: Final */}
      <rect
        x="486" y="264" width="220" height="46" rx="12"
        fill={scene.phase >= 3 ? "var(--accent-coral-soft)" : "var(--bg-stage)"}
        stroke={scene.phase >= 3 ? "var(--accent-coral)" : "var(--border-subtle)"}
        strokeWidth="2"
      />
      <text x="596" y="292" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="var(--accent-coral)">
        结果：{scene.phase >= 3 ? scene.finalValue : "?"}
      </text>

      <text x="596" y="346" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--ink-secondary)">
        {b.reverse ? "倒推口诀：加变减、减变加" : "按动作顺序逐步加减"}
      </text>
    </StageFrame>
  );
}
