# webpack-dev-server inline mode

*   运行，`webpack-dev-server --progress`
*   在`inline mode`如果要使用`html5`的路由方式（不带`#`符号），例如`react-router`的`browserHistory`，要开启`webpack-dev-server`的`historyApiFallback`特性，可以在`webpack.config.js`中设置`devServer`（如本例）
*   不开启`historyApiFallback`，跳转是可以跳转，但跳转后，再次刷新浏览器，会提示`Cannot GET /about`。
*   `webpack/hot/only-dev-server`和`webpack/hot/dev-server`的区别？

`only-dev-server`如果`webpack`编译时有错误，不会重新刷新浏览器;`dev-server`（默认值），如果编译时有错误，会重新刷新浏览器。如果使用命令行参数`--inline --hot`，会自动添加`dev-server`。
但测试发现好像并没有如上述所描述的一样，见`https://github.com/webpack/webpack-dev-server/issues/658`

*  关于`onSocketMsg[msg.type] is not a function`错误，见`https://github.com/webpack/webpack-dev-server/issues/657`