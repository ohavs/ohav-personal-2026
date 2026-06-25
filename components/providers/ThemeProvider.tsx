"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // אתחול מ-localStorage (ברירת מחדל: dark). ה-Preloader מסתיר הבהוב קצר.
  useEffect(() => {
    let saved: Theme = "dark";
    try {
      saved = (localStorage.getItem("theme") as Theme) || "dark";
    } catch {}
    applyTheme(saved);
    setTheme(saved);
  }, []);

  const applyTheme = (t: Theme) => {
    const html = document.documentElement;
    html.classList.toggle("light", t === "light");
    html.classList.toggle("dark", t === "dark");
  };

  const toggle = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch {}
      // מאפשר לרכיבים (כמו סצנת ה-3D) להגיב לשינוי
      window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
