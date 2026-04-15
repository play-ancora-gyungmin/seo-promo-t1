import {
  defaultSections,
  defaultSectionOrder,
  optionalSectionIds,
  type LandingSectionConfig,
  type LandingSectionId,
  type LandingSectionKind
} from '../../types/landing';

const canonicalOrder = [...defaultSectionOrder, ...optionalSectionIds];
const defaultKinds: Partial<Record<LandingSectionId, LandingSectionKind>> = {
  floatingCta: 'flow'
};

function normalizeSection(section: LandingSectionConfig): LandingSectionConfig | null {
  const normalizedId = section.id.trim();

  if (!normalizedId || section.enabled === false) {
    return null;
  }

  return {
    ...section,
    id: normalizedId,
    kind: section.kind ?? defaultKinds[section.type] ?? 'slide'
  };
}

function resolveLegacySections(
  enabledSections?: LandingSectionId[],
  sectionOrder?: LandingSectionId[]
): LandingSectionConfig[] {
  const initialEnabled = sectionOrder?.length ? sectionOrder : [...defaultSectionOrder];
  const enabled = new Set(enabledSections?.length ? enabledSections : initialEnabled);

  return [...(sectionOrder ?? []), ...canonicalOrder]
    .filter((section, index, source) => source.indexOf(section) === index && enabled.has(section))
    .map((type) => ({
      id: type,
      type,
      kind: defaultKinds[type] ?? 'slide'
    }));
}

export function resolveSections(
  sectionsOrEnabled?: LandingSectionConfig[] | LandingSectionId[],
  enabledOrOrder?: LandingSectionId[],
  maybeSectionOrder?: LandingSectionId[]
): LandingSectionConfig[] {
  const usesLegacySignature =
    Array.isArray(sectionsOrEnabled) &&
    sectionsOrEnabled.length > 0 &&
    typeof sectionsOrEnabled[0] === 'string';
  const sections = usesLegacySignature ? undefined : (sectionsOrEnabled as LandingSectionConfig[] | undefined);
  const enabledSections = usesLegacySignature
    ? (sectionsOrEnabled as LandingSectionId[])
    : enabledOrOrder;
  const sectionOrder = usesLegacySignature ? enabledOrOrder : maybeSectionOrder;
  const source = sections?.length ? sections : resolveLegacySections(enabledSections, sectionOrder);
  const fallback = source.length ? source : defaultSections;
  const seenIds = new Set<string>();

  return fallback.flatMap((section) => {
    const normalized = normalizeSection(section);

    if (!normalized || seenIds.has(normalized.id)) {
      return [];
    }

    seenIds.add(normalized.id);

    return [normalized];
  });
}

export function resolveSectionOrder(
  enabledSections?: LandingSectionId[],
  sectionOrder?: LandingSectionId[]
): LandingSectionConfig[] {
  return resolveSections(undefined, enabledSections, sectionOrder);
}
