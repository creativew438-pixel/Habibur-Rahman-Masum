import { VideoProject, GraphicProject, ServiceItem, ProcessStep, FaqItem } from '../types';
import avatarFallback from '../assets/images/avatar_habibur_editor_1790552881886.jpg';
import airBadrFallback from '../assets/images/poster_air_badr_design_1790552895134.jpg';
import nikeShoesFallback from '../assets/images/poster_nike_shoes_design_1790552906323.jpg';

export const PROFILE_DATA = {
  name: 'Habibur Rahman Masum',
  role: 'Video Editor & Graphic Designer',
  tagline: 'Crafting high-retention visual stories, dynamic motion sequences, and commercial brand visuals.',
  shortGreeting:
    "Hi, I'm Habibur Rahman Masum — a dedicated Video Editor & Graphic Designer focused on sharp pacing, clean motion graphics, immersive sound design, and high-impact poster visuals.",
  bio: 'I am a passionate video editor dedicated to the art of visual storytelling. Over the past several months, I have immersed myself in learning the ins and outs of editing—practicing daily, refining my pacing, and perfecting my sound design. While I don\'t claim decades of industry experience, I bring fresh creativity, high-energy dedication, and a modern aesthetic to every frame. Let\'s create something memorable together.',
  avatarSrc: 'profile.jpg',
  avatarPostimgUrl: 'https://postimg.cc/DJpBQJbB',
  avatarFallbackSrc: avatarFallback,
  availability: 'Available for Projects',
  location: 'Remote · Worldwide Delivery',
  email: 'habiburrahmanmasum132@gmail.com',
  whatsappDefault: '8801700000000',
  socials: {
    youtube: 'https://www.youtube.com/@perfect-zone.studio/videos',
    youtubeHandle: '@perfect-zone.studio',
    behance: 'https://www.behance.net/habibzone',
    behanceHandle: 'behance.net/habibzone',
    facebook: 'https://www.facebook.com/masumbinaman.aman/',
    facebookHandle: 'masumbinaman.aman'
  },
  coreSkills: [
    'Adobe Premiere Pro',
    'After Effects',
    'Sound Design & SFX',
    'Motion Graphics',
    'Color Grading',
    'Adobe Photoshop',
    'Commercial Posters'
  ],
  metrics: [
    { value: '4K · 60FPS', label: 'Mastered Export Quality' },
    { value: '24–48h', label: 'Fast Turnaround Delivery' },
    { value: '100%', label: 'Custom Motion & Sound' }
  ]
};

export const FEATURED_VIDEO: VideoProject = {
  id: 'featured-main',
  youtubeId: 'pRiaoBN6bPU',
  title: 'Featured Video Edit — Visual Pacing & Motion Showcase',
  category: 'Featured Highlight',
  description:
    'Signature showcase highlighting rhythmic cuts, dynamic speed ramps, custom motion typography, and layered sound design.',
  aspectRatio: '16:9',
  resolution: '4K UHD · 60FPS',
  tools: ['Premiere Pro', 'After Effects', 'Sound Design'],
  metrics: 'High-Retention Pacing'
};

// All 5 Horizontal Widescreen (16:9) Video Edits
export const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: 'vid-1',
    youtubeId: 'pRiaoBN6bPU',
    title: 'Main Showreel & Visual Storytelling Edit',
    category: 'Motion & Showreel',
    description:
      'High-energy visual montage combining seamless transitions, beat-synced audio layering, and modern color treatment.',
    aspectRatio: '16:9',
    resolution: '1080p / 4K · 16:9',
    tools: ['Premiere Pro', 'After Effects', 'SFX Mastery'],
    metrics: 'Featured 16:9 Edit'
  },
  {
    id: 'vid-2',
    youtubeId: 'IROjS6laW2Y',
    title: 'Carousel Animation — Kinetic Motion Flow',
    category: 'Motion & Animation',
    description:
      'Smooth 3D-inspired carousel transition animation built with precision keyframe curves, depth blur, and tactile UI sound effects.',
    aspectRatio: '16:9',
    resolution: '1080p · 60FPS · 16:9',
    tools: ['After Effects', 'Graph Editor', 'Motion Design'],
    metrics: 'Smooth Keyframe Flow'
  },
  {
    id: 'vid-3',
    youtubeId: 'KgL51V2d1iE',
    title: 'IU Animation — Visual & Motion Design',
    category: 'Motion & Animation',
    description:
      'Clean visual composition and fluid motion graphics showcasing modern layout choreography, masking, and rhythmic pacing.',
    aspectRatio: '16:9',
    resolution: '1080p · 60FPS · 16:9',
    tools: ['After Effects', 'Premiere Pro', 'Visual Rhythm'],
    metrics: 'Custom Motion Graphics'
  },
  {
    id: 'vid-4',
    youtubeId: 'wn4EmjiC5yw',
    title: 'Fluggin Motion Sequence — Dynamic Animation',
    category: 'Motion & Animation',
    description:
      'Fast-paced motion sequence engineered with expressive easing curves, layered visual elements, and crisp audio accents.',
    aspectRatio: '16:9',
    resolution: '1080p · 60FPS · 16:9',
    tools: ['After Effects', 'Motion Sequence', 'Sound Sync'],
    metrics: 'Kinetic Visuals'
  },
  {
    id: 'vid-5',
    youtubeId: 'bGfWbrdb2-8',
    title: 'Nafees Salim — Creator & Talking-Head Edit',
    category: 'Creator & Documentary',
    description:
      'High-retention creator edit featuring engaging B-roll callouts, animated captions, zoom dynamics, and clean narrative pacing.',
    aspectRatio: '16:9',
    resolution: '1080p · 60FPS · 16:9',
    tools: ['Premiere Pro', 'After Effects', 'Retention Editing'],
    metrics: 'Creator Style Edit'
  }
];

// All 4 Vertical Smartphone (9:16) Shorts & Reels
export const REEL_PROJECTS: VideoProject[] = [
  {
    id: 'reel-1',
    youtubeId: 'qgyvCVmNUZ0',
    title: 'Animation — Kinetic Short Reel',
    category: 'Motion Reel',
    description:
      'Vertical 9:16 motion animation crafted with snappy easing curves, bold visual hooks, and punchy sound effects.',
    aspectRatio: '9:16',
    resolution: '1080×1920 · 9:16',
    tools: ['After Effects', 'Premiere Pro'],
    metrics: 'Vertical 9:16 Short'
  },
  {
    id: 'reel-2',
    youtubeId: 'J67ajfteZaM',
    title: 'Bap Ka Beta Style Editing — Viral Short',
    category: 'Trend & Viral Edit',
    description:
      'High-energy vertical edit featuring dramatic beat drops, speed ramping, stylized typography, and impact transitions.',
    aspectRatio: '9:16',
    resolution: '1080×1920 · 9:16',
    tools: ['Premiere Pro', 'After Effects', 'SFX'],
    metrics: 'Viral Pacing'
  },
  {
    id: 'reel-3',
    youtubeId: 'mf4xu1rMmP8',
    title: 'Ad Promotion — Commercial Short',
    category: 'Commercial Promo',
    description:
      'Conversion-focused promotional vertical reel designed to hook viewers in the first 2 seconds and highlight brand value.',
    aspectRatio: '9:16',
    resolution: '1080×1920 · 9:16',
    tools: ['After Effects', 'Commercial Motion'],
    metrics: 'Ad Promo Reel'
  },
  {
    id: 'reel-4',
    youtubeId: 'jW4woWS7Z58',
    title: 'Reel Editing — High-Retention Social Short',
    category: 'Social Media Reel',
    description:
      'Engaging social media short built for Instagram Reels, TikTok, and YouTube Shorts with dynamic captions and audio design.',
    aspectRatio: '9:16',
    resolution: '1080×1920 · 9:16',
    tools: ['Premiere Pro', 'Subtitles & Motion'],
    metrics: '9:16 Social Cut'
  }
];

// 2 Unique Graphic & Poster Designs (No duplicates)
export const GRAPHIC_PROJECTS: GraphicProject[] = [
  {
    id: 1,
    src: 'https://postimg.cc/JDF5Dffw',
    localFilename: 'graphic1.jpg',
    fallbackSrc: airBadrFallback,
    title: 'Air Badr — Commercial Poster Design',
    category: 'Brand Campaign & Product Poster',
    description:
      'High-contrast product advertising poster combining bold display typography, layered lighting effects, and sharp subject compositing.',
    tools: ['Adobe Photoshop', 'Color Manipulation', 'Typography']
  },
  {
    id: 2,
    src: 'https://postimg.cc/YGPzG55w',
    localFilename: 'graphic2.jpg',
    fallbackSrc: nikeShoesFallback,
    title: 'Nike Shoes — Dynamic Brand Visual',
    category: 'Sports & Footwear Advertising',
    description:
      'Energetic commercial sneaker poster featuring dynamic motion framing, vibrant neon accents, and clean brand hierarchy.',
    tools: ['Adobe Photoshop', 'Product Compositing', 'Visual Identity']
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-1',
    index: '01.',
    title: 'High-Retention YouTube Video Editing',
    subtitle: 'Long-Form 16:9 Content',
    description:
      'Structured storytelling for creators, educators, and brands—combining crisp J/L cuts, custom B-roll overlays, visual callouts, and immersive sound beds.',
    deliverables: ['16:9 Widescreen Mastering', 'Custom Motion Callouts', 'Layered SFX & Audio Mix']
  },
  {
    id: 'srv-2',
    index: '02.',
    title: 'Viral Shorts, Reels & TikTok Editing',
    subtitle: 'Vertical 9:16 Fast-Paced Cuts',
    description:
      'Scroll-stopping 9:16 vertical edits engineered around the first 3-second hook, kinetic captions, speed ramps, and trend-ready pacing.',
    deliverables: ['9:16 Vertical Framing', 'Dynamic Animated Captions', 'Beat-Synced Transitions']
  },
  {
    id: 'srv-3',
    index: '03.',
    title: 'Motion Graphics & UI Animation',
    subtitle: 'After Effects Visual Choreography',
    description:
      'Custom carousel animations, UI walkthroughs, kinetic typography, and smooth keyframe sequences that elevate production value.',
    deliverables: ['Custom Keyframe Curves', 'Carousel & UI Motion', 'Visual Compositing']
  },
  {
    id: 'srv-4',
    index: '04.',
    title: 'Commercial Poster & Thumbnail Design',
    subtitle: 'Graphic Design & Visual Branding',
    description:
      'Eye-catching commercial posters, social media campaign visuals, and high-CTR YouTube thumbnails designed with bold contrast.',
    deliverables: ['Product & Brand Posters', 'High-CTR YouTube Thumbnails', 'Social Media Ad Creatives']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01.',
    title: 'Brief, Assets & Direction',
    duration: 'Step One',
    description:
      'We align on your target audience, pacing style, reference tone, and raw footage or brand assets before a single frame is cut.'
  },
  {
    step: '02.',
    title: 'Precision Cut, Motion & Sound',
    duration: 'Step Two',
    description:
      'Story assembly in Premiere Pro followed by custom After Effects motion graphics, color grading, and multi-track sound design.'
  },
  {
    step: '03.',
    title: 'Review, Polish & Final Export',
    duration: 'Step Three',
    description:
      'Fast feedback revisions and final delivery in crisp 1080p or 4K 60FPS—ready to publish across YouTube, Reels, or ad campaigns.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is your typical turnaround time for a video or reel?',
    answer:
      'For vertical Shorts/Reels (9:16), delivery typically takes 24 hours. For long-form 16:9 YouTube edits or custom motion sequences, turnaround is usually 2 to 4 days depending on complexity.'
  },
  {
    question: 'What editing and design software do you work with?',
    answer:
      'I primarily use Adobe Premiere Pro for timeline editing and pacing, Adobe After Effects for motion graphics and kinetic animations, and Adobe Photoshop & Illustrator for graphic posters and thumbnails.'
  },
  {
    question: 'How do I share raw footage and project instructions with you?',
    answer:
      'You can share raw footage via Google Drive, Frame.io, WeTransfer, or Dropbox, and send your brief directly through WhatsApp or Email using the contact buttons below.'
  },
  {
    question: 'Do you offer revisions if I want adjustments to the pacing or graphics?',
    answer:
      'Yes! Client satisfaction is my top priority. I include collaborative revision rounds to fine-tune cuts, text animations, sound levels, or poster details until it matches your vision.'
  }
];
