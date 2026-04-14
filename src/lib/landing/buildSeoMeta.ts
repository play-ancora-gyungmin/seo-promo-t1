import type { LandingData, LandingSeoMeta } from '../../types/landing';

export function buildSeoMeta(data: LandingData): LandingSeoMeta {
  return {
    title: data.seo.title || data.brand.brandName,
    description: data.seo.description || data.brand.tagline,
    ogImage: data.seo.ogImage
  };
}
