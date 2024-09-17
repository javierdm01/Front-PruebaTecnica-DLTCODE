

export default function SelectRegister({onChange, value}:{onChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void, value?:string}) {
    return (
        <div className="register_input-box">
            <label htmlFor='rol'>ROL</label>
            <select onChange={onChange} value={value} className="register_input" name='rol' id='rol'>
                <option className="register_option" value="cuidador">Cuidador</option>
                <option className="register_option" value="maestro">Maestro</option>
            </select>
        </div>
    )
}