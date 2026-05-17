import { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import ErrorModal from '../../shared/components/ErrorModal'

function Users() {
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)
    const [users,setUsers] = useState(null)

    const getAllUsers = async () => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve,1000))
        try {
            const response = await fetch('http://127.0.0.1:4040/api/users')
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }

            setUsers(data.users)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllUsers()
    },[])

    const errorHandler = () => {
        setError(null)
    }

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && 
            <div className='center'>
                <LoadingSpinner/>
            </div>}
            {!isLoading && users && <UsersList items={users} />}
        </>
    )
}

export default Users