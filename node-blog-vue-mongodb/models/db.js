
/*var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

module.exports = new MongoClient(new Server('localhost', 27017));*/


/*var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

module.exports = new Db('blog', new Server('localhost',27017), {safe: true});*/

var mongoose=require('mongoose')
console.log('建立mongoose连接')

var dbURL='mongodb://localhost:27017/blog'

mongoose.connect(dbURL)
mongoose.connection.on('connected',function(){
   console.log('mongoose default connection open to :'+dbURL)
})

mongoose.connection.on('error',function(err){
   console.log('mongoose连接错误:'+err)
})

mongoose.connection.on('disconnected',function(err){
   console.log('mongoose没有连接上')
})

process.on('SIGNIT',function(){
	mongoose.connection.close(function(){
		console.log('mongoose default connection disconnected through app termination')
	})
})
module.exports = mongoose;

