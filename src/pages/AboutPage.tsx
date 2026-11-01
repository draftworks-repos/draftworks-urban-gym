import React from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { PageId } from '../utils/gymLogic';
import { IMAGES, BRAND_INFO, COACHES, BRANCHES } from '../data/gymData';
import { InternalSplitHero } from '../components/InternalSplitHero';
import { ResilientImage } from '../components/ResilientImage';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  return (
    <div className="bg-[#111210] text-[#F3F2E9]">
      {/* Consistent Internal Split Hero (~100svh) */}
      <InternalSplitHero
        kicker="Est. 2019 · Bengaluru, India"
        title={
          <>
            ENGINEERED FOR <span className="text-[#E6F044]">ATHLETIC</span> LONGEVITY &amp;
            FORCE.
          </>
        }
        description="DraftWorks was founded to strip away the distractions of commercial health clubs and build an architectural strength floor dedicated to barbell mastery, turf conditioning, and evidence-based coaching."
        ctaLabel="Book a Club Tour"
        onCtaClick={() => onOpenEnquiry()}
        secondaryLinkLabel="View 4 India Branches"
        onSecondaryClick={() => {
          onNavigate('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        imageSrc={IMAGES.aboutEditorial}
        imageAlt="Inside DraftWorks Olympic lifting and dumbbell floor"
        metaLine="4 Urban Clubs · 57,700 Sq. Ft. Combined Floor Area · 100% Calibrated Steel & Bumper Plates"
      />

      {/* Business Statistics Strip (Flexible Desktop, 2x2 Tablet & Mobile) */}
      <section className="py-14 bg-[#1B1D19] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1">
              <p className="font-display text-5xl font-extrabold text-[#E6F044] tabular-nums">
                04
              </p>
              <p className="text-sm font-medium text-[#F3F2E9]">Active Branches</p>
              <p className="text-xs text-[#A5A69B]">
                Bengaluru, Mumbai, Delhi, Hyderabad
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-display text-5xl font-extrabold text-[#F3F2E9] tabular-nums">
                57,700
              </p>
              <p className="text-sm font-medium text-[#F3F2E9]">Sq. Ft. Under Iron</p>
              <p className="text-xs text-[#A5A69B]">
                High-ceiling industrial training halls
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-display text-5xl font-extrabold text-[#F3F2E9] tabular-nums">
                28+
              </p>
              <p className="text-sm font-medium text-[#F3F2E9]">Full-Time Coaches</p>
              <p className="text-xs text-[#A5A69B]">
                CSCS &amp; national weightlifting certified
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-display text-5xl font-extrabold text-[#F3F2E9] tabular-nums">
                1:8
              </p>
              <p className="text-sm font-medium text-[#F3F2E9]">Peak Floor Ratio</p>
              <p className="text-xs text-[#A5A69B]">
                Capped hourly capacity for zero rack wait
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gym Story & Founder Introduction */}
      <section className="py-20 lg:py-28 bg-[#111210] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#34362E] bg-[#1B1D19]">
                <ResilientImage
                  src={IMAGES.coachLead}
                  alt={`${BRAND_INFO.founder}, Founder of DraftWorks`}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#111210]/90 border border-[#34362E]">
                  <p className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                    {BRAND_INFO.founder}
                  </p>
                  <p className="text-xs text-[#E6F044] mt-0.5">{BRAND_INFO.founderRole}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044]">
                Origin &amp; Ownership
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight leading-[0.95] text-[#F3F2E9]">
                FROM AN INDIRANAGAR WAREHOUSE TO FOUR CITIES.
              </h2>
              <p className="text-base text-[#A5A69B] leading-relaxed">
                In 2019, competitive powerlifter and strength coach{' '}
                <span className="text-[#F3F2E9] font-medium">Arjun Deshmukh</span> leased a
                former textile warehouse off 100 Feet Road in Indiranagar, Bengaluru. At the
                time, lifters in Indian metros had to choose between cramped neighbourhood gyms
                with bent barbells or luxury hotel clubs that banned chalk and deadlifts.
              </p>
              <p className="text-base text-[#A5A69B] leading-relaxed">
                DraftWorks was built as the third option: an architecturally disciplined
                strength club with 8-station competition power racks, solid timber Olympic
                platforms, a 40-metre conditioning turf lane, and coaches whose job is to
                teach mechanics rather than chase sales targets.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#34362E]">
                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-[#F3F2E9]">
                    Independent Ownership
                  </h3>
                  <p className="text-sm text-[#A5A69B] mt-1">
                    100% founder-operated across Bengaluru, Mumbai, New Delhi, and Hyderabad to
                    protect equipment standards and coaching culture.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-[#F3F2E9]">
                    Unified Programming
                  </h3>
                  <p className="text-sm text-[#A5A69B] mt-1">
                    Every member receives structured 12-week training cycles that carry over
                    seamlessly across all four DraftWorks locations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Philosophy & Gym Facilities */}
      <section className="py-20 lg:py-28 bg-[#1B1D19] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
                Training Philosophy &amp; Specifications
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F3F2E9]">
                THE THREE PILLARS OF <span className="text-[#E6F044]">DRAFTWORKS</span>
              </h2>
            </div>
            <p className="lg:col-span-6 text-sm sm:text-base text-[#A5A69B] leading-relaxed">
              We do not run random daily workouts designed merely to make you sweat. Every
              training block is anchored in measurable mechanical tension, energy-system
              conditioning, and joint longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#242620] border border-[#34362E] rounded-xl p-7 space-y-3">
              <span className="font-display text-2xl font-bold text-[#E6F044] tabular-nums">
                01. Force Production
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                Calibrated Barbell Zones
              </h3>
              <p className="text-sm text-[#A5A69B] leading-relaxed">
                8 power racks per club, competition bench stations, deadlift jacks, and
                calibrated steel plates from 0.25 kg fractional discs up to 25 kg reds.
              </p>
            </div>

            <div className="bg-[#242620] border border-[#34362E] rounded-xl p-7 space-y-3">
              <span className="font-display text-2xl font-bold text-[#E6F044] tabular-nums">
                02. Work Capacity
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                40m Turf &amp; Erg Bay
              </h3>
              <p className="text-sm text-[#A5A69B] leading-relaxed">
                High-density shock-absorbent sprint turf loaded with heavy drive sleds,
                competition kettlebells up to 48 kg, Concept2 Rowers, SkiErgs, and Echo Bikes.
              </p>
            </div>

            <div className="bg-[#242620] border border-[#34362E] rounded-xl p-7 space-y-3">
              <span className="font-display text-2xl font-bold text-[#E6F044] tabular-nums">
                03. Nervous System Reset
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                Contrast Recovery Suite
              </h3>
              <p className="text-sm text-[#A5A69B] leading-relaxed">
                Dedicated mobility timber decks, 8°C chilled plunge pools, and dry Finnish
                saunas engineered to keep joints and tissue healthy year-round.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Team & Branch Footprint */}
      <section className="py-20 lg:py-28 bg-[#111210]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
              Leadership on the Floor
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F3F2E9]">
              SENIOR <span className="text-[#E6F044]">COACHING</span> TEAM
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COACHES.map((coach) => (
              <article
                key={coach.id}
                className="bg-[#242620] border border-[#34362E] rounded-xl overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-[#111210]">
                  <ResilientImage
                    src={coach.image}
                    alt={coach.name}
                    style={{ objectPosition: coach.objectPosition || 'center' }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                    {coach.name}
                  </h3>
                  <p className="text-xs font-medium text-[#E6F044]">{coach.role}</p>
                  <p className="text-xs text-[#A5A69B] pt-1">
                    {coach.specialty} · {coach.experience}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* 4 Branches Summary Strip */}
          <div className="pt-12 border-t border-[#34362E] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <h3 className="font-display text-3xl font-bold uppercase text-[#F3F2E9]">
                Four Clubs Across India
              </h3>
              <p className="text-sm text-[#A5A69B]">
                Every Quarterly and Annual member receives passport access to train at any
                DraftWorks facility when travelling.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {BRANCHES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => onOpenEnquiry(undefined, b.name)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1B1D19] border border-[#34362E] hover:border-[#E6F044] text-xs font-medium text-[#F3F2E9] transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E6F044]" />
                  <span>{b.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A5A69B]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
