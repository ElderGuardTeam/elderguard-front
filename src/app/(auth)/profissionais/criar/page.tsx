'use client'

import Button from "@/components/Button"
import DatePickerFormGroup from "@/components/DatePickerFormGroup"
import FormGroup from "@/components/FormGroup"
import Label from "@/components/Label"
import MaskedInput from "@/components/MaskedInput"
import SelectFormGroup from "@/components/SelectFormGroup"
import { useLoader } from "@/contexts/loaderContext"
import { useUsers } from "@/contexts/usersContext"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function CreatePatient() {
  const {
    createProfessional
  } = useUsers()
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    setValue,
    watch
  } = useForm<Professional>()

  const handleCreateProfissional = async (data: Professional) => {
    await createProfessional(data)
  }


  return (
    <div className="p-8 w-full">
      <form className="bg-white rounded p-4" onSubmit={handleSubmit(handleCreateProfissional)}>
        <h1 className="flex gap-2 items-center">
          <div className="h-8 w-8 flex items-center justify-center hover:border-salmon hover:border rounded-full" onClick={() => router.back()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          Cadastrar Profissional
        </h1>
        <fieldset className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4 my-4 text-xs">
          <legend>Dados pessoais</legend>
          <FormGroup
          labelText="Nome"
          isRequired
          register={register('name')}
          />
          <Label labelText="CPF" required className="flex flex-col items-start justify-start font-bold text-sm">
            <MaskedInput
            control={control}
            mask="999.999.999-99"
            name="cpf"
            />
          </Label> 
          <FormGroup
          labelText="Email"
          isRequired
          register={register('email')}
          />
          <Label labelText="Telefone" required className="flex flex-col items-start justify-start font-bold text-sm">
            <MaskedInput
            control={control}
            mask="(99) 99999-9999"
            name="phone"
            /> 
          </Label>
        </fieldset>
        <div>
          <Button type="submit" className="btn-success text-white">
            Salvar
          </Button>
          <Button type="button" className="btn-link " onClick={() => router.push('/profissionais')}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}