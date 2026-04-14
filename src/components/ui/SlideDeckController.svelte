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

    const getCurrentIndex = () => {
      return sections.reduce(
        (closestIndex, section, index) => {
          const currentDistance = Math.abs(section.getBoundingClientRect().top);
          const bestDistance = Math.abs(sections[closestIndex].getBoundingClientRect().top);

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

      const targetTop = window.scrollY + target.getBoundingClientRect().top;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: reducedMotionMedia.matches ? 'auto' : 'smooth'
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

      switch (event.key) {
        case ' ':
        case 'Spacebar':
          break;
        default:
          return;
      }

      event.preventDefault();
      scrollToIndex(getCurrentIndex() + (event.shiftKey ? -1 : 1));
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>
