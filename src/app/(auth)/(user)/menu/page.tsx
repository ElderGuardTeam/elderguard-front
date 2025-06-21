"use client" 

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from 'next/image'
import { useAuth } from "@/contexts/authContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket, faFilePen } from "@fortawesome/free-solid-svg-icons"

export default function HomePage() {
  const router = useRouter()
  const {
    user,
    signOut
  } = useAuth()


  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 py-10 text-center">
      <div className="bg-base-200 flex flex-col items-center justify-center px-18 py-10 text-center rounded-lg">
        <div className="mb-8">
          <Image
          src="/images/logo-no-background.png"
          alt="logo ElderGuard"
          width={70}
          height={70}/>
        </div>

        <h1 className="text-2xl font-bold text-salmon mb-2">Olá, {user?.name}!</h1>
        <p className="text-base-content mb-8">
          Bem-vindo(a) ao ElderGuard.
        </p>
        <div className="btn btn-primary rounded-lg  py-12 px-12 " onClick={() => router.push('/minhas-avaliacoes')}>
          <FontAwesomeIcon icon={faFilePen}  className="text-4xl text-secondary/75 mr-4"/>
          <div className="text-start">
            <p className="text-xl font-bold">Minhas Avaliações</p>
            <span className="font-light">Visualizar histórico de avaliações</span>
          </div>
        </div>
        <button
          onClick={signOut}
          className="btn btn-ghost mt-8 text-error gap-2"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Sair
        </button>
      </div>
    </div>
  )
}