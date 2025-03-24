'use client'

import Button from "@/components/Button"
import DatePickerFormGroup from "@/components/DatePickerFormGroup"
import FormGroup from "@/components/FormGroup"
import Label from "@/components/Label"
import MaskedInput from "@/components/MaskedInput"
import { useLoader } from "@/contexts/loaderContext"
import toastError from "@/utils/toast/toastError"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form"

export default function CreatePatient() {
  const {setLoading} = useLoader()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    setValue
  } = useForm<User>()

  function autoCompleteAddress(cep: string) {
    setLoading(true);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json()).then(data => {
        setValue('elderly.address.zipCode', data.cep);
        setValue('elderly.address.street', data.logradouro);
        setValue('elderly.address.neighborhood', data.bairro);
        setValue('elderly.address.city', data.localidade);
        setValue('elderly.address.state', data.uf);
        if (data.erro) {
          toastError('CEP não encontrado', 5000);
        }
      })
      .catch(e => toastError('CEP não encontrado', 5000))
      .finally(() => setLoading(false));
  }

  return (
    <div className="p-8 w-full">
      <form className="bg-white rounded p-4">
        <h1>Cadastrar Paciente</h1>
        <fieldset className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4 my-4 text-xs">
          <legend>Dados pessoais</legend>
          <FormGroup
          labelText="Nome"
          isRequired
          />
          <Label labelText="CPF" required className="flex flex-col items-start justify-start font-bold text-sm">
            <MaskedInput
            control={control}
            mask="999.999.999-99"
            name="cpf"
            />
          </Label>
          <DatePickerFormGroup
          control={control}
          labelText="Data de Nascimento"
          name="dateOfBirth"
          isRequired
          />    
          <Label labelText="Telefone" required className="flex flex-col items-start justify-start font-bold text-sm">
            <MaskedInput
            control={control}
            mask="(99) 99999-9999"
            name="phone"
            /> 
          </Label>     
        </fieldset>
        <fieldset className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4 my-4 text-xs">
          <legend>Endereço</legend>
          <Label labelText='CEP' required className="flex flex-col items-start justify-start font-bold text-sm">
            <MaskedInput
            control={control}
            name="elderly.address.zipCode"
            mask={'99999-999'}
            className="input-bordered"
            onBlur={(e) => autoCompleteAddress(e.target.value)}
            />
          </Label>
          <FormGroup
          labelText="Rua"
          isRequired
          inputClass="input-bordered"
          register={register('elderly.address.street')}
          error={errors.elderly?.address?.street?.message}
          />
          <FormGroup
          labelText="Número"
          isRequired
          inputClass="input-bordered"
          register={register('elderly.address.number')}
          error={errors.elderly?.address?.number?.message}
          />
          <FormGroup
          labelText="Complemento"
          inputClass="input-bordered"
          register={register('elderly.address.complement')}
          error={errors.elderly?.address?.complement?.message}
          isRequired
          />
          <FormGroup
          labelText="Bairro"
          isRequired
          inputClass="input-bordered"
          register={register('elderly.address.neighborhood')}
          error={errors.elderly?.address?.neighborhood?.message}
          />
          <FormGroup
          labelText="Cidade"
          isRequired
          inputClass="input-bordered"
          register={register('elderly.address.city')}
          error={errors.elderly?.address?.city?.message}
          />
          <FormGroup
          labelText="Estado"
          isRequired
          inputClass="input-bordered"
          register={register('elderly.address.state')}
          error={errors.elderly?.address?.state?.message}
          />
        </fieldset>
        <fieldset className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4 my-4 text-xs">
          <legend>Contatos</legend>
          <Button className="w-fit btn-success text-white" type="button">
            <FontAwesomeIcon icon={faPlus} className="text-lg"/>
            Novo
          </Button>
        </fieldset>
      </form>
    </div>
  )
}