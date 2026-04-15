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

export interface LandingData {
  brand?: {
    teacherName?: string;
    subject?: string;
    brandName?: string;
    tagline?: string;
    logo?: ImageMetadata;
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
  curriculum?: Array<{
    title?: string;
    description?: string;
    badge?: string;
  }>;
  teacherIntro?: {
    title?: string;
    body?: string;
    items?: string[];
    image?: ImageMetadata;
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
