'use client'
/**
 * Theme Switcher Component
 *
 * A dropdown menu component that allows users to switch between light, dark, and system themes.
 * This component provides a consistent interface for theme switching throughout the application.
 *
 * Features:
 * - Visual indication of the current theme (sun, moon, or monitor icon)
 * - Dropdown menu with theme options
 * - Integration with remix-themes for theme persistence
 * - Support for light, dark, and system themes
 * - Accessible button with appropriate aria attributes
 */
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "~/lib/helpers";



/**
 * ThemeSwitcher component for toggling between light, dark, and system themes
 * 
 * This component uses the remix-themes hook to access and modify the current theme.
 * It displays a dropdown menu with options for light, dark, and system themes,
 * with the current theme indicated by the appropriate icon on the trigger button.
 * 
 * @returns A dropdown menu component for switching themes
 */
const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // On mount, check system preference or localStorage
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme"
      className={cn("fixed max-md:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration 300",
        "focus:outline-hidden"
      )}>
      {theme === 'dark' ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};

export default ThemeToggle;