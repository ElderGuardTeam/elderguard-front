
import React from 'react'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode
  isLoading?: boolean
}

const Button: React.FC<IButtonProps> = ({
  children,
  className,
  isLoading: propIsLoading,
  ...rest
}) => {

  return (
    <button
      className={`btn disabled:cursor-not-allowed ${
          className ? className : 'btn-accent '
      }`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
