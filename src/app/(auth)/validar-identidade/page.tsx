'use client'
import Avatar from "@/components/Avatar"
import Button from "@/components/Button"
import FormError from "@/components/FormError"
import FormGroup from "@/components/FormGroup"
import Label from "@/components/Label"
import MaskedInput from "@/components/MaskedInput"
import SelectFormGroup from "@/components/SelectFormGroup"
import { useAuth } from "@/contexts/authContext"
import { usePathname, useRouter } from "next/navigation"
import { parseCookies } from "nookies"
import { useForm } from "react-hook-form"

export default function ValidateID() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control
  } = useForm()


  const handleValidateID = async (data: any) => {
    console.log('data', data)
  }
  return(
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <p className="text-center text-lg">
            Validar identidade
          </p>
          <p>
            Insira os dados do paciente para iniciar a avaliação.
          </p>
          <form onSubmit={handleSubmit(handleValidateID)} className="grid grid-cols-2 gap-2">
            <FormGroup 
              labelText="Nome"
              inputClass="input input-bordered "
              className="col-span-2"
              register={register('name', {required: 'Campo obrigatório'})}
              error={errors.name?.message?.toString()}
              />
              <Label labelText="CPF" required className="flex flex-col items-start justify-start font-bold text-sm">
                <MaskedInput
                control={control}
                mask="999.999.999-99"
                name="cpf"
                />
                {
                  errors.cpf && (
                    <FormError>{errors.cpf.message?.toString()}</FormError>
                  )
                }
              </Label>
              <SelectFormGroup
                labelText="Sexo"
                isRequired
                options={[
                  {id: 'M', name: 'Masculino'},
                  {id: 'F', name: 'Feminino'},
                  {id: 'O', name: 'Outro'}
                ]}
                placeholder="Selecione"
                register={register('sex')}
                error={errors.sex?.message?.toString()}
                /> 
              <div className="flex gap-2 mt-2">
                <Button className="btn-sm btn-success" type="submit">
                  Enviar
                </Button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}