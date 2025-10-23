"use client";

import {
  ThemeProvider as NextThemesProvider,
  useTheme,
  type ThemeProviderProps,
} from "next-themes";
import { useEffect } from "react";

const FALLBACK_THEME = "dark" as const;

const SystemFallback = () => {
  const { resolvedTheme, systemTheme, setTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme && !systemTheme) {
      setTheme(FALLBACK_THEME);
    }
  }, [resolvedTheme, setTheme, systemTheme]);

  return null;
};

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <SystemFallback />
      {children}
    </NextThemesProvider>
  );
}
