import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

interface FooterProps {
  isDark: boolean;
  onOpenHtmlModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isDark, onOpenHtmlModal }) => {
  return (
    <footer
      className={`py-10 border-t text-xs ${
        isDark
          ? 'border-white/[0.08] bg-[#050708] text-slate-400'
          : 'border-slate-200 bg-slate-100 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span className={`font-display font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {PROFILE_DATA.name}
          </span>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span>{PROFILE_DATA.role}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <a href="#videos" className="hover:text-lime-400 transition-colors">
            Video Edits (16:9)
          </a>
          <a href="#reels" className="hover:text-lime-400 transition-colors">
            Shorts & Reels (9:16)
          </a>
          <a href="#graphics" className="hover:text-lime-400 transition-colors">
            Graphic Design
          </a>
          <a
            href={PROFILE_DATA.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lime-400 transition-colors"
          >
            YouTube
          </a>
          <a
            href={PROFILE_DATA.socials.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lime-400 transition-colors"
          >
            Behance
          </a>
          <a
            href={PROFILE_DATA.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lime-400 transition-colors"
          >
            Facebook
          </a>
          <button
            type="button"
            onClick={onOpenHtmlModal}
            className="text-lime-400 hover:underline cursor-pointer"
          >
            Single-File HTML
          </button>
        </div>
      </div>
    </footer>
  );
};
