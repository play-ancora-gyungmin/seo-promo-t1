import type {
  LandingSectionConfig,
  LandingSectionId,
  LandingSectionKind
} from '../../types/landing';
import { resolveSections } from './resolveSectionOrder';

export interface LandingSkeletonSection {
  id: string;
  type: LandingSectionId;
  label: string;
  kind: LandingSectionKind;
}

const sectionLabels: Record<LandingSectionId, string> = {
  hero: '히어로',
  trustBar: '신뢰 바',
  fitStudents: '대상 학생',
  curriculum: '커리큘럼',
  teacherIntro: '강사 소개',
  proof: '후기 / 증빙',
  faq: '자주 묻는 질문',
  contact: '문의',
  seasonalPromo: '시즌 프로모션',
  scoreProof: '성적 증빙',
  schedule: '일정',
  location: '위치',
  teachingMaterials: '자체 교재',
  floatingCta: '플로팅 CTA'
};

export function getLandingSkeletonSections(
  sectionsOrEnabled?: LandingSectionConfig[] | LandingSectionId[],
  enabledOrOrder?: LandingSectionId[],
  maybeSectionOrder?: LandingSectionId[]
): LandingSkeletonSection[] {
  return resolveSections(sectionsOrEnabled, enabledOrOrder, maybeSectionOrder).map((section) => ({
    id: section.id,
    type: section.type,
    kind: section.kind ?? 'slide',
    label:
      section.label ??
      (section.id === section.type
        ? sectionLabels[section.type]
        : `${sectionLabels[section.type]} · ${section.id}`)
  }));
}
