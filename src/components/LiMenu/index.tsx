'use client'
import React from 'react'

export interface ILiMenuProps extends React.HTMLProps<HTMLUListElement> {
  children: React.ReactNode
  hasSubMenu?: boolean
  parentName?: string
  parentIcon?: React.ReactNode
}


const LiMenu: React.FC<ILiMenuProps> = ({
  children,
  className = '',
  hasSubMenu = false,
  parentName,
  parentIcon
}) => {

  return (
    <>
    {
      hasSubMenu ? (
        <li  className={`${className}  hover:bg-white/10 rounded-lg text-xs leading-tight`}>
          <details>
            <summary>{parentIcon}{parentName}</summary>
            <ul>
              {children}
            </ul>
          </details>
        </li>
      ) : (
        <li className={`${className} hover:bg-white/10 rounded-lg text-xs leading-tight`}>{children}</li>
      )
    }
    </>
  )
}

export default LiMenu