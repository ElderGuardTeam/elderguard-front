'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"

import CreateEvaluation from "@/components/Forms/CreateEvaluation"
import { useForms } from "@/contexts/formsContext"

export default function CreateQuestionPage() {
  const {
    createEvaluation
  } = useForms()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
  } = useForm<Evaluation>()

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