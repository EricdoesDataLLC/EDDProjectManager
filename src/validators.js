import { z } from 'zod';

export const querySchema = z.object({
  clientId: z.string().trim().optional(),
  preparer: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(200).default(25)
});

export const bulkUpdateSchema = z.object({
  projects: z.array(z.object({
    ProjectId: z.number().int(),
    Comments: z.string().nullable().optional(),
    Priority: z.number().int().nullable().optional()
  })).min(1)
});