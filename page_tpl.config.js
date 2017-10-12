var htmlWebpackPlugin = require('html-webpack-plugin');

var pageTplConfig = [
	new htmlWebpackPlugin({
		title: "2017，U你一起AI！",
		filename: "index.html",
		//template: "html-withimg-loader!./src/pages/index.html",
		template: "./src/pages/index.html",
		inject: "body"
	})
]

module.exports = pageTplConfig;