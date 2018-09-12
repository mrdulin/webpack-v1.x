define(() => {
	return {
		moduleName: 'b',
		appendLink: ({text, url, target, el}) => {
			const link = document.createElement('a');
			const textNode = document.createTextNode(text);
			link.appendChild(textNode);
			link.href = url;
			link.target = target;
			el.appendChild(link);
		}
	}
})
