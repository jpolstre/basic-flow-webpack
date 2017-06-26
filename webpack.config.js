const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config ={
	entry:{
		main:__dirname+'/src/js/main.js',
	},
	
	output:{
		path:__dirname+'/dist/js',
		publicPath:'/',
		filename:'[name].bundle.js'
	},
	module:{
		// loaders:[
		// 	{ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
		// ] ok.

		rules: [
		{
			test: /\.styl$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				//resolve-url-loader may be chained before sass-loader if necessary
				use: ['css-loader', 'stylus-loader']
			})
		}
		]
	},

	plugins:[
		new webpack.optimize.UglifyJsPlugin(),//only production.
		new ExtractTextPlugin({
			filename:  (getPath) => {
				return getPath('../css/[name].css');
			},
			allChunks: true
		}),
		new OptimizeCssAssetsPlugin()
	]

	};
	module.exports = config;