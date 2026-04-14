import { defineConfig } from '@pandacss/dev';
import { badgeRecipe } from './panda/recipes/badge.recipe';
import { buttonRecipe } from './panda/recipes/button.recipe';
import { cardRecipe } from './panda/recipes/card.recipe';
import { chipRecipe } from './panda/recipes/chip.recipe';
import { inputRecipe } from './panda/recipes/input.recipe';
import { sectionShellRecipe } from './panda/recipes/section-shell.recipe';
import { semanticTokens } from './panda/semantic-tokens';
import { textStyles } from './panda/text-styles';

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{astro,js,jsx,ts,tsx,svelte}'],
  outdir: 'styled-system',
  theme: {
    extend: {
      tokens: {
        colors: {
          white: { value: '#ffffff' },
          sky: {
            50: { value: '#f5faff' },
            100: { value: '#e8f2ff' },
            200: { value: '#cfe3ff' },
            300: { value: '#aac9f5' },
            500: { value: '#6fa1de' },
            600: { value: '#4b79b8' },
            700: { value: '#365d96' }
          },
          lavender: {
            100: { value: '#f2ecff' },
            200: { value: '#e2d9ff' },
            400: { value: '#bca7ff' },
            600: { value: '#775ec9' }
          },
          sand: {
            50: { value: '#fffaf2' },
            100: { value: '#f5ebdb' },
            200: { value: '#e8d6bd' },
            400: { value: '#c7a67a' }
          },
          ink: {
            50: { value: '#f6f7fb' },
            200: { value: '#d7dbe6' },
            400: { value: '#8891a4' },
            600: { value: '#545d6f' },
            900: { value: '#1d2433' }
          }
        },
        spacing: {
          1: { value: '0.25rem' },
          2: { value: '0.5rem' },
          3: { value: '0.75rem' },
          4: { value: '1rem' },
          5: { value: '1.25rem' },
          6: { value: '1.5rem' },
          8: { value: '2rem' },
          10: { value: '2.5rem' },
          12: { value: '3rem' },
          16: { value: '4rem' },
          20: { value: '5rem' }
        },
        radii: {
          sm: { value: '0.5rem' },
          md: { value: '0.875rem' },
          lg: { value: '1.25rem' },
          xl: { value: '1.75rem' },
          full: { value: '9999px' }
        },
        fontSizes: {
          xs: { value: '0.75rem' },
          sm: { value: '0.875rem' },
          md: { value: '1rem' },
          lg: { value: '1.125rem' },
          xl: { value: '1.25rem' },
          '2xl': { value: '1.5rem' },
          '3xl': { value: '1.875rem' },
          '4xl': { value: '2.375rem' },
          '5xl': { value: '3rem' },
          '6xl': { value: '3.75rem' }
        },
        fontWeights: {
          regular: { value: '400' },
          medium: { value: '500' },
          semibold: { value: '600' },
          bold: { value: '700' }
        },
        lineHeights: {
          tight: { value: '1.1' },
          snug: { value: '1.25' },
          normal: { value: '1.5' },
          relaxed: { value: '1.7' }
        },
        fonts: {
          display: { value: '"A2Z", "Pretendard", sans-serif' },
          body: { value: '"Pretendard", system-ui, sans-serif' }
        }
      },
      semanticTokens,
      textStyles,
      recipes: {
        button: buttonRecipe,
        badge: badgeRecipe,
        card: cardRecipe,
        chip: chipRecipe,
        input: inputRecipe,
        sectionShell: sectionShellRecipe
      }
    }
  }
});
