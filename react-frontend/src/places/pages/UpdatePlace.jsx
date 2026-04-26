import { useParams } from "react-router-dom"
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

function UpdatePlace(props) {
    const { placeId } = useParams()
    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId)
    // console.info(identifiedPlace)
    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could not find place!</h2>
            </div>
        )
    }
    return (
        <form className="place-form">
            <Input 
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={() => {}}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input 
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min. 5 characters)"
                onInput={() => {}}
                value={identifiedPlace.description}
                isValid={true}
            />
            <Button type="submit" disabled={true}>
                UPDATE PLACE
            </Button>
        </form>
    )
}

export default UpdatePlace