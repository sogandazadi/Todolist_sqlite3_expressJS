const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const User = sequelize.define(
   "users",
   {
    id:{
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
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    hashedPassword: {
        type: DataTypes.STRING(64),
   },
   token: { 
        type: DataTypes.TEXT 
    },

  }
)

module.exports = User;