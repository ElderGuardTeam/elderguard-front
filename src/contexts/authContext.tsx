'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { useLoader } from './loaderContext'
import { api } from '@/utils/lib/axios'
import toastError from '@/utils/toast/toastError'
import toastSuccess from '@/utils/toast/toastSuccess'


type AuthContextType = {
  user: User | null
  signIn: (data: Login) => Promise<void>
  signOut: () => void
  forgotPassword: (data: { login: string }) => Promise<void>
  resetPassword: (data: any) => Promise<void>
  changePassword: (data: ChangePassword) => Promise<void>
  userId: string | null
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({} as User)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()
  const {setLoading} = useLoader()

  const { 'elderguard.token': token } = parseCookies()

  const headerConfig = {
    headers:{
      Authorization: 'Bearer ' + token,
    },
    }

  useEffect(() => {
    const { 'elderguard.token': token } = parseCookies()
    const { 'elderguard.userId': userId } = parseCookies()
    if (token) {
      const decodedToken = jwt.decode(token)
      setUser(decodedToken as User)
    }
    if (userId) {
      setUserId(userId)
    } 
  }, [])

  async function signIn({ login, password }: Login) {
    setLoading(true)
    await api
      .post('auth/login', {
        login,
        password,
      })
      .then((res) => { 
      if(res.data.message === 'ALTER_PASSWORD_REQUIRED') {
        setUserId(res.data.userId)
        router.push('/pacientes')
        return
      } else {
        setUserId(null)
      }
      const { 'elderguard.token': token } = parseCookies()
      const { 'elderguard.userId': userId } = parseCookies()
      if (token || userId) {
        destroyCookie({}, 'elderguard.token')
        destroyCookie({}, 'elderguard.userId')
      }
      const decodedToken = jwt.decode(res.data.access_token)
      setUser(decodedToken as User)
      setCookie(undefined, 'elderguard.token', res.data.access_token, {
        maxAge: 60 * 60 * 8, // 8 hours
        httpOnly: false,
        path: '/',
      })
      setCookie(undefined, 'elderguard.userId', res.data.userId, {
        maxAge: 60 * 60 * 8, // 8 hours
        httpOnly: false,
        path: '/',
      })
      router.push('/pacientes')
  }).catch((error) => {
    toastError(error.response.data.message, false)
  }).finally(() => {
    setLoading(false)
  })
}

  function signOut() {
    destroyCookie({}, 'elderguard.token', {
      path: '/',
    })
    destroyCookie({}, 'elderguard.userId', {
      path: '/',
    })
    setUser(null)
    setUserId(null)
    router.push('/')
  }

  async function forgotPassword({ login }: { login: string }) {
    setLoading(true)
    await api
      .post('auth/forgot-password', {
        login,
      })
      .then((res) => {
        toastSuccess(res.data.message, false)
      })
      .catch((err) => {
        toastError(err.response.data.message, false)
      }).finally(() => {
        setLoading(false)
      })
  }

  async function resetPassword(data: ResetPassword) {
    setLoading(true)
    await api
      .post('auth/reset-password', {
        newPassword: data.newPassword,
        token: data.token
      } )
      .then((res) => {
        toastSuccess(res.data.message, 5000)
        router.push('/')
      })
      .catch((err) => {
        toastError(err.response.data.message, false)
      }).finally(() => {
        setLoading(false)
      })
  }

  async function changePassword(data: ChangePassword) {
    setLoading(true)
    await api
      .patch('auth/change-password', {
        newPassword: data.newPassword,
        userId: data.userId
      })
      .then((res) => {
        toastSuccess(res.data.message, 5000)
        router.push('/')
      })
      .catch((err) => {
        toastError(err.response.data.message, false)
      }).finally(() => {
        setLoading(false)
      })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        forgotPassword,
        resetPassword,
        userId,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
