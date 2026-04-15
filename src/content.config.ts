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

const contactChannelSchema = z.object({
  kind: z.enum(['kakao', 'instagram', 'website', 'blog', 'band']),
  label: z.string(),
  href: z.string()
});

const contactLocationSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional()
}).partial();

const scoreProofStatSchema = z.object({
  value: z.string().optional(),
  label: z.string().optional(),
  detail: z.string().optional()
}).partial();

const scoreProofSchoolSchema = z.object({
  name: z.string().optional(),
  achievements: z.array(z.string()).optional()
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
        logo: image().optional(),
        academyLogo: image().optional()
      }).partial().optional(),
      seo: z.object({
        title: z.string(),
        description: z.string(),
        ogImage: z.string().optional()
      }).partial().optional(),
      hero: z.object({
        headline: z.union([
          z.string(),
          z.object({
            lines: z.array(z.string()).optional(),
            lead: z.object({
              prefix: z.string(),
              emphasis: z.string()
            }).partial().optional()
          }).partial()
        ]),
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
          badge: z.string().optional(),
          steps: z.array(
            z.object({
              title: z.string(),
              description: z.array(z.string()).optional()
            }).partial()
          ).optional()
        }).partial()
      ).optional(),
      teacherIntro: z.object({
        title: z.string(),
        body: z.string(),
        items: z.array(z.string()).optional(),
        image: image().optional()
      }).partial().optional(),
      scoreProof: z.object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        stats: z.array(scoreProofStatSchema).optional(),
        schools: z.array(scoreProofSchoolSchema).optional(),
        highlights: z.array(z.string()).optional()
      }).partial().optional(),
      teachingMaterials: z.object({
        eyebrow: z.string().optional(),
        title: z.string(),
        description: z.string(),
        points: z.array(z.string()).optional(),
        books: z.array(
          z.object({
            image: image(),
            alt: z.string(),
            label: z.string().optional()
          })
        ),
        note: z.string().optional()
      }).optional(),
      proof: z.object({
        title: z.string(),
        reviews: z.array(
          z.object({
            quote: z.string(),
            name: z.string(),
            alt: z.string().optional(),
            image: image().optional()
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
        phone: z.string(),
        locations: z.array(contactLocationSchema).optional(),
        channels: z.array(contactChannelSchema).optional(),
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
