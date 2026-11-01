export type PageId = 'home' | 'about' | 'programs' | 'gallery' | 'pricing' | 'contact';

export interface EnquiryFormInput {
  name: string;
  phone: string;
  program: string;
  branch: string;
  message?: string;
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  program?: string;
  branch?: string;
}

/**
 * Validates Indian phone numbers (+91 optional, 10 digits starting with 6-9)
 * and required fields for DraftWorks enquiry form.
 */
export function validateEnquiryForm(input: EnquiryFormInput): {
  valid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  const trimmedName = input.name.trim();
  if (!trimmedName || trimmedName.length < 2) {
    errors.name = 'Enter your full name (at least 2 characters).';
  }

  const rawPhone = input.phone.trim();
  // Strip spaces, hyphens, parentheses
  const normalizedPhone = rawPhone.replace(/[\s\-()]/g, '');
  const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;

  if (!rawPhone) {
    errors.phone = 'Enter your 10-digit mobile number.';
  } else if (!indianPhoneRegex.test(normalizedPhone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number (e.g. +91 98765 43210).';
  }

  if (!input.program || !input.program.trim()) {
    errors.program = 'Select a training program.';
  }

  if (!input.branch || !input.branch.trim()) {
    errors.branch = 'Select your preferred branch.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Clamps the before/after slider percentage between 5 and 95 for usability.
 */
export function clampSliderPercentage(percent: number): number {
  if (Number.isNaN(percent)) return 50;
  return Math.max(5, Math.min(95, Math.round(percent * 10) / 10));
}

/**
 * Computes the maximum starting slide index for a horizontal carousel
 * given total items and visible cards per viewport.
 */
export function getMaxCarouselIndex(totalItems: number, visibleCount: number): number {
  if (totalItems <= 0 || visibleCount <= 0) return 0;
  return Math.max(0, totalItems - visibleCount);
}

/**
 * Steps carousel index safely within [0, maxIndex].
 */
export function stepCarouselIndex(
  currentIndex: number,
  delta: number,
  totalItems: number,
  visibleCount: number
): number {
  const maxIndex = getMaxCarouselIndex(totalItems, visibleCount);
  const next = currentIndex + delta;
  return Math.max(0, Math.min(maxIndex, next));
}

/**
 * Formats an amount in INR with Indian numbering separators.
 */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Resolves page title and meta description for SEO.
 */
export function getPageMetadata(page: PageId): { title: string; description: string } {
  switch (page) {
    case 'about':
      return {
        title: 'About DraftWorks — Industrial Strength Club & Coaching Philosophy',
        description:
          'Founded in 2019, DraftWorks operates 4 architectural strength and conditioning facilities across Bengaluru, Mumbai, New Delhi, and Hyderabad.',
      };
    case 'programs':
      return {
        title: 'Training Programs — Barbell, Conditioning & Mobility | DraftWorks',
        description:
          'Explore structured training tracks at DraftWorks: Compound Barbell Strength, Metabolic Turf Conditioning, Olympic Lifting, and Athletic Mobility.',
      };
    case 'gallery':
      return {
        title: 'Facility Gallery — Inside Our Strength Clubs | DraftWorks',
        description:
          'Step inside DraftWorks clubs across India. Calibrated competition plates, custom steel power racks, 40m sled turf tracks, and recovery zones.',
      };
    case 'pricing':
      return {
        title: 'Membership Pricing — Monthly, Quarterly & Annual Access | DraftWorks',
        description:
          'Transparent INR memberships with full access to all strength floors, conditioning tracks, and coach-led sessions at DraftWorks.',
      };
    case 'contact':
      return {
        title: 'Contact & Branches — Book a Trial Session | DraftWorks',
        description:
          'Visit DraftWorks in Indiranagar Bengaluru, Bandra West Mumbai, Vasant Vihar New Delhi, or Jubilee Hills Hyderabad. Call +91 89596 90529.',
      };
    case 'home':
    default:
      return {
        title: 'DraftWorks — Urban Strength & Conditioning Club | India',
        description:
          'DraftWorks is an industrial strength and conditioning fitness club in Bengaluru, Mumbai, New Delhi, and Hyderabad. Built for serious barbell, turf, and athletic training.',
      };
  }
}
