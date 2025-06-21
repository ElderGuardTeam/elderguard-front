'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/lib/axios'
import toastError from '@/utils/toast/toastError'
import toastSuccess from '@/utils/toast/toastSuccess'
import { Question } from '@/utils/schema/createQuestionSchema'
import { transformApiResponseToForm } from '@/utils/functions/transformFormData'
import { useLoader } from './loaderContext'
import { parseCookies } from 'nookies'


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
  answerEvaluationRequest: (data: EvaluationAnswer) => Promise<void>
  editAnswerEvaluationRequest: (data: EvaluationAnswer, id: string) => Promise<void>
  getEvaluationAnswerList: () => Promise<void>
  getEvaluationAnswerById: (id: string) => Promise<void>
  handlePauseEvaluation: (id: string, data: EvaluationAnswer) => Promise<void>
  getEvaluationAnswerListByUser: (userId: string) => Promise<void>
  handleCompleteEvaluation: (id: string, data: EvaluationAnswer) => Promise<void>
  evaluationAnswerDetails: EvaluationAnswerList
  evaluationAnswerList: EvaluationAnswerList[]
  questions: QuestionList[]
  questionDetails: QuestionDetails
  forms: FormList[]
  formDetails: Form
  evaluations: EvaluationList[]
  evaluationDetails: EvaluationDetails
  answerEvaluation: AnswerEvaluation
  answerId: string | null
  headerConfig: {
    headers: {
      Authorization: string
    }
  }
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
  const [answerId, setAnswerId] = useState<string | null>(null)
  const [evaluationAnswerList, setEvaluationAnswerList] = useState<EvaluationAnswerList[]>([])
  const [evaluationAnswerDetails, setEvaluationAnswerDetails] = useState<EvaluationAnswerList>({} as EvaluationAnswerList)

  const {
    setLoading
  } = useLoader()

  const { 'elderguard.token': token } = parseCookies()

  const headerConfig = {
    headers:{
      Authorization: 'Bearer ' + token,
    },
    }


  async function createQuestion(data: Question) {
    setLoading(true)
    api.post('/question', {
      ...data,
      rule: data.rule?.type ? {
        ...data.rule,
        maxScore: data.rule?.maxScore ? Number(data.rule?.maxScore) : null,
        value1: data.rule?.value1? Number(data.rule?.value1) : null,
        value2: data.rule?.value2 ? Number(data.rule?.value2) : null
      } : null,
      options: data.options?.map((option) => ({
        description: option.description,
        score: Number(option.score),
      })),
    }).then((response) => {
      toastSuccess('Questão criada com sucesso', 5000)
      router.push('/questoes')
    }).catch((error) => {
      toastError('Erro ao criar questão', false)
    }).finally(() => {
      setLoading(false)
    })
  }

  async function fetchQuestions() {
    setLoading(true)
    api.get('/question').then((response) => {
      setQuestions(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar questões', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function getQuestionById(id: string) {
    setLoading(true)
    api.get(`/question/${id}`).then((response) => {
      setQuestionDetails(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar questão', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function deleteQuestion(id: string) {
    setLoading(true)
    api.delete(`/question/${id}`).then((response) => {
      toastSuccess('Questão deletada com sucesso', 5000)
      fetchQuestions()
      router.push('/questoes')
    }).catch((error) => {
      toastError('Erro ao deletar questão', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function editQuestion(question: Question, id: string) {
    setLoading(true)
    api.patch(`/question/${id}`, {
      ...question,
      rule: question.rule?.type ? {
        ...question.rule, 
        maxScore: question.rule?.maxScore ? Number(question.rule?.maxScore) : null,
        value1: question.rule?.value1? Number(question.rule?.value1) : null,
        value2: question.rule?.value2 ? Number(question.rule?.value2) : null
      } : null,
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
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function searchQuestions(searchTerm: string) {
    api.get(`/question?search=${searchTerm}`).then((response) => {
      setQuestions(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar questões', false)
    })
  }

  async function createForm(data: Form) {
    setLoading(true)
    api.post('/form', data).then((response) => {
      toastSuccess('Formulário criado com sucesso', 5000)
      router.push('/formularios')
    })
    .catch((error) => {
      toastError('Erro ao criar formulário', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function editForm(form: Form, id: string) {
    setLoading(true)
    api.patch(`/form/${id}`, form).then((response) => {
      toastSuccess('Formulário editado com sucesso', 5000)
      router.push('/formularios')
    })
    .catch((error) => {
      toastError('Erro ao editar formulário', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }


  async function fetchForms() {
    setLoading(true)
    api.get('/form').then((response) => {
      setForms(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar formulários', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function searchForms(searchTerm: string) {
    setLoading(true)
    api.get(`/form?search=${searchTerm}`).then((response) => {
      setForms(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar formulários', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function deleteForm(id: string) {
  setLoading(true)
    api.delete(`/form/${id}`).then((response) => {
      toastSuccess('Formulário deletado com sucesso', 5000)
      fetchQuestions()
      router.push('/formularios')
    }).catch((error) => {
      toastError('Erro ao deletar formulário', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function getFormById(id: string) {
    setLoading(true)
    api.get(`/form/${id}`).then((response) => {
      setFormDetails(transformApiResponseToForm(response.data))
    }).catch((error) => {
      console.log(error)
      toastError('Erro ao buscar questão', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function getEvaluationById(id: string) {
    setLoading(true)
    api.get(`/evaluation/${id}`).then((response) => {
      setEvaluationDetails(response.data)
      setAnswerEvaluation(response.data)
    }).catch((error) => {
      console.log(error)
      toastError('Erro ao buscar questão', false)
    }).finally(() => {
      setLoading(false)
    })
  }

  async function createEvaluation(data: Evaluation) {
    setLoading(true)
    api.post('/evaluation', data).then((response) => {
      toastSuccess('Avaliação criada com sucesso', 5000)
      router.push('/avaliacoes')
    })
    .catch((error) => {
      toastError('Erro ao criar avaliação', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }


  async function fetchEvaluation() {
    setLoading(true)
    api.get('/evaluation').then((response) => {
      setEvaluations(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar avaliações', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function searchEvaluations(searchTerm: string) {
    setLoading(true)
    api.get(`/evaluation?search=${searchTerm}`).then((response) => {
      setForms(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar avaliação', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function deleteEvaluation(id: string) {
    setLoading(true)
    api.delete(`/evaluation/${id}`).then((response) => {
      toastSuccess('Avaliação deletada com sucesso', 5000)
      router.push('/avaliacoes')
    }).catch((error) => {
      toastError('Erro ao deletar avaliacao', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function editEvaluation(evaluation: Evaluation, id: string) {
    setLoading(true)
    api.patch(`/evaluation/${id}`, evaluation).then((response) => {
      toastSuccess('Avaliação editada com sucesso', 5000)
      router.push('/avaliacoes')
    })
    .catch((error) => {
      toastError('Erro ao editar avaliação', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function answerEvaluationRequest(data: EvaluationAnswer) {
    setLoading(true)
    api.post('/evaluation-answare', data, headerConfig).then((response) => {
      toastSuccess('Avaliação respondida com sucesso', 5000)
      setAnswerId(response.data.id)
    })
    .catch((error) => {
      toastError('Erro ao responder avaliação', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function editAnswerEvaluationRequest(data: EvaluationAnswer, id: string) {
    setLoading(true)
    api.patch(`/evaluation-answare/${id}/add-form`, data, headerConfig).then((response) => {
      toastSuccess('Formulário respondida com sucesso', 5000)
      setAnswerId(response.data.id)
    })
    .catch((error) => {
      toastError('Erro ao responder avaliação', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function getEvaluationAnswerList() {
    api.get(`/evaluation-answare` , headerConfig).then((response) => {
      setEvaluationAnswerList(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar respostas da avaliação', false)
    })
  }

  async function getEvaluationAnswerListByUser(userId: string) {
    api.get(`/evaluation-answare/my-evaluations` ,{
      ...headerConfig,
      params: {
        elderlyId: userId
      }
    }).then((response) => {
      setEvaluationAnswerList(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar respostas da avaliação', false)
    })
  }

  async function getEvaluationAnswerById(id: string) {
    setLoading(true)
    api.get(`/evaluation-answare/${id}`, headerConfig).then((response) => {
      setEvaluationAnswerDetails(response.data)
    }).catch((error) => {
      toastError('Erro ao buscar resposta da avaliação', false)
    }).finally(() => {
      setLoading(false)
    }
    )
  }

  async function handlePauseEvaluation(id: string, data: EvaluationAnswer) {
    setLoading(true)
    api.patch(`/evaluation-answare/${id}/pause`,data, headerConfig).then((response) => {
      toastSuccess('Avaliação pausada com sucesso', 5000)
    }).catch((error) => {
      toastError('Erro ao pausar avaliação', false)
    }).finally(() => {
      setLoading(false)
    })
  }

  async function handleCompleteEvaluation(id: string, data: EvaluationAnswer) {
    setLoading(true)
    api.patch(`/evaluation-answare/${id}/complete`,data, headerConfig).then((response) => {
      toastSuccess('Avaliação pausada com sucesso', 5000)
    }).catch((error) => {
      toastError('Erro ao pausar avaliação', false)
    }).finally(() => {
      setLoading(false)
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
      editEvaluation,
      answerEvaluationRequest,
      answerId,
      editAnswerEvaluationRequest,
      getEvaluationAnswerList,
      evaluationAnswerList,
      getEvaluationAnswerById,
      evaluationAnswerDetails,
      handlePauseEvaluation,
      headerConfig,
      getEvaluationAnswerListByUser,
      handleCompleteEvaluation
      }}
    >
      {children}
    </FormsContext.Provider>
  )
}

export const useForms = () => useContext(FormsContext)
