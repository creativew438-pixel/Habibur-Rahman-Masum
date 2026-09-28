import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

interface AboutSectionProps {
  isDark: boolean;
}

const SOFTWARE_STACK = [
  { name: 'Adobe Premiere Pro', focus: 'Timeline Pacing, J/L Cuts & Narrative Assembly' },
  { name: 'Adobe After Effects', focus: 'Kinetic Motion Graphics, Carousels & Keyframe Curves' },
  { name: 'Adobe Photoshop', focus: 'Commercial Posters, Thumbnails & Photo Compositing' },
  { name: 'Sound Design & Mixing', focus: 'Layered SFX, Risers, Whooshes & Clean Voice Mastering' }
];

export const AboutSection: React.FC<AboutSectionProps> = ({ isDark }) => {
  return (
    <section
      id="about"
      className={`py-16 sm:py-20 border-t ${
        isDark ? 'border-white/[0.07]' : 'border-slate-200/90'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Honest, Passionate Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div
                className={`flex items-center gap-2 text-xs font-mono-tabular ${
                  isDark ? 'text-lime-400' : 'text-lime-700 font-semibold'
                }`}
              >
                <span>05. About Me</span>
                <span aria-hidden="true">·</span>
                <span>{PROFILE_DATA.name}</span>
                <span aria-hidden="true">·</span>
                <span>{PROFILE_DATA.role}</span>
              </div>

              <h2
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Dedicated to the Craft of Visual Storytelling & Modern Pacing
              </h2>
            </div>

            {/* Exact Honest Bio from User Instructions */}
            <blockquote
              className={`rounded-2xl p-6 sm:p-8 border-l-4 border-lime-400 text-base sm:text-lg leading-relaxed ${
                isDark
                  ? 'bg-[#0b0f10] text-slate-200 border-y border-r border-y-white/[0.07] border-r-white/[0.07]'
                  : 'bg-white text-slate-800 border-y border-r border-y-slate-200 border-r-slate-200 shadow-sm'
              }`}
            >
              "{PROFILE_DATA.bio}"
            </blockquote>

            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Every project gets my full creative focus—whether it is a widescreen 16:9 YouTube edit, a fast-paced 9:16 vertical reel, or a bold commercial poster design. By practicing deliberately every day and studying modern retention dynamics, I make sure every cut, sound cue, and graphic frame serves the story.
            </p>
          </div>

          {/* Right Column: Toolkit & Creative Discipline */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display text-lg font-bold">
              Creative Toolkit & Core Focus
            </h3>

            <div className="space-y-3">
              {SOFTWARE_STACK.map((tool, idx) => (
                <div
                  key={tool.name}
                  className={`rounded-xl p-4 border transition-colors ${
                    isDark
                      ? 'bg-[#0b0f10] border-white/[0.08] hover:border-lime-400/40'
                      : 'bg-white border-slate-200/90 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-tabular mb-1">
                    <span className={isDark ? 'text-lime-400 font-semibold' : 'text-lime-700 font-semibold'}>
                      0{idx + 1}. {tool.name}
                    </span>
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Daily Practice</span>
                  </div>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {tool.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
