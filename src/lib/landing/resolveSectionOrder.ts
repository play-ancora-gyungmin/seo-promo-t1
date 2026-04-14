import {
  defaultSectionOrder,
  optionalSectionIds,
  type LandingSectionId
} from '../../types/landing';

const canonicalOrder = [...defaultSectionOrder, ...optionalSectionIds];

export function resolveSectionOrder(
  enabledSections?: LandingSectionId[],
  sectionOrder?: LandingSectionId[]
): LandingSectionId[] {
  const initialEnabled = sectionOrder?.length ? sectionOrder : [...defaultSectionOrder];
  const enabled = new Set(enabledSections?.length ? enabledSections : initialEnabled);

  return [...(sectionOrder ?? []), ...canonicalOrder].filter(
    (section, index, source) =>
      source.indexOf(section) === index && enabled.has(section)
  );
}
