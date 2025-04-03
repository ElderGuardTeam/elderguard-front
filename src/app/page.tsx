'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import Label from "@/components/Label";
import Checkbox from "@/components/Checkbox";
import Modal from "@/components/Modal";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext";


export default function Home() {
  const [showModal, setShowModal] = useState(false)

  const {
    signIn
  } = useAuth()

  const { handleSubmit, setValue, register, formState: { errors } } = useForm()

  const {handleSubmit: handleForgotPassword, register: registerForgotPassword } = useForm()

  useEffect(() => {
    const savedUser = localStorage.getItem('@ElderGuardLoginRemember:Username')

    if (savedUser) {
      setValue('username', savedUser)
      setValue('rememberMe', true)
    }
  }, []);

  const handleLoginForm = async ({login, password, rememberMe}: any) => {
    if (rememberMe) {
      localStorage.setItem('@ElderguardLoginRemember:Login', login);
    }
    signIn({
      login,
      password
    })
  }


  const handleModal = () => {
    setShowModal(!showModal)
  }


  return (
      <div className="hero bg-base-200/50 min-h-screen">
        <div className="hero-content w-2/5 flex-col ">
          <Image src="/images/logo.png" alt="ElderGuard" width={300} height={300}/>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(handleLoginForm)}>
              <h1 className="text-xl font-bold text-center">Efetuar login</h1>
              <FormGroup 
              labelText="Usuário"
              inputClass="input input-bordered"
              register={register('login')}
              />
              <FormGroup 
              labelText="Senha"
              inputClass="input input-bordered"
              register={register('password')}
              isPassword
              />
              <Label labelText='Lembrar-me' className="flex flex-row-reverse self-start gap-2 items-center text-xs">
                <Checkbox register={register('rememberMe')} className="checkbox-xs"/>
              </Label>
              <Button className="btn bg-salmon mt-4">Entrar</Button>
              <label className="label" onClick={handleModal}>
                <p className="label-text-alt link link-hover">Esqueceu a senha?</p>
              </label>
            </form>
              <Modal isOpen={showModal} onClose={handleModal}>
                <form className="flex flex-col gap-4">
                  <h2 className="text-xl font-semibold">Recuperar Senha</h2>
                  <p>Insira o nome de usuário para receber um e-mail com a nova senha</p>
                  <FormGroup 
                  labelText="Usuário"
                  inputClass="input input-bordered"
                  register={registerForgotPassword('Username')}
                  />
                  <div className="flex items-center gap-2 text-sm text-warning">
                    <FontAwesomeIcon icon={faTriangleExclamation}/>
                    <p> Pode levar até 5 minutos para receber o e-mail</p>
                  </div>
                  <Button className="btn bg-salmon">Enviar</Button>
                </form>
              </Modal>
          </div>
        </div>
      </div>
  );
}

