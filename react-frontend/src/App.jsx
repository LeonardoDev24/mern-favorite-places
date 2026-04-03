import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/users' element={<Users/>}/>
        <Route path='/places/new' element={<NewPlace/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
