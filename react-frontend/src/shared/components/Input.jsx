import { useReducer } from 'react'
import './Input.css'

function inputReducer(state,action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: true
            }
        default:
            return state;
    }
}

function Input(props) {
    const {id,label,element,type,placeholder,rows,errorText} = props

    const [inputState,dispatch] = useReducer(inputReducer,{value: '', isValid: false})
    
    const changeHandler = event => {
        const action = {
            type: 'CHANGE',
            val: event.target.value
        }
        dispatch(action)
    }

    const elementProp = element === 'input' ? 
        <input 
            id={id} 
            type={type} 
            placeholder={placeholder}
            onChange={changeHandler}
            value={inputState.value}
        /> :
        <textarea 
            id={id} 
            rows={rows || 3}
            onChange={changeHandler}
            value={inputState.value}
        ></textarea>
    
    return (
        <div className={`form-control 
            ${!inputState.isValid && 'form-control--invalid'}`}
        >
            <label htmlFor={id}>{label}</label>
            {elementProp}
            {!inputState.isValid && <p>{errorText}</p>}
        </div>
    )
}

export default Input