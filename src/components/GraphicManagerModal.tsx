import React, { useState, useRef } from 'react';
import { X, Upload, Trash2, RotateCcw, Plus, Image as ImageIcon } from 'lucide-react';
import { GraphicProject } from '../types';
import { GRAPHIC_PROJECTS } from '../data/portfolioData';

interface GraphicManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  graphics: GraphicProject[];
  onSaveGraphics: (updated: GraphicProject[]) => void;
  onResetGraphics: () => void;
}

export const GraphicManagerModal: React.FC<GraphicManagerModalProps> = ({
  isOpen,
  onClose,
  graphics,
  onSaveGraphics,
  onResetGraphics
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Commercial Poster & Brand Visual');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg('');

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
        if (!title.trim()) {
          const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddDesign = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSrc = imagePreview || imageUrlInput.trim();
    if (!finalSrc) {
      setErrorMsg('Please select an image file from your computer or paste an image URL.');
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Please enter a title for your design.');
      return;
    }

    const newItem: GraphicProject = {
      id: Date.now(),
      src: finalSrc,
      localFilename: `graphic${graphics.length + 1}.jpg`,
      fallbackSrc: GRAPHIC_PROJECTS[0].fallbackSrc,
      title: title.trim(),
      category: category.trim() || 'Graphic Design',
      description:
        description.trim() ||
        'Custom graphic design and visual composition crafted with bold typography and studio lighting.',
      tools: ['Adobe Photoshop', 'Illustrator']
    };

    onSaveGraphics([...graphics, newItem]);
    setTitle('');
    setDescription('');
    setImagePreview('');
    setImageUrlInput('');
    setErrorMsg('');
  };

  const handleDelete = (id: number) => {
    const updated = graphics.filter((g) => g.id !== id);
    onSaveGraphics(updated);
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
              Offline File Uploader & Gallery Manager
            </p>
            <h3 className="font-display text-xl font-bold">
              Add / Upload Graphic Designs
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

        {/* Upload Form */}
        <form onSubmit={handleAddDesign} className="space-y-4">
          {/* Offline Computer File Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              1. Select Image from Computer / Phone (Offline Folder)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-lime-400/40 hover:border-lime-400 rounded-xl p-5 text-center cursor-pointer bg-lime-400/[0.03] transition-colors"
            >
              {imagePreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-auto object-contain rounded-lg border border-white/15"
                  />
                  <span className="text-xs text-lime-300 font-medium">
                    Image loaded! Click to choose a different file
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-7 h-7 text-lime-400" />
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    Click to browse your offline folder (JPG, PNG, WebP)
                  </p>
                  <p className="text-xs text-slate-400">
                    No external website upload needed — saves directly in your browser
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Design Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Burger Ad Social Poster"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:outline-none focus:border-lime-400"
              >
                <option value="Commercial Poster & Brand Visual">Commercial Poster & Brand Visual</option>
                <option value="Social Media Ad Design">Social Media Ad Design</option>
                <option value="YouTube Thumbnail Design">YouTube Thumbnail Design</option>
                <option value="Sports & Footwear Advertising">Sports & Footwear Advertising</option>
                <option value="Product Manipulation">Product Manipulation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Or Local Filename / Direct Image URL (Optional)
            </label>
            <input
              type="text"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              placeholder="e.g. graphic3.jpg or https://i.postimg.cc/..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-lime-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Short Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief note about typography, lighting, or brand concept..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-lime-400"
            />
          </div>

          {errorMsg && <p className="text-xs text-red-400 font-medium">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Design to Portfolio Gallery</span>
          </button>
        </form>

        {/* Existing Designs List */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-lime-400" />
              <span>Current Designs ({graphics.length})</span>
            </span>
            <button
              type="button"
              onClick={onResetGraphics}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-lime-300 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default 2 Designs</span>
            </button>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {graphics.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/10"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={g.src}
                    alt={g.title}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== g.fallbackSrc) target.src = g.fallbackSrc;
                    }}
                    className="w-10 h-12 object-cover rounded-lg bg-slate-900 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{g.title}</p>
                    <p className="text-[11px] text-slate-400 truncate">{g.category}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(g.id)}
                  title="Remove Design"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
