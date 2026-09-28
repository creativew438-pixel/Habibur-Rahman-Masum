import React, { useState } from 'react';
import { Play, ExternalLink, Smartphone, Plus } from 'lucide-react';
import { VideoProject } from '../types';

interface ReelsSectionProps {
  isDark: boolean;
  reels: VideoProject[];
  onOpenVideoModal: () => void;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({
  isDark,
  reels,
  onOpenVideoModal
}) => {
  const [playingReelId, setPlayingReelId] = useState<string | null>(null);

  return (
    <section
      id="reels"
      className={`py-16 sm:py-20 border-t ${
        isDark ? 'border-cyan-300/[0.09] bg-[#071318]/70' : 'border-slate-200/90 bg-slate-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Dedicated Reels Showcase Heading right below Video Edits */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div
              className={`flex items-center gap-2 text-xs font-mono-tabular ${
                isDark ? 'text-cyan-400' : 'text-cyan-700 font-semibold'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>02. Shorts & Reels Showcase</span>
              <span aria-hidden="true">·</span>
              <span>Vertical 9:16 Format</span>
              <span aria-hidden="true">·</span>
              <span>{reels.length} Reels</span>
            </div>

            <h2
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Shorts & Reels Showcase
            </h2>

            <p className={`text-sm sm:text-base max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Fast-paced vertical 9:16 edits crafted for YouTube Shorts, Instagram Reels, and TikTok—featuring kinetic captions, beat-synced speed ramps, and high-retention visual hooks.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenVideoModal}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer ${
              isDark
                ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
                : 'border-cyan-600/40 bg-cyan-50 text-cyan-800 hover:bg-cyan-100'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add / Manage Reels</span>
          </button>
        </div>

        {/* 4-Column Responsive Vertical 9:16 Smartphone Reel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel, index) => {
            const isPlaying = playingReelId === reel.id;

            return (
              <article
                key={reel.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col ${
                  isDark
                    ? 'bg-[#08151b]/90 border-cyan-300/[0.1] hover:border-cyan-400/60 shadow-lg'
                    : 'bg-white border-slate-200/90 hover:border-cyan-600/50 shadow-sm'
                }`}
              >
                {/* Vertical 9:16 Smartphone Frame */}
                <div className="relative w-full aspect-[9/16] bg-slate-950 overflow-hidden">
                  {/* Top Smartphone Speaker Notch Detail */}
                  <div
                    className="pointer-events-none absolute top-2.5 left-1/2 -translate-x-1/2 z-10 w-14 h-1 rounded-full bg-white/25"
                    aria-hidden="true"
                  />

                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                      title={reel.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div
                      onClick={() => setPlayingReelId(reel.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setPlayingReelId(reel.id);
                      }}
                      className="relative w-full h-full cursor-pointer select-none"
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${reel.youtubeId}/maxresdefault.jpg`}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('hqdefault.jpg')) {
                            target.src = `https://i.ytimg.com/vi/${reel.youtubeId}/hqdefault.jpg`;
                          }
                        }}
                        alt={reel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Measured Scrim Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/25 transition-opacity group-hover:opacity-90" />

                      {/* Center Cyan Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_28px_rgba(34,211,238,0.75)] transition-transform duration-200 group-hover:scale-110">
                          <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                        </div>
                      </div>

                      {/* Bottom Overlay Info inside Vertical Frame */}
                      <div className="absolute bottom-0 inset-x-0 p-4 space-y-1 text-white">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono-tabular text-cyan-300">
                          <span>0{index + 1}</span>
                          <span aria-hidden="true">·</span>
                          <span>{reel.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>9:16</span>
                        </div>
                        <h3 className="font-display text-base font-bold leading-snug">
                          {reel.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>

                {/* Compact Reel Footer */}
                <div className="p-4 flex items-center justify-between gap-2 text-xs">
                  <span className={`truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {reel.metrics || '9:16 Vertical Short'}
                  </span>

                  <a
                    href={`https://www.youtube.com/shorts/${reel.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 font-semibold shrink-0 transition-colors ${
                      isDark ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-700 hover:text-cyan-800'
                    }`}
                  >
                    <span>Watch Short</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
