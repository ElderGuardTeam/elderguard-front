'use client'
import Button from "@/components/Button";
import DatePickerFormGroup from "@/components/DatePickerFormGroup";
import FormError from "@/components/FormError";
import FormGroup from "@/components/FormGroup"
import Label from "@/components/Label"
import MaskedInput from "@/components/MaskedInput";
import Modal from "@/components/Modal";
import SelectFormGroup from "@/components/SelectFormGroup";
import { useLoader } from "@/contexts/loaderContext";
import { educationLevel, socioeconomicStatus } from "@/utils/mocks/elderlyInfo";
import toastError from "@/utils/toast/toastError";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";


interface ICreateElderlyFormProps {
  handleSubmit: UseFormHandleSubmit<Elderly>;
  onSubmit: (data: Elderly) => Promise<void>;
  register: UseFormRegister<Elderly>
  errors: FieldErrors<Elderly>;
  control: any;
  fields: any;
  handleAddContact: () => void;
  handleRemoveContact: (index: number) => void;
  setValue: any;
  isEditing?: boolean;
  elderlyName?: string;
  deleteElderly?: () => Promise<void>;
}

const CreateElderlyForm: React.FC<ICreateElderlyFormProps> = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  control,
  fields,
  handleAddContact,
  handleRemoveContact,
  setValue,
  isEditing,
  elderlyName,
  deleteElderly
}) => {
  const router = useRouter();
  const {setLoading} = useLoader()
  const [isOpen, setIsOpen] = useState(false);
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
        setValue(`${path}.zipCode` as unknown as keyof Elderly, data.cep);
        setValue(`${path}.street` as unknown as keyof Elderly, data.logradouro);
        setValue(`${path}.neighborhood` as unknown as keyof Elderly, data.bairro);
        setValue(`${path}.city` as unknown as keyof Elderly, data.localidade);
        setValue(`${path}.state` as unknown as keyof Elderly, data.uf);
      })
      .catch(() => toastError('CEP não encontrado', 5000))
      .finally(() => setLoading(false));
  }

  return (
    <form className="bg-white rounded p-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="flex gap-2 items-center">
          <div className="h-8 w-8 flex items-center justify-center hover:border-salmon hover:border rounded-full" onClick={() => router.back()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          {
            elderlyName ? `Editar ${elderlyName}` : 'Novo Paciente'
          }
        </h1>
        <fieldset className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4 my-4 text-xs">
          <legend>Dados pessoais</legend>
          <FormGroup
          labelText="Nome"
          isRequired
          register={register('name')}
          error={errors.name?.message}
          />
          <Label 
          hasError={errors.cpf?.message ? true : false}
          labelText="CPF" 
          required 
          className="flex flex-col items-start justify-start font-bold text-sm">
            <MaskedInput
            control={control}
            mask="999.999.999-99"
            name="cpf"
            isDisabled={isEditing}
            />
            {
              errors.cpf && (
                <FormError>{errors.cpf.message}</FormError>
              )
            }
          </Label>
          <DatePickerFormGroup
          control={control}
          labelText="Data de Nascimento"
          name="dateOfBirth"
          isRequired
          error={errors.dateOfBirth?.message}
          /> 
          <FormGroup
          labelText="E-mail"
          isRequired
          register={register('email')}
          error={errors.email?.message}
          />   
          <Label 
          hasError={errors.phone?.message ? true : false}
          labelText="Telefone" 
          required 
          className="flex flex-col items-start justify-start font-bold text-sm">
            <MaskedInput
            control={control}
            mask="(99) 99999-9999"
            name="phone"
            /> 
            {
              errors.phone && (
                <FormError>{errors.phone.message}</FormError>
              )
            }
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
          register={register('sex')}
          error={errors.sex?.message}
          /> 
        </fieldset>
        <fieldset className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4 my-4 text-xs">
          <legend>Endereço</legend>
          <Label 
          hasError={errors.address?.zipCode?.message ? true : false}
          labelText='CEP' 
          required 
          className="flex flex-col items-start justify-start font-bold text-sm">
            <MaskedInput
            control={control}
            name="address.zipCode"
            mask={'99999-999'}
            className="input-bordered"
            onBlur={(e) => autoCompleteAddress(e.target.value, 'address')}
            />
            {
              errors.address?.zipCode && (
                <FormError>{errors.address.zipCode.message}</FormError>
              )
            }
          </Label>
          <FormGroup
          labelText="Rua"
          isRequired
          inputClass="input-bordered"
          register={register('address.street')}
          error={errors.address?.street?.message}
          />
          <FormGroup
          labelText="Número"
          isRequired
          inputClass="input-bordered"
          register={register('address.number')}
          error={errors.address?.number?.message}
          />
          <FormGroup
          labelText="Complemento"
          inputClass="input-bordered"
          register={register('address.complement')}
          error={errors.address?.complement?.message}
          />
          <FormGroup
          labelText="Bairro"
          isRequired
          inputClass="input-bordered"
          register={register('address.neighborhood')}
          error={errors.address?.neighborhood?.message}
          />
          <FormGroup
          labelText="Cidade"
          isRequired
          inputClass="input-bordered"
          register={register('address.city')}
          error={errors.address?.city?.message}
          />
          <FormGroup
          labelText="Estado"
          isRequired
          inputClass="input-bordered"
          register={register('address.state')}
          error={errors.address?.state?.message}
          />
        </fieldset>
        <fieldset className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4  my-4 text-xs">
          <legend>Informações adicionais</legend>
          <div className="grid grid-cols-3 gap-4 col-span-2">
            <FormGroup
            labelText="Peso"
            isRequired
            register={register('weight')}
            error={errors.weight?.message}
            type="number"
            />
            <FormGroup
            labelText="Altura"
            isRequired
            register={register('height')}
            error={errors.height?.message}
            type="number"
            />
            <FormGroup
            labelText="IMC"
            isRequired
            register={register('imc')}
            isDisabled
            error={errors.imc?.message}
            type="number"
            />
          </div>
          <SelectFormGroup
          labelText="Educação"
          isRequired
          options={educationLevel}
          placeholder="Selecione"
          register={register('education')}
          error={errors.education?.message}
          />
          <SelectFormGroup
          labelText="Situação socioeconômica"
          isRequired
          options={socioeconomicStatus}
          placeholder="Selecione"
          register={register('socialeconomic')}
          error={errors.socialeconomic?.message}
          />
        </fieldset>
        <fieldset className="border border-base-300 rounded p-2 gap-4 my-4 text-xs">
          <legend>Contatos</legend>
          <Button className="w-fit btn-success text-white" type="button" onClick={handleAddContact}>
            <FontAwesomeIcon icon={faPlus} className="text-lg"/>
            Novo
          </Button>
          {fields.map((contact: any, index: any) => (
            <div key={contact.id} className="grid grid-cols-3 gap-4 border p-2 mt-2 rounded border-secondary items-end">
              <FormGroup
                labelText="Nome"
                isRequired
                register={register(`contacts.${index}.name`)}
                error={errors?.contacts?.[index]?.name?.message}
              />
              <Label labelText="Telefone" required className="flex flex-col items-start justify-start font-bold text-sm">
                <MaskedInput
                  control={control}
                  mask="(99) 99999-9999"
                  name={`contacts.${index}.phone`}
                />
              </Label>
              <FormGroup
                labelText="E-mail"
                isRequired
                register={register(`contacts.${index}.email`)}
                error={errors?.contacts?.[index]?.email?.message}
              />
              <Label labelText="CPF" required className="flex flex-col items-start justify-start font-bold text-sm">
                <MaskedInput
                  control={control}
                  mask="999.999.999-99"
                  name={`contacts.${index}.cpf`}
                />
              </Label>
              <Label labelText='CEP' required className="flex flex-col items-start justify-start font-bold text-sm">
                <MaskedInput
                control={control}
                name={`contacts.${index}.address.zipCode`}
                mask={'99999-999'}
                className="input-bordered"
                onBlur={(e) => autoCompleteAddress(e.target.value, `contacts.${index}.address`)}
                />
              </Label>
              <FormGroup
                labelText="Rua"
                isRequired
                inputClass="input-bordered"
                register={register(`contacts.${index}.address.street`)}
                error={errors?.contacts?.[index]?.address?.street?.message}
              />
              <FormGroup
                labelText="Número"
                isRequired
                inputClass="input-bordered"
                register={register(`contacts.${index}.address.number`)}
                error={errors?.contacts?.[index]?.address?.number?.message}
              />
              <FormGroup
                labelText="Complemento"
                inputClass="input-bordered"
                register={register(`contacts.${index}.address.complement`)}
                error={errors?.contacts?.[index]?.address?.complement?.message}
              />
              <FormGroup
                labelText="Bairro"
                isRequired
                inputClass="input-bordered"
                register={register(`contacts.${index}.address.neighborhood`)}
                error={errors?.contacts?.[index]?.address?.neighborhood?.message}
              />
              <FormGroup
                labelText="Cidade"
                isRequired
                inputClass="input-bordered"
                register={register(`contacts.${index}.address.city`)}
                error={errors?.contacts?.[index]?.address?.city?.message}
              />
              <FormGroup
                labelText="Estado"
                isRequired
                inputClass="input-bordered"
                register={register(`contacts.${index}.address.state`)}
                error={errors?.contacts?.[index]?.address?.state?.message}
              />
              <Button type="button" onClick={() => handleRemoveContact(index)} className="btn-error text-white">
                Remover
              </Button>
            </div>
          ))}
        </fieldset>
        <div className="flex item-center justify-between">
        <div>
          <Button type="submit" className="btn-success text-white">
            Salvar
          </Button>
          <Button type="button" className="btn-link " onClick={() => router.push('/profissionais')}>
            Cancelar
          </Button>
        </div>
        {
          isEditing && (
            <Button type="button" className="btn-error text-white" onClick={() => setIsOpen(true)}>
              Excluir
            </Button>
          )
        }
        
      </div>
      <Modal 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="w-1/4 "
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg font-bold">Deseja realmente excluir?</h1>
          <p className="text-xs text-center">Essa ação não pode ser desfeita</p>
          <div className="flex gap-2 mt-4">
            <Button type="button" className="btn-error text-white" onClick={deleteElderly}>
              Sim
            </Button>
            <Button type="button" className="btn-link " onClick={() => setIsOpen(false)}>
              Não
            </Button>
          </div>
        </div>
      </Modal>
      </form>
  )
}

export default CreateElderlyForm;