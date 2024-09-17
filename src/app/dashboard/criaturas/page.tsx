'use client'
import CheckBox from "@/app/components/CheckBox";
import crearCriaturas from "@/app/components/CrearCriaturas";
import CriaturasTable from "@/app/components/CriaturasTable";
import Filtros from "@/app/components/Filtros";
import InputButton from "@/app/components/InputButton";
import InputLogin from "@/app/components/InputLogin";
import SelectTipo from "@/app/components/SelectTipo";
import { getCriaturas } from "@/app/hook/getCriaturas";
import { crearCriatura, eliminarCriatura, modCriatura } from "@/app/lib/data";
import { Criatura } from "@/app/lib/definitions";
import "@/styles/criaturas.scss";
import "@/styles/login.scss";
import "@/styles/register.scss";
import { faFilter, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function CriaturasPage() {
    {/*Fitlros States */}
    const [filteredData, setFilteredData] = useState<Criatura[]>();
    const [search, setSearch] = useState('');
    {/*Crear Criaturas States */}
    const [crearCritatura, setCrearCriatura] = useState(false);
    const [anteriorNombre, setAnteriorNombre] = useState('');
    const [crearError, setCrearError] = useState(false);
    const [checkboxSelected,setCheckboxSelected] = useState('');
    {/*Modificar Criaturas States */}
    const [modificarCriatura, setModificarCriatura] = useState(false);
    const [numCriatura, setNumCriatura] = useState<Criatura>();
    const [nombre, setNombre] = useState('');
    const [criaturas, setCriaturas] = useState<Criatura[]>([]);
    const [tipo, setTipo] = useState('');
    const [nivel, setNivel] = useState(0);
    const [entrenado, setEntrenado] = useState(false);

    {/*Modal State */}
    const [rol,setRol]=useState('');
    const [modal,setModal]=useState(false);
    const { data: session } = useSession();
    

    useEffect(() => {
        console.log(session)
        const fetchCriaturas = async () => {
          if(session?.user.correo){
            try {
              const data = await getCriaturas(session.user.correo);
              setCriaturas(data);
              setRol(session.user.rol);
            } catch (error) {
              console.log(error)
              throw new Error('Error al obtener criaturas');
            } 
          }
        };
    
        if(session?.user.correo) {
          fetchCriaturas();
        }
      }, []);
    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if(search==''){
            setFilteredData(undefined)
        }
        setFilteredData(criaturas.filter(criatura => criatura.nombre.toLowerCase().includes(e.target.value.toLowerCase())));  
    }
    const handleClickNuevo = (e:React.FormEvent) => {
        e.preventDefault();
        setCrearCriatura(!crearCritatura);
    }
    
    const handleChangeTipo = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setTipo(e.target.value);
    }
    const handleChangeNivel = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNivel(Number(e.target.value));
    }
    const handleChangeEntrenado = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEntrenado(e.target.name=='true'?true:false);
    }
    const handleChangeNombre = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
    }

    const handleModificarCriatura = async (e:React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const nombre= form.nombre.value;
        const nivel= form.Nivel.value;
        const tipo= form.tipo.value;
        console.log(session);
        if(session?.user.correo){
            const params={correo:session?.user.correo,nombre,tipo,nivel,entrenado,anteriorNombre};
            const crearCriaturas=await modCriatura(params);
            if(crearCriaturas){
                console.log(crearCriaturas);
                const nuevo = criaturas.find(criatura => criatura.nombre === anteriorNombre);
                if (nuevo) {
                    criaturas[criaturas.indexOf(nuevo)] = params;
                }
                const newCriaturas=criaturas.filter(criatura=>criatura.nombre!=anteriorNombre);
                setCriaturas([...newCriaturas,params]);
                
                setModificarCriatura(false);
            }
        }
    }

    const handleEliminarCriaturas = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(numCriatura);
        if(session?.user.correo){
            const params={correo:session?.user.correo,nombre:numCriatura?.nombre};
            const eliminar=await eliminarCriatura({correo:session?.user.correo,nombre:anteriorNombre});
            if(eliminar){
                const newCriaturas=criaturas.filter(criatura=>criatura.nombre!=numCriatura?.nombre);
                setCriaturas(newCriaturas);
                setModificarCriatura(false);
                setModal(false);
            }
        }
    }

    const handleChangeModal= (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setModal(!modal);
    }

   
    return (
        <section className="criaturas_box">
           <article>
            <h2 className="criaturas_title">Mis Criaturas</h2>
                <p className="criaturas_subtitle">Explora y gestiona todas las criaturas mágicas que has recolectado. Cada una tiene habilidades únicas y caracteristicas especiales.</p>
                
                <form onSubmit={handleClickNuevo} className="criaturas_add">
                    { criaturas.length==0 &&<h3 className="criaturas_addInfo">Aún no has añadido ninguna criatura al santuario ¡Empieza tu colección ahora!</h3>}
                    {!crearCritatura && !modificarCriatura &&<InputButton name="AÑADIR NUEVA CRIATURA"/>}
                </form>
           </article>
           {/*FILTROS */}
            {criaturas.length>0 && !crearCritatura && !modificarCriatura &&
                <article className="criaturas_order-box">   
                    <Filtros criaturas={criaturas} setFilteredData={setFilteredData} />
                    {/*TABLA MOSTRAR CRIATURAS */}
                    <div className="criaturas_order">
                        <div className="criaturas_search">
                            <InputLogin label="PALABRA MÁGICA" onChange={handleSearch}  value={search} placeholder="Nombre" name="nombre" />
                        </div>
                        <CriaturasTable criaturas={criaturas} filteredData={filteredData} modificarCriatura={modificarCriatura} setAnteriorNombre={setAnteriorNombre} setEntrenado={setEntrenado}
                        setModificarCriatura={setModificarCriatura} setNivel={setNivel} setNombre={setNombre} setNumCriatura={setNumCriatura} setTipo={setTipo} />
                    </div>
                </article>}
            {/*CREAR CRIATURA */}
            {crearCritatura &&(
                crearCriaturas({setCriaturas,setCrearCriatura,criaturas,session,checkboxSelected,setCrearError,setCheckboxSelected,crearError})
                )
            }
            {/*MODIFICAR CRIATURA */}
            {
            modificarCriatura &&(
                <form onSubmit={handleModificarCriatura}>
                    <div className="criaturas_addBox">
                        <InputLogin label="Nombre" name="nombre" placeholder="Introduce el nombre" onChange={handleChangeNombre} value={nombre}  />
                        <InputLogin label="Nivel" name="Nivel" placeholder="Introduce el Nivel" tipo="number" onChange={handleChangeNivel}  value={nivel}  />
                    </div>
                    <div className="criaturas_addBox">
                        <SelectTipo onChange={handleChangeTipo} predefinido={tipo} />
                        <div className="checkbox_box">
                            <label className="login_input-label" htmlFor="entrenado">¿ENTRENADO?</label>
                            <div className="criaturas_chechkbox">
                                <CheckBox label="Sí" name="true" checked={entrenado==true} onChange={handleChangeEntrenado} />
                                <CheckBox label="No" name="false" checked={entrenado==false} onChange={handleChangeEntrenado} />
                            </div>
                        </div>
                    </div>
                    <div className="criaturas_addButton">
                        <InputButton name="MODIFICAR CRIATURA"/>
                        {rol=='maestro' && <button className="criaturas_delete" onClick={handleChangeModal}>ELIMINAR CRIATURA</button>}
                    </div>
                    {modal && <div className="criaturas_modal-box">
                                <p>¿Estas seguro que quieres eliminar la criatura?</p>
                                <div className="criaturas_modalButtons">
                                    <button className="criaturas_delete" onClick={handleChangeModal}>CANCELAR</button>
                                    <button className="criaturas_success" onClick={handleEliminarCriaturas}>ACEPTAR</button>
                                </div>
                            </div>}
                </form>
            )
            }
        </section>
    );
}