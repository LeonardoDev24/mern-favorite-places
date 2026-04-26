import './Auth.css'
import Card from '../../shared/components/Card'
import Input from '../../shared/components/Input'
import Button from '../../shared/components/Button'
import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'

function Auth() {
    const voidInputs = {
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }
    const [formState,inputChange] = useForm(voidInputs,false)

    const authSubmit = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    return (
        <Card className="authentication">
            <h2>Login required</h2>
            <hr />
            <form onSubmit={authSubmit}>
                <Input 
                    id="email"
                    element="input"
                    type="email"
                    label="E-mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address"
                    onInput={inputChange}
                />
                <Input 
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    errorText="Please enter a valid password, at least 8 characters"
                    onInput={inputChange}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    LOGIN
                </Button>
            </form>
        </Card>
    )
}

export default Auth