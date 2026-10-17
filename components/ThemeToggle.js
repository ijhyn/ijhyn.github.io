'use client';

import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from '../lib/theme';

function isDarkNow() {
  const picked = document.documentElement.dataset.theme;
  // No pick yet means the page is following the system setting.
  return picked ? picked === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle() {
  // Only drives aria-checked; the knob's position and icon come from CSS, so they are right before hydration.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(isDarkNow());
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setIsDark(isDarkNow());
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = isDarkNow() ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the pick then lasts for this page only.
    }
    setIsDark(next === 'dark');
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="다크 모드"
      title="다크 모드"
      className="theme-switch"
      onClick={toggle}
    >
      <span className="theme-switch__knob" aria-hidden="true" />
    </button>
  );
}
