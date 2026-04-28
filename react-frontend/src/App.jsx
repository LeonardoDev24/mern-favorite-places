import { useState,useCallback } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MainNavigation from './shared/components/MainNavigation'
import Users from './user/pages/Users'
import UserPlaces from './places/pages/UserPlaces'
import NewPlace from './places/pages/NewPlace'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'
import { AuthContext } from './shared/context/auth-context'

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  },[])

  const logout = useCallback(()=> {
    setIsLoggedIn(false)
  })

  const initValue = {
    isLoggedIn,
    login,
    logout
  }

  let routes = null
  if (isLoggedIn) {
    routes = (
      <>
        <Route path='/' element={<Users/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/:userId/places' element={<UserPlaces/>}/>
        <Route path='/places/new' element={<NewPlace/>}/>
        <Route path='/places/:placeId' element={<UpdatePlace/>}/>
      </>
    )
  } else {
    routes = (
      <>
        <Route path='/' element={<Users/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/:userId/places' element={<UserPlaces/>}/>
        <Route path='/auth' element={<Auth/>} />
      </>
    )
  }
  return (
    <AuthContext.Provider value={initValue}>
      <BrowserRouter>
        <MainNavigation/>
        <main>
          <Routes>
            {/* <Route path='/' element={<Users/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/:userId/places' element={<UserPlaces/>}/>
            <Route path='/places/new' element={<NewPlace/>}/>
            <Route path='/places/:placeId' element={<UpdatePlace/>}/>
            <Route path='/auth' element={<Auth/>} /> */}
            {routes}
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
