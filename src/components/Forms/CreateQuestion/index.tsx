'use client'

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

import CreateRule from "../CreateRule";
import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup"
import Modal from "@/components/Modal";
import SelectFormGroup from "@/components/SelectFormGroup";
import TextAreaFormGroup from "@/components/TextAreaFormGroup";
import { Question } from "@/utils/schema/createQuestionSchema";

interface ICreateQuestionFormProps {
  handleSubmit: any;
  onSubmit: (data: Question) => Promise<void>;
  register: UseFormRegister<Question>
  errors: any;
  control: any;
  isEditing?: boolean;
  questionTitle?: string;
  deleteQuestion?: () => Promise<void>;
  watch: any;
  fields: any;
  handleAddOption: () => void;
  handleRemoveOption: (index: number) => void;
  questionHasRule?: boolean
  setValue: UseFormSetValue<Question>
}

const CreateQuestion: React.FC<ICreateQuestionFormProps> = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  control,
  isEditing,
  questionTitle,
  deleteQuestion,
  watch,
  fields,
  handleAddOption,
  handleRemoveOption,
  setValue,
  questionHasRule = false
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [hasRule, setHasRule] = useState(questionHasRule)

  const watchType = watch('type');

  return (
    <form className="bg-white rounded p-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="flex gap-2 items-center">
        <div className="h-8 w-8 flex items-center justify-center hover:border-salmon hover:border rounded-full" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        {
            questionTitle ? `Editar Questão` : 'Nova Questão'
          }
      </h1>
      <div>
        <FormGroup
        labelText="Enunciado"
        isRequired
        register={register('title')}
        error={errors.title?.message}
        />
        <TextAreaFormGroup
        labelText="Descrição"
        register={register('description')}
        inputClass="input input-bordered h-24"
        error={errors.description?.message}
        />
        <SelectFormGroup
        labelText="Tipo"
        isRequired
        register={register('type')}
        error={errors.type?.message}
        options={[
          { value: 'TEXT', name: 'Texto' },
          { value: 'SELECT', name: 'Seleção' },
          { value: 'BOOLEAN', name: 'Sim ou Não' },
          { value: 'NUMBER', name: 'Número' },
          { value: 'MULTISELECT', name: 'Seleção múltipla' },
          { value: 'IMAGE', name: 'Imagem' },
        ]}
        placeholder="Selecione"
        isDisabled={isEditing}
        />
        {
          (watchType === 'SELECT' || watchType === 'MULTISELECT') && (
            <div>
              {fields.map((item: any, index: number) => (
                <fieldset key={item.id} className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4 my-4 text-xs">
                  <legend>Opção {index + 1}</legend>
                  <FormGroup
                  labelText="Descrição"
                  isRequired
                  register={register(`options.${index}.description`)}
                  error={errors.options?.[index]?.description?.message}
                  />
                  <FormGroup
                  labelText="Pontuação"
                  isRequired
                  register={register(`options.${index}.score`)}
                  error={errors.options?.[index]?.description?.score}
                  />
                  <Button type="button" className="btn-error text-white w-fit" onClick={() => handleRemoveOption(index)}>
                    Remover
                  </Button>
                </fieldset>
              ))}
              <Button type="button" className="btn-success text-white mt-2" onClick={handleAddOption}>
                Adicionar Opção
              </Button>
            </div>
          )
        }
        {
          !hasRule && (
            <Button type="button" className="btn-success text-white mt-2" onClick={() => setHasRule(true)}>
              Adicionar Regra
            </Button>
          )
        }
        
        {
          hasRule && (
          <CreateRule
          errors={errors}
          register={register}
          watch={watch}
          setHasRule={setHasRule}
          setValue={setValue}
          isEditing={isEditing}
          />)
        }
        <div className="flex item-center justify-between mt-4">
          <div>
            <Button type="submit" className="btn-success text-white">
              Salvar
            </Button>
            <Button type="button" className="btn-link " onClick={() => router.push('/questoes')}>
              Cancelar
            </Button>
          </div>
          {
            isEditing && (
              <Button type="button" className="btn-error text-white" onClick={() => setIsOpen(true)}>
                Excluir
              </Button>
            )
          }
          
        </div>
      </div>
      <Modal 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="w-1/4 "
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg font-bold">Deseja realmente excluir?</h1>
          <p className="text-xs text-center">Essa ação não pode ser desfeita</p>
          <div className="flex gap-2 mt-4">
            <Button type="button" className="btn-error text-white" onClick={deleteQuestion}>
              Sim
            </Button>
            <Button type="button" className="btn-link " onClick={() => setIsOpen(false)}>
              Não
            </Button>
          </div>
        </div>
      </Modal>
    </form>
  )
}

export default CreateQuestion;