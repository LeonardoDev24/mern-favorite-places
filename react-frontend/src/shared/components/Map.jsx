import './Map.css'

function Map(props) {
    const {className,coordinates} = props
    const {lat,lng} = coordinates
    const src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`
    return (
        <iframe 
            className={`map ${className}`}
            src={src} 
            width="100%"
            height="100%"
            loading='lazy'
        ></iframe>
    )
}

export default Map