import React from 'react';
import { SERVICES_DATA, PROCESS_STEPS } from '../data/portfolioData';

interface ServicesSectionProps {
  isDark: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ isDark }) => {
  return (
    <section
      id="services"
      className={`py-16 sm:py-20 border-t ${
        isDark ? 'border-white/[0.07] bg-[#080b0c]/50' : 'border-slate-200/90 bg-slate-100/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Capabilities Part */}
        <div className="space-y-10">
          <div className="space-y-2">
            <div
              className={`flex items-center gap-2 text-xs font-mono-tabular ${
                isDark ? 'text-lime-400' : 'text-lime-700 font-semibold'
              }`}
            >
              <span>04. Services & Capabilities</span>
              <span aria-hidden="true">·</span>
              <span>What I Deliver</span>
            </div>

            <h2
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Editing & Visual Design Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className={`rounded-2xl p-6 sm:p-7 border transition-colors flex flex-col justify-between space-y-5 ${
                  isDark
                    ? 'bg-[#0b0f10] border-white/[0.08] hover:border-lime-400/50'
                    : 'bg-white border-slate-200/90 hover:border-lime-600/50 shadow-sm'
                }`}
              >
                <div className="space-y-2.5">
                  <div
                    className={`flex items-center gap-2 text-xs font-mono-tabular ${
                      isDark ? 'text-lime-400' : 'text-lime-700 font-semibold'
                    }`}
                  >
                    <span>{service.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.subtitle}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold">{service.title}</h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {service.description}
                  </p>
                </div>

                <div
                  className={`pt-4 border-t text-xs font-medium ${
                    isDark ? 'border-white/[0.06] text-slate-300' : 'border-slate-100 text-slate-700'
                  }`}
                >
                  {service.deliverables.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Step Workflow Process Part */}
        <div
          className={`pt-12 border-t space-y-8 ${
            isDark ? 'border-white/[0.07]' : 'border-slate-200'
          }`}
        >
          <div className="space-y-1.5">
            <p
              className={`text-xs font-mono-tabular ${
                isDark ? 'text-lime-400' : 'text-lime-700 font-semibold'
              }`}
            >
              Production Workflow · Smooth Turnaround
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold">
              How We Work Together From Raw Footage to Final Master
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className={`rounded-2xl p-6 border space-y-3 ${
                  isDark
                    ? 'bg-[#0b0f10] border-white/[0.08]'
                    : 'bg-white border-slate-200/90 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span className={isDark ? 'text-lime-400 font-bold text-sm' : 'text-lime-700 font-bold text-sm'}>
                    {item.step}
                  </span>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                    {item.duration}
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold">{item.title}</h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
