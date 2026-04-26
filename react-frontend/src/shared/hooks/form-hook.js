import { useCallback, useReducer } from 'react'

const formReducer = (state,action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            };
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            }
        default:
            return state;
    }
}

export const useForm = (initialInputs,initalFormValidity) => {
    const [formState,dispatch] = useReducer(formReducer,{
        inputs: initialInputs,
        isValid: initalFormValidity // boolean
    })

    const inputChange = useCallback((id,value,isValid) => {
        const action = {
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        }
        dispatch(action)
    },[])

    const setFormData = useCallback((inputData, formValidity) => {
        const action = {
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        }
        dispatch(action)
    },[])

    return [formState,inputChange,setFormData]
}