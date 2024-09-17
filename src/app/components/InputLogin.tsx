

export default function InputLogin({label,onChange, value, placeholder,name, tipo='text'}:
    {label:string,tipo?:string, placeholder:string,value?:string, name:string, onChange?: (e:React.ChangeEvent<HTMLInputElement>)=>void}) {
    return(
        <div className="login_input-box">
            <label className="login_input-label" htmlFor={name}>{label}</label>
            <input onChange={onChange} value={value} className="login_input" type={tipo} id={name} name={name} placeholder={placeholder}  />
        </div>
    )
}