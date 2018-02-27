const sequelize=require('./db');
const Sequelize = require('sequelize');
const Post=sequelize.define('posts',{
   user:{type: Sequelize.STRING},
   post:{type: Sequelize.STRING}
})
Post.sync();
module.exports=Post;
