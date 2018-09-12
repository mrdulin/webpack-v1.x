# file-loader

_基本用法：_

```js
const url = require('./images/1.jpg');
```

默认地，`require`的文件编译后，文件名会替换为`MD5``hash`，文件扩展名不变。

_文件名模板：_

可以通过`loader`的查询字符串`name`字段指定文件名模板。例如，如果要拷贝一个文件到编译后的目录中，并且还要保持源文件的完整目录结构，可以使用`?name[path][name].[ext]`。

_文件名模板占位符：_

*	`[ext]`资源文件的扩展名
*	`[name]`资源文件名
*	`[path]`资源相对于查询字符串`context`的路径
*	`[hash]`哈希值
* 	`[<hashType>:hash:<digestType>:<length>]` 待续


例子：

```js
require("file?name=js/[hash].script.[ext]!./javascript.js");
// => js/0dcbbaa701328a3c262cfd45869e351f.script.js

require("file?name=html-[hash:6].html!./page.html");
// => html-109fa8.html

require("file?name=[hash]!./flash.txt");
// => c31e9820c001c9c4a86bce33ce43b679

require("file?name=[sha512:hash:base64:7].[ext]!./image.png");
// => gdyb21L.png
// use sha512 hash instead of md5 and with only 7 chars of base64

require("file?name=img-[sha512:hash:base64:7].[ext]!./image.jpg");
// => img-VqzT5ZC.jpg
// use custom name, sha512 hash instead of md5 and with only 7 chars of base64

require("file?name=picture.png!./myself.png");
// => picture.png

require("file?name=[path][name].[ext]?[hash]!./dir/file.png")
// => dir/file.png?e43b20c069c4a01867c31e98cbce33c9
```
