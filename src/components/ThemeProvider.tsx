"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Toaster } from "sonner";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.style.colorScheme = next;

  try {
    localStorage.setItem("theme", next);
  } catch {
    // storage unavailable (private mode) — theme just won't persist
  }
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // Light is the default. The inline no-flash script in layout.tsx already
  // applied a persisted "dark" class before hydration; this state only
  // drives the toggle icon and the Toaster theme.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Read after the await: setState must not run synchronously in an effect.
      await Promise.resolve();

      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {
        stored = null;
      }

      if (cancelled || (stored !== "light" && stored !== "dark")) return;

      setTheme(stored);
      // Re-assert in case the inline script was blocked.
      document.documentElement.classList.toggle("dark", stored === "dark");
      document.documentElement.style.colorScheme = stored;
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Same toast setup as before, but follows the active theme. */
export function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster position="top-center" richColors closeButton theme={theme} />
  );
}
