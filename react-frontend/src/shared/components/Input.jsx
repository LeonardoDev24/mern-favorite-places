import './Input.css'

function Input(props) {
    const {id,label,element,type,placeholder,rows} = props
    const elementProp = element === 'input' ? 
        <input id={id} type={type} placeholder={placeholder}/> :
        <textarea id={id} rows={rows || 3}></textarea>
    return (
        <div className={`form-control`}>
            <label htmlFor={id}>{label}</label>
            {elementProp}
        </div>
    )
}

export default Input