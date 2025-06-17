'use client'
import Checkbox from "@/components/Checkbox"
import FormGroup from "@/components/FormGroup"
import Label from "@/components/Label"
import { UseFormRegister, useForm } from "react-hook-form"
import { Question } from "../schema/createQuestionSchema"
import Input from "@/components/Input"
import Select from "@/components/Select"

export const setQuestionComponent = (questionDetails: QuestionDetails | Question, register: UseFormRegister<any>) => {

  switch (questionDetails.type) {
    case 'TEXT':
      return (
        <div className="w-full break-words text-wrap">
          <Label labelText={questionDetails.title} >
            {
              questionDetails.description && (
                <div className="my-2 text-sm text-gray-600 bg-gray-50 p-2 rounded" 
                dangerouslySetInnerHTML={{ __html: questionDetails.description || '' }}/>
              )
            }
            <Input
            register={register(questionDetails.id || '')}
            />
          </Label>
        </div>
      )
    case 'NUMBER':
      return (
        <div className="w-full break-words text-wrap">
          <Label labelText={questionDetails.title} >
            {
              questionDetails.description && (
                <div className="my-2 text-sm text-gray-600 bg-gray-50 p-2 rounded" 
                dangerouslySetInnerHTML={{ __html: questionDetails.description || '' }}/>
              )
            }
            <Input 
            type="number"
            register={register(questionDetails.id || '')}
            />
          </Label>
        </div>
      )
    case 'IMAGE':
      return (
        <div className="w-full break-words text-wrap">
          <Label labelText={questionDetails.title} >
            {
              questionDetails.description && (
                <div className="my-2 text-sm text-gray-600 bg-gray-50 p-2 rounded" 
                dangerouslySetInnerHTML={{ __html: questionDetails.description || '' }}/>
              )
            }
            <Input 
            type="file" 
            className="input"
            register={register(questionDetails.id || '')}
            />
          </Label>
        </div>
      )
    case 'SELECT':
      return (
        <div className="w-full break-words text-wrap">
          <Label labelText={questionDetails.title} >
            {
              questionDetails.description && (
                <div className="my-2 text-sm text-gray-600 bg-gray-50 p-2 rounded" 
                dangerouslySetInnerHTML={{ __html: questionDetails.description || '' }}/>
              )
            }
            <Select
            options={questionDetails.options?.map((option) => ({
              name: option.description,
              value: option.id
            })) || []}
            placeholder="Selecione"
            register={register(questionDetails.id || '')}
            />
          </Label>
        </div>
      )
    case 'MULTISELECT':
      return (
        <div className="space-y-2">
        <Label labelText={questionDetails.title}/>
          {
            questionDetails.description && (
              <div className="my-2 text-sm text-gray-600 bg-gray-50 p-2 rounded" 
              dangerouslySetInnerHTML={{ __html: questionDetails.description || '' }}/>
            )
          }
        {questionDetails.options?.map((option) => (
          <div className="flex items-center gap-2">
            <Checkbox 
            value={option.questionId || ''}
            register={register(questionDetails.id || '')}
            />
            <Label labelText={option.description}/>
          </div>
        ))}
        </div>
      )
    case 'BOOLEAN':
      return (
        <div>
          <Label labelText={questionDetails.title}/>
          {
              questionDetails.description && (
                <div className="my-2 text-sm text-gray-600 bg-gray-50 p-2 rounded" 
                dangerouslySetInnerHTML={{ __html: questionDetails.description || '' }}/>
              )
            }
          <div className="flex items-center gap-2">
            <input type="radio" value="true" className="radio radio-primary" {...register(questionDetails.id || '')} />
            <Label labelText="Sim" />
          </div>  
          <div className="flex items-center gap-2">
            <input type="radio" value="false"  className="radio radio-primary" {...register(questionDetails.id || '')} />
            <Label labelText="Não"/>
          </div>  
        </div>
      )
    case 'SCORE':
      return (
        <div>
          <Label labelText={questionDetails.title}/>
          {
              questionDetails.description && (
                <div className="my-2 text-sm text-gray-600 bg-gray-50 p-2 rounded" 
                dangerouslySetInnerHTML={{ __html: questionDetails.description || '' }}/>
              )
            }
          <FormGroup
          labelText="Pontuação"
          className="w-24 mt-2"
          register={register(questionDetails.id || '')}
          />
        </div>
      )
    default:
      return null
  }
}