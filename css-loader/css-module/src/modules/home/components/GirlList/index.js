import GirlItem from './GirlItem';
import Heading from './Heading';
import style from './style.module';

/**
 * 在组件及其子组件中多次import style from './style.module';
 * 并不会重复打包style.module.scss中的样式
 */

const GirlList = ({show = true, girls = []}) => {
    if(!show || !girls.length) return null;

    return (
        <div>
            <Heading title={'HOT GIRL'}/>
            <section className={style.girlList}>
                {
                    girls.map((girl, idx) => <GirlItem key={idx} girl={girl}/>)       
                } 
            </section>
        </div>
    )  
};

export default GirlList;