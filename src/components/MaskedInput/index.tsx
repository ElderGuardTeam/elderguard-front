'use client'
import React from 'react'
import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask';

export interface IMaskedInputProps extends React.HTMLProps<HTMLInputElement> {
  name: string
  control: any
  mask: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isDisabled?: boolean
}


const MaskedInput: React.FC<IMaskedInputProps> = ({
  name,
  control,
  mask = '',
  className,
  isDisabled = false,
  onBlur,
}) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputMask
          {...field}
          mask={mask}
          onChange={(e: any) => {
            field.onChange(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            if (onBlur) {
              onBlur(e);
            }
          }}
          disabled={isDisabled}
          className={`input  bg-white  border p-2 rounded-md w-full cursor-pointer ${
            fieldState.error?.message ?
                'border-error'
              :
                'border-light-gray'
          } ${className}`}
        />
      )}
    />
  )
}

export default MaskedInput
