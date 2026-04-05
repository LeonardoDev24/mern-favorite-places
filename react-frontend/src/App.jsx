import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MainNavigation from './shared/components/MainNavigation'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'

function App() {
  return (
    <BrowserRouter>
      <MainNavigation/>
      <main>
        <Routes>
          <Route path='/users' element={<Users/>}/>
          <Route path='/places/new' element={<NewPlace/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
