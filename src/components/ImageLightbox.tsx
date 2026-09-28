import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { GraphicProject } from '../types';

interface ImageLightboxProps {
  items: GraphicProject[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && items.length > 1) {
        onNavigate((currentIndex + 1) % items.length);
      }
      if (e.key === 'ArrowLeft' && items.length > 1) {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 text-white z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-xs font-mono-tabular text-lime-400">
            0{currentIndex + 1} / 0{items.length} · {currentItem.category}
          </p>
          <h3 className="font-display text-lg sm:text-xl font-bold">
            {currentItem.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            {zoomed ? <ZoomOut className="w-4 h-4 text-lime-300" /> : <ZoomIn className="w-4 h-4 text-lime-300" />}
            <span>{zoomed ? 'Fit Screen' : 'Zoom'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-lime-400 hover:bg-lime-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Close (Esc)</span>
          </button>
        </div>
      </div>

      {/* Main Image Viewer */}
      <div
        className="relative flex-1 flex items-center justify-center my-4 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {items.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-black/70 border border-white/15 text-white hover:border-lime-400 hover:text-lime-300 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <img
          src={currentItem.src}
          alt={currentItem.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== currentItem.fallbackSrc) {
              target.src = currentItem.fallbackSrc;
            }
          }}
          onClick={() => setZoomed((z) => !z)}
          className={`rounded-xl border border-white/15 shadow-2xl transition-transform duration-300 cursor-zoom-in ${
            zoomed ? 'scale-125 cursor-zoom-out max-h-[85vh]' : 'max-h-[74vh] w-auto object-contain'
          }`}
        />

        {items.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate((currentIndex + 1) % items.length)}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-black/70 border border-white/15 text-white hover:border-lime-400 hover:text-lime-300 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Caption */}
      <div
        className="max-w-3xl w-full mx-auto text-center space-y-1 text-slate-300 text-xs sm:text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <p>{currentItem.description}</p>
      </div>
    </div>
  );
};
