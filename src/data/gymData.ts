export const IMAGES = {
  heroMain: '/temp/hero.webp',
  aboutEditorial: '/temp/about.webp',
  strengthBarbell: '/temp/training.webp',
  coachLead: '/temp/coach.webp',
  turfConditioning: '/temp/transformation.webp',
  after: '/temp/after.webp',
  before: '/temp/before.webp',
};

export interface TrainingProgram {
  id: string;
  index: string;
  title: string;
  category: 'Strength' | 'Conditioning' | 'Olympic' | 'Mobility';
  shortDescription: string;
  image: string;
  focus: string;
  sessionDuration: string;
  schedule: string;
  equipment: string[];
  overview: string;
}

export interface CoachProfile {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
  objectPosition?: string;
}

export interface TransformationEntry {
  id: string;
  name: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
}

export interface GoogleReviewItem {
  id: string;
  reviewerName: string;
  quote: string;
}

export interface BranchItem {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
  mapLink: string;
  floorArea: string;
}

export interface GalleryItem {
  id: string;
  label: string;
  category: 'Strength Floor' | 'Conditioning Turf' | 'Barbell Club' | 'Architecture';
  image: string;
  aspect: 'wide' | 'tall' | 'standard';
  objectPosition?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  periodLabel: string;
  durationText: string;
  priceINR: number;
  effectiveMonthlyINR: number;
  featured?: boolean;
  description: string;
  inclusions: string[];
}

export const BRAND_INFO = {
  name: 'DraftWorks',
  email: 'hello@draftworks.in',
  phone: '+91 89596 90529',
  foundedYear: 2019,
  founder: 'Arjun Deshmukh',
  founderRole: 'Founder & Head of Strength Programming',
  totalBranches: 4,
};

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'barbell-strength',
    index: '01',
    title: 'Compound Barbell Strength',
    category: 'Strength',
    shortDescription:
      'Progressive overload across squat, bench, deadlift, and overhead press on calibrated steel racks.',
    image: IMAGES.strengthBarbell,
    focus: 'Maximal Force & Structural Hypertrophy',
    sessionDuration: '75 Mins',
    schedule: 'Mon – Sat · 6:00 AM to 9:30 PM',
    equipment: ['Calibrated Kg Plates', 'Competition Power Bars', 'Monolift Attachments'],
    overview:
      'Built on 8-week periodized training blocks with tracked working weights, velocity targets, and technical coaching on every heavy set.',
  },
  {
    id: 'metabolic-turf',
    index: '02',
    title: 'Metabolic Turf Conditioning',
    category: 'Conditioning',
    shortDescription:
      'High-output anaerobic intervals using heavy prowler sleds, ski ergs, and kettlebell complexes.',
    image: IMAGES.turfConditioning,
    focus: 'Work Capacity & Lactate Threshold',
    sessionDuration: '60 Mins',
    schedule: 'Mon – Sat · 6:30 AM, 8:00 AM, 6:00 PM, 7:30 PM',
    equipment: ['40m Sprint Turf', 'Heavy Prowler Sleds', 'Concept2 SkiErgs & Rowers'],
    overview:
      'Structured energy-system conditioning designed to build relentless stamina without sacrificing lean muscle mass.',
  },
  {
    id: 'olympic-lifting',
    index: '03',
    title: 'Olympic Weightlifting Club',
    category: 'Olympic',
    shortDescription:
      'Technical mastery of the snatch, clean and jerk, and explosive pulling derivatives on timber platforms.',
    image: IMAGES.aboutEditorial,
    focus: 'Rate of Force Development & Triple Extension',
    sessionDuration: '90 Mins',
    schedule: 'Tue, Thu, Sat · 7:00 AM & 6:30 PM',
    equipment: ['IWF Needle-Bearing Bars', 'Solid Oak Lifting Platforms', 'Jerk Blocks'],
    overview:
      'Small-group technical sessions focused on bar path mechanics, overhead stability, and receiving speed.',
  },
  {
    id: 'athletic-hypertrophy',
    index: '04',
    title: 'Industrial Hypertrophy & Armor',
    category: 'Strength',
    shortDescription:
      'High-volume accessory work, unilateral loading, and joint-resilient muscular development.',
    image: IMAGES.heroMain,
    focus: 'Muscular Density & Postural Resilience',
    sessionDuration: '70 Mins',
    schedule: 'Daily · Open Floor & Coached Windows',
    equipment: ['2.5kg–60kg Pro Dumbbells', 'Belt Squat Machines', 'CableStacks & Glute-Ham Developers'],
    overview:
      'Targeted hypertrophy programming pairing compound lifts with precision cable and unilateral dumbbell work.',
  },
  {
    id: 'structural-mobility',
    index: '05',
    title: 'Structural Mobility & Recovery',
    category: 'Mobility',
    shortDescription:
      'End-range joint strength, thoracic decompression, and loaded stretching for heavy lifters.',
    image: IMAGES.coachLead,
    focus: 'Joint Capsule Integrity & Longevity',
    sessionDuration: '50 Mins',
    schedule: 'Wed, Fri, Sun · 8:30 AM & 7:00 PM',
    equipment: ['Stall Bars', 'Isometric Slant Boards', 'Contrast Cold Plunge Suite'],
    overview:
      'Active articular rotations and loaded end-range conditioning to keep shoulders, hips, and spines resilient under heavy iron.',
  },
];

export const COACHES: CoachProfile[] = [
  {
    id: 'arjun-deshmukh',
    name: 'Arjun Deshmukh',
    role: 'Founder & Head Strength Coach',
    specialty: 'Powerlifting & Force Mechanics',
    experience: '12 Years Coaching',
    image: IMAGES.coachLead,
    objectPosition: 'center top',
  },
  {
    id: 'rohan-kapoor',
    name: 'Rohan Kapoor',
    role: 'Lead Barbell & Olympic Coach',
    specialty: 'Weightlifting & Explosive Power',
    experience: '9 Years Coaching',
    image: IMAGES.strengthBarbell,
    objectPosition: 'center 20%',
  },
  {
    id: 'vikram-nair',
    name: 'Vikram Nair',
    role: 'Director of Athletic Conditioning',
    specialty: 'Energy Systems & Turf Sleds',
    experience: '8 Years Coaching',
    image: IMAGES.turfConditioning,
    objectPosition: '30% center',
  },
  {
    id: 'siddharth-menon',
    name: 'Siddharth Menon',
    role: 'Senior Performance Specialist',
    specialty: 'Hypertrophy & Structural Balance',
    experience: '7 Years Coaching',
    image: IMAGES.aboutEditorial,
    objectPosition: '68% center',
  },
];

export const TRANSFORMATIONS: TransformationEntry[] = [
  {
    id: 'kabir-mehta',
    name: 'Kabir Mehta',
    duration: '16 Weeks',
    beforeImage: IMAGES.before,
    afterImage: IMAGES.after,
  },
  {
    id: 'dev-rathore',
    name: 'Dev Rathore',
    duration: '24 Weeks',
    beforeImage: IMAGES.before,
    afterImage: IMAGES.after,
  },
  {
    id: 'aarav-kulkarni',
    name: 'Aarav Kulkarni',
    duration: '12 Weeks',
    beforeImage: IMAGES.before,
    afterImage: IMAGES.after,
  },
];

export const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'rev-1',
    reviewerName: 'Pranav Kulkarni',
    quote:
      'Zero fluff, calibrated plates on every platform, and coaches who actually watch your bar path instead of staring at their phones. Best strength floor in Bengaluru.',
  },
  {
    id: 'rev-2',
    reviewerName: 'Meera Krishnan',
    quote:
      'Switched from a commercial health club six months ago. The 40-metre turf track and structured barbell blocks completely changed how I train.',
  },
  {
    id: 'rev-3',
    reviewerName: 'Harshvardhan Rao',
    quote:
      'Industrial atmosphere, serious lifters, and immaculate equipment maintenance. Every power rack has competition bars and proper chalk stations.',
  },
  {
    id: 'rev-4',
    reviewerName: 'Nikhil Shenoy',
    quote:
      'The coaching team corrected my deadlift setup on day one. Added 40 kg to my total in four months without a single lower-back flare-up.',
  },
  {
    id: 'rev-5',
    reviewerName: 'Tanvi Deshpande',
    quote:
      'Clean locker rooms, cold plunge recovery, and an electric training vibe at 6 AM. DraftWorks feels like a dedicated athletic performance centre.',
  },
];

export const BRANCHES: BranchItem[] = [
  {
    id: 'bengaluru-indiranagar',
    name: 'Bengaluru — Indiranagar',
    city: 'Bengaluru',
    address: '748, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    hours: 'Mon – Sun: 5:30 AM – 10:30 PM',
    phone: '+91 89596 90529',
    image: IMAGES.heroMain,
    mapLink: 'https://maps.google.com/?q=100+Feet+Road+Indiranagar+Bengaluru',
    floorArea: '14,500 sq. ft.',
  },
  {
    id: 'mumbai-bandra',
    name: 'Mumbai — Bandra West',
    city: 'Mumbai',
    address: 'Plot 19, Waterfield Road, Bandra West, Mumbai, Maharashtra 400050',
    hours: 'Mon – Sun: 5:30 AM – 11:00 PM',
    phone: '+91 89596 90529',
    image: IMAGES.aboutEditorial,
    mapLink: 'https://maps.google.com/?q=Waterfield+Road+Bandra+West+Mumbai',
    floorArea: '12,000 sq. ft.',
  },
  {
    id: 'delhi-vasant-vihar',
    name: 'New Delhi — Vasant Vihar',
    city: 'New Delhi',
    address: 'Basant Lok Market, Community Centre, Vasant Vihar, New Delhi 110057',
    hours: 'Mon – Sun: 6:00 AM – 10:30 PM',
    phone: '+91 89596 90529',
    image: IMAGES.turfConditioning,
    mapLink: 'https://maps.google.com/?q=Basant+Lok+Vasant+Vihar+New+Delhi',
    floorArea: '16,000 sq. ft.',
  },
  {
    id: 'hyderabad-jubilee-hills',
    name: 'Hyderabad — Jubilee Hills',
    city: 'Hyderabad',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
    hours: 'Mon – Sun: 5:30 AM – 10:30 PM',
    phone: '+91 89596 90529',
    image: IMAGES.strengthBarbell,
    mapLink: 'https://maps.google.com/?q=Road+No+36+Jubilee+Hills+Hyderabad',
    floorArea: '15,200 sq. ft.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    label: 'Indiranagar Power Racks',
    category: 'Strength Floor',
    image: IMAGES.heroMain,
    aspect: 'wide',
  },
  {
    id: 'gal-2',
    label: 'Olympic Timber Platforms',
    category: 'Barbell Club',
    image: IMAGES.aboutEditorial,
    aspect: 'standard',
  },
  {
    id: 'gal-3',
    label: 'Calibrated Deadlift Bay',
    category: 'Barbell Club',
    image: IMAGES.strengthBarbell,
    aspect: 'tall',
  },
  {
    id: 'gal-4',
    label: '40m Prowler Turf Track',
    category: 'Conditioning Turf',
    image: IMAGES.turfConditioning,
    aspect: 'wide',
  },
  {
    id: 'gal-5',
    label: 'Coaching & Assessment Zone',
    category: 'Architecture',
    image: IMAGES.coachLead,
    aspect: 'tall',
  },
  {
    id: 'gal-6',
    label: 'Heavy Dumbbell (Up to 60kg)',
    category: 'Strength Floor',
    image: IMAGES.aboutEditorial,
    aspect: 'standard',
    objectPosition: 'left bottom',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'monthly',
    name: 'Monthly Club Pass',
    periodLabel: 'Monthly',
    durationText: 'Billed every 30 days',
    priceINR: 6500,
    effectiveMonthlyINR: 6500,
    description:
      'Full, unrestricted access to all strength floors, conditioning turf tracks, and scheduled group training blocks.',
    inclusions: [
      'Unrestricted access to all training zones & platforms',
      'All coach-led Strength, Conditioning & Olympic sessions',
      'Initial movement & force-profile assessment',
      'Locker room, sauna & contrast shower access',
    ],
  },
  {
    id: 'quarterly',
    name: 'Quarterly Performance',
    periodLabel: 'Quarterly',
    durationText: '3 Months commitment',
    priceINR: 16500,
    effectiveMonthlyINR: 5500,
    featured: true,
    description:
      'Designed around our signature 12-week strength and conditioning mesocycle with bi-weekly coach check-ins.',
    inclusions: [
      'Everything in Monthly Club Pass across all 4 India branches',
      '12-week periodized training log & load progression tracking',
      '2× 1-on-1 barbell technique calibration sessions',
      'Cold plunge & recovery lounge access included',
      '15-day membership freeze allowance',
    ],
  },
  {
    id: 'annual',
    name: 'Annual Black Iron',
    periodLabel: 'Annual',
    durationText: '12 Months commitment',
    priceINR: 54000,
    effectiveMonthlyINR: 4500,
    description:
      'Year-round athletic development for committed lifters, with multi-city passport access and priority coaching.',
    inclusions: [
      'All-India passport access (Bengaluru, Mumbai, Delhi, Hyderabad)',
      'Quarterly 1-on-1 strength & body composition diagnostics',
      'Priority booking for Olympic Lifting & Small-Group clinics',
      'Dedicated personal locker for lifting belt & shoes',
      '45-day travel freeze allowance + 4 guest trial passes',
    ],
  },
];
