// import ReactDOM from 'react-dom'
import {createPortal} from 'react-dom'
import './SideDrawer.css'

function SideDrawer(props) {
    const {children} = props
    const content = <aside className='side-drawer'>{children}</aside>
    return (
        // ReactDOM.createPortal(content,document.getElementById("portal"))
        createPortal(content,document.getElementById("portal"))
    )
}

export default SideDrawer