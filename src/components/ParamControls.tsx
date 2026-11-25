import { useState } from "react";
import { Button } from "@ui-sdk/react/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@ui-sdk/react/collapsible";
import { Field, FieldLabel } from "@ui-sdk/react/field";
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@ui-sdk/react/slider";
import { ChevronDown, ChevronUp, RotateCcw, SlidersHorizontal } from "lucide-react";
import type { ParamDefinition } from "../types/lesson";

interface ParamControlsProps {
  paramDefs: ParamDefinition[];
  params: Record<string, number>;
  onChangeParam: (key: string, value: number) => void;
  onResetParams: () => void;
}

export function ParamControls({
  paramDefs,
  params,
  onChangeParam,
  onResetParams,
}: ParamControlsProps) {
  // Collapsed by default so the animated SVG stage sits front-and-center for kids
  const [expanded, setExpanded] = useState(false);

  if (paramDefs.length === 0) return null;

  return (
    <Collapsible
      open={expanded}
      onOpenChange={setExpanded}
      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
    >
      <div className="flex items-center justify-between px-3.5 py-2">
        <CollapsibleTrigger className="flex flex-1 cursor-pointer items-center gap-2 bg-transparent border-0 p-0 text-left text-xs font-bold text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]">
          <SlidersHorizontal
            className="h-3.5 w-3.5 text-[var(--accent-coral)]"
            aria-hidden="true"
          />
          <span>换个数字试一试（自己出题玩一玩）</span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-[var(--ink-muted)]" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-[var(--ink-muted)]" aria-hidden="true" />
          )}
        </CollapsibleTrigger>

        {expanded && (
          <Button
            onClick={onResetParams}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-medium text-[var(--ink-muted)] hover:bg-[var(--bg-surface-muted)] hover:text-[var(--ink-primary)]"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            恢复原题
          </Button>
        )}
      </div>

      <CollapsiblePanel className="grid grid-cols-1 gap-4 border-t border-[var(--border-subtle)] px-4 py-3 sm:grid-cols-2">
        {paramDefs.map((def) => {
          const val = params[def.key] ?? def.min;
          return (
            <Field key={def.key}>
              <Slider
                value={val}
                min={def.min}
                max={def.max}
                step={def.step}
                onValueChange={(next) => {
                  if (typeof next === "number") {
                    onChangeParam(def.key, next);
                  }
                }}
              >
                <div className="flex items-center justify-between text-xs">
                  <FieldLabel className="font-semibold text-[var(--ink-secondary)]">
                    {def.label}
                  </FieldLabel>
                  <SliderValue className="font-mono font-bold text-[var(--accent-coral)]">
                    {() => `${val}${def.unit ?? ""}`}
                  </SliderValue>
                </div>
                <SliderControl>
                  <SliderTrack>
                    <SliderIndicator />
                    <SliderThumb aria-label={def.label} />
                  </SliderTrack>
                </SliderControl>
              </Slider>
            </Field>
          );
        })}
      </CollapsiblePanel>
    </Collapsible>
  );
}
