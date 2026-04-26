import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MainNavigation from './shared/components/MainNavigation'
import Users from './user/pages/Users'
import UserPlaces from './places/pages/UserPlaces'
import NewPlace from './places/pages/NewPlace'
import UpdatePlace from './places/pages/UpdatePlace'

function App() {
  return (
    <BrowserRouter>
      <MainNavigation/>
      <main>
        <Routes>
          <Route path='/' element={<Users/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/:userId/places' element={<UserPlaces/>}/>
          <Route path='/places/new' element={<NewPlace/>}/>
          <Route path='/places/:placeId' element={<UpdatePlace/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
