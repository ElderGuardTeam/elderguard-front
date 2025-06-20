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
    professional,
    searchProfessional
  } = useUsers()

  useEffect(() => {
    fetchProfessional()
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
        placeholder="🔍 Pesquisar por nome ou CPF..."
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

        {
          name: 'Tipo',
          selector: (row: { user: any }) => row.user.userType,
          sortable: true,
          cell: (row: { user: { userType: string } }) => {
            switch (row.user.userType) {
              case 'ADMIN':
                return 'Administrador(a)';
              case 'TECH_PROFESSIONAL':
                return 'Profissional Técnico';
              default:
                return 'Usuário';
            }
          }
        },
      ]}
      data={professional}
      onRowClicked={(row:Professional) => router.push(`/profissionais/${row.id}`)}
      />
    </div>
  );
}