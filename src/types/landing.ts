import type { ImageMetadata } from "astro";

export const defaultSectionOrder = [
  "hero",
  "trustBar",
  "fitStudents",
  "curriculum",
  "teacherIntro",
  "proof",
  "faq",
  "contact",
] as const;

export const optionalSectionIds = [
  "seasonalPromo",
  "scoreProof",
  "schedule",
  "location",
  "teachingMaterials",
  "floatingCta",
] as const;

export const sectionTypes = [
  ...defaultSectionOrder,
  ...optionalSectionIds,
] as const;
export const sectionIds = sectionTypes;

export const themeVariants = ["daySky", "softBlush"] as const;

export type LandingSectionType = (typeof sectionTypes)[number];
export type LandingSectionId = LandingSectionType;
export type ThemeVariant = (typeof themeVariants)[number];
export type LandingSectionKind = "slide" | "flow";

export interface LandingSectionConfig {
  id: string;
  type: LandingSectionType;
  enabled?: boolean;
  label?: string;
  kind?: LandingSectionKind;
}

const defaultSectionKinds: Partial<
  Record<LandingSectionType, LandingSectionKind>
> = {
  floatingCta: "flow",
};

export const defaultSections: LandingSectionConfig[] = defaultSectionOrder.map(
  (type) => ({
    id: type,
    type,
    kind: defaultSectionKinds[type] ?? "slide",
  }),
);

export interface LandingCta {
  label?: string;
  href?: string;
}

export interface ContactField {
  name?: string;
  label?: string;
  type?: "text" | "tel" | "email" | "textarea";
  placeholder?: string;
  required?: boolean;
}

export interface ContactChannel {
  kind?: "kakao" | "instagram" | "website" | "blog" | "band";
  label?: string;
  href?: string;
}

export interface ContactLocation {
  name?: string;
  address?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
}

export interface ScoreProofStat {
  value?: string;
  label?: string;
  detail?: string;
}

export interface ScoreProofSchool {
  name?: string;
  achievements?: string[];
}

export interface CurriculumStep {
  title?: string;
  description?: string[];
}

export interface CurriculumItem {
  title?: string;
  description?: string;
  badge?: string;
  steps?: CurriculumStep[];
}

export interface TeachingMaterialBook {
  image: ImageMetadata;
  alt: string;
  label?: string;
}

export interface LandingData {
  brand?: {
    teacherName?: string;
    subject?: string;
    brandName?: string;
    tagline?: string;
    logo?: ImageMetadata;
    academyLogo?: ImageMetadata;
  };
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  hero?: {
    headline?:
      | string
      | {
          lines?: string[];
          lead?: {
            prefix?: string;
            emphasis?: string;
          };
        };
    subheadline?: string;
    points?: string[];
    primaryCta?: LandingCta;
    secondaryCta?: LandingCta;
    image?: ImageMetadata;
  };
  trustBar?: string[];
  fitStudents?: {
    title?: string;
    items?: string[];
  };
  curriculum?: CurriculumItem[];
  teacherIntro?: {
    title?: string;
    body?: string;
    items?: string[];
    image?: ImageMetadata;
  };
  scoreProof?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    stats?: ScoreProofStat[];
    schools?: ScoreProofSchool[];
    highlights?: string[];
  };
  teachingMaterials?: {
    eyebrow?: string;
    title: string;
    description: string;
    points?: string[];
    books: TeachingMaterialBook[];
    note?: string;
  };
  proof?: {
    title?: string;
    reviews?: Array<{
      quote?: string;
      name?: string;
      alt?: string;
      image?: ImageMetadata;
    }>;
  };
  faq?: Array<{
    question?: string;
    answer?: string;
  }>;
  contact?: {
    title?: string;
    description?: string;
    phone?: string;
    locations?: ContactLocation[];
    channels?: ContactChannel[];
    fields?: ContactField[];
  };
  theme?: {
    variant?: ThemeVariant;
  };
  sections?: LandingSectionConfig[];
  enabledSections?: LandingSectionId[];
  sectionOrder?: LandingSectionId[];
}

export interface LandingSeoMeta {
  title: string;
  description: string;
  ogImage?: string;
}
