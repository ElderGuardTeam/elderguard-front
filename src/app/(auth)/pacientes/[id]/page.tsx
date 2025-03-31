'use client'

import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import CreateElderlySchema from "@/utils/schema/createElderlySchema"
import { useUsers } from "@/contexts/usersContext"
import CreateElderlyForm from "@/components/Forms/CreateElderly"

export default function EditPatient({params}: {params: {id: string}}) {

  const {
    createElderly,
    getElderlyById,
    elderlyInfo
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

  useEffect(() => {
    getElderlyById(params.id);
  }, [params.id]);

  useEffect(() => {
    if (elderlyInfo) {
      setValue("name", elderlyInfo.name);
      setValue("cpf", elderlyInfo.cpf);
      setValue("address", elderlyInfo.address);
      setValue("weight", elderlyInfo.weight?.toString());
      setValue("height", elderlyInfo.height?.toString());
      setValue("imc", elderlyInfo.imc?.toString());
      setValue("phone", elderlyInfo.phone);
      setValue("dateOfBirth", new Date(elderlyInfo.dateOfBirth));
      setValue("sex", elderlyInfo.sex);
  
      if (elderlyInfo.contacts && elderlyInfo.contacts.length > 0) {
        remove();
        elderlyInfo.contacts.forEach(contact => append(contact.contact));
      }
    }
  }, [elderlyInfo]);

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
    createElderly({
      ...data,
      weight: Number(data.weight),
      height: Number(data.height),
      imc: Number(data.imc),
    });
  }
  console.log(errors);

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
      isEditing
      elderlyName={elderlyInfo?.name}
      />
    </div>
  )
}