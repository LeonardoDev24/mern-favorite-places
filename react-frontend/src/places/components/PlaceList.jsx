import './PlaceList.css'
import Card from '../../shared/components/Card'
import PlaceItem from './PlaceItem'
import Button from '../../shared/components/Button'

import { useContext } from 'react'
import { AuthContext } from '../../shared/context/auth-context'

function PlaceList(props) {
    const auth = useContext(AuthContext)
    const {isLoggedIn, userId} = auth

    const {items,onDeletePlace,thisUserId} = props
    if (items.length === 0) {
        return (
            <div className='place-list center'>
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    {isLoggedIn && userId === thisUserId && 
                    <Button to='/places/new'>Share place</Button>}
                </Card>
            </div>
        )
    }

    return (
        <ul className='place-list'>
            {items.map(place => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                    onDelete={onDeletePlace}
                />)
            )}
        </ul>
    )
}

export default PlaceList