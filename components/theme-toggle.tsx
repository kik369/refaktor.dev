"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "@/components/kibo/theme-switcher";

type ThemeValue = "light" | "dark" | "system";
type ThemeToggleProps = {
  className?: string;
};
const ALLOWED_THEMES = new Set<ThemeValue>(["light", "dark", "system"]);

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const currentTheme = useMemo<ThemeValue>(() => {
    const candidate = (theme ?? "system") as ThemeValue;
    return ALLOWED_THEMES.has(candidate) ? candidate : "system";
  }, [theme]);

  return (
    <ThemeSwitcher
      className={className}
      value={currentTheme}
      onChange={(nextTheme) => setTheme(nextTheme)}
    />
  );
}
