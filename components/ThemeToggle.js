'use client';

import { THEME_STORAGE_KEY } from '../lib/theme';

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    // No pick yet means the page is following the system setting.
    const isDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = isDark ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the pick then lasts for this page only.
    }
  };

  // The visible label (★ 다크 / ☀ 라이트) comes from CSS, so it matches the theme before hydration.
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="다크/라이트 모드 전환"
      title="다크/라이트 모드 전환"
    />
  );
}
