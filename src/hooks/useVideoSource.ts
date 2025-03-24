"use client";

import { useState, useEffect } from 'react';

export function useVideoSource() {
  const [videoSource, setVideoSource] = useState<{
    src: string;
    isMobile: boolean;
  }>({
    src: '/hero-bg.mp4', // Default to desktop version
    isMobile: false
  });

  useEffect(() => {
    // Only run on client side
    const checkMobile = () => {
      const isMobile = window.innerWidth <= 768;
      setVideoSource({
        src: isMobile ? '/hero-mobile.mp4' : '/hero-bg.mp4',
        isMobile
      });
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return videoSource;
} 