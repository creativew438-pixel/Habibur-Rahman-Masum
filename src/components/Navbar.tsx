import React from 'react';
import { Sun, Moon, Code2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenHtmlModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenHtmlModal
}) => {
  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-xl transition-colors duration-200 border-b ${
        isDark
          ? 'bg-[#050c0f]/85 border-cyan-300/[0.1] text-[#f0f6f8]'
          : 'bg-[#f2f6f8]/85 border-slate-900/[0.08] text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Colorized Brand Name Wordmark matching Profile Photo Palette */}
        <a
          href="#top"
          className={`font-display text-base sm:text-lg font-extrabold tracking-tight whitespace-nowrap shrink-0 transition-opacity hover:opacity-90 ${
            isDark ? 'name-colorized-dark' : 'name-colorized-light'
          }`}
        >
          {PROFILE_DATA.name}
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a
            href="#videos"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-cyan-400 ${
              isDark ? 'text-slate-300 hover:text-cyan-300' : 'text-slate-600 hover:text-cyan-800'
            }`}
          >
            Video Edits
          </a>
          <a
            href="#reels"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-cyan-400 ${
              isDark ? 'text-slate-300 hover:text-cyan-300' : 'text-slate-600 hover:text-cyan-800'
            }`}
          >
            Shorts & Reels
          </a>
          <a
            href="#graphics"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-cyan-400 ${
              isDark ? 'text-slate-300 hover:text-cyan-300' : 'text-slate-600 hover:text-cyan-800'
            }`}
          >
            Graphic Design
          </a>
          <a
            href="#services"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-cyan-400 ${
              isDark ? 'text-slate-300 hover:text-cyan-300' : 'text-slate-600 hover:text-cyan-800'
            }`}
          >
            Services
          </a>
          <a
            href="#about"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-cyan-400 ${
              isDark ? 'text-slate-300 hover:text-cyan-300' : 'text-slate-600 hover:text-cyan-800'
            }`}
          >
            About
          </a>
          <a
            href="#contact"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-cyan-400 ${
              isDark ? 'text-slate-300 hover:text-cyan-300' : 'text-slate-600 hover:text-cyan-800'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary Actions + Theme Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenHtmlModal}
            title="View Single-File HTML Code"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border cursor-pointer ${
              isDark
                ? 'border-cyan-300/15 bg-white/[0.03] text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300'
                : 'border-slate-300 bg-white text-slate-700 hover:border-cyan-600 hover:text-cyan-700'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>HTML Code</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border cursor-pointer ${
              isDark
                ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-cyan-300" />
                <span className="hidden xs:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700" />
                <span className="hidden xs:inline">Dark</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shadow-sm"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  );
};
