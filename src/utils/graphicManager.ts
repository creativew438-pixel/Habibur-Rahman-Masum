import { GraphicProject } from '../types';
import { GRAPHIC_PROJECTS } from '../data/portfolioData';

const GRAPHICS_STORAGE_KEY = 'habibur_graphic_projects_v3';
const CUSTOM_AVATAR_KEY = 'habibur_custom_profile_avatar_v1';

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

export function getCustomAvatar(): string | null {
  try {
    return localStorage.getItem(CUSTOM_AVATAR_KEY);
  } catch {
    return null;
  }
}

export function saveCustomAvatar(dataUrl: string): void {
  try {
    localStorage.setItem(CUSTOM_AVATAR_KEY, dataUrl);
  } catch {
    // ignore
  }
}

export function clearCustomAvatar(): void {
  try {
    localStorage.removeItem(CUSTOM_AVATAR_KEY);
  } catch {
    // ignore
  }
}
