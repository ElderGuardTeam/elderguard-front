'use client'
import { faFilePen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import DataTableComponent from "@/components/DataTable";
import Input from "@/components/Input";
import { useForms } from "@/contexts/formsContext";
import { formatDate } from "@/utils/formatters/formateDate";
import { useAuth } from "@/contexts/authContext";
import { setEvaluationStatus } from "@/utils/functions/setEvaluationStatus";
import { formatCPF } from "@/utils/formatters/formatCPF";

export default function EvaluationsHistory() {

  const {
    searchEvaluations,
    getEvaluationAnswerList,
    evaluationAnswerList
  } = useForms()

  const {
    user,
  } = useAuth()

  useEffect(() => {
    getEvaluationAnswerList()
  }, [])

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    searchEvaluations(searchTerm)
  }

  const handleContinueEvaluation = (evaluationId: string, elderlyId: string, answerId: string) => {
    if (!user || !elderlyId) {
      router.push(`/avaliacoes/${evaluationId}/validar-identidade`);
      return;
    }

    router.push(`/avaliacoes/${evaluationId}/responder?elderlyId=${elderlyId}&answerId=${answerId}`);
  }

    
  return (
    <div className=" py-8 px-4 h-screen w-screen">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl text-white flex gap-2 items-center">
          <FontAwesomeIcon icon={faFilePen} className="text-xl" />
          Histórico de Avaliações
        </h1>
      </div>
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
          selector: (row: { evaluation: any }) => row.evaluation.title,
          sortable: true,
        },
        {
          name: 'Paciente',
          selector: (row: { formAnswares: any }) => row.formAnswares[0]?.idoso?.cpf || 'N/A',
          sortable: true,
          cell: (row: { formAnswares: any }) => formatCPF(row.formAnswares[0]?.idoso?.cpf),
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
          cell: (row: { updated: any }) => formatDate(row.updated),
        },
      ]}
      data={evaluationAnswerList}
      onRowClicked={(row:EvaluationAnswerList) => handleContinueEvaluation(row.evaluation.id, row.formAnswares[0]?.idoso?.id, row.id)}
      />
    </div>
  );
}