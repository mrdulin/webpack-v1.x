# noParse

This disables parsing by webpack. Therefore you cannot use dependencies. This may be useful for prepackaged libraries.

*	该属性指定不需要被`webpack`解析的文件匹配规则（正则或者绝对路径）
*	指定的文件必须是独立的不依赖其他模块的，不能有`require`，因为`webpack`已经不会去解析了
*	观察编译后的文件，noParse的模块`purecss`和`react`直接被打包进了编译后的文件
*	`react-dom`不能加入`noParse`，会报错`Uncaught ReferenceError: require is not defined`

没有`noParse`时，编译输出:

```bash
dulin@dulindeiMac:~/workspace/webpack-summer/noParse (master*=) % ./build.sh
Hash: ae94e429ab48102c2077
Version: webpack 1.13.1
Time: 1403ms
                          Asset       Size  Chunks             Chunk Names
    app.ae94e429ab48102c2077.js     161 kB       0  [emitted]  app
app.ae94e429ab48102c2077.js.map     190 kB       0  [emitted]  app
                     index.html  215 bytes          [emitted]
   [0] ./src/app.js 444 bytes {0} [built]
       factory:37ms building:316ms = 353ms
   [1] ../~/purecss/build/pure-min.css 876 bytes {0} [built]
       [0] 353ms -> factory:373ms building:2ms = 728ms
   [2] ../~/css-loader!../~/purecss/build/pure-min.css 17.5 kB {0} [built]
       [0] 353ms -> [1] 375ms -> factory:0ms building:380ms = 1108ms
   [3] ../~/css-loader/lib/css-base.js 1.51 kB {0} [built]
       [0] 353ms -> [1] 375ms -> [2] 380ms -> factory:1ms building:14ms = 1123ms
   [4] ../~/style-loader/addStyles.js 7.15 kB {0} [built]
       [0] 353ms -> [1] 375ms -> factory:243ms building:145ms = 1116ms
   [5] ./src/util.js 314 bytes {0} [built]
       [0] 353ms -> factory:12ms building:359ms = 724ms
   [6] ../~/react/react.js 56 bytes {0} [built]
       [0] 353ms -> factory:371ms building:246ms = 970ms
   [7] ../~/react/lib/React.js 2.62 kB {0} [built]
       [0] 353ms -> [6] 617ms -> factory:22ms building:125ms = 1117ms
   [8] (webpack)/~/node-libs-browser/~/process/browser.js 2.12 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:23ms building:55ms = 1195ms
   [9] ../~/object-assign/index.js 1.99 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:9ms building:67ms = 1193ms
  [10] ../~/react/lib/ReactChildren.js 6.22 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:7ms building:17ms dependencies:1ms = 1142ms
  [11] ../~/react/lib/PooledClass.js 3.6 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [10] 24ms -> factory:41ms building:28ms dependencies:0ms = 1210ms
  [12] ../~/react/lib/reactProdInvariant.js 1.27 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [25] 34ms -> factory:38ms building:25ms = 1214ms
  [13] ../~/fbjs/lib/invariant.js 1.49 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [25] 34ms -> factory:39ms building:29ms dependencies:0ms = 1219ms
  [14] ../~/react/lib/ReactElement.js 12.2 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:7ms building:57ms dependencies:10ms = 1191ms
  [15] ../~/react/lib/ReactCurrentOwner.js 657 bytes {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [14] 64ms -> factory:14ms building:24ms = 1219ms
  [16] ../~/fbjs/lib/warning.js 1.75 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:66ms building:25ms dependencies:1ms = 1209ms
  [17] ../~/fbjs/lib/emptyFunction.js 1.08 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [10] 24ms -> factory:48ms building:25ms = 1214ms
  [18] ../~/react/lib/canDefineProperty.js 632 bytes {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [22] 39ms -> factory:35ms building:27ms dependencies:0ms = 1218ms
  [19] ../~/react/lib/traverseAllChildren.js 6.38 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [10] 24ms -> factory:48ms building:24ms dependencies:0ms = 1213ms
  [20] ../~/react/lib/getIteratorFn.js 1.15 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [35] 48ms -> factory:27ms building:33ms = 1225ms
  [21] ../~/react/lib/KeyEscapeUtils.js 1.32 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [10] 24ms -> [19] 72ms -> factory:6ms building:8ms = 1227ms
  [22] ../~/react/lib/ReactComponent.js 4.64 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:7ms building:32ms dependencies:35ms = 1191ms
  [23] ../~/react/lib/ReactNoopUpdateQueue.js 3.35 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [25] 34ms -> factory:39ms building:27ms dependencies:0ms = 1217ms
  [24] ../~/fbjs/lib/emptyObject.js 458 bytes {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [25] 34ms -> factory:39ms building:27ms dependencies:0ms = 1217ms
  [25] ../~/react/lib/ReactClass.js 26.7 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:7ms building:27ms dependencies:32ms = 1183ms
  [26] ../~/react/lib/ReactPropTypeLocations.js 552 bytes {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [25] 34ms -> factory:39ms building:25ms dependencies:0ms = 1215ms
  [27] ../~/fbjs/lib/keyMirror.js 1.25 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [25] 34ms -> factory:40ms building:26ms dependencies:1ms = 1218ms
  [28] ../~/react/lib/ReactPropTypeLocationNames.js 614 bytes {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [25] 34ms -> factory:39ms building:26ms dependencies:0ms = 1216ms
  [29] ../~/fbjs/lib/keyOf.js 1.1 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [25] 34ms -> factory:40ms building:27ms = 1218ms
  [30] ../~/react/lib/ReactDOMFactories.js 3.34 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:7ms building:35ms dependencies:0ms = 1159ms
  [31] ../~/fbjs/lib/mapObject.js 1.44 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [30] 42ms -> factory:33ms building:27ms = 1219ms
  [32] ../~/react/lib/ReactElementValidator.js 8.06 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:8ms building:62ms dependencies:8ms = 1195ms
  [33] ../~/react/lib/ReactComponentTreeDevtool.js 7.38 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [32] 70ms -> factory:9ms building:28ms dependencies:0ms = 1224ms
  [34] ../~/react/lib/checkReactTypeSpec.js 3.6 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> [32] 70ms -> factory:9ms building:30ms dependencies:0ms = 1226ms
  [35] ../~/react/lib/ReactPropTypes.js 13.7 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:7ms building:41ms dependencies:25ms = 1190ms
  [36] ../~/react/lib/ReactVersion.js 382 bytes {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:7ms building:53ms = 1177ms
  [37] ../~/react/lib/onlyChild.js 1.36 kB {0} [built]
       [0] 353ms -> [6] 617ms -> [7] 147ms -> factory:8ms building:35ms dependencies:31ms = 1191ms
  [38] ../~/react-dom/dist/react-dom.min.js 709 bytes {0} [built]
       [0] 353ms -> factory:355ms building:17ms dependencies:245ms = 970ms
```

添加`noParse`后，编译输出：

```bash
dulin@dulindeiMac:~/workspace/webpack-summer/noParse (master*=) % ./build.sh
Hash: 0938ba048ca4e7452044
Version: webpack 1.13.1
Time: 1238ms
                          Asset       Size  Chunks             Chunk Names
    app.0938ba048ca4e7452044.js     184 kB       0  [emitted]  app
app.0938ba048ca4e7452044.js.map     223 kB       0  [emitted]  app
                     index.html  215 bytes          [emitted]
   [0] ./src/app.js 444 bytes {0} [built]
       factory:36ms building:315ms = 351ms
   [1] ../~/purecss/build/pure-min.css 876 bytes {0} [built]
       [0] 351ms -> factory:375ms building:2ms = 728ms
   [2] ../~/css-loader!../~/purecss/build/pure-min.css 17.5 kB {0} [built]
       [0] 351ms -> [1] 377ms -> factory:0ms building:347ms = 1075ms
   [3] ../~/css-loader/lib/css-base.js 1.51 kB {0} [built]
       [0] 351ms -> [1] 377ms -> [2] 347ms -> factory:21ms building:9ms = 1105ms
   [4] ../~/style-loader/addStyles.js 7.15 kB {0} [built]
       [0] 351ms -> [1] 377ms -> factory:235ms building:140ms = 1103ms
   [5] ./src/util.js 314 bytes {0} [built]
       [0] 351ms -> factory:11ms building:362ms = 724ms
   [6] ../~/react/dist/react.min.js 153 kB {0} [built]
       [0] 351ms -> factory:357ms building:16ms = 724ms
   [7] ../~/react-dom/dist/react-dom.min.js 709 bytes {0} [built]
       [0] 351ms -> factory:358ms building:16ms dependencies:1ms = 726ms
```

很明显不一样。
