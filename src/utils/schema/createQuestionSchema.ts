import { z } from "zod";
import { ruleSchema } from "./createRuleSchema";

const CreateQuestionSchema = z.object({
  title: z.string({
    required_error: "Título é obrigatório",
  }),
  description: z.string({
    required_error: "Descrição é obrigatória",
  }),
  type: z.string({
    required_error: "Tipo é obrigatório",
  }),
  options: z.array(
    z.object({
      description: z.string({
        required_error: "Descrição é obrigatória",
      }),
      score: z.preprocess(
        (val) => {
          if (typeof val === "string" && !isNaN(Number(val))) {
            return Number(val);
          }
          return val;
        },
        z.number({
          required_error: "Nota é obrigatória",
          invalid_type_error: "Nota deve ser um número",
        })
      )
    })
  ).optional(),
  rule: ruleSchema.optional()
});

export default CreateQuestionSchema;
