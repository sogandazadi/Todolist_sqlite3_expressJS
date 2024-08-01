const Task = require("../../model/todo");
const {Op} = require("sequelize")

function hasPriority(obj) {
  return obj.priority !== undefined
}

function hasPriorityAndStatus(obj) {
  return obj.priority !== undefined && obj.status !== undefined
}

function hasStatus(obj) {
  return obj.status !== undefined
}

exports.search = async (req, res) => {
  try{
    const todo_id = req.params.todoId;
    const {search_q , priority , status } = req.query;
    let condition = {};
    if(todo_id){
      var all_todos = await Task.findByPk(todo_id);
    }
    else{
      switch (true) {
        case hasPriorityAndStatus(req.query):
          condition.status = status;
          condition.priority = priority;
          break
        case hasPriority(req.query):
          condition.priority = priority
          break
        case hasStatus(req.query):
          condition.status = status
          break
        default:
          condition.todo = { [Op.like]: `%${search_q}%` };
      }
      var all_todos = await Task.findAll({where: condition});
    }
    if(all_todos.length > 0){
      res.send("Tasks : " + JSON.stringify(all_todos, null, 2));
      return;
    }
    else{
      res.status(404).send("Task not found");
      return;
    }
  }
  catch(error){
    res.status(500).send("An error occurred" + "\n" + error.message);
  }
};