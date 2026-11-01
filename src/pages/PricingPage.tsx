import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { PageId, formatINR } from '../utils/gymLogic';
import { IMAGES, PRICING_TIERS } from '../data/gymData';
import { InternalSplitHero } from '../components/InternalSplitHero';

interface PricingPageProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: (defaultProgram?: string, defaultBranch?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  return (
    <div className="bg-[#111210] text-[#F3F2E9]">
      {/* Consistent Internal Split Hero (~100svh) */}
      <InternalSplitHero
        kicker="Transparent INR Memberships"
        title={
          <>
            ONE CLUB PASS. <span className="text-[#E6F044]">EVERY</span> BARBELL, PLATFORM &amp;
            TURF LANE.
          </>
        }
        description="We never split pricing by training method. Whether you train compound powerlifting, Olympic weightlifting, or metabolic turf conditioning, one membership unlocks the entire facility."
        ctaLabel="Book a Trial Session"
        onCtaClick={() => onOpenEnquiry()}
        secondaryLinkLabel="Questions? Contact Desk"
        onSecondaryClick={() => {
          onNavigate('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        imageSrc={IMAGES.heroMain}
        imageAlt="DraftWorks power racks and lifting platforms"
        metaLine="All Prices Inclusive of 18% GST · Zero Joining or Administration Fees"
      />

      {/* Monthly, Quarterly & Annual Pricing Tiers */}
      <section className="py-20 lg:py-28 bg-[#111210] border-b border-[#34362E]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
              Club Access Plans
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F3F2E9]">
              CHOOSE YOUR <span className="text-[#E6F044]">COMMITMENT</span> HORIZON
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A5A69B]">
              Every tier includes full access to all five DraftWorks training programs,
              on-floor coaching windows, and recovery suites.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_TIERS.map((tier) => (
              <article
                key={tier.id}
                className={`rounded-xl p-7 sm:p-8 flex flex-col justify-between border ${
                  tier.featured
                    ? 'bg-[#242620] border-[#E6F044]'
                    : 'bg-[#1B1D19] border-[#34362E]'
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044]">
                        {tier.periodLabel}
                      </p>
                      <h3 className="font-display text-3xl font-bold uppercase text-[#F3F2E9] mt-1">
                        {tier.name}
                      </h3>
                    </div>
                    {tier.featured && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#E6F044]">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#34362E]">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-5xl sm:text-6xl font-extrabold text-[#F3F2E9] tabular-nums">
                        {formatINR(tier.priceINR)}
                      </span>
                      <span className="text-xs text-[#A5A69B]">/ {tier.periodLabel.toLowerCase()}</span>
                    </div>
                    <p className="text-xs text-[#A5A69B] mt-1 tabular-nums">
                      Effective {formatINR(tier.effectiveMonthlyINR)} / month · {tier.durationText}
                    </p>
                  </div>

                  <p className="text-sm text-[#A5A69B] leading-relaxed">
                    {tier.description}
                  </p>

                  <ul className="space-y-3 pt-2 border-t border-[#34362E]">
                    {tier.inclusions.map((inc) => (
                      <li
                        key={inc}
                        className="flex items-start gap-2.5 text-sm text-[#F3F2E9]/90"
                      >
                        <Check className="w-4 h-4 text-[#E6F044] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-8 border-t border-[#34362E]">
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(`Membership: ${tier.name}`)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      tier.featured
                        ? 'bg-[#E6F044] hover:bg-[#C8D52C] text-[#111210]'
                        : 'bg-[#242620] hover:bg-[#E6F044] text-[#F3F2E9] hover:text-[#111210] border border-[#34362E]'
                    }`}
                  >
                    <span>Select {tier.periodLabel} Plan</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Policies & Straightforward FAQ */}
      <section className="py-20 lg:py-24 bg-[#1B1D19]">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E6F044] mb-2">
              Membership Terms
            </p>
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-[#F3F2E9]">
              CLEAR POLICIES. NO HIDDEN CLAUSES.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-[#242620] border border-[#34362E] space-y-2">
              <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                Are all training programs included in the membership?
              </h3>
              <p className="text-sm text-[#A5A69B] leading-relaxed">
                Yes. Compound Barbell Strength, Metabolic Turf Conditioning, Olympic
                Weightlifting Club, Hypertrophy, and Structural Mobility are all included
                under one membership price.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#242620] border border-[#34362E] space-y-2">
              <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                Can I train at other DraftWorks branches when I travel?
              </h3>
              <p className="text-sm text-[#A5A69B] leading-relaxed">
                Quarterly and Annual members enjoy multi-city access across Bengaluru,
                Mumbai, New Delhi, and Hyderabad at no additional charge.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#242620] border border-[#34362E] space-y-2">
              <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                How does the trial session work?
              </h3>
              <p className="text-sm text-[#A5A69B] leading-relaxed">
                Your trial includes a 60-minute coached floor session and movement screen at
                your preferred branch so you can experience our racks, bars, and coaching
                firsthand.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#242620] border border-[#34362E] space-y-2">
              <h3 className="font-display text-2xl font-bold uppercase text-[#F3F2E9]">
                What payment methods are accepted?
              </h3>
              <p className="text-sm text-[#A5A69B] leading-relaxed">
                We accept UPI, all major Indian credit and debit cards, NEFT/IMPS, and
                corporate wellness reimbursements with GST-compliant tax invoices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
