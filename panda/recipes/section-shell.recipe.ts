import { defineRecipe } from '@pandacss/dev';

export const sectionShellRecipe = defineRecipe({
  className: 'section-shell',
  base: {
    backgroundColor: 'panel',
    borderColor: 'line',
    borderRadius: 'xl',
    borderWidth: '1px',
    paddingBlock: '8',
    paddingInline: '6'
  }
});
