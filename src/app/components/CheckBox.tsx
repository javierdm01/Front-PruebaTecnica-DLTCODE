
export default function CheckBox({label, name,onChange,checked}: {label: string, name: string,checked?:boolean,onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <div className="checkbox">
            <input type="checkbox" onChange={onChange} checked={checked} id={name} name={name} />
            <label htmlFor={name}>{label}</label>
        </div>
    );
}