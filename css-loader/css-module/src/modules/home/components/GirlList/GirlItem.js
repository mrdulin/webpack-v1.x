import style from './style.module';

const GirlItem = ({girl}) => {
    return (
        <div className={style.girlItem}>{girl.name}</div>
    )
};

export default GirlItem;