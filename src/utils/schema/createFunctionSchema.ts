import { z } from "zod";
import { ruleSchema } from "./createRuleSchema";
import CreateSectionSchema from "./createSectionSchema";

const CreateFormSchema = z.object({
  title: z.string({
    required_error: "Título é obrigatório",
  }).min(1,"Título é obrigatório"),
  description: z.string().optional(),
  type: z.string({
    required_error: "Tipo é obrigatório",
  }).min(1, "Tipo é obrigatório"),
  rule: ruleSchema.optional().nullable(),
  seccions: z.array(
    CreateSectionSchema
  ).optional(),
  questionsIds: z.any().optional()
});


export default CreateFormSchema;
