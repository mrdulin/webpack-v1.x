__DEV__ && console.log('enabled react action log');
if(__PROD__) {
	console.log('disabled react action log');
}

// console.log('__String1__', __String1__)
console.log('__String2__', __String2__)
console.log('__Boolean1__', __Boolean1__)
console.log('__Boolean2__', __Boolean2__)
console.log('__Number1__', __Number1__)
console.log('__Number2__', __Number2__)

console.log('__Object__', __Object__.name, __Object__.age);

console.log('__Function1__', __Function1__());
console.log('__Array__', __Array__)

console.log(process.env.NODE_ENV);

var NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);

if(process.env.NODE_ENV === 'production') {
	console.log('production');
}