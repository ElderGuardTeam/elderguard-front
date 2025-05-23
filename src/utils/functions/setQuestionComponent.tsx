'use client'
import Checkbox from "@/components/Checkbox"
import FormGroup from "@/components/FormGroup"
import Label from "@/components/Label"
import SelectFormGroup from "@/components/SelectFormGroup"
import { useForm } from "react-hook-form"

export const setQuestionComponent = (questionDetails: QuestionDetails | Question) => {

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
        <div className="space-y-2">
        <Label labelText={questionDetails.title}/>
        {questionDetails.options?.map((option) => (
          <div className="flex items-center gap-2">
            <Checkbox value={option.questionId}/>
            <Label labelText={option.description}/>
          </div>
        ))}
        </div>
      )
    case 'BOOLEAN':
      return (
        <div>
          <Checkbox />
          <Label labelText={questionDetails.description}/>
        </div>
      )
    default:
      return null
  }
}