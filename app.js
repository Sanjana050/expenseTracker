const express=require('express');
const app=express();
const axios = require('axios');
const cors = require('cors');
const Order=require('./models/orders')

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
 app.use(express.json());

const path=require('path')

app.use(cors({
    origin: ['https://razorpay.com', 'http://localhost:80']
  }));
  

const Sequelize=require('sequelize');
const sequelize=require('./util/database')

const User=require('./models/user')
const Expense=require('./models/expense');

const expenseRoute=require('./router/expense');
const userRoute=require('./router/user');
const premiumRoute=require('./router/premium')


app.use(express.static(path.join(__dirname,'views')))


app.use(premiumRoute);
app.use(expenseRoute);
app.use(userRoute);





User.hasMany(Expense);
Expense.belongsTo(User);


User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync().then((result)=>{
    console.log(result);
    app.listen(80);
}).catch((err)=>{
    console.log(err)
})
