'use client'
import Checkbox from "@/components/Checkbox"
import FormGroup from "@/components/FormGroup"
import Label from "@/components/Label"
import SelectFormGroup from "@/components/SelectFormGroup"
import { useForm } from "react-hook-form"

export const setQuestionComponent = (questionDetails: QuestionDetails) => {

  switch (questionDetails.type) {
    case 'TEXT':
      return (
        <FormGroup
        labelText={questionDetails.title}
        />
      )
    case 'NUMBER':
      return (
        <FormGroup
        labelText={questionDetails.title}
        type="number"
        />
      )
    case 'IMAGE':
      return (
        <FormGroup
        labelText={questionDetails.title}
        type="file"
        />
      )
    case 'SELECT':
      return (
        <SelectFormGroup
        labelText={questionDetails.title}
        options={questionDetails.options?.map((option) => ({
          name: option.description,
          value: option.questionId
        })) || []}
        placeholder="Selecione"
        />
      )
    case 'MULTISELECT':
      return (
        <>
        {questionDetails.options?.map((option) => (
          <Label labelText={option.description}>
            <Checkbox value={option.questionId}/>
          </Label>
        ))}
        </>
      )
    case 'BOOLEAN':
      return (
        <Label labelText={questionDetails.description}>
          <Checkbox />
        </Label>
      )
    default:
      return null
  }
}