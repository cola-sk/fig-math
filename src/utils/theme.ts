export type ColorScheme = "light" | "dark";

const STORAGE_KEY = "figmath-color-scheme";

export function getSystemScheme(): ColorScheme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getStoredScheme(): ColorScheme | null {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === "light" || val === "dark") return val;
    return null;
  } catch {
    return null;
  }
}

export function getRenderedScheme(): ColorScheme {
  return getStoredScheme() ?? getSystemScheme();
}

export function applyMetaScheme(scheme: ColorScheme | null): void {
  if (typeof document === "undefined") return;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  if (meta) {
    meta.content = scheme ?? "light dark";
  }
}

export function toggleColorScheme(): ColorScheme {
  const rendered = getRenderedScheme();
  const target: ColorScheme = rendered === "dark" ? "light" : "dark";
  const system = getSystemScheme();

  try {
    if (target === system) {
      localStorage.removeItem(STORAGE_KEY);
      applyMetaScheme(null);
    } else {
      localStorage.setItem(STORAGE_KEY, target);
      applyMetaScheme(target);
    }
  } catch {
    applyMetaScheme(target);
  }

  return target;
}

export function subscribeColorSchemeStorage(onUpdate: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      applyMetaScheme(getStoredScheme());
      onUpdate();
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}
