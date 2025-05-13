'use client'

import CreateQuestion from "@/components/Forms/CreateQuestion"
import { useForms } from "@/contexts/formsContext"
import { useUsers } from "@/contexts/usersContext"
import CreateProfessionalSchema from "@/utils/schema/createProfessionalSchema"
import CreateQuestionSchema from "@/utils/schema/createQuestionSchema"
import toastError from "@/utils/toast/toastError"
import { zodResolver } from "@hookform/resolvers/zod"
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
    watch,
    reset
  } = useForm<Question>({
    resolver: zodResolver(CreateQuestionSchema),
  })

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


  const handleCreateQuestion = async (data: Question) => {
    await createQuestion(data)
  }


  return (
    <div className="p-8 w-full">
      <CreateQuestion
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={handleCreateQuestion}
      register={register}
      watch={watch}
      fields={fields}
      handleAddOption={handleAddOption}
      handleRemoveOption={handleRemoveOption}
      reset={reset}
      />
    </div>
  )
}