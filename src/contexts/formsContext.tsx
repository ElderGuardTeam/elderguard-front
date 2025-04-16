'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { useLoader } from './loaderContext'
import { api } from '@/utils/lib/axios'
import toastError from '@/utils/toast/toastError'
import toastSuccess from '@/utils/toast/toastSuccess'


type FormsContextType = {
  createQuestion: (data: Question) => Promise<void>
  fetchQuestions: () => Promise<void>
  getQuestionById: (id: string) => Promise<void>
  questions: QuestionList[]
  questionDetails: QuestionDetails
}

export const FormsContext = createContext({} as FormsContextType)

export function FormsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [questions, setQuestions] = useState<QuestionList[]>([])
  const [questionDetails, setQuestionDetails] = useState<QuestionDetails>({} as QuestionDetails)

  async function createQuestion(data: Question) {
    api.post('/question', {
      ...data,
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

  return (
    <FormsContext.Provider
      value={{
      createQuestion,
      fetchQuestions,
      questions,
      getQuestionById,
      questionDetails,
      }}
    >
      {children}
    </FormsContext.Provider>
  )
}

export const useForms = () => useContext(FormsContext)
