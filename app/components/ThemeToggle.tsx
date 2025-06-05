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
import { Moon,Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";



/**
 * ThemeSwitcher component for toggling between light, dark, and system themes
 * 
 * This component uses the remix-themes hook to access and modify the current theme.
 * It displays a dropdown menu with options for light, dark, and system themes,
 * with the current theme indicated by the appropriate icon on the trigger button.
 * 
 * @returns A dropdown menu component for switching themes
 */
export const ThemeToggle = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    if (theme === Theme.DARK){
      setTheme(Theme.LIGHT)
    }
    else {
      setTheme(Theme.DARK)
    }
  };

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === Theme.DARK ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};

export default ThemeToggle;