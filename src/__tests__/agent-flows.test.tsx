import { act, render, screen } from "@testing-library/react";
import { createAgent } from "@ui-sdk/react/agent";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../App";

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
    for (const expected of [
      "选择年级",
      "切换本年级专题",
      "切换例题与举一反三变式",
      "进入授课模式",
      "下一步",
      "上一步",
    ]) {
      expect(labels, `${expected} is missing from snapshot`).toContain(expected);
    }
  });

  it("switches lesson, variant, and steps via agent.act()", async () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("排队问题");

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
      .find((entry) => !entry.offPage && entry.label === "切换例题与举一反三变式");
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
