import './NewPlace.css'
import Input from '../../shared/components/Input'

function NewPlace() {
    return (
        <form action="" className="place-form">
            <Input 
                element="input" 
                type="text" 
                label="Title"
                validators={[]}
                errorText="Please enter a valid title"
            />
        </form>
    )
}

export default NewPlace