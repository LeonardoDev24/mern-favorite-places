import { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import ErrorModal from '../../shared/components/ErrorModal'
import { useHttpClient } from '../../shared/hooks/http-hook'

function Users() {
    const [users,setUsers] = useState(null)
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    const getAllUsers = async () => {
        try {
            const data = await sendRequest('http://127.0.0.1:4040/api/users')
            setUsers(data.users)
        } catch (error) {
            console.error(error)
        } 
    }

    useEffect(() => {
        getAllUsers()
    },[sendRequest])

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && 
            <div className='center'>
                <LoadingSpinner/>
            </div>}
            {!isLoading && users && <UsersList items={users} />}
        </>
    )
}

export default Users