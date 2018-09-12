import path from 'path';
import htmlWebpackPlugin from 'html-webpack-plugin';

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

export default {
	entry: src + '/index.js',
	output: {
		path: dist,
		filename: 'bundle.js'
	},
	plugins: [
		new htmlWebpackPlugin()
	]
}
