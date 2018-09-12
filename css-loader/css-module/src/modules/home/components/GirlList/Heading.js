import style from './style.module';

const Heading = ({title = ''}) => {
    return (
        <div className={style.heading}>
            <h2 className={style.headingTitle}>{title || 'heading title'}</h2>
        </div>
    )
};

export default Heading;

