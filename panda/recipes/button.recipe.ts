import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
  className: 'button',
  base: {
    alignItems: 'center',
    borderRadius: 'full',
    display: 'inline-flex',
    fontWeight: 'semibold',
    gap: '2',
    justifyContent: 'center',
    minHeight: '44px',
    paddingInline: '5',
    paddingBlock: '3',
    textDecoration: 'none',
    transitionDuration: '200ms',
    transitionProperty: 'background-color, border-color, color, transform'
  },
  variants: {
    visual: {
      primary: {
        backgroundColor: 'accent',
        color: 'accentContrast'
      },
      secondary: {
        backgroundColor: 'panel',
        borderWidth: '1px',
        borderColor: 'line',
        color: 'text'
      }
    },
    size: {
      md: {
        fontSize: 'md'
      },
      lg: {
        fontSize: 'lg',
        paddingInline: '6'
      }
    }
  },
  defaultVariants: {
    visual: 'primary',
    size: 'md'
  }
});
