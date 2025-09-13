'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/theme-context';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycleTheme = () => {
    console.log('Current theme:', theme);
    if (theme === 'light') {
      console.log('Switching to dark');
      setTheme('dark');
    } else if (theme === 'dark') {
      console.log('Switching to system');
      setTheme('system');
    } else {
      console.log('Switching to light');
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />;
    }
    return resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;
  };

  const getTooltip = () => {
    if (theme === 'light') return 'Switch to dark mode';
    if (theme === 'dark') return 'Switch to system theme';
    return 'Switch to light mode';
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
      title={getTooltip()}
    >
      {getIcon()}
    </Button>
  );
}