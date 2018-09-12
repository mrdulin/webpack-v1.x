window.onload = function() {
	var loadCommon = document.getElementById('load-commonjs-module');

	function appendPara(content, el) {
			var p = document.createElement('p');
			var txt = document.createTextNode(content);
			p.appendChild(txt);
			el.appendChild(p);
	}

	loadCommon.onclick = function() {
		require.ensure(['./common-module/a.js'], function(require) {
			var a = require('./common-module/a.js');
			appendPara(a.name, document.body);
		});
	}

	var loadAmd = document.getElementById('load-amd-module');
	loadAmd.onclick = function() {
		require(['./amd-module/b.js'], function(b) {
			appendPara(b.name, document.body);
		})
	}
}
