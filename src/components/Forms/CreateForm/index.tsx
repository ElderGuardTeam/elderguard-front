'use client'
import Button from "@/components/Button";
import DataTableComponent from "@/components/DataTable";
import FormGroup from "@/components/FormGroup"
import Input from "@/components/Input";
import Label from "@/components/Label";
import MaskedInput from "@/components/MaskedInput";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import SelectFormGroup from "@/components/SelectFormGroup";
import TextAreaFormGroup from "@/components/TextAreaFormGroup";
import { useForms } from "@/contexts/formsContext";
import { formatDate } from "@/utils/formatters/formateDate";
import { setQuestionComponent } from "@/utils/functions/setQuestionComponent";
import { faChevronLeft, faEye, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormRegister, useForm } from "react-hook-form";

interface ICreateFormProps {
  handleSubmit: any;
  onSubmit: (data: Question) => Promise<void>;
  register: UseFormRegister<Question>
  errors: any;
  control: any;
  isEditing?: boolean;
  formTitle?: string;
  deleteQuestion?: () => Promise<void>;
}

const CreateForm: React.FC<ICreateFormProps> = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  control,
  isEditing,
  formTitle,
  deleteQuestion,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalTable, setModalTable] = useState('DataTable');
  const [questionsList, setQuestionsList] = useState<QuestionDetails[]>([])

  const handleSearch = () => {
    searchQuestions(searchTerm)
  }

  const {
    fetchQuestions,
    questions,
    searchQuestions,
    getQuestionById,
    questionDetails,
  } = useForms()

  useEffect(() => {
    fetchQuestions()
  }, [])


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

  const handleAddQuestion = async (id: string) => {
    await getQuestionById(id)
    setQuestionsList((prevState) => {
      const questionExists = prevState.some((question) => question.id === questionDetails.id);
      if (!questionExists) {
        return [...prevState, questionDetails];
      }
      return prevState;
    });
  }

  
  return (
    <form className="bg-white rounded p-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="flex gap-2 items-center">
        <div className="h-8 w-8 flex items-center justify-center hover:border-salmon hover:border rounded-full" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        {
            formTitle ? `Editar ${formTitle}` : 'Novo Formulário'
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
        <FormGroup
        labelText="Tipo"
        isRequired
        />
        <Button type="button" className="btn-success text-white my-2" onClick={() => setIsQuestionModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus}/> Adicionar Questão
        </Button>
        <br/>
        {
          questionsList.length > 0 && (
            <div>
              {
                questionsList.map((question: QuestionDetails) => (
                  <fieldset key={question.id} className="border border-base-300 rounded p-2  gap-4 my-4 text-xs">
                    {setQuestionComponent(question)}
                    <Button
                      type="button"
                      className="btn-error text-white mt-2"
                      onClick={() => setQuestionsList(questionsList.filter((q) => q.id !== question.id))}
                    >
                      Remover
                    </Button>
                  </fieldset>
                ))
              }
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
      <Modal 
      isOpen={isQuestionModalOpen}
      onClose={() => setIsQuestionModalOpen(false)}
      className="w-3/4 "
      headerText="Adicionar Questão"
      >
        {
          modalTable === 'DataTable' && (
            <>
            <div className="flex items-baseline gap-2 mb-6">
              <Input
              className="mt-4"
              placeholder="🔍 Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
              />
              <Button className=" bg-salmon border-none" type="button" onClick={handleSearch}>
                Pesquisar
              </Button>
            </div>
            <DataTableComponent
            columns={[
              {
                name: 'Título',
                selector: (row: { title: any }) => row.title,
                sortable: true,
              },
              {
                name: 'Descrição',
                selector: (row: { description: any }) => row.description,
                sortable: true,
                cell: (row: { description: any }) => (
                  <p>
                    {row.description.length > 39 ? `${row.description.substring(0, 39)}...` : row.description}
                  </p>
                )
              },
              {
                name: 'Tipo',
                selector: (row: { type: any }) => row.type,
                sortable: true,
              },
              {
                name: '',
                selector: (row: { id: any }) => formatDate(row.id),
                width: '150px',
                cell: (row: { id: any }) => {
                  return (
                    <>
                      <Button 
                      className="bg-salmon text-white"
                      type="button"
                      onClick={() => {
                        getQuestionById(row.id)
                        setModalTable('QuestionDetails')
                      }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                      <Button
                        type="button"
                        className="btn-success text-white"
                        onClick={() => {
                          handleAddQuestion(row.id)
                          setIsQuestionModalOpen(false)
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </>
                  )
                }
              }
            ]}
            data={questions}
            onRowClicked={(row:Professional) => router.push(`/questoes/${row.id}`)}
            />
            </>
          )
        }
        {
          modalTable === 'QuestionDetails' && (
            <>
              {setQuestionComponent(questionDetails)}
              <div className="flex gap-2 mt-4">
                <Button type="button" className="btn-error text-white" onClick={() => setModalTable('DataTable')}>
                  Voltar
                </Button>
                <Button type="button" className="btn-link " onClick={() => {
                  setModalTable('DataTable')
                  handleAddQuestion(questionDetails.id)
                }}>
                  Adicionar
                </Button>
              </div>
            </>
          )
        }
      </Modal>
    </form>
  )
}

export default CreateForm;