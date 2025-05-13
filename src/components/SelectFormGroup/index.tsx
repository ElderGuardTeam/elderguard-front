
import { JSX } from "react";
import FormError from "../FormError"
import Label from "../Label"
import Select from "../Select";
import { UseFormRegister } from "react-hook-form";

export interface ISelectFormGroupProps {
  labelText: string;
  error?: string;
  isRequired?: boolean;
  className?: string;
  inputClass?: string;
  isDisabled?: boolean;
  tooltipText?: string;
  tooltipContent?: string | JSX.Element;
  register?: ReturnType<UseFormRegister<any>>;
  options: any[];
  placeholder: string;
}

const SelectFormGroup: React.FC<ISelectFormGroupProps> = ({ 
  inputClass='', 
  labelText,
  error='', 
  isRequired=false, 
  className='', 
  isDisabled=false, 
  tooltipText='', 
  tooltipContent='',
  register,
  options,
  placeholder,
}) => {
  return (
    <Label tooltipText={ tooltipText } tooltipContent={ tooltipContent } required={ isRequired } className={`flex flex-col items-start justify-start font-bold text-sm ${ className }`} hasError={ Boolean(error) } labelText={ labelText }>
      <Select options={options} placeholder={placeholder} register={register} className={inputClass} disabled={isDisabled} hasError={Boolean(error)}/>
      { error && 
        <FormError>
          {error}
        </FormError>
      }
    </Label>
  )
}


export default SelectFormGroup
