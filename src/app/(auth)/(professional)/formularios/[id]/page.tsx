'use client'

import CreateForm from "@/components/Forms/CreateForm"
import { useForms } from "@/contexts/formsContext"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function CreateQuestionPage({params}: {params: {id: string}}) {
  const {
    getFormById,
    formDetails,
    deleteForm,
    editForm
  } = useForms()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    watch,
    reset, 
    setValue
  } = useForm<Form>()

  const [formSections, setFormSections] = useState<Section[]>([])

  useEffect(() => {
    getFormById(params.id)
  }, [params.id])

  useEffect(() => {
    if (formDetails) {
      setValue("rule", formDetails.rule)
      setValue("description", formDetails.description)
      setValue("type", formDetails.type)
      setValue("title", formDetails.title)
      setFormSections(formDetails.seccions|| [])
      formDetails.seccions?.map((section, index) => {
        if (!section.id) return
        setValue(`seccions.${section.id}.rule`, section.rule)
      })
    }
  }, [formDetails])

  const handleCreateForm = async (data: Form) => {
    const mergedSections = formSections.map((section, index) => {
      const { title} = section; 
      if (!section.id) return section;
      return {
        title,
        rule: data.seccions?.[section.id]?.rule ? {
          ...(data.seccions?.[section.id]?.rule || section.rule),
          value1: data.seccions?.[section.id]?.rule?.value1
            ? Number(data.seccions[section.id].rule.value1)
            : null,
          value2: data.seccions?.[section.id]?.rule?.value2
            ? Number(data.seccions[section.id].rule.value2)
            : null,
          maxScore: data.seccions?.[section.id]?.rule?.maxScore
            ? Number(data.seccions[section.id].rule?.maxScore)
            : null,
          totalItems: data.seccions?.[section.id]?.rule?.totalItems
            ? Number(data.seccions[section.id].rule?.totalItems)
            : null,
        } : null,
        questionsIds: section.questionsIds.map((question) => question.id),
      };
    });
  
    await editForm({
      ...data,
      seccions: mergedSections,
    }, formDetails.id || '');
  };

  const handleDeleteForm = async () => {
    deleteForm(formDetails.id ? formDetails.id : '')
  }


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
      setValue={setValue}
      formTitle= {formDetails.title || ''}
      isEditing
      deleteForm={handleDeleteForm}
      formHasRule
      />
    </div>
  )
}