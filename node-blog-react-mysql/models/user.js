const sequelize=require('./db');
const Sequelize = require('sequelize');
const User=sequelize.define('users',{
   name:{type: Sequelize.STRING},
   password:{type: Sequelize.STRING}
})
User.sync();
module.exports=User;
