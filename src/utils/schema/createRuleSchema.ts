import { z } from 'zod';

export const ruleSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1, 'Campo obrigatório'),
  maxScore: z.number().nullable().optional(),
  operation: z.string().nullable().optional(),
  condition: z.string().nullable().optional(),
  value1Type: z.string().nullable().optional(),
  value2Type: z.string().nullable().optional(),
  value1: z.number().nullable().optional(),
  value2: z.number().nullable().optional(),
  valueIf: z.number().nullable().optional(),
  valueThen: z.number().nullable().optional(),
});
