import { expect, test } from "@playwright/test";

for (const viewport of [
  { width: 1280, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`reviewed lesson quizzes, formulas, and keyboard at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/#/g2-seesaw/example/2");
    await expect(
      page.getByRole("radiogroup", { name: /^小考一下/ }),
    ).toBeVisible();
    await expect(page.locator(".katex")).toHaveCount(1);
    const quiz = page.getByRole("radiogroup", { name: /^小考一下/ });
    const answer = quiz.getByRole("radio", { name: "6 只", exact: true });
    await answer.focus();
    await page.keyboard.press("Space");
    await expect(page.getByText(/想对了，是 6 只/)).toBeVisible();
    const next = page.getByRole("button", { name: "下一步", exact: true });
    await next.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/example\/3$/);
    await expect(page.getByRole("heading", { level: 2 })).toHaveText(
      "换成同一种小鸭，谁最重？",
    );
    await expect(page.locator(".katex")).toHaveCount(2);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "进入授课模式" }).click();
    await expect(
      page.getByRole("radiogroup", { name: /^小考一下/ }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "进入授课模式" }),
    ).toBeVisible();
  });
}

test("small-screen diagram labels fit in light and dark themes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const theme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme: theme as "light" | "dark" });
    for (const route of [
      "g2-money-pay/example/5",
      "g2-permutation/example/4",
      "g2-count-figures/var-1/4",
      "g2-shape-pattern/var-1/4",
      "g2-matchstick/var-1/4",
      "g2-measure-clever/example/3",
      "g2-measure-clever/var-1/4",
      "sum-diff/example/5",
    ]) {
      await page.goto(`/#/${route}`);
      const stage = page.getByRole("img").first();
      await expect(stage).toBeVisible();
      await expect(page.getByRole("heading", { level: 2 })).toBeVisible();
      const outside = await stage.locator("text").evaluateAll((labels) =>
        labels
          .filter((label) => {
            const node = label as SVGGraphicsElement;
            const svg = node.ownerSVGElement!;
            const transform = svg
              .getScreenCTM()!
              .inverse()
              .multiply(node.getScreenCTM()!);
            const box = node.getBBox();
            const start = new DOMPoint(box.x, box.y).matrixTransform(transform);
            const end = new DOMPoint(
              box.x + box.width,
              box.y + box.height,
            ).matrixTransform(transform);
            return (
              start.x < -0.5 || start.y < -0.5 || end.x > 760.5 || end.y > 440.5
            );
          })
          .map((label) => label.textContent),
      );
      expect(outside, `${theme} ${route}`).toEqual([]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  }
});
