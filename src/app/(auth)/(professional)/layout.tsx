'use client'

import Alert from "@/components/Alert"
import { useAuth } from "@/contexts/authContext"
import { faBan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ProfessionalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const {
    user,
  } = useAuth()

  if (!user || user.userType === 'USER') {
    return (
      <div className="h-screen p-8 w-full">
        <Alert 
        className="alert alert-error shadow-lg "
        icon={
          <FontAwesomeIcon icon={faBan}/>
        }
        message="Você não tem permissão para acessar esta página"
        />

      </div>
    )
  }
  return (
    <>
      {children}
    </>
  )
}