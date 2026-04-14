import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { sectionIds, themeVariants } from './types/landing';

const teachers = defineCollection({
  loader: glob({
    base: './src/content/teachers',
    pattern: '**/*.json'
  }),
  schema: z.object({
    brand: z.object({
      teacherName: z.string(),
      subject: z.string(),
      brandName: z.string(),
      tagline: z.string(),
      logo: z.string().optional()
    }),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: z.string().optional()
    }),
    hero: z.object({
      headline: z.string(),
      subheadline: z.string(),
      points: z.array(z.string()),
      primaryCta: z.object({
        label: z.string(),
        href: z.string()
      }),
      secondaryCta: z
        .object({
          label: z.string(),
          href: z.string()
        })
        .optional(),
      image: z.string().optional()
    }),
    trustBar: z.array(z.string()),
    fitStudents: z.object({
      title: z.string(),
      items: z.array(z.string())
    }),
    curriculum: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        badge: z.string().optional()
      })
    ),
    teacherIntro: z.object({
      title: z.string(),
      body: z.string(),
      image: z.string().optional()
    }),
    proof: z.object({
      title: z.string(),
      reviews: z.array(
        z.object({
          quote: z.string(),
          name: z.string()
        })
      )
    }),
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string()
      })
    ),
    contact: z.object({
      title: z.string(),
      description: z.string(),
      fields: z.array(
        z.object({
          name: z.string(),
          label: z.string(),
          type: z.enum(['text', 'tel', 'email', 'textarea']),
          placeholder: z.string().optional(),
          required: z.boolean().optional()
        })
      )
    }),
    theme: z.object({
      variant: z.enum(themeVariants)
    }),
    enabledSections: z.array(z.enum(sectionIds)).optional(),
    sectionOrder: z.array(z.enum(sectionIds)).optional()
  })
});

export const collections = {
  teachers
};
