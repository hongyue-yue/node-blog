const Sequelize = require('sequelize');
const sequelize=new Sequelize('blog','root','ws@1992',{
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports=sequelize;
