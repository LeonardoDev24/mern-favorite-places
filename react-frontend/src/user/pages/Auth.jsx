import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '../../shared/components/Card'
import Input from '../../shared/components/Input'
import Button from '../../shared/components/Button'
import ErrorModal from '../../shared/components/ErrorModal'
import LoadingSpinner from '../../shared/components/LoadingSpinner'

import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'

function Auth() {
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)

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

    const authSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        
        const endpoint = isLoginMode ? 'login' : 'signup'

        try {
            const response = await fetch(`http://127.0.0.1:4040/api/users/${endpoint}`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formState.inputs.name?.value || null,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                })
            })

            await new Promise(resolve => setTimeout(resolve, 1000))

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message)
            }
            console.log(data)

            setIsLoading(false)
            navigate('/')
            setTimeout(() => {
                login()
            },200)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            setError(error.message || 'Something went wrong, please try again')
        }
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

    const errorHandler = () => {
        setError(null)
    }

    return (
        <>
        <ErrorModal error={error} onClear={errorHandler}/>
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
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
        </>
    )
}

export default Auth