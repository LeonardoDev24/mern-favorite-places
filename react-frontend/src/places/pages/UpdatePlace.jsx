import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { useForm } from "../../shared/hooks/form-hook"
import Input from "../../shared/components/Input"
import Button from "../../shared/components/Button"
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators"
import './PlaceForm.css'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Atop_the_Rock_%288721964134%29.jpg/1280px-Atop_the_Rock_%288721964134%29.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Atop_the_Rock_%288721964134%29.jpg/1280px-Atop_the_Rock_%288721964134%29.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator: 'u2'
    }
]

function UpdatePlace() {
    const { placeId } = useParams()
    const [isLoading,setIsLoading] = useState(true)
    // const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId)
    
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
    
    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId)
    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could not find place!</h2>
            </div>
        )
    }
    const initialInputs = {
        title: {
            value: identifiedPlace.title,
            isValid: true
        },
        description: {
            value: identifiedPlace.description,
            isValid: true
        }
    }
    useEffect(() => {
        setFormData(initialInputs,true)
        setIsLoading(false)
    },[setFormData,identifiedPlace])
    
    const placeUpdateSubmit = event => {
        event.preventDefault()
        console.info(formState.inputs)
    }
   
    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmit}>
            <Input 
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputChange}
                // value={identifiedPlace.title}
                initialValue={formState.inputs.title.value}
                initialIsValid={formState.inputs.title.isValid}
            />
            <Input 
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min. 5 characters)"
                onInput={inputChange}
                // value={identifiedPlace.description}
                initialValue={formState.inputs.description.value}
                initialIsValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    )
}

export default UpdatePlace