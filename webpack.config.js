const path=require('path')
const webpack=require('webpack')

var config={
	entry: ["babel-polyfill", "./src/main.jsx"],
	output:{
		path: path.join(__dirname,'reactgen'),
		publicPath: '/reactgen/',
		filename: "ReactApp.js"
	},
	devServer:{
		port: 3000,
		inline: true
	},
	module: {
		loaders: [
		{
			test: /\.jsx?$/,
			exclude:/node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015','react'],
				plugins: ['transform-decorators-legacy']
			}
		}
		]
	}
}

module.exports = config;