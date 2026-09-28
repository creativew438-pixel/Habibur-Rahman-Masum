import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VideoGrid } from './components/VideoGrid';
import { ReelsSection } from './components/ReelsSection';
import { GraphicSection } from './components/GraphicSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CursorGreenFollower } from './components/CursorGreenFollower';
import { ImageLightbox } from './components/ImageLightbox';
import { GraphicManagerModal } from './components/GraphicManagerModal';
import { VideoManagerModal } from './components/VideoManagerModal';
import { WhatsAppConfigModal } from './components/WhatsAppConfigModal';
import { HtmlCodeModal } from './components/HtmlCodeModal';
import {
  getStoredFeaturedVideo,
  saveStoredFeaturedVideo,
  getStoredVideos16x9,
  saveStoredVideos16x9,
  getStoredReels9x16,
  saveStoredReels9x16,
  resetAllVideosToDefault
} from './utils/videoManager';
import {
  getStoredGraphics,
  saveStoredGraphics,
  resetStoredGraphics
} from './utils/graphicManager';
import { VideoProject, GraphicProject } from './types';

export default function App() {
  // Default theme on load is Dark Mode as requested
  const [isDark, setIsDark] = useState<boolean>(true);

  // Videos (16:9 Widescreen) & Reels (9:16 Vertical) state
  const [featuredVideo, setFeaturedVideo] = useState<VideoProject>(() =>
    getStoredFeaturedVideo()
  );
  const [videos16x9, setVideos16x9] = useState<VideoProject[]>(() =>
    getStoredVideos16x9()
  );
  const [reels9x16, setReels9x16] = useState<VideoProject[]>(() =>
    getStoredReels9x16()
  );

  // Graphic Designs state (2 Unique Designs by default + user uploads)
  const [graphics, setGraphics] = useState<GraphicProject[]>(() =>
    getStoredGraphics()
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Modals state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isGraphicModalOpen, setIsGraphicModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false);
  const [, setWhatsAppTick] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleUpdateFeatured = (video: VideoProject) => {
    setFeaturedVideo(video);
    saveStoredFeaturedVideo(video);
  };

  const handleUpdateVideos16x9 = (updated: VideoProject[]) => {
    setVideos16x9(updated);
    saveStoredVideos16x9(updated);
  };

  const handleUpdateReels9x16 = (updated: VideoProject[]) => {
    setReels9x16(updated);
    saveStoredReels9x16(updated);
  };

  const handleResetAllVideos = () => {
    const defaults = resetAllVideosToDefault();
    setFeaturedVideo(defaults.featured);
    setVideos16x9(defaults.videos);
    setReels9x16(defaults.reels);
  };

  const handleSaveGraphics = (updated: GraphicProject[]) => {
    setGraphics(updated);
    saveStoredGraphics(updated);
  };

  const handleResetGraphics = () => {
    const defaults = resetStoredGraphics();
    setGraphics(defaults);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? 'bg-[#060809] text-[#f4f6f0]'
          : 'bg-[#f5f6f2] text-slate-900'
      }`}
    >
      {/* Interactive Bright Parrot-Green Cursor Follower */}
      <CursorGreenFollower isDark={isDark} />

      {/* Top Navigation Bar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark((d) => !d)}
        onOpenHtmlModal={() => setIsHtmlModalOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* 1. Hero Section: Profile Picture & Info FIRST, Featured 16:9 Video RIGHT BELOW */}
        <HeroSection
          isDark={isDark}
          featuredVideo={featuredVideo}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
        />

        {/* 2. Video Edits Section: All 5 Widescreen Videos in 16:9 Video Frames */}
        <VideoGrid
          isDark={isDark}
          videos={videos16x9}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
        />

        {/* 3. Shorts & Reels Showcase Section: Dedicated Heading & 9:16 Vertical Frames Right Below Video Edits */}
        <ReelsSection
          isDark={isDark}
          reels={reels9x16}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
        />

        {/* 4. Graphic & Poster Designs Section: 2 Unique Designs + Offline File Uploader + Lightbox */}
        <GraphicSection
          isDark={isDark}
          graphics={graphics}
          onSelectGraphic={(idx) => setLightboxIndex(idx)}
          onOpenGraphicManager={() => setIsGraphicModalOpen(true)}
        />

        {/* 5. Services & 3-Step Production Workflow */}
        <ServicesSection isDark={isDark} />

        {/* 6. Detailed About Me (Honest Bio & Toolkit) */}
        <AboutSection isDark={isDark} />

        {/* 7. Frequently Asked Questions */}
        <FaqSection isDark={isDark} />

        {/* 8. Get in Touch / Direct Contact Channels (Email, WhatsApp, YouTube, Behance, Facebook) */}
        <ContactSection
          isDark={isDark}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        isDark={isDark}
        onOpenHtmlModal={() => setIsHtmlModalOpen(true)}
      />

      {/* Interactive Modals */}
      <ImageLightbox
        items={graphics}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      <GraphicManagerModal
        isOpen={isGraphicModalOpen}
        onClose={() => setIsGraphicModalOpen(false)}
        graphics={graphics}
        onSaveGraphics={handleSaveGraphics}
        onResetGraphics={handleResetGraphics}
      />

      <VideoManagerModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        featuredVideo={featuredVideo}
        videos16x9={videos16x9}
        reels9x16={reels9x16}
        onUpdateFeatured={handleUpdateFeatured}
        onUpdateVideos16x9={handleUpdateVideos16x9}
        onUpdateReels9x16={handleUpdateReels9x16}
        onResetAll={handleResetAllVideos}
      />

      <WhatsAppConfigModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        onSaved={() => setWhatsAppTick((t) => t + 1)}
      />

      <HtmlCodeModal
        isOpen={isHtmlModalOpen}
        onClose={() => setIsHtmlModalOpen(false)}
      />
    </div>
  );
}
