import React, { useState, useRef } from 'react';
import {
  Play,
  MessageCircle,
  Settings2,
  ExternalLink,
  Video,
  Camera,
  ArrowDownRight
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { VideoProject } from '../types';
import { buildWhatsAppUrl, isCustomWhatsAppConfigured } from '../utils/whatsappConfig';
import { getCustomAvatar, saveCustomAvatar } from '../utils/graphicManager';

interface HeroSectionProps {
  isDark: boolean;
  featuredVideo: VideoProject;
  onOpenWhatsAppModal: () => void;
  onOpenVideoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDark,
  featuredVideo,
  onOpenWhatsAppModal,
  onOpenVideoModal
}) => {
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);
  const [customAvatar, setCustomAvatar] = useState<string | null>(() => getCustomAvatar());
  const [imgSrc, setImgSrc] = useState<string>(customAvatar || PROFILE_DATA.avatarSrc);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarError = () => {
    if (imgSrc !== PROFILE_DATA.avatarFallbackSrc) {
      setImgSrc(PROFILE_DATA.avatarFallbackSrc);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        saveCustomAvatar(reader.result);
        setCustomAvatar(reader.result);
        setImgSrc(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const scrollToFeaturedAndPlay = () => {
    setIsPlayingFeatured(true);
    const el = document.getElementById('featured-video-player');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const whatsappConfigured = isCustomWhatsAppConfigured();

  return (
    <section id="top" className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 overflow-hidden">
      {/* Subtle Parrot Green Ambient Glow */}
      <div
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[760px] h-[340px] rounded-full blur-[130px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(163, 230, 53, 0.45) 0%, rgba(132, 204, 22, 0.1) 60%, transparent 100%)'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* PART 1 (TOP PRIORITY): PROFILE PICTURE & INFORMATION RIGHT BESIDE IT */}
        <div
          className={`relative rounded-2xl p-6 sm:p-8 lg:p-10 border transition-colors ${
            isDark
              ? 'bg-[#0b0f10]/90 border-white/[0.08]'
              : 'bg-white border-slate-200/90 shadow-sm'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Profile Photo with Glowing Neon Parrot-Green Border */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <div className="relative group">
                {/* Ambient Parrot Green Halo behind Avatar */}
                <div
                  className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-lime-400/40 via-lime-300/25 to-emerald-400/30 blur-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />

                {/* Neon Parrot-Green Glowing Frame */}
                <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-2 border-lime-400 profile-parrot-glow bg-slate-900">
                  <img
                    src={imgSrc}
                    alt={PROFILE_DATA.name}
                    onError={handleAvatarError}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Quick button to let user change/upload their local profile.jpg anytime */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload your profile.jpg photo"
                    className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-slate-950/85 text-lime-300 border border-lime-400/40 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity whitespace-nowrap"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Photo</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Availability Status Indicator below Avatar */}
              <div className="mt-4 flex items-center gap-2 text-xs font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-400" />
                </span>
                <span className={isDark ? 'text-lime-300' : 'text-lime-700 font-semibold'}>
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

            {/* Right Column: Name, Role ("Video Editor & Graphic Designer"), Bio & Actions */}
            <div className="lg:col-span-8 text-center lg:text-left space-y-5">
              <div className="space-y-2">
                <p
                  className={`text-xs font-mono-tabular tracking-wider uppercase ${
                    isDark ? 'text-lime-400' : 'text-lime-700 font-semibold'
                  }`}
                >
                  Creative Portfolio · Visual Storytelling & Motion
                </p>

                <h1
                  className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>
                    {PROFILE_DATA.name}
                  </span>
                </h1>

                {/* Role directly below Name as requested: "Video Editor & Graphic Designer" */}
                <p
                  className={`font-display text-lg sm:text-xl font-bold ${
                    isDark
                      ? 'bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-300 bg-clip-text text-transparent'
                      : 'text-lime-700'
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

              {/* Clean Unboxed Metadata for Core Disciplines (Zero-Pill Discipline) */}
              <div
                className={`flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1 text-xs font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {PROFILE_DATA.coreSkills.map((skill, idx) => (
                  <React.Fragment key={skill}>
                    <span className={idx === 0 ? (isDark ? 'text-lime-300' : 'text-lime-700 font-semibold') : ''}>
                      {skill}
                    </span>
                    {idx < PROFILE_DATA.coreSkills.length - 1 && (
                      <span className={isDark ? 'text-lime-500/50' : 'text-slate-400'} aria-hidden="true">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Key Performance Metrics */}
              <div
                className={`grid grid-cols-3 gap-4 pt-3 pb-2 border-y ${
                  isDark ? 'border-white/[0.07]' : 'border-slate-200'
                }`}
              >
                {PROFILE_DATA.metrics.map((metric) => (
                  <div key={metric.label} className="text-center lg:text-left">
                    <div
                      className={`font-mono-tabular text-base sm:text-xl font-bold ${
                        isDark ? 'text-lime-300' : 'text-lime-700'
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

              {/* Action Buttons (NO Email here as requested — Email is only in the bottom Contact section) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  type="button"
                  onClick={scrollToFeaturedAndPlay}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-lime-400 text-slate-950 hover:bg-lime-300 transition-all shadow-lg shadow-lime-400/20 whitespace-nowrap cursor-pointer"
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
                      ? 'border-lime-400/40 bg-lime-400/10 text-lime-300 hover:bg-lime-400/20'
                      : 'border-lime-600/40 bg-lime-50 text-lime-800 hover:bg-lime-100'
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
                      ? 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-lime-400/40 hover:text-lime-300'
                      : 'border-slate-300 bg-slate-100 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <Settings2 className="w-3.5 h-3.5 text-lime-400" />
                  <span>{whatsappConfigured ? 'Update WhatsApp' : 'Connect My WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenVideoModal}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap cursor-pointer ${
                    isDark
                      ? 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-lime-400/40 hover:text-lime-300'
                      : 'border-slate-300 bg-slate-100 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-lime-400" />
                  <span>Add My Videos</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2 (RIGHT BELOW PROFILE): FEATURED VIDEO EDIT IN 16:9 CINEMA CONTAINER */}
        <div id="featured-video-player" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div
                className={`flex items-center gap-2 text-xs font-mono-tabular ${
                  isDark ? 'text-lime-400' : 'text-lime-700 font-semibold'
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
                  isDark ? 'text-slate-400 hover:text-lime-300' : 'text-slate-600 hover:text-lime-700'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-lime-400" />
                <span>Change Featured Video</span>
              </button>

              <a
                href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 transition-colors whitespace-nowrap ${
                  isDark ? 'text-lime-300 hover:text-lime-200' : 'text-lime-700 hover:text-lime-800'
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
                ? 'bg-[#090d0e] border-lime-400/30 shadow-[0_20px_70px_-15px_rgba(163,230,53,0.18)]'
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

                {/* Center Neon Parrot Play Trigger */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center shadow-[0_0_40px_rgba(163,230,53,0.75)] transition-transform duration-200 group-hover:scale-110">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-950 ml-1" />
                  </div>
                  <span className="mt-3 text-xs sm:text-sm font-semibold text-white tracking-wide bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-md border border-white/15">
                    Click to Play Featured Video (16:9)
                  </span>
                </div>

                {/* Bottom Overlay Info Bar */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
                  <div>
                    <p className="text-xs text-lime-300 font-mono-tabular">
                      {featuredVideo.category} · {featuredVideo.metrics || 'High-Retention Edit'}
                    </p>
                    <p className="text-sm sm:text-base font-semibold line-clamp-1">
                      {featuredVideo.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-lime-300 shrink-0">
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
