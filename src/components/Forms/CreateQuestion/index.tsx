import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup"
import Input from "@/components/Input";
import Label from "@/components/Label";
import MaskedInput from "@/components/MaskedInput";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import SelectFormGroup from "@/components/SelectFormGroup";
import TextAreaFormGroup from "@/components/TextAreaFormGroup";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";

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
  handleRemoveOption
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const watchType = watch('type');

  const [value1Type, setValue1Type] = useState('');
  const [value2Type, setValue2Type] = useState('');
  const [value1Manual, setValue1Manual] = useState('');
  const [value2Manual, setValue2Manual] = useState('');



  const {
    control: controlRule,
    register: registerRule,
    watch: watchRule,
  } = useForm()

  const watchRuleType = watchRule('type');

  
  return (
    <form className="bg-white rounded p-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="flex gap-2 items-center">
        <div className="h-8 w-8 flex items-center justify-center hover:border-salmon hover:border rounded-full" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        {
            questionTitle ? `Editar ${questionTitle}` : 'Nova Questão'
          }
      </h1>
      <div>
        <FormGroup
        labelText="Título"
        isRequired
        register={register('title')}
        error={errors.title?.message}
        />
        <TextAreaFormGroup
        labelText="Descrição"
        isRequired
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
                  />
                  <FormGroup
                  labelText="Pontuação"
                  isRequired
                  register={register(`options.${index}.score`)}
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
        <Button type="button" className="btn-success text-white mt-2">
          Adicionar Regra
        </Button>
        <fieldset className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4 my-4 text-xs">
          <legend>Regra</legend>
          <SelectFormGroup
          labelText="Tipo"
          options={[
            {value: 'Conditional', name: 'Condicional'},
            {value: 'MathOperation', name: 'Operação matemática'},
            {value: 'MaxScore', name: 'Pontuação máxima'},
          ]}
          register={registerRule('type')}
          placeholder="Selecione"
          className="col-span-2"
          />
          {
            watchRuleType === 'MaxScore' && (
              <FormGroup
              labelText="Pontuação máxima"
              isRequired
              register={registerRule('maxScore')}
              error={errors.maxScore?.message}
              className="col-span-2"
              />
            )
          }
          {
            watchRuleType === 'Conditional' && (
              <div className="col-span-2 grid grid-cols-6 items-center text-sm gap-2 text-center">
                <span>Se a pontuação for </span>
                <Select
                options={[
                  {value: '>', name: 'Maior que'},
                  {value: '<', name: 'Menor que'},
                  {value: '=', name: 'Igual a'},
                ]}
                />
                <Input/>
                <span>então</span>
                <Select
                options={[
                  {value: '+', name: 'somar'},
                  {value: '-', name: 'subtrair'},
                  {value: '*', name: 'multiplicar por'},
                  {value: '/', name: 'subtrair por'},
                ]}
                />
                <Input/>
              </div>
            )
          }
          {
            watchRuleType === 'MathOperation' && (
            <>
              <div className="col-span-2 grid grid-cols-3 items-end gap-2">
                  <div className={`${ value1Type === 'value' && 'flex items-end gap-1'}`}>
                    <SelectFormGroup
                    labelText="Valor 1"
                    options={[
                      { value: 'score', name: 'Pontuação' },
                      { value: 'value', name: 'Inserir valor' },
                    ]}
                    register={registerRule('value1',{
                      onChange: (e) => setValue1Type(e.target.value)
                    })}
                    placeholder="Selecione"
                    className={`${ value1Type === 'value' && 'w-1/2'}`}
                    />
                    {
                      value1Type === 'value' && (
                        <Input
                          placeholder="Digite o valor"
                          value={value1Manual}
                          onChange={(e: any) => setValue1Manual(e.target.value)}
                          className="w-1/2"
                        />
                      )
                    }
                  </div>
                  <Select
                    options={[
                      { value: '+', name: '+' },
                      { value: '-', name: '-' },
                      { value: '*', name: '*' },
                      { value: '/', name: '/' },
                    ]}
                  />

                  <div className={`${ value2Type === 'value' && 'flex items-end gap-1'}`}>
                  <SelectFormGroup
                    labelText="Valor 2"
                    options={[
                      { value: 'score', name: 'Pontuação' },
                      { value: 'value', name: 'Inserir valor' },
                    ]}
                    register={registerRule('value2',{
                      onChange: (e) => setValue2Type(e.target.value)
                    })}
                    placeholder="Selecione"
                    className={`${ value2Type === 'value' && 'w-1/2'}`}
                    />
                    {
                      value2Type === 'value' && (
                        <Input
                          placeholder="Digite o valor"
                          value={value2Manual}
                          onChange={(e: any) => setValue2Manual(e.target.value)}
                          className="w-1/2"
                        />
                      )
                    }
                  </div>
                </div>
              <Button
                type="button"
                className="btn-error w-fit text-white mt-2"
              >
                Remover Regra
              </Button>
            </>
            )
            }
        </fieldset>
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