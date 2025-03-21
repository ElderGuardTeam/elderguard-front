'use client'
import React, { JSX } from 'react'


export interface ILabelProps extends React.HTMLProps<HTMLLabelElement> {
  children?: React.ReactNode;
  labelText: string;
  hasError?: boolean;
  tooltipText?: string;
  tooltipContent?: string | JSX.Element;
}

const Label: React.FC<ILabelProps> = ({
  children,
  required,
  className,
  labelText,
  tooltipText='',
  tooltipContent='',
  hasError=false,
  ...rest
}) => {
  return (
    <label 
      className={className ? `${className} cursor-pointer label px-0`  : 'flex flex-col items-start justify-start font-bold text-sm text-black'}
      {...rest}
    >
      <span className={`${hasError ? 'text-error' : 'text-normal'} flex gap-2 content-center items-center`}>
        { labelText } { required && <span className='text-error text-lg'>*</span> } 
        </span>
      {children}
    </label>
  )
}

export default Label
