'use client'

import CreateProfessional from "@/components/Forms/CreateProfessional"

import { useUsers } from "@/contexts/usersContext"
import CreateProfessionalSchema from "@/utils/schema/createProfessionalSchema"
import toastError from "@/utils/toast/toastError"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { validateCPF } from 'validations-br'

export default function CreateProfissional() {
  const {
    createProfessional
  } = useUsers()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    setValue
  } = useForm<Professional>({
    resolver: zodResolver(CreateProfessionalSchema)
  })

  const handleCreateProfissional = async (data: Professional) => {
    if (!validateCPF(data.cpf)) {
      toastError('CPF inválido',5000)
      return
    }
    await createProfessional(data)
  }

  console.log(errors)

  return (
    <div className="p-8 w-full">
      <CreateProfessional 
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={handleCreateProfissional}
      register={register}
      setValue={setValue}
      />
    </div>
  )
}