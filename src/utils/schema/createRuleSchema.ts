import { z } from 'zod';

export const ruleSchema = z.object({
  id: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  operation: z.string().nullable().optional(),
  condition: z.string().nullable().optional(),

  maxScore: z.union([z.string(), z.number()]).nullable().optional(),
  value1Type: z.string().nullable().optional(),
  value2Type: z.string().nullable().optional(),

  value1: z.union([z.string(), z.number()]).nullable().optional(),
  value2: z.union([z.string(), z.number()]).nullable().optional(),
  valueIf: z.union([z.string(), z.number()]).nullable().optional(),
  valueThen: z.union([z.string(), z.number()]).nullable().optional(),
  totalItems: z.union([z.string(), z.number()]).nullable().optional(),
});
