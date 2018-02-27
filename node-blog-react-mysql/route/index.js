const express=require('express');
const router=express.Router();
const crypto=require('crypto');
const User=require("../models/user.js")
const Post=require("../models/post.js")

router.post('/login',function(req,res){
	var md5=crypto.createHash("md5")
    var password = md5.update(req.body.password).digest('base64');
	User.findOne({ where: {name: req.body.name} }).then(user=>{
		if(!user){
		  console.log("用户不存在")
          res.send({state:400,message:"用户不存在"});
      }else if(user.password!=password){
      	  console.log("密码错误")
          res.send({state:400,message:"密码错误"});
      }else{
          res.send({state:200,username:user.name});
          req.session.user = user.name;
      }
	}).catch(err=>{
		console.log(err)
        res.send({state:500,message:"服务器错误，请稍后重试"});
	})
});

router.get('/logout',function(req,res){
     req.session.user = null;
     res.send({state:200,message:"已退出"})
})

router.post('/reg',function(req,res){
     var md5=crypto.createHash("md5")
     var password = md5.update(req.body.password).digest('base64');
     User.findOne({ where: {name: req.body.name}}).then(user=>{
     	if(user){
     		res.send({state:400,message:"用户已存在"});
     	}else{
     		User.create({name:req.body.name,password:password}).then(user=>{
                 res.send({state:200,message:"注册成功",username:user.name})
                 req.session.user = user.name;
     		}).catch(err=>{
     			       console.log(err)
                 res.send({state:500,message:"服务器错误，请稍后重试"});
     		})
     	}
     })
});

router.get('/post?*',function(req,res){
   var name=req.query.name
   if(name){
   	 Post.findAll({where:{user:name},order:[['createdAt','DESC']]}).then(posts=>{
          res.send({state:200,posts:posts})
   	 }).catch(err=>{
			 console.log(err)
   	 	 res.send({state:500,message:"服务器错误，请稍后重试"})
   	 })
   }else{
      Post.findAll({order:[['createdAt','DESC']]}).then(posts=>{
          res.send({state:200,posts:posts})
   	  }).catch(err=>{
			 console.log(err)
   	 	 res.send({state:500,message:"服务器错误，请稍后重试"})
   	  })
   }
})

router.post('/post',function(req,res){
      Post.create({user:req.body.user,post:req.body.post}).then(posts=>{
            res.send({state:200,message:'发布成功'})
      }).catch(err=>{
				  console.log(err)
   	 	    res.send({state:500,message:"服务器错误，请稍后重试"})
   	 })
})

module.exports = router;
