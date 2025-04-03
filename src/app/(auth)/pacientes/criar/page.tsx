'use client'


import { useLoader } from "@/contexts/loaderContext"
import toastError from "@/utils/toast/toastError"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import CreateElderlySchema from "@/utils/schema/createElderlySchema"
import { useUsers } from "@/contexts/usersContext"
import CreateElderlyForm from "@/components/Forms/CreateElderly"
import { validateCPF } from 'validations-br'

export default function CreatePatient() {

  const {
    createElderly
  } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    setValue,
    watch
  } = useForm<Elderly>({
    resolver: zodResolver(CreateElderlySchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts" 
  });

  const weight = watch('weight');
  const height = watch('height');

  useEffect(() => {
    handleIMC();
  }, [weight, height]);

  const handleAddContact = () => {
    append({ 
      name: '', 
      phone: '',
      email: '',
      cpf: '',
      address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      }
    });
  };
  const handleIMC = () => {
    if (!weight || !height) return;
    const imc = Number(weight)/ (Number(height) * Number(height));
    setValue('imc', imc.toFixed(2).toString());
  }
  const handleRemoveContact = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: Elderly) => {
    if (!data.contacts.length) {
      toastError('Adicione pelo menos um contato', 5000);
      return;
    }
    if (!validateCPF(data.cpf)) {
      toastError('CPF do paciente inválido', 5000);
      return;
    } 
    if (!data.contacts.every(contact => validateCPF(contact.cpf))) {
      toastError('CPF de um ou mais contatos inválido', 5000);
      return;
    }
    createElderly({
      ...data,
      weight: Number(data.weight),
      height: Number(data.height),
      imc: Number(data.imc),
    });
  }

  return (
    <div className="p-8 w-full">
      <CreateElderlyForm
      control={control}
      errors={errors}
      fields={fields}
      handleAddContact={handleAddContact}
      handleRemoveContact={handleRemoveContact}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      setValue={setValue}
      />
    </div>
  )
}