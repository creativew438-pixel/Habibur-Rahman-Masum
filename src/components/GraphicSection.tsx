import React from 'react';
import { Expand, Plus, Upload } from 'lucide-react';
import { GraphicProject } from '../types';

interface GraphicSectionProps {
  isDark: boolean;
  graphics: GraphicProject[];
  onSelectGraphic: (index: number) => void;
  onOpenGraphicManager: () => void;
}

export const GraphicSection: React.FC<GraphicSectionProps> = ({
  isDark,
  graphics,
  onSelectGraphic,
  onOpenGraphicManager
}) => {
  return (
    <section
      id="graphics"
      className={`py-16 sm:py-20 border-t ${
        isDark ? 'border-white/[0.07]' : 'border-slate-200/90'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div
              className={`flex items-center gap-2 text-xs font-mono-tabular ${
                isDark ? 'text-lime-400' : 'text-lime-700 font-semibold'
              }`}
            >
              <span>03. Visual Design & Branding</span>
              <span aria-hidden="true">·</span>
              <span>Poster & Ad Creatives</span>
              <span aria-hidden="true">·</span>
              <span>{graphics.length} Unique Designs</span>
            </div>

            <h2
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Graphic & Poster Designs
            </h2>

            <p className={`text-sm sm:text-base max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Commercial brand posters, product manipulation artworks, and social media campaign visuals. Click any poster to inspect in full-screen Lightbox mode.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenGraphicManager}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-lime-400 text-slate-950 hover:bg-lime-300 transition-colors whitespace-nowrap self-start sm:self-auto shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add / Upload Design</span>
          </button>
        </div>

        {/* Graphic Cards Grid (2 Unique Designs + Upload New Card) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {graphics.map((item, index) => (
            <article
              key={item.id}
              onClick={() => onSelectGraphic(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectGraphic(index);
              }}
              className={`group rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col ${
                isDark
                  ? 'bg-[#0b0f10] border-white/[0.08] hover:border-lime-400/60'
                  : 'bg-white border-slate-200/90 hover:border-lime-600/50 shadow-sm'
              }`}
            >
              {/* 3:4 Poster Container */}
              <div className="relative w-full aspect-[3/4] bg-slate-950 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== item.fallbackSrc) {
                      target.src = item.fallbackSrc;
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Scrim & Lightbox Trigger */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-3 right-3 p-2.5 rounded-xl bg-black/70 text-lime-300 border border-lime-400/30 opacity-90 group-hover:scale-105 transition-transform">
                  <Expand className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono-tabular text-white">
                  <span className="text-lime-300">Click to Open Lightbox</span>
                  <span>0{index + 1}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div
                    className={`flex items-center gap-2 text-xs font-mono-tabular ${
                      isDark ? 'text-lime-400' : 'text-lime-700 font-medium'
                    }`}
                  >
                    <span>{item.category}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold group-hover:text-lime-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                </div>

                <div
                  className={`pt-3 border-t text-xs ${
                    isDark ? 'border-white/[0.06] text-slate-400' : 'border-slate-100 text-slate-500'
                  }`}
                >
                  {(item.tools || ['Adobe Photoshop', 'Brand Design']).join(' · ')}
                </div>
              </div>
            </article>
          ))}

          {/* Interactive Card to Upload Offline Graphic Designs from Computer/Phone */}
          <button
            type="button"
            onClick={onOpenGraphicManager}
            className={`group rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center transition-all min-h-[380px] cursor-pointer ${
              isDark
                ? 'border-white/15 bg-white/[0.015] hover:border-lime-400/60 hover:bg-lime-400/[0.04]'
                : 'border-slate-300 bg-slate-50/70 hover:border-lime-600 hover:bg-lime-50/40'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                isDark ? 'bg-lime-400/15 text-lime-300' : 'bg-lime-100 text-lime-700'
              }`}
            >
              <Upload className="w-6 h-6" />
            </div>

            <h3 className="font-display text-lg font-bold mb-1">
              Upload New Graphic Design
            </h3>
            <p className={`text-xs sm:text-sm max-w-xs mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Select any poster, thumbnail, or banner image directly from your computer or phone folder to add it to your gallery.
            </p>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-lime-400 text-slate-950">
              <Plus className="w-3.5 h-3.5" />
              <span>Choose Image File</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
