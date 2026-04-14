# AGENTS.md

## 프로젝트 정의

이 프로젝트는 "서하늘 영어" 랜딩페이지를 구현하는 동시에, 다른 강사/과목에도 재사용 가능한 랜딩 템플릿 기준안을 만드는 작업이다.

현재 1차 구현 대상은 "서하늘 영어"다. 결과물은 아래 두 역할을 동시에 만족해야 한다.

1. 실제 배포 가능한 랜딩페이지
2. 다른 강사 버전으로 쉽게 복제 가능한 템플릿 시안

---

## 기술 스택

- Astro
- Svelte
- Panda CSS
- TypeScript

---

## 핵심 원칙

- 정적 섹션은 Astro로 구현한다.
- 상호작용이 필요한 부분만 Svelte로 구현한다.
- 스타일은 Panda CSS token, textStyle, recipe 중심으로 구성한다.
- 외부 완성형 디자인 라이브러리는 사용하지 않는다.
- Headless UI 라이브러리도 1차에서는 도입하지 않는다.
- 특정 강사명에 묶인 구조를 만들지 않는다.
- 콘텐츠와 표현을 분리한다.
- 현재 결과물은 서하늘 영어에 최적화하되, 구조 자체는 템플릿형이어야 한다.

---

## 목표

1. `/` 에 서하늘 영어 랜딩페이지를 구현한다.
2. `/preview/sample-math` 에 템플릿 검증용 샘플 페이지를 구현한다.
3. 같은 구조에 다른 콘텐츠 데이터를 넣어도 무너지지 않게 만든다.
4. 향후 공지/칼럼/게시판성 페이지 1~2개 정도를 붙이기 쉬운 구조를 만든다.

---

## 페이지 범위

### 1차 필수 페이지

- `/`
- `/preview/sample-math`

### 향후 확장 대비 페이지

- `/posts`
- `/posts/[slug]`

주의:

- 지금은 게시판 기능 전체를 구현하지 않는다.
- 다만 `posts` 형태의 콘텐츠 페이지를 붙이기 쉬운 구조를 미리 확보한다.

---

## 섹션 구조

### 필수 섹션

1. Header
2. Hero
3. Trust Bar
4. Fit Students
5. Curriculum
6. Teacher Intro
7. Proof / Reviews
8. FAQ
9. Contact
10. Footer

### 옵션 섹션

- seasonal promo
- score proof
- schedule
- location
- teaching materials
- floating CTA

섹션은 공통 구조를 유지하되, `enabledSections` 와 `sectionOrder` 로 일부 제어 가능하게 만든다.

---

## 컴포넌트 목록

### layout

- BaseLayout.astro
- LandingLayout.astro
- Container.astro
- SectionShell.astro
- SiteHeader.astro
- SiteFooter.astro

### sections

- HeroSection.astro
- TrustBarSection.astro
- FitStudentsSection.astro
- CurriculumSection.astro
- TeacherIntroSection.astro
- ProofSection.astro
- FaqSection.astro
- ContactSection.astro
- PreviewBanner.astro

### ui

- Button.astro
- Badge.astro
- Card.astro
- SectionHeading.astro
- StatItem.astro
- ChipList.astro
- InfoList.astro
- ImageFrame.astro
- FormRow.astro
- AppImage.astro
- HeroImage.astro
- InputField.svelte
- TextareaField.svelte
- MobileMenu.svelte
- Accordion.svelte
- AccordionItem.svelte
- FloatingCTA.svelte

### data / util

- getLandingEntry.ts
- resolveSectionOrder.ts
- resolveThemeVariant.ts
- buildSeoMeta.ts

### panda

- text-styles.ts
- semantic-tokens.ts
- button.recipe.ts
- badge.recipe.ts
- card.recipe.ts
- input.recipe.ts
- section-shell.recipe.ts
- chip.recipe.ts
- themes/day-sky.ts
- themes/soft-blush.ts

---

## 디렉토리 구조

```txt
src/
  assets/
    images/
      teachers/
      books/
      decor/
    icons/
  components/
    layout/
    sections/
    ui/
  content/
    config.ts
    teachers/
      seo-haneul-english.json
      sample-math-teacher.json
    posts/
  lib/
    landing/
      getLandingEntry.ts
      resolveSectionOrder.ts
      resolveThemeVariant.ts
      buildSeoMeta.ts
    utils/
  pages/
    index.astro
    preview/
      sample-math.astro
    posts/
      index.astro
      [slug].astro
  styles/
    global.css
  types/
    landing.ts

panda/
  text-styles.ts
  semantic-tokens.ts
  recipes/
  themes/

styled-system/
```

---

## 콘텐츠 스키마 역할

콘텐츠 스키마는 템플릿이 기대하는 데이터 형식을 고정하는 규칙이다.

목적:

- 강사별 데이터 구조를 통일한다.
- 컴포넌트가 기대하는 필드를 보장한다.
- 템플릿 복제 시 구조가 무너지지 않게 한다.
- 에이전트가 콘텐츠 파일을 안정적으로 생성/수정할 수 있게 한다.

---

## 콘텐츠 스키마 구조

### brand

- teacherName
- subject
- brandName
- tagline
- logo

### seo

- title
- description
- ogImage

### hero

- headline
- subheadline
- points[]
- primaryCta
- secondaryCta
- image

### trustBar

- string[]

### fitStudents

- title
- items[]

### curriculum

- array of
- title
- description
- badge optional

### teacherIntro

- title
- body
- image optional

### proof

- title
- reviews[]
- quote
- name

### faq

- array of
- question
- answer

### contact

- title
- description
- fields

### theme

- variant

### template control

- enabledSections[]
- sectionOrder[]

---

## Panda CSS 설계 범위

### 1차 필수 토큰

- colors
- semantic colors
- spacing
- radii
- font sizes
- font weights
- line heights

### 1차 text style

- hero
- h1
- h2
- h3
- body-lg
- body
- caption
- button

### 1차 recipe

- button
- badge
- card
- input
- section-shell
- chip

### 1차 theme variant

- daySky
- softBlush

주의:

- 처음부터 recipe를 과도하게 세분화하지 않는다.
- 섹션 전체를 억지로 범용 컴포넌트 하나로 합치지 않는다.
- 현재 랜딩에 필요한 수준까지만 시스템화한다.

---

## 디자인 규칙

### 타이포그래피

- A2Z: Hero, 브랜드명, 짧은 섹션 제목
- Pretendard: 본문, 버튼, 폼, FAQ, 설명 텍스트

### 컬러

- 메인 무드: sky / lavender
- 보조 무드: sand / beige
- 텍스트와 CTA는 충분히 진하게 유지
- 파스텔은 배경 위주로만 사용

### 시각 톤

- soft premium
- calm academic
- clear mentor

### 피해야 할 것

- 아이돌 화보풍
- 과한 로맨틱 여성향 무드
- 낮은 대비
- 장식 과다
- 정보 전달보다 분위기가 앞서는 화면

---

## 상호작용 범위

### Svelte 사용 범위

- MobileMenu
- Accordion
- AccordionItem
- InputField
- TextareaField
- FloatingCTA optional

### 직접 구현 원칙

- FAQ는 단순하고 접근성 있게 만든다.
- 모바일 메뉴는 가볍고 명확하게 만든다.
- 폼 입력 경험은 단순하고 안정적으로 만든다.
- 1차에서는 복잡한 상태 관리 라이브러리를 도입하지 않는다.

---

## 이미지 최적화 원칙

### 자산 위치

- 실제 콘텐츠 이미지와 강사 사진은 `src/assets` 에 둔다.
- `public/` 은 예외적인 정적 파일만 둔다.

### 이미지 컴포넌트

- Hero 대표 이미지는 `HeroImage.astro`
- 일반 이미지는 `AppImage.astro`

### HeroImage 원칙

- Picture 기반
- `formats=['avif', 'webp']`
- priority
- `layout='constrained'`
- LCP 후보 최적화 목적

### AppImage 원칙

- Image 기반
- 일반 콘텐츠 이미지 처리
- lazy loading 유지
- layout, width, height, quality 제어 가능

### 공통 규칙

- Hero 대표 이미지 1장만 priority 사용
- 나머지는 기본 lazy
- SVG로 가능한 로고/아이콘/장식은 SVG 우선
- 이미지 alt는 반드시 작성
- CLS 방지를 위해 크기 정보 명확히 지정
- 실제 렌더 크기에 맞는 원본 사용
- 불필요하게 큰 이미지 원본을 그대로 두지 않는다

---

## 접근성 원칙

- 본문 가독성 확보
- 일반 텍스트 대비 충분히 확보
- 버튼/링크 클릭 영역 최소 44px 이상
- 입력 라벨 상시 노출
- 색만으로 상태 전달 금지
- focus-visible 상태 제공
- heading 구조를 올바르게 유지
- 이미지 alt 처리 기준을 지킨다

---

## 구현 순서

1. Astro + Svelte + Panda 초기 세팅
2. content schema 정의
3. Panda token / textStyle / recipe 작성
4. 공통 layout 및 ui 작성
5. HeroImage / AppImage 작성
6. 메인 랜딩 섹션 구현
7. preview sample page 구현
8. 모바일 대응
9. SEO 메타 정리
10. posts 확장용 뼈대 준비
11. 코드 정리

---

## 금지 사항

- 특정 강사명 기반 컴포넌트명
- 외부 UI 라이브러리 중심 설계
- 모든 것을 Svelte로 구현하기
- 처음부터 CMS 붙이기
- 무거운 애니메이션
- 의미 없는 wrapper 컴포넌트 양산
- 이미지 전부 `public/` 에 넣는 방식
- 템플릿인데도 콘텐츠 키 이름이 강사마다 달라지는 구조

---

## 완료 기준

- `/` 페이지가 실제 배포 가능한 수준으로 완성됨
- `/preview/sample-math` 로 템플릿 검증이 가능함
- 콘텐츠만 바꿔 다른 강사 버전을 만들 수 있음
- 모바일/데스크톱 모두 자연스럽게 보임
- CTA가 분명함
- Panda 구조가 과하지 않으면서 재사용 가능함
- 이미지 최적화 원칙이 반영됨
- 향후 `posts` 페이지 1~2개 정도는 무리 없이 붙일 수 있는 구조임
