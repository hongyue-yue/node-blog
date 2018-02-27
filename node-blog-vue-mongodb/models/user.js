//var mongoClient=require('./db.js');
/*var mongodb = require('./db')
function User(user){
   this.name=user.name;
   this.password=user.password;
}

module.exports=User


User.get=function(username,callback){
    mongodb.open(function(err,db){
         if(err){
           console.log('连接失败');
           return callback(err,null)
         }
         //var db=mongoClient.db("blog");
           console.log('连接成功')
           db.collection('users',function(err,collection){
            if(err){
              mongodb.close();
              return callback(err,null);
            }
            collection.findOne({name:username},function(err,doc){

                 mongodb.close()
                 if(err){
                  callback(err,null)
                 }else{
                   callback(null,doc)
                 }
            })
         })

    })
}

User.prototype.save=function(callback){
   var user={
     name:this.name,
     password:this.password
   }
   mongodb.open(function(err,db){
        if(err){
          console.log('连接失败');
          return callback(err,null)
        }
        //var db=mongoClient.db("blog");

           console.log('连接成功')
           db.collection('users',function(err,collection){
               if(err){
                 mongodb.close();
                 return callback(err,null);
               }
           collection.insert(user,{safe:true},function(err,users){
              mongodb.close();
              console.log("222"+users)
              if(err){
                callback(err,null)
              }else{
                callback(null, users);
              }
           })
        })

   })
}*/

var mongoose = require('./db')

var Schema=mongoose.Schema;
 
var userSchema=new Schema({
   name:String,//账号
   password:String,//密码
})

module.exports=mongoose.model('users',userSchema)
