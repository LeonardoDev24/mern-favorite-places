import { act, useCallback, useReducer } from 'react'
import Input from '../../shared/components/Input'
import Button from '../../shared/components/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './NewPlace.css'

function formReducer(state,action) {
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
            }
        default:
            return state;
    }
}

function NewPlace() {
    const [formState,dispatch] = useReducer(formReducer,{
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
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

    const placeSubmit = event => {
        event.preventDefault()
        console.info(formState.inputs)
        // Send this to backend!
    }
    return (
        <form className="place-form" onSubmit={placeSubmit}>
            <Input 
                id="title"
                element="input" 
                type="text" 
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputChange}
            />
            <Input 
                id="description"
                element="textarea" 
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)"
                onInput={inputChange}
            />
            <Input 
                id="address"
                element="input" 
                type="text" 
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address"
                onInput={inputChange}
            />
            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    )
}

export default NewPlace