import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections — the contract between content and presentation.
 * Duplicate a .md file in src/content/case-studies/, change the
 * frontmatter, and a new project card + page appear. No layout edits.
 */

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    kicker: z.string(), // "Product · Domain · Type", shown above the title
    oneLiner: z.string(),
    why: z.string().optional(), // one line on why this project earns its slot
    order: z.number(), // sort position on the Work grid
    featured: z.boolean().default(false), // featured = hero treatment
    role: z.string(),
    timeline: z.string(),
    method: z.string(),
    output: z.string(),
    tools: z.array(z.string()).default([]),
    metrics: z
      .array(
        z.object({
          value: z.string(),
          caption: z.string(),
          footnote: z.string().optional(),
        })
      )
      .default([]),
    metricsNote: z.string().optional(), // the honesty footnote line
    video: z.string().optional(), // set it → walkthrough button appears
    demo: z.string().optional(), // set it → live demo button appears
    heroMedia: z.string().optional(), // .mp4/.webm/.gif/.png — shows beside the title
    heroMediaAlt: z.string().optional(),
    cover: z.string().optional(), // real image for the work-grid card; omit for a generated ink cover
    pattern: z.enum(['rings', 'dots', 'waves']).optional(), // generated cover motif when no `cover` image
    exec: z.object({
      problem: z.string(),
      approach: z.string(),
      outcome: z.string(),
    }),
    status: z.string().optional(), // e.g. "Full write-up in progress"
  }),
});

const playground = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/playground' }),
  schema: z.object({
    title: z.string(),
    blurb: z.string(),
    order: z.number().default(99),
    image: z.string().optional(),
  }),
});

export const collections = { 'case-studies': caseStudies, playground };
