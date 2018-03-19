const express=require('express');
const router=express.Router();
const crypto=require('crypto');
const { md5 }=require('../models/com.js');
const User=require("../models/user.js")
const Post=require("../models/post.js")
const settings= require('../settings');

router.post('/login',function(req,res){
    //var password = md5.update(req.body.password).digest('base64');
	User.findOne({ where: {name: req.body.name} }).then(user=>{
		if(!user){
		  console.log("用户不存在")
          res.send({state:400,message:"用户不存在"});
      }else if(user.password!=req.body.password){
      	  console.log("密码错误")
          res.send({state:400,message:"密码错误"});
      }else{
					let key=user.name+'&&'+settings.session.secret
	        let hash = md5(key);
					let token=`name:${user.name}&&hash:${hash}`
				  res.cookie('secret',token,{expires:new Date(Date.now()+settings.session.maxAge) , httpOnly: true})
          res.send({state:200,username:user.name});

      }
	}).catch(err=>{
		console.log(err)
        res.send({state:500,message:"服务器错误，请稍后重试"});
	})
});
router.get('/info',function(req,res){
  if(req.cookies){
    let secret=req.cookies.secret;
    let seArray=secret.split('&&');
    let name=seArray[0].split(':')[1];
      res.send({state:200,name:name});
  }else{
    res.send({state:503,message:"请登录"})
  }

});

router.get('/logout',function(req,res){
    res.clearCookie('secret');
    res.send({state:200,message:"已登出"})
});

router.post('/reg',function(req,res){

     //var password = md5.update(req.body.password).digest('base64');
     User.findOne({ where: {name: req.body.name}}).then(user=>{
     	if(user){
     		res.send({state:400,message:"用户已存在"});
     	}else{
     		User.create({name:req.body.name,password:req.body.password}).then(user=>{
					  let key=req.body.name+"&&"+settings.session.secret
					  let hash = md5(key);
					  let token=`name:${user.name}&&hash:${hash}`;
				    res.cookie("secret",token,{expires:new Date(Date.now()+settings.session.maxAge), httpOnly: true})
            res.send({state:200,message:"注册成功",username:user.name})
     		}).catch(err=>{
     			       console.log(err)
                 res.send({state:500,message:"服务器错误，请稍后重试"});
     		})
     	}
     })
});

router.get('/post?*',function(req,res){
   console.log(req.query.name)
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

module.exports = router;
