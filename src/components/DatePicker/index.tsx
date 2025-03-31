'use client'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { localeConfig } from '@/utils/localeConfig';
        

export interface IDatePickerProps extends React.HTMLProps<HTMLInputElement> {
  name: string
  control: any
  hasError?: boolean
  hasTimePicker?: boolean
}

const DatePicker: React.FC<IDatePickerProps> = ({
  name,
  control,
  className,
  hasError=false,
  hasTimePicker=false,
  ...rest
}) => {

  addLocale('pt-br',localeConfig);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Calendar 
        {...field}
        disabled={rest.disabled}
        value={field.value} 
        onChange={(e) => {
          field.onChange(e.value)
        }} 
        showIcon
        // yearNavigator
        // yearRange="1920:2025"
        showTime={hasTimePicker}
        locale='pt-br'
        invalid={fieldState.error?.message ? true : false}
        className={`input input-bordered bg-white w-full cursor-pointer ${
          hasError ? ' border-red-500' : 'border-light-gray' 
        }
        `}
        />
      )}
    />
  )
}

export default DatePicker
