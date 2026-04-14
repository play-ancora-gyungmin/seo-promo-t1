import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { sectionIds, themeVariants } from './types/landing';

const ctaSchema = z.object({
  label: z.string(),
  href: z.string()
}).partial();

const contactFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(['text', 'tel', 'email', 'textarea']),
  placeholder: z.string().optional(),
  required: z.boolean().optional()
}).partial();

const teachers = defineCollection({
  loader: glob({
    base: './src/content/teachers',
    pattern: '**/*.json'
  }),
  schema: ({ image }) => z.object({
    brand: z.object({
      teacherName: z.string(),
      subject: z.string(),
      brandName: z.string(),
      tagline: z.string(),
      logo: image().optional()
    }).partial().optional(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: z.string().optional()
    }).partial().optional(),
    hero: z.object({
      headline: z.string(),
      subheadline: z.string(),
      points: z.array(z.string()),
      primaryCta: ctaSchema.optional(),
      secondaryCta: ctaSchema.optional(),
      image: image().optional()
    }).partial().optional(),
    trustBar: z.array(z.string()).optional(),
    fitStudents: z.object({
      title: z.string(),
      items: z.array(z.string())
    }).partial().optional(),
    curriculum: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        badge: z.string().optional()
      }).partial()
    ).optional(),
    teacherIntro: z.object({
      title: z.string(),
      body: z.string(),
      image: z.string().optional()
    }).partial().optional(),
    proof: z.object({
      title: z.string(),
      reviews: z.array(
        z.object({
          quote: z.string(),
          name: z.string()
        }).partial()
      )
    }).partial().optional(),
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string()
      }).partial()
    ).optional(),
    contact: z.object({
      title: z.string(),
      description: z.string(),
      fields: z.array(contactFieldSchema).optional()
    }).partial().optional(),
    sections: z.array(
      z.object({
        id: z.string().min(1),
        type: z.enum(sectionIds),
        enabled: z.boolean().optional(),
        label: z.string().optional(),
        kind: z.enum(['slide', 'flow']).optional()
      })
    ).optional(),
    theme: z.object({
      variant: z.enum(themeVariants)
    }).partial().optional(),
    enabledSections: z.array(z.enum(sectionIds)).optional(),
    sectionOrder: z.array(z.enum(sectionIds)).optional()
  })
});

export const collections = {
  teachers
};
