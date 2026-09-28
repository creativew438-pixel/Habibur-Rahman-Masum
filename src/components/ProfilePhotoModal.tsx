import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Trash2,
  Check,
  ZoomIn,
  Move,
  Maximize,
  Image as ImageIcon
} from 'lucide-react';
import {
  ProfilePhotoConfig,
  DEFAULT_PROFILE_PHOTO_CONFIG,
  processUploadedImageFile
} from '../utils/graphicManager';

interface ProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProfilePhotoConfig;
  onSaveConfig: (newConfig: ProfilePhotoConfig) => void;
  onClearPhoto: () => void;
}

export const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onClearPhoto
}) => {
  const [draft, setDraft] = useState<ProfilePhotoConfig>(config);
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsProcessing(true);
    setStatusMsg('');
    try {
      const optimizedDataUrl = await processUploadedImageFile(file, 1000);
      setDraft((prev) => ({
        ...prev,
        src: optimizedDataUrl
      }));
      setStatusMsg('আপনার আসল ছবি লোড হয়েছে! নিচে পজিশন বা জুম ঠিক করে Save চাপুন।');
    } catch {
      setStatusMsg('ছবি লোড করতে সমস্যা হয়েছে, অনুগ্রহ করে অন্য একটি ফাইল চেষ্টা করুন।');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setDraft((prev) => ({
      ...prev,
      src: urlInput.trim()
    }));
    setUrlInput('');
    setStatusMsg('ছবির লিংক যুক্ত হয়েছে! এখন Save & Apply চাপুন।');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(draft);
    onClose();
  };

  const handleRemove = () => {
    setDraft(DEFAULT_PROFILE_PHOTO_CONFIG);
    onClearPhoto();
    setStatusMsg('প্রোফাইল ছবি মুছে ফেলা হয়েছে।');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#0c1112] border border-white/15 text-white p-6 sm:p-7 space-y-6 my-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-mono-tabular text-lime-400">
              Original Profile Photo Uploader · No AI Modification
            </p>
            <h3 className="font-display text-lg sm:text-xl font-bold">
              আপনার নিজের প্রোফাইল ছবি আপলোড করুন
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

        <form onSubmit={handleSave} className="space-y-5">
          {/* Live Preview & Upload Area */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Live Preview Box in Neon Parrot Frame */}
            <div className="sm:col-span-5 flex flex-col items-center">
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-lime-400 profile-parrot-glow bg-slate-950 flex items-center justify-center">
                {draft.src ? (
                  <img
                    src={draft.src}
                    alt="Profile Preview"
                    className="w-full h-full transition-transform duration-150"
                    style={{
                      objectFit: draft.objectFit,
                      objectPosition: `${draft.posX}% ${draft.posY}%`,
                      transform: `scale(${draft.zoom})`
                    }}
                  />
                ) : (
                  <div className="text-center p-4 space-y-2">
                    <ImageIcon className="w-8 h-8 text-lime-400 mx-auto opacity-80" />
                    <p className="text-xs text-slate-300 font-medium">
                      কোনো ছবি দেওয়া নেই
                    </p>
                  </div>
                )}
              </div>
              <span className="mt-2 text-[11px] font-mono-tabular text-lime-300">
                Live Frame Preview
              </span>
            </div>

            {/* File Picker & URL Input */}
            <div className="sm:col-span-7 space-y-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-lime-400/50 hover:border-lime-400 rounded-xl p-4 text-center cursor-pointer bg-lime-400/[0.04] hover:bg-lime-400/[0.08] transition-colors"
              >
                <Upload className="w-6 h-6 text-lime-400 mx-auto mb-1.5" />
                <p className="text-xs sm:text-sm font-bold text-white">
                  {isProcessing
                    ? 'ছবি প্রসেস হচ্ছে...'
                    : 'কম্পিউটার বা ফোন থেকে ছবি সিলেক্ট করুন'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  আপনার আসল ছবি হুবহু আপলোড হবে (JPG, PNG, WebP)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Optional Direct Image Link */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-300">
                  অথবা সরাসরি ছবির লিংক (Direct Image URL) দিন:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://i.postimg.cc/... বা profile.jpg"
                    className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-lime-400"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-lime-300 cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Framing & Position Controls (Only shown when a photo is loaded) */}
          {draft.src && (
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-lime-300 flex items-center gap-1.5">
                  <Maximize className="w-3.5 h-3.5" />
                  <span>ছবির সাইজ ও পজিশন আপনার মতো সেট করুন</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDraft((prev) => ({ ...prev, objectFit: 'cover' }))}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                      draft.objectFit === 'cover'
                        ? 'bg-lime-400 text-slate-950'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    Fill Frame (Cover)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft((prev) => ({
                        ...prev,
                        objectFit: 'contain',
                        zoom: 1,
                        posX: 50,
                        posY: 50
                      }))
                    }
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                      draft.objectFit === 'contain'
                        ? 'bg-lime-400 text-slate-950'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    Full Photo (No Crop)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                    <span className="flex items-center gap-1">
                      <ZoomIn className="w-3 h-3 text-lime-400" /> Zoom
                    </span>
                    <span className="font-mono-tabular">{Math.round(draft.zoom * 100)}%</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="1.8"
                    step="0.05"
                    value={draft.zoom}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, zoom: parseFloat(e.target.value) }))
                    }
                    className="w-full accent-lime-400 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                    <span className="flex items-center gap-1">
                      <Move className="w-3 h-3 text-lime-400" /> Up / Down
                    </span>
                    <span className="font-mono-tabular">{draft.posY}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={draft.posY}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, posY: parseInt(e.target.value, 10) }))
                    }
                    className="w-full accent-lime-400 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                    <span className="flex items-center gap-1">
                      <Move className="w-3 h-3 text-lime-400" /> Left / Right
                    </span>
                    <span className="font-mono-tabular">{draft.posX}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={draft.posX}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, posX: parseInt(e.target.value, 10) }))
                    }
                    className="w-full accent-lime-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {statusMsg && (
            <p className="text-xs text-lime-300 font-medium bg-lime-400/10 border border-lime-400/30 rounded-xl px-3.5 py-2">
              {statusMsg}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            {draft.src ? (
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove Photo (ছবি মুছে ফেলুন)</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Photo</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
