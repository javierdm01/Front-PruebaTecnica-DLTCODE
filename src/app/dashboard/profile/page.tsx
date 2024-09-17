'use client'
import InputLogin from "@/app/components/InputLogin";
import "@/styles/login.scss";
import "@/styles/profile.scss";
import InputButton from "@/app/components/InputButton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getOnePersona, modPersona } from "@/app/lib/data";
import { Persona } from "@/app/lib/definitions";
import SelectRegister from "@/app/components/SelectRegister";
export default  function ProfilePage() {
    const {data:session}= useSession()
    const [correo,setCorreo]=useState<string | undefined>(undefined)
    const [persona,setPersona]=useState<Persona | undefined>(undefined)
    const [success,setSuccess]=useState<string | undefined>(undefined)
    useEffect(()=>{
        if(session?.user.correo){
            getOnePersona(session.user.correo).then((data)=>{
                setCorreo(data.correo)
                setPersona(data)
            })
            
        }
    },[session])
    console.log(persona)
    const handleChangePersona=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        if (persona) {
            const key = name as keyof Persona;
            persona[key] = value;
            const nuevoValor = persona[key];
            setPersona({...persona,[key]:nuevoValor})
        }
    }
    const handleChangeSelect=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        if (persona) {
            const {name,value}=e.target
            const key = name as keyof Persona;
            persona[key] = value;
            const nuevoValor = persona[key];
            setPersona({...persona,[key]:nuevoValor})
        }
    }

    const handleSubmitPerfil=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const modificar= await modPersona(persona as Persona)
        
        if(modificar){
            setSuccess('Perfil Modificado')
            session?.user.rol
        }
    }
    const handleChangeTextArea=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        if (persona) {
            const {name,value}=e.target
            const key = name as keyof Persona;
            persona[key] = value;
            const nuevoValor = persona[key];
            setPersona({...persona,[key]:nuevoValor})
        }
    }
    return (
        <section className="profile_box">
            <h2 className="profile_title">Mi Perfil</h2>
            <p className="profile_subtitle">Este es el lugar donde podrás gestionar, actualizar y personalizar la información de tu perfil.</p>
            {success && <p className="login_success">{success}</p>}
            {
                correo &&
                    <form onSubmit={handleSubmitPerfil} className="profile_form">
                        <InputLogin label="NOMBRE MÁGICO" name="nombre" onChange={handleChangePersona} value={persona?.nombre} placeholder="Introduce Nombre" />
                        <InputLogin label="CORREO MÁGICO" name="correo" placeholder="Introduce Correo" value={correo} />
                        <SelectRegister onChange={handleChangeSelect} value={persona?.rol} />
                        
                        <div className="login_input-box">
                            <label className="login_input-label" htmlFor="descripcion">DESCRIPCIÓN</label>
                            <textarea onChange={handleChangeTextArea} value={persona?.descripcion}  className="login_input textarea" name="descripcion" id="descripcion"></textarea>
                        </div>
                        <InputButton name="CONFIRMAR CAMBIOS" />
                    </form>
            }
        </section>
    )
}