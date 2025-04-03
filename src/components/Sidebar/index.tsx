'use client'
import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowRightFromBracket, 
  faPersonCane, 
  faUserNurse,
  faWrench
} from '@fortawesome/free-solid-svg-icons'

import Aside from '../Aside'
import UlMenu from '../UlMenu'
import LiMenu from '../LiMenu'
import Link from 'next/link'
import Avatar from '../Avatar'
import { useAuth } from '@/contexts/authContext'

const Sidebar: React.FC = () => {
  const {
    signOut,
    user,
  } = useAuth()

  return (
    <Aside 
      className={`z-50 h-screen bg-accent sticky top-0 w-full min-w-[200px] max-w-[200px] overflow-y-scroll overflow-x-hidden flex flex-col justify-between`}
      >
        <UlMenu className={`space-y-2 bg-accent [&_a]:!text-white  text-white w-full`}>
          <div className="flex items-center justify-center w-full p-4 sticky top-0 bg-accent z-50">
            <div className=''> 
              <Image
              src="/images/logo-no-background.png"
              alt="logo Houden"
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
          <LiMenu>
            <Link className="flex items-center gap-3" href="/profissionais">
              <FontAwesomeIcon icon={faUserNurse} className='text-lg' />
              <span>Profissionais</span>
            </Link>
          </LiMenu>        
        </UlMenu>
        <div className='sticky bottom-0 bg-accent'>
        <div className='divider divider-secondary'></div>
        <div className='flex gap-2 px-2 mb-4'>
          <Avatar className="bg-accent text-accent-content dark:bg-base-300 min-w-8 h-8 rounded-full flex text-sm items-center justify-center uppercase">
            JD
          </Avatar>
          <div className='w-full text-white flex flex-col justify-between'>
            <p className="font-bold text-xs ">Jane Doe</p>
            <div className='flex flex-row-reverse items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Link 
                href='/perfil'
                className='btn btn-sm btn-circle text-white bg-transparent shadow-none border-transparent hover:border-white hover:bg-transparent'
                >
                  <FontAwesomeIcon icon={faWrench} />
                </Link>
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
