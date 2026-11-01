import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { getMaxCarouselIndex, stepCarouselIndex } from '../utils/gymLogic';

interface HorizontalCarouselProps {
  title: React.ReactNode;
  kicker?: string;
  subtitle?: string;
  items: React.ReactNode[];
  desktopCards?: 2 | 3;
  ariaLabel: string;
}

export const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
  title,
  kicker,
  subtitle,
  items,
  desktopCards = 3,
  ariaLabel,
}) => {
  const [visibleCards, setVisibleCards] = useState<number>(desktopCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const updateViewportCards = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(desktopCards);
      }
    };
    updateViewportCards();
    window.addEventListener('resize', updateViewportCards);
    return () => window.removeEventListener('resize', updateViewportCards);
  }, [desktopCards]);

  const maxIndex = getMaxCarouselIndex(items.length, visibleCards);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  useEffect(() => {
    if (!trackRef.current) return;
    const percentageShift = -(currentIndex * (100 / visibleCards));
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(trackRef.current, { xPercent: percentageShift });
    } else {
      gsap.to(trackRef.current, {
        xPercent: percentageShift,
        duration: 0.42,
        ease: 'power3.out',
      });
    }
  }, [currentIndex, visibleCards]);

  const handlePrev = () => {
    setCurrentIndex((prev) => stepCarouselIndex(prev, -1, items.length, visibleCards));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => stepCarouselIndex(prev, 1, items.length, visibleCards));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -40) {
      handleNext();
    } else if (deltaX > 40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-full" role="region" aria-label={ariaLabel}>
      {/* Header Row with Controls on Tablet/Desktop */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
              {kicker}
            </p>
          )}
          <div className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F3F2E9]">
            {title}
          </div>
          {subtitle && (
            <p className="mt-3 text-base text-[#A5A69B] leading-relaxed">{subtitle}</p>
          )}
        </div>

        {/* Tablet & Desktop Carousel Controls (Hidden on Mobile so mobile controls sit below cards) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <span className="text-xs text-[#A5A69B] tabular-nums mr-2">
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(maxIndex + 1).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label={`Previous ${ariaLabel}`}
            className="w-11 h-11 rounded-lg border border-[#34362E] bg-[#1B1D19] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] disabled:opacity-35 disabled:pointer-events-none inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label={`Next ${ariaLabel}`}
            className="w-11 h-11 rounded-lg border border-[#34362E] bg-[#1B1D19] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] disabled:opacity-35 disabled:pointer-events-none inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Viewport */}
      <div
        className="overflow-hidden w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={trackRef} className="flex -mx-3 will-change-transform">
          {items.map((child, idx) => (
            <div
              key={idx}
              style={{ width: `${100 / visibleCards}%` }}
              className="px-3 shrink-0"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Controls Positioned Below Card Container */}
      <div className="flex md:hidden items-center justify-between mt-6 pt-4 border-t border-[#34362E]/60">
        <span className="text-xs text-[#A5A69B] tabular-nums">
          Slide {currentIndex + 1} of {maxIndex + 1}
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label={`Previous ${ariaLabel} mobile`}
            className="w-11 h-11 rounded-lg border border-[#34362E] bg-[#1B1D19] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] disabled:opacity-35 disabled:pointer-events-none inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label={`Next ${ariaLabel} mobile`}
            className="w-11 h-11 rounded-lg border border-[#34362E] bg-[#1B1D19] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] disabled:opacity-35 disabled:pointer-events-none inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
