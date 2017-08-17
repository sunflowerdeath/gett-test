const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let DEBUG = process.env.NODE_ENV !== 'production'
let WATCH = process.env.NODE_WATCH !== 'true'

let plugins = [
	new HtmlWebpackPlugin({
		template: 'src/index.html',
		title: 'Gett test'
	})
]

if (DEBUG) {
	plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, '..', 'gett_test2', 'static'),
		filename: 'bundle.js',
		publicPath: DEBUG ? '' : '/static/'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [
					path.resolve(__dirname, 'src')
				],
				loader: 'babel-loader',
				options: {
					presets: [
						['env', {
						  targets: {
							browsers: ['last 2 versions', 'safari >= 7']
						  }
						}],
						'react'
					]
				}
			}
		],
	},

	devtool: (DEBUG || WATCH) ? 'source-map' : false,

	resolve: {
		alias: {
			'@api': path.resolve(__dirname, 'src', DEBUG ? 'fakeApi.js' : 'api.js')
		}
	},

	devServer: {
		disableHostCheck: true,
		contentBase: path.join(__dirname, '..', 'static'),
		hot: true
	},

	plugins: plugins
}
