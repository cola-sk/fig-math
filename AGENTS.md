# FigMath 开发约定

本项目使用 React 19、TypeScript、Vite、Tailwind CSS 4 和 ui-sdk。使用 pnpm 管理依赖。

## 奥数内容与图解规范

- 新增或修改奥数课程数据（`src/data/lessons/*`）、讲解文案、变式/小考题或可视化图解引擎（`src/engines/*`）前，**必须先阅读项目技能** `.agents/skills/olympiad-lesson-authoring/SKILL.md`。
- 坚持适合 6–12 岁小学生的引导式讲解与简洁视觉：**全流程「先问后答」**（开头审题、中间转化节点、出最终结果前都要留出思考步与设问/小考，不提前剧透答案或亮出算式）；优先用 2D 平面绘本场景代入，仅立体几何题使用 3D；严禁在同一 `<motion.g>` 上混用 `transform="translate(...)"` 与 `animate={{ x/y }}`。
- **通用课程设计规则自动沉淀**：在课程编写、图解改造或问题修正中，若形成经过验证、可跨专题复用的**课程设计类通用规则**（如讲解节奏、不剧透边界、1 比 1 图解对齐、2D 过程动画与避坑规范），应谨慎评估后自动同步更新至 `.agents/skills/olympiad-lesson-authoring/SKILL.md`；仅限单题特例、一次性微调或尚未确认的尝试不要写入 skill，保持规范精炼可复用。

## UI SDK

- 修改或新增 ui-sdk 界面、组件、交互或 agent bridge 时，先阅读项目技能 `.agents/skills/ui-sdk/SKILL.md`，再按需阅读其中引用的文档。
- 优先查阅与已安装版本匹配的 `node_modules/@ui-sdk/react/docs/llms.txt` 及相关组件文档；官网入口为 https://ui-sdk.dev/docs 。当前依赖版本见 `package.json`，不要假设官网最新 API 与当前版本一致。
- 优先使用 SDK 提供的组件与行为；从对应子路径导入，如 `@ui-sdk/react/select`、`@ui-sdk/react/button`。遵循文档规定的组件组合、受控状态与事件 API。
- 核心交互按钮（切步骤、授课模式、参数重置、主题切换等）统一使用 `@ui-sdk/react/button`（`Button`），禁止用原生 `<button>` 隐藏关键流程，保证 `agent.snapshot()` 可发现且同屏 `label` 唯一不碰撞。
- SDK 组件默认无视觉样式。沿用项目的 Tailwind 类、`src/index.css` 中的设计变量及 `data-slot`、状态属性；保留全局样式顶部的 `@layer ui-sdk;`。
- 为交互控件提供可访问名称，检查键盘、焦点与状态；根据改动验证响应式布局和明暗主题。不要用自定义 ARIA 控件重复实现 SDK 已有行为。
- 自定义 SDK 组件时再按需查阅安装包的 `docs/core.md` 和 `docs/rendering.md`。涉及 agent bridge 时参考 `src/agentBridge.ts` 和安装包的 `docs/agents.md`，保留现有授权策略。
- 项目技能是从 `@ui-sdk/core` 随包提供的 skill 复制的。升级 SDK 后，核对并同步 `.agents/skills/ui-sdk`，避免技能与依赖版本不一致。

## 验证

- 运行 `pnpm build` 进行 TypeScript 项目构建和 Vite 构建。
- 涉及行为或已有测试时，运行 `pnpm test`，并针对改动检查必要的键盘操作、焦点和可访问名称。

## 分层测试与 AI 验证（优先 jsdom `agent.act()`，按需浏览器）

- **第一层（默认必跑，毫秒级无浏览器）**：`pnpm test`（Vitest + jsdom + `src/test/setup.ts`）。
  - 凡新增或修改业务流程、状态流转、课程/变式/步骤切换、授课模式或参数联动，**优先在 `src/__tests__/agent-flows.test.tsx` 中用 `createAgent()` + `agent.snapshot()` + `agent.act()` 覆盖**，省去拉起真实浏览器的耗时。
  - 每个界面测试需校验 `agent.snapshot()` 中可见控件全部具备非空且唯一的 `label`，并在 `act()` 后独立断言 DOM、URL hash 或 `localStorage` 结果（不能只看 `result.ok`）。
- **第二层（按需运行，真实浏览器 Playwright）**：`pnpm test:e2e`（`e2e/`）。
  - 仅在涉及 **jsdom 无法覆盖的行为** 时新增或重跑 Playwright：top-layer 弹窗定位、真实键盘 Tab / Enter / Escape 焦点流转与焦点返回、响应式布局或明暗主题对比度。
  - 首次运行前使用 `pnpm exec playwright install chromium` 安装浏览器；测试配置会在本地非 CI 环境复用已有 9173 服务，各用例使用隔离浏览器上下文。
  - 在浏览器中通过 `window.__FIGMATH_AGENT__.snapshot()` / `act()` 操作时，不要硬编码跨页面或重载后可能变化的组件 ref，且需独立断言页面或持久化状态。
- **收尾验证**：AI 完成改动前运行 `pnpm build` 与 `pnpm test`（及适用时的 `pnpm test:e2e`）。结果报告需列出通过的检查、未验证项及原因；不能因测试无法运行而声称验证通过。
