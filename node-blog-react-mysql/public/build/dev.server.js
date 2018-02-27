'use strict'

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig=require('./webpack.base.config.js')
const historyApiFallback = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');

let options={
	'/api':{
	   target:'http://localhost:8090', // target host
     changeOrigin: true,
     pathRewrite: {
    	 '^/api': '/api'
     }
	}
}
const app = express()
const compiler = webpack(webpackConfig)

app.use('/', historyApiFallback());
app.use('/api', proxy({target: 'http://localhost:8090/', changeOrigin: true}));

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)


app.use(hotMiddleware);
app.use(devMiddleware);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');

});
