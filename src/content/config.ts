import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(), // Emoji or icon name
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

const teamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    specialty: z.string().optional(),
    bio: z.string(),
    image: z.string(), // Unsplash URL
    order: z.number(),
    credentials: z.array(z.string()).optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string(), // Unsplash URL
    category: z.enum(['Health Tips', 'Medical News', 'Patient Stories', 'Wellness']),
    featured: z.boolean().default(false),
  }),
});

const testimonialsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    author: z.string(),
    role: z.string().optional(), // e.g., "Patient since 2020"
    content: z.string(),
    rating: z.number().min(1).max(5),
    image: z.string().optional(), // Unsplash URL
    service: z.string().optional(), // Which service they used
  }),
});

export const collections = {
  'services': servicesCollection,
  'team': teamCollection,
  'blog': blogCollection,
  'testimonials': testimonialsCollection,
};
