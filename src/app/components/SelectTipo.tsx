

export default function SelectTipo({predefinido,onChange}:{predefinido?:string,onChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void}){
    return (
        <div className="register_input-box">
            <label htmlFor="tipo">TIPO DE CRIATURA</label>
            <select className="register_input" onChange={onChange} value={predefinido} name="tipo" id="tipo">
                <option className="register_option" value="dragon">Dragón</option>
                <option className="register_option" value="fenix">Fenix</option>
                <option className="register_option" value="golem">Golem</option>
                <option className="register_option" value="grifo">Grifo</option>
                <option className="register_option" value="vampiro">Vampiro</option>
            </select>
        </div>
    )
}