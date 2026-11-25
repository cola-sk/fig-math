import type { EditionId, GradeFilter } from "../types/lesson";

const PROGRESS_KEY = "figmath-progress-v1";
const GRADE_KEY = "figmath-selected-grade";
const EDITION_KEY = "figmath-selected-edition";

export interface ProgressState {
  /** key format: `${lessonId}:${variantId}` */
  completedVariants: string[];
  /** recent visited lesson IDs */
  recentLessons: string[];
}

const DEFAULT_PROGRESS: ProgressState = {
  completedVariants: [],
  recentLessons: [],
};

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completedVariants: Array.isArray(parsed.completedVariants) ? parsed.completedVariants : [],
      recentLessons: Array.isArray(parsed.recentLessons) ? parsed.recentLessons : [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

export function markVariantCompleted(
  current: ProgressState,
  lessonId: string,
  variantId: string,
): ProgressState {
  const key = `${lessonId}:${variantId}`;
  if (current.completedVariants.includes(key)) {
    return current;
  }
  const next: ProgressState = {
    ...current,
    completedVariants: [...current.completedVariants, key],
  };
  saveProgress(next);
  return next;
}

export function recordRecentLesson(current: ProgressState, lessonId: string): ProgressState {
  const filtered = current.recentLessons.filter((id) => id !== lessonId);
  const next: ProgressState = {
    ...current,
    recentLessons: [lessonId, ...filtered].slice(0, 6),
  };
  saveProgress(next);
  return next;
}

export function loadSelectedGrade(): GradeFilter {
  try {
    const val = localStorage.getItem(GRADE_KEY);
    if (
      val === "all" ||
      val === "1" ||
      val === "2" ||
      val === "3" ||
      val === "4" ||
      val === "5" ||
      val === "6"
    ) {
      return val;
    }
    return "2";
  } catch {
    return "2";
  }
}

export function saveSelectedGrade(grade: GradeFilter): void {
  try {
    localStorage.setItem(GRADE_KEY, grade);
  } catch {
    // ignore storage errors
  }
}

export function loadSelectedEdition(): EditionId {
  try {
    const val = localStorage.getItem(EDITION_KEY);
    if (
      val === "doubanjiang" ||
      val === "xueersi" ||
      val === "gaosi" ||
      val === "keben"
    ) {
      return val;
    }
    return "doubanjiang";
  } catch {
    return "doubanjiang";
  }
}

export function saveSelectedEdition(edition: EditionId): void {
  try {
    localStorage.setItem(EDITION_KEY, edition);
  } catch {
    // ignore storage errors
  }
}
