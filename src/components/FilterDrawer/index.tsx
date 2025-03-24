'use client'
import React from 'react'
import { Sidebar } from 'primereact/sidebar'
import Button from '../Button'
import { UseFormHandleSubmit } from 'react-hook-form'

interface IFilterDrawerProps {
  visibleRight: boolean
  setVisibleRight: (value: boolean) => void
  children: React.ReactNode
  handleSubmit: UseFormHandleSubmit<any>
  handleData: (data: any) => void
  handleReset: () => void
}

const FilterDrawer: React.FC<IFilterDrawerProps> = ({
  visibleRight,
  setVisibleRight,
  children,
  handleSubmit,
  handleData,
  handleReset
}) => {

  return (
    <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} className="bg-white p-4 shadow">
      <h2 className='text-2xl mb-4'>Filtros</h2>
      <form className="space-y-4 px-1" onSubmit={handleSubmit(handleData)}>
        {children}
        <div className='sticky bottom-0 bg-white space-y-2'>
          <Button className="btn-accent w-full" type="submit">Filtrar</Button>
          <Button className="btn-outline w-full" type='button' onClick={handleReset}>Limpar</Button>
        </div>
        
      </form>
  </Sidebar>
  )
}

export default FilterDrawer
