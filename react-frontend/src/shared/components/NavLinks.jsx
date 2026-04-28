import { useContext } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth-context'
import './NavLinks.css'

function NavLinks(props) {
    const auth = useContext(AuthContext)
    const {isLoggedIn,logout} = auth

    const navigate = useNavigate()
    const logoutHandler = () => {
        navigate('/')
        setTimeout(() => {
            logout()
        },200)
    }
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
            {isLoggedIn && <li>
                <button onClick={logoutHandler}>LOG OUT</button>
            </li>}
        </ul>
    )
}

export default NavLinks