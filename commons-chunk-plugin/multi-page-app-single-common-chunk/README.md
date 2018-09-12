# multi-page-app

*	`share.js`是`page1.js`,`page2.js`,`page3.js`共享的模块
* 	不加任何插件，打包出来的每个`bundle`文件都含有`share.js`模块

 未经优化过的编译输出：

```bash
Hash: dc4d42588177aea6160b
Version: webpack 1.13.1
Time: 55ms
       Asset     Size  Chunks             Chunk Names
p1.bundle.js  1.61 kB       0  [emitted]  p1
p2.bundle.js  1.61 kB       1  [emitted]  p2
p3.bundle.js  1.61 kB       2  [emitted]  p3
   [0] ./src/page1.js 67 bytes {0} [built]
       factory:11ms building:13ms = 24ms
   [0] ./src/page2.js 67 bytes {1} [built]
       factory:8ms building:15ms dependencies:3ms = 26ms
   [0] ./src/page3.js 67 bytes {2} [built]
       factory:9ms building:16ms dependencies:1ms = 26ms
   [1] ./src/share.js 78 bytes {0} {1} {2} [built]
       [0] 24ms -> factory:5ms building:4ms = 33ms
```

总文件大小：`1.61kb * 3 = 4.83kb`;

使用`webpack.optimize.CommonsChunkPlugin`优化后的编译输出：

```bash
dulin@dulindeiMac:~/workspace/learn-webpack/multi-page-app (master*%=) % ./build.sh
Hash: acc1bb58a6d8bd21e41d
Version: webpack 1.13.1
Time: 58ms
           Asset       Size  Chunks             Chunk Names
    p1.bundle.js  166 bytes       0  [emitted]  p1
    p2.bundle.js  166 bytes       1  [emitted]  p2
    p3.bundle.js  166 bytes       2  [emitted]  p3
common.bundle.js    3.72 kB       3  [emitted]  common.bundle.js
   [0] ./src/page1.js 67 bytes {0} [built]
       factory:11ms building:15ms = 26ms
   [0] ./src/page2.js 67 bytes {1} [built]
       factory:10ms building:15ms dependencies:4ms = 29ms
   [0] ./src/page3.js 67 bytes {2} [built]
       factory:10ms building:15ms dependencies:3ms = 28ms
   [1] ./src/share.js 78 bytes {3} [built]
```

总文件大小：`166bytes * 3 + 3.72kb = 4.2kb`
