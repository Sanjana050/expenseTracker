
const Sequelize=require('sequelize');
const sequelize=new Sequelize('expenseapp','root','Neha@5678',{dialect:'mysql',host:'database-1.cxuthawotyly.us-east-1.rds.amazonaws.com'});
module.exports=sequelize;
