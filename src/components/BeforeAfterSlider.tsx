import React, { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import { TRANSFORMATIONS } from '../data/gymData';
import { clampSliderPercentage } from '../utils/gymLogic';
import { ResilientImage } from './ResilientImage';

export const BeforeAfterSlider: React.FC = () => {
  const [activePersonIdx, setActivePersonIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentTransformation = TRANSFORMATIONS[activePersonIdx];

  const updateSliderFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(clampSliderPercentage(rawPercent));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateSliderFromClientX(e.clientX);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore if not captured
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => clampSliderPercentage(prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => clampSliderPercentage(prev + 5));
    }
  };

  const handlePrevPerson = () => {
    setActivePersonIdx((prev) =>
      prev === 0 ? TRANSFORMATIONS.length - 1 : prev - 1
    );
    setSliderPos(50);
  };

  const handleNextPerson = () => {
    setActivePersonIdx((prev) =>
      prev === TRANSFORMATIONS.length - 1 ? 0 : prev + 1
    );
    setSliderPos(50);
  };

  return (
    <div className="w-full">
      {/* Large Image Comparison Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label={`Before and after comparison for ${currentTransformation.name}`}
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(sliderPos)}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[600px] rounded-xl overflow-hidden border border-[#34362E] bg-[#111210] select-none cursor-ew-resize focus-visible:outline-2 focus-visible:outline-[#E6F044] touch-none"
      >
        {/* Base Layer: AFTER Image */}
        <ResilientImage
          src={currentTransformation.afterImage}
          alt={`${currentTransformation.name} after ${currentTransformation.duration}`}
          className="absolute inset-0 w-full h-full object-cover object-[center_22%] contrast-125"
        />

        {/* Clipped Layer: BEFORE Image */}
        <div
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <ResilientImage
            src={currentTransformation.beforeImage}
            alt={`${currentTransformation.name} before starting at DraftWorks`}
            className="absolute inset-0 w-full h-full object-cover object-[center_22%] grayscale contrast-90 brightness-75"
          />
        </div>

        {/* Minimal Corner Labels */}
        <span className="absolute bottom-4 left-4 px-2.5 py-1 bg-[#111210]/85 border border-[#34362E] rounded text-xs font-display uppercase tracking-wider text-[#A5A69B] pointer-events-none">
          Day 01
        </span>
        <span className="absolute bottom-4 right-4 px-2.5 py-1 bg-[#111210]/85 border border-[#E6F044]/60 rounded text-xs font-display uppercase tracking-wider text-[#E6F044] pointer-events-none">
          {currentTransformation.duration}
        </span>

        {/* Draggable Centre Divider */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 w-0.5 bg-[#E6F044] pointer-events-none -translate-x-1/2"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#E6F044] text-[#111210] shadow-lg flex items-center justify-center border-2 border-[#111210]">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Minimal Bottom Bar: Only Person's Name, Transformation Duration, and Prev/Next Navigation */}
      <div className="mt-5 flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-3 text-base sm:text-lg">
          <span className="font-display text-2xl font-bold uppercase tracking-wide text-[#F3F2E9]">
            {currentTransformation.name}
          </span>
          <span className="text-[#A5A69B]" aria-hidden="true">
            ·
          </span>
          <span className="text-sm font-medium text-[#E6F044] tabular-nums">
            {currentTransformation.duration}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevPerson}
            aria-label="Previous member transformation"
            className="w-11 h-11 rounded-lg border border-[#34362E] bg-[#1B1D19] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNextPerson}
            aria-label="Next member transformation"
            className="w-11 h-11 rounded-lg border border-[#34362E] bg-[#1B1D19] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
