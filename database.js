const { Sequelize} = require('sequelize');
const path = require("path")

const sequelize = new Sequelize({
    dialect: "sqlite" , 
    storage : path.join(__dirname , "." , "todoApplication.db"),
    //logging : false
  });

// async function test_connection(){
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } 
//     catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
//   }

// test_connection();


module.exports = sequelize;

