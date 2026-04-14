import type { LandingSectionId } from '../../types/landing';
import { resolveSectionOrder } from './resolveSectionOrder';

export interface LandingSkeletonSection {
  id: string;
  label: string;
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
  teachingMaterials: '교재',
  floatingCta: '플로팅 CTA'
};

export function getLandingSkeletonSections(
  enabledSections?: LandingSectionId[],
  sectionOrder?: LandingSectionId[]
): LandingSkeletonSection[] {
  const sections = resolveSectionOrder(enabledSections, sectionOrder).map((sectionId) => ({
    id: sectionId,
    label: sectionLabels[sectionId]
  }));

  return [
    { id: 'header', label: '헤더' },
    ...sections,
    { id: 'footer', label: '푸터' }
  ];
}
