import './Card.css'

function Card(props) {
    const {className,style,children} = props
    return (
        <article className={`card ${className}`} style={style}>
            {children}
        </article>
    );
};

export default Card;