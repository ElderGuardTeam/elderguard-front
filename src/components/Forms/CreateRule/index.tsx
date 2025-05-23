import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup"
import Input from "@/components/Input";
import Select from "@/components/Select";
import SelectFormGroup from "@/components/SelectFormGroup";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormRegister, UseFormReset, UseFormSetValue } from "react-hook-form";

interface ICreateRuleFormProps {
  register: UseFormRegister<any>
  errors: any;
  watch: any;
  setHasRule: Dispatch<SetStateAction<boolean>>
  setValue: UseFormSetValue<any>
}

const CreateRule: React.FC<ICreateRuleFormProps> = ({
  register,
  errors,
  watch,
  setHasRule,
  setValue
}) => {

  const watchRuleType = watch('rule.type');
  const watchValue1Type = watch('rule.value1Type')
  const watchValue2Type = watch('rule.value2Type')

  const handleRemoveRule = () => {
    setHasRule(false)
    setValue('rule', null)
  }

  
  return (
    <fieldset className="border border-base-300 rounded p-2 grid grid-cols-2 gap-4 my-4 text-xs">
      <legend>Regra</legend>
      <SelectFormGroup
      labelText="Tipo"
      options={[
        {value: 'CONDITIONAL', name: 'Condicional'},
        {value: 'ARITHMETIC', name: 'Operação matemática'},
        {value: 'SUM', name: 'Pontuação máxima'},
      ]}
      register={register('rule.type')}
      placeholder="Selecione"
      className="col-span-2"
      />
      {
        watchRuleType === 'SUM' && (
          <FormGroup
          labelText="Pontuação máxima"
          isRequired
          register={register('rule.maxScore')}
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
            register={register('rule.condition')}
            />
            <Input
            register={register('rule.value1')}
            />
            <span>então</span>
            <Select
            options={[
              {value: '+', name: 'somar'},
              {value: '-', name: 'subtrair'},
              {value: '*', name: 'multiplicar por'},
              {value: '/', name: 'subtrair por'},
            ]}
            register={register('rule.operation')}
            />
            <Input
            register={register('rule.value2')}
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
                register={register('rule.value1Type')}
                placeholder="Selecione"
                className={`${ watchValue1Type === 'value' && 'w-1/2'}`}
                />
                {
                  watchValue1Type === 'value' && (
                    <Input
                      placeholder="Digite o valor"
                      register={register('rule.value1')}
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
                register={register('rule.operation')}
              />

              <div className={`${ watchValue2Type === 'value' && 'flex items-end gap-1'}`}>
              <SelectFormGroup
                labelText="Valor 2"
                options={[
                  { value: 'score', name: 'Pontuação' },
                  { value: 'value', name: 'Inserir valor' },
                ]}
                register={register('rule.value2Type')}
                placeholder="Selecione"
                className={`${ watchValue2Type  === 'value' && 'w-1/2'}`}
                />
                {
                  watchValue2Type  === 'value' && (
                    <Input
                      placeholder="Digite o valor"
                      register={register('rule.value2')}
                      className="w-1/2"
                    />
                  )
                }
              </div>
            </div>
        </>
        )
        }
      <Button
        type="button"
        className="btn-error w-fit text-white mt-2"
        onClick={handleRemoveRule}
      >
        Remover Regra
      </Button>
    </fieldset>
  )
}

export default CreateRule;