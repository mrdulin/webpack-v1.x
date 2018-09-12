# babel-plugin-transform-react-remove-prop-types

使用该插件可以在`NODE_ENV=production`时移除`React`组件中的`propTypes`，减小生成的代码大小，从而节省带宽。

但是有些`node_modules`在程序运行时会依赖`propTypes`，比如`react-bootstrap`。
