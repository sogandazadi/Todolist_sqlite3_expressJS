const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const User = sequelize.define(
   "users",
   {
    ID:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    firstName:{
       type:DataTypes.TEXT,
       allowNull: false
    },
    lastName:{
        type:DataTypes.TEXT,
        allowNull: false
    }
   },
)

module.exports = User;