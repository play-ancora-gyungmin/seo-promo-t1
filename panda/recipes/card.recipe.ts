import { defineRecipe } from '@pandacss/dev';

export const cardRecipe = defineRecipe({
  className: 'card',
  base: {
    backgroundColor: 'panel',
    borderColor: 'line',
    borderRadius: 'xl',
    borderWidth: '1px',
    boxShadow: '0 18px 45px rgba(29, 36, 51, 0.06)',
    padding: '6'
  }
});
