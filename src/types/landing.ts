export const defaultSectionOrder = [
  'hero',
  'trustBar',
  'fitStudents',
  'curriculum',
  'teacherIntro',
  'proof',
  'faq',
  'contact'
] as const;

export const optionalSectionIds = [
  'seasonalPromo',
  'scoreProof',
  'schedule',
  'location',
  'teachingMaterials',
  'floatingCta'
] as const;

export const sectionIds = [...defaultSectionOrder, ...optionalSectionIds] as const;

export const themeVariants = ['daySky', 'softBlush'] as const;

export type LandingSectionId = (typeof sectionIds)[number];
export type ThemeVariant = (typeof themeVariants)[number];

export interface LandingCta {
  label: string;
  href: string;
}

export interface ContactField {
  name: string;
  label: string;
  type: 'text' | 'tel' | 'email' | 'textarea';
  placeholder?: string;
  required?: boolean;
}

export interface LandingData {
  brand: {
    teacherName: string;
    subject: string;
    brandName: string;
    tagline: string;
    logo?: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    points: string[];
    primaryCta: LandingCta;
    secondaryCta?: LandingCta;
    image?: string;
  };
  trustBar: string[];
  fitStudents: {
    title: string;
    items: string[];
  };
  curriculum: Array<{
    title: string;
    description: string;
    badge?: string;
  }>;
  teacherIntro: {
    title: string;
    body: string;
    image?: string;
  };
  proof: {
    title: string;
    reviews: Array<{
      quote: string;
      name: string;
    }>;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
  contact: {
    title: string;
    description: string;
    fields: ContactField[];
  };
  theme: {
    variant: ThemeVariant;
  };
  enabledSections?: LandingSectionId[];
  sectionOrder?: LandingSectionId[];
}

export interface LandingSeoMeta {
  title: string;
  description: string;
  ogImage?: string;
}
