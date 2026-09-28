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
          ? 'bg-[#060809]/85 border-white/[0.08] text-[#f4f6f0]'
          : 'bg-[#f5f6f2]/85 border-slate-900/[0.08] text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-base sm:text-lg font-bold tracking-tight whitespace-nowrap shrink-0 hover:text-lime-400 transition-colors"
        >
          {PROFILE_DATA.name}
        </a>

        {/* Zone 2: Clean text navigation links (NO Showreel link as requested) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a
            href="#videos"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-lime-400 ${
              isDark ? 'text-slate-300 hover:text-lime-300' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Video Edits
          </a>
          <a
            href="#reels"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-lime-400 ${
              isDark ? 'text-slate-300 hover:text-lime-300' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Shorts & Reels
          </a>
          <a
            href="#graphics"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-lime-400 ${
              isDark ? 'text-slate-300 hover:text-lime-300' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Graphic Design
          </a>
          <a
            href="#services"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-lime-400 ${
              isDark ? 'text-slate-300 hover:text-lime-300' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Services
          </a>
          <a
            href="#about"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-lime-400 ${
              isDark ? 'text-slate-300 hover:text-lime-300' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            About
          </a>
          <a
            href="#contact"
            className={`whitespace-nowrap transition-colors hover:underline underline-offset-4 decoration-lime-400 ${
              isDark ? 'text-slate-300 hover:text-lime-300' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions + Theme Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenHtmlModal}
            title="View Single-File HTML Code"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
              isDark
                ? 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-lime-400/50 hover:text-lime-300'
                : 'border-slate-300 bg-white text-slate-700 hover:border-lime-600 hover:text-lime-700'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-lime-400" />
            <span>HTML Code</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
              isDark
                ? 'border-lime-400/30 bg-lime-400/10 text-lime-300 hover:bg-lime-400/20'
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-lime-300" />
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
            className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap bg-lime-400 text-slate-950 hover:bg-lime-300 transition-colors shadow-sm"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  );
};
