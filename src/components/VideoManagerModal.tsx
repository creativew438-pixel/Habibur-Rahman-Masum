import React, { useState } from 'react';
import { X, Plus, Trash2, RotateCcw, Video, Smartphone, Check } from 'lucide-react';
import { VideoProject } from '../types';
import { extractYouTubeId, isShortsUrl } from '../utils/videoManager';

interface VideoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  featuredVideo: VideoProject;
  videos16x9: VideoProject[];
  reels9x16: VideoProject[];
  onUpdateFeatured: (video: VideoProject) => void;
  onUpdateVideos16x9: (videos: VideoProject[]) => void;
  onUpdateReels9x16: (reels: VideoProject[]) => void;
  onResetAll: () => void;
}

export const VideoManagerModal: React.FC<VideoManagerModalProps> = ({
  isOpen,
  onClose,
  featuredVideo,
  videos16x9,
  reels9x16,
  onUpdateFeatured,
  onUpdateVideos16x9,
  onUpdateReels9x16,
  onResetAll
}) => {
  const [activeTab, setActiveTab] = useState<'16:9' | '9:16' | 'featured'>('16:9');
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Motion & Animation');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [featuredUrlInput, setFeaturedUrlInput] = useState(
    `https://youtu.be/${featuredVideo.youtubeId}`
  );
  const [featuredTitleInput, setFeaturedTitleInput] = useState(featuredVideo.title);
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const showTemporaryStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 2500);
  };

  const handleSaveFeatured = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYouTubeId(featuredUrlInput);
    if (!id) {
      showTemporaryStatus('Please enter a valid YouTube link or 11-character Video ID.');
      return;
    }
    onUpdateFeatured({
      ...featuredVideo,
      youtubeId: id,
      title: featuredTitleInput.trim() || featuredVideo.title,
      aspectRatio: '16:9'
    });
    showTemporaryStatus('Featured 16:9 video updated!');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYouTubeId(urlInput);
    if (!id) {
      showTemporaryStatus('Invalid YouTube URL. Paste a valid https://youtu.be/... or Shorts link.');
      return;
    }

    const targetFormat = activeTab === '9:16' || isShortsUrl(urlInput) ? '9:16' : '16:9';

    const newItem: VideoProject = {
      id: `custom-${Date.now()}`,
      youtubeId: id,
      title:
        titleInput.trim() ||
        (targetFormat === '9:16' ? 'Custom Vertical Reel Edit' : 'Custom Widescreen Video Edit'),
      category:
        categoryInput.trim() || (targetFormat === '9:16' ? 'Vertical Short' : 'Motion & Animation'),
      description:
        descriptionInput.trim() ||
        (targetFormat === '9:16'
          ? 'Vertical 9:16 short-form edit with dynamic pacing and sound design.'
          : 'Horizontal 16:9 video edit crafted with clean transitions and rhythmic pacing.'),
      aspectRatio: targetFormat,
      resolution: targetFormat === '9:16' ? '1080×1920 · 9:16' : '1080p · 60FPS · 16:9',
      tools: ['Premiere Pro', 'After Effects']
    };

    if (targetFormat === '9:16') {
      onUpdateReels9x16([newItem, ...reels9x16]);
      showTemporaryStatus('Added to 9:16 Shorts & Reels Showcase!');
    } else {
      onUpdateVideos16x9([newItem, ...videos16x9]);
      showTemporaryStatus('Added to 16:9 Video Edits Grid!');
    }

    setUrlInput('');
    setTitleInput('');
    setDescriptionInput('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#0c1112] border border-white/15 text-white p-6 sm:p-8 space-y-6 my-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-mono-tabular text-lime-400">
              Portfolio Video & Reel Manager
            </p>
            <h3 className="font-display text-xl font-bold">
              Manage 16:9 Video Edits & 9:16 Reels
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1 rounded-xl bg-black/50 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('16:9')}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === '16:9'
                ? 'bg-lime-400 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>16:9 Video Edits ({videos16x9.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('9:16')}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === '9:16'
                ? 'bg-lime-400 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>9:16 Shorts & Reels ({reels9x16.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('featured')}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'featured'
                ? 'bg-lime-400 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Main Featured Video</span>
          </button>
        </div>

        {statusMessage && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lime-400/15 border border-lime-400/40 text-lime-300 text-xs font-semibold">
            <Check className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {activeTab === 'featured' ? (
          <form onSubmit={handleSaveFeatured} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Main Featured Video YouTube Link (16:9)
              </label>
              <input
                type="text"
                value={featuredUrlInput}
                onChange={(e) => setFeaturedUrlInput(e.target.value)}
                placeholder="https://youtu.be/pRiaoBN6bPU"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Featured Title
              </label>
              <input
                type="text"
                value={featuredTitleInput}
                onChange={(e) => setFeaturedTitleInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Save Featured Video
            </button>
          </form>
        ) : (
          <>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    YouTube Link or Video ID *
                  </label>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder={
                      activeTab === '9:16'
                        ? 'https://youtube.com/shorts/...'
                        : 'https://youtu.be/...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    placeholder={
                      activeTab === '9:16'
                        ? 'e.g. Viral Kinetic Reel'
                        : 'e.g. Cinematic Documentary Cut'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    placeholder="Motion & Animation"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    placeholder="Brief note about editing style..."
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {activeTab === '9:16'
                    ? 'Add to 9:16 Shorts & Reels Showcase'
                    : 'Add to 16:9 Video Edits Grid'}
                </span>
              </button>
            </form>

            {/* Current Items List */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  {activeTab === '9:16'
                    ? `Current 9:16 Vertical Reels (${reels9x16.length})`
                    : `Current 16:9 Widescreen Videos (${videos16x9.length})`}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onResetAll();
                    showTemporaryStatus('Restored default 5 Widescreen Videos & 4 Vertical Reels!');
                  }}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-lime-300 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Default</span>
                </button>
              </div>

              <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                {(activeTab === '9:16' ? reels9x16 : videos16x9).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/10"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-14 h-9 object-cover rounded bg-slate-900 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{item.title}</p>
                        <p className="text-[11px] font-mono-tabular text-lime-400">
                          {item.aspectRatio} · ID: {item.youtubeId}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === '9:16') {
                          onUpdateReels9x16(reels9x16.filter((r) => r.id !== item.id));
                        } else {
                          onUpdateVideos16x9(videos16x9.filter((v) => v.id !== item.id));
                        }
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
