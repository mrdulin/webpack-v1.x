document.addEventListener('DOMContentLoaded', init);

var dynamicModules = ['a', 'b', 'c'];

function init() {
	document.getElementById('loadModule').addEventListener('click', handleLoadModule, false);
	document.getElementById('loadModule2').addEventListener('click', handleLoadModule2, false);
	document.querySelectorAll('.lazyloadModule').forEach(function(btn) {
		btn.addEventListener('click', handleLazyloadModule, false);
	})
}

function handleLoadModule(e) {
	loadModules(dynamicModules);
}

function handleLoadModule2(e) {
	loadModules2(dynamicModules);
}

function handleLazyloadModule(e) {
	var moduleName = '';
	var target = e.target;
	moduleName = target.dataset.moduleName;
	var layzLoadModuleMap = loadModuleLazy(dynamicModules);
	layzLoadModuleMap[moduleName](function(module) {
		console.log('lazyloadModule is ' + module);
	})
}

//使用bundle-loader，webpack将按需加载的模块打包成各自的chunk
/**
 *                     Asset       Size  Chunks             Chunk Names
main.578f7acc27e1b3282a34.js    6.56 kB       0  [emitted]  main
                      1.1.js  203 bytes       1  [emitted]
                      2.2.js  203 bytes       2  [emitted]
                      3.3.js  203 bytes       3  [emitted]
                  index.html  232 bytes          [emitted]
 */
// function loadModules(names) {
// 	names.forEach(function(name) {
// 		require("bundle!./modules/" + name + ".js")(function(module) {
// 			console.log(module);
// 		});
// 	})
// }

function loadModuleLazy(names) {
	var layzLoadModuleMap = {};
	names.forEach(function(name) {
		layzLoadModuleMap[name] = require('bundle-loader?lazy!./modules/'+name+'.js');
	});
	return layzLoadModuleMap;
}

//使用require.ensure, webpack将按需加载的模块打包成了一个chunk
/**
*					   Asset       Size  Chunks             Chunk Names
main.4a55e481021fefc6435e.js    4.66 kB       0  [emitted]  main
                      1.1.js    1.23 kB       1  [emitted]
                  index.html  279 bytes          [emitted]
 */
// function loadModules2(names) {
// 	names.forEach(function(name) {
// 		require.ensure([], function(require) {
// 			var reqWithCtx = require.context('./modules/', true, /\.js$/);
// 			var module = reqWithCtx(name);
// 			console.log(module);
// 		});
// 	});
// }

