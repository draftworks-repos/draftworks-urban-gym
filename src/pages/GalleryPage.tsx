import React, { useState, useEffect } from 'react';
import { Maximize2, SlidersHorizontal, X } from 'lucide-react';
import { IMAGES, GALLERY_ITEMS } from '../data/gymData';
import { InternalSplitHero } from '../components/InternalSplitHero';
import { ResilientImage } from '../components/ResilientImage';

interface GalleryPageProps {
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
  onOpenLightbox: (index: number) => void;
}

const GALLERY_CATEGORIES = [
  'All',
  'Strength Floor',
  'Conditioning Turf',
  'Barbell Club',
  'Architecture',
] as const;

type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onOpenEnquiry,
  onOpenLightbox,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    if (filterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [filterDrawerOpen]);

  const filteredWithOriginalIndex = GALLERY_ITEMS.map((item, originalIndex) => ({
    item,
    originalIndex,
  })).filter(
    ({ item }) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="bg-[#111210] text-[#F3F2E9]">
      {/* Consistent Internal Split Hero (~100svh) */}
      <InternalSplitHero
        kicker="Architectural Strength Floors"
        title={
          <>
            INSIDE THE <span className="text-[#E6F044]">DRAFTWORKS</span> TRAINING HALLS.
          </>
        }
        description="Graphite concrete, custom matte-black steel power racks, solid oak Olympic platforms, and 40-metre indoor sprint turf across our four India clubs."
        ctaLabel="Book an In-Person Tour"
        onCtaClick={() => onOpenEnquiry()}
        imageSrc={IMAGES.turfConditioning}
        imageAlt="DraftWorks indoor conditioning turf track and kettlebell racks"
        metaLine="Bengaluru · Mumbai · New Delhi · Hyderabad"
      />

      {/* Gallery Section */}
      <section className="py-20 lg:py-28 bg-[#111210]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#34362E]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
                Photographic Archive
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F3F2E9]">
                FACILITY <span className="text-[#E6F044]">GALLERY</span>
              </h2>
            </div>

            {/* Desktop Inline Filter */}
            <div
              className="hidden lg:flex items-center gap-2 bg-[#1B1D19] p-1.5 rounded-lg border border-[#34362E]"
              role="group"
              aria-label="Filter gallery by zone"
            >
              {GALLERY_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#E6F044] text-[#111210]'
                        : 'text-[#A5A69B] hover:text-[#F3F2E9]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Tablet & Mobile Filter Drawer Trigger */}
            <div className="flex lg:hidden items-center justify-between gap-4">
              <span className="text-xs text-[#A5A69B]">
                Zone: <strong className="text-[#E6F044]">{selectedCategory}</strong>
              </span>
              <button
                type="button"
                onClick={() => setFilterDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1B1D19] border border-[#34362E] text-xs font-semibold text-[#F3F2E9] hover:border-[#E6F044] transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#E6F044]" />
                <span>Filter Zone</span>
              </button>
            </div>
          </div>

          {/* Asymmetric Editorial Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6">
            {filteredWithOriginalIndex.map(({ item, originalIndex }, idx) => {
              const spanPattern = idx % 4;
              const colSpanClass =
                spanPattern === 0
                  ? 'md:col-span-7 h-[280px] sm:h-[340px] md:h-[380px]'
                  : spanPattern === 1
                  ? 'md:col-span-5 h-[280px] sm:h-[340px] md:h-[380px]'
                  : spanPattern === 2
                  ? 'md:col-span-5 h-[280px] sm:h-[340px] md:h-[380px]'
                  : 'md:col-span-7 h-[280px] sm:h-[340px] md:h-[380px]';

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-xl overflow-hidden border border-[#34362E] bg-[#1B1D19] ${colSpanClass}`}
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.label}
                    style={{ objectPosition: item.objectPosition || 'center' }}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111210]/85 via-transparent to-transparent pointer-events-none" />

                  {/* Small Label + Full-Screen Viewing Control Only */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[#F3F2E9] bg-[#111210]/85 px-2.5 py-1 rounded border border-[#34362E]">
                      {item.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(originalIndex)}
                      aria-label={`View ${item.label} full screen`}
                      className="w-10 h-10 rounded-lg bg-[#111210]/90 border border-[#34362E] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] inline-flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tablet & Mobile Filter Drawer */}
      {filterDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filter gallery"
        >
          <div
            onClick={() => setFilterDrawerOpen(false)}
            className="fixed inset-0 bg-black/80"
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#1B1D19] border-l border-[#34362E] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#34362E]">
                <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                  Filter Zone
                </h3>
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(false)}
                  aria-label="Close gallery filter drawer"
                  className="w-10 h-10 rounded-lg border border-[#34362E] bg-[#242620] text-[#F3F2E9] inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                {GALLERY_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setFilterDrawerOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg font-display text-xl uppercase tracking-wide transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#E6F044] text-[#111210] font-bold'
                          : 'bg-[#242620] text-[#F3F2E9]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setFilterDrawerOpen(false);
              }}
              className="w-full py-3 rounded-lg border border-[#34362E] text-xs font-semibold text-[#A5A69B] hover:text-[#F3F2E9] cursor-pointer"
            >
              Show All Zones
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
