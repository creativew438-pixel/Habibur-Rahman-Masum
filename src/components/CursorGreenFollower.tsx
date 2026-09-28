import React, { useEffect, useState } from 'react';

interface CursorGreenFollowerProps {
  isDark: boolean;
}

export const CursorGreenFollower: React.FC<CursorGreenFollowerProps> = ({ isDark }) => {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [ringPosition, setRingPosition] = useState({ x: -200, y: -200 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let animationFrameId: number;
    let targetX = -200;
    let targetY = -200;
    let currentRingX = -200;
    let currentRingY = -200;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, input, textarea, select, [role="button"]');
      setIsHoveringInteractive(Boolean(interactive));
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    const smoothFollow = () => {
      currentRingX += (targetX - currentRingX) * 0.18;
      currentRingY += (targetY - currentRingY) * 0.18;
      setRingPosition({ x: currentRingX, y: currentRingY });
      animationFrameId = requestAnimationFrame(smoothFollow);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(smoothFollow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden lg:block overflow-hidden" aria-hidden="true">
      {/* Soft Petrol-Cyan Ambient Spotlight following cursor */}
      <div
        className="fixed rounded-full transition-opacity duration-300"
        style={{
          width: '460px',
          height: '460px',
          transform: `translate3d(${ringPosition.x - 230}px, ${ringPosition.y - 230}px, 0)`,
          background: isDark
            ? 'radial-gradient(circle, rgba(60, 128, 145, 0.22) 0%, rgba(34, 211, 238, 0.08) 42%, transparent 70%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(60, 128, 145, 0.05) 42%, transparent 70%)'
        }}
      />

      {/* Outer Cyan-Teal Tracking Ring */}
      <div
        className="fixed rounded-full border transition-transform duration-150 ease-out"
        style={{
          width: isHoveringInteractive ? '44px' : '28px',
          height: isHoveringInteractive ? '44px' : '28px',
          borderColor: isHoveringInteractive
            ? 'rgba(103, 232, 249, 0.9)'
            : 'rgba(34, 211, 238, 0.55)',
          backgroundColor: isHoveringInteractive
            ? 'rgba(34, 211, 238, 0.1)'
            : 'transparent',
          boxShadow: isHoveringInteractive
            ? '0 0 20px rgba(34, 211, 238, 0.45)'
            : '0 0 10px rgba(60, 128, 145, 0.35)',
          transform: `translate3d(${ringPosition.x - (isHoveringInteractive ? 22 : 14)}px, ${
            ringPosition.y - (isHoveringInteractive ? 22 : 14)
          }px, 0) scale(${isClicking ? 0.85 : 1})`
        }}
      />

      {/* Crisp Neon Cyan Dot */}
      <div
        className="fixed rounded-full bg-cyan-300"
        style={{
          width: '7px',
          height: '7px',
          boxShadow: '0 0 12px rgba(103, 232, 249, 0.95)',
          transform: `translate3d(${position.x - 3.5}px, ${position.y - 3.5}px, 0)`
        }}
      />
    </div>
  );
};
