module.exports = function(checkKeys, checkResults, obj) {

	var checkObj = {};
	checkKeys.map(function(key) {
		checkObj[key] = obj[key];
	})

	Object.keys(checkObj).map(function(value, index) {
		checkObj[value] = !(checkResults.indexOf(value) === -1);
	});


	return Object.assign({}, obj, checkObj);



////////////////////
	// var checkValues = ['a', 'b'];
	// var checkObj = {
	// 	a: true,
	// 	b: true,
	// 	c: true
	// }
	// var obj = {
	// 	d: true,
	// 	e: '123'
	// }

	// Object.keys(checkObj).map(function(value, index) {
	// 	checkObj[value] = !(checkValues.indexOf(value) === -1);
	// });

	// var finalObj = Object.assign({}, obj, checkObj);

	// console.log(finalObj);

}
