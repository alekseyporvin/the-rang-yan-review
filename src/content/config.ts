import { defineCollection, z } from 'astro:content';

const articleFields = z.object({
  title: z.string(),
  author: z.string(),
  authorSlug: z.string(),
  authorRole: z.string().optional(),
  date: z.coerce.date().optional(),
  excerpt: z.string(),
  sourceNote: z.string().optional(),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  issue: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  coverImage: z.string().optional(),
  coverCredit: z.string().optional(),
  previewImage: z.string().optional(),
  translatorSlugs: z.array(z.string()).default([]),
});

const essays = defineCollection({ type: 'content', schema: articleFields });
const poetry = defineCollection({ type: 'content', schema: articleFields });
const prose = defineCollection({ type: 'content', schema: articleFields });
const interviews = defineCollection({ type: 'content', schema: articleFields });
const conversationWith = defineCollection({ type: 'content', schema: articleFields });
const criticism = defineCollection({ type: 'content', schema: articleFields });

const issues = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    number: z.number(),
    season: z.string().optional(),
    year: z.number(),
    date: z.coerce.date(),
    editorial: z.string(),
    coverImage: z.string().optional(),
    status: z.enum(['current', 'archive']).default('archive'),
    featured: z.boolean().default(false),
  }),
});

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    // Note: 'slug' is reserved by Astro; use entry.slug (= filename) for URLs.
    shortBio: z.string().optional(),
    fullBio: z.string().optional(),
    location: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    portrait: z.string().optional(),
    /** Deceased / historical authors appear as "earlier voice" in listings. */
    earlierVoice: z.boolean().default(false),
  }),
});

const editorialBoard = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    // Note: 'slug' is reserved by Astro; use entry.slug (= filename) for URLs.
    role: z.string(),
    order: z.number().default(99),
    shortBio: z.string().optional(),
    fullBio: z.string().optional(),
    photo: z.string().optional(),
    location: z.string().optional(),
    email: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  essays,
  poetry,
  prose,
  interviews,
  'conversation-with': conversationWith,
  criticism,
  issues,
  authors,
  'editorial-board': editorialBoard,
};
