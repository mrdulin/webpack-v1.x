var moduleName = 'b module';
Util.sayName(moduleName);
const b = {
	getLength: () => {
		return _.size([1,2,3,4,5])
	}
}

module.exports = b;
