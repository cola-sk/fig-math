import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui-sdk/react/command";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@ui-sdk/react/dialog";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@ui-sdk/react/drawer";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@ui-sdk/react/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk/react/select";
import { Button } from "@ui-sdk/react/button";
import { Toggle, ToggleGroup, ToggleIcon } from "@ui-sdk/react/toggle";
import {
  BookMarked,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Menu,
  Moon,
  Presentation,
  Search,
  Star,
  Sun,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  EDITION_CATALOG,
  GRADE_CATALOG,
  TIER_BADGE_MAP,
  TIER_CATALOG,
  getLessonMetaForEdition,
  getLessonsByGrade,
  isEditionId,
  isGradeFilter,
} from "../data/lessons";
import type {
  EditionId,
  GradeFilter,
  MathLesson,
  TierFilter,
} from "../types/lesson";
import type { ProgressState } from "../utils/progress";
import { isSpeechSupported } from "../utils/speech";
import { toggleColorScheme } from "../utils/theme";

interface TopBarProps {
  lessons: MathLesson[];
  selectedEdition: EditionId;
  selectedGrade: GradeFilter;
  selectedTier: TierFilter;
  activeLessonId: string;
  progress: ProgressState;
  speechEnabled: boolean;
  onSelectEdition: (edition: EditionId) => void;
  onSelectGrade: (grade: GradeFilter) => void;
  onSelectTier: (tier: TierFilter) => void;
  onToggleSpeech: (enabled: boolean) => void;
  onEnterTeachingMode: () => void;
  onSelectLesson: (lessonId: string, variantId?: string) => void;
}

export function TopBar({
  lessons,
  selectedEdition,
  selectedGrade,
  selectedTier,
  activeLessonId,
  progress,
  speechEnabled,
  onSelectEdition,
  onSelectGrade,
  onSelectTier,
  onToggleSpeech,
  onEnterTeachingMode,
  onSelectLesson,
}: TopBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [, setSchemeTick] = useState(0);

  const editionMeta =
    EDITION_CATALOG.find((e) => e.id === selectedEdition) ?? EDITION_CATALOG[0];

  const totalVariants = lessons.reduce((acc, l) => acc + l.variants.length, 0);
  const completedCount = progress.completedVariants.length;
  const percent =
    totalVariants > 0 ? Math.round((completedCount / totalVariants) * 100) : 0;

  const drawerLessons = getLessonsByGrade(selectedGrade, selectedEdition);

  const drawerChapters = Array.from(
    drawerLessons.reduce((map, lesson) => {
      const meta = getLessonMetaForEdition(lesson, selectedEdition);
      const list = map.get(meta.chapterTitle) ?? [];
      list.push(lesson);
      map.set(meta.chapterTitle, list);
      return map;
    }, new Map<string, MathLesson[]>()),
  );

  const allChapters = Array.from(
    lessons.reduce((map, lesson) => {
      const list = map.get(lesson.chapterTitle) ?? [];
      list.push(lesson);
      map.set(lesson.chapterTitle, list);
      return map;
    }, new Map<string, MathLesson[]>()),
  );

  const gradeItems = GRADE_CATALOG.map((g) => ({
    value: g.value,
    label: g.label,
  }));

  const lessonItems = drawerLessons.map((l) => ({
    value: l.id,
    label: l.title.replace(/（.*?）/g, ""),
  }));

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/94 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between sm:flex-nowrap gap-3 px-4 py-2.5 sm:px-6">
        {/* Left: Brand Logo (flush-left aligned with main content) + Drawer + Grade Select + Lesson Select */}
        <div className="flex w-full min-w-0 items-center gap-2 sm:w-auto sm:gap-2.5">
          <Button
            aria-label="图数实验室"
            type="button"
            onClick={() => {
              onSelectEdition("doubanjiang");
              onSelectGrade("2");
              onSelectTier("all");
              onSelectLesson(lessons[0].id);
            }}
            className="flex shrink-0 cursor-pointer items-center gap-2.5 bg-transparent border-0 p-0 text-left"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#1e1e1e] shadow-sm">
              <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
                <path d="M16 5L26 10.5L16 16L6 10.5Z" fill="#f7f4ee" />
                <path d="M6 10.5L16 16V27L6 21.5Z" fill="#df6246" />
                <path d="M26 10.5L16 16V27L26 21.5Z" fill="#c9bfae" />
              </svg>
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-base font-extrabold tracking-tight text-[var(--ink-primary)]">
                图数实验室
              </span>
              <span className="hidden text-[11px] font-semibold text-[var(--ink-muted)] sm:inline">
                {editionMeta.shortName}
              </span>
            </span>
          </Button>

          <Drawer side="left" open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger
              aria-label="打开课程目录与设置"
              className="inline-flex h-9 shrink-0 items-center gap-1.5 cursor-pointer rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 text-xs font-bold text-[var(--ink-primary)] transition hover:border-[var(--border-strong)]"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
              <span className="hidden md:inline">目录</span>
            </DrawerTrigger>
            <DrawerBackdrop />
            <DrawerContent>
              <div className="flex items-start justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <DrawerTitle className="text-base font-bold text-[var(--ink-primary)]">
                    图数实验室 · 课程目录
                  </DrawerTitle>
                  <DrawerDescription className="mt-1 text-xs text-[var(--ink-secondary)]">
                    {editionMeta.name}（{editionMeta.publisher}）
                  </DrawerDescription>
                </div>
                <DrawerClose
                  aria-label="关闭目录"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </DrawerClose>
              </div>

              {/* Parent / Teacher Curriculum Filters inside Drawer */}
              <div className="space-y-3 border-b border-[var(--border-subtle)] py-3">
                <div>
                  <div className="mb-1.5 flex items-center gap-1 text-[11px] font-bold text-[var(--ink-muted)]">
                    <BookMarked
                      className="h-3.5 w-3.5 text-[var(--accent-teal)]"
                      aria-hidden="true"
                    />
                    <span>奥数教材版本</span>
                  </div>
                  <ToggleGroup
                    aria-label="奥数教材版本"
                    value={[selectedEdition]}
                    deselectable={false}
                    onValueChange={(vals) => {
                      const next = vals[0];
                      if (next && isEditionId(next)) onSelectEdition(next);
                    }}
                    className="grid grid-cols-2 gap-1.5"
                  >
                    {EDITION_CATALOG.map((ed) => {
                      const active = selectedEdition === ed.id;
                      return (
                        <Toggle
                          key={ed.id}
                          value={ed.id}
                          disabled={!ed.ready}
                          className={`rounded-lg border px-2.5 py-1.5 text-left text-xs font-semibold transition ${
                            active
                              ? "border-[var(--accent-teal)] bg-[var(--accent-teal-soft)] text-[var(--accent-teal)]"
                              : ed.ready
                                ? "cursor-pointer border-[var(--border-subtle)] bg-[var(--bg-stage)] text-[var(--ink-primary)]"
                                : "cursor-not-allowed border-[var(--border-subtle)] bg-[var(--bg-stage)]/60 text-[var(--ink-muted)] opacity-70"
                          }`}
                        >
                          <div className="truncate">{ed.shortName}</div>
                        </Toggle>
                      );
                    })}
                  </ToggleGroup>
                </div>

                <div>
                  <div className="mb-1.5 text-[11px] font-bold text-[var(--ink-muted)]">
                    按年级筛选
                  </div>
                  <ToggleGroup
                    aria-label="抽屉按年级筛选"
                    value={[selectedGrade]}
                    deselectable={false}
                    onValueChange={(vals) => {
                      const next = vals[0];
                      if (next && isGradeFilter(next)) onSelectGrade(next);
                    }}
                    className="flex flex-wrap gap-1.5"
                  >
                    {GRADE_CATALOG.map((grade) => {
                      const isCurrent = selectedGrade === grade.value;
                      return (
                        <Toggle
                          key={grade.value}
                          value={grade.value}
                          className={`cursor-pointer rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                            isCurrent
                              ? "border-[var(--accent-coral)] bg-[var(--accent-coral-soft)] text-[var(--accent-coral)]"
                              : "border-[var(--border-subtle)] bg-[var(--bg-stage)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                          }`}
                        >
                          {grade.shortLabel}
                        </Toggle>
                      );
                    })}
                  </ToggleGroup>
                </div>

                <div>
                  <div className="mb-1.5 text-[11px] font-bold text-[var(--ink-muted)]">
                    题目分层（基础例题 / 拓展拔高）
                  </div>
                  <ToggleGroup
                    aria-label="题目分层筛选"
                    value={[selectedTier]}
                    deselectable={false}
                    onValueChange={(vals) => {
                      const next = vals[0] as TierFilter | undefined;
                      if (next) onSelectTier(next);
                    }}
                    className="flex flex-wrap gap-1.5"
                  >
                    {TIER_CATALOG.map((tier) => {
                      const isCurrent = selectedTier === tier.value;
                      return (
                        <Toggle
                          key={tier.value}
                          value={tier.value}
                          className={`cursor-pointer rounded-lg border px-2 py-1 text-[11px] font-semibold transition ${
                            isCurrent
                              ? "border-[var(--accent-teal)] bg-[var(--accent-teal-soft)] text-[var(--accent-teal)]"
                              : "border-[var(--border-subtle)] bg-[var(--bg-stage)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                          }`}
                        >
                          {tier.stars ? `${tier.stars} ` : ""}
                          {tier.label}
                        </Toggle>
                      );
                    })}
                  </ToggleGroup>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto py-4 pr-1 space-y-5">
                {drawerChapters.length === 0 ? (
                  <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-stage)] p-4 text-center text-xs text-[var(--ink-secondary)] space-y-2">
                    <p className="font-semibold text-[var(--ink-primary)]">
                      {editionMeta.shortName} ·{" "}
                      {
                        GRADE_CATALOG.find((g) => g.value === selectedGrade)
                          ?.label
                      }
                      正在制作中
                    </p>
                    <p>可先切换到「二年级 / 三年级 / 四年级」体验动图。</p>
                  </div>
                ) : (
                  drawerChapters.map(([chapterTitle, chapterLessons]) => (
                    <div key={chapterTitle}>
                      <div className="mb-2 px-2 text-xs font-bold tracking-wide text-[var(--ink-muted)]">
                        {chapterTitle}
                      </div>
                      <ul className="space-y-1">
                        {chapterLessons.map((lesson) => {
                          const isActive = lesson.id === activeLessonId;
                          const meta = getLessonMetaForEdition(
                            lesson,
                            selectedEdition,
                          );
                          const visibleVariants =
                            selectedTier === "all"
                              ? lesson.variants
                              : lesson.variants.filter(
                                  (v) => v.tier === selectedTier,
                                );
                          const doneInLesson = visibleVariants.filter((v) =>
                            progress.completedVariants.includes(
                              `${lesson.id}:${v.id}`,
                            ),
                          ).length;

                          return (
                            <li key={lesson.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  onSelectLesson(lesson.id);
                                  setDrawerOpen(false);
                                }}
                                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                                  isActive
                                    ? "bg-[var(--accent-coral-soft)] font-semibold text-[var(--accent-coral)]"
                                    : "text-[var(--ink-primary)] hover:bg-[var(--bg-surface-muted)]"
                                }`}
                              >
                                <div className="min-w-0">
                                  <div className="truncate">{lesson.title}</div>
                                  <div className="text-xs text-[var(--ink-muted)]">
                                    {meta.gradeLabel} · {meta.weekLabel}
                                  </div>
                                </div>
                                <span className="ml-2 shrink-0 rounded-full bg-[var(--bg-surface)] px-2 py-0.5 text-xs font-semibold text-[var(--ink-secondary)] border border-[var(--border-subtle)]">
                                  {doneInLesson}/{visibleVariants.length}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-[var(--border-subtle)] pt-4">
                <Progress value={percent} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <ProgressLabel className="font-semibold text-[var(--ink-secondary)]">
                      已收集智慧星
                    </ProgressLabel>
                    <ProgressValue className="font-mono font-semibold text-[var(--ink-primary)]">
                      {() => `⭐ ${completedCount} / ${totalVariants}`}
                    </ProgressValue>
                  </div>
                  <ProgressTrack>
                    <ProgressIndicator />
                  </ProgressTrack>
                </Progress>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Grade Selector */}
          <Select
            aria-label="选择年级"
            items={gradeItems}
            value={selectedGrade}
            onValueChange={(next) => {
              if (next && isGradeFilter(next)) {
                onSelectGrade(next);
              }
            }}
          >
            <SelectTrigger aria-label="选择年级" className="h-9 min-w-[106px]">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap
                  className="h-4 w-4 text-[var(--accent-coral)]"
                  aria-hidden="true"
                />
                <SelectValue />
              </span>
              <ChevronDown
                className="h-3.5 w-3.5 text-[var(--ink-muted)]"
                aria-hidden="true"
              />
            </SelectTrigger>
            <SelectContent sideOffset={6} align="start">
              {GRADE_CATALOG.map((grade, index) => {
                const count = getLessonsByGrade(
                  grade.value,
                  selectedEdition,
                ).length;
                return (
                  <div key={grade.value}>
                    {index === 1 && <SelectSeparator />}
                    <SelectItem value={grade.value}>
                      <span className="flex items-center gap-2">
                        <span>{grade.label}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                            count > 0
                              ? "bg-[var(--bg-surface-muted)] text-[var(--ink-secondary)]"
                              : "bg-[var(--bg-stage)] text-[var(--ink-muted)]"
                          }`}
                        >
                          {count > 0 ? `${count}讲` : "待制作"}
                        </span>
                      </span>
                      <SelectItemIndicator>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </SelectItemIndicator>
                    </SelectItem>
                  </div>
                );
              })}
            </SelectContent>
          </Select>

          {/* Lesson List Selector right after Grade */}
          {drawerLessons.length > 0 && (
            <Select
              aria-label="切换本年级专题"
              items={lessonItems}
              value={activeLessonId}
              onValueChange={(next) => {
                if (next) onSelectLesson(next);
              }}
            >
              <SelectTrigger
                aria-label="切换本年级专题"
                className="h-9 min-w-0 max-w-[150px] sm:max-w-[210px]"
              >
                <span className="inline-flex items-center gap-1.5 truncate">
                  <BookOpen
                    className="h-3.5 w-3.5 shrink-0 text-[var(--accent-teal)]"
                    aria-hidden="true"
                  />
                  <span className="truncate">
                    <SelectValue />
                  </span>
                </span>
                <ChevronDown
                  className="h-3.5 w-3.5 shrink-0 text-[var(--ink-muted)]"
                  aria-hidden="true"
                />
              </SelectTrigger>
              <SelectContent sideOffset={6} align="start">
                {drawerLessons.map((lesson) => {
                  const meta = getLessonMetaForEdition(lesson, selectedEdition);
                  const shortTitle = lesson.title.replace(/（.*?）/g, "");
                  const doneCount = lesson.variants.filter((v) =>
                    progress.completedVariants.includes(`${lesson.id}:${v.id}`),
                  ).length;
                  return (
                    <SelectItem key={lesson.id} value={lesson.id}>
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="rounded bg-[var(--bg-surface-muted)] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--ink-muted)] shrink-0">
                          {meta.weekLabel}
                        </span>
                        <span className="truncate">{shortTitle}</span>
                        <span className="text-[10px] text-[var(--ink-muted)] shrink-0">
                          {doneCount}/{lesson.variants.length}
                        </span>
                      </span>
                      <SelectItemIndicator>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </SelectItemIndicator>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Right: Teaching Mode + Audio Toggle + Star Counter + Search & Theme */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button
            onClick={onEnterTeachingMode}
            aria-label="进入授课模式"
            className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-xl bg-[var(--accent-coral)] px-3 text-xs font-extrabold text-white shadow-xs transition hover:brightness-105"
          >
            <Presentation className="h-4 w-4" aria-hidden="true" />
            <span>授课模式</span>
          </Button>

          {isSpeechSupported() && (
            <Toggle
              aria-label="自动语音朗读讲解"
              pressed={speechEnabled}
              onPressedChange={onToggleSpeech}
              className="h-10 px-3"
            >
              <ToggleIcon>
                {speechEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </ToggleIcon>
              <span className="hidden sm:inline text-xs font-bold">
                {speechEnabled ? "自动朗读开" : "自动朗读"}
              </span>
            </Toggle>
          )}

          <div className="hidden md:flex h-10 items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 text-xs font-bold text-[var(--ink-primary)]">
            <Star
              className="h-4 w-4 fill-[var(--accent-amber)] text-[var(--accent-amber)]"
              aria-hidden="true"
            />
            <span>
              {completedCount} / {totalVariants}
            </span>
          </div>

          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger
              shortcut="mod+k"
              aria-label="搜索课程专题"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)]"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </DialogTrigger>
            <DialogBackdrop />
            <DialogContent>
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-2">
                <DialogTitle className="sr-only">搜索奥数课程</DialogTitle>
                <div className="flex flex-1 items-center gap-2">
                  <Search
                    className="h-4 w-4 text-[var(--ink-muted)]"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold text-[var(--ink-muted)]">
                    {editionMeta.name} · 查找想学的专题
                  </span>
                </div>
                <DialogClose
                  aria-label="关闭搜索"
                  className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-[var(--ink-muted)] hover:bg-[var(--bg-surface-muted)]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </DialogClose>
              </div>
              <Command
                onAction={(value) => {
                  const [lessonId, variantId] = value.split("::");
                  if (lessonId) {
                    onSelectLesson(lessonId, variantId);
                    setSearchOpen(false);
                  }
                }}
              >
                <div className="border-b border-[var(--border-subtle)] px-3">
                  <CommandInput
                    aria-label="搜索课程专题"
                    placeholder="输入关键词，例如：锯木头、移多补少、排队、鸡兔…"
                  />
                </div>
                <CommandEmpty>没有找到匹配的奥数专题</CommandEmpty>
                <CommandList>
                  {allChapters.map(([chapterTitle, chapterLessons]) => (
                    <CommandGroup key={chapterTitle}>
                      <CommandGroupLabel>{chapterTitle}</CommandGroupLabel>
                      {chapterLessons.flatMap((lesson) =>
                        lesson.variants.map((variant) => {
                          const done = progress.completedVariants.includes(
                            `${lesson.id}:${variant.id}`,
                          );
                          const tierInfo = TIER_BADGE_MAP[variant.tier];
                          return (
                            <CommandItem
                              key={`${lesson.id}::${variant.id}`}
                              value={`${lesson.id}::${variant.id}`}
                              keywords={[
                                lesson.title,
                                lesson.gradeLabel,
                                lesson.weekLabel,
                                variant.title,
                                variant.modeLabel,
                                variant.bookPart,
                                tierInfo.label,
                                ...lesson.keywords,
                              ]}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="rounded bg-[var(--bg-surface-muted)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--ink-secondary)]">
                                  {variant.bookPart} · {tierInfo.stars}
                                </span>
                                <span className="truncate font-medium">
                                  {lesson.title} · {variant.title}
                                </span>
                              </div>
                              <span className="flex items-center gap-1.5 text-xs text-[var(--ink-muted)] shrink-0">
                                {done && (
                                  <CheckCircle2
                                    className="h-3.5 w-3.5 text-[var(--accent-teal)]"
                                    aria-label="已完成"
                                  />
                                )}
                                {lesson.gradeLabel}
                              </span>
                            </CommandItem>
                          );
                        }),
                      )}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </DialogContent>
          </Dialog>

          <Button
            aria-label="切换明暗主题"
            onClick={() => {
              toggleColorScheme();
              setSchemeTick((t) => t + 1);
            }}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)]"
          >
            <span className="theme-icon-to-dark">
              <Moon className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">切换到深色主题</span>
            </span>
            <span className="theme-icon-to-light">
              <Sun className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">切换到浅色主题</span>
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
