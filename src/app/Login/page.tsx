'use client'
import Image from "next/image";
import "../../styles/login.scss";
import loginImg from "../../assets/login.png";
import InputLogin from "../components/InputLogin";
import InputButton from "../components/InputButton";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login({setName}:{setName:(value:boolean)=>void}) {
    const router= useRouter();
    const [error,setError]= useState('')
    const handleRegisterClick = () => {
        setName(false);
    }
    const handleSubmit =async (e:React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const correo= form.elements[0] as HTMLInputElement;
        const contrasena= form.elements[1] as HTMLInputElement;
        if(correo.value === "" || contrasena.value === ""){
            alert("Por favor, rellena todos los campos");
        }
        const responseNextAuth = await signIn("credentials", {
            redirect: false,
            correo: correo.value,
            contrasena: contrasena.value,
          });
          if(responseNextAuth?.error){
            setError(responseNextAuth.error)
          }else{
            router.push("/dashboard")
          }

    }
    return (
        <div className="login_box">
            <Image className="login_img" alt="Ciervo Estelar" src={loginImg}/>
            <div className="login_info">
                <h1 className="login_title">INICIA SESION</h1>
                <p className="login_description">Para acceder a la coleccion de criaturas mágicas. Solo los maestros y los cuidadores reconocidos pueden entrar</p>
                {error && <p className="login_error">{error}</p>}
                <form onSubmit={handleSubmit} className="login_form">
                    <InputLogin tipo="email" label="CORREO MÁGICO" name="correo" placeholder="tunombre@santuario.com"/>
                    <InputLogin tipo="password" label="PALABRA MÁGICA" name="contrasena" placeholder="Introduce tu contraseña"/>
                    <InputButton name="ACCEDER AL SANTUARIO"/>
                </form>
                <p onClick={handleRegisterClick} className="login_register">¿No tienes cuenta? Regístrate como maestro o cuidador</p>
            </div>
        </div>
    );
}