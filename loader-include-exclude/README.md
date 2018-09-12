# `include`和`exclude`

指定进行`loader`操作的资源匹配规则，`include`和`exclude`可以是以下值：

*	正则表达式
* 	字符串
*	数组
*	函数

本例中，观察最后编译出的文件，可以看到`b.js`的es6语法没有经过`babel-loader`转换，`a.js`的被转换了。

__尽可能的使用`include`而不是`exclude`，来指定必须经过`loader`操作的资源匹配规则__
