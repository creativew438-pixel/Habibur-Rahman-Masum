import React, { useState, useRef } from 'react';
import {
  Play,
  MessageCircle,
  Settings2,
  ExternalLink,
  Video,
  ArrowDownRight
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { VideoProject } from '../types';
import { buildWhatsAppUrl, isCustomWhatsAppConfigured } from '../utils/whatsappConfig';
import {
  ProfilePhotoConfig,
  processUploadedImageFile
} from '../utils/graphicManager';

interface HeroSectionProps {
  isDark: boolean;
  featuredVideo: VideoProject;
  profilePhoto: ProfilePhotoConfig;
  onUpdateProfilePhoto: (newConfig: ProfilePhotoConfig) => void;
  onOpenProfilePhotoModal: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenVideoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDark,
  featuredVideo,
  profilePhoto,
  onUpdateProfilePhoto,
  onOpenProfilePhotoModal,
  onOpenWhatsAppModal,
  onOpenVideoModal
}) => {
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);
  const [imgLoadError, setImgLoadError] = useState(false);
  const quickFileInputRef = useRef<HTMLInputElement>(null);

  const handleQuickFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const optimizedDataUrl = await processUploadedImageFile(file, 1000);
      setImgLoadError(false);
      onUpdateProfilePhoto({
        ...profilePhoto,
        src: optimizedDataUrl
      });
    } catch {
      onOpenProfilePhotoModal();
    }
  };

  const scrollToFeaturedAndPlay = () => {
    setIsPlayingFeatured(true);
    const el = document.getElementById('featured-video-player');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const whatsappConfigured = isCustomWhatsAppConfigured();
  const hasValidPhoto = Boolean(profilePhoto.src && !imgLoadError);

  return (
    <section id="top" className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 overflow-hidden">
      {/* Studio Petrol-Teal & Cyan Ambient Glow matching profile.jpg backdrop (#144652 / #3c8091) */}
      <div
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[820px] h-[380px] rounded-full blur-[135px] opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(60, 128, 145, 0.65) 0%, rgba(20, 70, 82, 0.35) 55%, transparent 100%)'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* PART 1 (TOP PRIORITY): PROFILE PICTURE & INFORMATION RIGHT BESIDE IT */}
        <div
          className={`relative rounded-2xl p-6 sm:p-8 lg:p-10 border transition-colors ${
            isDark
              ? 'bg-gradient-to-br from-[#08151b]/95 via-[#0a1b22]/90 to-[#071116]/95 border-cyan-400/[0.16] shadow-[0_20px_60px_-20px_rgba(20,70,82,0.55)]'
              : 'bg-white border-slate-200/90 shadow-sm'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Elliptical Profile Photo with Animated Orbiting Petrol-Cyan Ellipse Rings */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative group p-4 sm:p-5 flex items-center justify-center">
                {/* Soft Petrol-Cyan Studio Aura matching profile photo background */}
                <div
                  className="pointer-events-none absolute inset-1 rounded-full bg-gradient-to-tr from-[#144652]/80 via-[#3c8091]/55 to-cyan-400/40 blur-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />

                {/* Animated Outer Ellipse Ring 1 (Clockwise Morphing Ellipse + Glowing Cyan Node) */}
                <div
                  className="pointer-events-none absolute -inset-1 sm:-inset-2 rounded-full border border-cyan-400/50 ellipse-ring-1 transition-transform duration-500"
                  style={{
                    boxShadow: '0 0 24px rgba(60, 128, 145, 0.35)'
                  }}
                  aria-hidden="true"
                >
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_14px_#22d3ee]" />
                </div>

                {/* Animated Outer Ellipse Ring 2 (Counter-Clockwise Dashed Tilted Ellipse + Sky Node) */}
                <div
                  className="pointer-events-none absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-sky-300/40 ellipse-ring-2 transition-transform duration-500"
                  aria-hidden="true"
                >
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-sky-300 shadow-[0_0_12px_#38bdf8]" />
                </div>

                {/* Inner Neon Petrol-Cyan Glowing Ellipse/Circular Frame */}
                <div
                  onDoubleClick={onOpenProfilePhotoModal}
                  className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-2 border-cyan-400 profile-parrot-glow bg-[#0a1a20] flex items-center justify-center z-10"
                >
                  {hasValidPhoto ? (
                    <img
                      src={profilePhoto.src}
                      alt={PROFILE_DATA.name}
                      onError={() => setImgLoadError(true)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full transition-transform duration-300"
                      style={{
                        objectFit: profilePhoto.objectFit,
                        objectPosition: `${profilePhoto.posX}% ${profilePhoto.posY}%`,
                        transform: `scale(${profilePhoto.zoom})`
                      }}
                    />
                  ) : (
                    <img
                      src="profile.jpg"
                      alt={PROFILE_DATA.name}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('i.postimg.cc')) {
                          target.src = 'https://i.postimg.cc/QChw3cNG/3751-Habibur-Rahman-Masum.jpg';
                        }
                      }}
                      onClick={() => quickFileInputRef.current?.click()}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    />
                  )}

                  <input
                    ref={quickFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleQuickFileSelect}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Availability Status Indicator */}
              <div className="mt-4 flex items-center gap-2 text-xs font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
                </span>
                <span className={isDark ? 'text-cyan-300' : 'text-cyan-700 font-semibold'}>
                  {PROFILE_DATA.availability}
                </span>
                <span className={isDark ? 'text-slate-600' : 'text-slate-400'} aria-hidden="true">
                  ·
                </span>
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  {PROFILE_DATA.location}
                </span>
              </div>
            </div>

            {/* Right Column: Colorized Name, Role ("Video Editor & Graphic Designer"), Bio & Actions */}
            <div className="lg:col-span-8 text-center lg:text-left space-y-5">
              <div className="space-y-2">
                <p
                  className={`text-xs font-mono-tabular tracking-wider uppercase ${
                    isDark ? 'text-cyan-400' : 'text-cyan-700 font-semibold'
                  }`}
                >
                  Creative Portfolio · Visual Storytelling & Motion
                </p>

                {/* Colorized Main Name ("Habibur Rahman Masum") matching Profile Backdrop Tone */}
                <h1
                  className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12]"
                  style={{ textWrap: 'balance' }}
                >
                  <span
                    className={
                      isDark ? 'name-colorized-dark' : 'name-colorized-light'
                    }
                  >
                    {PROFILE_DATA.name}
                  </span>
                </h1>

                {/* Role directly below Name: "Video Editor & Graphic Designer" */}
                <p
                  className={`font-display text-lg sm:text-xl font-bold ${
                    isDark ? 'text-slate-200' : 'text-cyan-800'
                  }`}
                >
                  {PROFILE_DATA.role}
                </p>
              </div>

              {/* Greeting & Brief Intro */}
              <p
                className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {PROFILE_DATA.shortGreeting}
              </p>

              {/* Clean Unboxed Metadata for Core Disciplines */}
              <div
                className={`flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1 text-xs font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {PROFILE_DATA.coreSkills.map((skill, idx) => (
                  <React.Fragment key={skill}>
                    <span
                      className={
                        idx === 0
                          ? isDark
                            ? 'text-cyan-300'
                            : 'text-cyan-700 font-semibold'
                          : ''
                      }
                    >
                      {skill}
                    </span>
                    {idx < PROFILE_DATA.coreSkills.length - 1 && (
                      <span className={isDark ? 'text-cyan-500/50' : 'text-slate-400'} aria-hidden="true">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Key Performance Metrics */}
              <div
                className={`grid grid-cols-3 gap-4 pt-3 pb-2 border-y ${
                  isDark ? 'border-cyan-300/[0.1]' : 'border-slate-200'
                }`}
              >
                {PROFILE_DATA.metrics.map((metric) => (
                  <div key={metric.label} className="text-center lg:text-left">
                    <div
                      className={`font-mono-tabular text-base sm:text-xl font-bold ${
                        isDark ? 'text-cyan-300' : 'text-cyan-700'
                      }`}
                    >
                      {metric.value}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons (NO Email here — Email is only in bottom Contact section) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  type="button"
                  onClick={scrollToFeaturedAndPlay}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20 whitespace-nowrap cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Watch Main Video Below</span>
                </button>

                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors whitespace-nowrap ${
                    isDark
                      ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
                      : 'border-cyan-600/40 bg-cyan-50 text-cyan-800 hover:bg-cyan-100'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>

                <button
                  type="button"
                  onClick={onOpenWhatsAppModal}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap cursor-pointer ${
                    isDark
                      ? 'border-cyan-300/15 bg-white/[0.03] text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300'
                      : 'border-slate-300 bg-slate-100 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <Settings2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{whatsappConfigured ? 'Update WhatsApp' : 'Connect My WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenVideoModal}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap cursor-pointer ${
                    isDark
                      ? 'border-cyan-300/15 bg-white/[0.03] text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300'
                      : 'border-slate-300 bg-slate-100 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Add My Videos</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2 (RIGHT BELOW PROFILE): FEATURED VIDEO EDIT IN BALANCED 16:9 CINEMA CONTAINER */}
        <div id="featured-video-player" className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div
                className={`flex items-center gap-2 text-xs font-mono-tabular ${
                  isDark ? 'text-cyan-400' : 'text-cyan-700 font-semibold'
                }`}
              >
                <span>Featured Video Edit</span>
                <span aria-hidden="true">·</span>
                <span>16:9 Widescreen Cinema</span>
                <span aria-hidden="true">·</span>
                <span>{featuredVideo.resolution || '4K UHD · 60FPS'}</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold mt-1">
                {featuredVideo.title}
              </h2>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <button
                type="button"
                onClick={onOpenVideoModal}
                className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  isDark ? 'text-slate-400 hover:text-cyan-300' : 'text-slate-600 hover:text-cyan-700'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-cyan-400" />
                <span>Change Featured Video</span>
              </button>

              <a
                href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 transition-colors whitespace-nowrap ${
                  isDark ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-700 hover:text-cyan-800'
                }`}
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 16:9 Responsive Widescreen Video Frame */}
          <div
            className={`relative w-full aspect-video rounded-2xl overflow-hidden border transition-all ${
              isDark
                ? 'bg-[#071116] border-cyan-400/35 shadow-[0_20px_70px_-15px_rgba(60,128,145,0.35)]'
                : 'bg-slate-900 border-slate-300 shadow-xl'
            }`}
          >
            {isPlayingFeatured ? (
              <iframe
                src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={featuredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div
                onClick={() => setIsPlayingFeatured(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setIsPlayingFeatured(true);
                }}
                className="group relative w-full h-full cursor-pointer select-none"
              >
                <img
                  src={`https://i.ytimg.com/vi/${featuredVideo.youtubeId}/maxresdefault.jpg`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('hqdefault.jpg')) {
                      target.src = `https://i.ytimg.com/vi/${featuredVideo.youtubeId}/hqdefault.jpg`;
                    }
                  }}
                  alt={featuredVideo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Measured Dark Scrim for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 transition-opacity group-hover:opacity-90" />

                {/* Center Neon Cyan Play Trigger */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.75)] transition-transform duration-200 group-hover:scale-110">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-950 ml-1" />
                  </div>
                  <span className="mt-3 text-xs sm:text-sm font-semibold text-white tracking-wide bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-md border border-white/15">
                    Click to Play Featured Video (16:9)
                  </span>
                </div>

                {/* Bottom Overlay Info Bar */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
                  <div>
                    <p className="text-xs text-cyan-300 font-mono-tabular">
                      {featuredVideo.category} · {featuredVideo.metrics || 'High-Retention Edit'}
                    </p>
                    <p className="text-sm sm:text-base font-semibold line-clamp-1">
                      {featuredVideo.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-300 shrink-0">
                    <span>Play Inline</span>
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
