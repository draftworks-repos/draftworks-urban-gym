import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
}) => {
  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onChangeIndex(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
      } else if (e.key === 'ArrowRight') {
        onChangeIndex(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, items.length, onClose, onChangeIndex]);

  if (activeIndex === null || !items[activeIndex]) return null;

  const item = items[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Full-screen view: ${item.label}`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-display text-lg uppercase tracking-wider text-[#E6F044] tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <span className="text-[#A5A69B]" aria-hidden="true">
            ·
          </span>
          <span className="text-[#F3F2E9] font-medium">{item.label}</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close full-screen viewer"
          className="w-11 h-11 rounded-lg border border-[#34362E] bg-[#1B1D19] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] inline-flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Frame */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        <ResilientImage
          src={item.image}
          alt={item.label}
          loading="eager"
          className="max-h-[78vh] max-w-full w-auto h-auto object-contain rounded-lg border border-[#34362E]"
        />
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-[#A5A69B] uppercase tracking-wider">
          {item.category}
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              onChangeIndex(activeIndex === 0 ? items.length - 1 : activeIndex - 1)
            }
            aria-label="Previous gallery image"
            className="w-11 h-11 rounded-lg border border-[#34362E] bg-[#1B1D19] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() =>
              onChangeIndex(activeIndex === items.length - 1 ? 0 : activeIndex + 1)
            }
            aria-label="Next gallery image"
            className="w-11 h-11 rounded-lg border border-[#34362E] bg-[#1B1D19] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
