/** Applies and persists the Asancha Admin light/dark theme preference. */

'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { APP_STORAGE_KEYS } from '../../lib/constants/app.constants';
import { useUiStore, type AdminThemePreference } from '../../store/ui.store';

export interface AdminThemeProviderProps {
  children: ReactNode;
}

function isThemePreference(value: string | null): value is AdminThemePreference {
  return value === 'system' || value === 'light' || value === 'dark';
}

function applyTheme(theme: AdminThemePreference, systemPrefersDark: boolean): void {
  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);
  const root = document.documentElement;

  root.classList.toggle('dark', isDark);
  root.dataset.theme = isDark ? 'dark' : 'light';
  root.style.colorScheme = isDark ? 'dark' : 'light';
}

export function AdminThemeProvider({ children }: AdminThemeProviderProps) {
  const theme = useUiStore((state) => state.theme);
  const setTheme = useUiStore((state) => state.setTheme);
  const [preferenceLoaded, setPreferenceLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem(APP_STORAGE_KEYS.preferredTheme);

      if (isThemePreference(storedTheme)) {
        setTheme(storedTheme);
      }
    } catch {
      // Theme persistence is optional; the interface remains usable without storage access.
    } finally {
      setPreferenceLoaded(true);
    }
  }, [setTheme]);

  useEffect(() => {
    if (!preferenceLoaded) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncTheme = (): void => {
      applyTheme(theme, mediaQuery.matches);
    };

    syncTheme();

    if (theme === 'system') {
      mediaQuery.addEventListener('change', syncTheme);
    }

    try {
      window.localStorage.setItem(APP_STORAGE_KEYS.preferredTheme, theme);
    } catch {
      // Theme persistence is optional; the interface remains usable without storage access.
    }

    return () => {
      mediaQuery.removeEventListener('change', syncTheme);
    };
  }, [preferenceLoaded, theme]);

  return children;
}
