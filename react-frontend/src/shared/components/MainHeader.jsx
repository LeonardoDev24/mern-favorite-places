import './MainHeader.css'

function MainHeader(props) {
    const {children} = props
    return (
        <header className='main-header'>
            {children}
        </header>
    )
}

export default MainHeader