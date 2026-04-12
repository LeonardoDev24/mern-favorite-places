import { useState } from 'react'
import { Link } from 'react-router-dom'

import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import Backdrop from './Backdrop'
import './MainNavigation.css'

function MainNavigation(props) {
    const [drawerIsOpen,setDrawerIsOpen] = useState(false)
    const [closing,setClosing] = useState(false)
    const openDrawer = () => {
        setClosing(false)
        setDrawerIsOpen(true)
    }
    const closeDrawer = () => {
        setClosing(true)
        setTimeout(() => {
            setDrawerIsOpen(false)
        },400)
    }
    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawer}/>}
            {drawerIsOpen ? (
                <SideDrawer closing={closing} onClick={closeDrawer}>
                    <nav className='main-navigation__drawer-nav'>
                        <NavLinks />
                    </nav>
                </SideDrawer>
            ) : null}
            <MainHeader>
                <button 
                    className='main-navigation__menu-btn'
                    onClick={openDrawer}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h1 className='main-navigation__title'>
                    <Link to='/'>Your Places</Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    )
}

export default MainNavigation