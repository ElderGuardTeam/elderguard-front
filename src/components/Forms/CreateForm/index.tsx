'use client'
import { faChevronLeft, faEye, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue, useForm } from "react-hook-form";

import { useForms } from "@/contexts/formsContext";
import { formatDate } from "@/utils/formatters/formateDate";
import { setQuestionComponent } from "@/utils/functions/setQuestionComponent";

import CreateRule from "../CreateRule";
import CreateRuleSection from "../CreateRuleSection";
import Button from "@/components/Button";
import DataTableComponent from "@/components/DataTable";
import FormGroup from "@/components/FormGroup"
import Input from "@/components/Input";
import Label from "@/components/Label";
import Modal from "@/components/Modal";
import TextAreaFormGroup from "@/components/TextAreaFormGroup";
import { stripHtmlTags } from "@/utils/functions/removeHTMLTags";

interface ICreateFormProps {
  handleSubmit: any;
  onSubmit: (data: Form) => Promise<void>;
  register: UseFormRegister<Form>
  errors: any;
  control: any;
  isEditing?: boolean;
  formTitle?: string;
  deleteForm?: () => Promise<void>;
  watch: any
  formSections: Section[]
  setFormSections: Dispatch<SetStateAction<Section[]>>
  setValue: UseFormSetValue<Form>
  formHasRule?: boolean
}

const CreateForm: React.FC<ICreateFormProps> = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isEditing,
  formTitle,
  deleteForm,
  watch,
  formSections,
  setFormSections, 
  setValue,
  formHasRule = false
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalTable, setModalTable] = useState('DataTable');
  const [activeSectionId, setActiveSectionId] = useState<number | null | undefined>(null);
  const [hasRule, setHasRule] = useState(formHasRule)



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

  const {
    register: registerQuestion,
  } = useForm()


  const handleAddSection = () => {
    const index = formSections.length
    setFormSections(prev => [...prev, { questionsIds: [], title: '', rule:null, id: index + 1 }]);
  };

  const handleDeleteSection = (sectionId: number | undefined) => {
    if (!sectionId) return
    setFormSections(prev => prev.filter(section => section.id !== sectionId));
  };

  const handleAddQuestionToSection = (sectionId: number | null | undefined, question: QuestionDetails) => {
    if (!sectionId) return
    setFormSections(prev =>
      prev.map(section =>
        section.id === sectionId && !section.questionsIds.some((q: any) => q.id === question.id)
          ? { ...section, questionsIds: [...section.questionsIds, question] }
          : section
      )
    );
  };


  const handleRemoveQuestionFromSection = (sectionId: number | undefined, questionId: string) => {
    if(!sectionId) return
    setFormSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, questionsIds: section.questionsIds.filter((q: any) => q.id !== questionId) }
          : section
      )
    );
  };

  const handleSectionTitleChange = (sectionId: number | undefined, newTitle: string) => {
    setFormSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, title: newTitle }
          : section
      )
    );
  };

  const handleAddOrResetRule = (sectionId: number | null | undefined) => {
    if(!sectionId) return
    const emptyRule: Rule = {
      id: String(Date.now()),
    };
    setFormSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, rule: emptyRule }
          : section
      )
    );
  };

  const handleRemoveRule = (sectionId: number) => {
    setFormSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, rule: null }
          : section
      )
    );
  };
  
  console.log(errors)
  
  return (
    <form className="bg-white rounded p-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="flex gap-2 items-center">
        <div className="h-8 w-8 flex items-center justify-center hover:border-salmon hover:border rounded-full" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        {
            formTitle ? `Editar Formulário` : 'Novo Formulário'
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
        register={register('description')}
        inputClass="input input-bordered h-24"
        error={errors.description?.message}
        />
        <FormGroup
        labelText="Tipo"
        isRequired
        register={register('type')}
        error={errors.type?.message}
        />
        {formSections.map(section => (
          <fieldset key={section.id} className="border border-gray-300 p-4 rounded mb-4">
            <legend className="text-sm font-bold">Sessão {section.title}</legend>
            <Label labelText="Título">
              <Input
              value={section.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSectionTitleChange(section.id, e.target.value)}
              />
            </Label>
            <Button type="button" className="btn-success text-white my-2" onClick={() => {
              setIsQuestionModalOpen(true)
              setActiveSectionId(section.id)
              }}>
              <FontAwesomeIcon icon={faPlus}/> Adicionar Questão
            </Button> 
            {section.questionsIds.map((question: any) => (
              <fieldset key={question.id} className="border border-base-300 rounded p-2 gap-4 mt-4 text-xs">
                {setQuestionComponent(question, registerQuestion)}
                <Button
                  type="button"
                  className="btn-error text-white mt-2"
                  onClick={() => handleRemoveQuestionFromSection(section.id, question.id)}
                >
                  Remover Questão
                </Button>
              </fieldset>
            ))}
          <br/>
          {
            !section?.rule?.id && (
              <Button type="button" className="btn-success text-white mt-2" onClick={() => {
                handleAddOrResetRule(section.id)
                }}>
                Adicionar Regra
              </Button>
            )
          }
          
          <br/>
          {
            section?.rule?.id && (
              <CreateRuleSection
              errors={errors}
              index={section.id}
              register={register}
              watch={watch}  
              handleRemoveRule={handleRemoveRule}
              isEditing={isEditing}
              />
            )
          }
          <Button
            type="button"
            className="btn-error w-fit text-white mt-2"
            onClick={() => handleDeleteSection(section.id)}
          >
            <FontAwesomeIcon icon={faTrash}/>
          </Button>
          </fieldset>
        ))}
        <Button type="button" className="btn-success text-white my-2" onClick={handleAddSection}>
          <FontAwesomeIcon icon={faPlus} /> Adicionar Sessão
        </Button>
        <br/>
        <Button type="button" className="btn-success text-white mt-2" onClick={() => setHasRule(true)}>
          Adicionar Regra
        </Button>
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
            <Button type="button" className="btn-link " onClick={() => router.push('/formularios')}>
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
            <Button type="button" className="btn-error text-white" onClick={deleteForm}>
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
      className="w-3/4 max-h-11/12"
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
                cell: (row: { description: any }) => {
                  const plainText = stripHtmlTags(row.description);
                  return (
                    <p>
                      {plainText?.length > 39 ? `${plainText.substring(0, 39)}...` : plainText}
                    </p>
                  );
                }
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
                    </>
                  )
                }
              }
            ]}
            data={questions}
            />
            </>
          )
        }
        {
          modalTable === 'QuestionDetails' && (
            <>
              {setQuestionComponent(questionDetails, registerQuestion)}
              <div className="flex gap-2 mt-4">
                <Button type="button" className="btn-error text-white" onClick={() => setModalTable('DataTable')}>
                  Voltar
                </Button>
                <Button type="button" className="btn-link " onClick={() => {
                  setModalTable('DataTable')
                  handleAddQuestionToSection(activeSectionId, questionDetails)
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