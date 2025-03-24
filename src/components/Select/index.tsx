'use client'
import { UseFormRegister } from 'react-hook-form';
import React from 'react';

export interface InputProps extends React.HTMLProps<HTMLSelectElement> {
  options: Option[] ;
  register?: ReturnType<UseFormRegister<any>>;
  hasError?: boolean;
}

const Select: React.FC<InputProps> = ({
  options,
  className,
  placeholder='Selecione',
  hasError=false,
  register,
  ...rest
}) => {
  return (
    <select
      {...rest}
      {...register}
      className={`select bg-white border rounded-md w-full cursor-pointer ${className} ${hasError? 'border-error' : 'border-light-gray'}`}
      defaultValue=''
    >
      <option disabled value=''>{placeholder}</option>
      {options.map((option, key) => (
          <option value={option.value ? option.value : option.id} key={key}>
            {option.name}
          </option>
        ))
      }
    </select>
  )
}

export default Select
