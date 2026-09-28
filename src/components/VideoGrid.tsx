import React, { useState } from 'react';
import { Play, ExternalLink, Plus, Maximize2, X } from 'lucide-react';
import { VideoProject } from '../types';

interface VideoGridProps {
  isDark: boolean;
  videos: VideoProject[];
  onOpenVideoModal: () => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  isDark,
  videos,
  onOpenVideoModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [theaterVideo, setTheaterVideo] = useState<VideoProject | null>(null);

  const categories = ['All', ...Array.from(new Set(videos.map((v) => v.category)))];

  const filteredVideos =
    activeCategory === 'All'
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <section
      id="videos"
      className={`py-16 sm:py-20 border-t ${
        isDark ? 'border-cyan-300/[0.09]' : 'border-slate-200/90'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header + Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div
              className={`flex items-center gap-2 text-xs font-mono-tabular ${
                isDark ? 'text-cyan-400' : 'text-cyan-700 font-semibold'
              }`}
            >
              <span>01. Selected Video Edits</span>
              <span aria-hidden="true">·</span>
              <span>16:9 Widescreen Format</span>
              <span aria-hidden="true">·</span>
              <span>{videos.length} Projects</span>
            </div>

            <h2
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Video Edits & Motion Showcase
            </h2>

            <p className={`text-sm sm:text-base max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Horizontal 16:9 video edits, carousel animations, kinetic motion sequences, and creator content crafted for maximum audience retention.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Segmented Filter Controls */}
            <div
              className={`flex flex-wrap items-center gap-1 p-1 rounded-xl border ${
                isDark ? 'bg-[#08151b] border-cyan-300/[0.12]' : 'bg-slate-100 border-slate-200'
              }`}
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-cyan-400 text-slate-950 shadow-sm'
                        : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onOpenVideoModal}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
                isDark
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
                  : 'border-cyan-600/40 bg-cyan-50 text-cyan-800 hover:bg-cyan-100'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add / Manage Videos</span>
            </button>
          </div>
        </div>

        {/* 16:9 Widescreen Video Portfolio Grid (Strict 16:9 Video Frames for ALL items here) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video, index) => {
            const isPlaying = playingId === video.id;

            return (
              <article
                key={video.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col ${
                  isDark
                    ? 'bg-[#08151b]/90 border-cyan-300/[0.1] hover:border-cyan-400/55 shadow-[0_12px_36px_-15px_rgba(20,70,82,0.45)]'
                    : 'bg-white border-slate-200/90 hover:border-cyan-600/50 shadow-sm'
                }`}
              >
                {/* STRICT 16:9 Widescreen Video Frame */}
                <div className="relative w-full aspect-video bg-slate-950 overflow-hidden">
                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div
                      onClick={() => setPlayingId(video.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setPlayingId(video.id);
                      }}
                      className="relative w-full h-full cursor-pointer select-none"
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('hqdefault.jpg')) {
                            target.src = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
                          }
                        }}
                        alt={video.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Measured Scrim Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/15 transition-opacity group-hover:opacity-90" />

                      {/* Center Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-13 h-13 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.65)] transition-transform duration-200 group-hover:scale-110">
                          <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                        </div>
                      </div>

                      {/* Top Right Theater Expand Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTheaterVideo(video);
                        }}
                        title="Open in Cinema Mode"
                        className="absolute top-3 right-3 p-2 rounded-lg bg-black/65 text-white/90 hover:text-cyan-300 border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Bottom Frame Spec Line */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono-tabular text-white/90">
                        <span>{video.resolution || '1080p · 60FPS · 16:9'}</span>
                        <span className="text-cyan-300">16:9 Widescreen</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Clean Unboxed Metadata */}
                    <div
                      className={`flex items-center gap-2 text-xs font-mono-tabular ${
                        isDark ? 'text-cyan-400' : 'text-cyan-700 font-medium'
                      }`}
                    >
                      <span>0{index + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{video.category}</span>
                      {video.metrics && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            {video.metrics}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display text-lg font-bold leading-snug group-hover:text-cyan-400 transition-colors">
                      {video.title}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {video.description}
                    </p>
                  </div>

                  {/* Footer Row */}
                  <div
                    className={`pt-3 border-t flex items-center justify-between gap-2 text-xs ${
                      isDark ? 'border-cyan-300/[0.08]' : 'border-slate-100'
                    }`}
                  >
                    <div className={`truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {(video.tools || ['Premiere Pro', 'After Effects']).join(' · ')}
                    </div>

                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 font-semibold shrink-0 transition-colors ${
                        isDark ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-700 hover:text-cyan-800'
                      }`}
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Cinema Theater Modal for 16:9 Video */}
      {theaterVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setTheaterVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 text-white">
              <div>
                <p className="text-xs font-mono-tabular text-cyan-400">
                  {theaterVideo.category} · 16:9 Cinema Mode
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold">
                  {theaterVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTheaterVideo(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-cyan-400 hover:text-slate-950 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-cyan-400/40 bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${theaterVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={theaterVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
