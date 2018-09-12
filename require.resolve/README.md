# webpack require.resolve

[webpack require.resolve 文档](https://webpack.github.io/docs/api-in-modules.html#require-resolve)

返回依赖模块的`id`，该方法的调用是**同步**的。没有额外的服务器资源请求。

返回的模块`id`是数字类型，不同于`nodejs`, [nodejs require.resolve 文档](https://nodejs.org/api/globals.html#globals_require_resolve)

`nodejs`的`require.resolve`返回字符串类型的模块的路径，例如`/Users/dulin/workspace/webpack-summer/require.resolve/src/index.js` 

例子：

```js
var id = require.resolve("dependency");
typeof id === "number";
id === 0 // if dependency is the entry point
id > 0 // elsewise
```


