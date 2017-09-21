const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const webpack  = require('webpack');

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

const plugin = new ExtractTextPlugin({
  filename: '[name].css',
  ignoreOrder: true
});

module.exports = {
	devtool: 'source-map',
	entry: {
		// app: PATHS.app
		index: './app/index.js',
		about: './app/about.js',
		vendor: ['react']
	},
	output:{
		path: PATHS.build,
		filename: '[name].js'
	},
	devServer: {
		contentBase: PATHS.build,//本地服务器所加载的页面所在的目录
	    historyApiFallback: true,
	    inline: true,//实时刷新
	    //注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
	    port: 80,//默认为8080端口
	    /* 报错和警告覆盖层，将该些信息展示在页面上 */
	    overlay: {
	      errors: true,
	      warnings: true,
	    },
	    hotOnly: true //HMR
	},
	// /* 包大小限制*/
	// performance: {
	//     hints: 'warning', // 'error'
	//     maxEntrypointSize: 100000, // bytes
	//     maxAssetSize: 450000, // bytes
	//   },
	module:{
	    rules:[
	      {
	        test: /\.js$/,
	        enforce: 'pre',

	        loader: 'eslint-loader',
	        options: {
	          emitWarning: true,
	        },
	      },
	      {
	        test: /\.css$/,
	        exclude: /node_modules/,
	        use: plugin.extract({
	          use: {
	            loader: 'css-loader',
	            options: {
	              modules: true,
	            },
	          },
	          fallback : 'style-loader',
	        }),
	      },
	    ],
	  },
	plugins: [
		// new HtmlWebpackPlugin({
		// 	title: 'webpack demo'
		// }),
		plugin,
		new BabiliPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
      		name: 'vendor',
    }),
		new webpack.HotModuleReplacementPlugin(), //HMR --hot
	]
};