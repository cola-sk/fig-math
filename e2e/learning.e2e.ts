import { expect, test } from "@playwright/test";
import type { agent } from "../src/agentBridge";

declare global {
  interface Window {
    __FIGMATH_AGENT__: typeof agent;
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto("/#/g2-queue-overlap/example/1");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("排队问题");
});

test("agent 选择变式并更新题目", async ({ page }) => {
  const snapshot = await page.evaluate(() => window.__FIGMATH_AGENT__.snapshot());
  const selector = snapshot.find((entry) => entry.label === "切换例题与举一反三变式");
  expect(selector?.actions).toContain("setValue");
  const variant = selector?.items?.find((item) => item.label.includes("中间有几人"));
  expect(variant).toBeDefined();

  const result = await page.evaluate(
    ({ ref, value }) => window.__FIGMATH_AGENT__.act({ steps: [{ ref, action: "setValue", args: [value] }] }),
    { ref: selector!.ref, value: variant!.value },
  );
  expect(result.ok, result.error?.message).toBe(true);
  await expect(page).toHaveURL(/#\/g2-queue-overlap\/var-1\/1$/);
  await expect(page.getByText(/小红排第 3 个，小刚排第 8 个/)).toBeVisible();
});

test("agent 切换年级并保持选择", async ({ page }) => {
  const snapshot = await page.evaluate(() => window.__FIGMATH_AGENT__.snapshot());
  const selector = snapshot.find((entry) => entry.component === "select" && entry.label === "选择年级");
  const grade = selector?.items?.find((item) => item.label === "三年级");
  expect(selector?.actions).toContain("setValue");
  expect(grade).toBeDefined();

  const result = await page.evaluate(
    ({ ref, value }) => window.__FIGMATH_AGENT__.act({ steps: [{ ref, action: "setValue", args: [value] }] }),
    { ref: selector!.ref, value: grade!.value },
  );
  expect(result.ok, result.error?.message).toBe(true);
  await expect.poll(() => page.evaluate(() => localStorage.getItem("figmath-selected-grade"))).toBe("3");
  await expect(page.getByRole("heading", { level: 1 })).not.toContainText("排队问题");
  await page.reload();
  await expect(page.getByText("三年级", { exact: true }).first()).toBeVisible();
});

test("真实键盘推进步骤，鼠标返回", async ({ page }) => {
  const next = page.getByRole("button", { name: "下一步", exact: true }).last();
  await next.focus();
  await expect(next).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/2$/);
  await expect(page.getByText(/第 2 步 \/ 共/)).toBeVisible();
  await page.getByRole("button", { name: "上一步", exact: true }).last().click();
  await expect(page).toHaveURL(/\/1$/);
  await expect(page.getByText(/第 1 步 \/ 共/)).toBeVisible();
});

test("真实键鼠打开搜索并用 Escape 关闭", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "搜索课程专题" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "搜索奥数课程" });
  await expect(dialog).toBeVisible();
  const input = dialog.getByRole("combobox", { name: "搜索课程专题" });
  await input.fill("鸡兔");
  await expect(dialog.getByRole("option").filter({ hasText: "鸡兔" }).first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(input).toHaveValue("");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});
