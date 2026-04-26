import { useReducer, useEffect } from 'react'
import { validate } from '../util/validators';
import './Input.css'

function inputReducer(state,action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val,action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

function Input(props) {
    const {
        id,
        label,
        element,
        type,
        placeholder,
        rows,
        errorText,
        onInput,
    } = props

    const [inputState,dispatch] = useReducer(inputReducer,{
        value: props.value || '', 
        isValid: props.isValid || false,
        isTouched: false
    })
    const {value,isValid} = inputState

    useEffect(() => {
        onInput(id,value,isValid)
    },[id,value,isValid,onInput])
    
    const changeHandler = event => {
        const action = {
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        }
        dispatch(action)
    }

    const touchHandler = () => {
        const action = {
            type: 'TOUCH'
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
            onBlur={touchHandler}
        /> :
        <textarea 
            id={id} 
            rows={rows || 3}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}
        ></textarea>
    
    return (
        <div className={`form-control 
            ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}
        >
            <label htmlFor={id}>{label}</label>
            {elementProp}
            {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
        </div>
    )
}

export default Input