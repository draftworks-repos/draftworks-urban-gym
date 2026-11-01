import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Maximize2, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { PageId } from '../utils/gymLogic';
import {
  IMAGES,
  TRAINING_PROGRAMS,
  COACHES,
  GALLERY_ITEMS,
  GOOGLE_REVIEWS,
  BRANCHES,
  BRAND_INFO,
} from '../data/gymData';
import { ResilientImage } from '../components/ResilientImage';
import { HorizontalCarousel } from '../components/HorizontalCarousel';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
  onOpenLightbox: (index: number) => void;
}

const GoogleLogoIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
    />
  </svg>
);

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenEnquiry,
  onOpenLightbox,
}) => {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutStatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !heroContentRef.current) return;

    gsap.fromTo(
      heroContentRef.current.children,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, []);

  useEffect(() => {
    const stats = aboutStatsRef.current;
    if (!stats) return;

    const counters = Array.from(stats.querySelectorAll<HTMLElement>('[data-stat-value]'));
    const tweens: gsap.core.Tween[] = [];
    const animateCounters = () => {
      counters.forEach((counter) => {
        const target = Number(counter.dataset.statValue);
        const finalText = counter.dataset.statDisplay || String(target);
        const value = { current: 0 };

        tweens.push(gsap.to(value, {
          current: target,
          duration: 3,
          ease: 'power1.out',
          onUpdate: () => {
            const current = Math.round(value.current);
            counter.textContent = finalText.includes(',')
              ? current.toLocaleString('en-IN')
              : finalText.startsWith('0') && finalText.length === 2
                ? String(current).padStart(2, '0')
                : String(current);
          },
          onComplete: () => {
            counter.textContent = finalText;
          },
        }));
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      counters.forEach((counter) => {
        counter.textContent = counter.dataset.statDisplay || counter.dataset.statValue || '';
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      animateCounters();
      return () => tweens.forEach((tween) => tween.kill());
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        animateCounters();
      },
      { threshold: 0.25 }
    );
    observer.observe(stats);

    return () => {
      observer.disconnect();
      tweens.forEach((tween) => tween.kill());
    };
  }, []);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#111210] text-[#F3F2E9]">
      {/* 1. HERO SECTION — Full-Screen Photographic Background (~100svh) */}
      <section className="relative min-h-[100svh] flex items-end pb-16 sm:pb-24 pt-28 overflow-hidden border-b border-[#34362E]">
        <div className="absolute inset-0 z-0">
          <ResilientImage
            src={IMAGES.heroMain}
            alt="DraftWorks urban strength and conditioning gym floor with calibrated power racks"
            loading="eager"
            className="w-full h-full object-cover object-center scale-100"
          />
          {/* Measured dark architectural scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111210]/90 via-[#111210]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1360px] w-full mx-auto px-5 sm:px-8">
          <div ref={heroContentRef} className="max-w-3xl space-y-6">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E6F044]">
              Bengaluru · Mumbai · New Delhi · Hyderabad
            </p>

            <h1 className="font-display text-5xl sm:text-7xl lg:text-[84px] font-extrabold uppercase tracking-tight leading-[0.92] text-[#F3F2E9]">
              IRON, TURF &amp;{' '}
              <span className="text-[#E6F044]">UNCOMPROMISING</span> STRENGTH.
            </h1>

            <p className="text-base sm:text-lg text-[#A5A69B] max-w-xl leading-relaxed">
              An industrial strength and conditioning club engineered around competition
              barbells, 40-metre sprint turf, and periodized coaching.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] font-semibold text-sm rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Book a Trial Session</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="?page=programs"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav('programs');
                }}
                className="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2 text-sm font-medium text-[#F3F2E9] hover:text-[#E6F044] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Explore Training Tracks</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT THE GYM — Editorial Asymmetric Composition */}
      <section className="py-20 lg:py-28 bg-[#111210] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Editorial Headline & Ownership Story */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044]">
                About DraftWorks
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95] text-[#F3F2E9]">
                NO CHROME MACHINES. JUST <span className="text-[#E6F044]">RAW IRON</span> &amp;
                PRECISION COACHING.
              </h2>
              <p className="text-base text-[#A5A69B] leading-relaxed">
                Founded in {BRAND_INFO.foundedYear} by former national powerlifter{' '}
                <span className="text-[#F3F2E9] font-medium">{BRAND_INFO.founder}</span>,
                DraftWorks was created to replace overcrowded commercial health clubs with
                serious athletic training floors.
              </p>
              <p className="text-sm text-[#A5A69B] leading-relaxed">
                Every club is outfitted with calibrated competition kilogram plates, solid
                oak Olympic lifting platforms, and dedicated conditioning lanes overseen by
                full-time strength coaches.
              </p>
              <div className="pt-2">
                <a
                  href="?page=about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('about');
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#E6F044] hover:text-[#C8D52C] underline underline-offset-4 transition-colors"
                >
                  <span>Read the DraftWorks Story</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Editorial Photography + Business Facts Strip */}
            <div className="lg:col-span-7 space-y-8">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#34362E] bg-[#1B1D19]">
                <ResilientImage
                  src={IMAGES.aboutEditorial}
                  alt="DraftWorks Olympic lifting platforms and heavy dumbbell racks"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 2x2 on Tablet/Mobile, 4-col on Desktop Business Facts */}
              <div
                ref={aboutStatsRef}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-[#34362E]"
              >
                <div>
                  <p className="font-display text-4xl font-bold text-[#E6F044] tabular-nums">
                    <span data-stat-value="4" data-stat-display="04">04</span>
                  </p>
                  <p className="text-xs text-[#A5A69B] mt-1">
                    Urban Clubs in India
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-[#F3F2E9] tabular-nums">
                    <span data-stat-value="57700" data-stat-display="57,700">57,700</span>
                  </p>
                  <p className="text-xs text-[#A5A69B] mt-1">
                    Sq. Ft. Training Space
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-[#F3F2E9] tabular-nums">
                    <span data-stat-value="32" data-stat-display="32">32</span>
                  </p>
                  <p className="text-xs text-[#A5A69B] mt-1">
                    Competition Power Racks
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-[#F3F2E9] tabular-nums">
                    <span data-stat-value="2019" data-stat-display="2019">2019</span>
                  </p>
                  <p className="text-xs text-[#A5A69B] mt-1">
                    Est. Indiranagar, BLR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES / TRAINING PROGRAMS — Horizontal Carousel */}
      <section className="py-20 lg:py-28 bg-[#1B1D19] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <HorizontalCarousel
            kicker="Training disciplines"
            title={
              <>
                ENGINEERED <span className="text-[#E6F044]">TRAINING</span> PROGRAMS
              </>
            }
            subtitle="All memberships include unrestricted access across every training discipline. No fragmented class packs or add-on fees."
            desktopCards={3}
            ariaLabel="Training Programs"
            items={TRAINING_PROGRAMS.map((prog) => (
              <article
                key={prog.id}
                className="h-full bg-[#242620] border border-[#34362E] rounded-xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#111210]">
                    <ResilientImage
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242620] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 font-display text-sm font-bold text-[#E6F044] bg-[#111210]/85 px-2.5 py-1 rounded border border-[#34362E] tabular-nums">
                      {prog.index}
                    </span>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#F3F2E9]">
                      {prog.title}
                    </h3>
                    <p className="text-sm text-[#A5A69B] leading-relaxed">
                      {prog.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#34362E]/70 flex items-center justify-between text-xs text-[#A5A69B]">
                  <span>{prog.sessionDuration}</span>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(prog.title)}
                    className="text-[#E6F044] hover:text-[#C8D52C] font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book Session</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          />
        </div>
      </section>

      {/* 4. WHY US — Editorial Composition (Non-Grid, Architectural Layout) */}
      <section className="py-20 lg:py-28 bg-[#111210] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
              The DraftWorks Standard
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95] text-[#F3F2E9]">
              BUILT FOR LIFTERS WHO <span className="text-[#E6F044]">MEASURE</span> PROGRESS IN
              KILOGRAMS.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Large Supporting Visual Column */}
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-[#34362E] min-h-[360px] bg-[#1B1D19]">
              <ResilientImage
                src={IMAGES.turfConditioning}
                alt="Athletes pushing heavy prowler sleds on the 40-metre indoor turf track"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111210]/90 via-[#111210]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="max-w-md">
                  <p className="text-xs uppercase tracking-widest text-[#E6F044] font-semibold">
                    Zero Wait Times
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F3F2E9] mt-1">
                    Capped Floor Capacity Across Every Peak Hour
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNav('pricing')}
                  className="self-start sm:self-auto px-4 py-2.5 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  View Club Access
                </button>
              </div>
            </div>

            {/* Editorial Points Column (Hairline Separators, No Boxed Grid) */}
            <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-[#34362E] border-y border-[#34362E]">
              <div className="py-6 space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#F3F2E9]">
                    Calibrated Competition Hardware
                  </h3>
                  <span className="font-display text-sm font-bold text-[#E6F044] tabular-nums">
                    01
                  </span>
                </div>
                <p className="text-sm text-[#A5A69B] leading-relaxed">
                  Every platform is equipped with 29mm power bars, IWF weightlifting bars,
                  and calibrated steel plates accurate to within 10 grams.
                </p>
              </div>

              <div className="py-6 space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#F3F2E9]">
                    Floor Coaching Included as Standard
                  </h3>
                  <span className="font-display text-sm font-bold text-[#E6F044] tabular-nums">
                    02
                  </span>
                </div>
                <p className="text-sm text-[#A5A69B] leading-relaxed">
                  Our coaches actively spot, cue bar path mechanics, and program 12-week
                  strength blocks on the main floor without forcing personal training upsells.
                </p>
              </div>

              <div className="py-6 space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#F3F2E9]">
                    40-Metre Conditioning &amp; Contrast Recovery
                  </h3>
                  <span className="font-display text-sm font-bold text-[#E6F044] tabular-nums">
                    03
                  </span>
                </div>
                <p className="text-sm text-[#A5A69B] leading-relaxed">
                  Transition directly from heavy prowler sprints to our 8°C cold plunges and
                  dry cedar saunas to accelerate central nervous system recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR COACHES — Strong Photography & Concise Info */}
      <section className="py-20 lg:py-28 bg-[#1B1D19] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
                Coaching Roster
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F3F2E9]">
                LED BY <span className="text-[#E6F044]">COMPETITIVE</span> STRENGTH COACHES
              </h2>
            </div>
            <a
              href="?page=about"
              onClick={(e) => {
                e.preventDefault();
                handleNav('about');
              }}
              className="text-sm font-medium text-[#F3F2E9] hover:text-[#E6F044] underline underline-offset-4 transition-colors self-start md:self-auto"
            >
              Meet the Full Team
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COACHES.map((coach) => (
              <article
                key={coach.id}
                className="group bg-[#242620] border border-[#34362E] rounded-xl overflow-hidden flex flex-col transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[#E6F044] hover:shadow-lg motion-reduce:transition-none"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111210]">
                  <ResilientImage
                    src={coach.image}
                    alt={coach.name}
                    style={{ objectPosition: coach.objectPosition || 'center' }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#F3F2E9]">
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
        </div>
      </section>

      {/* 6. BEFORE & AFTER — Minimal Draggable Centre Divider */}
      <section className="py-20 lg:py-28 bg-[#111210] border-b border-[#34362E]">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
              Documented Mesocycles
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F3F2E9]">
              REAL <span className="text-[#E6F044]">ATHLETIC</span> PROGRESSION
            </h2>
          </div>

          <BeforeAfterSlider />
        </div>
      </section>

      {/* 7. GALLERY — Asymmetric Editorial Arrangement with Full-Screen Control */}
      <section className="py-20 lg:py-28 bg-[#1B1D19] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
                Inside DraftWorks
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F3F2E9]">
                ARCHITECTURAL <span className="text-[#E6F044]">TRAINING</span> SPACES
              </h2>
            </div>
            <a
              href="?page=gallery"
              onClick={(e) => {
                e.preventDefault();
                handleNav('gallery');
              }}
              className="text-sm font-medium text-[#F3F2E9] hover:text-[#E6F044] underline underline-offset-4 transition-colors self-start md:self-auto"
            >
              Open Full Gallery
            </a>
          </div>

          {/* Asymmetric 12-Col Bento Arrangement */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {GALLERY_ITEMS.slice(0, 5).map((item, idx) => {
              const spanClass =
                idx === 0
                  ? 'md:col-span-7 h-[280px] sm:h-[340px] md:h-[380px]'
                  : idx === 1
                  ? 'md:col-span-5 h-[280px] sm:h-[340px] md:h-[380px]'
                  : 'md:col-span-4 h-[260px] sm:h-[300px]';

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-xl overflow-hidden border border-[#34362E] bg-[#111210] ${spanClass}`}
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.label}
                    style={{ objectPosition: item.objectPosition || 'center' }}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111210]/85 via-transparent to-transparent pointer-events-none" />

                  {/* Small Label + Full-screen Viewing Control Only */}
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[#F3F2E9] bg-[#111210]/80 px-2.5 py-1 rounded border border-[#34362E]">
                      {item.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(idx)}
                      aria-label={`View ${item.label} full screen`}
                      className="w-9 h-9 rounded-lg bg-[#111210]/85 border border-[#34362E] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] inline-flex items-center justify-center transition-colors cursor-pointer"
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

      {/* 8. GOOGLE REVIEWS — Recognizable Google Reviews Carousel */}
      <section className="py-20 lg:py-28 bg-[#111210] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <HorizontalCarousel
            kicker="Verified Member Feedback"
            title={
              <span className="inline-flex flex-wrap items-center gap-3">
                <span>GOOGLE</span>
                <span className="text-[#E6F044]">REVIEWS</span>
                <span className="text-base font-body font-medium text-[#A5A69B] tracking-normal normal-case ml-1 tabular-nums">
                  4.9 ★ across 420+ reviews
                </span>
              </span>
            }
            desktopCards={3}
            ariaLabel="Google Reviews"
            items={GOOGLE_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="h-full bg-[#242620] border border-[#34362E] rounded-xl p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <GoogleLogoIcon />
                      <span className="font-semibold text-sm text-[#F3F2E9]">
                        {review.reviewerName}
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-0.5 text-[#E6F044] text-xs"
                      aria-label="5 out of 5 stars"
                    >
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>

                  <p className="text-sm text-[#A5A69B] leading-relaxed">
                    “{review.quote}”
                  </p>
                </div>
              </article>
            ))}
          />
        </div>
      </section>

      {/* 9. BRANCHES — Carousel of Club Locations */}
      <section className="py-20 lg:py-28 bg-[#1B1D19] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <HorizontalCarousel
            kicker="Club Locations"
            title={
              <>
                FOUR ARCHITECTURAL <span className="text-[#E6F044]">CLUBS</span> ACROSS INDIA
              </>
            }
            desktopCards={2}
            ariaLabel="DraftWorks Branches"
            items={BRANCHES.map((branch) => (
              <article
                key={branch.id}
                className="group h-full bg-[#242620] border border-[#34362E] rounded-xl overflow-hidden flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[#E6F044] hover:shadow-lg motion-reduce:transition-none"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-[#111210] overflow-hidden">
                    <ResilientImage
                      src={branch.image}
                      alt={branch.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#111210]/85 border border-[#34362E] text-xs font-medium text-[#E6F044] tabular-nums">
                      {branch.floorArea}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F3F2E9]">
                      {branch.name}
                    </h3>
                    <p className="text-sm text-[#A5A69B] flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#E6F044] shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-[#34362E]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <a
                    href={branch.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A5A69B] hover:text-[#F3F2E9] transition-colors"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(undefined, branch.name)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] text-xs font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    <span>Enquire at {branch.city}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          />
        </div>
      </section>

      {/* 10. CTA SECTION — Full-Width Background Photograph with Dark Overlay */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#111210]">
        <div className="absolute inset-0 z-0">
          <ResilientImage
            src={IMAGES.strengthBarbell}
            alt="Athlete chalking hands before heavy deadlift at DraftWorks"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#111210]/85" />
          <div className="absolute inset-x-0 top-0 h-1 bg-[#E6F044]/40" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044]">
              Step Onto The Platform
            </p>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[0.94] text-[#F3F2E9]">
              START YOUR FIRST <span className="text-[#E6F044]">MESOCYCLE</span> THIS WEEK.
            </h2>
            <p className="text-base sm:text-lg text-[#A5A69B] leading-relaxed">
              Book a coached floor trial and movement diagnostic at Bengaluru, Mumbai,
              New Delhi, or Hyderabad.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] font-semibold text-sm rounded-md transition-colors cursor-pointer"
              >
                <span>Book a Trial Session</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
