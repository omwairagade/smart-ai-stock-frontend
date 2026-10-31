import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-surfaceLight transition-colors"
      title="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-textSecondary" />
      ) : (
        <Sun className="w-4 h-4 text-warning" />
      )}
    </button>
  );
}
