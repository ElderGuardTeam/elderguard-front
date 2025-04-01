'use client'
import { faPlus, faUserNurse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import DataTableComponent from "@/components/DataTable";
import Input from "@/components/Input";
import { useUsers } from "@/contexts/usersContext";
import { formatCPF } from "@/utils/formatters/formatCPF";

export default function Professionals() {
  const {
    fetchProfessional,
    professional
  } = useUsers()

  useEffect(() => {
    fetchProfessional()
  }, [])

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");


    
  return (
    <div className=" py-8 px-4 h-screen w-screen">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl text-white flex gap-2 items-center">
          <FontAwesomeIcon icon={faUserNurse} className="text-xl" />
          Profissionais
        </h1>
        <Button 
        className="btn btn-circle btn-success btn-lg"
        onClick={() => router.push('/profissionais/criar')}
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
        <Button className=" bg-salmon border-none">
          Filtrar
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
          name: 'Email',
          selector: (row: { email: any }) => row.email,
          sortable: true,
        },
      ]}

      data={professional}
      />
    </div>
  );
}