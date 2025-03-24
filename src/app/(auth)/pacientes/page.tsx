'use client'
import { faPersonCane, faPlus } from "@fortawesome/free-solid-svg-icons";
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
import DatePickerFormGroup from "@/components/DatePickerFormGroup";
import SelectFormGroup from "@/components/SelectFormGroup";

export default function Patients() {
  const patientData: any = [
    { name: "João da Silva", cpf: "123.456.789-00", dateOfBirth: "1945-03-12", sex: "Masculino" },
    { name: "Maria Oliveira", cpf: "987.654.321-00", dateOfBirth: "1938-07-25", sex: "Feminino" },
    { name: "Antônio Souza", cpf: "456.123.789-00", dateOfBirth: "1942-11-05", sex: "Masculino" },
    { name: "Francisca Almeida", cpf: "789.321.456-00", dateOfBirth: "1935-06-18", sex: "Feminino" },
    { name: "Carlos Mendes", cpf: "321.987.654-00", dateOfBirth: "1948-02-09", sex: "Masculino" }
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
        value={searchTerm}
        onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
        />
        <Button className=" bg-salmon border-none" onClick={() => setIsFilterOpen(true)}>
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

      data={filteredData}
      />
      <FilterDrawer
      visibleRight={isFilterOpen}
      setVisibleRight={setIsFilterOpen}
      handleSubmit={handleSubmit}
      handleData={(data) => console.log(data)}
      handleReset={handleReset}
      >
        <FormGroup
        labelText="Nome"
        />
        <Label labelText="CPF" className="flex flex-col items-start justify-start font-bold text-sm">
          <MaskedInput
            control={control}
            mask="999.999.999-99"
            name={`cpf`}
          />
        </Label>
        <DatePickerFormGroup
        control={control}
        labelText="Data de Nascimento"
        name="dateOfBirth"
        />  
        <SelectFormGroup
        labelText="Gênero"
        options={[
          {id: 'M', name: 'Masculino'},
          {id: 'F', name: 'Feminino'},
          {id: 'O', name: 'Outro'}
        ]}
        placeholder="Selecione..."
        register={register('sexo')}
        />  
      </FilterDrawer>
    </div>
  );
}