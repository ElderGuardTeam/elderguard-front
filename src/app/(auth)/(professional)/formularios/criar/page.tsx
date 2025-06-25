'use client'

import CreateForm from "@/components/Forms/CreateForm"
import { useForms } from "@/contexts/formsContext"
import CreateFormSchema from "@/utils/schema/createFunctionSchema"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState } from "react"
import { Resolver, useForm } from "react-hook-form"

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
    setValue
  } = useForm<Form>({
    resolver: zodResolver(CreateFormSchema) as Resolver<Form>
  })

  const [formSections, setFormSections] = useState<Section[]>([])


  const handleCreateForm = async (data: Form) => {
    const mergedSections = formSections.map((section, index) => {
      const { title } = section; 
      return {
        title,
        rule: data.seccions?.[index + 1]?.rule ? {
          ...(data.seccions?.[index + 1]?.rule || section.rule),
          value1: data.seccions?.[index + 1]?.rule?.value1
            ? Number(data.seccions[index + 1].rule?.value1)
            : null,
          value2: data.seccions?.[index + 1]?.rule?.value2
            ? Number(data.seccions[index + 1].rule?.value2)
            : null,
          maxScore: data.seccions?.[index + 1]?.rule?.maxScore
            ? Number(data.seccions[index + 1].rule?.maxScore)
            : null,
          totalItems: data.seccions?.[index + 1]?.rule?.totalItems
            ? Number(data.seccions[index + 1].rule?.totalItems)
            : null,
        } : null,
        questionsIds: section.questionsIds?.map((question) => question?.id),
      };
    });
  
    await createForm({
      ...data,
      seccions: mergedSections,
      rule: data.rule ? {
        ...data.rule,
        maxScore: data.rule?.maxScore ? Number(data.rule?.maxScore) : null,
        value1: data.rule?.value1? Number(data.rule?.value1) : null,
        value2: data.rule?.value2 ? Number(data.rule?.value2) : null,
        totalItems: data.rule?.totalItems ? Number(data.rule?.totalItems) : null,
      } : null,
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
      setValue={setValue}
      />
    </div>
  )
}