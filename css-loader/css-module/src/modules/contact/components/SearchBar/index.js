const requireWithContext = require.context('./', false, /\.scss|css$/);


const SearchBar = ({styleType = 'a', onSubmit}) => {
    //通过require.context动态切换style，最后打包的文件中，包含了所有style.xxx.module.scss文件
    //而不是只包含根据styleType动态引入的那个文件
    const style = requireWithContext(`./style.${styleType}.module.scss`);
    return (
        <div className={style.searchBar}>
            <form onSubmit={onSubmit} className={style.searchForm}>
                <input type="search" className={style.searchInput} placeholder='输入搜索关键词'/>
            </form>
        </div>
    )
};

export default SearchBar;