'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with hover capability
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 4, y: e.clientY - 4 });
      setIsVisible(true);
    };

    const handleHoverCheck = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Re-check hover targets periodically
    handleHoverCheck();
    const interval = setInterval(handleHoverCheck, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const spring = () => {
      setRingPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      requestAnimationFrame(spring);
    };
    const id = requestAnimationFrame(spring);
    return () => cancelAnimationFrame(id);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`custom-cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <div
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{
          transform: `translate(${ringPosition.x - (isHovering ? 30 : 20)}px, ${ringPosition.y - (isHovering ? 30 : 20)}px)`,
        }}
      />
    </>
  );
}
