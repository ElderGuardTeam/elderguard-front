'use client'
import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowRightFromBracket, 
  faFileLines, 
  faFilePen, 
  faPersonCane, 
  faQuestion, 
  faUserNurse,
  faWrench
} from '@fortawesome/free-solid-svg-icons'

import Aside from '../Aside'
import UlMenu from '../UlMenu'
import LiMenu from '../LiMenu'
import Link from 'next/link'
import Avatar from '../Avatar'
import { useAuth } from '@/contexts/authContext'
import { getFirstLetters } from '@/utils/functions/getFirstLetters'

const Sidebar: React.FC = () => {
  const {
    signOut,
    user,
  } = useAuth()


  if (user?.userType === 'USER') return

  return (
    <Aside 
      className={`z-50 h-screen bg-accent sticky top-0 w-full min-w-[200px] max-w-[200px] overflow-y-scroll overflow-x-hidden flex flex-col justify-between`}
      >
        <UlMenu className={`space-y-2 bg-accent [&_a]:!text-white  text-white w-full`}>
          <div className="flex items-center justify-center w-full p-4 sticky top-0 bg-accent z-50">
            <div className=''> 
              <Image
              src="/images/logo-no-background.png"
              alt="logo ElderGuard"
              width={50}
              height={50}/>
            </div>
          </div>
          <LiMenu>
            <Link className="flex items-center gap-3" href="/pacientes">
              <FontAwesomeIcon icon={faPersonCane} className='text-xl' />
              <span>Pacientes</span>
            </Link>
          </LiMenu> 
          {
            user?.userType === 'ADMIN' && (
              <>
              <LiMenu>
                <Link className="flex items-center gap-3" href="/profissionais">
                  <FontAwesomeIcon icon={faUserNurse} className='text-lg' />
                  <span>Profissionais</span>
                </Link>
              </LiMenu> 
              <LiMenu>
                <Link className="flex items-center gap-3" href="/questoes">
                  <FontAwesomeIcon icon={faQuestion} className='text-lg' />
                  <span>Questões</span>
                </Link>
              </LiMenu> 
              <LiMenu>
                <Link className="flex items-center gap-3" href="/formularios">
                  <FontAwesomeIcon icon={faFileLines} className='text-lg' />
                  <span>Formulários</span>
                </Link>
              </LiMenu> 
            </> 
            )
          } 
          <LiMenu
          hasSubMenu
          parentIcon={<FontAwesomeIcon icon={faFilePen} className='text-lg' />}
          parentName='Avaliações'
          >
            <LiMenu>
              <a href="/avaliacoes" >
                <p>Avaliações</p>
              </a>
            </LiMenu>
            <LiMenu>
              <a href="/avaliacoes/historico">
                <p>Histórico</p>
              </a>
            </LiMenu>
          </LiMenu>      
        </UlMenu>
        <div className='sticky bottom-0 bg-accent'>
        <div className='divider divider-secondary'></div>
        <div className='flex gap-2 px-2 mb-4'>
          <Avatar className="bg-accent text-accent-content dark:bg-base-300 min-w-8 h-8 rounded-full flex text-sm items-center justify-center uppercase">
            {getFirstLetters(user?.name || '')}
          </Avatar>
          <div className='w-full text-white flex flex-col justify-between'>
            <p className="font-bold text-xs ">{user?.name}</p>
            <div className='flex flex-row-reverse items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div 
                className='btn btn-sm btn-circle text-white shadow-none bg-transparent border-transparent hover:border-white hover:bg-transparent'
                onClick={signOut}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Aside>
  )
}

export default Sidebar
