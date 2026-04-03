function UserItem(props) {
    const {id,name,image,placeCount} = props
    return (
        <li className="user-item">
            <article className="user-item__content">
                <div className="user-item__image">
                    <img src={image} alt={name} />
                </div>
                <div className="user-item__info">
                    <h2>{name}</h2>
                    <h3>
                        {placeCount} {placeCount === 1 ? 'place': 'places'}
                    </h3>
                </div>
            </article>
        </li>
    )
}

export default UserItem