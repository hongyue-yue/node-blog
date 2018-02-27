var express=require("express");
var fs=require("fs");
var path=require("path");
var morgan = require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser= require('body-parser');
var session= require('express-session');
var MongoStore= require('connect-mongo')(session);
var settings= require('./settings');
var flash= require('connect-flash');
var routes=require('./route/index')
var app=express()
var accessLogfile=fs.createWriteStream(path.join(__dirname, 'log/access.log'),{flags:'a'});
var errorLogfile=fs.createWriteStream(path.join(__dirname, 'log/err.log'),{flags:'a'});

app.use(morgan('combined', {stream: accessLogfile}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use('/',express.static(path.join(__dirname, 'dist')));
app.use(flash());

app.use(session({
  name: settings.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: settings.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
     maxAge: settings.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
     url: 'mongodb://127.0.0.1:27017/blog'// mongodb 地址
  })
}));
app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        //'Content-Type': 'application/json;charset=utf-8'
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    })
    next()
})
app.use('/', routes);
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    var meta='['+new Date()+']'+req.url+'\n';
    errorLogfile.write(meta+err.stack+'\n');
});

app.listen(8090, function() {
  console.log('Express server listening on port 8090' );
});
