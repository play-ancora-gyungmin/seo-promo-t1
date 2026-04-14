import { defineRecipe } from '@pandacss/dev';

export const inputRecipe = defineRecipe({
  className: 'input',
  base: {
    backgroundColor: 'panel',
    borderColor: 'line',
    borderRadius: 'md',
    borderWidth: '1px',
    color: 'text',
    minHeight: '48px',
    paddingInline: '4',
    width: '100%'
  }
});
