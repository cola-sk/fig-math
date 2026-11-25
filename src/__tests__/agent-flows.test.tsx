import { act, render, screen } from "@testing-library/react";
import { createAgent } from "@ui-sdk/react/agent";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../App";
import { StepNarrativeCard } from "../components/StepNarrativeCard";
import { SceneRenderer } from "../engines/SceneRenderer";
import { getLessonsByGrade } from "../data/lessons";

const agent = createAgent();

describe("FigMath agent-ready flows (jsdom)", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState(null, "", "#/g2-queue-overlap/example/1");
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
      "切换例题与举一反三变式",
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
      "排队问题",
    );

    const resNext = await act(() =>
      agent.act({
        steps: [{ ref: "下一步", action: "press" }],
      }),
    );
    expect(resNext.ok, resNext.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/g2-queue-overlap/example/2");
    expect(screen.getByText(/第 2 步 \/ 共/)).toBeTruthy();

    const resPrev = await act(() =>
      agent.act({
        steps: [{ ref: "上一步", action: "press" }],
      }),
    );
    expect(resPrev.ok, resPrev.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/g2-queue-overlap/example/1");

    const variantSelector = agent
      .snapshot()
      .find(
        (entry) => !entry.offPage && entry.label === "切换例题与举一反三变式",
      );
    const targetVariant = variantSelector?.items?.find((item) =>
      item.label.includes("中间有几人"),
    );
    expect(targetVariant).toBeDefined();

    const resVariant = await act(() =>
      agent.act({
        steps: [
          {
            ref: variantSelector!.ref,
            action: "setValue",
            args: [targetVariant!.value],
          },
        ],
      }),
    );
    expect(resVariant.ok, resVariant.error?.message).toBe(true);
    expect(window.location.hash).toBe(
      `#/g2-queue-overlap/${targetVariant!.value}/1`,
    );
    expect(screen.getByText(/小红排第 3 个，小刚排第 8 个/)).toBeTruthy();

    const resLesson = await act(() =>
      agent.act({
        steps: [
          { ref: "切换本年级专题", action: "setValue", args: ["g2-seesaw"] },
        ],
      }),
    );
    expect(resLesson.ok, resLesson.error?.message).toBe(true);
    expect(window.location.hash).toBe("#/g2-seesaw/example/1");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "跷跷板的奥秘",
    );
  });

  it("enters teaching mode, steps to formula reveal, and exits via agent.act()", async () => {
    window.history.replaceState(null, "", "#/g2-matchstick/example/1");
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
    expect(window.location.hash).toBe("#/g2-matchstick/example/2");

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
    window.history.replaceState(null, "", "#/g2-seesaw/example/2");
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
      "6",
    );
    const next = visibleControls().find((entry) => entry.label === "下一步");
    await act(() =>
      agent.act({ steps: [{ ref: next!.ref, action: "press" }] }),
    );
    expect(window.location.hash).toBe("#/g2-seesaw/example/3");
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
  const variant = getLessonsByGrade("2").find(
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
