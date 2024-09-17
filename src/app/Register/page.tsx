import Image from "next/image";
import "../../styles/register.scss";
import registerImg from "../../assets/register.png";
import InputLogin from "../components/InputLogin";
import InputButton from "../components/InputButton";
import SelectRegister from "../components/SelectRegister";
import { registerUser } from "../api/auth/register";
import { useState } from "react";

export default function Register({setName}:{setName:(value:boolean)=>void}) {
    const [error,setError]= useState('');
    const [register,setRegister]= useState('');
    const handleLoginClick = () => {
        setName(true);
    }
    const handleSubmit =async (e:React.FormEvent) => {
        e.preventDefault();
        
        const form = e.currentTarget as HTMLFormElement;
        const nombre= form.elements[0] as HTMLInputElement;
        const correo= form.elements[1] as HTMLInputElement;
        const rol= form.elements[2] as HTMLSelectElement;
        const contrasena= form.elements[3] as HTMLInputElement;
        console.log(nombre.value,correo.value,rol.value,contrasena.value)
        if(nombre.value === "" || correo.value === "" || rol.value === "" || contrasena.value === ""){
            setError('Por favor, rellena todos los campos');
        }else{
            const register= await registerUser({data:{nombre:nombre.value,correo:correo.value,rol:rol.value,contrasena:contrasena.value}});
            if(register.message){
                setError(register.message);
            }else{
                setRegister('Se ha registrado correctamente');
                setName(true);
            }
        }
    }
    return(
        <div className="register_box">
            <Image className="register_img" alt="Ciervo Estelar" src={registerImg}/>
            <div className="register_info">
                <div className="register_scroll">
                    <h1 className="register_title">ÚNETE AL SANTUARIO</h1>
                    <p className="register_description">Elige si serás un cuidador o maestro de criaturas. Completa los detalles para comenzar</p>
                    {error && <p className="register_error">{error}</p>}
                    {register && <p className="register_success">{register}</p>}
                    <form onSubmit={handleSubmit} className="register_form">
                        <InputLogin label="NOMBRE MÍSTICO" name="nombre" placeholder="Introduce tu nombre mágico"/>
                        <InputLogin tipo="email" label="CORREO MÁGICO" name="correo" placeholder="tunombre@bestiario.com"/>
                        <SelectRegister/>
                        <InputLogin tipo="password" label="PALABRA MÁGICA" name="contrasena" placeholder="Introduce tu palabra mágica"/>
                        <InputButton name="REGISTRARME AL SANTUARIO"/>
                    </form>
                    <p className="register_login" onClick={handleLoginClick}>¿Tienes cuenta? Inicia sesión en el refugio</p>
                </div>
            </div>
        </div>
    )
}