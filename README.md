# 图数实验室 · FigMath

用分步交互图解帮助孩子理解小学数学思维题，并通过变式练习举一反三。

## 功能

- 按教材、年级和难度浏览专题，切换例题与变式。
- 逐步展示题意、图形、讲解、算式和数量关系；部分步骤提供随堂问答。
- 调整题目参数，观察图解和计算过程的变化，也可恢复默认参数。
- 使用授课模式展示课程，支持中文语音讲解和明暗主题切换。
- 在浏览器中记录最近学习的专题、已完成的变式及年级、教材和主题偏好；到达变式的最后一步即记为完成。
- 使用 URL hash 表示当前专题、变式和步骤，便于定位课程。

当前课程以《数学思维训练》（斗半匠）二年级内容为主，并有三、四年级拓展专题。其他教材目录及部分年级内容仍为预留或规划，具体以应用内显示为准。

## 快速开始

需要 Node.js 和 pnpm。项目使用 React 19、TypeScript、Vite、Tailwind CSS 4 和 ui-sdk。

```bash
pnpm install
pnpm dev
```

打开终端输出的本地地址。其他常用命令：

```bash
pnpm build       # TypeScript 检查并构建到 dist/
pnpm preview     # 预览构建结果
pnpm test        # 运行 Vitest + jsdom 测试
pnpm test:e2e    # 运行 Playwright 浏览器测试
```

首次运行浏览器测试前，安装 Chromium：

```bash
pnpm exec playwright install chromium
```

Playwright 默认在 `127.0.0.1:4173` 启动开发服务器；本地非 CI 环境会复用该地址已有的服务。

## 项目结构

```text
src/
  data/lessons/   课程目录、专题和变式数据
  types/lesson.ts 课程、步骤、参数及场景类型
  engines/        按场景类型渲染交互图解
  components/     课程界面、步骤和授课组件
  utils/          学习进度、主题和语音工具
  agentBridge.ts  ui-sdk agent 接入
  __tests__/      课程和 agent 流程测试
e2e/              Playwright 测试
```

新增课程时，可参考 `src/data/lessons/` 中已有专题，定义变式的参数、算式、步骤与场景状态，并在课程目录中注册。场景由 `SceneRenderer` 根据类型分发给相应引擎。

## 开发与验证

开发约定见 [AGENTS.md](AGENTS.md)。修改界面或交互时，请先阅读项目内的 ui-sdk 技能及已安装版本的组件文档。业务流程和状态变化优先使用 `src/__tests__/agent-flows.test.tsx` 中的 agent 测试；真实焦点、响应式和主题等需要浏览器验证的行为使用 Playwright。

开发模式下可通过 `window.__FIGMATH_AGENT__` 访问 ui-sdk agent。学习进度和偏好保存在当前浏览器的 `localStorage` 中，不会自动跨设备同步；语音功能依赖浏览器提供的语音合成能力。
