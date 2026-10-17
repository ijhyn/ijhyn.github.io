'use client';

import { useEffect, useState } from 'react';

// Shown once the reader has scrolled past the first screen of a post.
const SHOW_AFTER_PX = 400;

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button type="button" className="scroll-top" onClick={scrollToTop} aria-label="맨 위로" title="맨 위로">
      <span aria-hidden="true">▲</span>
    </button>
  );
}
