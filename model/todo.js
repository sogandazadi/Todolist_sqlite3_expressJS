const { DataTypes , Model } = require('sequelize');
const User = require("./user")
const sequelize = require("../database")

const Task = sequelize.define(
    "todos",
    {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      todo: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      priority:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      status:{
        type:DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User, 
          key: 'ID',
        },
        allowNull: false
      },
    },
);

module.exports = Task;