'use client'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { UseFormRegister } from 'react-hook-form';

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  hasError?: boolean
  className?: string
  placeholder?: string
  isPassword?: boolean
  register?: ReturnType<UseFormRegister<any>>
}


const Input: React.FC<InputProps> = ({
  className = '',
  placeholder,
  isPassword,
  hasError = false,
  register,
  type,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(isPassword)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='flex relative items-center w-full text-black'>
      <input step="0.01" {...rest} type={!showPassword ? type : 'password'}  {...register} placeholder={placeholder} className={`input  bg-white  border p-2 rounded-md w-full cursor-pointer ${
        hasError ?
            'border-error'
          :
            'border-light-gray'
        } ${className}`} 
      />
      { isPassword ? (
        showPassword ?
          <FontAwesomeIcon icon={faEye} className='ml-[-30px] absolute right-[10px] text-lg cursor-pointer' onClick={ handleShowPassword } />
        :
          <FontAwesomeIcon icon={faEyeSlash} className='ml-[-30px] absolute right-[10px] text-lg cursor-pointer' onClick={ handleShowPassword } />
      ) : (
        null
      )}
    </div>
  )
}

export default Input
