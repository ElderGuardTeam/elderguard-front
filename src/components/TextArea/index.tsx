'use client'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Controller, UseFormRegister } from 'react-hook-form'

export interface InputProps extends React.HTMLProps<HTMLTextAreaElement> {
  hasError?: boolean
  className?: string
  placeholder?: string
  isPassword?: boolean
  register?: ReturnType<UseFormRegister<any>>
}

const TextArea: React.FC<InputProps> = ({
  className = '',
  placeholder,
  isPassword,
  hasError = false,
  register,
  ...rest
}) => {
  return (
    <div className='flex relative items-center w-full'>
      <textarea {...rest} {...register} placeholder={placeholder} className={`input bg-white border  p-2 rounded-md w-full cursor-pointer ${
        hasError ?
            'border-error'
          :
            'border-light-gray'
        } ${className}`} 
      />
    </div>
  )
}

export default TextArea
