const express=require('express');
const router=express.Router();

const User=require("../models/user.js")
const Post=require("../models/post.js")

router.post('/post',function(req,res){
      Post.create({user:req.body.user,post:req.body.post}).then(posts=>{
            res.send({state:200,message:'发布成功'})
      }).catch(err=>{
				  console.log(err)
   	 	    res.send({state:500,message:"服务器错误，请稍后重试"})
   	 })
})

module.exports = router;
