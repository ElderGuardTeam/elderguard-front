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

export default function Evaluations() {

  const {
    evaluations,
    searchEvaluations,
    fetchEvaluation
  } = useForms()

  const {
    user,
  } = useAuth()

  useEffect(() => {
    fetchEvaluation()
  }, [])

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    searchEvaluations(searchTerm)
  }


    
  return (
    <div className=" py-8 px-4 h-screen w-screen">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl text-white flex gap-2 items-center">
          <FontAwesomeIcon icon={faFilePen} className="text-xl" />
          Avaliações
        </h1>
        <Button 
        className="btn btn-circle btn-success btn-lg"
        onClick={() => router.push('/avaliacoes/criar')}
        >
          <FontAwesomeIcon icon={faPlus}/>
        </Button>
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
          name: 'Criado em',
          selector: (row: { created: any }) => row.created,
          sortable: true,
          cell: (row: { created: any }) => formatDate(row.created),
        },
        {
          name: 'Atualizado em',
          selector: (row: { updated: any }) => row.updated,
          sortable: true,
          cell: (row: { updated: any }) => formatDate(row.updated),
        },
        {
          name: '',
          cell: (row: { id: any }) => <Button className="btn btn-sm bg-salmon" onClick={() => router.push(`avaliacoes/${row.id}/validar-identidade`)}>Iniciar</Button>,
        },
      ]}
      data={evaluations}
      onRowClicked={(row:EvaluationList) => user?.userType === 'ADMIN' ? router.push(`/avaliacoes/${row.id}`) : router.push(`/avaliacoes/${row.id}/validar-identidade`)}
      />
    </div>
  );
}