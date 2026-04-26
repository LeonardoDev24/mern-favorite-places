import { useCallback } from 'react'
import Input from '../../shared/components/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './NewPlace.css'

function NewPlace() {
    const titleChange = useCallback((id,value,isValid) => {

    },[])

    const descriptionChange = useCallback((id,value,isValid) => {

    },[])

    return (
        <form action="" className="place-form">
            <Input 
                id="title"
                element="input" 
                type="text" 
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={titleChange}
            />
            <Input 
                id="description"
                element="textarea" 
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)"
                onInput={descriptionChange}
            />
        </form>
    )
}

export default NewPlace