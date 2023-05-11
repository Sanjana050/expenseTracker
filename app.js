const express=require('express');
const app=express();
const axios = require('axios');
const cors = require('cors');
const Order=require('./models/orders')
const Forgotpass=require('./models/forgotpass')
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
 app.use(express.json());

const path=require('path')

app.use(cors({
    origin: ['https://razorpay.com', 'http://localhost:3000','https://nodemailer.com/about/']
  }));
  

const Sequelize=require('sequelize');
const sequelize=require('./util/database')

const User=require('./models/user')
const Expense=require('./models/expense');

const expenseRoute=require('./router/expense');
const userRoute=require('./router/user');
const premiumRoute=require('./router/premium')
const forgotPassRouter=require('./router/password');
const { forgotpassword } = require('./controllers/password');

app.use(express.static(path.join(__dirname,'views')))

app.use(forgotPassRouter);
app.use(premiumRoute);
app.use(expenseRoute);
app.use(userRoute);






User.hasMany(Expense);
Expense.belongsTo(User);


User.hasMany(Order);
Order.belongsTo(User);


User.hasMany(Forgotpass);
Forgotpass.belongsTo(User);


sequelize.sync().then((result)=>{
    console.log(result);
    app.listen(3000);
}).catch((err)=>{
    console.log(err)
})