import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup"
import Input from "@/components/Input";
import Select from "@/components/Select";
import SelectFormGroup from "@/components/SelectFormGroup";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormRegister, UseFormReset, UseFormSetValue } from "react-hook-form";

interface ICreateRuleSectionFormProps {
  register: UseFormRegister<Form>
  errors: any;
  watch: any;
  index?: number
  handleRemoveRule: (sectionId: number) => void
  isEditing?: boolean
}

const CreateRuleSection: React.FC<ICreateRuleSectionFormProps> = ({
  register,
  errors,
  watch,
  index = 0,
  handleRemoveRule,
  isEditing = false
}) => {

  const watchValue1Type = watch(`seccions.${index}.rule.value1Type`)
  const watchValue2Type = watch(`seccions.${index}.rule.value2Type`)

  const watchRuleType = watch(`seccions.${index}.rule.type`);


  
  return (
    <fieldset className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4 my-4 text-xs">
      <legend>Regra</legend>
      <SelectFormGroup
      labelText="Tipo"
      options={[
        {value: 'CONDITIONAL', name: 'Condicional'},
        {value: 'ARITHMETIC', name: 'Operação matemática'},
        {value: 'SUM', name: 'Pontuação máxima'},
        {value: 'PRORATE', name: 'Média ponderada'},
      ]}
      register={register(`seccions.${index}.rule.type`)}
      placeholder="Selecione"
      className="col-span-2"
      />
      {
        watchRuleType === 'PRORATE' && (
          <FormGroup
          labelText="Peso"
          isRequired
          register={register(`seccions.${index}.rule.totalItems`)}
          error={errors.totalItems?.message}
          className="col-span-2"
          />
        )
      }
      {
        watchRuleType === 'SUM' && (
          <FormGroup
          labelText="Pontuação máxima"
          isRequired
          register={register(`seccions.${index}.rule.maxScore`)}
          error={errors.maxScore?.message}
          className="col-span-2"
          />
        )
      }
      {
        watchRuleType === 'CONDITIONAL' && (
          <div className="col-span-2 grid grid-cols-6 items-center text-sm gap-2 text-center">
            <span>Se a pontuação for </span>
            <Select
            options={[
              {value: '>', name: 'Maior que'},
              {value: '<', name: 'Menor que'},
              {value: '=', name: 'Igual a'},
            ]}
            register={register(`seccions.${index}.rule.condition`)}
            />
            <Input
            register={register(`seccions.${index}.rule.value1`)}
            />
            <span>então</span>
            <Select
            options={[
              {value: '+', name: 'somar'},
              {value: '-', name: 'subtrair'},
              {value: '*', name: 'multiplicar por'},
              {value: '/', name: 'subtrair por'},
            ]}
            register={register(`seccions.${index}.rule.operation`)}
            />
            <Input
            register={register(`seccions.${index}.rule.value2`)}
            />
          </div>
        )
      }
      {
        watchRuleType === 'ARITHMETIC' && (
        <>
          <div className="col-span-2 grid grid-cols-3 items-end gap-2">
              <div className={`${ watchValue1Type === 'value' && 'flex items-end gap-1'}`}>
                <SelectFormGroup
                labelText="Valor 1"
                options={[
                  { value: 'score', name: 'Pontuação' },
                  { value: 'value', name: 'Inserir valor' },
                ]}
                register={register(`seccions.${index}.rule.value1Type`)}
                placeholder="Selecione"
                className={`${ watchValue1Type === 'value' && 'w-1/2'}`}
                />
                {
                  watchValue1Type === 'value' && (
                    <Input
                      placeholder="Digite o valor"
                      register={register(`seccions.${index}.rule.value1`)}
                      className="w-1/2"
                    />
                  )
                }
              </div>
              <Select
                options={[
                  { value: '+', name: '+' },
                  { value: '-', name: '-' },
                  { value: '*', name: '*' },
                  { value: '/', name: '/' },
                ]}
                register={register(`seccions.${index}.rule.operation`)}
              />

              <div className={`${ watchValue2Type === 'value' && 'flex items-end gap-1'}`}>
              <SelectFormGroup
                labelText="Valor 2"
                options={[
                  { value: 'score', name: 'Pontuação' },
                  { value: 'value', name: 'Inserir valor' },
                ]}
                register={register(`seccions.${index}.rule.value2Type`)}
                placeholder="Selecione"
                className={`${ watchValue2Type  === 'value' && 'w-1/2'}`}
                />
                {
                  watchValue2Type === 'value' && (
                    <Input
                      placeholder="Digite o valor"
                      register={register(`seccions.${index}.rule.value2`)}
                      className="w-1/2"
                    />
                  )
                }
              </div>
            </div>
        </>
        )
        }
        {
          !isEditing && (
            <Button
              type="button"
              className="btn-error w-fit text-white mt-2"
              onClick={() => handleRemoveRule(index)}
            >
              Remover Regra
            </Button>
          )}
      
    </fieldset>
  )
}

export default CreateRuleSection;