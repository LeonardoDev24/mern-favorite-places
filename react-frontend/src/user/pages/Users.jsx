import UsersList from '../components/UsersList'

function Users() {
    const users = [
        {
            id: 'u1',
            name: 'Max Schwarz',
            image: 'https://images.pexels.com/photos/30996430/pexels-photo-30996430.jpeg',
            places: 3
        },
        {
            id: 'u2',
            name: 'Clark Kent',
            image: 'https://images.pexels.com/photos/20503680/pexels-photo-20503680.jpeg',
            places: 4
        }
    ]
    return <UsersList items={users}/>
}

export default Users