# Context

__动态`require`__

_什么时候使用require.context?_

当require包含表达式的时候，webpack在编译阶段不知道确切的是哪个资源，例如：

```js
require('./template' + name + '.jade');
```

webpack解析require语句，得到两个信息：

*	目录：`./template`
*	正则表达式：`/^.*\.jade$/`

可以看出，webpack并不知道具体的资源信息。

__上下文模块__

当使用`require`的时候，会生成一个上下文模块。这个模块包含所有符合正则表达式和目录的所有资源的引用。上下文模块还包含一个`map`，保存具体模块和模块id的映射。例如：

```js
{
    "./table.jade": 22,
    "./table-row.jade": 23,
    "./directory/folder.jade": 24
}
```

__动态`require`重写__

原始的`require`语句被编译器重写后，可以访问上下文模块（假设上下文模块获得的模块id是`21`），例如：

```js
// original statement
require("./template/" + name + ".jade");

// rewritten statement
require(21)("./" + name + ".jade");
```

__require.context__

用法：

```js
require.context(directory, useSubdirectories = false, regExp = /^\.\//)
```
*	`directory`: 指定资源目录
*	`useSubdirectories`: 资源目录是否包括子目录
*	`regExp`: 根据该正则表达式匹配资源

如果`useSubdirectories`为`false`，则本例中，在`images`目录的子目录`animal`目录下的图片地址将不能被`require`到.

__Critical dependencies__

当一个模块包含不能被静态分析的`require`语句时，上下文目录则为该模块的目录。
这时，在`webpack`编译时将会发出`Critical dependencies`的`warning`信息。
例如在`main.js`中，如果不指定上下文（使用`require.context`），则在`webpack`编译时会报如下`warning`：

```bash
dulin@dulindeiMac:~/workspace/webpack-summer/require.context (master%=) % webpack
clean-webpack-plugin: /Users/dulin/workspace/webpack-summer/require.context/dist has been removed.
clean-webpack-plugin: /Users/dulin/workspace/webpack-summer/require.context/build has been removed.
Hash: 588de2364465a72d4116
Version: webpack 1.13.1
Time: 624ms
                               Asset       Size  Chunks             Chunk Names
c358c3aca1a327f282ff23de15661d17.jpg     115 kB          [emitted]
c0a276dd62520f0512c836c1704c2048.jpg     510 kB          [emitted]
5da3a7e826837a7b602e5da746698a1b.jpg     201 kB          [emitted]
        main.588de2364465a72d4116.js    2.81 kB       0  [emitted]  main
                          index.html  223 bytes          [emitted]
   [0] ./src/main.js 327 bytes {0} [built]
   [1] ./src ^\.\/.*$ 259 bytes {0} [built] [3 warnings]
   [5] ./src/index.html 0 bytes [optional] [built] [failed]
    + 3 hidden modules

WARNING in ./src/main.js
Critical dependencies:
12:15-30 the request of a dependency is an expression
 @ ./src/main.js 12:15-30

WARNING in ./src/index.html
Module parse failed: /Users/dulin/workspace/webpack-summer/require.context/src/index.html Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
SyntaxError: Unexpected token (1:0)
    at Parser.pp.raise (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:920:13)
    at Parser.pp.unexpected (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:1483:8)
    at Parser.pp.parseExprAtom (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:330:12)
    at Parser.pp.parseExprSubscripts (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:225:19)
    at Parser.pp.parseMaybeUnary (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:204:17)
    at Parser.pp.parseExprOps (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:151:19)
    at Parser.pp.parseMaybeConditional (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:133:19)
    at Parser.pp.parseMaybeAssign (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:110:19)
    at Parser.pp.parseExpression (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:86:19)
    at Parser.pp.parseStatement (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:1753:23)
    at Parser.pp.parseTopLevel (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:1648:21)
    at Parser.parse (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:1616:17)
    at Object.parse (/usr/local/lib/node_modules/webpack/node_modules/acorn/dist/acorn.js:882:44)
    at Parser.parse (/usr/local/lib/node_modules/webpack/lib/Parser.js:902:15)
    at DependenciesBlock.<anonymous> (/usr/local/lib/node_modules/webpack/lib/NormalModule.js:104:16)
    at DependenciesBlock.onModuleBuild (/usr/local/lib/node_modules/webpack/node_modules/webpack-core/lib/NormalModuleMixin.js:310:10)
    at nextLoader (/usr/local/lib/node_modules/webpack/node_modules/webpack-core/lib/NormalModuleMixin.js:275:25)
    at /usr/local/lib/node_modules/webpack/node_modules/webpack-core/lib/NormalModuleMixin.js:259:5
    at Storage.provide (/usr/local/lib/node_modules/webpack/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:52:20)
    at CachedInputFileSystem.readFile (/usr/local/lib/node_modules/webpack/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:140:24)
    at DependenciesBlock.onLoadPitchDone (/usr/local/lib/node_modules/webpack/node_modules/webpack-core/lib/NormalModuleMixin.js:255:7)
    at DependenciesBlock.loadPitch (/usr/local/lib/node_modules/webpack/node_modules/webpack-core/lib/NormalModuleMixin.js:182:27)
    at DependenciesBlock.doBuild (/usr/local/lib/node_modules/webpack/node_modules/webpack-core/lib/NormalModuleMixin.js:241:4)
    at DependenciesBlock.build (/usr/local/lib/node_modules/webpack/lib/NormalModule.js:84:14)
    at Compilation.buildModule (/usr/local/lib/node_modules/webpack/lib/Compilation.js:126:9)
    at /usr/local/lib/node_modules/webpack/lib/Compilation.js:309:10
    at /usr/local/lib/node_modules/webpack/lib/NormalModuleFactory.js:58:13
    at NormalModuleFactory.applyPluginsAsyncWaterfall (/usr/local/lib/node_modules/webpack/node_modules/tapable/lib/Tapable.js:75:69)
    at onDoneResolving (/usr/local/lib/node_modules/webpack/lib/NormalModuleFactory.js:38:11)
    at onDoneResolving (/usr/local/lib/node_modules/webpack/lib/NormalModuleFactory.js:121:6)
 @ ./src ^\.\/.*$

WARNING in ./src ^\.\/.*$
Module not found: Error: a dependency to an entry point is not allowed
 @ ./src ^\.\/.*$

WARNING in ./src ^\.\/.*$
Module not found: Error: a dependency to an entry point is not allowed
 @ ./src ^\.\/.*$
Child html-webpack-plugin for "index.html":
        + 3 hidden modules
```

