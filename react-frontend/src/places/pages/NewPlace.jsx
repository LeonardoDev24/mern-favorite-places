import { useForm } from '../../shared/hooks/form-hook'
import Input from '../../shared/components/Input'
import Button from '../../shared/components/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './PlaceForm.css'



function NewPlace() {
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