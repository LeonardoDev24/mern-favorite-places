import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import PlaceList from "../components/PlaceList"
import LoadingSpinner from "../../shared/components/LoadingSpinner"
import ErrorModal from "../../shared/components/ErrorModal"

import { useHttpClient } from "../../shared/hooks/http-hook"

function UserPlaces() {
    const [loadedPlaces,setLoadedPlaces] = useState(null)
    const {isLoading,error,sendRequest,clearError} = useHttpClient()
    const {userId} = useParams()

    const getUserPlaces = async () => {
        try {
            const data = await sendRequest(
                `http://127.0.0.1:4040/api/places/user/${userId}`
            )
            setLoadedPlaces(data.places)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getUserPlaces()
    },[sendRequest,userId])
    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && 
            <div className="center">
                <LoadingSpinner/>
            </div>}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces}/>}
        </>
    )
}

export default UserPlaces