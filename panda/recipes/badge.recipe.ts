import { defineRecipe } from '@pandacss/dev';

export const badgeRecipe = defineRecipe({
  className: 'badge',
  base: {
    alignItems: 'center',
    backgroundColor: 'accentSoft',
    borderRadius: 'full',
    color: 'accent',
    display: 'inline-flex',
    fontSize: 'sm',
    fontWeight: 'semibold',
    minHeight: '32px',
    paddingInline: '3'
  }
});
