import { z } from "zod";
import { ruleSchema } from "./createRuleSchema";

const CreateSectionSchema = z.object({
  rule: ruleSchema.optional().nullable(),
})


export default CreateSectionSchema