'use client'

import CreateQuestion from "@/components/Forms/CreateQuestion"
import { useUsers } from "@/contexts/usersContext"
import CreateProfessionalSchema from "@/utils/schema/createProfessionalSchema"
import toastError from "@/utils/toast/toastError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { validateCPF } from 'validations-br'

export default function CreateQuestionPage() {
  const {
    createProfessional
  } = useUsers()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    watch
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options" 
  });

  const handleAddOption = () => {
    append({ 
      description: '',
      value: 0,
    });
  };

  const handleRemoveOption = (index: number) => {
    remove(index);
  };


  const handleCreateProfissional = async (data: Professional) => {
    if (!validateCPF(data.cpf)) {
      toastError('CPF inválido',5000)
      return
    }
    await createProfessional(data)
  }


  return (
    <div className="p-8 w-full">
      <CreateQuestion
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={handleCreateProfissional}
      register={register}
      watch={watch}
      fields={fields}
      handleAddOption={handleAddOption}
      handleRemoveOption={handleRemoveOption}
      />
    </div>
  )
}