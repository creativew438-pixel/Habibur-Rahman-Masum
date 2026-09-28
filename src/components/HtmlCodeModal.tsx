import React, { useState } from 'react';
import { X, Copy, Check, Download } from 'lucide-react';
import {
  PROFILE_DATA,
  FEATURED_VIDEO,
  VIDEO_PROJECTS,
  REEL_PROJECTS
} from '../data/portfolioData';

interface HtmlCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function generateStandaloneHtml(): string {
  const videoCardsHtml = VIDEO_PROJECTS.map(
    (v, i) => `
        <!-- 16:9 Widescreen Video Card ${i + 1} -->
        <article class="rounded-2xl overflow-hidden border border-white/10 bg-[#0b0f10] hover:border-lime-400/60 transition-all flex flex-col">
          <div class="w-full aspect-video bg-black">
            <iframe
              class="w-full h-full border-0"
              src="https://www.youtube.com/embed/${v.youtubeId}?rel=0&modestbranding=1"
              title="${v.title}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="p-5 space-y-2">
            <div class="text-xs font-mono text-lime-400">0${i + 1} · ${v.category} · 16:9 Widescreen</div>
            <h3 class="text-lg font-bold">${v.title}</h3>
            <p class="text-xs text-slate-400 leading-relaxed">${v.description}</p>
          </div>
        </article>`
  ).join('\n');

  const reelCardsHtml = REEL_PROJECTS.map(
    (r, i) => `
        <!-- 9:16 Vertical Reel Card ${i + 1} -->
        <article class="rounded-2xl overflow-hidden border border-white/10 bg-[#0b0f10] hover:border-lime-400/60 transition-all flex flex-col">
          <div class="w-full aspect-[9/16] bg-black">
            <iframe
              class="w-full h-full border-0"
              src="https://www.youtube.com/embed/${r.youtubeId}?rel=0&modestbranding=1&playsinline=1"
              title="${r.title}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="p-4 space-y-1">
            <div class="text-xs font-mono text-lime-400">0${i + 1} · ${r.category} · 9:16 Vertical</div>
            <h3 class="text-sm font-bold">${r.title}</h3>
          </div>
        </article>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${PROFILE_DATA.name} — ${PROFILE_DATA.role}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'sans-serif'],
            display: ['Syne', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
          }
        }
      }
    };
  </script>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
  <style>
    @keyframes parrotPulseGlow {
      0%, 100% {
        box-shadow: 0 0 18px rgba(163, 230, 53, 0.55), 0 0 38px rgba(132, 204, 22, 0.32);
        border-color: rgba(163, 230, 53, 0.9);
      }
      50% {
        box-shadow: 0 0 28px rgba(190, 242, 100, 0.85), 0 0 56px rgba(163, 230, 53, 0.48);
        border-color: rgba(217, 249, 157, 1);
      }
    }
    .profile-parrot-glow {
      animation: parrotPulseGlow 3.2s ease-in-out infinite;
    }
    @keyframes ellipseOrbitCw {
      0% { transform: rotate(0deg) scaleX(1.08) scaleY(0.93); }
      50% { transform: rotate(180deg) scaleX(0.94) scaleY(1.07); }
      100% { transform: rotate(360deg) scaleX(1.08) scaleY(0.93); }
    }
    @keyframes ellipseOrbitCcw {
      0% { transform: rotate(360deg) scaleX(0.93) scaleY(1.08); }
      50% { transform: rotate(180deg) scaleX(1.07) scaleY(0.94); }
      100% { transform: rotate(0deg) scaleX(0.93) scaleY(1.08); }
    }
    .ellipse-ring-1 { animation: ellipseOrbitCw 11s linear infinite; }
    .ellipse-ring-2 { animation: ellipseOrbitCcw 15s linear infinite; }
  </style>
</head>
<body class="bg-[#060809] text-[#f4f6f0] dark:bg-[#060809] dark:text-[#f4f6f0] transition-colors duration-300">
  <!-- Header -->
  <header class="sticky top-0 z-40 backdrop-blur-xl bg-[#060809]/85 border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <a href="#top" class="font-display font-bold text-lg hover:text-lime-400">${PROFILE_DATA.name}</a>
      <nav class="hidden md:flex items-center gap-6 text-sm text-slate-300">
        <a href="#videos" class="hover:text-lime-400">Video Edits</a>
        <a href="#reels" class="hover:text-lime-400">Shorts & Reels</a>
        <a href="#graphics" class="hover:text-lime-400">Graphic Design</a>
        <a href="#about" class="hover:text-lime-400">About</a>
        <a href="#contact" class="hover:text-lime-400">Contact</a>
      </nav>
      <button id="themeToggle" class="px-3.5 py-2 rounded-lg text-xs font-semibold border border-lime-400/40 bg-lime-400/10 text-lime-300">
        Toggle Theme
      </button>
    </div>
  </header>

  <main id="top" class="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
    <!-- 1. Hero Section: Profile Card First, Featured 16:9 Video Below -->
    <section class="space-y-12">
      <div class="rounded-2xl p-6 sm:p-10 border border-white/10 bg-[#0b0f10] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-4 flex flex-col items-center">
          <div class="relative p-4 flex items-center justify-center">
            <div class="pointer-events-none absolute -inset-1 rounded-full border border-lime-400/45 ellipse-ring-1"></div>
            <div class="pointer-events-none absolute -inset-3 rounded-full border border-dashed border-lime-300/35 ellipse-ring-2"></div>
            <div class="relative w-52 h-52 rounded-full overflow-hidden border-2 border-lime-400 profile-parrot-glow bg-slate-900 z-10">
              <img src="profile.jpg" onerror="this.src='https://i.postimg.cc/QChw3cNG/3751-Habibur-Rahman-Masum.jpg'" alt="${PROFILE_DATA.name}" class="w-full h-full object-cover" />
            </div>
          </div>
          <p class="mt-3 text-xs text-lime-300 font-mono">● Available for Projects</p>
        </div>
        <div class="lg:col-span-8 space-y-4 text-center lg:text-left">
          <h1 class="font-display text-3xl sm:text-5xl font-extrabold">${PROFILE_DATA.name}</h1>
          <p class="font-display text-xl font-bold text-lime-400">${PROFILE_DATA.role}</p>
          <p class="text-sm sm:text-base text-slate-300 max-w-2xl">${PROFILE_DATA.shortGreeting}</p>
          <div class="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
            <a href="#featured-video" class="px-5 py-2.5 rounded-xl bg-lime-400 text-slate-950 font-bold text-xs sm:text-sm">Watch Main Video Below</a>
            <a href="#contact" class="px-5 py-2.5 rounded-xl border border-lime-400/40 text-lime-300 font-semibold text-xs sm:text-sm">WhatsApp & Contact</a>
          </div>
        </div>
      </div>

      <!-- Featured 16:9 Video Right Below Profile -->
      <div id="featured-video" class="max-w-4xl mx-auto space-y-3">
        <div class="text-xs font-mono text-lime-400">Featured Video Edit · 16:9 Widescreen</div>
        <div class="w-full aspect-video rounded-2xl overflow-hidden border border-lime-400/30 bg-black shadow-2xl">
          <iframe
            class="w-full h-full border-0"
            src="https://www.youtube.com/embed/${FEATURED_VIDEO.youtubeId}?rel=0&modestbranding=1"
            title="${FEATURED_VIDEO.title}"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <!-- 2. Video Edits Section (Strictly 16:9 Widescreen Frames) -->
    <section id="videos" class="space-y-8 pt-8 border-t border-white/10">
      <div>
        <p class="text-xs font-mono text-lime-400">01. Selected Video Edits · 16:9 Widescreen</p>
        <h2 class="font-display text-3xl font-extrabold mt-1">Video Edits & Motion Showcase</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
${videoCardsHtml}
      </div>
    </section>

    <!-- 3. Shorts & Reels Showcase Section (Dedicated 9:16 Vertical Section Right Below Video Edits) -->
    <section id="reels" class="space-y-8 pt-8 border-t border-white/10">
      <div>
        <p class="text-xs font-mono text-lime-400">02. Shorts & Reels Showcase · Vertical 9:16 Format</p>
        <h2 class="font-display text-3xl font-extrabold mt-1">Shorts & Reels Showcase</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
${reelCardsHtml}
      </div>
    </section>

    <!-- 4. Graphic & Poster Designs (2 Unique Designs) -->
    <section id="graphics" class="space-y-8 pt-8 border-t border-white/10">
      <div>
        <p class="text-xs font-mono text-lime-400">03. Visual Design & Branding</p>
        <h2 class="font-display text-3xl font-extrabold mt-1">Graphic & Poster Designs</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="graphic-card cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-[#0b0f10]" data-src="https://postimg.cc/JDF5Dffw" data-title="Air Badr — Commercial Poster Design">
          <img src="https://postimg.cc/JDF5Dffw" onerror="this.src='graphic1.jpg'" alt="Air Badr — Commercial Poster Design" class="w-full aspect-[3/4] object-cover" />
          <div class="p-4">
            <h3 class="font-bold">Air Badr — Commercial Poster Design</h3>
            <p class="text-xs text-slate-400">Brand Campaign & Product Poster</p>
          </div>
        </div>
        <div class="graphic-card cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-[#0b0f10]" data-src="https://postimg.cc/YGPzG55w" data-title="Nike Shoes — Dynamic Brand Visual">
          <img src="https://postimg.cc/YGPzG55w" onerror="this.src='graphic2.jpg'" alt="Nike Shoes — Dynamic Brand Visual" class="w-full aspect-[3/4] object-cover" />
          <div class="p-4">
            <h3 class="font-bold">Nike Shoes — Dynamic Brand Visual</h3>
            <p class="text-xs text-slate-400">Sports & Footwear Advertising</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Detailed About Me -->
    <section id="about" class="space-y-4 pt-8 border-t border-white/10">
      <p class="text-xs font-mono text-lime-400">04. About Me</p>
      <h2 class="font-display text-3xl font-extrabold">About ${PROFILE_DATA.name}</h2>
      <blockquote class="p-6 rounded-2xl bg-[#0b0f10] border-l-4 border-lime-400 text-slate-200 leading-relaxed">
        "${PROFILE_DATA.bio}"
      </blockquote>
    </section>

    <!-- 6. Get in Touch / Direct Contact Channels -->
    <section id="contact" class="space-y-6 pt-8 border-t border-white/10">
      <p class="text-xs font-mono text-lime-400">05. Get in Touch · Direct Contact Channels</p>
      <h2 class="font-display text-3xl font-extrabold">Let's Work Together</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="mailto:${PROFILE_DATA.email}" class="p-4 rounded-2xl border border-white/10 bg-[#0b0f10] hover:border-lime-400">
          <div class="text-xs font-mono text-lime-400">Email</div>
          <div class="text-sm font-bold truncate mt-1">${PROFILE_DATA.email}</div>
        </a>
        <a href="${PROFILE_DATA.socials.youtube}" target="_blank" rel="noopener noreferrer" class="p-4 rounded-2xl border border-white/10 bg-[#0b0f10] hover:border-lime-400">
          <div class="text-xs font-mono text-lime-400">YouTube Channel</div>
          <div class="text-sm font-bold mt-1">Perfect Zone Studio</div>
        </a>
        <a href="${PROFILE_DATA.socials.behance}" target="_blank" rel="noopener noreferrer" class="p-4 rounded-2xl border border-white/10 bg-[#0b0f10] hover:border-lime-400">
          <div class="text-xs font-mono text-lime-400">Behance Portfolio</div>
          <div class="text-sm font-bold mt-1">behance.net/habibzone</div>
        </a>
        <a href="${PROFILE_DATA.socials.facebook}" target="_blank" rel="noopener noreferrer" class="p-4 rounded-2xl border border-white/10 bg-[#0b0f10] hover:border-lime-400">
          <div class="text-xs font-mono text-lime-400">Facebook Profile</div>
          <div class="text-sm font-bold mt-1">Masum Bin Aman</div>
        </a>
      </div>
    </section>
  </main>
</body>
</html>`;
}

export const HtmlCodeModal: React.FC<HtmlCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlCode = generateStandaloneHtml();

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'habibur-rahman-masum-portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-[#0c1112] border border-white/15 text-white p-6 space-y-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-mono-tabular text-lime-400">
              Single-File HTML Export (Tailwind CDN + Vanilla JS)
            </p>
            <h3 className="font-display text-lg font-bold">
              Standalone Portfolio HTML Code
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 text-xs font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .html</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <pre className="w-full max-h-[65vh] overflow-auto rounded-xl bg-black/80 border border-white/10 p-4 text-xs font-mono-tabular text-slate-300 leading-relaxed">
          <code>{htmlCode}</code>
        </pre>
      </div>
    </div>
  );
};
