import type { SceneState } from "../types/lesson";
import { ArraySwapEngine } from "./ArraySwapEngine";
import { BalancePuzzleEngine } from "./BalancePuzzleEngine";
import { ComboVisualEngine } from "./ComboVisualEngine";
import { CountDiagramEngine } from "./CountDiagramEngine";
import { GeometryGridEngine } from "./GeometryGridEngine";
import { MirrorClockEngine } from "./MirrorClockEngine";
import { NumberLineEngine } from "./NumberLineEngine";
import { SegmentBarEngine } from "./SegmentBarEngine";
import { VennSetEngine } from "./VennSetEngine";
import { WellClimbEngine } from "./WellClimbEngine";
import { EarlyBookEngine } from "./EarlyBookEngine";
import { BookVisualEngine } from "./BookVisualEngine";
import { OverlapStoryEngine } from "./OverlapStoryEngine";

export function SceneRenderer({ scene }: { scene: SceneState }) {
  switch (scene.kind) {
    case "early-book":
      return <EarlyBookEngine scene={scene} />;
    case "book-visual":
      return <BookVisualEngine scene={scene} />;
    case "overlap-story":
      return <OverlapStoryEngine scene={scene} />;
    case "array-swap":
      return <ArraySwapEngine scene={scene} />;
    case "segment-bar":
      return <SegmentBarEngine scene={scene} />;
    case "number-line":
      return <NumberLineEngine scene={scene} />;
    case "geometry-grid":
      return <GeometryGridEngine scene={scene} />;
    case "well-climb":
      return <WellClimbEngine scene={scene} />;
    case "venn-set":
      return <VennSetEngine scene={scene} />;
    case "count-diagram":
      return <CountDiagramEngine scene={scene} />;
    case "mirror-clock":
      return <MirrorClockEngine scene={scene} />;
    case "combo-visual":
      return <ComboVisualEngine scene={scene} />;
    case "balance-puzzle":
      return <BalancePuzzleEngine scene={scene} />;
  }
}
