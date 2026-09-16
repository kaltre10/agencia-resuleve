import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center shadow-md transition-all cursor-pointer"
    >
      {theme === 'dark' ? (
        <Sun className="size-4 text-accent" />
      ) : (
        <Moon className="size-4 text-primary" />
      )}
    </button>
  );
};

export default ThemeToggle;
