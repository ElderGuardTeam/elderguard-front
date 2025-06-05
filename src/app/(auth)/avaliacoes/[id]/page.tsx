'use client'

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CreateEvaluation from "@/components/Forms/CreateEvaluation"
import { useForms } from "@/contexts/formsContext"

export default function EditEvaluationPage({params}: {params: {id: string}}) {
  const {
    createEvaluation,
    getEvaluationById,
    evaluationDetails
  } = useForms()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    setValue
  } = useForm<Evaluation>()

  useEffect(() => {
    getEvaluationById(params.id)
  }, [params.id])

  const [formList, setFormList] = useState<Form[]>([])

  useEffect(() => {
    if (evaluationDetails) {
      setValue("title", evaluationDetails.title)
      setValue("description", evaluationDetails.description)
    }
  }, [evaluationDetails])
  const handleCreateEvaluation = async (data: Evaluation) => {
    createEvaluation({
      ...data,
      formsIds: formList.map((form) => form.id || ""),
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