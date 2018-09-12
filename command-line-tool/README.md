#	`webpack-dev-server`和`webpack`的命令行参数解释

_说明:_

*	`webpack cli`的大部分命令行参数对于`webpack-dev-server`都适用，但是像`hide-modules`只适用于`cli`，而`inline`,`hot`只对`webpack-dev-server`适用

* `--display-error-details`，比如`require`了一个不存在的模块`b.js`,打包编译的时候就会输出如下信息

```bash
➜  command-line-tool git:(master) ✗ ./build.sh                                                                                                                                                                                                                        
Hash: 845e173d05870bbec181                                                                                                                                                                                                                                            
Version: webpack 1.13.1                                                                                                                                                                                                                                               
Time: 553ms                                                                                                                                                                                                                                                           
                      Asset       Size  Chunks             Chunk Names                                                                                                                                                                                                
app.845e173d05870bbec181.js    2.41 kB       0  [emitted]  app                                                                                                                                                                                                        
                 index.html  195 bytes          [emitted]                                                                                                                                                                                                             
   [0] ./src/app.js 233 bytes {0} [built] [1 error]                                                                                                                                                                                                                   
   [1] ./src/a.js 324 bytes {0} [built]                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                      
ERROR in ./src/app.js                                                                                                                                                                                                                                                 
Module not found: Error: Cannot resolve 'file' or 'directory' ./b.js in /Users/dulin/workspace/webpack-summer/command-line-tool/src                                                                                                                                   
resolve file                                                                                                                                                                                                                                                          
  /Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js doesn't exist                                                                                                                                                                                      
  /Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js.webpack.js doesn't exist                                                                                                                                                                           
  /Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js.web.js doesn't exist                                                                                                                                                                               
  /Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js.js doesn't exist                                                                                                                                                                                   
  /Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js.json doesn't exist                                                                                                                                                                                 
resolve directory                                                                                                                                                                                                                                                     
  /Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js doesn't exist (directory default file)                                                                                                                                                             
  /Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js/package.json doesn't exist (directory description file)                                                                                                                                            
[/Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js]                                                                                                                                                                                                    
[/Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js.webpack.js]                                                                                                                                                                                         
[/Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js.web.js]                                                                                                                                                                                             
[/Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js.js]                                                                                                                                                                                                 
[/Users/dulin/workspace/webpack-summer/command-line-tool/src/b.js.json]                                                                                                                                                                                               
 @ ./src/app.js 2:10-27                                                                                                                                                                                                                                               
Child html-webpack-plugin for "index.html":                                                                                                                                                                                                                           
        + 3 hidden modules 
```

*  `--profile`，如果你想知道每个模块打包编译的时间，使用这个参数。例子：

```bash
➜  command-line-tool git:(master) ✗ ./build.sh                                                                                                                                                                                                                        
Hash: fd91042c257b2ba67caa                                                                                                                                                                                                                                            
Version: webpack 1.13.1                                                                                                                                                                                                                                               
Time: 539ms                                                                                                                                                                                                                                                           
                      Asset       Size  Chunks             Chunk Names                                                                                                                                                                                                
app.fd91042c257b2ba67caa.js    2.48 kB       0  [emitted]  app                                                                                                                                                                                                        
                 index.html  195 bytes          [emitted]                                                                                                                                                                                                             
   [0] ./src/app.js 236 bytes {0} [built]                                                                                                                                                                                                                             
       factory:15ms building:19ms = 34ms                                                                                                                                                                                                                              
   [1] ./src/a.js 360 bytes {0} [built]                                                                                                                                                                                                                               
       [0] 34ms -> factory:1ms building:6ms = 41ms                                                                                                                                                                                                                    
   [2] ./src/c.js 41 bytes {0} [built]                                                                                                                                                                                                                                
       [0] 34ms -> [1] 7ms -> factory:1ms building:389ms = 431ms                                                                                                                                                                                                      
Child html-webpack-plugin for "index.html":                                                                                                                                                                                                                           
        + 3 hidden modules 
```