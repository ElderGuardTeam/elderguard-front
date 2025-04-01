import { z } from "zod";

const CreateProfessionalSchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório",
  }),
  cpf: z.string({
    required_error: "CPF é obrigatório",
  }),
  phone: z.string({
    required_error: "Telefone é obrigatório",
  }),
  email: z.string({
    required_error: "Email é obrigatório",
  }).email({
    message: "Email inválido",
  })
})

export default CreateProfessionalSchema;