const Task = require("../model/todo");
const {Op} = require("sequelize")

function haspriority(obj) {
  return obj.priority !== undefined
}

function haspriorityandstatus(obj) {
  return obj.priority !== undefined && obj.status !== undefined
}

function hasstatus(obj) {
  return obj.status !== undefined
}

exports.search = async (req, res) => {
  try{
    const todo_id = req.params.todoId;
    const {search_q , priority , status } = req.query;
    let condition = {};
    if(todo_id){
      const todo = await Task.findByPk(todo_id);
      res.send("Task : " + JSON.stringify(todo, null, 2));
      console.log('Task :', JSON.stringify(todo, null, 2));
    }
    else{
      switch (true) {
        case haspriorityandstatus(req.query):
          condition.status = status;
          condition.priority = priority;
          break
        case haspriority(req.query):
          condition.priority = priority
          break
        case hasstatus(req.query):
          condition.status = status
          break
        default:
          condition.todo = { [Op.like]: `%${search_q}%` };
      }
      const all_todos = await Task.findAll({where: condition});
      res.send("Tasks : " + JSON.stringify(all_todos, null, 2));
      console.log('Tasks :', JSON.stringify(all_todos, null, 2));
    }

  }
  catch(err){
    console.log(err)
  }
};