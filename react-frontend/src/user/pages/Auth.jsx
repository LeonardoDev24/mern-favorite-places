import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '../../shared/components/Card'
import Input from '../../shared/components/Input'
import Button from '../../shared/components/Button'
import ErrorModal from '../../shared/components/ErrorModal'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import ImageUpload from '../../shared/components/ImageUpload'

import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'

function Auth() {
    const {isLoading,error,sendRequest, clearError} = useHttpClient()

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

        const endpoint = isLoginMode ? 'login' : 'signup'

        const loginBody = JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
        })

        const loginHeaders = {
            "Content-Type": "application/json"
        }

        const formData = new FormData()
        formData.append('name',formState.inputs.name?.value || '')
        formData.append('email',formState.inputs.email.value)
        formData.append('password',formState.inputs.password.value)
        formData.append('image',formState.inputs.image?.value || null)

        try {
            const data = await sendRequest(
                `http://127.0.0.1:4040/api/users/${endpoint}`,
                'POST',
                isLoginMode ? loginBody: formData,
                isLoginMode ? loginHeaders : {}
            )

            console.log(data)

            navigate('/')
            setTimeout(() => {
                login(data.user.id)
            },200)
        } catch (error) {
            console.error(error)
        }
    }

    const switchMode = () => {
        if (!isLoginMode) {
            const formValidity = formState.inputs.email.isValid && formState.inputs.password.isValid
            setFormData({
                ...formState.inputs,
                name: null,
                image: null,
            },formValidity)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            },false)
        }
        setIsloginMode(prevMode => !prevMode)
    }

    return (
        <>
        <ErrorModal error={error} onClear={clearError}/>
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2>Login required</h2>
            <hr />
            <form onSubmit={authSubmit}>
                {!isLoginMode && 
                <>
                    <ImageUpload id='image' center onInput={inputChange}/>
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your name"
                        onInput={inputChange}
                    />
                </>
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