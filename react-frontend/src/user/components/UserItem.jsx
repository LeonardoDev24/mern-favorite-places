import Card from "../../shared/components/Card"
import Avatar from "../../shared/components/Avatar"
import { Link } from "react-router-dom"
import './UserItem.css'

function UserItem(props) {
    const { id, name, image, placeCount } = props
    return (
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${id}/places`}>
                    <div className="user-item__image">
                        <Avatar image={image} alt={name} />
                    </div>
                    <div className="user-item__info">
                        <h2>{name}</h2>
                        <h3>
                            {placeCount} {placeCount === 1 ? 'place' : 'places'}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    )
}

export default UserItem