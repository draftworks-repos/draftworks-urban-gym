import React from 'react';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { PageId } from '../utils/gymLogic';
import { BRAND_INFO, BRANCHES } from '../data/gymData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiry }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111210] border-t border-[#34362E] text-[#F3F2E9]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#34362E]">
          {/* Col 1: Brand & Short Description */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="?page=home"
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
              }}
              className="inline-block font-display text-3xl font-extrabold tracking-wider uppercase text-[#F3F2E9] hover:text-[#E6F044] transition-colors"
            >
              DRAFTWORKS
            </a>
            <p className="text-sm text-[#A5A69B] leading-relaxed max-w-sm">
              Industrial strength and conditioning clubs built for serious barbell progression,
              metabolic turf work, and coach-led athletic performance across India.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#A5A69B]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E6F044] transition-colors inline-flex items-center gap-1"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E6F044] transition-colors inline-flex items-center gap-1"
              >
                <span>YouTube</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E6F044] transition-colors inline-flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-[#F3F2E9]">
              Pages
            </h3>
            <ul className="space-y-2.5 text-sm text-[#A5A69B]">
              {(
                [
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About the Club' },
                  { id: 'programs', label: 'Training Programs' },
                  { id: 'gallery', label: 'Facility Gallery' },
                  { id: 'pricing', label: 'Memberships' },
                  { id: 'contact', label: 'Contact & Locations' },
                ] as { id: PageId; label: string }[]
              ).map((item) => (
                <li key={item.id}>
                  <a
                    href={`?page=${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(item.id);
                    }}
                    className="hover:text-[#E6F044] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Branches */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-[#F3F2E9]">
              Club Locations
            </h3>
            <ul className="space-y-2.5 text-sm text-[#A5A69B]">
              {BRANCHES.map((branch) => (
                <li key={branch.id}>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(undefined, branch.name)}
                    className="text-left hover:text-[#E6F044] transition-colors flex items-start gap-2 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-[#E6F044] shrink-0 mt-0.5" />
                    <span>{branch.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-[#F3F2E9]">
              Direct Desk
            </h3>
            <div className="space-y-2.5 text-sm text-[#A5A69B]">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E6F044] shrink-0" />
                <a
                  href={`tel:${BRAND_INFO.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[#F3F2E9] transition-colors tabular-nums"
                >
                  {BRAND_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E6F044] shrink-0" />
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="hover:text-[#F3F2E9] transition-colors"
                >
                  {BRAND_INFO.email}
                </a>
              </p>
              <p className="text-xs text-[#A5A69B] pt-1">
                Training Hours: Mon – Sun · 5:30 AM – 10:30 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Credit Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A5A69B]">
          <p>© 2026 DraftWorks. All rights reserved.</p>
          <p>
            Designed &amp; Developed by{' '}
            <a
              href="https://draftbox.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6F044] hover:text-[#C8D52C] font-semibold underline underline-offset-4 transition-colors"
            >
              DraftBox.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
