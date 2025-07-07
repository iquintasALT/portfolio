"use client";

/**
 * Theme Switcher Component
 *
 * A dropdown menu component that allows users to switch between light and dark themes.
 * This component provides a consistent interface for theme switching throughout the application.
 *
 * Features:
 * - Visual indication of the current theme (sun or moon icon)
 * - Accessible button with appropriate aria attributes
 * - Integration with Next.js and Tailwind for theme persistence
 * - Support for light and dark themes (optionally extend to system theme)
 */
import { useEffect, useState } from "react";
import { cn } from "~/lib/helpers";
import { Moon, Sun } from "lucide-react";

/**
 * ThemeToggle component for toggling between light and dark themes
 *
 * This component manages the theme using React state, localStorage, and the Tailwind dark class.
 * It displays a button with an icon indicating the current theme.
 *
 * @returns A button for switching themes
 */
const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // On mount, check system preference or localStorage
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "fixed max-md:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration 300",
        "focus:outline-hidden"
      )}
    >
      {theme === "dark" ? <Sun className="h-6 w-6 text-yellow-300" /> : <Moon className="h-6 w-6 text-blue-900" />}
    </button>
  );
};

export default ThemeToggle;
