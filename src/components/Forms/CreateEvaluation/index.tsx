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
import { faChevronLeft, faEye, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormRegister, UseFormReset, useForm } from "react-hook-form";
import CreateRule from "../CreateRule";
import CreateRuleSection from "../CreateRuleSection";

interface ICreateEvaluationProps {
  handleSubmit: any;
  onSubmit: (data: Form) => Promise<void>;
  register: UseFormRegister<Form>
  errors: any;
  control: any;
  isEditing?: boolean;
  formTitle?: string;
  deleteQuestion?: () => Promise<void>;
  formList: QuestionDetails[]
  setFormList: Dispatch<SetStateAction<QuestionDetails[]>>
}

const CreateEvaluation: React.FC<ICreateEvaluationProps> = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isEditing,
  formTitle,
  deleteQuestion,
  formList,
  setFormList
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalTable, setModalTable] = useState('DataTable');

  const handleSearch = () => {
    searchQuestions(searchTerm)
  }
  const {
    fetchForms,
    forms,
    searchQuestions,
    getFormById,
    questionDetails,
  } = useForms()

  useEffect(() => {
    fetchForms()
  }, [])




  const handleAddForm = async (questionDetails: QuestionDetails) => {
    setFormList((prevState) => {
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
            formTitle ? `Editar ${formTitle}` : 'Nova Avaliação'
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
        <Button type="button" className="btn-success text-white my-2" onClick={() => {
          setIsQuestionModalOpen(true)
          }}>
          <FontAwesomeIcon icon={faPlus}/> Adicionar Formulário
        </Button> 
        {formList.map((question: any) => (
              <fieldset key={question.id} className="border border-base-300 rounded p-2 gap-4 my-4 text-xs">
                {setQuestionComponent(question)}
                <Button
                  type="button"
                  className="btn-error text-white mt-2"
                  onClick={() => setFormList(formList.filter((q) => q.id !== question.id))}
                >
                  Remover Questão
                </Button>
              </fieldset>
            ))}
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
      headerText="Adicionar Formulário"
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
                        getFormById(row.id)
                        setModalTable('QuestionDetails')
                      }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </>
                  )
                }
              }
            ]}
            data={forms}
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
                  handleAddForm(questionDetails)
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

export default CreateEvaluation;