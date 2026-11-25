import { expect, test } from "@playwright/test";

test("和差书题在窄屏可用键盘切换并显示年龄思考步", async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto("/#/sum-diff/d2-example/1");
  const question=page.getByRole("button",{name:"小例题大发现 2 · 大显身手 第 3 题",exact:true});
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/sum-diff\/d2-q3\/1$/);
  await expect(page.getByText(/今年壮壮8岁，豆豆14岁，多少年后/)).toBeVisible();
  await expect(question).toBeFocused();
  await page.goto("/#/sum-diff/d2-q3/3");
  await expect(page.getByRole("heading",{name:"每过一年，两人的年龄和会增加几岁？"})).toBeVisible();
  for(const theme of ["light","dark"] as const) {
    await page.emulateMedia({colorScheme:theme});
    const svg=page.getByRole("img",{name:"有序枚举与转化卡片舞台"});
    await expect(svg).toBeVisible();
    const out=await svg.locator("text").evaluateAll(labels=>labels.filter(label=>{
      const node=label as SVGGraphicsElement,root=node.ownerSVGElement!;
      const transform=root.getScreenCTM()!.inverse().multiply(node.getScreenCTM()!),box=node.getBBox();
      const a=new DOMPoint(box.x,box.y).matrixTransform(transform),b=new DOMPoint(box.x+box.width,box.y+box.height).matrixTransform(transform);
      return Math.min(a.x,b.x)<-.5 || Math.max(a.x,b.x)>760.5 || Math.min(a.y,b.y)<-.5 || Math.max(a.y,b.y)>440.5;
    }).map(label=>label.textContent));
    expect(out).toEqual([]);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
});
