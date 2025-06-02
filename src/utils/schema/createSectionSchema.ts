import { z } from "zod";
import { ruleSchema } from "./createRuleSchema";

const CreateSectionSchema = z.object({
  title: z.string().optional(),
  rule: ruleSchema.optional().nullable(),
  id: z.number().optional(),
  questionsIds: z.string().optional().array()
})


export default CreateSectionSchema