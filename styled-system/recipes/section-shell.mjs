import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const sectionShellFn = /* @__PURE__ */ createRecipe('section-shell', {}, [])

const sectionShellVariantMap = {}

const sectionShellVariantKeys = Object.keys(sectionShellVariantMap)

export const sectionShell = /* @__PURE__ */ Object.assign(memo(sectionShellFn.recipeFn), {
  __recipe__: true,
  __name__: 'sectionShell',
  __getCompoundVariantCss__: sectionShellFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: sectionShellVariantKeys,
  variantMap: sectionShellVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, sectionShellVariantKeys)
  },
  getVariantProps: sectionShellFn.getVariantProps,
})