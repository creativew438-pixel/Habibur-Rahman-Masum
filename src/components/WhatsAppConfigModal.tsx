import React, { useState } from 'react';
import { X, MessageCircle, Check, ExternalLink } from 'lucide-react';
import { getWhatsAppConfig, saveWhatsAppConfig, buildWhatsAppUrl } from '../utils/whatsappConfig';

interface WhatsAppConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const WhatsAppConfigModal: React.FC<WhatsAppConfigModalProps> = ({
  isOpen,
  onClose,
  onSaved
}) => {
  const initial = getWhatsAppConfig();
  const [phone, setPhone] = useState(initial.phoneNumber);
  const [message, setMessage] = useState(initial.defaultMessage);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveWhatsAppConfig(phone, message);
    setSavedNotice(true);
    onSaved();
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#0c1112] border border-white/15 text-white p-6 sm:p-7 space-y-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-mono-tabular text-lime-400">
              Direct WhatsApp Integration
            </p>
            <h3 className="font-display text-lg font-bold">
              Connect Your WhatsApp Number
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              WhatsApp Number (with Country Code, e.g. 88017XXXXXXXX)
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="88017XXXXXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm font-mono-tabular text-white focus:outline-none focus:border-lime-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Enter digits only including country code (Bangladesh: 880).
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Default Pre-filled Greeting Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-lime-400"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              {savedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Connected!</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  <span>Save & Connect</span>
                </>
              )}
            </button>

            <a
              href={buildWhatsAppUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => saveWhatsAppConfig(phone, message)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:border-lime-400/50 text-xs font-semibold text-lime-300 whitespace-nowrap"
            >
              <span>Test Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
