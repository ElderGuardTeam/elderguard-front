'use client'
import Avatar from "@/components/Avatar"
import Button from "@/components/Button"
import FormGroup from "@/components/FormGroup"
import { useAuth } from "@/contexts/authContext"
import { useRouter } from "next/navigation"
import { parseCookies } from "nookies"
import { useForm } from "react-hook-form"

export default function Profile() {
  const {user, resetPassword} = useAuth()
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<ResetPassword>()

  const { 'elderguard.token': token } = parseCookies()


  const handleChangePassword = async (data: ResetPassword) => {
    console.log(data)
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
          <div className="flex flex-col items-center">
            <Avatar className="bg-accent text-accent-content dark:bg-base-300 w-12 h-12 rounded-full flex text-sm items-center justify-center uppercase">
            </Avatar>
            <p className="font-bold text-xs ">{user?.username}</p>
          </div>
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
                <Button 
                className="btn-sm"
                type="button"
                onClick={() => router.back()}
                >
                  Voltar
                </Button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}