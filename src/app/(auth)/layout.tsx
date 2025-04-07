'use client'

import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const {
    userId,
    changePassword
  } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
  } = useForm<ResetPassword>()

  useEffect(() => {
    if (userId) {
      setIsOpen(true);
    }
  }, []);

  const handleNewPassword = async (data: ResetPassword) => {
    if (!userId) return;
    changePassword({
      newPassword: data.newPassword,
      userId
    })
    setIsOpen(false)
  }
  return (
    <div className="flex flex-row relative">
      <Sidebar/>
      {children}
      {
        isOpen && (
          <div className="h-screen w-screen fixed inset-0 bg-gray-600/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
            <div className="card bg-white w-full max-w-sm h-fit shadow-2xl ">
              <div className="card-body ">
                <p className="text-center text-lg">
                  Redefinir senha
                </p>
                <form onSubmit={handleSubmit(handleNewPassword)}>
                  <FormGroup 
                    labelText="Nova Senha"
                    inputClass="input input-bordered"
                    isPassword
                    register={register('newPassword', {required: 'Campo obrigatório'})}
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
      
    </div>
  );
}