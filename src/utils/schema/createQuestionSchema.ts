import { z } from "zod";
import { ruleSchema } from "./createRuleSchema";

const CreateQuestionSchema = z.object({
  id: z.string().optional(),
  title: z.string({
    required_error: "Título é obrigatório",
  }).min(1,"Título é obrigatório"),
  description: z.string().optional().nullable(),
  type: z.string({
    required_error: "Tipo é obrigatório",
  }).min(1, "Tipo é obrigatório"),
  options: z.array(
    z.object({
      id: z.string().optional(),
      description: z.string({
        required_error: "Descrição é obrigatória",
      }).min(1,"Descrição é obrigatória"),
      score: z.union([
        z.string(),
        z.number(),
        z.null()
      ]),
      questionId: z.string().nullable().optional()
    })
  ).optional(),
  rule: ruleSchema.optional().nullable()
});

export type Question = z.infer<typeof CreateQuestionSchema>;

export default CreateQuestionSchema;
