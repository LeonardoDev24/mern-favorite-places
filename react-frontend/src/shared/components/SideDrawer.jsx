import './SideDrawer.css'

function SideDrawer(props) {
    const {children} = props
    return (
        <aside className='side-drawer'>
            {children}
        </aside>
    )
}

export default SideDrawer