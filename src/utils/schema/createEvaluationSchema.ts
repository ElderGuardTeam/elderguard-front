import { z } from "zod";

export const ruleSchema = z.object({
  title: z.string({
    required_error: "Título é obrigatório",
  }).min(1, "Título é obrigatório"),
  description: z.string({
    required_error: "Descrição é obrigatório",
  }).min(1, "Descrição é obrigatório"),
})