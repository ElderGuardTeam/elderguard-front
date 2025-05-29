import { z } from "zod";

const CreateElderlySchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório",
  }).min(1, "Nome é obrigatório"),
  cpf: z.string({
    required_error: "CPF é obrigatório",
  }),
  dateOfBirth: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  phone: z.string({
    required_error: "Telefone é obrigatório",
  }).min(1, "Telefone é obrigatório"),
  email: z.string({
    required_error: "Email é obrigatório",
  }).email({
    message:"Email invalido"
  }),
  sex: z.string({
    required_error: "Sexo é obrigatório",
  }).min(1, "Sexo é obrigatório"),
  weight: z.string({
    required_error: "Peso é obrigatório",
  }).min(1, "Peso é obrigatório"),
  height: z.string({
    required_error: "Altura é obrigatória",
  }).min(1, "Altura é obrigatório"),
  imc: z.string({
    required_error: "IMC é obrigatório",
  }),
  education: z.string({
    required_error: "Educação é obrigatória",
  }).min(1, "Educação é obrigatório"),
  socialeconomic: z.string({
    required_error: "Situação socioeconômica é obrigatória",
  }).min(1, "Situação socioeconômica é obrigatório"),
  address: z.object({
    street: z.string({
      required_error: "Rua é obrigatória",
    }).min(1, "Rua é obrigatório"),
    number: z.string({
      required_error: "Número é obrigatório",
    }).min(1, "Número é obrigatório"),
    complement: z.string().optional(),
    neighborhood: z.string({
      required_error: "Bairro é obrigatório",
    }).min(1, "Bairro é obrigatório"),
    city: z.string({
      required_error: "Cidade é obrigatória",
    }).min(1, "Cidade é obrigatório"),
    state: z.string({
      required_error: "Estado é obrigatório",
    }).min(1, "Estado é obrigatório"),
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