import { useSession } from "next-auth/react";
import CheckBox from "./CheckBox";
import InputButton from "./InputButton";
import InputLogin from "./InputLogin";
import SelectTipo from "./SelectTipo";
import { useState } from "react";
import { crearCriatura } from "../lib/data";


export default function crearCriaturas(
    {setCriaturas,setCrearCriatura,criaturas,checkboxSelected,setCrearError,setCheckboxSelected,crearError,session}
    :{setCriaturas:any,setCrearCriatura:any,criaturas:any,checkboxSelected:any,setCrearError:any,session:any,setCheckboxSelected:any,crearError:any}) {
    
    const handleCrearSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const nombre= form.nombre.value;
        const nivel= form.nivel.value;
        const tipo= form.tipo.value;
        const entrenado= checkboxSelected=='true'?true:false;
        console.log(session);
        if(session?.user.correo){
            const crearCriaturas=await crearCriatura({correo:session?.user.correo,nombre,tipo,nivel,entrenado});
            console.log(crearCriaturas);
            if(crearCriaturas.message){
                setCrearError(crearCriaturas.message);
            }else{
                setCriaturas([...criaturas,crearCriaturas]);
                setCrearCriatura(false);
                setCrearError(false);
            }
            
        }else{
            
        }
    }
    const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name}= e.target
        setCheckboxSelected(name);
    }
    return (
        <article className="">
                    <h3 className="criaturas_addInfo">CREADOR DE CRIATURAS MÁGICAS</h3>
                    <form onSubmit={handleCrearSubmit} className="criaturas_addInfo-box">
                        <div className="criaturas_addBox">
                            {crearError && <p className="login_error">{crearError}</p>}
                            <InputLogin label="NOMBRE MÁGICO DE LA CRIATURA" name="nombre" placeholder="Introduce el nombre de la criatura"/>
                            <InputLogin tipo="number" label="NIVEL DE CRIATURA" name="nivel" placeholder="Introduce el nivel de la criatura"/>
                        </div>
                        <div className="criaturas_addBox">
                            <SelectTipo/>
                            <div className="checkbox_box">
                                <label className="login_input-label" htmlFor="entrenado">¿ENTRENADO?</label>
                                <div className="criaturas_chechkbox">
                                    <CheckBox label="Sí" name="true" checked={checkboxSelected=='true'} onChange={handleCheckboxChange} />
                                    <CheckBox label="No" name="false" checked={checkboxSelected=='false'} onChange={handleCheckboxChange} />
                                </div>
                            </div>
                        </div>
                        <div className="criaturas_addButton">
                            <InputButton name="AÑADIR CRIATURA"/>
                        </div>
                    </form>

                </article>
    )
}