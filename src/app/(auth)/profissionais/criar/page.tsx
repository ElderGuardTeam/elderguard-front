'use client'

import Button from "@/components/Button"
import DatePickerFormGroup from "@/components/DatePickerFormGroup"
import FormGroup from "@/components/FormGroup"
import Label from "@/components/Label"
import MaskedInput from "@/components/MaskedInput"
import SelectFormGroup from "@/components/SelectFormGroup"
import { useLoader } from "@/contexts/loaderContext"
import toastError from "@/utils/toast/toastError"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"

export default function CreatePatient() {
  const {setLoading} = useLoader()

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, 
    setValue,
    watch
  } = useForm<User>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "elderly.contacts" 
  });

  const weight = watch('elderly.weight');
  const height = watch('elderly.height');

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

  function autoCompleteAddress(cep: string, path: string) {
    if (!cep) return;
    
    setLoading(true);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        if (data.erro) {
          toastError('CEP não encontrado', 5000);
          return;
        }
        setValue(`${path}.zipCode` as unknown as keyof User, data.cep);
        setValue(`${path}.street` as unknown as keyof User, data.logradouro);
        setValue(`${path}.neighborhood` as unknown as keyof User, data.bairro);
        setValue(`${path}.city` as unknown as keyof User, data.localidade);
        setValue(`${path}.state` as unknown as keyof User, data.uf);
      })
      .catch(() => toastError('CEP não encontrado', 5000))
      .finally(() => setLoading(false));
  }

  const handleIMC = () => {
    if (!weight || !height) return;
    const imc = weight / (height * height);
    setValue('elderly.imc', imc);
  }
  const handleRemoveContact = (index: number) => {
    remove(index);
  };

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
          <SelectFormGroup
          labelText="Sexo"
          isRequired
          options={[
            {id: 'M', name: 'Masculino'},
            {id: 'F', name: 'Feminino'},
            {id: 'O', name: 'Outro'}
          ]}
          placeholder="Selecione"
          register={register('elderly.sex')}
          />
          <FormGroup
          labelText="Senha"
          isRequired
          isPassword
          register={register('password')}
          />   
        </fieldset>
        <fieldset className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4 my-4 text-xs">
          <legend>Endereço</legend>
          <Label labelText='CEP' required className="flex flex-col items-start justify-start font-bold text-sm">
            <MaskedInput
            control={control}
            name="elderly.address.zipCode"
            mask={'99999-999'}
            className="input-bordered"
            onBlur={(e) => autoCompleteAddress(e.target.value, 'elderly.address')}
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
        <fieldset className="border border-base-300 rounded p-2 grid grid-cols-3 gap-4 my-4 text-xs">
          <legend>IMC</legend>
          <FormGroup
          labelText="Peso"
          isRequired
          register={register('elderly.weight')}
          />
          <FormGroup
          labelText="Altura"
          isRequired
          register={register('elderly.height')}
          />
          <FormGroup
          labelText="IMC"
          isRequired
          register={register('elderly.imc')}
          isDisabled
          />
        </fieldset>
        <fieldset className="border border-base-300 rounded p-2 gap-4 my-4 text-xs">
          <legend>Contatos</legend>
          <Button className="w-fit btn-success text-white" type="button" onClick={handleAddContact}>
            <FontAwesomeIcon icon={faPlus} className="text-lg"/>
            Novo
          </Button>
          {fields.map((contact, index) => (
            <div key={contact.id} className="grid grid-cols-3 gap-4 border p-2 mt-2 rounded border-secondary items-end">
              <FormGroup
                labelText="Nome"
                isRequired
                register={register(`elderly.contacts.${index}.name`)}
                error={errors?.elderly?.contacts?.[index]?.name?.message}
              />
              <Label labelText="Telefone" required className="flex flex-col items-start justify-start font-bold text-sm">
                <MaskedInput
                  control={control}
                  mask="(99) 99999-9999"
                  name={`elderly.contacts.${index}.phone`}
                />
              </Label>
              <FormGroup
                labelText="E-mail"
                isRequired
                register={register(`elderly.contacts.${index}.email`)}
                error={errors?.elderly?.contacts?.[index]?.email?.message}
              />
              <Label labelText="CPF" required className="flex flex-col items-start justify-start font-bold text-sm">
                <MaskedInput
                  control={control}
                  mask="999.999.999-99"
                  name={`elderly.contacts.${index}.cpf`}
                />
              </Label>
              <Label labelText='CEP' required className="flex flex-col items-start justify-start font-bold text-sm">
                <MaskedInput
                control={control}
                name="elderly.contacts.${index}.address.zipCode"
                mask={'99999-999'}
                className="input-bordered"
                onBlur={(e) => autoCompleteAddress(e.target.value, `elderly.contacts.${index}.address`)}
                />
              </Label>
              <FormGroup
                labelText="Rua"
                isRequired
                inputClass="input-bordered"
                register={register(`elderly.contacts.${index}.address.street`)}
                error={errors?.elderly?.contacts?.[index]?.address?.street?.message}
              />
              <FormGroup
                labelText="Número"
                isRequired
                inputClass="input-bordered"
                register={register(`elderly.contacts.${index}.address.number`)}
                error={errors?.elderly?.contacts?.[index]?.address?.number?.message}
              />
              <FormGroup
                labelText="Complemento"
                inputClass="input-bordered"
                register={register(`elderly.contacts.${index}.address.complement`)}
                error={errors?.elderly?.contacts?.[index]?.address?.complement?.message}
                isRequired
              />
              <FormGroup
                labelText="Bairro"
                isRequired
                inputClass="input-bordered"
                register={register(`elderly.contacts.${index}.address.neighborhood`)}
                error={errors?.elderly?.contacts?.[index]?.address?.neighborhood?.message}
              />
              <FormGroup
                labelText="Cidade"
                isRequired
                inputClass="input-bordered"
                register={register(`elderly.contacts.${index}.address.city`)}
                error={errors?.elderly?.contacts?.[index]?.address?.city?.message}
              />
              <FormGroup
                labelText="Estado"
                isRequired
                inputClass="input-bordered"
                register={register(`elderly.contacts.${index}.address.state`)}
                error={errors?.elderly?.contacts?.[index]?.address?.state?.message}
              />
              <Button type="button" onClick={() => handleRemoveContact(index)} className="btn-error text-white">
                Remover
              </Button>
            </div>
          ))}
        </fieldset>
        <div>
          <Button type="submit" className="btn-success text-white">
            Salvar
          </Button>
          <Button type="button" className="btn-link " onClick={() => router.push('/pacientes')}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}