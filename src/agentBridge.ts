import { createAgent } from "@ui-sdk/react/agent";

export const agent = createAgent({
  allow: async (step) => !step.confirm,
});

if (import.meta.env.DEV && typeof window !== "undefined") {
  (window as unknown as { __FIGMATH_AGENT__?: typeof agent }).__FIGMATH_AGENT__ = agent;
}
