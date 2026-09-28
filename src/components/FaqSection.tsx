import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/portfolioData';

interface FaqSectionProps {
  isDark: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ isDark }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className={`py-16 sm:py-20 border-t ${
        isDark ? 'border-white/[0.07] bg-[#080b0c]/40' : 'border-slate-200/90 bg-slate-100/50'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 text-center">
          <p
            className={`text-xs font-mono-tabular ${
              isDark ? 'text-lime-400' : 'text-lime-700 font-semibold'
            }`}
          >
            06. Frequently Asked Questions
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            Common Questions About Collaborating
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-colors ${
                  isDark
                    ? 'bg-[#0b0f10] border-white/[0.08]'
                    : 'bg-white border-slate-200/90 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-display text-sm sm:text-base font-bold">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-lime-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    className={`px-6 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                      isDark ? 'border-white/[0.05] text-slate-300' : 'border-slate-100 text-slate-600'
                    }`}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
