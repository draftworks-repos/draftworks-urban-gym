import React, { useState, useEffect } from 'react';
import { PageId, getPageMetadata, EnquiryFormInput } from './utils/gymLogic';
import { GALLERY_ITEMS } from './data/gymData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { GalleryPage } from './pages/GalleryPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { InitialLoader } from './components/InitialLoader';

const VALID_PAGES: PageId[] = [
  'home',
  'about',
  'programs',
  'gallery',
  'pricing',
  'contact',
];

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home';
  const params = new URLSearchParams(window.location.search);
  const rawPage = params.get('page') as PageId | null;
  if (rawPage && VALID_PAGES.includes(rawPage)) {
    return rawPage;
  }
  return 'home';
}

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [defaultProgram, setDefaultProgram] = useState<string | undefined>(undefined);
  const [defaultBranch, setDefaultBranch] = useState<string | undefined>(undefined);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [, setSubmissions] = useState<EnquiryFormInput[]>([]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const meta = getPageMetadata(currentPage);
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) {
      ogTitleEl.setAttribute('content', meta.title);
    }
    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) {
      ogDescEl.setAttribute('content', meta.description);
    }
  }, [currentPage]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    if (page === 'home') {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', page);
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleOpenEnquiry = (program?: string, branch?: string) => {
    setDefaultProgram(program);
    setDefaultBranch(branch);
    setEnquiryOpen(true);
  };

  const handleSubmitted = (submission: EnquiryFormInput) => {
    setSubmissions((prev) => [submission, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111210] text-[#F3F2E9] overflow-x-hidden">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenLightbox={(index) => setLightboxIndex(index)}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}
        {currentPage === 'programs' && (
          <ProgramsPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage
            onOpenEnquiry={handleOpenEnquiry}
            onOpenLightbox={(index) => setLightboxIndex(index)}
          />
        )}
        {currentPage === 'pricing' && (
          <PricingPage
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            onOpenEnquiry={handleOpenEnquiry}
            onSubmitted={handleSubmitted}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultProgram={defaultProgram}
        defaultBranch={defaultBranch}
        onSubmitted={handleSubmitted}
      />

      <GalleryLightbox
        items={GALLERY_ITEMS}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={(nextIdx) => setLightboxIndex(nextIdx)}
      />

      {isInitialLoading && (
        <InitialLoader onComplete={() => setIsInitialLoading(false)} />
      )}
    </div>
  );
}
