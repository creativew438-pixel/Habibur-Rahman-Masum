import { VideoProject } from '../types';
import { FEATURED_VIDEO, VIDEO_PROJECTS, REEL_PROJECTS } from '../data/portfolioData';

const FEATURED_KEY = 'habibur_featured_video_v4';
const VIDEOS_16_9_KEY = 'habibur_videos_16_9_v4';
const REELS_9_16_KEY = 'habibur_reels_9_16_v4';

// Known horizontal 16:9 IDs from Habibur Rahman Masum's channel so they are NEVER misclassified as 9:16 reels
const KNOWN_HORIZONTAL_IDS = new Set([
  'pRiaoBN6bPU',
  'IROjS6laW2Y',
  'KgL51V2d1iE',
  'wn4EmjiC5yw',
  'bGfWbrdb2-8'
]);

export function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.split('/').filter(Boolean)[0];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
    if (url.hostname.includes('youtube.com')) {
      const vParam = url.searchParams.get('v');
      if (vParam && /^[a-zA-Z0-9_-]{11}$/.test(vParam)) return vParam;

      const parts = url.pathname.split('/').filter(Boolean);
      const shortsIdx = parts.indexOf('shorts');
      if (shortsIdx !== -1 && parts[shortsIdx + 1]) {
        return parts[shortsIdx + 1].substring(0, 11);
      }
      const embedIdx = parts.indexOf('embed');
      if (embedIdx !== -1 && parts[embedIdx + 1]) {
        return parts[embedIdx + 1].substring(0, 11);
      }
    }
  } catch {
    // fallback regex
  }

  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function isShortsUrl(input: string): boolean {
  return input.toLowerCase().includes('/shorts/');
}

export function getStoredFeaturedVideo(): VideoProject {
  try {
    const raw = localStorage.getItem(FEATURED_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.youtubeId) {
        return { ...parsed, aspectRatio: '16:9' };
      }
    }
  } catch {
    // ignore
  }
  return FEATURED_VIDEO;
}

export function saveStoredFeaturedVideo(video: VideoProject): void {
  try {
    localStorage.setItem(FEATURED_KEY, JSON.stringify({ ...video, aspectRatio: '16:9' }));
  } catch {
    // ignore
  }
}

export function getStoredVideos16x9(): VideoProject[] {
  try {
    const raw = localStorage.getItem(VIDEOS_16_9_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((v: VideoProject) => ({
          ...v,
          aspectRatio: '16:9'
        }));
      }
    }
  } catch {
    // ignore
  }
  return VIDEO_PROJECTS;
}

export function saveStoredVideos16x9(videos: VideoProject[]): void {
  try {
    const normalized = videos.map((v) => ({ ...v, aspectRatio: '16:9' as const }));
    localStorage.setItem(VIDEOS_16_9_KEY, JSON.stringify(normalized));
  } catch {
    // ignore
  }
}

export function getStoredReels9x16(): VideoProject[] {
  try {
    const raw = localStorage.getItem(REELS_9_16_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure none of the 5 horizontal videos accidentally appear in the 9:16 reels array
        const filtered = parsed.filter((r: VideoProject) => !KNOWN_HORIZONTAL_IDS.has(r.youtubeId));
        if (filtered.length > 0) {
          return filtered.map((r: VideoProject) => ({
            ...r,
            aspectRatio: '9:16'
          }));
        }
      }
    }
  } catch {
    // ignore
  }
  return REEL_PROJECTS;
}

export function saveStoredReels9x16(reels: VideoProject[]): void {
  try {
    const normalized = reels.map((r) => ({ ...r, aspectRatio: '9:16' as const }));
    localStorage.setItem(REELS_9_16_KEY, JSON.stringify(normalized));
  } catch {
    // ignore
  }
}

export function resetAllVideosToDefault(): {
  featured: VideoProject;
  videos: VideoProject[];
  reels: VideoProject[];
} {
  try {
    localStorage.removeItem(FEATURED_KEY);
    localStorage.removeItem(VIDEOS_16_9_KEY);
    localStorage.removeItem(REELS_9_16_KEY);
  } catch {
    // ignore
  }
  return {
    featured: FEATURED_VIDEO,
    videos: VIDEO_PROJECTS,
    reels: REEL_PROJECTS
  };
}
