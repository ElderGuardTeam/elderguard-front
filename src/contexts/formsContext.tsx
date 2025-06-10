'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/lib/axios'
import toastError from '@/utils/toast/toastError'
import toastSuccess from '@/utils/toast/toastSuccess'
import { Question } from '@/utils/schema/createQuestionSchema'
import { transformApiResponseToForm } from '@/utils/functions/transformFormData'


type FormsContextType = {
  createQuestion: (data: Question) => Promise<void>
  fetchQuestions: () => Promise<void>
  getQuestionById: (id: string) => Promise<void>
  deleteQuestion: (id: string) => Promise<void>
  editQuestion: (question: Question, id: string) => Promise<void>
  searchQuestions: (searchTerm: string) => Promise<void>
  createForm: (data:Form) => Promise<void>
  fetchForms: () => Promise<void>
  searchForms: (searchTerm: string) => Promise<void>
  getFormById: (id: string) => Promise<void>
  createEvaluation: (data: Evaluation) => Promise<void>
  getEvaluationById: (id: string) => Promise<void>
  deleteForm: (id: string) => Promise<void>
  editForm: (form: Form, id: string) => Promise<void>
  fetchEvaluation: () => Promise<void>
  searchEvaluations: (searchTerm: string) => Promise<void>
  deleteEvaluation: (id: string) => Promise<void>
  editEvaluation: (evaluation: Evaluation, id: string) => Promise<void>
  questions: QuestionList[]
  questionDetails: QuestionDetails
  forms: FormList[]
  formDetails: Form
  evaluations: EvaluationList[]
  evaluationDetails: EvaluationDetails
  answerEvaluation: AnswerEvaluation
}

export const FormsContext = createContext({} as FormsContextType)

export function FormsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [questions, setQuestions] = useState<QuestionList[]>([])
  const [questionDetails, setQuestionDetails] = useState<QuestionDetails>({} as QuestionDetails)
  const [forms, setForms] = useState<FormList[]>([])
  const [formDetails, setFormDetails] = useState<Form>({} as Form)
  const [evaluations, setEvaluations] = useState<EvaluationList[]>([])
  const [evaluationDetails, setEvaluationDetails] = useState<EvaluationDetails>({} as EvaluationDetails)
  const [answerEvaluation, setAnswerEvaluation] = useState<AnswerEvaluation>({} as AnswerEvaluation)

  async function createQuestion(data: Question) {
    api.post('/question', {
      ...data,
      rule: {
        ...data.rule,
        maxScore: data.rule?.maxScore ? Number(data.rule?.maxScore) : null,
        value1: data.rule?.value1? Number(data.rule?.value1) : null,
        value2: data.rule?.value2 ? Number(data.rule?.value2) : null
      },
      options: data.options?.map((option) => ({
        description: option.description,
        score: Number(option.score),
      })),
    }).then((response) => {
      toastSuccess('Questão criada com sucesso', 5000)
      router.push('/questoes')
    }).catch((error) => {
      toastError('Erro ao criar questão', false)
    })
  }

  async function fetchQuestions() {
    api.get('/question').then((response) => {
      setQuestions(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar questões', false)
    })
  }

  async function getQuestionById(id: string) {
    api.get(`/question/${id}`).then((response) => {
      setQuestionDetails(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar questão', false)
    })
  }

  async function deleteQuestion(id: string) {
    api.delete(`/question/${id}`).then((response) => {
      toastSuccess('Questão deletada com sucesso', 5000)
      fetchQuestions()
      router.push('/questoes')
    }).catch((error) => {
      toastError('Erro ao deletar questão', false)
    })
  }

  async function editQuestion(question: Question, id: string) {
    api.patch(`/question/${id}`, {
      ...question,
      rule: {
        ...question.rule,
        maxScore: question.rule?.maxScore ? Number(question.rule?.maxScore) : null,
        value1: question.rule?.value1? Number(question.rule?.value1) : null,
        value2: question.rule?.value2 ? Number(question.rule?.value2) : null
      },
      options: question.options?.map((option) => ({
        description: option.description,
        score: Number(option.score),
      })),
    }).then((response) => {
      toastSuccess('Questão editada com sucesso', 5000)
      fetchQuestions()
      router.push('/questoes')
    }).catch((error) => {
      toastError('Erro ao editar questão', false)
    })
  }

  async function searchQuestions(searchTerm: string) {
    api.get(`/question?search=${searchTerm}`).then((response) => {
      setQuestions(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar questões', false)
    })
  }

  async function createForm(data: Form) {
    api.post('/form', data).then((response) => {
      toastSuccess('Formulário criado com sucesso', 5000)
      router.push('/formularios')
    })
    .catch((error) => {
      toastError('Erro ao criar formulário', false)
    })
  }

  async function editForm(form: Form, id: string) {
    api.patch(`/form/${id}`, form).then((response) => {
      toastSuccess('Formulário editado com sucesso', 5000)
      router.push('/formularios')
    })
    .catch((error) => {
      toastError('Erro ao editar formulário', false)
    })
  }


  async function fetchForms() {
    api.get('/form').then((response) => {
      setForms(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar formulários', false)
    })
  }

  async function searchForms(searchTerm: string) {
    api.get(`/form?search=${searchTerm}`).then((response) => {
      setForms(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar formulários', false)
    })
  }

  async function deleteForm(id: string) {
    api.delete(`/form/${id}`).then((response) => {
      toastSuccess('Formulário deletado com sucesso', 5000)
      fetchQuestions()
      router.push('/formularios')
    }).catch((error) => {
      toastError('Erro ao deletar formulário', false)
    })
  }

  async function getFormById(id: string) {
    api.get(`/form/${id}`).then((response) => {
      setFormDetails(transformApiResponseToForm(response.data))
    }).catch((error) => {
      console.log(error)
      toastError('Erro ao buscar questão', false)
    })
  }

  async function getEvaluationById(id: string) {
    api.get(`/evaluation/${id}`).then((response) => {
      setEvaluationDetails(response.data)
      setAnswerEvaluation(response.data)
    }).catch((error) => {
      console.log(error)
      toastError('Erro ao buscar questão', false)
    })
  }

  async function createEvaluation(data: Evaluation) {
    api.post('/evaluation', data).then((response) => {
      toastSuccess('Avaliação criada com sucesso', 5000)
      router.push('/avaliacoes')
    })
    .catch((error) => {
      toastError('Erro ao criar avaliação', false)
    })
  }


  async function fetchEvaluation() {
    api.get('/evaluation').then((response) => {
      setEvaluations(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar avaliações', false)
    })
  }

  async function searchEvaluations(searchTerm: string) {
    api.get(`/evaluation?search=${searchTerm}`).then((response) => {
      setForms(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar avaliação', false)
    })
  }

  async function deleteEvaluation(id: string) {
    api.delete(`/evaluation/${id}`).then((response) => {
      toastSuccess('Avaliação deletada com sucesso', 5000)
      router.push('/avaliacoes')
    }).catch((error) => {
      toastError('Erro ao deletar avaliacao', false)
    })
  }

  async function editEvaluation(evaluation: Evaluation, id: string) {
    api.patch(`/evaluation/${id}`, evaluation).then((response) => {
      toastSuccess('Avaliação editada com sucesso', 5000)
      router.push('/avaliacoes')
    })
    .catch((error) => {
      toastError('Erro ao editar avaliação', false)
    })
  }

  return (
    <FormsContext.Provider
      value={{
      createQuestion,
      fetchQuestions,
      questions,
      getQuestionById,
      questionDetails,
      deleteQuestion,
      editQuestion,
      searchQuestions,
      createForm,
      fetchForms,
      forms,
      searchForms,
      getFormById,
      formDetails,
      createEvaluation,
      deleteForm,
      editForm,
      fetchEvaluation,
      evaluations,
      searchEvaluations,
      getEvaluationById,
      evaluationDetails,
      answerEvaluation,
      deleteEvaluation,
      editEvaluation
      }}
    >
      {children}
    </FormsContext.Provider>
  )
}

export const useForms = () => useContext(FormsContext)
