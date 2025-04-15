import { UseFormRegister } from "react-hook-form"
import FormError from "../FormError"
import Label from "../Label"
import TextArea from "../TextArea";
import { IFormGroupProps } from "../FormGroup";

const TextAreaFormGroup: React.FC<IFormGroupProps> = ({ type='text', inputClass='', labelText, error='', isRequired=false, register, isPassword=false, className='', isDisabled=false, tooltipText='', tooltipContent='', readonly = false }) => {
  return (
    <Label tooltipText={ tooltipText } tooltipContent={ tooltipContent } required={ isRequired } className={`flex flex-col items-start justify-start font-bold text-sm ${ className }`} hasError={ Boolean(error) } labelText={ labelText }>
      <TextArea disabled={ isDisabled } readOnly={readonly} type={ type } register={ register } hasError={ Boolean(error) } isPassword={ isPassword } className={ inputClass } />
      { error && 
        <FormError>
          {error}
        </FormError>
      }
    </Label>
  )
}


export default TextAreaFormGroup
