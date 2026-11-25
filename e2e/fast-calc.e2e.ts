import { expect, test } from "@playwright/test";

test("简便计算小问在窄屏和键盘下可切换", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/g2-fast-calc/example/1");
  const target = page.getByRole("button", { name: "小例题大发现 · 挑战自我 第 7 题", exact: true });
  await target.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/g2-fast-calc\/q7\/1$/);
  await expect(page.getByText(/12 \+ 102 \+ 1002 \+ 10002 = ？/)).toBeVisible();
  await expect(target).toBeFocused();
  for (const theme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: theme });
    const svg = page.getByRole("img", { name: "有序枚举与转化卡片舞台" });
    await expect(svg).toBeVisible();
    const outside = await svg.locator("text").evaluateAll((labels) => labels.filter((label) => {
      const node = label as SVGGraphicsElement;
      const root = node.ownerSVGElement!;
      const transform = root.getScreenCTM()!.inverse().multiply(node.getScreenCTM()!);
      const box = node.getBBox();
      const start = new DOMPoint(box.x, box.y).matrixTransform(transform);
      const end = new DOMPoint(box.x + box.width, box.y + box.height).matrixTransform(transform);
      return start.x < -0.5 || start.y < -0.5 || end.x > 760.5 || end.y > 440.5;
    }).map((label) => label.textContent));
    expect(outside).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
