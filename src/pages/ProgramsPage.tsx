import React, { useState, useEffect } from 'react';
import { ArrowUpRight, SlidersHorizontal, X, Clock, Calendar } from 'lucide-react';
import { PageId } from '../utils/gymLogic';
import { IMAGES, TRAINING_PROGRAMS, TrainingProgram } from '../data/gymData';
import { InternalSplitHero } from '../components/InternalSplitHero';
import { ResilientImage } from '../components/ResilientImage';

interface ProgramsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
}

const CATEGORIES = ['All', 'Strength', 'Conditioning', 'Olympic', 'Mobility'] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [activeProgramDetail, setActiveProgramDetail] = useState<TrainingProgram | null>(
    null
  );

  useEffect(() => {
    if (filterDrawerOpen || activeProgramDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [filterDrawerOpen, activeProgramDetail]);

  const filteredPrograms =
    selectedCategory === 'All'
      ? TRAINING_PROGRAMS
      : TRAINING_PROGRAMS.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#111210] text-[#F3F2E9]">
      {/* Consistent Internal Split Hero (~100svh) */}
      <InternalSplitHero
        kicker="Structured Mesocycles"
        title={
          <>
            FIVE DISCIPLINES. <span className="text-[#E6F044]">ONE UNIFIED</span> CLUB
            MEMBERSHIP.
          </>
        }
        description="Every DraftWorks membership includes unrestricted access to our compound barbell blocks, metabolic turf conditioning, Olympic weightlifting platforms, and recovery suites."
        ctaLabel="Book a Trial Session"
        onCtaClick={() => onOpenEnquiry()}
        secondaryLinkLabel="See Membership Plans"
        onSecondaryClick={() => {
          onNavigate('pricing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        imageSrc={IMAGES.strengthBarbell}
        imageAlt="Athlete preparing for heavy barbell lift at DraftWorks"
        metaLine="12-Week Periodized Blocks · Coach-Led Floor Windows · All Levels Welcome"
      />

      {/* Programs Listing + Responsive Filter Controls */}
      <section className="py-20 lg:py-28 bg-[#111210]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#34362E]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
                Training Directory
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F3F2E9]">
                TRAINING <span className="text-[#E6F044]">PROGRAMS</span>
              </h2>
            </div>

            {/* Desktop Inline Filter Controls */}
            <div
              className="hidden lg:flex items-center gap-2 bg-[#1B1D19] p-1.5 rounded-lg border border-[#34362E]"
              role="group"
              aria-label="Filter training programs by category"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#E6F044] text-[#111210]'
                        : 'text-[#A5A69B] hover:text-[#F3F2E9]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Tablet & Mobile Filter Drawer Trigger (No Horizontal Scroll) */}
            <div className="flex lg:hidden items-center justify-between gap-4">
              <span className="text-xs text-[#A5A69B]">
                Showing: <strong className="text-[#E6F044]">{selectedCategory}</strong> (
                {filteredPrograms.length})
              </span>
              <button
                type="button"
                onClick={() => setFilterDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1B1D19] border border-[#34362E] text-xs font-semibold text-[#F3F2E9] hover:border-[#E6F044] transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#E6F044]" />
                <span>Filter Programs</span>
              </button>
            </div>
          </div>

          {/* Program Grid (2-column on Tablet/Desktop, 1-column on Mobile) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPrograms.map((prog) => (
              <article
                key={prog.id}
                className="bg-[#242620] border border-[#34362E] rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-[#111210] overflow-hidden">
                    <ResilientImage
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242620] via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 font-display text-sm font-bold text-[#E6F044] bg-[#111210]/90 px-2.5 py-1 rounded border border-[#34362E] tabular-nums">
                      {prog.index} · {prog.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    <h3 className="font-display text-3xl font-bold uppercase tracking-wide text-[#F3F2E9]">
                      {prog.title}
                    </h3>
                    <p className="text-sm text-[#A5A69B] leading-relaxed">
                      {prog.shortDescription}
                    </p>
                    <p className="text-xs text-[#A5A69B] pt-2">
                      {prog.sessionDuration} · {prog.schedule}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-[#34362E]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveProgramDetail(prog)}
                    className="text-xs font-semibold text-[#F3F2E9] hover:text-[#E6F044] underline underline-offset-4 text-left cursor-pointer"
                  >
                    View Program Curriculum
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(prog.title)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] text-xs font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    <span>Book Trial</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tablet & Mobile Slide-Out Filter Drawer */}
      {filterDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filter programs"
        >
          <div
            onClick={() => setFilterDrawerOpen(false)}
            className="fixed inset-0 bg-black/80"
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#1B1D19] border-l border-[#34362E] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#34362E]">
                <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                  Filter Discipline
                </h3>
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(false)}
                  aria-label="Close filter drawer"
                  className="w-10 h-10 rounded-lg border border-[#34362E] bg-[#242620] text-[#F3F2E9] inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                {CATEGORIES.map((category) => {
                  const active = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category);
                        setFilterDrawerOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg font-display text-xl uppercase tracking-wide transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#E6F044] text-[#111210] font-bold'
                          : 'bg-[#242620] text-[#F3F2E9] hover:border-[#E6F044]'
                      }`}
                    >
                      {category}
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
              Reset Filter
            </button>
          </div>
        </div>
      )}

      {/* Program Details Modal */}
      {activeProgramDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80"
          role="dialog"
          aria-modal="true"
          aria-labelledby="program-detail-title"
        >
          <div className="w-full max-w-xl bg-[#242620] border border-[#34362E] rounded-xl p-6 sm:p-8 text-[#F3F2E9] max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#34362E]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044]">
                  Track {activeProgramDetail.index} · {activeProgramDetail.category}
                </p>
                <h3
                  id="program-detail-title"
                  className="font-display text-3xl font-bold uppercase text-[#F3F2E9] mt-1"
                >
                  {activeProgramDetail.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProgramDetail(null)}
                aria-label="Close program details"
                className="w-10 h-10 rounded-lg border border-[#34362E] bg-[#1B1D19] text-[#A5A69B] hover:text-[#F3F2E9] inline-flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#A5A69B] leading-relaxed">
              {activeProgramDetail.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#A5A69B] pt-2">
              <div className="p-3.5 rounded-lg bg-[#1B1D19] border border-[#34362E] space-y-1">
                <p className="text-[#E6F044] font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Session Length</span>
                </p>
                <p className="text-[#F3F2E9]">{activeProgramDetail.sessionDuration}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-[#1B1D19] border border-[#34362E] space-y-1">
                <p className="text-[#E6F044] font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Coached Windows</span>
                </p>
                <p className="text-[#F3F2E9]">{activeProgramDetail.schedule}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A5A69B]">
                Dedicated Floor Hardware
              </p>
              <ul className="space-y-1.5 text-sm text-[#F3F2E9]">
                {activeProgramDetail.equipment.map((eq) => (
                  <li key={eq}>· {eq}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#34362E] flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const title = activeProgramDetail.title;
                  setActiveProgramDetail(null);
                  onOpenEnquiry(title);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] text-xs font-semibold rounded-md transition-colors cursor-pointer"
              >
                <span>Book Trial for {activeProgramDetail.title}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
