import { z } from "zod";

const CreateElderlySchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório",
  }),
  cpf: z.string({
    required_error: "CPF é obrigatório",
  }),
  dateOfBirth: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  phone: z.string({
    required_error: "Telefone é obrigatório",
  }),
  email: z.string({
    required_error: "Email é obrigatório",
  }),
  sex: z.string({
    required_error: "Sexo é obrigatório",
  }),
  weight: z.string({
    required_error: "Peso é obrigatório",
  }),
  height: z.string({
    required_error: "Altura é obrigatória",
  }),
  imc: z.string({
    required_error: "IMC é obrigatório",
  }),
  address: z.object({
    street: z.string({
      required_error: "Rua é obrigatória",
    }),
    number: z.string({
      required_error: "Número é obrigatório",
    }),
    complement: z.string().optional(),
    neighborhood: z.string({
      required_error: "Bairro é obrigatório",
    }),
    city: z.string({
      required_error: "Cidade é obrigatória",
    }),
    state: z.string({
      required_error: "Estado é obrigatório",
    }),
    zipCode: z.string({
      required_error: "CEP é obrigatório",
    }),
  }),
  contacts: z.array(
    z.object({
      name: z.string({
        required_error: "Nome é obrigatório",
      }),
      phone: z.string({
        required_error: "Telefone é obrigatório",
      }),
      email: z.string({
        required_error: "Email é obrigatório",
      }),
      cpf: z.string({
        required_error: "CPF é obrigatório",
      }),
      address: z.object({
        street: z.string({
          required_error: "Rua é obrigatória",
        }),
        number: z.string({
          required_error: "Número é obrigatório",
        }),
        complement: z.string().optional(),
        neighborhood: z.string({
          required_error: "Bairro é obrigatório",
        }),
        city: z.string({
          required_error: "Cidade é obrigatória",
        }),
        state: z.string({
          required_error: "Estado é obrigatório",
        }),
        zipCode: z.string({
          required_error: "CEP é obrigatório",
        }),
      }),
    })
  ),
})

export default CreateElderlySchema;