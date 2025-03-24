'use client'
import { faPersonCane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import DataTableComponent from "@/components/DataTable";
import Input from "@/components/Input";

export default function Patients() {
  const router = useRouter();
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
        placeholder="🔍 Pesquisar..."
        />
        <Button className=" bg-salmon border-none">
          Filtros
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
        },
        {
          name: 'Data de Nascimento',
          selector: (row: { dateOfBirth: any }) => row.dateOfBirth,
          sortable: true,
        },
        {
          name: 'Gênero',
          selector: (row: { sex: any }) => row.sex,
          sortable: true,
        }
      ]}

      data={[
        {
          name: "João da Silva",
          cpf: "123.456.789-00",
          dateOfBirth: "1945-03-12",
          sex: "Masculino"
        },
        {
          name: "Maria Oliveira",
          cpf: "987.654.321-00",
          dateOfBirth: "1938-07-25",
          sex: "Feminino"
        },
        {
          name: "Antônio Souza",
          cpf: "456.123.789-00",
          dateOfBirth: "1942-11-05",
          sex: "Masculino"
        },
        {
          name: "Francisca Almeida",
          cpf: "789.321.456-00",
          dateOfBirth: "1935-06-18",
          sex: "Feminino"
        },
        {
          name: "Carlos Mendes",
          cpf: "321.987.654-00",
          dateOfBirth: "1948-02-09",
          sex: "Masculino"
        }
      ]}
      />
    </div>
  );
}