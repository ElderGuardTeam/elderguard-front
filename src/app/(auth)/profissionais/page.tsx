'use client'
import { faPlus, faUserNurse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import DataTableComponent from "@/components/DataTable";
import Input from "@/components/Input";
import FilterDrawer from "@/components/FilterDrawer";
import { useForm } from "react-hook-form";
import FormGroup from "@/components/FormGroup";
import Label from "@/components/Label";
import MaskedInput from "@/components/MaskedInput";

export default function Professionals() {
  const patientData: any = [
    { name: "João da Silva", cpf: "123.456.789-00", email: "joao.silva@email.com" },
    { name: "Maria Oliveira", cpf: "987.654.321-00", email: "maria.oliveira@email.com" },
    { name: "Antônio Souza", cpf: "456.123.789-00", email: "antonio.souza@email.com" },
    { name: "Francisca Almeida", cpf: "789.321.456-00", email: "francisca.almeida@email.com" },
    { name: "Carlos Mendes", cpf: "321.987.654-00", email: "carlos.mendes@email.com" }
  ];
  

  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(patientData);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset
    } = useForm()

    const handleReset = () => {
      reset()
    }

    const removeAccents = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
  
    useEffect(() => {
      if (timeoutId) clearTimeout(timeoutId);
  
      const newTimeoutId = setTimeout(() => {
        if (searchTerm) {
          const normalizedSearch = removeAccents(searchTerm.toLowerCase());
          const filtered = patientData.filter((patient: any) =>
            removeAccents(patient.name.toLowerCase()).includes(normalizedSearch)
          );
          setFilteredData(filtered);
        } else {
          setFilteredData(patientData);
        }
      }, 1000);
  
      setTimeoutId(newTimeoutId);
    }, [searchTerm]);
    
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
        },
        {
          name: 'Email',
          selector: (row: { email: any }) => row.email,
          sortable: true,
        },
      ]}

      data={filteredData}
      />
    </div>
  );
}