/*var mongodb = require('./db')


function Post(posts){
   this.user=posts.user;
   this.post=posts.post;
   if(posts.time){
     this.time=posts.time;
   }else{
     this.time=new Date();
   }
}

module.exports=Post;

Post.get=function(username,callback){
     mongodb.open(function(err,db){
      if(err){
        console.log('连接失败')
        return callback(err,null)
      }
      //var db=mongoClient.db("blog");
        console.log('连接成功')
         db.collection("posts",function(err,collection){
               if(err){
                 return callback(err,null)
               }
               var query={};
               if(username){
                 query.user=username;
               }
               collection.find(query).sort({time:-1}).toArray(function(err,arr){
                   mongodb.close();
                   if (err) {
                      callback(err, null);
                   }else{
                     var posts=[];
                     arr.forEach(function(doc,index){
                        var post={
                           name:doc.user,
                           post:doc.post,
                           time:doc.time
                        }
                        posts.push(post);
                     })
                     callback(null,posts);
                   }
              })
          })
    })
}

Post.prototype.save=function(callback){
    var post={
      user:this.user,
      post:this.post,
      time:this.time
    };
    mongodb.open(function(err,db){
        if(err){
          console.log('连接失败')
          return callback(err,null)
        }
        //var db=mongoClient.db("blog");

          db.collection("posts",function(err,collection){
             if(err){
                mongodb.close();
                return callback(err,null)
             }
             collection.insert(post,{safe:true},function(err,posts){
               mongodb.close();
               if(err){
                 callback(err,null)
               }else{
                 callback(null, posts);
               }
             })
          })
    })
}*/

var mongoose = require('./db')

var Schema=mongoose.Schema;
 
var postSchema=new Schema({
   user:String,//昵称
   post:String,//留言
   createDate:Date,//留言时间
})

module.exports=mongoose.model('posts',postSchema)

