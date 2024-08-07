const Task = require("../../model/todo");
const {Op} = require("sequelize")

exports.searchTask = async (req, res) => {
  try{
    const todo_id = req.params.todoId;
    const {search_q , priority , status } = req.query;
    let condition = {user_id:req.user.id};
    if(todo_id){
      condition.id = todo_id;
      var all_todos = await Task.findAll({where :condition});
    }
    else{
        if (priority!==undefined && status!==undefined) {
          condition.status = status;
          condition.priority = priority;}
        if(priority !== undefined)
          condition.priority = priority
         if(status!==undefined)
          condition.status = status
        if(search_q)
          condition.todo = { [Op.like]: `%${search_q}%` };

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
}