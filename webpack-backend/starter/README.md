*   前后端可以共用`webpack`作为构建系统，不用各自维护一套构建系统，减少成本。
*   后端编译打包时，不需要将`require`的模块编译打包到最终的`bundle`文件，因此可以配置`externals`来忽略`require`的模块。
*   使用`source-map-support`和`devtool: source-map`配合`BannerPlugin`开启服务器端编译打包后代码的`sourcemap`，便于调试，有了`sourcemap`，报错后，终端中会显示发生错误的所在的源码的行列。
