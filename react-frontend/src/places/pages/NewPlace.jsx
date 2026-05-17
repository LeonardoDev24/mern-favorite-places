import { useContext } from 'react'
import { AuthContext } from '../../shared/context/auth-context'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'

import Input from '../../shared/components/Input'
import Button from '../../shared/components/Button'
import ErrorModal from '../../shared/components/ErrorModal'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './PlaceForm.css'
import { useNavigate } from 'react-router-dom'

function NewPlace() {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const {isLoading,error,sendRequest,clearError} = useHttpClient()

    const initialInputs = {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }
    const [formState,inputChange] = useForm(initialInputs,false)

    const placeSubmit = async event => {
        event.preventDefault()
        console.info(formState.inputs)

        const body = JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            address: formState.inputs.address.value,
            creator: auth.userId
        })

        const headers = {
            "Content-Type": "application/json"
        }

        // Send this to backend!
        try {
            await sendRequest(
                'http://127.0.0.1:4040/api/places',
                'POST',
                body,
                headers
            )
            navigate(`/${auth.userId}/places`)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            <form className="place-form" onSubmit={placeSubmit}>
                {isLoading && <LoadingSpinner asOverlay/>}
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
        </>
    )
}

export default NewPlace