const { DataTypes , Model } = require('sequelize');
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
      },
      status:{
        type:DataTypes.TEXT,
      },
    },

    {
        timestamps: false,
    }
);

module.exports = Task;