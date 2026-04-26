import './NewPlace.css'
import Input from '../../shared/components/Input'

function NewPlace() {
    return (
        <form action="" className="place-form">
            <Input element="input" type="text" label="Title"/>
        </form>
    )
}

export default NewPlace