'use strict'

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let production = process.env.NODE_ENV === 'production'

module.exports = {
	devtool:production?'cheap-module-source-map':'cheap-module-eval-source-map',
	entry:{app: ['./src/index'],
         vendor: ['react'] //提取react模块作为公共的js文件
	},
	output: {
		path: path.join(__dirname, '../dist'),
		filename:production?'js/[name].[chunkhash].js':'[name].js',
		sourceMapFilename: '[file].map',
		publicPath:'/',
		chunkFilename: 'js/[name].[chunkhash].js',
	},
  resolve: {
        extensions: ['.js', '.jsx'],
        alias: {'@': path.join(__dirname, '..', 'src')}
  },
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
			},
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /.(css|scss)$/,
        loader: production?
               ExtractTextPlugin.extract({fallback:'style-loader',use:[{loader:'css-loader',options:{minimize: true}},'postcss-loader','sass-loader']})
               :'style-loader!css-loader!postcss-loader!sass-loader'
      },
			{
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      },
      { test: /\.(png|jpg|jpeg|gif)$/,
        use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192,
                    name: 'img/[name].[ext]'
                  }
                }
              ]
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: 'file-loader?name=[hash:12].[ext]'
      }

		]
	},
  plugins:[
  	new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
  			 filename: './index.html', //生成的html存放路径，相对于path
  			 template: './index.html', //html模板路径
  			 inject: 'body', //js插入的位置，true/'head'/'body'/false
  			 //chunks: ['index'],//需要引入的chunk，不配置就会引入所有页面的资源
  			 minify: { //压缩HTML文件
  					 removeComments: true, //移除HTML中的注释
  					 collapseWhitespace: false //删除空白符与换行符
  			 }
    }),
  ],
}
