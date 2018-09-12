define(['./c.js'], function() {
	return {
		appendLink: function(options) {
			const linkNode = document.createElement('a');
			const textNode = document.createTextNode(options.text);
			linkNode.appendChild(textNode);
			linkNode.href = options.url;
			linkNode.target = options.target;
			options.el.appendChild(linkNode);
			console.log(c.name);
		}
	}
});
