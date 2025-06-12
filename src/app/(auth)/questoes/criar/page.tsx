'use client'

import { useFieldArray, useForm } from "react-hook-form"

import CreateQuestion from "@/components/Forms/CreateQuestion"
import { useForms } from "@/contexts/formsContext"
import { zodResolver } from "@hookform/resolvers/zod"
import CreateQuestionSchema, { Question } from "@/utils/schema/createQuestionSchema"
import toastError from "@/utils/toast/toastError"
import { isValidScore } from "@/utils/functions/isValidScore"

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
    setValue
  } = useForm<Question>({
    resolver: zodResolver(CreateQuestionSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options" 
  });

  const handleAddOption = () => {
    append({ 
      description: '',
      score: null,
    });
  };

  const handleRemoveOption = (index: number) => {
    remove(index);
  };


  const handleCreateQuestion = async (data: Question) => {
    if (data.options?.some(opt => !isValidScore(opt.score))) {
      toastError('Todas as opções devem ter uma pontuação válida.', 5000)
      return;
    }    

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
      setValue={setValue}
      />
    </div>
  )
}