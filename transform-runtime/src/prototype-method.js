//直接使用基本类型，原型上的方法，打包时，transform-runtime不会添加core-js中相应的polyfill方法
const names = ['react', 'webpack', 'redux'];
names.findIndex((name, idx) => name === 'webpack');
names.includes('angular');
