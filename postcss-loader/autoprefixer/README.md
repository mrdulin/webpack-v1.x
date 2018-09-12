`webpack -p`

```css
.flex{display:-webkit-box;display:-ms-flexbox;display:flex}.flex-1{-webkit-box-flex:1;-ms-flex:1;flex:1}
```

`webpack`

```css
.flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex; }

.flex-1 {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1; }
```

生产环境的样式前缀少了，原因：https://github.com/postcss/autoprefixer#faq

__几点说明：__

*   Autoprefixer使用https://github.com/ai/browserslist来指定浏览器版本

*   http://browserl.ist/?q=Last+5+versions 查看指定条件的浏览器版本

*   `Browserslist`已Can I use网站的浏览器版本作为基准

*   推荐的配置目标浏览器的方式是使用`browserslist.txt`文本文件配置，或者在`package.json`指定`browserslist`字段，放在项目的根目录

*   默认地，`Autoprefixer`移除过期的样式前缀，你可以通过设置`remove: false`来禁用移除过期的样式前缀。如果项目中没有老旧代码，通过设置该选项，可以使`Autoprefixer`的处理速度加快10%

*   设置`add: false`选项，`Autoprefixer`仅会清除过期的样式前缀，不会添加任何前缀。

*   `Autoprefixer`会给未添加前缀的和已经添加部分前缀的样式添加前缀，但这样可能会导致前缀样式的顺序不对，解决办法是先清除所有的前缀，然后再添加前缀.

```js
var cleaner  = postcss([ autoprefixer({ add: false, browsers: [] }) ]);
var prefixer = postcss([ autoprefixer ]);

cleaner.process(css).then(function (cleaned) {
    return prefixer.process(cleaned.css)
}).then(function (result) {
    console.log(result.css);
});
```


