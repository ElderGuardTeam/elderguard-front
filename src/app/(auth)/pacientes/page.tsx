'use client'
import { faPersonCane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import DataTableComponent from "@/components/DataTable";
import Input from "@/components/Input";
import { useUsers } from "@/contexts/usersContext";
import { formatCPF } from "@/utils/formatters/formatCPF";
import { formatDate } from "@/utils/formatters/formateDate";

export default function Patients() {
  const {
    elderly,
    fetchElderly,
    searchElderly
  } = useUsers()

  useEffect(() => {
    fetchElderly()
  }, [])

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    searchElderly(searchTerm)
  }
  return (
    <div className=" py-8 px-4 h-screen w-screen">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl text-white flex gap-2 items-center">
          <FontAwesomeIcon icon={faPersonCane} className="text-2xl" />
          Pacientes
        </h1>
        <Button 
        className="btn btn-circle btn-success btn-lg"
        onClick={() => router.push('/pacientes/criar')}
        >
          <FontAwesomeIcon icon={faPlus}/>
        </Button>
      </div>
      <div className="flex items-baseline gap-2 mb-6">
        <Input
        className="mt-4"
        placeholder="🔍 Pesquisar por nome ou CPF..."
        value={searchTerm}
        onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
        />
        <Button className=" bg-salmon border-none" onClick={handleSearch}>
          Pesquisar
        </Button>
      </div>
      <DataTableComponent
      columns={[
        {
          name: 'Nome',
          selector: (row: { name: any }) => row.name,
          sortable: true,
        },
        {
          name: 'CPF',
          selector: (row: { cpf: any }) => row.cpf,
          sortable: true,
          cell: (row: { cpf: any }) => formatCPF(row.cpf)
        },
        {
          name: 'Data de Nascimento',
          selector: (row: { dateOfBirth: any }) => row.dateOfBirth,
          sortable: true,
          cell: (row: { dateOfBirth: any }) => formatDate(row.dateOfBirth)
        },
        {
          name: 'Gênero',
          selector: (row: { sex: any }) => row.sex,
          sortable: true,
          cell: (row: { sex: any }) => row.sex === 'M' ? 'Masculino' : 'Feminino'
        }
      ]}
      data={elderly}
      onRowClicked={(row: Elderly) => router.push(`/pacientes/${row.id}`)}
      />
    </div>
  );
}