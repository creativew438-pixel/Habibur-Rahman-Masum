import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  Settings2,
  Send
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { buildWhatsAppUrl, isCustomWhatsAppConfigured } from '../utils/whatsappConfig';

interface ContactSectionProps {
  isDark: boolean;
  onOpenWhatsAppModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isDark,
  onOpenWhatsAppModal
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [clientName, setClientName] = useState('');
  const [projectType, setProjectType] = useState('16:9 YouTube Video Edit');
  const [projectDetails, setProjectDetails] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleQuickInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Habibur! My name is ${clientName || 'a prospective client'}.\nProject Type: ${projectType}\nDetails: ${
      projectDetails || 'I would love to discuss a project with you.'
    }`;
    const url = buildWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const whatsappConfigured = isCustomWhatsAppConfigured();

  return (
    <section
      id="contact"
      className={`py-16 sm:py-20 border-t ${
        isDark ? 'border-cyan-300/[0.09]' : 'border-slate-200/90'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div
            className={`flex items-center gap-2 text-xs font-mono-tabular ${
              isDark ? 'text-cyan-400' : 'text-cyan-700 font-semibold'
            }`}
          >
            <span>07. Get in Touch</span>
            <span aria-hidden="true">·</span>
            <span>Direct Contact Channels</span>
          </div>

          <h2
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Let's Create Something Memorable Together
          </h2>

          <p className={`text-sm sm:text-base max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Reach out directly via Email, WhatsApp, or inspect my latest uploads across YouTube, Behance, and Facebook.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Direct Contact Channels (Email, WhatsApp, YouTube, Behance, Facebook) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-display text-base font-bold">
              Direct Contact Channels
            </h3>

            {/* 1. Email Card (Placed strictly here in the bottom Contact section as requested) */}
            <div
              className={`rounded-2xl p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDark
                  ? 'bg-[#08151b]/90 border-cyan-300/[0.1]'
                  : 'bg-white border-slate-200/90 shadow-sm'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="text-xs font-mono-tabular text-cyan-400">
                  Direct Email Address
                </div>
                <p className="font-mono-tabular text-sm sm:text-base font-bold truncate">
                  {PROFILE_DATA.email}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
                    copiedEmail
                      ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300'
                      : isDark
                      ? 'border-cyan-300/20 bg-white/[0.04] text-slate-200 hover:border-cyan-400/50'
                      : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PROFILE_DATA.email}?subject=Video%20Editing%20%2F%20Graphic%20Design%20Inquiry`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors whitespace-nowrap"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>

            {/* 2. WhatsApp Direct Card + Connect Trigger */}
            <div
              className={`rounded-2xl p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDark
                  ? 'bg-[#08151b]/90 border-cyan-300/[0.1]'
                  : 'bg-white border-slate-200/90 shadow-sm'
              }`}
            >
              <div className="space-y-1">
                <div className="text-xs font-mono-tabular text-cyan-400">
                  WhatsApp Direct Messenger
                </div>
                <p className="font-display text-base font-bold">
                  Chat Directly on WhatsApp
                </p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Fastest response for project briefs, raw footage links, and timelines.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onOpenWhatsAppModal}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap cursor-pointer ${
                    isDark
                      ? 'border-cyan-300/20 bg-white/[0.04] text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300'
                      : 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Settings2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{whatsappConfigured ? 'Change Number' : 'Connect WhatsApp'}</span>
                </button>

                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Message Now</span>
                </a>
              </div>
            </div>

            {/* 3. Social & Portfolio Channels Grid: YouTube, Behance, Facebook */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {/* YouTube Channel Card */}
              <a
                href={PROFILE_DATA.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                  isDark
                    ? 'bg-[#08151b]/90 border-cyan-300/[0.1] hover:border-cyan-400/50'
                    : 'bg-white border-slate-200/90 hover:border-cyan-600/50 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tabular text-cyan-400">YouTube Channel</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold group-hover:text-cyan-300 transition-colors">
                    Perfect Zone Studio
                  </p>
                  <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {PROFILE_DATA.socials.youtubeHandle}
                  </p>
                </div>
              </a>

              {/* Behance Portfolio Card */}
              <a
                href={PROFILE_DATA.socials.behance}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                  isDark
                    ? 'bg-[#08151b]/90 border-cyan-300/[0.1] hover:border-cyan-400/50'
                    : 'bg-white border-slate-200/90 hover:border-cyan-600/50 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tabular text-cyan-400">Behance Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold group-hover:text-cyan-300 transition-colors">
                    Bē · Habibur Zone
                  </p>
                  <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {PROFILE_DATA.socials.behanceHandle}
                  </p>
                </div>
              </a>

              {/* Facebook Profile Card */}
              <a
                href={PROFILE_DATA.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                  isDark
                    ? 'bg-[#08151b]/90 border-cyan-300/[0.1] hover:border-cyan-400/50'
                    : 'bg-white border-slate-200/90 hover:border-cyan-600/50 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tabular text-cyan-400">Facebook Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold group-hover:text-cyan-300 transition-colors">
                    Masum Bin Aman
                  </p>
                  <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {PROFILE_DATA.socials.facebookHandle}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Quick Project Brief Form */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleQuickInquirySubmit}
              className={`rounded-2xl p-6 sm:p-7 border space-y-4 ${
                isDark
                  ? 'bg-[#08151b]/90 border-cyan-300/[0.1]'
                  : 'bg-white border-slate-200/90 shadow-sm'
              }`}
            >
              <div>
                <p className="text-xs font-mono-tabular text-cyan-400">Quick Project Brief</p>
                <h3 className="font-display text-lg font-bold mt-0.5">
                  Start a Conversation
                </h3>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Your Name or Brand
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter your name"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-cyan-400 ${
                    isDark
                      ? 'bg-[#050e12]/80 border-cyan-300/20 text-white placeholder:text-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  What Do You Need Edited or Designed?
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-cyan-400 ${
                    isDark
                      ? 'bg-[#050e12]/80 border-cyan-300/20 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="16:9 YouTube Video Edit">16:9 YouTube Video Edit</option>
                  <option value="9:16 Shorts / Reels Editing">9:16 Shorts / Reels Editing</option>
                  <option value="Motion Graphics & Animation">Motion Graphics & Animation</option>
                  <option value="Commercial Poster / Graphic Design">Commercial Poster / Graphic Design</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Project Details or Reference Link
                </label>
                <textarea
                  rows={3}
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="Tell me about your footage, style, or deadline..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-cyan-400 ${
                    isDark
                      ? 'bg-[#050e12]/80 border-cyan-300/20 text-white placeholder:text-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Project Brief via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
