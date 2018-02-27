var express=require('express');
var router=express.Router();
var crypto=require('crypto');
var User=require("../models/user.js")
var Post=require("../models/post.js")



router.post('/login',function(req,res){
   var md5=crypto.createHash("md5")
   var password = md5.update(req.body.password).digest('base64');
   var username=req.body.name;
   //res.send({state:1,username:req.body.name})
   /*User.get(req.body.name,function(err,user){
        if(err){
          console.log("服务器错误，请稍后重试")
          res.send({state:0,message:"服务器错误，请稍后重试"});
        }else if(!user) {
          console.log("用户不存在")
          res.send({state:0,message:"用户不存在"});
        }else if(user.password!=password){
          console.log("密码错误")
          res.send({state:0,message:"密码错误"});
        }else{
          res.send({state:1,username:user.name});
          req.session.user = user.name;
        }
   })*/
   User.findOne({name:username},function(err,user){
        if(err){
          console.log("服务器错误，请稍后重试")
          res.send({state:0,message:"服务器错误，请稍后重试"});
        }else if(!user) {
          console.log("用户不存在")
          res.send({state:0,message:"用户不存在"});
        }else if(user.password!=password){
          console.log("密码错误")
          res.send({state:0,message:"密码错误"});
        }else{
          res.send({state:1,username:user.name});
          req.session.user = user.name;
        }
   })
});
router.get('/logout',function(req,res){
     req.session.user = null;
     res.send({state:1,username:null})
})
router.post('/reg',function(req,res){
     var md5=crypto.createHash("md5")
     var password = md5.update(req.body.password).digest('base64');
     var user=new User({name:req.body.name,password:password});

     /*User.get(req.body.name,function(err,doc){
        if(doc){
           res.send({state:0,message:"用户已存在"});
        }else{
          user.save(function(err,users){
            if(err){
              res.send({state:0,message:"服务器错误，请稍后重试"})
            }else if(users){
              res.send({state:1})
              req.session.user = user.name;
            }
          })
        }
     })*/
     User.findOne({name:req.body.name},function(err,doc){
        if(doc){
           res.send({state:0,message:"用户已存在"});
        }else{
           user.save(function(err,users){
                if(err){
                   res.send({state:0,message:"服务器错误，请稍后重试"})
                }else if(users){
                   res.send({state:1})
                   req.session.user = user.name;
                }
           })
        }
     })
});

router.get('/post?*',function(req,res){
   var username,query={};
   if(req.query.name){
     query.user=req.query.name
   }else{
     query={};
   }
   //res.send({state:1,posts:[{name:'dsaf',post:'fdadfads',time:'20170223'}]})
   /*Post.get(username,function(err,posts){
        if(err){
          res.send({state:0,message:"服务器错误，请稍后重试"})
        }else{
          res.send({state:1,posts:posts})
        }
   })*/
   //console.log(Post.find(query).sort({time:-1}))
   Post.find(query).sort({time:-1}).exec(function(err,arr){
   //Post.find(query,null,{sort:{time:-1}},function(err,arr){
        if(err){
          res.send({state:0,message:"服务器错误，请稍后重试"})
        }else{
          var posts=[];
          for(var doc of arr){
             var post={
                name:doc.user,
                post:doc.post,
                time:doc.time
             }
            posts.push(post);
          }
          res.send({state:1,posts:posts})
        }
   })
})
router.post('/post',function(req,res){
      var post=new Post({
        user:req.body.name,
        post:req.body.post,
        createDate:req.body.time
      })
      post.save(function(err,posts){
        if(err){
          res.send({state:0,message:"服务器错误，请稍后重试"})
        }else if(posts){
          res.send({state:1,posts:posts})
        }
      })
})
module.exports=router;
