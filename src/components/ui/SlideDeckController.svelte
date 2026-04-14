<script lang="ts">
  import { onMount } from 'svelte';

  export let selector = '[data-slide-section]';
  export let mobileBreakpoint = 720;

  const interactiveSelector =
    'input, textarea, select, button, a, summary, [contenteditable=""], [contenteditable="true"], [role="button"], [role="link"], [data-slide-nav-ignore]';

  function isInteractiveTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) {
      return false;
    }

    return Boolean(target.closest(interactiveSelector));
  }

  onMount(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (!sections.length) {
      return undefined;
    }

    const desktopMedia = window.matchMedia(`(min-width: ${mobileBreakpoint}px)`);
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ratios = new Map<HTMLElement, number>();
    let observer: IntersectionObserver | null = null;

    const getHeaderOffset = () => {
      const header = document.querySelector<HTMLElement>('.site-header');
      return Math.round(header?.getBoundingClientRect().height ?? 0);
    };

    const setActiveSection = (nextActive: HTMLElement) => {
      sections.forEach((section) => {
        section.dataset.isActive = section === nextActive ? 'true' : 'false';
      });
    };

    const getCurrentIndex = () => {
      const activeIndex = sections.findIndex((section) => section.dataset.isActive === 'true');

      if (activeIndex >= 0) {
        return activeIndex;
      }

      const headerOffset = getHeaderOffset();

      return sections.reduce(
        (closestIndex, section, index) => {
          const currentDistance = Math.abs(section.getBoundingClientRect().top - headerOffset);
          const bestDistance = Math.abs(
            sections[closestIndex].getBoundingClientRect().top - headerOffset
          );

          return currentDistance < bestDistance ? index : closestIndex;
        },
        0
      );
    };

    const scrollToIndex = (index: number) => {
      const safeIndex = Math.max(0, Math.min(index, sections.length - 1));
      const target = sections[safeIndex];

      if (!target) {
        return;
      }

      const targetTop = window.scrollY + target.getBoundingClientRect().top - getHeaderOffset();

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: reducedMotionMedia.matches ? 'auto' : 'smooth'
      });
    };

    const rebuildObserver = () => {
      observer?.disconnect();
      ratios.clear();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            ratios.set(entry.target as HTMLElement, entry.isIntersecting ? entry.intersectionRatio : 0);
          });

          const nextActive =
            sections.reduce<HTMLElement | null>((best, section) => {
              if (!best) {
                return section;
              }

              return (ratios.get(section) ?? 0) > (ratios.get(best) ?? 0) ? section : best;
            }, null) ?? sections[0];

          setActiveSection(nextActive);
        },
        {
          threshold: [0.2, 0.35, 0.5, 0.7, 0.85],
          rootMargin: `${-1 * getHeaderOffset()}px 0px -18% 0px`
        }
      );

      sections.forEach((section) => {
        ratios.set(section, 0);
        observer?.observe(section);
      });
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (!desktopMedia.matches || event.defaultPrevented) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (isInteractiveTarget(event.target)) {
        return;
      }

      const currentIndex = getCurrentIndex();
      let nextIndex = currentIndex;

      switch (event.key) {
        case ' ':
        case 'Spacebar':
          nextIndex = currentIndex + (event.shiftKey ? -1 : 1);
          break;
        case 'ArrowDown':
        case 'PageDown':
          nextIndex = currentIndex + 1;
          break;
        case 'ArrowUp':
        case 'PageUp':
          nextIndex = currentIndex - 1;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = sections.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      scrollToIndex(nextIndex);
    };

    setActiveSection(sections[0]);
    rebuildObserver();

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', rebuildObserver);

    return () => {
      observer?.disconnect();
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', rebuildObserver);
    };
  });
</script>
