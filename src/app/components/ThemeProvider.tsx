"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "purple" | "amber";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "purple",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("purple");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    if (saved === "purple" || saved === "amber") {
      setTheme(saved);
      document.documentElement.setAttribute(
        "data-theme",
        saved === "amber" ? "amber" : "",
      );
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "purple" ? "amber" : "purple";
    setTheme(next);
    localStorage.setItem("portfolio-theme", next);
    document.documentElement.setAttribute(
      "data-theme",
      next === "amber" ? "amber" : "",
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
