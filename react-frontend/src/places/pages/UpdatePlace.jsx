import { useEffect,useState,useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "../../shared/hooks/form-hook"
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from "../../shared/context/auth-context"

import Input from "../../shared/components/Input"
import Button from "../../shared/components/Button"
import LoadingSpinner from "../../shared/components/LoadingSpinner"
import ErrorModal from "../../shared/components/ErrorModal"

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators"
import './PlaceForm.css'

function UpdatePlace() {
    const { placeId } = useParams()
    const auth = useContext(AuthContext)
    const {isLoading,error,sendRequest,clearError} = useHttpClient()
    const [loadedPlace,setLoadedPlace] = useState(null)

    const navigate = useNavigate()
    
    const voidInputs = {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }
    const [formState,inputChange,setFormData] = useForm(voidInputs,false)
    
    const getPlaceById = async () => {
        try {
            const data = await sendRequest(
                `http://127.0.0.1:4040/api/places/${placeId}`
            )
            const initialInputs = {
                title: {
                    value: data.place.title,
                    isValid: true
                },
                description: {
                    value: data.place.description,
                    isValid: true
                }
            }
            setLoadedPlace(data.place)
            setFormData(initialInputs,true)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getPlaceById()
    },[sendRequest,placeId,setFormData])
    
    const placeUpdateSubmit = async event => {
        event.preventDefault()
        console.info(formState.inputs)

        const body = JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value
        })

        const headers = {
            "Content-Type": "application/json"
        }

        try {
            await sendRequest(
                `http://127.0.0.1:4040/api/places/${placeId}`,
                'PATCH',
                body,
                headers
            )
            navigate(`/${auth.userId}/places`)
        } catch (error) {
            console.error(error)
        }
    }
   
    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner/>
            </div>
        )
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <h2>Could not find place</h2>
            </div>
        )
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            {!isLoading && loadedPlace && 
            <form className="place-form" onSubmit={placeUpdateSubmit}>
                <Input 
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={inputChange}
                    initialValue={loadedPlace.title}
                    initialIsValid={true}
                />
                <Input 
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (min. 5 characters)"
                    onInput={inputChange}
                    initialValue={loadedPlace.description}
                    initialIsValid={true}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    UPDATE PLACE
                </Button>
            </form>}
        </>
    )
}

export default UpdatePlace