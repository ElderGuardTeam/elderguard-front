'use client'
import { faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import DataTableComponent from "@/components/DataTable";
import Input from "@/components/Input";
import { useForms } from "@/contexts/formsContext";
import { formatDate } from "@/utils/formatters/formateDate";
import { stripHtmlTags } from "@/utils/functions/removeHTMLTags";

export default function Questions() {

  const {
    fetchQuestions,
    questions,
    searchQuestions
  } = useForms()

  useEffect(() => {
    fetchQuestions()
  }, [])

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    searchQuestions(searchTerm)
  }


    
  return (
    <div className=" py-8 px-4 min-h-screen w-screen">
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
          name: 'Enunciado',
          selector: (row: { title: any }) => row.title,
          sortable: true,
          cell: (row:{ title: any }) => (
            <p>
              {row.title.length > 60 ? `${row.title.substring(0, 60)}...` : row.title}
            </p>
          )
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
          width: '150px',
        },
        {
          name: 'Criado em',
          selector: (row: { created: any }) => row.created,
          sortable: true,
          cell: (row: { created: any }) => formatDate(row.created),
          width: '150px',
        },
        {
          name: 'Atualizado em',
          selector: (row: { updated: any }) => row.updated,
          sortable: true,
          cell: (row: { updated: any }) => formatDate(row.updated),
          width: '150px',
        },
      ]}
      data={questions}
      onRowClicked={(row:Professional) => router.push(`/questoes/${row.id}`)}
      />
    </div>
  );
}