import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import {
  validateEnquiryForm,
  ValidationErrors,
  EnquiryFormInput,
} from '../utils/gymLogic';
import { TRAINING_PROGRAMS, BRANCHES, BRAND_INFO } from '../data/gymData';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
  defaultBranch?: string;
  onSubmitted?: (submission: EnquiryFormInput) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultProgram = '',
  defaultBranch = '',
  onSubmitted,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(defaultProgram || TRAINING_PROGRAMS[0].title);
  const [branch, setBranch] = useState(defaultBranch || BRANCHES[0].name);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultProgram) setProgram(defaultProgram);
  }, [defaultProgram]);

  useEffect(() => {
    if (defaultBranch) setBranch(defaultBranch);
  }, [defaultBranch]);

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setSubmitted(false);
      document.body.style.overflow = 'hidden';
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced && modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { y: 16, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.22, ease: 'power2.out' }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: EnquiryFormInput = { name, phone, program, branch };
    const result = validateEnquiryForm(payload);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    if (onSubmitted) {
      onSubmitted(payload);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-[#242620] border border-[#34362E] rounded-xl p-6 sm:p-8 text-[#F3F2E9] shadow-2xl max-h-[92vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#34362E]">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#E6F044] font-semibold">
              Club Trial &amp; Membership Enquiry
            </p>
            <h2
              id="enquiry-modal-title"
              className="font-display text-3xl font-bold uppercase tracking-wide text-[#F3F2E9] mt-1"
            >
              Book a Floor Session
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry modal"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#34362E] bg-[#1B1D19] text-[#A5A69B] hover:text-[#F3F2E9] hover:border-[#E6F044] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-[#E6F044]/15 border border-[#E6F044] text-[#E6F044] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                Trial Request Logged
              </h3>
              <p className="text-sm text-[#A5A69B] max-w-md mx-auto">
                Thank you, <span className="text-[#F3F2E9] font-medium">{name}</span>. Our
                front desk at <span className="text-[#E6F044]">{branch}</span> will call{' '}
                <span className="text-[#F3F2E9] tabular-nums">{phone}</span> within 2 business
                hours to schedule your <span className="text-[#F3F2E9]">{program}</span>{' '}
                session.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  setName('');
                  setPhone('');
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] font-semibold text-sm rounded-md transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="enquiry-name"
                className="block text-xs font-medium uppercase tracking-wider text-[#A5A69B] mb-1.5"
              >
                Full Name *
              </label>
              <input
                id="enquiry-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohan Sharma"
                className="w-full px-4 py-3 rounded-lg bg-[#111210] border border-[#34362E] text-sm text-[#F3F2E9] placeholder-[#A5A69B]/50 focus:outline-none focus:border-[#E6F044] transition-colors"
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-[#E6F044]" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="enquiry-phone"
                className="block text-xs font-medium uppercase tracking-wider text-[#A5A69B] mb-1.5"
              >
                Phone Number (India) *
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-lg bg-[#111210] border border-[#34362E] text-sm text-[#F3F2E9] placeholder-[#A5A69B]/50 focus:outline-none focus:border-[#E6F044] transition-colors tabular-nums"
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs text-[#E6F044]" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="enquiry-program"
                className="block text-xs font-medium uppercase tracking-wider text-[#A5A69B] mb-1.5"
              >
                Interested Program *
              </label>
              <select
                id="enquiry-program"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#111210] border border-[#34362E] text-sm text-[#F3F2E9] focus:outline-none focus:border-[#E6F044] transition-colors"
              >
                {TRAINING_PROGRAMS.map((prog) => (
                  <option key={prog.id} value={prog.title}>
                    {prog.title}
                  </option>
                ))}
              </select>
              {errors.program && (
                <p className="mt-1.5 text-xs text-[#E6F044]" role="alert">
                  {errors.program}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="enquiry-branch"
                className="block text-xs font-medium uppercase tracking-wider text-[#A5A69B] mb-1.5"
              >
                Preferred Branch *
              </label>
              <select
                id="enquiry-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#111210] border border-[#34362E] text-sm text-[#F3F2E9] focus:outline-none focus:border-[#E6F044] transition-colors"
              >
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
              {errors.branch && (
                <p className="mt-1.5 text-xs text-[#E6F044]" role="alert">
                  {errors.branch}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] font-semibold text-sm rounded-lg transition-colors cursor-pointer"
              >
                <span>Confirm Trial Request</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <p className="text-[12px] text-[#A5A69B] mt-3 text-center">
                Direct desk: {BRAND_INFO.phone} · {BRAND_INFO.email}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
