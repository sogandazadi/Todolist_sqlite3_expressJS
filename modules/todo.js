const { DataTypes , Model } = require('sequelize');
const sequelize = require("../config/database")

const todo = sequelize.define(
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


module.exports = todo;
  
  
console.log(sequelize.models.todos)
console.log(todo === sequelize.models.todos);


// (async () => {
//     await sequelize.sync({ force: true });
//     const call = await todo.create({ todo: 'call' , priority:"high" , status : "TO DO" });
//     // call exists in the database now!
//     console.log(call instanceof todo); // true
//     console.log(call.todo); // "Jane"
//     console.log(call.toJSON())


//     const all_todos = await todo.findAll();
//     console.log(all_todos.every(all_todos => all_todos instanceof todo)); // true
//     console.log('All todos:', JSON.stringify(all_todos, null, 2));


//   })();





//   async function create_table(){
//     try{
//       //await todo.sync()
//       const new_todo = await todo.build({todo:"call saghar" , priority:"high" , status : "to do"});
//       await new_todo.save();
//       console.log(new_todo)
//       console.log("succes")
//     }
//     catch(err){
//       console.log(err)
//     }
//   }
//   create_table();
  
  