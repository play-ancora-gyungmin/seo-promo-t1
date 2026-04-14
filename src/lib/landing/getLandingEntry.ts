import { getEntry, type CollectionEntry } from 'astro:content';

export type LandingEntry = CollectionEntry<'teachers'>;

export async function getLandingEntry(slug: string): Promise<LandingEntry> {
  const entry = await getEntry('teachers', slug);

  if (!entry) {
    throw new Error(`Landing entry not found for slug: ${slug}`);
  }

  return entry;
}
