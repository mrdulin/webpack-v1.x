# babel-loader

有时候开发打包的时候，出现如下提示：

```bash
44% 138/239 build modules[BABEL] Note: The code generator has deoptimised the styling of "/Users/dulin/workspace/mall-wap/app/common/js/GlobalReducers.js" as it exceeds the max of "100KB".
```
去除这个提示的方法是配置`babel-loader`的`query`对象`{compact: false}`

`babel`文档上：
`compact` `"auto"`	Do not include superfluous whitespace characters and line terminators. When set to "auto" compact is set to true on input sizes of >500KB.
Ï
实验结果：

`compact`: true，输出：
```js
/* 0 */
/***/ function(module, exports) {

	const init=()=>{alert('123');};document.addEventListener('DOMContentLoaded',init);

/***/ }
```

代码被压缩了。

`compact`: false，输出：

```js
/* 0 */
/***/ function(module, exports) {

	const init = () => {
		alert('123');
	};
	document.addEventListener('DOMContentLoaded', init);

/***/ }
```

代码没有被压缩。

`compact`: `'auto'`，输出

```js
/* 0 */
/***/ function(module, exports) {

	const init = () => {
		alert('123');
	};
	document.addEventListener('DOMContentLoaded', init);

/***/ }
```

代码没有被压缩，根据文档描述，只有当输入到`babel-loader`的文件尺寸大于`500KB`的时候，会被设置为true，即压缩代码。
