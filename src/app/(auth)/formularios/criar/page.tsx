'use client'

import CreateForm from "@/components/Forms/CreateForm"
import CreateQuestion from "@/components/Forms/CreateQuestion"
import { useForms } from "@/contexts/formsContext"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { validateCPF } from 'validations-br'

export default function CreateQuestionPage() {
  const {
    createForm
  } = useForms()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    watch,
    reset
  } = useForm<Form>()

  const [formSections, setFormSections] = useState<Section[]>([])



  const handleCreateForm = async (data: Form) => {
    const mergedSections = formSections.map((section, index) => {
      const { id, ...rest } = section; // Remove o `id`
  
      return {
        ...rest,
        rule: {
          ...(data.seccions?.[index + 1]?.rule || section.rule),
          value1: data.seccions?.[index + 1]?.rule?.value1
            ? Number(data.seccions[index + 1].rule.value1)
            : null,
          value2: data.seccions?.[index + 1]?.rule?.value2
            ? Number(data.seccions[index + 1].rule.value2)
            : null,
        },
        questionsIds: section.questionsIds.map((question) => question.id),
      };
    });
  
    await createForm({
      ...data,
      seccions: mergedSections,
    });
  };


  return (
    <div className="p-8 w-full">
      <CreateForm
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={handleCreateForm}
      register={register}
      watch={watch}
      setFormSections={setFormSections}
      formSections={formSections}
      reset={reset}
      />
    </div>
  )
}