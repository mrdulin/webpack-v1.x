
*   `chunkhash`是根据具体模块文件的内容计算所得的`hash`值，所以某个文件的改动只会影响它本身的`hash`，使用`chunkhash`

```bash
bundle1.5449644269d40e757f20.js    1.42 kB       0  [emitted]  bundle1                                                                                                                                                                                                
bundle2.58eaadbe820b823a1dc8.js    1.66 kB       1  [emitted]  bundle2                                                                                                                                                                                                
                     index.html  285 bytes          [emitted]              
```
不会影响其他文件，每个文件的`hash`都不相同，上线后无改动的文件不会失去缓存。


*   `hash`, `hash`是`compilation`对象计算所得，而不是具体的项目文件计算所得。所有的文件名都会使用相同的`hash`, 
这样带来的问题是，这两个`bundle.js`文件任何一个改动都会影响另外两个文件的最终文件名。上线后，另外两个文件的浏览器缓存也全部失效。这肯定不是我们想要的结果。
使用`chunkhash`就可以解决这个问题。

```bash
bundle1.92d333ac7422ba569c30.js    1.42 kB       0  [emitted]  bundle1                                                                                                                                                                                                
bundle2.92d333ac7422ba569c30.js    1.66 kB       1  [emitted]  bundle2                                                                                                                                                                                                
                     index.html  285 bytes          [emitted]                 
```

总的来说，`hash`表示`webpack`每次打包编译的`hash`, `chunkhash`一般用于多个`bundle`文件，每个`bundle`都有自己的`hash`, 一个`bundle`中某个模块
的改动，只会在让包含这个模块的`bundle`文件生成新的`hash`,不会影响其他的`bundle`文件的`hash`。


*   `contenthash`是`extract-text-webpack-plugin`插件提供的以文件内容而生成的`hash`值。解决`css`文件独立打包成`bundle.css`文件时`hash`值与`bundle.js`文件相同的问题。

使用`new ExtractTextPlugin('[name].[chunkhash].css')`这样配置，打包编译生成的文件名如下：

```bash
                    Asset       Size  Chunks             Chunk Names                                                                                                                                                                              
 bundle1.8bdebde70b6f92ede862.js    1.57 kB       0  [emitted]  bundle1                                                                                                                                                                                  
 bundle2.fa0e0416aed3052c97ea.js    1.85 kB       1  [emitted]  bundle2                                                                                                                                                                                  
bundle1.8bdebde70b6f92ede862.css   93 bytes       0  [emitted]  bundle1                                                                                                                                                                                  
bundle2.fa0e0416aed3052c97ea.css   36 bytes       1  [emitted]  bundle2                                                                                                                                                                                  
                      index.html  411 bytes          [emitted]               
```

修改`a.css`文件，再次打包编译：

```bash
 Asset       Size  Chunks             Chunk Names                                                                                                                                                                              
 bundle1.e244ce73d93c0daf23d6.js    1.57 kB       0  [emitted]  bundle1                                                                                                                                                                                  
 bundle2.fa0e0416aed3052c97ea.js    1.85 kB       1  [emitted]  bundle2                                                                                                                                                                                  
bundle1.e244ce73d93c0daf23d6.css  128 bytes       0  [emitted]  bundle1                                                                                                                                                                                  
bundle2.fa0e0416aed3052c97ea.css   36 bytes       1  [emitted]  bundle2                                                                                                                                                                                  
                      index.html  411 bytes          [emitted]               
```

可见，`css`文件打包生成的`bundle.css`文件的`hash`和对应的`bundle.js`文件生成的`hash`值相同，所以，在`bundle.js`包含的`js`或`css`模块，只要有任何一个文件改动，都会重新生成`bundle.js`和`bundle.css`文件和新的`hash`。

为了让`bunlde.js`和`bundle.css`生成不同的`hash`，使用`new ExtractTextPlugin('[name].[contenthash].css')`配置：

```bash
 Asset       Size  Chunks             Chunk Names                                                                                                                                                                  
             bundle1.def65b6284c852230933.js    1.57 kB       0  [emitted]  bundle1                                                                                                                                                                      
             bundle2.fa0e0416aed3052c97ea.js    1.85 kB       1  [emitted]  bundle2                                                                                                                                                                      
bundle1.60762b3344c1150b0ab29f26c16fb620.css   63 bytes       0  [emitted]  bundle1                                                                                                                                                                      
bundle2.6296530179cc00db201a7faa7581e7f7.css   36 bytes       1  [emitted]  bundle2                                                                                                                                                                      
                                  index.html  435 bytes          [emitted]            
```

修改`a.css`文件，再次打包编译：

```bash
Asset       Size  Chunks             Chunk Names                                                                                                                                                                  
             bundle1.8bdebde70b6f92ede862.js    1.57 kB       0  [emitted]  bundle1                                                                                                                                                                      
             bundle2.fa0e0416aed3052c97ea.js    1.85 kB       1  [emitted]  bundle2                                                                                                                                                                      
bundle1.9cdc1cac3430129fc6b63de8412fa249.css   93 bytes       0  [emitted]  bundle1                                                                                                                                                                      
bundle2.6296530179cc00db201a7faa7581e7f7.css   36 bytes       1  [emitted]  bundle2                                                                                                                                                                      
                                  index.html  435 bytes          [emitted]            
```
