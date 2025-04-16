'use client'
import { faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import DataTableComponent from "@/components/DataTable";
import Input from "@/components/Input";
import { useUsers } from "@/contexts/usersContext";
import { formatCPF } from "@/utils/formatters/formatCPF";
import { useForms } from "@/contexts/formsContext";
import { formatDate } from "@/utils/formatters/formateDate";

export default function Professionals() {
  const {
    searchProfessional
  } = useUsers()

  const {
    fetchQuestions,
    questions
  } = useForms()

  useEffect(() => {
    fetchQuestions()
  }, [])

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    searchProfessional(searchTerm)
  }


    
  return (
    <div className=" py-8 px-4 h-screen w-screen">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl text-white flex gap-2 items-center">
          <FontAwesomeIcon icon={faQuestion} className="text-xl" />
          Questões
        </h1>
        <Button 
        className="btn btn-circle btn-success btn-lg"
        onClick={() => router.push('/questoes/criar')}
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
              {row.description.length > 40 ? `${row.description.substring(0, 40)}...` : row.description}
            </p>
          )
        },
        {
          name: 'Tipo',
          selector: (row: { type: any }) => row.type,
          sortable: true,
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
      ]}
      data={questions}
      onRowClicked={(row:Professional) => router.push(`/questoes/${row.id}`)}
      />
    </div>
  );
}