import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { cn } from '@admincn/lib/utils';

type AdminTheme = 'light' | 'dark' | 'system';

type AdminThemeContextValue = {
  theme: AdminTheme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: AdminTheme) => void;
};

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

function systemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>(() => {
    const stored = localStorage.getItem('cs-admincn-theme');
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    return 'system';
  });

  const [systemDark, setSystemDark] = useState(systemPrefersDark);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setSystemDark(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    localStorage.setItem('cs-admincn-theme', theme);
  }, [theme]);

  const resolvedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme]
  );

  return (
    <AdminThemeContext.Provider value={value}>
      <div
        className={cn(
          'admincn-root flex min-h-screen w-full flex-col',
          resolvedTheme === 'dark' && 'dark'
        )}
      >
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) {
    throw new Error('useAdminTheme must be used within AdminThemeProvider');
  }
  return ctx;
}
