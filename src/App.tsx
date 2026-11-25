import { useCallback, useEffect, useMemo, useState } from "react";
import { FormulaCard } from "./components/FormulaCard";
import { GradeRoadmapView } from "./components/GradeRoadmapView";
import { LessonHeader } from "./components/LessonHeader";
import { ParamControls } from "./components/ParamControls";
import { QuantityBoardCard } from "./components/QuantityBoardCard";
import { StepNarrativeCard } from "./components/StepNarrativeCard";
import { StepStepper } from "./components/StepStepper";
import { TeachingStage } from "./components/TeachingStage";
import { TopBar } from "./components/TopBar";
import {
  GRADE_CATALOG,
  LESSONS,
  getLessonById,
  getLessonMetaForEdition,
  getLessonsByGrade,
} from "./data/lessons";
import { SceneRenderer } from "./engines/SceneRenderer";
import type { EditionId, GradeFilter, TierFilter } from "./types/lesson";
import {
  loadProgress,
  loadSelectedEdition,
  loadSelectedGrade,
  markVariantCompleted,
  recordRecentLesson,
  saveSelectedEdition,
  saveSelectedGrade,
  type ProgressState,
} from "./utils/progress";
import { speakChinese, stopSpeech } from "./utils/speech";
import { subscribeColorSchemeStorage } from "./utils/theme";

interface RouteState {
  lessonId: string;
  variantId: string;
  stepIndex: number;
}

function parseHash(): RouteState {
  if (typeof window === "undefined") {
    const first = LESSONS[0];
    return {
      lessonId: first.id,
      variantId: first.variants[0].id,
      stepIndex: 0,
    };
  }
  const clean = window.location.hash.replace(/^#\/?/, "");
  const parts = clean.split("/").filter(Boolean);
  const lesson = getLessonById(parts[0] ?? LESSONS[0].id);
  const variant =
    lesson.variants.find((v) => v.id === parts[1]) ?? lesson.variants[0];
  const rawStep = Number(parts[2] ?? "1");
  const stepIndex = Number.isFinite(rawStep) && rawStep >= 1 ? rawStep - 1 : 0;
  return {
    lessonId: lesson.id,
    variantId: variant.id,
    stepIndex,
  };
}

export function App() {
  const initial = parseHash();
  const [selectedEdition, setSelectedEdition] = useState<EditionId>(() =>
    loadSelectedEdition(),
  );
  const [selectedGrade, setSelectedGrade] = useState<GradeFilter>(() =>
    loadSelectedGrade(),
  );
  const [selectedTier, setSelectedTier] = useState<TierFilter>("all");
  const [lessonId, setLessonId] = useState(initial.lessonId);
  const [variantId, setVariantId] = useState(initial.variantId);
  const [stepIndex, setStepIndex] = useState(initial.stepIndex);
  const [paramsByVariant, setParamsByVariant] = useState<
    Record<string, Record<string, number>>
  >({});
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [teachingMode, setTeachingMode] = useState(false);

  const lessonsInGrade = useMemo(
    () => getLessonsByGrade(selectedGrade, selectedEdition),
    [selectedGrade, selectedEdition],
  );
  const activeGradeMeta = useMemo(
    () =>
      GRADE_CATALOG.find((g) => g.value === selectedGrade) ?? GRADE_CATALOG[0],
    [selectedGrade],
  );

  const lesson = useMemo(() => {
    if (lessonsInGrade.length === 0) return getLessonById(lessonId);
    return (
      lessonsInGrade.find((l) => l.id === lessonId) ?? lessonsInGrade[0]
    );
  }, [lessonsInGrade, lessonId]);

  const variant = useMemo(() => {
    const tierFiltered =
      selectedTier === "all"
        ? lesson.variants
        : lesson.variants.filter((v) => v.tier === selectedTier);
    const pool = tierFiltered.length > 0 ? tierFiltered : lesson.variants;
    return pool.find((v) => v.id === variantId) ?? pool[0];
  }, [lesson, variantId, selectedTier]);

  const variantKey = `${lesson.id}:${variant.id}`;
  const currentParams = paramsByVariant[variantKey] ?? variant.defaultParams;

  const built = useMemo(
    () => variant.build(currentParams),
    [variant, currentParams],
  );

  const clampedStepIndex = Math.min(
    Math.max(0, stepIndex),
    Math.max(0, built.steps.length - 1),
  );
  const currentStep = built.steps[clampedStepIndex];

  // Sync URL hash when viewing an active lesson
  useEffect(() => {
    if (lessonsInGrade.length === 0) return;
    const nextHash = `#/${lesson.id}/${variant.id}/${clampedStepIndex + 1}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [lessonsInGrade.length, lesson.id, variant.id, clampedStepIndex]);

  // Listen to browser hash navigation
  useEffect(() => {
    const onHash = () => {
      const parsed = parseHash();
      setLessonId(parsed.lessonId);
      setVariantId(parsed.variantId);
      setStepIndex(parsed.stepIndex);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Sync color scheme across tabs
  useEffect(() => subscribeColorSchemeStorage(() => {}), []);

  // Record recent visit & mark complete when reaching final step
  useEffect(() => {
    if (lessonsInGrade.length === 0) return;
    setProgress((prev) => recordRecentLesson(prev, lesson.id));
  }, [lessonsInGrade.length, lesson.id]);

  useEffect(() => {
    if (lessonsInGrade.length === 0) return;
    if (clampedStepIndex === built.steps.length - 1) {
      setProgress((prev) =>
        markVariantCompleted(prev, lesson.id, variant.id),
      );
    }
  }, [
    lessonsInGrade.length,
    clampedStepIndex,
    built.steps.length,
    lesson.id,
    variant.id,
  ]);

  // Optional speech synthesis
  useEffect(() => {
    if (lessonsInGrade.length > 0 && speechEnabled && currentStep) {
      speakChinese(`${currentStep.title}。${currentStep.narration}`);
    } else {
      stopSpeech();
    }
    return () => stopSpeech();
  }, [lessonsInGrade.length, speechEnabled, currentStep]);

  const handleSelectEdition = useCallback((nextEdition: EditionId) => {
    setSelectedEdition(nextEdition);
    saveSelectedEdition(nextEdition);
  }, []);

  const handleSelectGrade = useCallback(
    (nextGrade: GradeFilter) => {
      setSelectedGrade(nextGrade);
      saveSelectedGrade(nextGrade);
      const matches = getLessonsByGrade(nextGrade, selectedEdition);
      if (matches.length > 0) {
        setLessonId((prevId) => {
          const stillExists = matches.some((m) => m.id === prevId);
          if (stillExists) return prevId;
          setVariantId(matches[0].variants[0].id);
          setStepIndex(0);
          return matches[0].id;
        });
      }
    },
    [selectedEdition],
  );

  const handleSelectTier = useCallback(
    (nextTier: TierFilter) => {
      setSelectedTier(nextTier);
      setStepIndex(0);
      if (nextTier !== "all") {
        const match = lesson.variants.find((v) => v.tier === nextTier);
        if (match) {
          setVariantId(match.id);
        }
      }
    },
    [lesson.variants],
  );

  const handleSelectLesson = useCallback(
    (nextLessonId: string, nextVariantId?: string) => {
      const target = getLessonById(nextLessonId);
      const targetGrade = getLessonMetaForEdition(target, selectedEdition).grade;
      setSelectedGrade((prevGrade) => {
        if (prevGrade !== "all" && String(targetGrade) !== prevGrade) {
          const nextGrade = String(targetGrade) as GradeFilter;
          saveSelectedGrade(nextGrade);
          return nextGrade;
        }
        return prevGrade;
      });
      setLessonId(target.id);
      setVariantId(nextVariantId ?? target.variants[0].id);
      setStepIndex(0);
    },
    [selectedEdition],
  );

  const handleSelectVariant = useCallback((nextVariantId: string) => {
    setVariantId(nextVariantId);
    setStepIndex(0);
  }, []);

  const handleChangeParam = useCallback(
    (key: string, value: number) => {
      setParamsByVariant((prev) => ({
        ...prev,
        [variantKey]: {
          ...(prev[variantKey] ?? variant.defaultParams),
          [key]: value,
        },
      }));
    },
    [variantKey, variant.defaultParams],
  );

  const handleResetParams = useCallback(() => {
    setParamsByVariant((prev) => {
      const next = { ...prev };
      delete next[variantKey];
      return next;
    });
  }, [variantKey]);

  const lessonIdx = lessonsInGrade.findIndex((l) => l.id === lesson.id);
  const nextLesson =
    lessonIdx >= 0 && lessonIdx < lessonsInGrade.length - 1
      ? lessonsInGrade[lessonIdx + 1]
      : undefined;

  if (teachingMode && lessonsInGrade.length > 0) {
    return (
      <TeachingStage
        lesson={lesson}
        variant={variant}
        problemStatement={built.problemStatement}
        steps={built.steps}
        formulas={built.formulas}
        currentStepIndex={clampedStepIndex}
        nextLessonTitle={nextLesson?.title}
        onSelectStep={setStepIndex}
        onNextLesson={
          nextLesson ? () => handleSelectLesson(nextLesson.id) : undefined
        }
        onExit={() => setTeachingMode(false)}
      />
    );
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <TopBar
        lessons={LESSONS}
        selectedEdition={selectedEdition}
        selectedGrade={selectedGrade}
        selectedTier={selectedTier}
        activeLessonId={lesson.id}
        progress={progress}
        speechEnabled={speechEnabled}
        onSelectEdition={handleSelectEdition}
        onSelectGrade={handleSelectGrade}
        onSelectTier={handleSelectTier}
        onToggleSpeech={setSpeechEnabled}
        onEnterTeachingMode={() => setTeachingMode(true)}
        onSelectLesson={handleSelectLesson}
      />

      <main className="mx-auto w-full max-w-[1360px] flex-1 px-4 py-5 sm:px-6 lg:py-6">
        {lessonsInGrade.length === 0 ? (
          <GradeRoadmapView
            gradeMeta={activeGradeMeta}
            onSelectGrade={handleSelectGrade}
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_420px]">
            {/* Left Main Visual Stage */}
            <div className="flex min-w-0 flex-col gap-4">
              <LessonHeader
                lesson={lesson}
                selectedEdition={selectedEdition}
                activeVariantId={variant.id}
                selectedTier={selectedTier}
                problemStatement={built.problemStatement}
                completedVariants={progress.completedVariants}
                onSelectVariant={handleSelectVariant}
              />

              <SceneRenderer scene={currentStep.sceneState} />

              <ParamControls
                paramDefs={variant.paramDefs}
                params={currentParams}
                onChangeParam={handleChangeParam}
                onResetParams={handleResetParams}
              />

              <StepStepper
                steps={built.steps}
                currentStepIndex={clampedStepIndex}
                onSelectStep={setStepIndex}
              />
            </div>

            {/* Right Narrative, Arithmetic Deduction & Quantity Board */}
            <aside className="flex flex-col gap-4" aria-label="分步讲解与算式推演">
              <StepNarrativeCard
                step={currentStep}
                totalSteps={built.steps.length}
                isYoungLearner={lesson.grade <= 2}
                isLastStep={clampedStepIndex >= built.steps.length - 1}
                nextLessonTitle={nextLesson?.title}
                onPrev={() => setStepIndex(Math.max(0, clampedStepIndex - 1))}
                onNext={() =>
                  setStepIndex(
                    Math.min(built.steps.length - 1, clampedStepIndex + 1),
                  )
                }
                onNextLesson={
                  nextLesson
                    ? () => handleSelectLesson(nextLesson.id)
                    : undefined
                }
              />

              <FormulaCard
                formulas={built.formulas}
                activeIndices={currentStep.activeFormulaIndices}
              />

              <QuantityBoardCard
                stats={currentStep.liveStats}
                compact={lesson.grade <= 2}
              />
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
