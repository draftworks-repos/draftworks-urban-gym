import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ResilientImage } from './ResilientImage';

interface InternalSplitHeroProps {
  kicker: string;
  title: React.ReactNode;
  description: string;
  ctaLabel: string;
  onCtaClick: () => void;
  secondaryLinkLabel?: string;
  onSecondaryClick?: () => void;
  imageSrc: string;
  imageAlt: string;
  metaLine?: string;
}

export const InternalSplitHero: React.FC<InternalSplitHeroProps> = ({
  kicker,
  title,
  description,
  ctaLabel,
  onCtaClick,
  secondaryLinkLabel,
  onSecondaryClick,
  imageSrc,
  imageAlt,
  metaLine,
}) => {
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    if (textColRef.current) {
      gsap.fromTo(
        textColRef.current.children,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out' }
      );
    }
    if (imageColRef.current) {
      gsap.fromTo(
        imageColRef.current,
        { scale: 1.03, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.55, ease: 'power2.out' }
      );
    }
  }, [kicker]);

  return (
    <section className="relative min-h-[100svh] pt-20 bg-[#111210] border-b border-[#34362E] flex items-stretch">
      <div className="max-w-[1360px] w-full mx-auto px-5 sm:px-8 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Text Column */}
        <div
          ref={textColRef}
          className="lg:col-span-6 flex flex-col justify-center space-y-6 py-4"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044]">
            {kicker}
          </p>

          <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight leading-[0.95] text-[#F3F2E9]">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-[#A5A69B] leading-relaxed max-w-xl">
            {description}
          </p>

          {metaLine && (
            <p className="text-xs text-[#A5A69B] pt-1 border-t border-[#34362E]/80 max-w-md">
              {metaLine}
            </p>
          )}

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] font-semibold text-sm rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {secondaryLinkLabel && onSecondaryClick && (
              <button
                type="button"
                onClick={onSecondaryClick}
                className="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2 text-sm font-medium text-[#F3F2E9] hover:text-[#E6F044] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{secondaryLinkLabel}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Large Photograph Column */}
        <div className="lg:col-span-6 flex items-stretch">
          <div
            ref={imageColRef}
            className="relative w-full min-h-[340px] sm:min-h-[440px] lg:h-full rounded-xl overflow-hidden border border-[#34362E] bg-[#1B1D19]"
          >
            <ResilientImage
              src={imageSrc}
              alt={imageAlt}
              loading="eager"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111210]/70 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
