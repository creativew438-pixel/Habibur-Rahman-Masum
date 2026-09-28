import { GraphicProject } from '../types';
import { GRAPHIC_PROJECTS } from '../data/portfolioData';

const GRAPHICS_STORAGE_KEY = 'habibur_graphic_projects_v4';
const CUSTOM_AVATAR_CONFIG_KEY = 'habibur_custom_profile_photo_config_v2';

export interface ProfilePhotoConfig {
  src: string;
  zoom: number;
  posX: number;
  posY: number;
  objectFit: 'cover' | 'contain';
}

export const DEFAULT_PROFILE_PHOTO_CONFIG: ProfilePhotoConfig = {
  src: '',
  zoom: 1,
  posX: 50,
  posY: 50,
  objectFit: 'cover'
};

export function getStoredGraphics(): GraphicProject[] {
  try {
    const raw = localStorage.getItem(GRAPHICS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return GRAPHIC_PROJECTS;
}

export function saveStoredGraphics(items: GraphicProject[]): void {
  try {
    localStorage.setItem(GRAPHICS_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function resetStoredGraphics(): GraphicProject[] {
  try {
    localStorage.removeItem(GRAPHICS_STORAGE_KEY);
  } catch {
    // ignore
  }
  return GRAPHIC_PROJECTS;
}

export function getProfilePhotoConfig(): ProfilePhotoConfig {
  try {
    // Clear any older v1 key if present
    localStorage.removeItem('habibur_custom_profile_avatar_v1');
    const raw = localStorage.getItem(CUSTOM_AVATAR_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.src === 'string') {
        return {
          src: parsed.src,
          zoom: typeof parsed.zoom === 'number' ? parsed.zoom : 1,
          posX: typeof parsed.posX === 'number' ? parsed.posX : 50,
          posY: typeof parsed.posY === 'number' ? parsed.posY : 50,
          objectFit: parsed.objectFit === 'contain' ? 'contain' : 'cover'
        };
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_PROFILE_PHOTO_CONFIG;
}

export function saveProfilePhotoConfig(config: ProfilePhotoConfig): void {
  try {
    localStorage.setItem(CUSTOM_AVATAR_CONFIG_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}

export function clearProfilePhotoConfig(): ProfilePhotoConfig {
  try {
    localStorage.removeItem(CUSTOM_AVATAR_CONFIG_KEY);
    localStorage.removeItem('habibur_custom_profile_avatar_v1');
  } catch {
    // ignore
  }
  return DEFAULT_PROFILE_PHOTO_CONFIG;
}

/**
 * Optimizes an uploaded image file using HTML5 Canvas so that even large 10MB+
 * DSLR or phone camera photos save smoothly in localStorage without hitting quota limits,
 * while keeping crisp portrait clarity (up to 1000px).
 */
export function processUploadedImageFile(file: File, maxDimension = 1000): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onerror = () => resolve(dataUrl);
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width >= height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(dataUrl);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
          resolve(optimizedDataUrl);
        } catch {
          resolve(dataUrl);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}
