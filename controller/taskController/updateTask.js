const Task = require("../../model/todo");

exports.updateTaskById = async (req, res) => {
    try {
      const task_id = req.params.todoId;
      const update_elements = req.body;

      const task = await Task.findOne({where : { id: task_id , user_id:req.user.id}});
      if (!task) {
        res.status(404).send('Task not found');
      }
      else{

        if(update_elements.status!==undefined)
        task.status = update_elements.status;
        if(update_elements.priority !== undefined)
        task.priority = update_elements.priority;
        if(update_elements.todo !== undefined)
        task.todo = update_elements.todo;

        await task.save();
        res.json({ message: `Task updated successfully`, task });
      }
      
    } catch (error) {
      res.status(500).send("An error occurred" + "\n" + error.message);
    }
  };

    
  




