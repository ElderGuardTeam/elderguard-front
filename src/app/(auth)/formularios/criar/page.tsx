'use client'

import CreateForm from "@/components/Forms/CreateForm"
import CreateQuestion from "@/components/Forms/CreateQuestion"
import { useForms } from "@/contexts/formsContext"
import { useFieldArray, useForm } from "react-hook-form"
import { validateCPF } from 'validations-br'

export default function CreateQuestionPage() {
  const {
    createQuestion
  } = useForms()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    watch
  } = useForm<Form>()



  const handleCreateQuestion = async (data: Form) => {
    await createQuestion(data)
  }


  return (
    <div className="p-8 w-full">
      <CreateForm
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={handleCreateQuestion}
      register={register}
      watch={watch}
      />
    </div>
  )
}