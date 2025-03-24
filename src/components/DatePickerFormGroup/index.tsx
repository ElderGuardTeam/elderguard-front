
import FormError from "../FormError"
import Label from "../Label"
import DatePicker from "../DatePicker";
import { JSX } from "react";

export interface IDatePickerFormGroupProps {
  labelText: string;
  error?: string;
  isRequired?: boolean;
  className?: string;
  inputClass?: string;
  isDisabled?: boolean;
  tooltipText?: string;
  tooltipContent?: string | JSX.Element;
  control: any;
  name: string;
}

const DatePickerFormGroup: React.FC<IDatePickerFormGroupProps> = ({ 
  inputClass='', 
  labelText,
  error='', 
  isRequired=false, 
  className='', 
  isDisabled=false, 
  tooltipText='', 
  tooltipContent='',
  control,
  name,
}) => {
  return (
    <Label tooltipText={ tooltipText } tooltipContent={ tooltipContent } required={ isRequired } className={`flex flex-col items-start justify-start font-bold text-sm ${ className }`} hasError={ Boolean(error) } labelText={ labelText }>
      <DatePicker control={control} name={name} disabled={ isDisabled }  className={ inputClass } hasError={ Boolean(error) }/>
      { error && 
        <FormError>
          {error}
        </FormError>
      }
    </Label>
  )
}


export default DatePickerFormGroup
