import type { EarlyBookSceneState } from "../types/lesson";
import { BusActionStage } from "./early-book/BusActionStage";
import { IntervalActionStage } from "./early-book/IntervalActionStage";
import { QueueActionStage } from "./early-book/QueueActionStage";
import { WellActionStage } from "./early-book/WellActionStage";

export function EarlyBookEngine({ scene }: { scene: EarlyBookSceneState }) {
  switch (scene.mode) {
    case "well":
      return <WellActionStage scene={scene} />;
    case "bus":
      return <BusActionStage scene={scene} />;
    case "queue":
      return <QueueActionStage scene={scene} />;
    case "stairs":
    case "trees":
      return <IntervalActionStage scene={scene} />;
  }
}
