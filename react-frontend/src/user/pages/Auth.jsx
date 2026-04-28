import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../shared/components/Card'
import Input from '../../shared/components/Input'
import Button from '../../shared/components/Button'
import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'

function Auth() {
    // for the nav links
    const auth = useContext(AuthContext)
    const {login} = auth
    const navigate = useNavigate()

    // for the form
    const [isLoginMode,setIsloginMode] = useState(true)
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
    const [formState,inputChange,setFormData] = useForm(voidInputs,false)

    const authSubmit = event => {
        event.preventDefault()
        console.log(formState.inputs)
        // window.location.pathname = '/'
        navigate('/')
        setTimeout(() => {
            login()
        },200)
    }

    const switchMode = () => {
        if (!isLoginMode) {
            const formValidity = formState.inputs.email.isValid && formState.inputs.password.isValid
            setFormData({
                ...formState.inputs,
                name: null
            },formValidity)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            },false)
        }
        setIsloginMode(prevMode => !prevMode)
    }

    return (
        <Card className="authentication">
            <h2>Login required</h2>
            <hr />
            <form onSubmit={authSubmit}>
                {!isLoginMode && 
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your name"
                        onInput={inputChange}
                    />
                }
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
                    {isLoginMode ? 'LOGIN' : 'SIGN UP'}
                </Button>
            </form>
            <Button inverse onClick={switchMode}>
                SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOGIN'}
            </Button>
        </Card>
    )
}

export default Auth