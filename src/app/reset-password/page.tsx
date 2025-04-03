'use client'
import Avatar from "@/components/Avatar"
import Button from "@/components/Button"
import FormGroup from "@/components/FormGroup"
import { useAuth } from "@/contexts/authContext"
import { usePathname, useRouter } from "next/navigation"
import { parseCookies } from "nookies"
import { useForm } from "react-hook-form"

export default function Profile() {
  const {user, resetPassword} = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<ResetPassword>()
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')

  const handleChangePassword = async (data: ResetPassword) => {
    resetPassword({
      newPassword: data.newPassword,
      token
    })
    reset()
  }
  return(
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <p className="text-center text-lg">
            Redefinir senha
          </p>
          <form onSubmit={handleSubmit(handleChangePassword)}>
            <FormGroup 
              labelText="Nova Senha"
              inputClass="input input-bordered"
              isPassword
              register={register('newPassword', {required: 'Campo obrigatório'})}
              error={errors.newPassword?.message}
              />
              <div className="flex gap-2 mt-2">
                <Button className="btn-sm btn-success" type="submit">
                  Salvar
                </Button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}