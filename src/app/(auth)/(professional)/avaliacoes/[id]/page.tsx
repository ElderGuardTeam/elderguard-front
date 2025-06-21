'use client'

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CreateEvaluation from "@/components/Forms/CreateEvaluation"
import { useForms } from "@/contexts/formsContext"
import { transformFormDataArray } from "@/utils/functions/transformFormData"
import { useAuth } from "@/contexts/authContext"
import Alert from "@/components/Alert"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBan } from "@fortawesome/free-solid-svg-icons"

export default function EditEvaluationPage({params}: {params: {id: string}}) {
  const {
    getEvaluationById,
    evaluationDetails,
    deleteEvaluation,
    editEvaluation
  } = useForms()

  const {
    user,
  } = useAuth()

  if (!user || user.userType !== 'ADMIN') {
    return (
      <div className="h-screen p-8 w-full">
        <Alert 
        className="alert alert-error shadow-lg "
        icon={
          <FontAwesomeIcon icon={faBan}/>
        }
        message="Você não tem permissão para acessar esta página. Apenas pesquisadores podem editar avaliações."
        />

      </div>
    )
  }

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
      setFormList(transformFormDataArray(evaluationDetails.formsRel || []))
    }
  }, [evaluationDetails])
  const handleCreateEvaluation = async (data: Evaluation) => {
    editEvaluation({
      ...data,
      formsIds: formList.map((form) => form.id || ""),
    }, params.id)
  
  };

  const handleDeleteEvaluation = async () => {
    if (!evaluationDetails?.id) return;
    await deleteEvaluation(evaluationDetails.id);
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
      evaluationTitle={ evaluationDetails?.title || ""}
      isEditing
      deleteEvaluation={handleDeleteEvaluation}
      />
    </div>
  )
}