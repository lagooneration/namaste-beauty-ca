"use client";

import { useEffect, useState, useCallback } from 'react';

interface VideoSize {
  isMobile: boolean;
  videoStyles: {
    width: string;
    height: string;
    objectFit?: string;
    objectPosition?: string;
  };
}

export function useVideoResize(videoRef: React.RefObject<HTMLVideoElement>): VideoSize {
  const [videoSize, setVideoSize] = useState<VideoSize>({
    isMobile: false,
    videoStyles: {
      width: '100vw',
      height: '100vh',
      objectFit: 'cover',
      objectPosition: 'center center'
    }
  });

  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      setVideoSize({
        isMobile,
        videoStyles: {
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'center center'
        }
      });
    } else {
      const video = videoRef.current;
      if (!video) return;

      const videoRatio = video.videoWidth / video.videoHeight;
      const windowRatio = window.innerWidth / window.innerHeight;

      setVideoSize({
        isMobile,
        videoStyles: {
          width: windowRatio > videoRatio ? '100vw' : 'auto',
          height: windowRatio > videoRatio ? 'auto' : '100vh',
          objectFit: 'cover'
        }
      });
    }
  }, [videoRef]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return videoSize;
}