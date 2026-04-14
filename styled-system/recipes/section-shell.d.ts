/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SectionShellVariant {
  
}

type SectionShellVariantMap = {
  [key in keyof SectionShellVariant]: Array<SectionShellVariant[key]>
}



export type SectionShellVariantProps = {
  [key in keyof SectionShellVariant]?: ConditionalValue<SectionShellVariant[key]> | undefined
}

export interface SectionShellRecipe {
  
  __type: SectionShellVariantProps
  (props?: SectionShellVariantProps): string
  raw: (props?: SectionShellVariantProps) => SectionShellVariantProps
  variantMap: SectionShellVariantMap
  variantKeys: Array<keyof SectionShellVariant>
  splitVariantProps<Props extends SectionShellVariantProps>(props: Props): [SectionShellVariantProps, Pretty<DistributiveOmit<Props, keyof SectionShellVariantProps>>]
  getVariantProps: (props?: SectionShellVariantProps) => SectionShellVariantProps
}


export declare const sectionShell: SectionShellRecipe