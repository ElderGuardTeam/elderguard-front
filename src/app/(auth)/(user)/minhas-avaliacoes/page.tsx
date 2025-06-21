'use client'

import { useForms } from "@/contexts/formsContext"
import { useEffect } from "react"

export default function MinhasAvaliacoesPage() {
  const {
    getEvaluationAnswerListByUser
  } = useForms()

  useEffect(() => {
    getEvaluationAnswerListByUser()
  }, [])
  
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="bg-base-200 flex flex-col items-start justify-center px-18 py-10 text-center rounded-lg">
        <h1 className="text-2xl font-bold text-salmon mb-2">Minhas Avaliações</h1>
        <p className="text-gray-600">Veja o histórico de todas as suas avaliações.</p>
      </div>
    </div>
  )
}