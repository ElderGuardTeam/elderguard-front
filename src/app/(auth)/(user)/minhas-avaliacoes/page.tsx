'use client'

import Button from "@/components/Button"
import DataTableComponent from "@/components/DataTable"
import { useForms } from "@/contexts/formsContext"
import { formatCPF } from "@/utils/formatters/formatCPF"
import { formatDate } from "@/utils/formatters/formateDate"
import { setEvaluationStatus } from "@/utils/functions/setEvaluationStatus"
import { parseCookies } from "nookies"
import { useEffect } from "react"

export default function MinhasAvaliacoesPage() {
  const {
    getEvaluationAnswerListByUser,
    evaluationAnswerList,
  } = useForms()

  const { 'elderguard.userId': userId } = parseCookies()

  useEffect(() => {
    getEvaluationAnswerListByUser(userId)
  }, [])
  
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="bg-base-200 flex flex-col items-start justify-center px-10 py-10 text-center rounded-lg w-2/3">
        <h1 className="text-2xl font-bold text-salmon mb-2">Minhas Avaliações</h1>
        <p className="text-black/50 mb-2">Veja o histórico de todas as suas avaliações.</p>
        <div className="w-full">
        <DataTableComponent
        columns={[
          {
            name: 'Título',
            selector: (row: { evaluation: any }) => row.evaluation.title,
            sortable: true,
          },
          {
            name: 'Status',
            selector: (row: { status: any }) => row.status,
            sortable: true,
            cell: (row: { status: any }) => setEvaluationStatus(row.status),
          },
          {
            name: 'Atualizado em',
            selector: (row: { updated: any }) => row.updated,
            sortable: true,
            width: '150px',
            cell: (row: { updated: any }) => formatDate(row.updated),
          },
          {
            name: '',
            width: '150px',
            cell: (row: { evaluation: any, elderly: any, id: any }) => {
              return (
                <Button
                  className="btn btn-primary btn-sm"
                  onClick={() => window.location.href = `/minhas-avaliacoes/${row.evaluation.id}/responder?elderlyId=${row.elderly?.id}&answerId=${row.id}`}
                >
                  Ver resultado
                </Button>
              )
            }
          }
        ]}
        data={evaluationAnswerList}
        />
      </div>
      </div>
    </div>
  )
}