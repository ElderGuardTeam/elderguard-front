'use client'

import CreateProfessional from "@/components/Forms/CreateProfessional"
import CreateQuestion from "@/components/Forms/CreateQuestion"
import { useForms } from "@/contexts/formsContext"
import { useUsers } from "@/contexts/usersContext"
import CreateProfessionalSchema from "@/utils/schema/createProfessionalSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"

export default function CreatePatient({params}: {params: {id: string}}) {
  const {
    deleteProfessional
  } = useUsers()

  const {
    getQuestionById,
    questionDetails
  } = useForms()

  useEffect(() => {
    getQuestionById(params.id)
  }, [params.id])

  useEffect(() => {
    if (questionDetails) {
      setValue('title', questionDetails.title)
      setValue('description', questionDetails.description)
      setValue('options', questionDetails.options)
      setValue('type', questionDetails.type)
    }
  }, [questionDetails])

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    setValue,
    watch
  } = useForm<Question>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options" 
  });

  const handleAddOption = () => {
    append({ 
      description: '',
      score: 0,
    });
  };

  const handleRemoveOption = (index: number) => {
    remove(index);
  };
  

  const handleEditProfessional = async (data: Question) => {
    console.log(data)
  }

  const handleDeleteProfessional = async () => {
    deleteProfessional(questionDetails.id ? questionDetails.id : '')
  }
  return (
    <div className="p-8 w-full">
      <CreateQuestion
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={handleEditProfessional}
      register={register}
      questionTitle={questionDetails.title}
      isEditing
      deleteQuestion={handleDeleteProfessional}
      fields={fields}
      handleAddOption={handleAddOption}
      handleRemoveOption={handleRemoveOption}
      watch={watch}
      />
    </div>
  )
}