const { DataTypes , Model } = require('sequelize');
const sequelize = require("./config/database")
const todo = require("./modules/todo")
const { Sequelize} = require('sequelize');
const path = require("path");


(async () => {
    await sequelize.sync();
    const call = await todo.create({ todo: 'call hasoon' , priority:"low" , status : "TO DO"});
    // call exists in the database now!
    console.log(call instanceof todo); // true
    console.log(call.todo); // "Jane"
    console.log(call.toJSON())


    // const all_todos = await todo.findAll();
    // // console.log(all_todos.every(all_todos => all_todos instanceof todo)); // truefunc
    // console.log('All todos:', JSON.stringify(all_todos, null, 2));


  })();
