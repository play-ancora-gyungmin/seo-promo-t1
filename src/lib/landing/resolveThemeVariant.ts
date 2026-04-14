import { themeVariants, type ThemeVariant } from '../../types/landing';

export function resolveThemeVariant(variant?: string): ThemeVariant {
  if (variant && themeVariants.includes(variant as ThemeVariant)) {
    return variant as ThemeVariant;
  }

  return 'daySky';
}
