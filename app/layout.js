import Link from 'next/link';
import 'highlight.js/styles/github-dark.css';
import ThemeToggle from '../components/ThemeToggle';
import { themeInitScript } from '../lib/theme';
import './globals.css';

export const metadata = {
  title: { default: 'ijhyn-log', template: '%s – ijhyn-log' },
  description: 'ijhyn의 기록',
};

export default function RootLayout({ children }) {
  return (
    // The init script sets data-theme on <html> before React hydrates, hence the warning suppression.
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Same file as the @font-face in globals.css; fetch it early so text doesn't flash in a fallback font. */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/neodgm/neodgm-webfont@1.601/neodgm/neodgm.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <header className="site-header">
          <div className="site-header__inner">
            <Link href="/" className="site-title">
              ijhyn-log
            </Link>
            <div className="site-header__actions">
              <ThemeToggle />
              <a href="https://github.com/ijhyn" className="site-link" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">© {new Date().getFullYear()} ijhyn</footer>
      </body>
    </html>
  );
}
