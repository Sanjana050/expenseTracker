const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
    ,
    phone:{
        type:Sequelize.STRING,
        allowNull:false
    },
    isPremiumUser:
    {
       type: Sequelize.BOOLEAN,
       defaultValue:false

    },
    totalExpense:{
       type: Sequelize.INTEGER,
       defaultValue:0
    }
})

module.exports=User;
