import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import {
  validateEnquiryForm,
  ValidationErrors,
  EnquiryFormInput,
} from '../utils/gymLogic';
import {
  IMAGES,
  BRAND_INFO,
  BRANCHES,
  TRAINING_PROGRAMS,
} from '../data/gymData';
import { InternalSplitHero } from '../components/InternalSplitHero';

interface ContactPageProps {
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
  onSubmitted?: (submission: EnquiryFormInput) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenEnquiry,
  onSubmitted,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(TRAINING_PROGRAMS[0].title);
  const [branch, setBranch] = useState(BRANCHES[0].name);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeMapBranch, setActiveMapBranch] = useState(BRANCHES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: EnquiryFormInput = {
      name,
      phone,
      program,
      branch,
      message,
    };
    const validation = validateEnquiryForm(payload);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    if (onSubmitted) {
      onSubmitted(payload);
    }
  };

  return (
    <div className="bg-[#111210] text-[#F3F2E9]">
      {/* Consistent Internal Split Hero (~100svh) */}
      <InternalSplitHero
        kicker="Direct Desk & Club Locations"
        title={
          <>
            VISIT A <span className="text-[#E6F044]">DRAFTWORKS</span> FLOOR NEAR YOU.
          </>
        }
        description="Speak directly with our head coaches in Bengaluru, Mumbai, New Delhi, or Hyderabad to schedule a floor walkthrough, movement screen, or trial session."
        ctaLabel="Open Quick Trial Popup"
        onCtaClick={() => onOpenEnquiry()}
        imageSrc={IMAGES.coachLead}
        imageAlt="DraftWorks head strength coach on the gym floor"
        metaLine={`Phone: ${BRAND_INFO.phone} · Email: ${BRAND_INFO.email}`}
      />

      {/* Contact Details + Enquiry Form Section */}
      <section className="py-20 lg:py-28 bg-[#111210] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Contact & Branch Quick Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
                  Get In Touch
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F3F2E9]">
                  DIRECT <span className="text-[#E6F044]">MEMBER</span> DESK
                </h2>
                <p className="mt-3 text-sm text-[#A5A69B] leading-relaxed">
                  No automated call centres. Your enquiry goes straight to the floor manager
                  at your chosen DraftWorks branch.
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#34362E]">
                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#E6F044] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#A5A69B]">
                      All-India Member Helpline
                    </p>
                    <a
                      href={`tel:${BRAND_INFO.phone.replace(/\s+/g, '')}`}
                      className="font-display text-2xl font-bold text-[#F3F2E9] hover:text-[#E6F044] transition-colors tabular-nums"
                    >
                      {BRAND_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#E6F044] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#A5A69B]">
                      Email Desk
                    </p>
                    <a
                      href={`mailto:${BRAND_INFO.email}`}
                      className="font-display text-2xl font-bold text-[#F3F2E9] hover:text-[#E6F044] transition-colors"
                    >
                      {BRAND_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#E6F044] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#A5A69B]">
                      Standard Operating Hours
                    </p>
                    <p className="text-sm font-medium text-[#F3F2E9] mt-0.5">
                      Monday – Sunday · 5:30 AM to 10:30 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Validated Enquiry Form */}
            <div className="lg:col-span-7 bg-[#242620] border border-[#34362E] rounded-xl p-6 sm:p-10">
              <h3 className="font-display text-3xl font-bold uppercase text-[#F3F2E9]">
                Send an Enquiry
              </h3>
              <p className="text-sm text-[#A5A69B] mt-1">
                Fill in your details below to book a trial or request corporate membership
                rates.
              </p>

              {submitted ? (
                <div className="mt-8 p-6 rounded-xl bg-[#1B1D19] border border-[#E6F044] space-y-4">
                  <div className="flex items-center gap-3 text-[#E6F044]">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <h4 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                      Enquiry Received
                    </h4>
                  </div>
                  <p className="text-sm text-[#A5A69B]">
                    Thank you, <strong className="text-[#F3F2E9]">{name}</strong>. Our
                    coaching desk at <strong className="text-[#E6F044]">{branch}</strong> will
                    reach out on <strong className="text-[#F3F2E9] tabular-nums">{phone}</strong>{' '}
                    shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setName('');
                      setPhone('');
                      setMessage('');
                      setSubmitted(false);
                    }}
                    className="px-5 py-2.5 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] text-xs font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium uppercase tracking-wider text-[#A5A69B] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aditya Verma"
                        className="w-full px-4 py-3 rounded-lg bg-[#111210] border border-[#34362E] text-sm text-[#F3F2E9] placeholder-[#A5A69B]/50 focus:outline-none focus:border-[#E6F044]"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-[#E6F044]" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-medium uppercase tracking-wider text-[#A5A69B] mb-1.5"
                      >
                        Phone Number (India) *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-lg bg-[#111210] border border-[#34362E] text-sm text-[#F3F2E9] placeholder-[#A5A69B]/50 focus:outline-none focus:border-[#E6F044] tabular-nums"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-[#E6F044]" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-program"
                        className="block text-xs font-medium uppercase tracking-wider text-[#A5A69B] mb-1.5"
                      >
                        Interested Program *
                      </label>
                      <select
                        id="contact-program"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-[#111210] border border-[#34362E] text-sm text-[#F3F2E9] focus:outline-none focus:border-[#E6F044]"
                      >
                        {TRAINING_PROGRAMS.map((p) => (
                          <option key={p.id} value={p.title}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-branch"
                        className="block text-xs font-medium uppercase tracking-wider text-[#A5A69B] mb-1.5"
                      >
                        Preferred Branch *
                      </label>
                      <select
                        id="contact-branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-[#111210] border border-[#34362E] text-sm text-[#F3F2E9] focus:outline-none focus:border-[#E6F044]"
                      >
                        {BRANCHES.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium uppercase tracking-wider text-[#A5A69B] mb-1.5"
                    >
                      Training Goals / Notes (Optional)
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your lifting experience or preferred training time..."
                      className="w-full px-4 py-3 rounded-lg bg-[#111210] border border-[#34362E] text-sm text-[#F3F2E9] placeholder-[#A5A69B]/50 focus:outline-none focus:border-[#E6F044]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210] font-semibold text-sm rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Submit Enquiry</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Branch Information & Responsive Embedded Google Map */}
      <section className="py-20 lg:py-28 bg-[#1B1D19]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
              Branch Directory &amp; Map
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F3F2E9]">
              FOUR <span className="text-[#E6F044]">LOCATIONS</span> ACROSS INDIA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRANCHES.map((b) => {
              const isSelected = activeMapBranch.id === b.id;
              return (
                <article
                  key={b.id}
                  className={`rounded-xl p-6 flex flex-col justify-between border transition-colors ${
                    isSelected
                      ? 'bg-[#242620] border-[#E6F044]'
                      : 'bg-[#242620] border-[#34362E]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#E6F044] font-semibold">
                      <span>{b.city}</span>
                      <span className="tabular-nums">{b.floorArea}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                      {b.name}
                    </h3>
                    <p className="text-xs text-[#A5A69B] leading-relaxed flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#E6F044] shrink-0 mt-0.5" />
                      <span>{b.address}</span>
                    </p>
                    <p className="text-xs text-[#A5A69B]">{b.hours}</p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#34362E] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveMapBranch(b)}
                      className={`text-xs font-semibold cursor-pointer ${
                        isSelected
                          ? 'text-[#E6F044]'
                          : 'text-[#F3F2E9] hover:text-[#E6F044]'
                      }`}
                    >
                      {isSelected ? 'Showing on Map' : 'Focus on Map'}
                    </button>

                    <a
                      href={b.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#A5A69B] hover:text-[#E6F044] transition-colors"
                    >
                      <span>Directions</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Responsive Embedded Google Map */}
          <div className="w-full rounded-xl overflow-hidden border border-[#34362E] bg-[#111210]">
            <div className="px-5 py-3.5 bg-[#242620] border-b border-[#34362E] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-[#E6F044]" />
                <span className="font-semibold text-[#F3F2E9]">
                  {activeMapBranch.name}
                </span>
                <span className="text-[#A5A69B] hidden sm:inline">
                  — {activeMapBranch.address}
                </span>
              </div>
              <a
                href={activeMapBranch.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#E6F044] hover:text-[#C8D52C]"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] min-h-[320px]">
              <iframe
                title={`Google Map for DraftWorks ${activeMapBranch.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  activeMapBranch.address
                )}&output=embed`}
                className="absolute inset-0 w-full h-full border-0 grayscale contrast-125 invert-[90%] hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
