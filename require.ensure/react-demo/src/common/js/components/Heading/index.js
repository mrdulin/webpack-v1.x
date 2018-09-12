const Heading = ({title, subTitle}) => {
    return (
        <div>
            <h2>{title || 'default title'}{subTitle ? <small>{subTitle}</small> : null}</h2>
        </div>
    )
};

export default Heading;