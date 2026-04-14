import { defineRecipe } from '@pandacss/dev';

export const chipRecipe = defineRecipe({
  className: 'chip',
  base: {
    alignItems: 'center',
    backgroundColor: 'panelMuted',
    borderRadius: 'full',
    color: 'textMuted',
    display: 'inline-flex',
    fontSize: 'sm',
    gap: '2',
    minHeight: '36px',
    paddingInline: '4'
  }
});
