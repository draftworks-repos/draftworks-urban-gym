import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { PageId } from '../utils/gymLogic';
import { BRAND_INFO } from '../data/gymData';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
}

const NAV_LINKS: { id: PageId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'programs', label: 'Programs' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenEnquiry,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerPanelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced && drawerPanelRef.current && backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.22, ease: 'power2.out' }
        );
        gsap.fromTo(
          drawerPanelRef.current,
          { x: '100%', opacity: 0.6 },
          { x: '0%', opacity: 1, duration: 0.28, ease: 'power3.out' }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  const handleLinkClick = (page: PageId) => {
    setDrawerOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          isScrolled
            ? 'bg-[#111210]/95 backdrop-blur-md border-b border-[#34362E]'
            : 'bg-[#111210]/70 border-b border-[#34362E]/60'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="?page=home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="font-display text-2xl md:text-3xl font-extrabold tracking-wider uppercase text-[#F3F2E9] hover:text-[#E6F044] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E6F044]"
          >
            DRAFTWORKS
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8 text-sm font-medium"
          >
            {NAV_LINKS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={`?page=${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#E6F044] font-semibold after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-[#E6F044]'
                      : 'text-[#F3F2E9]/85 hover:text-[#F3F2E9]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action (Desktop) + Drawer trigger (Tablet/Mobile) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] font-semibold text-sm rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6F044]"
            >
              <span>Book a Trial</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#34362E] bg-[#1B1D19] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fixed Right-to-Left Navigation Drawer for Tablet & Mobile */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation drawer"
        >
          {/* Backdrop */}
          <div
            ref={backdropRef}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/80"
          />

          {/* Slide-in Drawer Panel */}
          <div
            ref={drawerPanelRef}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#1B1D19] border-l border-[#34362E] flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#34362E]">
                <span className="font-display text-2xl font-extrabold tracking-wider uppercase text-[#F3F2E9]">
                  DRAFTWORKS
                </span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#34362E] bg-[#242620] text-[#F3F2E9] hover:border-[#E6F044] hover:text-[#E6F044] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav aria-label="Mobile Navigation" className="mt-8 flex flex-col gap-2">
                <a
                  href="?page=home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('home');
                  }}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-lg font-display text-2xl uppercase tracking-wide transition-colors ${
                    currentPage === 'home'
                      ? 'bg-[#242620] text-[#E6F044] font-bold'
                      : 'text-[#F3F2E9] hover:bg-[#242620]'
                  }`}
                >
                  <span>Home</span>
                  <ArrowUpRight className="w-5 h-5 opacity-60" />
                </a>
                {NAV_LINKS.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`?page=${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.id);
                      }}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-lg font-display text-2xl uppercase tracking-wide transition-colors ${
                        isActive
                          ? 'bg-[#242620] text-[#E6F044] font-bold'
                          : 'text-[#F3F2E9] hover:bg-[#242620]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-60" />
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#34362E] space-y-4">
              <div className="text-xs text-[#A5A69B] space-y-1">
                <p className="text-[#F3F2E9] font-medium">{BRAND_INFO.phone}</p>
                <p>{BRAND_INFO.email}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] font-semibold text-sm rounded-md transition-colors cursor-pointer"
              >
                <span>Book a Trial</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
