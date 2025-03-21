import { UseFormRegister } from "react-hook-form"
import FormError from "../FormError"
import Input from "../Input"
import Label from "../Label"
import { JSX } from "react";

export interface IFormGroupProps {
  labelText: string;
  error?: string;
  isRequired?: boolean;
  register?: ReturnType<UseFormRegister<any>>;
  isPassword?: boolean;
  className?: string;
  inputClass?: string;
  isDisabled?: boolean;
  tooltipText?: string;
  tooltipContent?: string | JSX.Element;
  type?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  readonly?: boolean;
}

const FormGroup: React.FC<IFormGroupProps> = ({ type='text', inputClass='', labelText, error='', isRequired=false, register, isPassword=false, className='', isDisabled=false, tooltipText='', tooltipContent='', onBlur, readonly=false }) => {
  return (
    <Label tooltipText={ tooltipText } tooltipContent={ tooltipContent } required={ isRequired } className={`flex flex-col items-start justify-start font-bold text-sm ${ className }`} hasError={ Boolean(error) } labelText={ labelText }>
      <Input disabled={ isDisabled } type={ type } register={ register } hasError={ Boolean(error) } isPassword={ isPassword } className={ inputClass } onBlur={onBlur} readOnly={readonly} />
      { error && 
        <FormError>
          {error}
        </FormError>
      }
    </Label>
  )
}


export default FormGroup
