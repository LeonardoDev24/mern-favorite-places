// import ReactDOM from 'react-dom'
import {createPortal} from 'react-dom'
import './SideDrawer.css'

function SideDrawer(props) {
    const {children,closing, onClick} = props
    const content = <aside 
        onClick={onClick}
        className={`side-drawer ${closing ? "closing" : ""}`}>
        {children}
    </aside>
    return (
        // ReactDOM.createPortal(content,document.getElementById("portal"))
        createPortal(content,document.getElementById("portal"))
    )
}

export default SideDrawer