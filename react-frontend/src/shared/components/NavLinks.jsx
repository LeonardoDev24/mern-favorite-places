import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/auth-context'
import './NavLinks.css'

function NavLinks(props) {
    const auth = useContext(AuthContext)
    const {isLoggedIn} = auth
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to='/' exact="true">ALL USERS</NavLink>
            </li>
            {isLoggedIn && <li>
                <NavLink to='/u1/places'>MY PLACES</NavLink>
            </li>}
            {isLoggedIn && <li>
                <NavLink to='/places/new'>NEW PLACE</NavLink>
            </li>}
            {!isLoggedIn && <li>
                <NavLink to='/auth'>LOG IN</NavLink>
            </li>}
        </ul>
    )
}

export default NavLinks