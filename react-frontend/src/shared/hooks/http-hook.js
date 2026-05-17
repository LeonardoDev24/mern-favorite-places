import { useState, useCallback, useRef, useEffect } from "react"

export const useHttpClient = () => {
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)

    const activeHttpRequest = useRef([])

    const sendRequest = useCallback(async(url,method='GET',body=null,headers={}) => {
        setIsLoading(true)
        const httpAbortCtrl = new AbortController()
        activeHttpRequest.current.push(httpAbortCtrl)

        await new Promise(resolve => setTimeout(resolve,1000))
        try {
            const response = await fetch(url,{
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            })
    
            const data = await response.json()
            
            activeHttpRequest.current = activeHttpRequest.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
            )

            if (!response.ok) {
                throw new Error(data.message)
            }

            return data
        } catch (error) {
            setError(error.message)
            throw error
        } finally {
            setIsLoading(false)
        }
    },[])

    const clearError = () => setError(null)

    useEffect(() => {
        return () => {
            activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort())
        }
    },[])

    return { isLoading, error, sendRequest, clearError }
}
