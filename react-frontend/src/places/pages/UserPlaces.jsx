import PlaceList from "../components/PlaceList"
import { useParams } from "react-router-dom"

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

function UserPlaces() {
    const {userId} = useParams()
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
    return <PlaceList items={loadedPlaces}/>
}

export default UserPlaces