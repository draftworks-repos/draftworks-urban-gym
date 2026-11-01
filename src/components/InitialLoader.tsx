import React, { useEffect, useState } from 'react';

interface InitialLoaderProps {
  onComplete: () => void;
}

const LOADER_DURATION = 1800;

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    let frameId = 0;
    let startTime: number | null = null;

    const updateProgress = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const nextProgress = Math.min(
        100,
        Math.round(((timestamp - startTime) / LOADER_DURATION) * 100)
      );
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frameId = window.requestAnimationFrame(updateProgress);
      } else {
        onComplete();
      }
    };

    frameId = window.requestAnimationFrame(updateProgress);
    return () => window.cancelAnimationFrame(frameId);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#111210] text-[#F3F2E9]"
      role="status"
      aria-label={`Loading DraftWorks, ${progress}%`}
      aria-live="polite"
    >
      <div className="absolute bottom-8 left-5 sm:bottom-12 sm:left-8 flex items-baseline font-display text-[clamp(5rem,18vw,14rem)] font-bold leading-none tracking-tight tabular-nums">
        <span>{progress}%</span>
        <span className="text-[#E6F044]" aria-hidden="true">.</span>
      </div>
    </div>
  );
};