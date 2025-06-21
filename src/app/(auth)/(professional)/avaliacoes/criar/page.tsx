'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"

import CreateEvaluation from "@/components/Forms/CreateEvaluation"
import { useForms } from "@/contexts/formsContext"
import { useAuth } from "@/contexts/authContext"
import Alert from "@/components/Alert"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBan } from "@fortawesome/free-solid-svg-icons"

export default function CreateEvaluationPage() {
  const {
    createEvaluation
  } = useForms()

  const {
    user,
  } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
  } = useForm<Evaluation>()

  const [formList, setFormList] = useState<Form[]>([])


  const handleCreateEvaluation = async (data: Evaluation) => {
    createEvaluation({
      ...data,
      formsIds: formList.map((form) => form.id || ""),
    })
  
  };
  
  if (!user || user.userType !== 'ADMIN') {
    return (
      <div className="h-screen p-8 w-full">
        <Alert 
        className="alert alert-error shadow-lg "
        icon={
          <FontAwesomeIcon icon={faBan}/>
        }
        message="Você não tem permissão para acessar esta página. Apenas pesquisadores podem criar avaliações."
        />

      </div>
    )
  }

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