import { useState } from "react";
import CheckBox from "./CheckBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputButton from "./InputButton";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Criatura } from "../lib/definitions";


export default function Filtros({setFilteredData,criaturas}:{setFilteredData:any,criaturas:any}) {
    const [filter, setFilter] = useState(false);
    const [filters,setFilters]= useState()


    const handleFilter = () => {
        setFilter(!filter);
    }

    const modFilters = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
    
        // Obtener los valores de los checkboxes
        const dragon = form.dragon.checked;
        const fenix = form.fenix.checked;
        const golem = form.golem.checked;
        const grifo = form.grifo.checked;
        const vampiro = form.vampiro.checked;
    
        // Crear un objeto con los filtros
        const filters: { [key: string]: boolean } = { dragon, fenix, golem, grifo, vampiro };
    
        // Obtener las claves (tipos) que están seleccionadas (true)
        const selectedTypes = Object.keys(filters).filter(key => filters[key as keyof typeof filters]);
    
        // Si no hay filtros seleccionados, mostrar todas las criaturas
        if (selectedTypes.length === 0) {
            setFilteredData(criaturas); // Mostrar todas las criaturas
            return;
        }
    
        // Filtrar las criaturas que coincidan con los tipos seleccionados
        const filteredCriaturas = criaturas.filter((criatura: Criatura) => 
            selectedTypes.includes(criatura.tipo.toLowerCase())
        );
    
        // Actualizar el estado con las criaturas filtradas
        setFilteredData(filteredCriaturas);
    };
    
    
    return(
        <div className="criaturas_filterBox">
            <div className="criaturas_filterTitle">
                <h3 className="criaturas_orderTitle">Filtrar</h3>
                <FontAwesomeIcon className="criaturas_filterIcon" icon={faFilter} onClick={handleFilter} />
            </div>
            {/*OCULTAR FILTROS */}
            {filter  &&
                <div className="criaturas_orderOptions">
                    <h4 className="criaturas_optionsTitle">Buscar por tipo</h4>
                    <form onSubmit={modFilters} className="criaturas_filter">
                        <CheckBox label="Dragón" name="dragon" />
                        <CheckBox label="Fenix" name="fenix" />
                        <CheckBox label="Golem" name="golem" />
                        <CheckBox label="Grifo" name="grifo" />
                        <CheckBox label="Vampiro" name="vampiro" />
                        <InputButton name="BUSCAR"/>
                    </form>
                </div>
            }
        </div>
    )
}