import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Criatura } from "../lib/definitions"
import { faPencil } from "@fortawesome/free-solid-svg-icons"


export default function CriaturasTable(
    {filteredData,criaturas, setModificarCriatura,setNivel, setTipo,setEntrenado,setAnteriorNombre,setNombre,setNumCriatura,modificarCriatura}:
    {filteredData:Criatura[] | undefined,criaturas:Criatura[],setModificarCriatura:any,setNivel:any,setTipo:any,setEntrenado:any,setAnteriorNombre:any,setNombre:any,setNumCriatura:any,modificarCriatura:boolean}) {
    return (
        <div className="criaturas_order-main">
            <table className="criaturas_table">
                <thead>
                    <tr className="criaturas_table-tr">
                        <th className="criaturas_table-th">Nombre</th>
                        <th className="criaturas_table-th">Tipo</th>
                        <th className="criaturas_table-th">Nivel</th>
                        <th className="criaturas_table-th">Entrenado</th>
                        <th className="criaturas_table-th">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData ? filteredData.map((criatura, index) => (
                            <tr key={index} className="criaturas_table-tr">
                                <td className="criaturas_table-td">{criatura.nombre}</td>
                                <td className="criaturas_table-td">{criatura.tipo}</td>
                                <td className="criaturas_table-td">{criatura.nivel}</td>
                                <td className="criaturas_table-td">{criatura.entrenado ? 'Sí' : 'No'}</td>
                                <td className="criaturas_table-td"><FontAwesomeIcon onClick={() => {setModificarCriatura(!modificarCriatura),setNumCriatura(criatura),setNivel(criatura.nivel),setTipo(criatura.tipo),setEntrenado(criatura.entrenado),setNombre(criatura.nombre),setAnteriorNombre(criatura.nombre)}} icon={faPencil} /></td>
                            </tr>
                        )): criaturas.map((criatura, index) => (
                            <tr key={index} className="criaturas_table-tr">
                                <td className="criaturas_table-td">{criatura.nombre}</td>
                                <td className="criaturas_table-td">{criatura.tipo}</td>
                                <td className="criaturas_table-td">{criatura.nivel}</td>
                                <td className="criaturas_table-td">{criatura.entrenado ? 'Sí' : 'No'}</td>
                                <td className="criaturas_table-td"><FontAwesomeIcon onClick={() => {setModificarCriatura(!modificarCriatura),setNumCriatura(criatura),setNivel(criatura.nivel),setTipo(criatura.tipo),setEntrenado(criatura.entrenado),setNombre(criatura.nombre),setAnteriorNombre(criatura.nombre)}} icon={faPencil} /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}