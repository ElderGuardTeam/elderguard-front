import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup"
import Label from "@/components/Label";
import MaskedInput from "@/components/MaskedInput";
import Modal from "@/components/Modal";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface ICreateProfessionalFormProps {
  handleSubmit: UseFormHandleSubmit<Professional>;
  onSubmit: (data: Professional) => Promise<void>;
  register: UseFormRegister<Professional>
  errors: FieldErrors<Professional>;
  control: any;
  isEditing?: boolean;
  professionalName?: string;
  deleteProfessional?: () => Promise<void>;
}

const CreateProfessional: React.FC<ICreateProfessionalFormProps> = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  control,
  isEditing,
  professionalName,
  deleteProfessional
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <form className="bg-white rounded p-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="flex gap-2 items-center">
        <div className="h-8 w-8 flex items-center justify-center hover:border-salmon hover:border rounded-full" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        {
            professionalName ? `Editar ${professionalName}` : 'Novo Profissional'
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
        <Label labelText="CPF" required className="flex flex-col items-start justify-start font-bold text-sm">
          <MaskedInput
          control={control}
          mask="999.999.999-99"
          name="cpf"
          isDisabled={isEditing}
          />
          {
            errors.cpf && <span className="text-xs text-red-500">{errors.cpf.message}</span>
          }
        </Label> 
        <FormGroup
        labelText="Email"
        isRequired
        register={register('email')}
        error={errors.email?.message}
        />
        <Label labelText="Telefone" required className="flex flex-col items-start justify-start font-bold text-sm">
          <MaskedInput
          control={control}
          mask="(99) 99999-9999"
          name="phone"
          /> 
          {
            errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>
          }
        </Label>
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
            <Button type="button" className="btn-error text-white" onClick={deleteProfessional}>
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

export default CreateProfessional;