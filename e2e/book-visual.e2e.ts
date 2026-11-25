import { expect, test } from "@playwright/test";

test("立体观察与镜面题在窄屏可切换和揭晓", async ({ page }) => {
  await page.setViewportSize({ width:390,height:844 });
  await page.goto("/#/g2-observe-shapes/example/1");
  const q5=page.getByRole("button",{name:"小例题大发现 · 挑战自我 第 5 题",exact:true});
  await q5.focus(); await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/g2-observe-shapes\/q5\/1$/);
  await expect(page.getByRole("img",{name:"立体图形观察舞台"})).toBeVisible();
  await expect(q5).toBeFocused();
  await page.goto("/#/g2-mirror-clock/q4/4");
  await expect(page.getByRole("heading",{name:"镜面问题"})).toBeVisible();
  await expect(page.getByText(/现实中的钟表显示10时30分/).first()).toBeVisible();
  for(const theme of ["light","dark"] as const) {
    await page.emulateMedia({colorScheme:theme});
    const svg=page.getByRole("img",{name:"镜面观察舞台"});
    const outside=await svg.locator("text").evaluateAll(labels=>labels.filter(label=>{
      const node=label as SVGGraphicsElement; const root=node.ownerSVGElement!;
      const matrix=root.getScreenCTM()!.inverse().multiply(node.getScreenCTM()!);const box=node.getBBox();
      const a=new DOMPoint(box.x,box.y).matrixTransform(matrix);const b=new DOMPoint(box.x+box.width,box.y+box.height).matrixTransform(matrix);
      return Math.min(a.x,b.x)<-0.5 || Math.max(a.x,b.x)>760.5 || Math.min(a.y,b.y)<-0.5 || Math.max(a.y,b.y)>440.5;
    }).map(label=>label.textContent));
    expect(outside).toEqual([]);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
});
