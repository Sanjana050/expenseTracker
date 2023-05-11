const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const ForgotPassword=sequelize.define('forgotpass',{
    id:{type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true
    },
    active:Sequelize.BOOLEAN,
    expiresBy:Sequelize.DATE,
    // userId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     defaultValue: 0 // Set the default value to 0 or any other value you prefer
    //   }
  
})

module.exports=ForgotPassword;