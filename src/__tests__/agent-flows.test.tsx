import { act, render, screen } from "@testing-library/react";
import { createAgent } from "@ui-sdk/react/agent";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../App";
import { StepNarrativeCard } from "../components/StepNarrativeCard";
import { SceneRenderer } from "../engines/SceneRenderer";
import { LESSONS, getLessonsByGrade } from "../data/lessons";

const agent = createAgent();

describe("FigMath agent-ready flows (jsdom)", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState(null, "", "#/tree-planting/example/1");
  });

  it("exposes named ui-sdk controls in snapshot()", () => {
    render(<App />);

    const components = agent
      .snapshot()
      .filter((entry) => !entry.offPage && entry.component !== "more");

    for (const entry of components) {
      expect(
        entry.label,
        `${entry.component} ${entry.ref} has no accessible label`,
      ).toBeTruthy();
    }

    const labels = components.map((entry) => entry.label);
    expect(new Set(labels).size).toBe(labels.length);
    for (const expected of [
      "选择年级",
      "切换本年级专题",
      "切换小例题大发现板块",
      "进入授课模式",
      "下一步",
      "上一步",
    ]) {
      expect(labels, `${expected} is missing from snapshot`).toContain(
        expected,
      );
    }
  });

  it("switches lesson, variant, and steps via agent.act()", async () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "植树问题",
    );

    const resNext = await act(() =>
      agent.act({
        steps: [{ ref: "下一步", action: "press" }],
      }),
    );
    expect(resNext.ok, resNext.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/tree-planting/example/2");
    expect(screen.getByText(/第 2 步 \/ 共/)).toBeTruthy();

    const resPrev = await act(() =>
      agent.act({
        steps: [{ ref: "上一步", action: "press" }],
      }),
    );
    expect(resPrev.ok, resPrev.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/tree-planting/example/1");

    const resVariant = await act(() => agent.act({
      steps: [{ ref: "小例题大发现 · 挑战自我 第 6 题", action: "press" }],
    }));
    expect(resVariant.ok, resVariant.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/tree-planting/q6/1");
    expect(screen.getByText(/在一条45米长的马路/)).toBeTruthy();

    const resLesson = await act(() =>
      agent.act({
        steps: [
          { ref: "切换本年级专题", action: "setValue", args: ["g2-fast-calc"] },
        ],
      }),
    );
    expect(resLesson.ok, resLesson.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/g2-fast-calc/example/1");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "简便计算",
    );
  });

  it("enters teaching mode, steps to formula reveal, and exits via agent.act()", async () => {
    window.history.replaceState(null, "", "#/g2-fast-calc/example/1");
    render(<App />);

    const enter = await act(() =>
      agent.act({
        steps: [{ ref: "进入授课模式", action: "press" }],
      }),
    );
    expect(enter.ok, enter.error?.message).toBe(true);
    expect(screen.getByText("授课模式")).toBeTruthy();

    const reveal = await act(() =>
      agent.act({
        steps: [{ ref: "显示算式", action: "setPressed", args: [true] }],
      }),
    );
    expect(reveal.ok, reveal.error?.message).toBe(true);
    expect(screen.getByText("隐藏算式")).toBeTruthy();

    const next = await act(() =>
      agent.act({
        steps: [{ ref: "下一步", action: "press" }],
      }),
    );
    expect(next.ok, next.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/g2-fast-calc/example/2");

    const exit = await act(() =>
      agent.act({
        steps: [{ ref: "退出授课模式", action: "press" }],
      }),
    );
    expect(exit.ok, exit.error?.message).toBe(true);
    expect(screen.queryByText("退出授课")).toBeNull();
  });

  it("switches grade and persists selection via agent.act()", async () => {
    render(<App />);

    const res = await act(() =>
      agent.act({
        steps: [{ ref: "选择年级", action: "setValue", args: ["3"] }],
      }),
    );
    expect(res.ok, res.error?.message).toBe(true);
    expect(localStorage.getItem("figmath-selected-grade")).toBe("3");
    expect(screen.getByRole("heading", { level: 1 }).textContent).not.toContain(
      "排队问题",
    );
  });

  it("expands parameter collapsible panel and resets via agent.act()", async () => {
    localStorage.setItem("figmath-selected-grade", "3");
    window.history.replaceState(null, "", "#/sum-multiple/example/1");
    render(<App />);

    const openPanel = await act(() =>
      agent.act({
        steps: [
          {
            ref: "换个数字试一试（自己出题玩一玩）",
            action: "setOpen",
            args: [true],
          },
        ],
      }),
    );
    expect(openPanel.ok, openPanel.error?.message).toBe(true);
    expect(screen.getByText("恢复原题")).toBeTruthy();

    const closePanel = await act(() =>
      agent.act({
        steps: [
          {
            ref: "换个数字试一试（自己出题玩一玩）",
            action: "setOpen",
            args: [false],
          },
        ],
      }),
    );
    expect(closePanel.ok, closePanel.error?.message).toBe(true);
    expect(screen.queryByText("恢复原题")).toBeNull();
  });
});

function visibleControls() {
  const controls = agent
    .snapshot()
    .filter((entry) => !entry.offPage && entry.component !== "more");
  const labels = controls.map((entry) => entry.label);
  expect(labels.every((label) => Boolean(label?.trim()))).toBe(true);
  expect(new Set(labels).size).toBe(labels.length);
  return controls;
}

describe("reviewed Grade 2 lesson journeys", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  for (const lesson of getLessonsByGrade("2")) {
    for (const variant of lesson.variants) {
      it(`${lesson.id}/${variant.id} pauses, answers quizzes, and reveals through agent.act()`, async () => {
        window.history.replaceState(null, "", `#/${lesson.id}/${variant.id}/1`);
        const view = render(<App />);
        const built = variant.build(variant.defaultParams);
        expect(view.container.querySelector(".katex")).toBeNull();
        expect(
          screen.getByRole("heading", { level: 2, name: built.steps[0].title }),
        ).toBeTruthy();
        for (let index = 0; index < built.steps.length; index++) {
          const step = built.steps[index];
          const controls = visibleControls();
          expect(window.location.hash).toBe(
            `#/${lesson.id}/${variant.id}/${index + 1}`,
          );
          expect(
            screen.getByRole("heading", { level: 2, name: step.title }),
          ).toBeTruthy();
          if (step.checkpoint) {
            const checkpoint = step.checkpoint;
            const group = controls.find((entry) => entry.component === "radio");
            expect(group).toBeDefined();
            const item = group?.items?.find(
              (option) =>
                option.label === checkpoint.options[checkpoint.correctIndex],
            );
            expect(item).toBeDefined();
            const result = await act(() =>
              agent.act({
                steps: [
                  { ref: group!.ref, action: "setValue", args: [item!.value] },
                ],
              }),
            );
            expect(result.ok, result.error?.message).toBe(true);
            expect(screen.getByText(checkpoint.feedbackCorrect)).toBeTruthy();
          }
          if (index < built.steps.length - 1) {
            const next = visibleControls().find(
              (entry) => entry.label === "下一步",
            );
            const result = await act(() =>
              agent.act({ steps: [{ ref: next!.ref, action: "press" }] }),
            );
            expect(result.ok, result.error?.message).toBe(true);
          }
        }
        expect(view.container.querySelectorAll(".katex").length).toBe(
          built.formulas.length,
        );
      });
    }
  }

  it("keeps quizzes available in teaching mode and future formulas hidden", async () => {
    window.history.replaceState(null, "", "#/g2-venn-overlap/example/3");
    const view = render(<App />);
    const enter = visibleControls().find(
      (entry) => entry.label === "进入授课模式",
    );
    await act(() =>
      agent.act({ steps: [{ ref: enter!.ref, action: "press" }] }),
    );
    expect(screen.getByText("授课模式")).toBeTruthy();
    expect(screen.getByRole("radiogroup")).toBeTruthy();
    await act(() =>
      agent.act({
        steps: [{ ref: "显示算式", action: "setPressed", args: [true] }],
      }),
    );
    expect(view.container.querySelectorAll(".katex")).toHaveLength(1);
    expect(view.container.querySelector(".katex")?.textContent).not.toContain(
      "40",
    );
    const next = visibleControls().find((entry) => entry.label === "下一步");
    await act(() =>
      agent.act({ steps: [{ ref: next!.ref, action: "press" }] }),
    );
    expect(window.location.hash).toBe("#/g2-venn-overlap/example/4");
    expect(view.container.querySelectorAll(".katex")).toHaveLength(2);
  });
});

describe("diagram quantities and reveal boundaries", () => {
  it("draws equal quantities at the same width before and after removing the difference", () => {
    const lesson = getLessonsByGrade("2").find(
      (item) => item.id === "sum-diff",
    )!;
    for (const params of [
      { small: 8, diff: 24 },
      { small: 40, diff: 4 },
    ]) {
      const built = lesson.variants[0].build(params);
      for (const index of [0, 2, 4]) {
        const view = render(
          <SceneRenderer scene={built.steps[index].sceneState} />,
        );
        visibleControls();
        const parts = view.container.querySelectorAll('rect[rx="8"]');
        const first = Number(parts[0].getAttribute("width"));
        const last = Number(parts[parts.length - 1].getAttribute("width"));
        expect(first).toBeCloseTo(last, 6);
        view.unmount();
      }
    }
  });

  it("keeps the reverse polygon answer hidden until the answer step", () => {
    const lesson = getLessonsByGrade("2").find((item) => item.id === "g2-venn-overlap")!;
    const variant = lesson.variants.find((item) => item.id === "d2-challenge-6")!;
    const built = variant.build(variant.defaultParams);
    const before = built.steps[0].sceneState;
    const after = built.steps.at(-1)!.sceneState;
    expect(before.kind).toBe("overlap-story");
    expect(after.kind).toBe("overlap-story");
    if (before.kind !== "overlap-story" || after.kind !== "overlap-story") throw new Error("Missing overlap scene");
    expect(before.perSide).toBe(0);
    expect(after.perSide).toBe(5);
    const view = render(<SceneRenderer scene={before} />);
    visibleControls();
    expect(view.container.querySelectorAll("circle")).toHaveLength(0);
    view.rerender(<SceneRenderer scene={after} />);
    expect(view.container.querySelectorAll("circle")).toHaveLength(12);
    view.unmount();
  });

  it("switches 小例题大发现 sections and 我要练一练 questions in g2-venn-overlap", async () => {
    window.history.replaceState(null, "", "#/g2-venn-overlap/example/1");
    render(<App />);

    const components = visibleControls();
    for (const entry of components) {
      expect(entry.label).toBeTruthy();
    }
    const labels = components.map((entry) => entry.label);
    expect(new Set(labels).size).toBe(labels.length);

    const sectionControl = components.find(
      (entry) => entry.label === "切换小例题大发现板块",
    );
    expect(sectionControl).toBeDefined();

    const resWarmup = await act(() =>
      agent.act({
        steps: [
          {
            ref: "小例题大发现 1 · 小试牛刀 第 1 题",
            action: "press",
          },
        ],
      }),
    );
    expect(resWarmup.ok, resWarmup.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/g2-venn-overlap/d1-warmup-1/1");
    expect(screen.getByText(/学校举办知识竞赛/)).toBeTruthy();

    const resSection2 = await act(() =>
      agent.act({
        steps: [
          {
            ref: sectionControl!.ref,
            action: "setValue",
            args: ["discovery-2"],
          },
        ],
      }),
    );
    expect(resSection2.ok, resSection2.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/g2-venn-overlap/d2-example/1");

    const resChallenge = await act(() =>
      agent.act({
        steps: [
          {
            ref: "小例题大发现 2 · 挑战自我 第 6 题",
            action: "press",
          },
        ],
      }),
    );
    expect(resChallenge.ok, resChallenge.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/g2-venn-overlap/d2-challenge-6/1");
    expect(screen.getByText(/同学们准备在校园里种12棵树/)).toBeTruthy();

    // Switch back to discovery-1 and step to the last step of example
    // Should disable "下一步" (show "已是最后一步") and offer "下一题：我要练一练 1 · 第 1 题"
    await act(() =>
      agent.act({
        steps: [
          {
            ref: sectionControl!.ref,
            action: "setValue",
            args: ["discovery-1"],
          },
        ],
      }),
    );
    await act(() =>
      agent.act({
        steps: [
          { ref: "下一步", action: "press" },
          { ref: "下一步", action: "press" },
          { ref: "下一步", action: "press" },
        ],
      }),
    );
    expect(window.location.hash).toBe("#/g2-venn-overlap/example/4");
    const lastStepControls = visibleControls().map((c) => c.label);
    expect(lastStepControls).toContain("已是最后一步");
    expect(lastStepControls).toContain("下一题：我要练一练 1 · 第 1 题");

    const resNextVariant = await act(() =>
      agent.act({
        steps: [{ ref: "下一题：我要练一练 1 · 第 1 题", action: "press" }],
      }),
    );
    expect(resNextVariant.ok, resNextVariant.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/g2-venn-overlap/d1-warmup-1/1");
  });
});

it("clears a quiz answer when new parameters rebuild the same step", async () => {
  const variant = LESSONS.find(
    (lesson) => lesson.id === "g2-money-pay",
  )!.variants[1];
  const original = variant.build({ price: 27 }).steps[2];
  const changed = variant.build({ price: 28 }).steps[2];
  const props = {
    totalSteps: 4,
    isYoungLearner: true,
    isLastStep: false,
    onPrev: () => {},
    onNext: () => {},
  };
  const view = render(<StepNarrativeCard {...props} step={original} />);
  const quiz = visibleControls().find((entry) => entry.component === "radio")!;
  const correct = quiz.items!.find(
    (item) =>
      item.label ===
      original.checkpoint!.options[original.checkpoint!.correctIndex],
  )!;
  await act(() =>
    agent.act({
      steps: [{ ref: quiz.ref, action: "setValue", args: [correct.value] }],
    }),
  );
  expect(screen.getByText(original.checkpoint!.feedbackCorrect)).toBeTruthy();
  view.rerender(<StepNarrativeCard {...props} step={changed} />);
  visibleControls();
  expect(screen.queryByText(original.checkpoint!.feedbackCorrect)).toBeNull();
  expect(
    view.container.querySelector('[role="radio"][aria-checked="true"]'),
  ).toBeNull();
});

it("selects distinct book subquestions in 简便计算 via agent.act()", async () => {
  window.history.replaceState(null, "", "#/g2-fast-calc/example/1");
  render(<App />);
  const snapshot = agent.snapshot().filter((entry) => !entry.offPage && entry.component !== "more");
  const labels = snapshot.map((entry) => entry.label);
  expect(labels.every(Boolean)).toBe(true);
  expect(new Set(labels).size).toBe(labels.length);
  const example = await act(() => agent.act({steps:[{ref:"小例题大发现 · 例题（2）",action:"press"}]}));
  expect(example.ok, example.error?.message).toBe(true);
  expect(window.location.hash).toBe("#/g2-fast-calc/var-1/1");
  expect(screen.getByText(/166 − 103 = ？/)).toBeTruthy();
  const exercise = await act(() => agent.act({steps:[{ref:"小例题大发现 · 小试牛刀 第 2 题（3）",action:"press"}]}));
  expect(exercise.ok, exercise.error?.message).toBe(true);
  expect(window.location.hash).toBe("#/g2-fast-calc/q2-3/1");
  expect(screen.getByText(/199 − 101 = ？/)).toBeTruthy();
});

it("通过 agent 切换立体观察小问和镜面题", async () => {
  window.history.replaceState(null, "", "#/g2-observe-shapes/example/1");
  render(<App />);
  const entries=visibleControls();
  expect(entries.every(entry=>!!entry.label)).toBe(true);
  expect(new Set(entries.map(entry=>entry.label)).size).toBe(entries.length);
  const result=await act(()=>agent.act({steps:[{ref:"小例题大发现 · 大显身手 第 4 题（3）",action:"press"}]}));
  expect(result.ok,result.error?.message).toBe(true);
  expect(window.location.hash).toBe("#/g2-observe-shapes/q4-3/1");
  expect(screen.getByText(/从上面看到的图形是/)).toBeTruthy();
});

it("通过 agent 切换和差问题的例题组并打开年龄练习", async () => {
  window.history.replaceState(null, "", "#/sum-diff/example/1");
  render(<App />);
  const entries=visibleControls();
  expect(entries.every(entry=>!!entry.label)).toBe(true);
  expect(new Set(entries.map(entry=>entry.label)).size).toBe(entries.length);
  const group=entries.find(entry=>entry.label==="切换小例题大发现板块")!;
  const switched=await act(()=>agent.act({steps:[{ref:group.ref,action:"setValue",args:["discovery-2"]}]}));
  expect(switched.ok,switched.error?.message).toBe(true);
  expect(window.location.hash).toBe("#/sum-diff/d2-example/1");
  expect(screen.getByText(/小雅3岁的时候哥哥7岁/)).toBeTruthy();
  const exercise=await act(()=>agent.act({steps:[{ref:"小例题大发现 2 · 大显身手 第 3 题",action:"press"}]}));
  expect(exercise.ok,exercise.error?.message).toBe(true);
  expect(window.location.hash).toBe("#/sum-diff/d2-q3/1");
  expect(screen.getAllByText(/今年壮壮8岁/).length).toBeGreaterThan(0);
});

it("驱动爬井、乘车与排队 2D 过程动画且不剧透答案", async () => {
  window.history.replaceState(null, "", "#/g2-well-climb/example/2");
  render(<App />);
  let entries = visibleControls();
  expect(entries.every((e) => !!e.label)).toBe(true);
  expect(new Set(entries.map((e) => e.label)).size).toBe(entries.length);

  expect(screen.getByText(/白天\/前进动作|夜晚\/回退动作/)).toBeTruthy();
  const up = await act(() => agent.act({ steps: [{ ref: "演示白天上爬动作", action: "press" }] }));
  expect(up.ok, up.error?.message).toBe(true);
  expect(screen.getByText(/白天\/前进动作/)).toBeTruthy();

  const down = await act(() => agent.act({ steps: [{ ref: "演示晚上下滑动作", action: "press" }] }));
  expect(down.ok, down.error?.message).toBe(true);
  expect(screen.getByText(/夜晚\/回退动作/)).toBeTruthy();

  const combo = await act(() => agent.act({ steps: [{ ref: "连续演示一昼夜上爬和下滑", action: "press" }] }));
  expect(combo.ok, combo.error?.message).toBe(true);

  window.history.replaceState(null, "", "#/g2-well-climb/example/6");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  const replay = await act(() => agent.act({ steps: [{ ref: "重播爬井完整过程", action: "press" }] }));
  expect(replay.ok, replay.error?.message).toBe(true);

  await act(async () => {
    window.history.replaceState(null, "", "#/g2-well-climb/example/3");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  entries = visibleControls();
  expect(entries.every((e) => !!e.label)).toBe(true);
  expect(new Set(entries.map((e) => e.label)).size).toBe(entries.length);
  const round2Btn = await act(() => agent.act({ steps: [{ ref: "连续演示一昼夜上爬和下滑", action: "press" }] }));
  expect(round2Btn.ok, round2Btn.error?.message).toBe(true);

  await act(async () => {
    window.history.replaceState(null, "", "#/g2-well-climb/q6/3");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  entries = visibleControls();
  expect(entries.every((e) => !!e.label)).toBe(true);
  expect(new Set(entries.map((e) => e.label)).size).toBe(entries.length);
  expect(screen.getAllByText(/第 2 次跳/).length).toBeGreaterThan(0);

  window.history.replaceState(null, "", "#/g2-bus-ride/example/2");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  entries = visibleControls();
  expect(entries.every((e) => !!e.label)).toBe(true);
  expect(new Set(entries.map((e) => e.label)).size).toBe(entries.length);
  const busStep1 = await act(() => agent.act({ steps: [{ ref: "演示乘车第一步变化", action: "press" }] }));
  expect(busStep1.ok, busStep1.error?.message).toBe(true);
  expect(screen.getByText(/第一步动作：/)).toBeTruthy();

  window.history.replaceState(null, "", "#/g2-queue-overlap/example/2");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  entries = visibleControls();
  expect(entries.every((e) => !!e.label)).toBe(true);
  expect(new Set(entries.map((e) => e.label)).size).toBe(entries.length);
  const queueDemo = await act(() => agent.act({ steps: [{ ref: "演示排队逐段点数", action: "press" }] }));
  expect(queueDemo.ok, queueDemo.error?.message).toBe(true);
  expect(screen.getByText(/逐个点数对齐/)).toBeTruthy();

  window.history.replaceState(null, "", "#/g2-intervals/example/2");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  entries = visibleControls();
  expect(entries.every((e) => !!e.label)).toBe(true);
  expect(new Set(entries.map((e) => e.label)).size).toBe(entries.length);
  const stairsDemo = await act(() => agent.act({ steps: [{ ref: "演示爬楼梯间隔动画", action: "press" }] }));
  expect(stairsDemo.ok, stairsDemo.error?.message).toBe(true);
  expect(screen.getByText(/每向上爬 1 层/)).toBeTruthy();

  window.history.replaceState(null, "", "#/tree-planting/example/2");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  entries = visibleControls();
  expect(entries.every((e) => !!e.label)).toBe(true);
  expect(new Set(entries.map((e) => e.label)).size).toBe(entries.length);
  const treesDemo = await act(() => agent.act({ steps: [{ ref: "演示植树点与间隔动画", action: "press" }] }));
  expect(treesDemo.ok, treesDemo.error?.message).toBe(true);
  expect(screen.getByText(/红虚线表示的「间隔」/)).toBeTruthy();

  await act(async () => {
    window.history.replaceState(null, "", "#/tree-planting/q2/4");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(screen.getByText(/彩带挂气球/)).toBeTruthy();
  expect(screen.getByText(/总长 20 米/)).toBeTruthy();

  await act(async () => {
    window.history.replaceState(null, "", "#/tree-planting/q4/1");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(screen.getByText(/操场一侧放花/)).toBeTruthy();
  expect(screen.getByText(/总长 \? 米/)).toBeTruthy();

  await act(async () => {
    window.history.replaceState(null, "", "#/tree-planting/q5/4");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(screen.getByText(/公路一侧插彩旗/)).toBeTruthy();
  expect(screen.getByText(/总长 48 米/)).toBeTruthy();

  await act(async () => {
    window.history.replaceState(null, "", "#/g2-queue-overlap/q8/1");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(screen.getByText(/前 3 人/)).toBeTruthy();
  expect(screen.getByText(/后 3 人/)).toBeTruthy();
  expect(screen.getByText(/左 3 人/)).toBeTruthy();
  expect(screen.getByText(/右 3 人/)).toBeTruthy();

  await act(async () => {
    window.history.replaceState(null, "", "#/g2-queue-overlap/q8/2");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  entries = visibleControls();
  expect(entries.every((e) => !!e.label)).toBe(true);
  expect(new Set(entries.map((e) => e.label)).size).toBe(entries.length);
  const gridAxis1 = await act(() => agent.act({ steps: [{ ref: "演示排队逐段点数", action: "press" }] }));
  expect(gridAxis1.ok, gridAxis1.error?.message).toBe(true);

  await act(async () => {
    window.history.replaceState(null, "", "#/g2-queue-overlap/q8/3");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  entries = visibleControls();
  expect(entries.every((e) => !!e.label)).toBe(true);
  expect(new Set(entries.map((e) => e.label)).size).toBe(entries.length);
  const gridAxis2 = await act(() => agent.act({ steps: [{ ref: "演示排队第二维点数", action: "press" }] }));
  expect(gridAxis2.ok, gridAxis2.error?.message).toBe(true);

  await act(async () => {
    window.history.replaceState(null, "", "#/g2-queue-overlap/q8/4");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  entries = visibleControls();
  expect(entries.every((e) => !!e.label)).toBe(true);
  expect(new Set(entries.map((e) => e.label)).size).toBe(entries.length);
  const gridFull = await act(() => agent.act({ steps: [{ ref: "演示十字补全方阵动画", action: "press" }] }));
  expect(gridFull.ok, gridFull.error?.message).toBe(true);

  const nextBtn = screen.getByRole("button", { name: "下一步" });
  const stepHeading = screen.getByRole("heading", { level: 2 });
  expect(
    Boolean(nextBtn.compareDocumentPosition(stepHeading) & Node.DOCUMENT_POSITION_FOLLOWING),
  ).toBe(true);
});
