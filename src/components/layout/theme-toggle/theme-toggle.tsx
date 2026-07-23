/** Compact light/dark theme toggle for admin navigation. */

'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useUiStore } from '../../../store/ui.store';

import styles from './theme-toggle.module.css';

export function ThemeToggle() {
  const theme = useUiStore((state) => state.theme);
  const setTheme = useUiStore((state) => state.setTheme);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemPreference = (): void => {
      setSystemPrefersDark(mediaQuery.matches);
    };

    syncSystemPreference();
    mediaQuery.addEventListener('change', syncSystemPreference);

    return () => {
      mediaQuery.removeEventListener('change', syncSystemPreference);
    };
  }, []);

  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);
  const nextTheme = isDark ? 'light' : 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      aria-label={label}
      aria-pressed={isDark}
      className={styles.toggle}
      onClick={() => setTheme(nextTheme)}
      title={label}
      type="button"
    >
      {isDark ? (
        <Sun aria-hidden size={18} strokeWidth={2} />
      ) : (
        <Moon aria-hidden size={18} strokeWidth={2} />
      )}
    </button>
  );
}
