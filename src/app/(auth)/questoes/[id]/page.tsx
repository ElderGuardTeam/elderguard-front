'use client'

import CreateProfessional from "@/components/Forms/CreateProfessional"
import { useUsers } from "@/contexts/usersContext"
import CreateProfessionalSchema from "@/utils/schema/createProfessionalSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function CreatePatient({params}: {params: {id: string}}) {
  const {
    getProfessionalById,
    professionalInfo,
    editProfessional,
    deleteProfessional
  } = useUsers()

  useEffect(() => {
    getProfessionalById(params.id)
  }, [params.id])

  useEffect(() => {
    setValue("name", professionalInfo.name);
    setValue("cpf", professionalInfo.cpf);
    setValue("phone", professionalInfo.phone);
    setValue("email", professionalInfo.email);
  }, [professionalInfo])

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    setValue
  } = useForm<Professional>({
    resolver: zodResolver(CreateProfessionalSchema)
  })

  const handleEditProfessional = async (data: Professional) => {
    editProfessional(data, professionalInfo.id ? professionalInfo.id : '')
  }

  const handleDeleteProfessional = async () => {
    deleteProfessional(professionalInfo.id ? professionalInfo.id : '')
  }
  return (
    <div className="p-8 w-full">
      <CreateProfessional 
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={handleEditProfessional}
      register={register}
      professionalName={professionalInfo.name}
      isEditing
      deleteProfessional={handleDeleteProfessional}
      />
    </div>
  )
}