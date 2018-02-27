const express=require("express");
const fs=require("fs");
const path=require("path");
const morgan = require('morgan');
const cookieParser= require('cookie-parser');
const bodyParser= require('body-parser');
const session= require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const historyApiFallback = require('connect-history-api-fallback');
const options = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'ws@1992',
        database: 'blogSession'
    };
const routes=require('./route/index')
const settings= require('./settings');
const app=express();
const accessLogfile=fs.createWriteStream(path.join(__dirname, 'log/access.log'),{flags:'a'});
const errorLogfile=fs.createWriteStream(path.join(__dirname, 'log/err.log'),{flags:'a'});

app.use(morgan('combined', {stream: accessLogfile}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use('/', historyApiFallback());
app.use('/',express.static(path.join(__dirname, 'public/dist')));


app.use(session({
  name: settings.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: settings.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
     maxAge: settings.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store:new MySQLStore(options),
  resave: false,
  saveUninitialized: false
})
);

app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    })
    next()
})

app.use('/api', routes);
app.use(function(err, req, res, next) {
    var meta='['+new Date()+']'+req.url+'\n';
    errorLogfile.write(meta+err.stack+'\n');
});

app.listen(8090, function() {
  console.log('Express server listening on port 8090' );
});
