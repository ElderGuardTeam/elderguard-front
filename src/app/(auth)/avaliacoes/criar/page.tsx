'use client'

import CreateEvaluation from "@/components/Forms/CreateEvaluation"
import CreateForm from "@/components/Forms/CreateForm"
import CreateQuestion from "@/components/Forms/CreateQuestion"
import { useForms } from "@/contexts/formsContext"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { validateCPF } from 'validations-br'

export default function CreateQuestionPage() {
  const {
    createEvaluation
  } = useForms()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    watch,
    reset
  } = useForm<Evaluation>()

  const [formSections, setFormSections] = useState<Section[]>([])
  const [formList, setFormList] = useState<FormDetails[]>([])


  const handleCreateEvaluation = async (data: Evaluation) => {
    createEvaluation({
      ...data,
      formsIds: formList.map((form) => form.id)
    })
  
  };


  return (
    <div className="p-8 w-full">
      <CreateEvaluation
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={handleCreateEvaluation}
      register={register}
      formList={formList}
      setFormList={setFormList}
      />
    </div>
  )
}