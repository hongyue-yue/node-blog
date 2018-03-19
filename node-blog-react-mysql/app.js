const express=require("express");
const fs=require("fs");
const path=require("path");
const morgan = require('morgan');
const cookieParser= require('cookie-parser');
const bodyParser= require('body-parser');
const session= require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const historyApiFallback = require('connect-history-api-fallback');

const { md5 }=require('./models/com.js');
const routes=require('./route/index');
const users=require('./route/user');

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

app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    })
    next()
})

app.use('/api',function(req, res, next){
  //console.log(req.cookies)
  if(req.cookies){
   var secret=req.cookies.secret;
   var seArray=secret.split('&&');
   var name=seArray[0].split(':')[1];
   var hash=seArray[1].split(':')[1];
   //console.log(hash,name);
   var key=name+'&&'+settings.session.secret;
   //console.log(hash,key);
   var hashTwo = md5(key);
   //console.log(hash,hashTwo);
   if(hash===hashTwo){
      next()
   }else{
      res.send({state:503,message:"请登录"})
   }
 }else{
    res.send({state:503,message:"请登录"})
 }
});
app.use('/api', routes);
app.use('/user', users);
app.use(function(err, req, res, next) {
    var meta='['+new Date()+']'+req.url+'\n';
    errorLogfile.write(meta+err.stack+'\n');
});

app.listen(8090, function() {
  console.log('Express server listening on port 8090' );
});
